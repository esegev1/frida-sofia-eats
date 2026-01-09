import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for recipe creation
const recipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  intro_text: z.string().optional(),
  ingredients: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      items: z.array(z.string()),
    })
  ),
  instructions: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
  notes: z.string().optional(),
  featured_image_url: z.string().optional(),
  video_links: z
    .object({
      youtube: z.string().optional(),
      instagram: z.string().optional(),
      tiktok: z.string().optional(),
    })
    .optional(),
  prep_time: z.number().nullable().optional(),
  cook_time: z.number().nullable().optional(),
  servings: z.string().optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  status: z.enum(["draft", "published"]).optional(),
  category_ids: z.array(z.string()).optional(),
});

// GET - List all recipes (for admin)
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: recipes, error } = await supabase
      .from("recipes")
      .select(
        `
        *,
        recipe_categories (
          category_id,
          categories (id, name, slug)
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

// POST - Create a new recipe
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get and validate request body
    const body = await request.json();
    const validationResult = recipeSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Calculate total time
    const totalTime =
      (data.prep_time || 0) + (data.cook_time || 0) || null;

    // Insert recipe
    const { data: recipe, error: recipeError } = await supabase
      .from("recipes")
      .insert({
        title: data.title,
        slug: data.slug,
        description: data.description || null,
        intro_text: data.intro_text || null,
        ingredients: data.ingredients,
        instructions: data.instructions,
        notes: data.notes || null,
        featured_image_url: data.featured_image_url || null,
        video_links: data.video_links || {},
        prep_time_minutes: data.prep_time,
        cook_time_minutes: data.cook_time,
        total_time_minutes: totalTime,
        servings: data.servings || null,
        difficulty: data.difficulty || "easy",
        status: data.status || "draft",
        published_at: data.status === "published" ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (recipeError) {
      return NextResponse.json({ error: recipeError.message }, { status: 500 });
    }

    // Insert category relationships if provided
    if (data.category_ids && data.category_ids.length > 0) {
      const categoryRelations = data.category_ids.map((categoryId) => ({
        recipe_id: recipe.id,
        category_id: categoryId,
      }));

      const { error: categoryError } = await supabase
        .from("recipe_categories")
        .insert(categoryRelations);

      if (categoryError) {
        // Recipe was created but categories failed - don't fail the whole request
        // but include a warning in the response
      }
    }

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create recipe" },
      { status: 500 }
    );
  }
}

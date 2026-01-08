import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { headers } from "next/headers";
import crypto from "crypto";

const reviewSchema = z.object({
  recipe_id: z.string().uuid().optional(),
  recipe_slug: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(500).nullable().optional(),
  author_name: z.string().max(50).nullable().optional(),
});

// Hash IP for privacy while still enabling rate limiting
function hashIP(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex").substring(0, 16);
}

// Generate a deterministic UUID from a string
function generateUUID(input: string): string {
  return crypto
    .createHash("md5")
    .update(input)
    .digest("hex")
    .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid review data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { recipe_slug, rating, comment, author_name } = parsed.data;

    // Get IP hash for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] || "unknown";
    const ipHash = hashIP(ip);

    // For now, use demo mode since Supabase isn't connected
    // When Supabase is set up, uncomment the database operations below

    // Generate recipe ID from slug for demo mode
    const recipeId = parsed.data.recipe_id || generateUUID(recipe_slug);

    // TODO: Uncomment when Supabase is connected
    /*
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    // Get recipe ID from slug if not provided
    if (!parsed.data.recipe_id) {
      const { data: recipe } = await supabase
        .from("recipes")
        .select("id")
        .eq("slug", recipe_slug)
        .single();

      if (recipe) {
        recipeId = recipe.id;
      }
    }

    // Check for recent reviews from same IP (rate limiting)
    const { data: recentReview } = await supabase
      .from("reviews")
      .select("id")
      .eq("recipe_id", recipeId)
      .eq("ip_hash", ipHash)
      .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .single();

    if (recentReview) {
      return NextResponse.json(
        { error: "You have already reviewed this recipe in the last 24 hours" },
        { status: 429 }
      );
    }

    // Insert review (pending moderation)
    const { data: review, error } = await supabase
      .from("reviews")
      .insert({
        recipe_id: recipeId,
        rating,
        comment: comment || null,
        author_name: author_name || null,
        ip_hash: ipHash,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error inserting review:", error);
      return NextResponse.json(
        { error: "Failed to submit review" },
        { status: 500 }
      );
    }
    */

    // Demo mode response
    console.log("Review submitted (demo mode):", {
      recipe_id: recipeId,
      recipe_slug,
      rating,
      comment,
      author_name,
      ip_hash: ipHash,
    });

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully",
      review: {
        id: crypto.randomUUID(),
        recipe_id: recipeId,
        rating,
        comment: comment || null,
        author_name: author_name || null,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const recipeSlug = searchParams.get("recipe");

    if (!recipeSlug) {
      return NextResponse.json(
        { error: "Recipe slug is required" },
        { status: 400 }
      );
    }

    // Demo mode - return empty reviews
    // TODO: When Supabase is connected, fetch actual reviews
    /*
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const status = searchParams.get("status") || "approved";

    // Get recipe ID from slug
    const { data: recipe } = await supabase
      .from("recipes")
      .select("id")
      .eq("slug", recipeSlug)
      .single();

    if (!recipe) {
      return NextResponse.json({
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
      });
    }

    // Fetch approved reviews
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("id, rating, comment, author_name, created_at")
      .eq("recipe_id", recipe.id)
      .eq("status", status)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Error fetching reviews:", error);
      return NextResponse.json({
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
      });
    }

    const reviewCount = reviews.length;
    const averageRating =
      reviewCount > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
        : 0;

    return NextResponse.json({
      reviews,
      averageRating,
      reviewCount,
    });
    */

    // Demo mode response
    return NextResponse.json({
      reviews: [],
      averageRating: 0,
      reviewCount: 0,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

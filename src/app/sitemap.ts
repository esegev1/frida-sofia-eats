import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fridasofiaeats.com";

// Demo data for when Supabase isn't connected
const DEMO_RECIPES = [
  { slug: "creamy-mushroom-orzo", updated_at: "2024-01-15T10:00:00Z" },
  { slug: "shrimp-tomato-pasta", updated_at: "2024-01-14T10:00:00Z" },
  { slug: "40-clove-chicken", updated_at: "2024-01-13T10:00:00Z" },
  { slug: "garden-veggie-bowl", updated_at: "2024-01-12T10:00:00Z" },
  { slug: "herb-crusted-salmon", updated_at: "2024-01-11T10:00:00Z" },
  { slug: "sunday-roast-chicken", updated_at: "2024-01-10T10:00:00Z" },
  { slug: "mediterranean-salad", updated_at: "2024-01-09T10:00:00Z" },
  { slug: "crispy-breakfast-hash", updated_at: "2024-01-08T10:00:00Z" },
];

const DEMO_CATEGORIES = [
  { slug: "mains" },
  { slug: "pasta" },
  { slug: "chicken" },
  { slug: "seafood" },
  { slug: "soups" },
  { slug: "appetizers" },
  { slug: "breakfast" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Try to fetch from Supabase, fall back to demo data
  let recipes = DEMO_RECIPES;
  let categories = DEMO_CATEGORIES;

  try {
    const supabase = await createClient();

    // Fetch published recipes
    const { data: dbRecipes } = await supabase
      .from("recipes")
      .select("slug, updated_at")
      .eq("status", "published")
      .order("updated_at", { ascending: false });

    if (dbRecipes && dbRecipes.length > 0) {
      recipes = dbRecipes;
    }

    // Fetch categories
    const { data: dbCategories } = await supabase
      .from("categories")
      .select("slug");

    if (dbCategories && dbCategories.length > 0) {
      categories = dbCategories;
    }
  } catch (error) {
    // Supabase not connected, use demo data
    console.log("Using demo data for sitemap");
  }

  // Recipe pages
  const recipePages: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${BASE_URL}/recipes/${recipe.slug}`,
    lastModified: new Date(recipe.updated_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...recipePages, ...categoryPages];
}

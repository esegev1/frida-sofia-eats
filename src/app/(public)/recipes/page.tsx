import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "All Recipes",
  description: "Browse all our delicious, family-friendly recipes. Easy meals for busy nights and real kitchens.",
};

// Placeholder data - will be fetched from Supabase
const DEMO_RECIPES = [
  {
    id: "1",
    title: "Creamy Mushroom Orzo",
    slug: "creamy-mushroom-orzo",
    description: "A cozy one-pot dinner that's ready in 30 minutes",
    featured_image_url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop",
    total_time_minutes: 30,
    difficulty: "easy",
    categories: [{ name: "Pasta", slug: "pasta" }],
  },
  {
    id: "2",
    title: "Shrimp Tomato Pasta",
    slug: "shrimp-tomato-pasta",
    description: "Quick, flavorful, and perfect for busy weeknights",
    featured_image_url: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop",
    total_time_minutes: 25,
    difficulty: "easy",
    categories: [{ name: "Pasta", slug: "pasta" }, { name: "Seafood", slug: "seafood" }],
  },
  {
    id: "3",
    title: "40 Clove Chicken",
    slug: "40-clove-chicken",
    description: "Tender chicken with melt-in-your-mouth garlic",
    featured_image_url: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop",
    total_time_minutes: 60,
    difficulty: "medium",
    categories: [{ name: "Chicken", slug: "chicken" }],
  },
  {
    id: "4",
    title: "Garden Veggie Bowl",
    slug: "garden-veggie-bowl",
    description: "Fresh, healthy, and bursting with flavor",
    featured_image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
    total_time_minutes: 20,
    difficulty: "easy",
    categories: [{ name: "Mains", slug: "mains" }],
  },
  {
    id: "5",
    title: "Herb Crusted Salmon",
    slug: "herb-crusted-salmon",
    description: "Restaurant-quality fish in under 25 minutes",
    featured_image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop",
    total_time_minutes: 25,
    difficulty: "medium",
    categories: [{ name: "Seafood", slug: "seafood" }],
  },
  {
    id: "6",
    title: "Sunday Roast Chicken",
    slug: "sunday-roast-chicken",
    description: "The perfect centerpiece for family dinner",
    featured_image_url: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop",
    total_time_minutes: 90,
    difficulty: "medium",
    categories: [{ name: "Chicken", slug: "chicken" }],
  },
  {
    id: "7",
    title: "Mediterranean Salad",
    slug: "mediterranean-salad",
    description: "Bright, colorful, and incredibly satisfying",
    featured_image_url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop",
    total_time_minutes: 15,
    difficulty: "easy",
    categories: [{ name: "Appetizers", slug: "appetizers" }],
  },
  {
    id: "8",
    title: "Crispy Breakfast Hash",
    slug: "crispy-breakfast-hash",
    description: "Start your morning with something special",
    featured_image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=400&fit=crop",
    total_time_minutes: 35,
    difficulty: "easy",
    categories: [{ name: "Breakfast", slug: "breakfast" }],
  },
];

const CATEGORIES = [
  { name: "All", slug: "" },
  { name: "Mains", slug: "mains" },
  { name: "Pasta", slug: "pasta" },
  { name: "Chicken", slug: "chicken" },
  { name: "Seafood", slug: "seafood" },
  { name: "Soups", slug: "soups" },
  { name: "Appetizers", slug: "appetizers" },
  { name: "Breakfast", slug: "breakfast" },
];

/**
 * Recipes Listing Page
 * Fully responsive design optimized for mobile, tablet, and desktop
 * - Container: Responsive padding with max-width constraint
 * - Header: Responsive text sizing with sm: and lg: breakpoints
 * - Category Filter: Horizontal scroll on all screen sizes (mobile-friendly)
 * - Recipe Grid: 2 columns on mobile, 4 columns on desktop
 * - Description: Hidden on mobile to save space, visible on sm: and larger
 * - Spacing: Responsive gaps and padding throughout
 */
export default function RecipesPage() {
  const recipes = DEMO_RECIPES;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-2">
          All Recipes
        </h1>
        <p className="text-gray-600">
          Browse {recipes.length} delicious recipes
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={category.slug ? `/category/${category.slug}` : "/recipes"}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors bg-cream-100 text-gray-700 hover:bg-terracotta-100 hover:text-terracotta-700"
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Recipe Grid - Responsive columns: 2 on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.slug}`}
            className="group"
          >
            <article className="h-full">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md mb-3">
                <Image
                  src={recipe.featured_image_url}
                  alt={recipe.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Time badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full shadow-sm">
                    <Clock className="h-3 w-3" />
                    {recipe.total_time_minutes} min
                  </span>
                </div>
                {/* Difficulty badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm capitalize">
                    {recipe.difficulty}
                  </Badge>
                </div>
              </div>
              <div className="px-1">
                <div className="flex flex-wrap gap-1 mb-1">
                  {recipe.categories.slice(0, 2).map((cat) => (
                    <span
                      key={cat.slug}
                      className="text-terracotta-600 text-xs font-medium"
                    >
                      {cat.name}
                      {recipe.categories.indexOf(cat) < Math.min(recipe.categories.length, 2) - 1 && " · "}
                    </span>
                  ))}
                </div>
                <h2 className="font-display font-semibold text-gray-900 group-hover:text-terracotta-600 transition-colors line-clamp-2">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2 hidden sm:block">
                  {recipe.description}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Empty State - for when filtering returns no results */}
      {recipes.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">No recipes found</p>
          <Link
            href="/recipes"
            className="text-terracotta-600 font-medium hover:underline"
          >
            View all recipes
          </Link>
        </div>
      )}
    </div>
  );
}

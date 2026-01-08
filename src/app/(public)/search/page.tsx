"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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
    ingredients: ["orzo", "mushrooms", "cream", "parmesan", "garlic", "thyme"],
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
    ingredients: ["shrimp", "pasta", "tomatoes", "garlic", "basil", "white wine"],
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
    ingredients: ["chicken", "garlic", "olive oil", "thyme", "rosemary", "white wine"],
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
    ingredients: ["quinoa", "chickpeas", "cucumber", "tomatoes", "feta", "lemon"],
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
    ingredients: ["salmon", "herbs", "panko", "lemon", "dijon mustard", "garlic"],
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
    ingredients: ["whole chicken", "butter", "lemon", "herbs", "potatoes", "carrots"],
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
    ingredients: ["romaine", "cucumber", "olives", "feta", "tomatoes", "red onion"],
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
    ingredients: ["potatoes", "eggs", "bacon", "bell peppers", "onions", "cheese"],
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredRecipes = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const searchTerms = query.toLowerCase().split(" ").filter(Boolean);

    return DEMO_RECIPES.filter((recipe) => {
      const searchableText = [
        recipe.title,
        recipe.description,
        ...recipe.categories.map((c) => c.name),
        ...recipe.ingredients,
      ]
        .join(" ")
        .toLowerCase();

      return searchTerms.every((term) => searchableText.includes(term));
    });
  }, [query]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 text-center mb-6">
          Search Recipes
        </h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by recipe name, ingredient, or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-12 h-14 text-lg rounded-full border-2 border-cream-200 focus:border-terracotta-400"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>
        {query && (
          <p className="text-center text-gray-600 mt-4">
            {filteredRecipes.length} result{filteredRecipes.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {/* Search Results */}
      {query ? (
        filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredRecipes.map((recipe) => (
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
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">
              No recipes found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Try searching for ingredients like &ldquo;chicken&rdquo; or &ldquo;pasta&rdquo;
            </p>
            <Link
              href="/recipes"
              className="text-terracotta-600 font-medium hover:underline"
            >
              Browse all recipes
            </Link>
          </div>
        )
      ) : (
        /* Empty state - show suggestions */
        <div className="text-center py-8">
          <p className="text-gray-600 mb-8">
            Start typing to search through our recipes
          </p>

          {/* Popular searches */}
          <div className="max-w-xl mx-auto">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
              Popular Searches
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {["Chicken", "Pasta", "Quick meals", "Seafood", "Vegetarian", "30 minutes"].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 bg-cream-100 text-gray-700 rounded-full text-sm font-medium hover:bg-terracotta-100 hover:text-terracotta-700 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Browse categories */}
          <div className="mt-12">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
              Or Browse by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { name: "Mains", slug: "mains" },
                { name: "Pasta", slug: "pasta" },
                { name: "Chicken", slug: "chicken" },
                { name: "Seafood", slug: "seafood" },
                { name: "Appetizers", slug: "appetizers" },
                { name: "Breakfast", slug: "breakfast" },
              ].map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="px-4 py-2 bg-terracotta-50 text-terracotta-700 rounded-full text-sm font-medium hover:bg-terracotta-100 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

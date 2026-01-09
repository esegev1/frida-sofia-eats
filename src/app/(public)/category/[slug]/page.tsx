import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

// Placeholder data - will be fetched from Supabase
const CATEGORIES = [
  {
    name: "Mains",
    slug: "mains",
    description: "Hearty main dishes for family dinners",
    image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop",
  },
  {
    name: "Pasta",
    slug: "pasta",
    description: "Comforting pasta dishes for any night of the week",
    image_url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=400&fit=crop",
  },
  {
    name: "Chicken",
    slug: "chicken",
    description: "Delicious chicken recipes the whole family will love",
    image_url: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=400&fit=crop",
  },
  {
    name: "Seafood",
    slug: "seafood",
    description: "Fresh and flavorful seafood dishes",
    image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=400&fit=crop",
  },
  {
    name: "Soups",
    slug: "soups",
    description: "Warming soups and stews for cozy nights",
    image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=400&fit=crop",
  },
  {
    name: "Appetizers",
    slug: "appetizers",
    description: "Perfect starters and snacks for any occasion",
    image_url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=400&fit=crop",
  },
  {
    name: "Breakfast",
    slug: "breakfast",
    description: "Start your day with something delicious",
    image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=400&fit=crop",
  },
];

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

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} Recipes`,
    description: category.description,
    openGraph: {
      title: `${category.name} Recipes | Frida Sofia Eats`,
      description: category.description,
      images: [category.image_url],
    },
  };
}

/**
 * Category Page
 * Fully responsive design for browsing recipes by category
 * - Container: Responsive padding with max-width constraint
 * - Hero Image: Maintains aspect ratio (3:1) on all screen sizes
 * - Hero Text Overlay: Responsive font sizes and padding
 * - Category Filter: Horizontal scroll on all screen sizes (mobile-friendly)
 * - Recipe Grid: 2 columns on mobile, 4 columns on desktop (same as listing)
 * - Description: Hidden on mobile, visible on sm: and larger
 * - Responsive Spacing: Gaps and padding adjust with breakpoints
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // TODO: Fetch category from Supabase
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // TODO: Fetch recipes by category from Supabase
  const recipes = DEMO_RECIPES.filter((recipe) =>
    recipe.categories.some((cat) => cat.slug === slug)
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Back link */}
      <Link
        href="/recipes"
        className="inline-flex items-center text-gray-600 hover:text-terracotta-600 transition-colors mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        All Recipes
      </Link>

      {/* Category Header with Hero Image */}
      <div className="relative rounded-2xl overflow-hidden mb-10">
        <div className="aspect-[3/1] relative">
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
          <h1 className="text-3xl lg:text-5xl font-display font-bold text-white mb-2">
            {category.name}
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            {category.description}
          </p>
          <p className="text-white/70 text-sm mt-2">
            {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              cat.slug === slug
                ? "bg-terracotta-500 text-white"
                : "bg-cream-100 text-gray-700 hover:bg-terracotta-100 hover:text-terracotta-700"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Recipe Grid - Responsive columns: 2 on mobile, 4 on desktop */}
      {recipes.length > 0 ? (
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
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">No recipes found in this category yet.</p>
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

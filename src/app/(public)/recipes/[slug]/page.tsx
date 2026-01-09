import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Users, ChefHat, Printer, Copy, Share2, Instagram, Youtube, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RecipeActions } from "@/components/recipe/recipe-actions";
import { IngredientsList } from "@/components/recipe/ingredients-list";
import { InstructionsList } from "@/components/recipe/instructions-list";
import { RecipeSchema } from "@/components/recipe/recipe-schema";
import { ReviewsSection } from "@/components/review/reviews-section";
import { AdSlot } from "@/components/ads/ad-slot";

// Placeholder data - will be fetched from Supabase
const DEMO_RECIPE = {
  id: "1",
  title: "Creamy Mushroom Orzo",
  slug: "creamy-mushroom-orzo",
  description: "A cozy one-pot dinner that's ready in 30 minutes. Creamy, savory, and absolutely delicious.",
  intro_text: `There's something magical about a one-pot meal that comes together in under 30 minutes. This Creamy Mushroom Orzo is one of those recipes that feels fancy but is actually incredibly simple to make.

The orzo absorbs all that delicious mushroom flavor while cooking, and the finish of parmesan and a touch of cream makes it irresistibly rich. It's the perfect weeknight dinner when you want something comforting but don't want to spend hours in the kitchen.

I love serving this with a simple green salad and crusty bread. Trust me, you'll be making this on repeat!`,
  featured_image_url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&h=800&fit=crop",
  gallery_images: [
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&h=600&fit=crop",
  ],
  prep_time_minutes: 10,
  cook_time_minutes: 20,
  total_time_minutes: 30,
  servings: "4 servings",
  difficulty: "easy" as const,
  cuisine: "Italian",
  ingredients: [
    {
      group: "",
      items: [
        "1 lb orzo pasta",
        "8 oz cremini mushrooms, sliced",
        "4 cloves garlic, minced",
        "1/2 cup dry white wine",
        "3 cups chicken or vegetable broth",
        "1/2 cup heavy cream",
        "1/2 cup freshly grated parmesan",
        "2 tablespoons butter",
        "2 tablespoons olive oil",
        "Fresh thyme leaves",
        "Salt and pepper to taste",
      ],
    },
  ],
  instructions: [
    { step: 1, text: "Heat olive oil and 1 tablespoon butter in a large skillet or Dutch oven over medium-high heat." },
    { step: 2, text: "Add the sliced mushrooms and cook for 5-6 minutes until golden brown and most of the liquid has evaporated. Season with salt and pepper." },
    { step: 3, text: "Add the minced garlic and cook for 30 seconds until fragrant." },
    { step: 4, text: "Pour in the white wine and scrape up any browned bits from the bottom of the pan. Let it reduce by half, about 2 minutes." },
    { step: 5, text: "Add the orzo and stir to coat with the mushroom mixture. Pour in the broth and bring to a boil." },
    { step: 6, text: "Reduce heat to medium-low, cover, and simmer for 10-12 minutes, stirring occasionally, until the orzo is al dente and most of the liquid is absorbed." },
    { step: 7, text: "Remove from heat and stir in the heavy cream, parmesan, remaining butter, and fresh thyme. Season with additional salt and pepper to taste." },
    { step: 8, text: "Serve immediately, topped with extra parmesan and thyme if desired." },
  ],
  notes: "You can substitute the white wine with additional broth if preferred. For a vegetarian version, use vegetable broth. Leftovers can be stored in the refrigerator for up to 3 days - add a splash of broth when reheating to loosen the pasta.",
  video_links: {
    instagram: "https://www.instagram.com/p/example/",
    youtube: "",
    tiktok: "",
  },
  categories: [
    { id: "1", name: "Mains", slug: "mains" },
    { id: "2", name: "Pasta", slug: "pasta" },
  ],
  published_at: "2024-01-15T10:00:00Z",
  rating: {
    average: 4.8,
    count: 24,
  },
};

// Demo reviews data
const DEMO_REVIEWS = [
  {
    id: "r1",
    rating: 5,
    comment: "This has become a weeknight staple in our house! So creamy and delicious. My kids even asked for seconds!",
    author_name: "Maria K.",
    created_at: "2024-01-20T14:30:00Z",
  },
  {
    id: "r2",
    rating: 5,
    comment: "Made this last night and it was absolutely divine. The mushrooms were perfectly cooked and the orzo absorbed all that wonderful flavor.",
    author_name: "James T.",
    created_at: "2024-01-18T19:15:00Z",
  },
  {
    id: "r3",
    rating: 4,
    comment: "Really good recipe! I added some spinach at the end for extra veggies. Will definitely make again.",
    author_name: null,
    created_at: "2024-01-15T12:00:00Z",
  },
];

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // TODO: Fetch recipe from Supabase
  const recipe = slug === "creamy-mushroom-orzo" ? DEMO_RECIPE : null;

  if (!recipe) {
    return { title: "Recipe Not Found" };
  }

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: recipe.featured_image_url ? [recipe.featured_image_url] : [],
      type: "article",
    },
  };
}

/**
 * Recipe Detail Page
 * Fully responsive design for reading recipes on any device
 * - Article: Responsive padding with max-width constraint
 * - Title: Responsive font sizes (text-3xl → text-4xl → text-5xl)
 * - Meta Info: Responsive gaps and flexible wrapping
 * - Featured Image: Maintains aspect ratio on all screen sizes
 * - Content Grid: Single column on mobile, 3-column on desktop (ingredients sidebar)
 * - Time Breakdown: Always 3 columns, remains readable on all sizes
 * - Responsive Text: Hidden descriptions on mobile, visible on sm: and larger
 */
export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // TODO: Fetch recipe from Supabase
  const recipe = slug === "creamy-mushroom-orzo" ? DEMO_RECIPE : null;

  if (!recipe) {
    notFound();
  }

  const totalTime = recipe.total_time_minutes ||
    (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0);

  return (
    <>
      {/* JSON-LD Schema */}
      <RecipeSchema recipe={recipe} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-gray-500">
            <li>
              <Link href="/" className="hover:text-terracotta-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/recipes" className="hover:text-terracotta-600">
                Recipes
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{recipe.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`}>
                <Badge variant="default" className="hover:bg-terracotta-600">
                  {cat.name}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
            {recipe.title}
          </h1>

          {/* Description - Responsive text sizing */}
          <p className="text-base sm:text-lg text-gray-600 mb-6">{recipe.description}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 mb-6">
            {totalTime > 0 && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-terracotta-500" />
                <span>{totalTime} min total</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-terracotta-500" />
                <span>{recipe.servings}</span>
              </div>
            )}
            {recipe.difficulty && (
              <div className="flex items-center gap-1.5">
                <ChefHat className="h-4 w-4 text-terracotta-500" />
                <span className="capitalize">{recipe.difficulty}</span>
              </div>
            )}
            {recipe.rating.count > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-amber-500">★</span>
                <span>
                  {recipe.rating.average} ({recipe.rating.count} reviews)
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <RecipeActions recipe={recipe} />
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-10 shadow-lg">
          <Image
            src={recipe.featured_image_url}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Video Links */}
        {(recipe.video_links.instagram || recipe.video_links.youtube || recipe.video_links.tiktok) && (
          <div className="flex flex-wrap gap-3 mb-10">
            <span className="text-sm font-medium text-gray-700">Watch the video:</span>
            {recipe.video_links.instagram && (
              <a
                href={recipe.video_links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            )}
            {recipe.video_links.youtube && (
              <a
                href={recipe.video_links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
              >
                <Youtube className="h-4 w-4" />
                YouTube
              </a>
            )}
            {recipe.video_links.tiktok && (
              <a
                href={recipe.video_links.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="h-4 w-4" />
                TikTok
              </a>
            )}
          </div>
        )}

        {/* Intro Text */}
        {recipe.intro_text && (
          <div className="prose prose-lg max-w-none mb-10">
            {recipe.intro_text.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Ad Slot - After Intro */}
        <AdSlot id="recipe-after-intro" size="horizontal" className="mb-10" />

        {/* Recipe Content Grid - Single column on mobile, 3-column on desktop */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Ingredients - Sidebar on desktop */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-display font-bold text-gray-900 mb-4">
                Ingredients
              </h2>
              <IngredientsList ingredients={recipe.ingredients} />
            </Card>
          </div>

          {/* Instructions - Main content */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-6">
              Instructions
            </h2>
            <InstructionsList instructions={recipe.instructions} />

            {/* Notes */}
            {recipe.notes && (
              <div className="mt-8 p-6 bg-cream-100 rounded-xl">
                <h3 className="font-display font-semibold text-gray-900 mb-2">
                  Notes & Tips
                </h3>
                <p className="text-gray-700">{recipe.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Time Breakdown - Responsive: 1 col mobile, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {recipe.prep_time_minutes && (
            <Card className="p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Prep Time</p>
              <p className="text-2xl font-bold text-gray-900">
                {recipe.prep_time_minutes}
              </p>
              <p className="text-sm text-gray-500">minutes</p>
            </Card>
          )}
          {recipe.cook_time_minutes && (
            <Card className="p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Cook Time</p>
              <p className="text-2xl font-bold text-gray-900">
                {recipe.cook_time_minutes}
              </p>
              <p className="text-sm text-gray-500">minutes</p>
            </Card>
          )}
          {totalTime > 0 && (
            <Card className="p-4 text-center bg-terracotta-50">
              <p className="text-sm text-terracotta-600 mb-1">Total Time</p>
              <p className="text-2xl font-bold text-terracotta-700">
                {totalTime}
              </p>
              <p className="text-sm text-terracotta-600">minutes</p>
            </Card>
          )}
        </div>

        {/* Ad Slot - Before Reviews */}
        <AdSlot id="recipe-before-reviews" size="horizontal" className="mb-10" />

        {/* Reviews Section */}
        <ReviewsSection
          recipeId={recipe.id}
          recipeSlug={recipe.slug}
          reviews={DEMO_REVIEWS}
          averageRating={recipe.rating.average}
          reviewCount={recipe.rating.count}
        />

        {/* Back to Recipes */}
        <div className="text-center pt-8 border-t border-cream-200 mt-12">
          <Button variant="outline" asChild>
            <Link href="/recipes">← Back to All Recipes</Link>
          </Button>
        </div>
      </article>
    </>
  );
}

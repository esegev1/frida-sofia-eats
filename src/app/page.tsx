import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";

/**
 * Homepage Component
 * Fully responsive design optimized for mobile, tablet, and desktop
 * - Hero: Single column on mobile, 2-column layout on desktop
 * - Categories: Horizontal scroll on mobile, grid on tablet/desktop
 * - Recipes: 2 columns on mobile, 4 on desktop
 * - Text: Responsive font sizes with sm:, lg:, and xl: breakpoints
 */

// Placeholder images - using Unsplash food images for demo
const PLACEHOLDER_IMAGES = {
  hero: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop",
  featured1: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=600&fit=crop",
  featured2: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&h=600&fit=crop",
  pasta: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop",
  chicken: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop",
  soups: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
  appetizers: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&h=400&fit=crop",
  breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=400&fit=crop",
  desserts: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop",
  recipe1: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=600&h=400&fit=crop",
  recipe2: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
  recipe3: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
  recipe4: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  recipe5: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop",
  recipe6: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
  recipe7: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop",
  recipe8: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop",
};

const categories = [
  { name: "Pasta", slug: "pasta", image: PLACEHOLDER_IMAGES.pasta, count: 25 },
  { name: "Chicken", slug: "chicken", image: PLACEHOLDER_IMAGES.chicken, count: 18 },
  { name: "Soups", slug: "soups", image: PLACEHOLDER_IMAGES.soups, count: 12 },
  { name: "Appetizers", slug: "appetizers", image: PLACEHOLDER_IMAGES.appetizers, count: 15 },
  { name: "Breakfast", slug: "breakfast", image: PLACEHOLDER_IMAGES.breakfast, count: 10 },
  { name: "Desserts", slug: "desserts", image: PLACEHOLDER_IMAGES.desserts, count: 8 },
];

const latestRecipes = [
  {
    id: "1",
    title: "Creamy Mushroom Orzo",
    slug: "creamy-mushroom-orzo",
    description: "A cozy one-pot dinner that's ready in 30 minutes",
    image: PLACEHOLDER_IMAGES.recipe1,
    totalTime: 30,
    category: "Pasta",
  },
  {
    id: "2",
    title: "Shrimp Tomato Pasta",
    slug: "shrimp-tomato-pasta",
    description: "Quick, flavorful, and perfect for busy weeknights",
    image: PLACEHOLDER_IMAGES.recipe2,
    totalTime: 25,
    category: "Pasta",
  },
  {
    id: "3",
    title: "40 Clove Chicken",
    slug: "40-clove-chicken",
    description: "Tender chicken with melt-in-your-mouth garlic",
    image: PLACEHOLDER_IMAGES.recipe3,
    totalTime: 60,
    category: "Chicken",
  },
  {
    id: "4",
    title: "Garden Veggie Bowl",
    slug: "garden-veggie-bowl",
    description: "Fresh, healthy, and bursting with flavor",
    image: PLACEHOLDER_IMAGES.recipe4,
    totalTime: 20,
    category: "Mains",
  },
  {
    id: "5",
    title: "Herb Crusted Salmon",
    slug: "herb-crusted-salmon",
    description: "Restaurant-quality fish in under 25 minutes",
    image: PLACEHOLDER_IMAGES.recipe5,
    totalTime: 25,
    category: "Seafood",
  },
  {
    id: "6",
    title: "Sunday Roast Chicken",
    slug: "sunday-roast-chicken",
    description: "The perfect centerpiece for family dinner",
    image: PLACEHOLDER_IMAGES.recipe6,
    totalTime: 90,
    category: "Chicken",
  },
  {
    id: "7",
    title: "Mediterranean Salad",
    slug: "mediterranean-salad",
    description: "Bright, colorful, and incredibly satisfying",
    image: PLACEHOLDER_IMAGES.recipe7,
    totalTime: 15,
    category: "Salads",
  },
  {
    id: "8",
    title: "Crispy Breakfast Hash",
    slug: "crispy-breakfast-hash",
    description: "Start your morning with something special",
    image: PLACEHOLDER_IMAGES.recipe8,
    totalTime: 35,
    category: "Breakfast",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF7]">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Editorial Style */}
        <section className="relative">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Left: Featured Image */}
              <div className="relative aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={PLACEHOLDER_IMAGES.hero}
                  alt="Featured recipe"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <span className="inline-block px-3 py-1 bg-white/90 text-terracotta-600 text-xs font-semibold rounded-full mb-3">
                    Featured Recipe
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2">
                    Date Night Steak with Creamy Mushroom Orzo
                  </h2>
                  <p className="text-white/90 text-sm lg:text-base mb-4 line-clamp-2">
                    An impressive dinner that's easier than it looks
                  </p>
                  <Button
                    size="sm"
                    className="bg-white text-gray-900 hover:bg-cream-100"
                    asChild
                  >
                    <Link href="/recipes/date-night-steak">
                      Get the Recipe
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: Welcome Text + Secondary Images */}
              <div className="flex flex-col gap-6">
                <div className="text-center lg:text-left py-4">
                  <p className="text-terracotta-600 font-medium text-sm tracking-wide uppercase mb-3">
                    Welcome to my kitchen
                  </p>
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-gray-900 leading-[1.1] mb-4">
                    Easy recipes for
                    <br />
                    <span className="text-terracotta-600">real life</span>
                  </h1>
                  <p className="text-gray-600 text-lg max-w-md mx-auto lg:mx-0">
                    Delicious, family-friendly meals that actually work—no fancy
                    ingredients, no complicated techniques.
                  </p>
                </div>

                {/* Secondary Feature Images */}
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/recipes/creamy-mushroom-orzo" className="group">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={PLACEHOLDER_IMAGES.featured1}
                        alt="Creamy pasta dish"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium">30 min weeknight pasta</p>
                      </div>
                    </div>
                  </Link>
                  <Link href="/recipes/comfort-soup" className="group">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={PLACEHOLDER_IMAGES.featured2}
                        alt="Comfort soup"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium">Cozy comfort soups</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section - Horizontal Scroll on Mobile */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-gray-900">
                Browse by Category
              </h2>
              <Link
                href="/recipes"
                className="hidden sm:flex items-center gap-1 text-terracotta-600 hover:text-terracotta-700 font-medium text-sm transition-colors"
              >
                View all recipes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Category Cards */}
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible scrollbar-hide">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group flex-shrink-0 w-[160px] sm:w-auto"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display font-semibold text-white text-lg">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {category.count} recipes
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/recipes"
              className="sm:hidden flex items-center justify-center gap-1 text-terracotta-600 hover:text-terracotta-700 font-medium text-sm mt-6 transition-colors"
            >
              View all recipes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Latest Recipes Grid - 4 columns */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-gray-900">
                  Latest Recipes
                </h2>
                <p className="text-gray-600 mt-1">
                  Fresh from my kitchen to yours
                </p>
              </div>
              <Link
                href="/recipes"
                className="hidden sm:flex items-center gap-1 text-terracotta-600 hover:text-terracotta-700 font-medium text-sm transition-colors"
              >
                See all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Recipe Grid - 4 columns on large screens */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {latestRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.slug}`}
                  className="group"
                >
                  <article className="h-full">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md mb-3">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Time badge */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full shadow-sm">
                          <Clock className="h-3 w-3" />
                          {recipe.totalTime} min
                        </span>
                      </div>
                    </div>
                    <div className="px-1">
                      <span className="text-terracotta-600 text-xs font-medium uppercase tracking-wide">
                        {recipe.category}
                      </span>
                      <h3 className="font-display font-semibold text-gray-900 mt-1 group-hover:text-terracotta-600 transition-colors line-clamp-2">
                        {recipe.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2 hidden sm:block">
                        {recipe.description}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button size="lg" variant="outline" asChild>
                <Link href="/recipes">
                  Browse All Recipes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section - Warm & Personal */}
        <section className="py-16 lg:py-20 bg-terracotta-50/50">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-terracotta-600 font-medium text-sm tracking-wide uppercase mb-4">
                About Frida Sofia Eats
              </p>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
                Cooking is my love language
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Hi, I'm Frida! The kitchen is my happy place—where I get to be
                creative, unwind, and connect with the people I love. I believe
                that great food doesn't have to be complicated. Here you'll find
                recipes that actually work in real life, designed for busy nights
                and real kitchens.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/about">More About Me</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://www.instagram.com/fridasofiaeats/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Follow on Instagram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

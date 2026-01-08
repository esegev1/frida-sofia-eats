interface RecipeSchemaProps {
  recipe: {
    title: string;
    description: string;
    featured_image_url: string;
    gallery_images?: string[];
    prep_time_minutes?: number | null;
    cook_time_minutes?: number | null;
    total_time_minutes?: number | null;
    servings?: string | null;
    cuisine?: string | null;
    ingredients: { group: string; items: string[] }[];
    instructions: { step: number; text: string; image_url?: string }[];
    published_at?: string | null;
    rating?: { average: number; count: number };
  };
}

export function RecipeSchema({ recipe }: RecipeSchemaProps) {
  const formatDuration = (minutes: number | null | undefined) => {
    if (!minutes) return undefined;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `PT${hours}H${mins > 0 ? `${mins}M` : ""}`;
    }
    return `PT${mins}M`;
  };

  const allIngredients = recipe.ingredients.flatMap((group) => group.items);

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: [
      recipe.featured_image_url,
      ...(recipe.gallery_images || []),
    ].filter(Boolean),
    author: {
      "@type": "Person",
      name: "Frida Sofia",
      url: "https://www.instagram.com/fridasofiaeats/",
    },
    datePublished: recipe.published_at,
    prepTime: formatDuration(recipe.prep_time_minutes),
    cookTime: formatDuration(recipe.cook_time_minutes),
    totalTime: formatDuration(
      recipe.total_time_minutes ||
        (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0)
    ),
    recipeYield: recipe.servings,
    recipeCategory: "Main Course",
    recipeCuisine: recipe.cuisine,
    recipeIngredient: allIngredients,
    recipeInstructions: recipe.instructions.map((inst) => ({
      "@type": "HowToStep",
      text: inst.text,
      ...(inst.image_url ? { image: inst.image_url } : {}),
    })),
    ...(recipe.rating && recipe.rating.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: recipe.rating.average,
            ratingCount: recipe.rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };

  // Remove undefined values
  const cleanSchema = JSON.parse(JSON.stringify(schema));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleanSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

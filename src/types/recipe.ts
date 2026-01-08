// Ingredient structure
export interface IngredientGroup {
  group?: string; // e.g., "For the sauce", "For the chicken"
  items: string[];
}

// Instruction step structure
export interface InstructionStep {
  step: number;
  text: string;
  image_url?: string;
}

// Video links structure
export interface VideoLinks {
  youtube?: string;
  instagram?: string;
  tiktok?: string;
}

// Recipe form input for creating/editing
export interface RecipeFormInput {
  title: string;
  slug: string;
  description?: string;
  intro_text?: string;
  ingredients: IngredientGroup[];
  instructions: InstructionStep[];
  notes?: string;
  featured_image_url?: string;
  gallery_images?: string[];
  video_links?: VideoLinks;
  prep_time_minutes?: number;
  cook_time_minutes?: number;
  total_time_minutes?: number;
  servings?: string;
  difficulty?: "easy" | "medium" | "hard";
  cuisine?: string;
  meta_title?: string;
  meta_description?: string;
  status: "draft" | "published" | "archived";
  category_ids: string[];
}

// Recipe for display with all related data
export interface RecipeDisplay {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  intro_text: string | null;
  ingredients: IngredientGroup[];
  instructions: InstructionStep[];
  notes: string | null;
  featured_image_url: string | null;
  gallery_images: string[];
  video_links: VideoLinks;
  prep_time_minutes: number | null;
  cook_time_minutes: number | null;
  total_time_minutes: number | null;
  servings: string | null;
  difficulty: "easy" | "medium" | "hard" | null;
  cuisine: string | null;
  status: "draft" | "published" | "archived";
  published_at: string | null;
  instagram_post_url: string | null;
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
  rating: {
    average: number | null;
    count: number;
  };
}

// Recipe card for listing pages
export interface RecipeCard {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  featured_image_url: string | null;
  prep_time_minutes: number | null;
  cook_time_minutes: number | null;
  total_time_minutes: number | null;
  difficulty: "easy" | "medium" | "hard" | null;
  published_at: string | null;
  categories: {
    name: string;
    slug: string;
  }[];
  rating: {
    average: number | null;
    count: number;
  };
}

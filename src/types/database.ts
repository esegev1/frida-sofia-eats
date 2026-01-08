export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      recipes: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          intro_text: string | null;
          ingredients: Json;
          instructions: Json;
          notes: string | null;
          featured_image_url: string | null;
          gallery_images: Json;
          video_links: Json;
          prep_time_minutes: number | null;
          cook_time_minutes: number | null;
          total_time_minutes: number | null;
          servings: string | null;
          difficulty: "easy" | "medium" | "hard" | null;
          cuisine: string | null;
          meta_title: string | null;
          meta_description: string | null;
          status: "draft" | "published" | "archived";
          published_at: string | null;
          instagram_post_id: string | null;
          instagram_post_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          intro_text?: string | null;
          ingredients?: Json;
          instructions?: Json;
          notes?: string | null;
          featured_image_url?: string | null;
          gallery_images?: Json;
          video_links?: Json;
          prep_time_minutes?: number | null;
          cook_time_minutes?: number | null;
          total_time_minutes?: number | null;
          servings?: string | null;
          difficulty?: "easy" | "medium" | "hard" | null;
          cuisine?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          status?: "draft" | "published" | "archived";
          published_at?: string | null;
          instagram_post_id?: string | null;
          instagram_post_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          intro_text?: string | null;
          ingredients?: Json;
          instructions?: Json;
          notes?: string | null;
          featured_image_url?: string | null;
          gallery_images?: Json;
          video_links?: Json;
          prep_time_minutes?: number | null;
          cook_time_minutes?: number | null;
          total_time_minutes?: number | null;
          servings?: string | null;
          difficulty?: "easy" | "medium" | "hard" | null;
          cuisine?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          status?: "draft" | "published" | "archived";
          published_at?: string | null;
          instagram_post_id?: string | null;
          instagram_post_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      recipe_categories: {
        Row: {
          recipe_id: string;
          category_id: string;
        };
        Insert: {
          recipe_id: string;
          category_id: string;
        };
        Update: {
          recipe_id?: string;
          category_id?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          recipe_id: string;
          rating: number;
          comment: string | null;
          author_name: string | null;
          status: "pending" | "approved" | "rejected";
          ip_hash: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          recipe_id: string;
          rating: number;
          comment?: string | null;
          author_name?: string | null;
          status?: "pending" | "approved" | "rejected";
          ip_hash?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          recipe_id?: string;
          rating?: number;
          comment?: string | null;
          author_name?: string | null;
          status?: "pending" | "approved" | "rejected";
          ip_hash?: string | null;
          created_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          status: "active" | "unsubscribed";
          subscribed_at: string;
          unsubscribed_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          status?: "active" | "unsubscribed";
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          status?: "active" | "unsubscribed";
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
      };
      media: {
        Row: {
          id: string;
          filename: string;
          original_filename: string | null;
          storage_path: string;
          public_url: string;
          mime_type: string | null;
          file_size: number | null;
          width: number | null;
          height: number | null;
          alt_text: string | null;
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          filename: string;
          original_filename?: string | null;
          storage_path: string;
          public_url: string;
          mime_type?: string | null;
          file_size?: number | null;
          width?: number | null;
          height?: number | null;
          alt_text?: string | null;
          uploaded_at?: string;
        };
        Update: {
          id?: string;
          filename?: string;
          original_filename?: string | null;
          storage_path?: string;
          public_url?: string;
          mime_type?: string | null;
          file_size?: number | null;
          width?: number | null;
          height?: number | null;
          alt_text?: string | null;
          uploaded_at?: string;
        };
      };
      instagram_webhook_log: {
        Row: {
          id: string;
          payload: Json;
          processed: boolean;
          recipe_id: string | null;
          error_message: string | null;
          received_at: string;
          processed_at: string | null;
        };
        Insert: {
          id?: string;
          payload: Json;
          processed?: boolean;
          recipe_id?: string | null;
          error_message?: string | null;
          received_at?: string;
          processed_at?: string | null;
        };
        Update: {
          id?: string;
          payload?: Json;
          processed?: boolean;
          recipe_id?: string | null;
          error_message?: string | null;
          received_at?: string;
          processed_at?: string | null;
        };
      };
    };
    Functions: {
      get_recipe_rating: {
        Args: { recipe_uuid: string };
        Returns: { average_rating: number; review_count: number }[];
      };
      search_recipes: {
        Args: { search_query: string };
        Returns: Database["public"]["Tables"]["recipes"]["Row"][];
      };
    };
  };
};

// Convenience types
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Recipe = Database["public"]["Tables"]["recipes"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type Media = Database["public"]["Tables"]["media"]["Row"];
export type AdminUser = Database["public"]["Tables"]["admin_users"]["Row"];

// Input types
export type CategoryInsert = Database["public"]["Tables"]["categories"]["Insert"];
export type RecipeInsert = Database["public"]["Tables"]["recipes"]["Insert"];
export type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"];

// Extended types with relations
export type RecipeWithCategories = Recipe & {
  categories: Category[];
};

export type RecipeWithRating = Recipe & {
  average_rating: number | null;
  review_count: number;
};

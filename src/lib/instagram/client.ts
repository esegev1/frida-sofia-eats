/**
 * Instagram Graph API Client
 *
 * This client interacts with the Instagram Graph API to fetch posts.
 * Requires an Instagram Business/Creator account connected to a Facebook Page.
 *
 * Setup:
 * 1. Create a Meta Developer App at https://developers.facebook.com/
 * 2. Add Instagram Graph API product
 * 3. Connect your Instagram Business account
 * 4. Generate a long-lived access token
 * 5. Add token to environment variables
 */

const INSTAGRAM_API_BASE = "https://graph.instagram.com";

export interface InstagramPost {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  children?: {
    data: Array<{
      id: string;
      media_type: "IMAGE" | "VIDEO";
      media_url: string;
    }>;
  };
}

export interface InstagramMediaResponse {
  data: InstagramPost[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

/**
 * Fetch recent Instagram posts
 */
export async function fetchRecentPosts(
  limit: number = 10
): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    console.warn("Instagram credentials not configured");
    return [];
  }

  try {
    const fields = [
      "id",
      "caption",
      "media_type",
      "media_url",
      "thumbnail_url",
      "permalink",
      "timestamp",
      "children{id,media_type,media_url}",
    ].join(",");

    const url = `${INSTAGRAM_API_BASE}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

    const response = await fetch(url, {
      next: { revalidate: 1800 }, // Cache for 30 minutes
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Instagram API error:", error);
      return [];
    }

    const data: InstagramMediaResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch Instagram posts:", error);
    return [];
  }
}

/**
 * Extract recipe title from Instagram caption
 * Looks for the first line or text before a line break
 */
export function extractTitleFromCaption(caption: string | undefined): string {
  if (!caption) return "Untitled Recipe";

  // Get first line or first sentence
  const firstLine = caption.split("\n")[0].trim();

  // Remove emojis and clean up
  const cleaned = firstLine
    .replace(/[\u2600-\u27BF]|[\uD83C-\uDBFF\uDC00-\uDFFF]+/g, "") // Remove emojis
    .replace(/[#@]\w+/g, "") // Remove hashtags and mentions
    .trim();

  // Truncate if too long
  if (cleaned.length > 100) {
    return cleaned.substring(0, 100) + "...";
  }

  return cleaned || "Untitled Recipe";
}

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 50)
    .replace(/^-|-$/g, "");
}

/**
 * Check if a post looks like a recipe post
 * (simple heuristic based on caption content)
 */
export function isLikelyRecipePost(caption: string | undefined): boolean {
  if (!caption) return false;

  const recipeKeywords = [
    "recipe",
    "ingredients",
    "cook",
    "bake",
    "make",
    "dinner",
    "lunch",
    "breakfast",
    "meal",
    "dish",
    "prep",
    "serve",
    "easy",
    "quick",
    "delicious",
    "yummy",
    "homemade",
  ];

  const lowerCaption = caption.toLowerCase();
  return recipeKeywords.some((keyword) => lowerCaption.includes(keyword));
}

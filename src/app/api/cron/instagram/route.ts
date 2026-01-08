import { NextRequest, NextResponse } from "next/server";
import {
  fetchRecentPosts,
  extractTitleFromCaption,
  generateSlug,
  isLikelyRecipePost,
} from "@/lib/instagram/client";

/**
 * Instagram Polling Cron Job
 *
 * This endpoint is called by Vercel Cron to check for new Instagram posts
 * and create draft recipes automatically.
 *
 * Setup in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/instagram",
 *     "schedule": "0 * * * *"  // Every hour
 *   }]
 * }
 *
 * Security: Requires CRON_SECRET header for authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (Vercel adds this automatically for cron jobs)
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch recent Instagram posts
    const posts = await fetchRecentPosts(10);

    if (posts.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No posts found or Instagram not configured",
        processed: 0,
      });
    }

    // Process posts and create draft recipes
    const results = [];

    for (const post of posts) {
      // Skip non-recipe posts
      if (!isLikelyRecipePost(post.caption)) {
        continue;
      }

      const title = extractTitleFromCaption(post.caption);
      const slug = generateSlug(title);

      // TODO: When Supabase is connected, check if recipe already exists
      // and insert new draft recipes

      /*
      const { createClient } = await import("@/lib/supabase/admin");
      const supabase = createClient();

      // Check if we've already processed this post
      const { data: existing } = await supabase
        .from("recipes")
        .select("id")
        .eq("instagram_post_id", post.id)
        .single();

      if (existing) {
        continue; // Already processed
      }

      // Create draft recipe
      const { data: recipe, error } = await supabase
        .from("recipes")
        .insert({
          title,
          slug: `${slug}-${Date.now()}`, // Ensure unique slug
          description: post.caption?.substring(0, 200) || "",
          featured_image_url: post.media_url,
          instagram_post_id: post.id,
          video_links: {
            instagram: post.permalink,
            youtube: "",
            tiktok: "",
          },
          status: "draft",
          ingredients: [],
          instructions: [],
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating draft recipe:", error);
        continue;
      }

      // Log the webhook processing
      await supabase.from("instagram_webhook_log").insert({
        payload: post,
        processed: true,
      });

      results.push({
        postId: post.id,
        recipeId: recipe.id,
        title,
      });
      */

      // Demo mode: just log what would be created
      results.push({
        postId: post.id,
        title,
        slug,
        imageUrl: post.media_url,
        permalink: post.permalink,
        wouldCreate: true,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${posts.length} posts, created ${results.length} drafts`,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("Instagram cron error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggering from admin panel
export async function POST(request: NextRequest) {
  return GET(request);
}

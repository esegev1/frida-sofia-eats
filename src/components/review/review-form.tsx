"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StarRating } from "./star-rating";
import { Loader2, CheckCircle } from "lucide-react";

interface ReviewFormProps {
  recipeId: string;
  recipeSlug: string;
}

export function ReviewForm({ recipeId, recipeSlug }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe_id: recipeId,
          recipe_slug: recipeSlug,
          rating,
          comment: comment.trim() || null,
          author_name: authorName.trim() || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit review");
      }

      setIsSubmitted(true);
      setRating(0);
      setComment("");
      setAuthorName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
        <h3 className="font-display font-semibold text-green-800 mb-1">
          Thank you for your review!
        </h3>
        <p className="text-green-700 text-sm">
          Your review will appear after moderation.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-4 text-green-700"
          onClick={() => setIsSubmitted(false)}
        >
          Submit another review
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Rating <span className="text-terracotta-500">*</span>
        </label>
        <StarRating
          rating={rating}
          onRatingChange={setRating}
          size="lg"
          interactive
        />
      </div>

      {/* Comment */}
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Review <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this recipe..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent resize-none"
          maxLength={500}
        />
        <p className="text-xs text-gray-400 mt-1">
          {comment.length}/500 characters
        </p>
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="authorName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Name <span className="text-gray-400">(optional)</span>
        </label>
        <Input
          id="authorName"
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Anonymous"
          maxLength={50}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting || rating === 0}
        className="w-full bg-terracotta-500 hover:bg-terracotta-600"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </Button>
    </form>
  );
}

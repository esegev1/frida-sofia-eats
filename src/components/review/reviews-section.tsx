import { StarRating } from "./star-rating";
import { ReviewForm } from "./review-form";
import { ReviewList } from "./review-list";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  author_name: string | null;
  created_at: string;
}

interface ReviewsSectionProps {
  recipeId: string;
  recipeSlug: string;
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}

export function ReviewsSection({
  recipeId,
  recipeSlug,
  reviews,
  averageRating,
  reviewCount,
}: ReviewsSectionProps) {
  return (
    <section className="mt-12 pt-8 border-t border-cream-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900">
          Reviews
        </h2>
        {reviewCount > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(averageRating)} size="sm" />
            <span className="text-sm text-gray-600">
              {averageRating.toFixed(1)} ({reviewCount} review
              {reviewCount !== 1 ? "s" : ""})
            </span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Review Form */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Leave a Review</h3>
          <ReviewForm recipeId={recipeId} recipeSlug={recipeSlug} />
        </div>

        {/* Reviews List */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">
            What Others Are Saying
          </h3>
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </section>
  );
}

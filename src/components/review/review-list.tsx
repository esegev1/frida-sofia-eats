import { StarRating } from "./star-rating";
import { formatDistanceToNow } from "date-fns";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  author_name: string | null;
  created_at: string;
}

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-gray-500 text-center py-6">
        No reviews yet. Be the first to share your experience!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-cream-50 rounded-lg p-4 border border-cream-200"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <StarRating rating={review.rating} size="sm" />
              <span className="font-medium text-gray-900">
                {review.author_name || "Anonymous"}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(review.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>
          {review.comment && (
            <p className="text-gray-700 text-sm leading-relaxed">
              {review.comment}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

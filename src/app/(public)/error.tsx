"use client";

import { Button } from "@/components/ui/button";

/**
 * Public Pages Error Boundary
 * Catches errors from public pages (recipes, categories, search, etc.)
 * Provides user-friendly error message with navigation options
 */
export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-4">
          We encountered an error while loading this page. Please try again or go back home.
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Go to home
        </Button>
      </div>
    </div>
  );
}

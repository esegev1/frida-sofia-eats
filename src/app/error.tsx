"use client";

import { Button } from "@/components/ui/button";

/**
 * Root Error Boundary
 * Catches errors from any page in the application
 * Provides user-friendly error message and recovery option
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
      <h2 className="text-2xl font-bold text-gray-900">Something went wrong!</h2>
      <p className="text-gray-600 text-center max-w-md">{error.message}</p>
      <div className="flex gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Go home
        </Button>
      </div>
    </div>
  );
}

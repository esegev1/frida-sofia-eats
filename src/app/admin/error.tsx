"use client";

import { Button } from "@/components/ui/button";

/**
 * Admin Error Boundary
 * Catches errors within the admin panel (/admin/*)
 * Provides recovery options specific to admin functionality
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Error</h2>
        <p className="text-gray-600 mb-4">An error occurred in the admin panel. Please try again.</p>
        <p className="text-sm text-gray-500 mb-4 p-3 bg-gray-100 rounded break-words">
          {error.message}
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/admin")}>
          Back to dashboard
        </Button>
      </div>
    </div>
  );
}

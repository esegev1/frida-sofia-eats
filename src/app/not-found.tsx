import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Custom 404 Not Found Page
 * Displays when a page is not found
 * Matches the site design and provides navigation back to home
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-6">
      <div className="text-center">
        <h1 className="text-6xl sm:text-7xl font-display font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page not found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Sorry, we couldn't find the recipe or page you're looking for. Let's get you back on track.
        </p>
      </div>

      <div className="flex gap-3">
        <Link href="/">
          <Button>Go to home</Button>
        </Link>
        <Link href="/recipes">
          <Button variant="outline">Browse recipes</Button>
        </Link>
      </div>
    </div>
  );
}

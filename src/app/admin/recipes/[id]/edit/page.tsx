"use client";

// Prevent static prerendering - this is a dynamic admin page
export const dynamic = "force-dynamic";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function EditRecipePage() {
  const params = useParams();
  const recipeId = params.id as string;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, just redirect to the recipe list
    // TODO: Implement proper edit functionality
    window.location.href = "/admin/recipes";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
    </div>
  );
}

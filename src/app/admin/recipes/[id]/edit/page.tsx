"use client";

// Prevent static prerendering - this is a dynamic admin page
export const dynamic = "force-dynamic";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditRecipePage() {
  const params = useParams();
  const recipeId = params.id as string;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-12 text-center">
        <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
          <Construction className="h-8 w-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2">
          Edit Mode Coming Soon
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Recipe editing functionality is currently in development. For now, you can create new recipes or delete existing ones from the recipes list.
        </p>
        <Button asChild>
          <Link href="/admin/recipes">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipes
          </Link>
        </Button>
      </Card>
    </div>
  );
}

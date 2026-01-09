import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Eye, MoreVertical } from "lucide-react";

// Placeholder - will be replaced with Supabase query
const recipes: {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  category: string;
  published_at: string | null;
}[] = [];

export default function RecipesPage() {
  return (
    <div className="max-w-6xl">
      {/* Header - Responsive: stacked on mobile, horizontal on desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
            Recipes
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your recipe collection
          </p>
        </div>
        <Button asChild className="sm:self-start">
          <Link href="/admin/recipes/new">
            <Plus className="h-4 w-4 mr-2" />
            New Recipe
          </Link>
        </Button>
      </div>

      {/* Empty State */}
      {recipes.length === 0 && (
        <Card className="p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-terracotta-500" />
          </div>
          <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
            No recipes yet
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get started by creating your first recipe. Your delicious content awaits!
          </p>
          <Button asChild>
            <Link href="/admin/recipes/new">Create Your First Recipe</Link>
          </Button>
        </Card>
      )}

      {/* Recipes Table */}
      {recipes.length > 0 && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-200">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                    Title
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                    Category
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                    Published
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe) => (
                  <tr
                    key={recipe.id}
                    className="border-b border-cream-100 last:border-0 hover:bg-cream-50"
                  >
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{recipe.title}</p>
                      <p className="text-sm text-gray-500">/recipes/{recipe.slug}</p>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {recipe.category}
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        variant={
                          recipe.status === "published"
                            ? "success"
                            : recipe.status === "draft"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {recipe.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {recipe.published_at
                        ? new Date(recipe.published_at).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/recipes/${recipe.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <a
                            href={`/recipes/${recipe.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

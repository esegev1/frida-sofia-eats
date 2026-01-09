"use client";

// Prevent static prerendering - this is a dynamic admin page
export const dynamic = "force-dynamic";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, GripVertical, X, Check } from "lucide-react";
import slugify from "slugify";

// Placeholder - will be fetched from Supabase
const initialCategories = [
  { id: "1", name: "Mains", slug: "mains", description: "Main course recipes for dinner", recipeCount: 0 },
  { id: "2", name: "Pasta", slug: "pasta", description: "Pasta dishes and noodle recipes", recipeCount: 0 },
  { id: "3", name: "Chicken", slug: "chicken", description: "Chicken recipes", recipeCount: 0 },
  { id: "4", name: "Beef", slug: "beef", description: "Beef recipes", recipeCount: 0 },
  { id: "5", name: "Seafood", slug: "seafood", description: "Seafood and fish recipes", recipeCount: 0 },
  { id: "6", name: "Soups", slug: "soups", description: "Soups and stews", recipeCount: 0 },
  { id: "7", name: "Appetizers", slug: "appetizers", description: "Starters and appetizers", recipeCount: 0 },
  { id: "8", name: "Side Dishes", slug: "side-dishes", description: "Side dishes and accompaniments", recipeCount: 0 },
  { id: "9", name: "Breakfast", slug: "breakfast", description: "Breakfast and brunch recipes", recipeCount: 0 },
  { id: "10", name: "Desserts", slug: "desserts", description: "Sweet treats and desserts", recipeCount: 0 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const startEditing = (category: typeof categories[0]) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditDescription(category.description);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  const saveEdit = (id: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              name: editName,
              slug: slugify(editName, { lower: true, strict: true }),
              description: editDescription,
            }
          : cat
      )
    );
    cancelEditing();
    // TODO: Save to Supabase
  };

  const deleteCategory = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
      // TODO: Delete from Supabase
    }
  };

  const addCategory = () => {
    if (!newName.trim()) return;
    const newCategory = {
      id: Date.now().toString(),
      name: newName,
      slug: slugify(newName, { lower: true, strict: true }),
      description: newDescription,
      recipeCount: 0,
    };
    setCategories([...categories, newCategory]);
    setNewName("");
    setNewDescription("");
    setShowAddForm(false);
    // TODO: Save to Supabase
  };

  return (
    <div className="max-w-4xl">
      {/* Header - Responsive: stacked on mobile, horizontal on desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
            Categories
          </h1>
          <p className="text-gray-600 mt-1">
            Organize your recipes into categories
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="sm:self-start">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>New Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Category name"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Brief description (optional)"
                rows={2}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addCategory}>Add Category</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories List */}
      <Card>
        <div className="divide-y divide-cream-200">
          {categories.map((category) => (
            <div
              key={category.id}
              className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-cream-50"
            >
              <GripVertical className="hidden sm:block h-5 w-5 text-gray-300 cursor-grab" />

              {editingId === category.id ? (
                // Edit Mode
                <div className="flex-1 space-y-3">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Category name"
                    autoFocus
                  />
                  <Textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description"
                    rows={2}
                  />
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" onClick={() => saveEdit(category.id)}>
                      <Check className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEditing}>
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-gray-900">
                        {category.name}
                      </h3>
                      <span className="text-xs text-gray-400 truncate">
                        /{category.slug}
                      </span>
                    </div>
                    {category.description && (
                      <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                    {category.recipeCount} recipes
                  </span>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditing(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteCategory(category.id)}
                      disabled={category.recipeCount > 0}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

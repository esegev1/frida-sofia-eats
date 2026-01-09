"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  Save,
  Eye,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import slugify from "slugify";

// Categories - will be fetched from Supabase
const availableCategories = [
  { id: "1", name: "Mains", slug: "mains" },
  { id: "2", name: "Pasta", slug: "pasta" },
  { id: "3", name: "Chicken", slug: "chicken" },
  { id: "4", name: "Beef", slug: "beef" },
  { id: "5", name: "Seafood", slug: "seafood" },
  { id: "6", name: "Soups", slug: "soups" },
  { id: "7", name: "Appetizers", slug: "appetizers" },
  { id: "8", name: "Side Dishes", slug: "side-dishes" },
  { id: "9", name: "Breakfast", slug: "breakfast" },
  { id: "10", name: "Desserts", slug: "desserts" },
];

interface IngredientGroup {
  id: string;
  name: string;
  items: string[];
}

interface InstructionStep {
  id: string;
  text: string;
}

export default function NewRecipePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [introText, setIntroText] = useState("");
  const [notes, setNotes] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [status, setStatus] = useState<"draft" | "published">("draft");

  // Video links
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");

  // Ingredients
  const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>([
    { id: "1", name: "", items: [""] },
  ]);

  // Instructions
  const [instructions, setInstructions] = useState<InstructionStep[]>([
    { id: "1", text: "" },
  ]);

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === slugify(title, { lower: true, strict: true })) {
      setSlug(slugify(value, { lower: true, strict: true }));
    }
  };

  // Ingredient group handlers
  const addIngredientGroup = () => {
    setIngredientGroups([
      ...ingredientGroups,
      { id: Date.now().toString(), name: "", items: [""] },
    ]);
  };

  const removeIngredientGroup = (groupId: string) => {
    if (ingredientGroups.length > 1) {
      setIngredientGroups(ingredientGroups.filter((g) => g.id !== groupId));
    }
  };

  const updateIngredientGroupName = (groupId: string, name: string) => {
    setIngredientGroups(
      ingredientGroups.map((g) => (g.id === groupId ? { ...g, name } : g))
    );
  };

  const addIngredientItem = (groupId: string) => {
    setIngredientGroups(
      ingredientGroups.map((g) =>
        g.id === groupId ? { ...g, items: [...g.items, ""] } : g
      )
    );
  };

  const removeIngredientItem = (groupId: string, index: number) => {
    setIngredientGroups(
      ingredientGroups.map((g) =>
        g.id === groupId
          ? { ...g, items: g.items.filter((_, i) => i !== index) }
          : g
      )
    );
  };

  const updateIngredientItem = (groupId: string, index: number, value: string) => {
    setIngredientGroups(
      ingredientGroups.map((g) =>
        g.id === groupId
          ? { ...g, items: g.items.map((item, i) => (i === index ? value : item)) }
          : g
      )
    );
  };

  // Instruction handlers
  const addInstruction = () => {
    setInstructions([
      ...instructions,
      { id: Date.now().toString(), text: "" },
    ]);
  };

  const removeInstruction = (id: string) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((i) => i.id !== id));
    }
  };

  const updateInstruction = (id: string, text: string) => {
    setInstructions(
      instructions.map((i) => (i.id === id ? { ...i, text } : i))
    );
  };

  // Category toggle
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Save handler
  const handleSave = async () => {
    // Reset messages
    setError(null);
    setSuccess(false);

    // Validation
    if (!title.trim()) {
      setError("Recipe title is required");
      return;
    }
    if (!slug.trim()) {
      setError("URL slug is required");
      return;
    }
    if (!description.trim()) {
      setError("Short description is required");
      return;
    }
    if (ingredientGroups.some((g) => g.items.some((i) => !i.trim()))) {
      setError("Please fill in all ingredient fields");
      return;
    }
    if (instructions.some((i) => !i.text.trim())) {
      setError("Please fill in all instruction fields");
      return;
    }

    setSaving(true);
    try {
      // TODO: Save to Supabase
      const recipeData = {
        title,
        slug,
        description,
        intro_text: introText,
        notes,
        featured_image_url: featuredImage,
        prep_time: prepTime ? parseInt(prepTime) : null,
        cook_time: cookTime ? parseInt(cookTime) : null,
        servings,
        difficulty,
        category_ids: selectedCategories,
        status,
        ingredients: ingredientGroups,
        instructions,
        video_links: {
          youtube: youtubeUrl || undefined,
          instagram: instagramUrl || undefined,
          tiktok: tiktokUrl || undefined,
        },
      };

      console.log("📝 Saving recipe:", recipeData);

      // Simulate save delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      setTimeout(() => {
        // Uncomment when Supabase integration is ready:
        // router.push("/admin/recipes");
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save recipe"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl">
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-600">✓ Recipe saved successfully!</p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/recipes">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">
              New Recipe
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            className="h-10 px-3 rounded-lg border border-cream-300 bg-white text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Recipe"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <Input
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Creamy Mushroom Orzo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">/recipes/</span>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="creamy-mushroom-orzo"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A cozy one-pot dinner that's ready in 30 minutes"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-cream-300 rounded-xl p-8 text-center">
                <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop an image, or click to browse
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const fileInput = document.getElementById("featured-image-upload");
                    fileInput?.click();
                  }}
                >
                  Upload Image
                </Button>
                {/* Hidden file input for featured image */}
                <input
                  id="featured-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // In a real app, you'd upload to Supabase Storage here
                      // For now, just store the file name
                      setFeaturedImage(file.name);
                    }
                  }}
                />
              </div>
              {featuredImage && (
                <div className="mt-4">
                  <Input
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="Or paste image URL"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Intro Text */}
          <Card>
            <CardHeader>
              <CardTitle>Intro / Story</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={introText}
                onChange={(e) => setIntroText(e.target.value)}
                placeholder="Share the story behind this recipe..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ingredients</CardTitle>
              <Button variant="outline" size="sm" onClick={addIngredientGroup}>
                <Plus className="h-4 w-4 mr-1" />
                Add Group
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {ingredientGroups.map((group, groupIndex) => (
                <div
                  key={group.id}
                  className={cn(
                    "space-y-3",
                    groupIndex > 0 && "pt-6 border-t border-cream-200"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Input
                      value={group.name}
                      onChange={(e) =>
                        updateIngredientGroupName(group.id, e.target.value)
                      }
                      placeholder="Group name (e.g., For the sauce)"
                      className="flex-1"
                    />
                    {ingredientGroups.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIngredientGroup(group.id)}
                      >
                        <Trash2 className="h-4 w-4 text-gray-400" />
                      </Button>
                    )}
                  </div>
                  {group.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 pl-4">
                      <GripVertical className="h-4 w-4 text-gray-300" />
                      <Input
                        value={item}
                        onChange={(e) =>
                          updateIngredientItem(group.id, index, e.target.value)
                        }
                        placeholder="1 cup pasta"
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIngredientItem(group.id, index)}
                        disabled={group.items.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-4"
                    onClick={() => addIngredientItem(group.id)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Ingredient
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {instructions.map((instruction, index) => (
                <div key={instruction.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <Textarea
                    value={instruction.text}
                    onChange={(e) =>
                      updateInstruction(instruction.id, e.target.value)
                    }
                    placeholder="Describe this step..."
                    rows={2}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeInstruction(instruction.id)}
                    disabled={instructions.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addInstruction}>
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes & Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional tips or variations..."
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Recipe Details */}
          <Card>
            <CardHeader>
              <CardTitle>Recipe Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prep Time
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={prepTime}
                      onChange={(e) => setPrepTime(e.target.value)}
                      placeholder="10"
                    />
                    <span className="text-sm text-gray-500">min</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cook Time
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={cookTime}
                      onChange={(e) => setCookTime(e.target.value)}
                      placeholder="20"
                    />
                    <span className="text-sm text-gray-500">min</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Servings
                </label>
                <Input
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  placeholder="4 servings"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <div className="flex gap-2">
                  {(["easy", "medium", "hard"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={cn(
                        "flex-1 py-2 px-3 rounded-lg text-sm font-medium capitalize transition-colors",
                        difficulty === level
                          ? "bg-terracotta-500 text-white"
                          : "bg-cream-100 text-gray-600 hover:bg-cream-200"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      selectedCategories.includes(category.id)
                        ? "bg-terracotta-500 text-white"
                        : "bg-cream-100 text-gray-600 hover:bg-cream-200"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Video Links */}
          <Card>
            <CardHeader>
              <CardTitle>Video Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <Input
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="https://instagram.com/p/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube
                </label>
                <Input
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TikTok
                </label>
                <Input
                  value={tiktokUrl}
                  onChange={(e) => setTiktokUrl(e.target.value)}
                  placeholder="https://tiktok.com/@..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

// Prevent static prerendering - this is a dynamic admin page that needs runtime environment variables
export const dynamic = "force-dynamic";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image as ImageIcon, Trash2, Copy, Loader2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  created_at: string;
}

/**
 * Media Library Admin Page
 * Allows uploading, viewing, and managing media files in Supabase Storage
 */
export default function MediaPage() {
  // TEST: Log immediately on component render
  console.log("🚀🚀🚀 MediaPage component rendering - code is deployed! FORCE REBUILD");

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const supabase = createClient();

  const fetchMedia = useCallback(async () => {
    console.log("Fetching media from Supabase...");
    const { data, error } = await supabase.storage
      .from("media-library")
      .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });

    if (data && !error) {
      console.log(`Found ${data.length} items in media library`);
      const items: MediaItem[] = data
        .filter((file) => file.name !== ".emptyFolderPlaceholder")
        .map((file) => ({
          id: file.id || file.name,
          name: file.name,
          url: supabase.storage.from("media-library").getPublicUrl(file.name).data.publicUrl,
          created_at: file.created_at || "",
        }));
      console.log(`Loaded ${items.length} media items`);
      setMediaItems(items);
    } else if (error) {
      console.error("Error fetching media:", error);
    }
  }, [supabase.storage]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  async function uploadFile(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    console.log(`Generated filename: ${fileName}`);

    console.log("Uploading to Supabase...");
    const { error } = await supabase.storage
      .from("media-library")
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error);
      alert("Failed to upload: " + error.message);
      return;
    }

    console.log(`Successfully uploaded: ${fileName}`);
    await fetchMedia();
  }

  /**
   * Handle file upload - processes each file and uploads to Supabase Storage
   * Validates file size (max 10MB) before uploading
   */
  async function handleUpload(files: FileList | null) {
    console.log("handleUpload called with files:", files);
    if (!files || files.length === 0) {
      console.log("No files selected");
      return;
    }

    console.log(`Starting upload of ${files.length} file(s)`);
    setIsUploading(true);
    for (const file of Array.from(files)) {
      console.log(`Uploading file: ${file.name} (${file.size} bytes)`);
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Max 10MB.`);
        continue;
      }
      await uploadFile(file);
    }
    console.log("Upload complete");
    setIsUploading(false);
  }

  async function handleDelete(name: string) {
    if (!confirm("Delete this image?")) return;

    const { error } = await supabase.storage.from("media-library").remove([name]);

    if (error) {
      alert("Failed to delete: " + error.message);
      return;
    }

    await fetchMedia();
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleUpload(e.dataTransfer.files);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div className="max-w-6xl">
      {/* TEST: Visual indicator showing new code is deployed */}
      <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded text-green-800 text-sm">
        ✓ New code deployed - CSS layout fixed
      </div>

      {/* Header - Responsive: stacked on mobile, horizontal on desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
            Media Library
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your images and media files
          </p>
        </div>
        {/* Upload button - triggers hidden file input */}
        <Button
          onClick={() => {
            console.log("Upload Files button clicked");
            const fileInput = document.getElementById("file-upload");
            console.log("File input element:", fileInput);
            fileInput?.click();
          }}
          disabled={isUploading}
          className="sm:self-start"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          Upload Files
        </Button>

        {/* Hidden file input element - more reliable than ref */}
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {/* Upload Zone */}
      <Card className="mb-8">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-colors ${
            isDragging
              ? "border-terracotta-500 bg-terracotta-50"
              : "border-cream-300"
          }`}
        >
          <Upload className="h-10 sm:h-12 w-10 sm:w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            Drag and drop files here
          </h3>
          <p className="text-gray-600 mb-4">
            or click to browse from your computer
          </p>
          {/* Browse button - opens file dialog */}
          <Button
            variant="outline"
            onClick={() => {
              console.log("Browse Files button clicked");
              const fileInput = document.getElementById("file-upload");
              console.log("File input element:", fileInput);
              fileInput?.click();
            }}
            disabled={isUploading}
          >
            Browse Files
          </Button>
          <p className="text-xs text-gray-400 mt-4">
            Supported formats: JPG, PNG, WebP (max 10MB)
          </p>
        </div>
      </Card>

      {/* Empty State */}
      {mediaItems.length === 0 && !isUploading && (
        <Card className="p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mb-4">
            <ImageIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
            No media yet
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Upload your first image to get started. Images will be stored in
            Supabase Storage and available for use in your recipes.
          </p>
        </Card>
      )}

      {/* Media Grid - Responsive: 2 cols mobile, 3 cols tablet, 4 cols desktop, 6 cols large */}
      {mediaItems.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {mediaItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              <div className="aspect-square bg-cream-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyUrl(item.url)}
                  >
                    {copied === item.url ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDelete(item.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-2 sm:p-3">
                <p className="text-xs sm:text-sm text-gray-600 truncate">{item.name}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

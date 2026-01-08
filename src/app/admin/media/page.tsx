"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image as ImageIcon, Trash2, Copy } from "lucide-react";

// Placeholder - will be fetched from Supabase Storage
const mediaItems: {
  id: string;
  filename: string;
  url: string;
  uploadedAt: string;
}[] = [];

export default function MediaPage() {
  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Media Library
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your images and media files
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Upload Zone */}
      <Card className="mb-8">
        <div className="border-2 border-dashed border-cream-300 rounded-xl p-12 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Drag and drop files here
          </h3>
          <p className="text-gray-600 mb-4">
            or click to browse from your computer
          </p>
          <Button variant="outline">Browse Files</Button>
          <p className="text-xs text-gray-400 mt-4">
            Supported formats: JPG, PNG, WebP (max 10MB)
          </p>
        </div>
      </Card>

      {/* Empty State */}
      {mediaItems.length === 0 && (
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

      {/* Media Grid */}
      {mediaItems.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              <div className="aspect-square bg-cream-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.filename}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button variant="secondary" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-600 truncate">{item.filename}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

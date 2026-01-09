"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer, Copy, Share2, Check, Instagram } from "lucide-react";

interface RecipeActionsProps {
  recipe: {
    title: string;
    ingredients: { group: string; items: string[] }[];
    instructions: { step: number; text: string }[];
    video_links?: {
      instagram?: string;
      youtube?: string;
      tiktok?: string;
    };
  };
}

export function RecipeActions({ recipe }: RecipeActionsProps) {
  const [copied, setCopied] = useState(false);

  const formatRecipeText = () => {
    let text = `${recipe.title}\n\n`;
    text += "INGREDIENTS\n";
    text += "─────────────\n";
    recipe.ingredients.forEach((group) => {
      if (group.group) {
        text += `\n${group.group}\n`;
      }
      group.items.forEach((item) => {
        text += `• ${item}\n`;
      });
    });
    text += "\nINSTRUCTIONS\n";
    text += "─────────────\n";
    recipe.instructions.forEach((inst) => {
      text += `${inst.step}. ${inst.text}\n\n`;
    });
    return text;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    const text = formatRecipeText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy URL
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-2 no-print">
      <Button variant="outline" size="sm" onClick={handlePrint} className="flex-1 sm:flex-none min-w-[100px] sm:min-w-0">
        <Printer className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Print</span>
      </Button>
      <Button variant="outline" size="sm" onClick={handleCopy} className="flex-1 sm:flex-none min-w-[120px] sm:min-w-0">
        {copied ? (
          <>
            <Check className="h-4 w-4 sm:mr-2 text-green-600" />
            <span className="hidden sm:inline">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Copy Recipe</span>
          </>
        )}
      </Button>
      <Button variant="outline" size="sm" onClick={handleShare} className="flex-1 sm:flex-none min-w-[100px] sm:min-w-0">
        <Share2 className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Share</span>
      </Button>
      {recipe.video_links?.instagram && (
        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex-1 sm:flex-none min-w-[120px] sm:min-w-0 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
        >
          <a
            href={recipe.video_links.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-4 w-4 sm:mr-2 text-pink-600" />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium hidden sm:inline">
              Instagram
            </span>
          </a>
        </Button>
      )}
    </div>
  );
}

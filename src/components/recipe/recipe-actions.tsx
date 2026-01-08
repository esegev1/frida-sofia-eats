"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer, Copy, Share2, Check } from "lucide-react";

interface RecipeActionsProps {
  recipe: {
    title: string;
    ingredients: { group: string; items: string[] }[];
    instructions: { step: number; text: string }[];
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
    <div className="flex flex-wrap gap-2 no-print">
      <Button variant="outline" size="sm" onClick={handlePrint}>
        <Printer className="h-4 w-4 mr-2" />
        Print
      </Button>
      <Button variant="outline" size="sm" onClick={handleCopy}>
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2 text-green-600" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy Recipe
          </>
        )}
      </Button>
      <Button variant="outline" size="sm" onClick={handleShare}>
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
    </div>
  );
}

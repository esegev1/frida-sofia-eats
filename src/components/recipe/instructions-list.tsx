"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface InstructionsListProps {
  instructions: {
    step: number;
    text: string;
    image_url?: string;
  }[];
}

export function InstructionsList({ instructions }: InstructionsListProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (step: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(step)) {
      newCompleted.delete(step);
    } else {
      newCompleted.add(step);
    }
    setCompletedSteps(newCompleted);
  };

  return (
    <ol className="space-y-6">
      {instructions.map((instruction) => {
        const isCompleted = completedSteps.has(instruction.step);
        return (
          <li
            key={instruction.step}
            className="flex gap-4 cursor-pointer group"
            onClick={() => toggleStep(instruction.step)}
          >
            <div
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                isCompleted
                  ? "bg-green-500 text-white"
                  : "bg-terracotta-100 text-terracotta-600 group-hover:bg-terracotta-200"
              )}
            >
              {isCompleted ? (
                <Check className="h-4 w-4" />
              ) : (
                instruction.step
              )}
            </div>
            <div className="flex-1 pt-1">
              <p
                className={cn(
                  "text-gray-700 leading-relaxed transition-colors",
                  isCompleted && "text-gray-400"
                )}
              >
                {instruction.text}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

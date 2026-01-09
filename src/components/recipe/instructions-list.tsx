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
            className="flex gap-4 cursor-pointer group -mx-2 px-2 py-2 rounded-lg hover:bg-cream-50 transition-colors"
            onClick={() => toggleStep(instruction.step)}
          >
            <div
              className={cn(
                "flex-shrink-0 w-9 h-9 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                isCompleted
                  ? "bg-green-500 text-white"
                  : "bg-terracotta-100 text-terracotta-600 group-hover:bg-terracotta-200"
              )}
            >
              {isCompleted ? (
                <Check className="h-5 w-5 sm:h-4 sm:w-4" />
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

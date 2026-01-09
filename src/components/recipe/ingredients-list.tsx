"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface IngredientsListProps {
  ingredients: {
    group: string;
    items: string[];
  }[];
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemKey: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemKey)) {
      newChecked.delete(itemKey);
    } else {
      newChecked.add(itemKey);
    }
    setCheckedItems(newChecked);
  };

  return (
    <div className="space-y-4">
      {ingredients.map((group, groupIndex) => (
        <div key={groupIndex}>
          {group.group && (
            <h3 className="font-medium text-gray-900 mb-2 text-sm uppercase tracking-wide">
              {group.group}
            </h3>
          )}
          <ul className="space-y-3">
            {group.items.map((item, itemIndex) => {
              const itemKey = `${groupIndex}-${itemIndex}`;
              const isChecked = checkedItems.has(itemKey);
              return (
                <li key={itemKey}>
                  <label className="flex items-start gap-3 cursor-pointer group py-1 -mx-2 px-2 rounded hover:bg-cream-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(itemKey)}
                      className="mt-0.5 h-5 w-5 sm:h-4 sm:w-4 rounded border-gray-300 text-terracotta-500 focus:ring-terracotta-500 flex-shrink-0"
                    />
                    <span
                      className={cn(
                        "text-gray-700 transition-colors flex-1 leading-relaxed",
                        isChecked && "line-through text-gray-400"
                      )}
                    >
                      {item}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

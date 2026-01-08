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
          <ul className="space-y-2">
            {group.items.map((item, itemIndex) => {
              const itemKey = `${groupIndex}-${itemIndex}`;
              const isChecked = checkedItems.has(itemKey);
              return (
                <li key={itemKey}>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(itemKey)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-terracotta-500 focus:ring-terracotta-500"
                    />
                    <span
                      className={cn(
                        "text-gray-700 transition-colors",
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

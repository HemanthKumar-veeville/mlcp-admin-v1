"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectionCardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: string;
  isSelected?: boolean;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

const SelectionCard = React.forwardRef<HTMLButtonElement, SelectionCardProps>(
  (
    {
      className,
      icon,
      label,
      isSelected = false,
      variant = "default",
      size = "md",
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-6 py-2.5 gap-2",
      md: "px-8 py-2.5 gap-2",
      lg: "px-10 py-3 gap-3",
    };

    const iconSizes = {
      sm: "text-base",
      md: "text-base",
      lg: "text-lg",
    };

    const checkSizes = {
      sm: "w-4 h-4",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        props.onClick?.(event as any);
      }
      onKeyDown?.(event);
    };

    return (
      <button
        ref={ref}
        role="radio"
        aria-checked={isSelected}
        className={cn(
          "w-full rounded-md flex items-center transition-all duration-200 border",
          "focus:outline-none focus:ring-2 focus:ring-[#cf4326] focus:ring-offset-2",
          "cursor-pointer",
          sizeClasses[size],
          isSelected
            ? "bg-[#cf4326] border-[#cf4326]"
            : "bg-white border-[#d4d4d4] hover:border-[#cf4326] hover:bg-gray-50",
          className
        )}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {icon && (
          <span
            className={cn(
              iconSizes[size],
              "flex-shrink-0 transition-colors duration-200",
              isSelected ? "text-white" : "text-[#cf4326]"
            )}
          >
            {icon}
          </span>
        )}

        <span
          className={cn(
            "text-sm font-medium font-['Inter'] flex-1 text-left transition-colors duration-200",
            isSelected ? "text-white" : "text-[#525252]"
          )}
        >
          {label}
        </span>

        {isSelected && (
          <Check
            className={cn(
              "text-white flex-shrink-0 transition-opacity duration-200",
              checkSizes[size]
            )}
          />
        )}
      </button>
    );
  }
);

SelectionCard.displayName = "SelectionCard";

export { SelectionCard };

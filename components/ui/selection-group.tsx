"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SelectionCard } from "./selection-card";

export interface SelectionOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SelectionGroupProps {
  options: SelectionOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  "aria-label"?: string;
}

const SelectionGroup = React.forwardRef<HTMLDivElement, SelectionGroupProps>(
  (
    {
      options,
      value,
      onValueChange,
      className,
      variant = "default",
      size = "md",
      disabled = false,
      "aria-label": ariaLabel = "Selection options",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={ariaLabel}
        className={cn("flex flex-col gap-4", className)}
        {...props}
      >
        {options.map((option) => (
          <SelectionCard
            key={option.value}
            icon={option.icon}
            label={option.label}
            isSelected={value === option.value}
            variant={variant}
            size={size}
            disabled={disabled}
            onClick={() => !disabled && onValueChange?.(option.value)}
            aria-label={option.label}
          />
        ))}
      </div>
    );
  }
);

SelectionGroup.displayName = "SelectionGroup";

export { SelectionGroup };

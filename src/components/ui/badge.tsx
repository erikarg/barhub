import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "success"
  | "danger"
  | "warning"
  | "info";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-900",
  success: "bg-green-100 text-green-800 hover:bg-green-100",
  danger: "bg-red-100 text-red-800 hover:bg-red-100",
  warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  info: "bg-blue-100 text-blue-800 hover:bg-blue-100",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      role="status"
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded w-fit whitespace-nowrap",
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

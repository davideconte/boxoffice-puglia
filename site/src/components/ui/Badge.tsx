import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  color?: string; // hex from Sanity category
  className?: string;
  size?: "sm" | "md";
}

export function Badge({ label, color, className, size = "md" }: BadgeProps) {
  const style = color
    ? { backgroundColor: color + "20", color, borderColor: color + "40" }
    : undefined;

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1",
        !color && "bg-brand-blue-light text-brand-blue border-brand-blue/30",
        className
      )}
      style={style}
    >
      {label}
    </span>
  );
}

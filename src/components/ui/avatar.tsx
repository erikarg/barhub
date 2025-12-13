import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";

export function Avatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: Omit<ImageProps, "fill" | "alt"> & { className?: string; alt?: string }) {
  return (
    <Image
      data-slot="avatar-image"
      fill
      sizes="40px"
      className={cn("object-cover", className)}
      alt={props.alt ?? ""}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  );
}

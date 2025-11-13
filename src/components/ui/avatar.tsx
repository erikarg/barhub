import { cn } from "@/lib/utils";

export function Avatar({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="avatar" className={cn(className)} {...props} />;
}

export function AvatarImage({
  className,
  ...props
}: React.ComponentProps<"img">) {
  return <img data-slot="avatar-image" className={cn(className)} {...props} />;
}

export function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="avatar-fallback" className={cn(className)} {...props} />
  );
}

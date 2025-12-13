"use client";

import {
  LayoutDashboard,
  ClipboardList,
  Users,
  UtensilsCrossed,
  Box,
  X,
  Menu,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { clearSessionCookie, clearSessionFromLocalStorage } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

export default function Sidebar({
  isOpen,
  toggleSidebar,
  variant = "desktop",
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="size-5" />,
      href: "/dashboard",
    },
    {
      name: "Tables",
      icon: <UtensilsCrossed className="size-5" />,
      href: "/tables",
    },
    {
      name: "Orders",
      icon: <ClipboardList className="size-5" />,
      href: "/orders",
    },
    {
      name: "Inventory",
      icon: <Box className="size-5" />,
      href: "/inventory",
    },
    { name: "Staff", icon: <Users className="size-5" />, href: "/staff" },
  ];

  const isMobile = variant === "mobile";

  return (
    <div
      className={cn(
        "h-full border-r bg-background text-foreground px-3 flex flex-col",
        isMobile
          ? "w-full"
          : cn("transition-[width] duration-200", isOpen ? "w-64" : "w-16")
      )}
    >
      <div
        className={cn(
          "flex items-center py-5 px-2",
          isOpen ? "justify-between" : "justify-center"
        )}
      >
        {(isMobile || isOpen) && (
          <div className="text-lg font-semibold">BarHub</div>
        )}
        <div className={cn("flex items-center gap-2", isOpen ? "" : "flex-col")}>
          <ThemeToggle />
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={
              isMobile
                ? "Close navigation"
                : isOpen
                  ? "Collapse sidebar"
                  : "Expand sidebar"
            }
            aria-expanded={isMobile ? true : isOpen}
            className="inline-flex items-center justify-center rounded-md p-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <nav aria-label="Primary navigation">
        <ul
          className={cn(
            "mt-6 space-y-1 flex flex-col",
            isOpen ? "" : "items-center"
          )}
        >
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                href={item.href}
                key={item.name}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                aria-label={isOpen ? undefined : item.name}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent",
                  isOpen ? "" : "justify-center"
                )}
              >
                <span className="text-lg">{item.icon}</span>
                {isOpen ? (
                  <span>{item.name}</span>
                ) : (
                  <span className="sr-only">{item.name}</span>
                )}
              </Link>
            );
          })}
        </ul>
      </nav>

      <div className={cn("mt-auto pb-4 pt-6 space-y-2")}>
        <button
          type="button"
          onClick={() => {
            clearSessionFromLocalStorage();
            clearSessionCookie();
            onNavigate?.();
            router.replace("/login");
          }}
          aria-label={isOpen ? undefined : "Logout"}
          className={cn(
            "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isOpen ? "" : "justify-center"
          )}
        >
          <span className="text-lg">
            <LogOut className="size-5" />
          </span>
          {isOpen ? <span>Logout</span> : <span className="sr-only">Logout</span>}
        </button>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import Sidebar from "@/components/sidebar";
import { Menu } from "lucide-react";

export function MainShell({ children }: { children: React.ReactNode }) {
  const [isDesktopExpanded, setIsDesktopExpanded] = React.useState(true);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const toggleDesktopSidebar = React.useCallback(() => {
    setIsDesktopExpanded((open) => !open);
  }, []);

  const openMobileSidebar = React.useCallback(() => setIsMobileOpen(true), []);
  const closeMobileSidebar = React.useCallback(() => setIsMobileOpen(false), []);

  React.useEffect(() => {
    if (!isMobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileSidebar();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileOpen, closeMobileSidebar]);

  return (
    <div className="min-h-dvh md:flex">
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b bg-background/80 px-4 py-3 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={openMobileSidebar}
          aria-label="Open navigation"
          className="inline-flex items-center justify-center rounded-md p-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Menu className="size-5" />
        </button>
        <div className="text-sm font-semibold tracking-tight">BarHub</div>
      </header>

      <div className="hidden md:block">
        <Sidebar
          variant="desktop"
          isOpen={isDesktopExpanded}
          toggleSidebar={toggleDesktopSidebar}
        />
      </div>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            className="absolute inset-0 bg-black/40"
            onClick={closeMobileSidebar}
          />
          <div className="absolute inset-y-0 left-0 w-[18rem] bg-background shadow-lg">
            <Sidebar
              variant="mobile"
              isOpen={true}
              toggleSidebar={closeMobileSidebar}
              onNavigate={closeMobileSidebar}
            />
          </div>
        </div>
      )}

      <main className="flex-1 bg-muted/30 px-4 py-5 md:p-6 overflow-y-auto">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>
    </div>
  );
}



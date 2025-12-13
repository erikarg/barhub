"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  createDemoSession,
  readSessionFromLocalStorage,
  setSessionCookie,
  writeSessionToLocalStorage,
} from "@/lib/auth";

export default function LoginPage() {
  const [showRegister, setShowRegister] = useState(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    return params.get("mode") === "register";
  });
  const router = useRouter();
  const [nextUrl] = useState(() => {
    if (typeof window === "undefined") return "/dashboard";
    const params = new URLSearchParams(window.location.search);
    return params.get("next") || "/dashboard";
  });

  useEffect(() => {
    const existing = readSessionFromLocalStorage();
    if (existing) router.replace(nextUrl);
  }, [router, nextUrl]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-muted/30 p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.8_0.12_260)/.25,transparent_60%)]"
      />

      <AnimatePresence mode="wait">
        {!showRegister ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md"
          >
            <Card>
              <CardHeader className="text-center space-y-2">
                <div className="text-sm font-semibold tracking-tight">
                  BarHub
                </div>
                <CardTitle className="text-2xl">Sign in</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Use any email/password (demo UI only).
                </p>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = new FormData(form);
                    const email = String(data.get("email") || "");
                    const session = createDemoSession({ email });
                    writeSessionToLocalStorage(session);
                    setSessionCookie();
                    router.replace(nextUrl);
                  }}
                >
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="••••••••"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Sign in
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Don’t have an account?{" "}
                    <button
                      type="button"
                      className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                      onClick={() => setShowRegister(true)}
                    >
                      Create one
                    </button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md"
          >
            <Card>
              <CardHeader className="text-center space-y-2">
                <div className="text-sm font-semibold tracking-tight">
                  BarHub
                </div>
                <CardTitle className="text-2xl">Create account</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Demo UI only (no real auth backend).
                </p>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = new FormData(form);
                    const name = String(data.get("name") || "");
                    const email = String(data.get("email") || "");
                    const session = createDemoSession({ name, email });
                    writeSessionToLocalStorage(session);
                    setSessionCookie();
                    router.replace(nextUrl);
                  }}
                >
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Jamie Appleseed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="reg-email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="reg-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="reg-password"
                      className="text-sm font-medium"
                    >
                      Password
                    </label>
                    <Input
                      id="reg-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="••••••••"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Create account
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                      onClick={() => setShowRegister(false)}
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

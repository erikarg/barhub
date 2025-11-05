"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden md:flex flex-[7] relative items-center justify-center bg-black">
        <div className="z-10 text-white text-center space-y-6">
          <div className="text-6xl font-bold">🍺 BarHub</div>
          <p className="text-2xl">Manage your bar efficiently</p>
        </div>
      </div>

      <div className="flex flex-[3] items-center justify-center bg-gradient-to-b from-blue-900 to-black p-8">
        <AnimatePresence mode="wait">
          {!showRegister ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-2xl text-center font-semibold text-black">
                    Login
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Password" />
                  <Button className="w-full">Sign In</Button>
                  <p className="text-center text-sm text-gray-700">
                    Don’t have an account?{" "}
                    <button
                      className="text-green-600 hover:underline"
                      onClick={() => setShowRegister(true)}
                    >
                      Register
                    </button>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-2xl text-center font-semibold text-black">
                    Create Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="text" placeholder="Name" />
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Password" />
                  <Button className="w-full">Register</Button>
                  <p className="text-center text-sm text-gray-700">
                    Already have an account?{" "}
                    <button
                      className="text-green-600 hover:underline"
                      onClick={() => setShowRegister(false)}
                    >
                      Login
                    </button>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

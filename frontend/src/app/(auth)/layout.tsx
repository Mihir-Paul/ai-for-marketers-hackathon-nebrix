"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left pane - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {children}
        </div>
      </div>
      
      {/* Right pane - Graphic/Illustration */}
      <div className="relative hidden w-0 flex-1 lg:block bg-muted/20">
        <div className="absolute inset-0 h-full w-full bg-[#10141F] object-cover">
          <div className="flex h-full flex-col justify-center items-center p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center max-w-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mb-8 shadow-2xl shadow-primary/50">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Supercharge Your Marketing
              </h2>
              <p className="mt-4 text-lg leading-6 text-muted-foreground">
                Join the world's most advanced AI platform designed specifically for modern marketing teams.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050816]">
      <Navbar />
      <section className="relative flex flex-1 items-center justify-center px-4 py-16 md:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,140,255,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(255,213,0,0.15),_transparent_55%)] opacity-70" />
        <div className="relative w-full max-w-md">
          <GlassCard className="p-6 bg-[#050816]/90">
            <h1 className="text-2xl font-semibold text-white mb-2">
              Log in
            </h1>
            <p className="text-sm text-gray-300 mb-6">
              Access your leads, jobs, and AI assistant.
            </p>
            <form className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-300">Email</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[#2D8CFF]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-300">Password</label>
                <input
                  type="password"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[#2D8CFF]"
                />
              </div>
              <Button className="w-full mt-2">Log in</Button>
            </form>
          </GlassCard>
        </div>
      </section>
      <Footer />
    </main>
  );
}

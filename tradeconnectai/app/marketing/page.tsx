"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export default function MarketingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050816]">
      <Navbar />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,140,255,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(255,213,0,0.18),_transparent_55%)] opacity-80" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-24 md:px-6">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-gray-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2D8CFF]" />
              AI that works as hard as you do.
            </span>

            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
              Turn missed calls into{" "}
              <span className="bg-gradient-to-r from-[#2D8CFF] to-[#FFD500] bg-clip-text text-transparent">
                booked jobs.
              </span>
            </h1>

            <p className="max-w-xl text-base text-gray-300 md:text-lg">
              TradeConnectAI answers enquiries instantly, captures job details,
              and sends you ready‑to‑book leads while you stay on the tools.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg">Start free</Button>
              <Button variant="secondary" size="lg">
                See how it works
              </Button>
              <span className="text-xs text-gray-400">
                No credit card. Built for trades.
              </span>
            </div>
          </div>

          <div className="flex-1">
            <GlassCard className="relative mx-auto max-w-md border-[#2D8CFF]/40 bg-[#050816]/80 p-5">
              <div className="mb-4 flex items-center justify-between text-xs text-gray-300">
                <span className="font-medium text-white">Today&apos;s leads</span>
                <span className="rounded-full bg-[#2D8CFF]/20 px-2 py-0.5 text-[10px] text-[#2D8CFF]">
                  Live preview
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                  <div>
                    <p className="font-medium text-white">Boiler service</p>
                    <p className="text-xs text-gray-400">
                      “Hi, can you quote for a boiler service in CF62?”
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400">
                    New lead
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                  <div>
                    <p className="font-medium text-white">Fuse box upgrade</p>
                    <p className="text-xs text-gray-400">
                      “Consumer unit keeps tripping, need it checked.”
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] text-amber-300">
                    In progress
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                  <div>
                    <p className="font-medium text-white">Bathroom refit</p>
                    <p className="text-xs text-gray-400">
                      “Looking for a quote for full bathroom refit.”
                    </p>
                  </div>
                  <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] text-sky-300">
                    Follow‑up
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-black/40 p-3 text-xs text-gray-300">
                <p className="mb-1 text-[11px] uppercase tracking-wide text-gray-400">
                  AI summary
                </p>
                <p>
                  3 new leads today. Estimated value:{" "}
                  <span className="font-semibold text-white">£1,250–£1,800</span>.
                  Best next action: call boiler service lead first.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#050816]">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Built for real trades, not tech people.
            </h2>
            <p className="mt-3 text-sm text-gray-300 md:text-base">
              Whether you&apos;re a plumber, electrician, builder, or locksmith,
              TradeConnectAI keeps your phone working even when your hands are
              full.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Instant AI responses"
              desc="Reply to customers in seconds, 24/7, with trade‑specific answers that sound like you."
            />

            <FeatureCard
              title="Lead capture done for you"
              desc="Name, number, postcode, job details — captured and organised automatically."
            />

            <FeatureCard
              title="From enquiry to booked job"
              desc="Turn more messages into confirmed bookings with structured follow‑ups."
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

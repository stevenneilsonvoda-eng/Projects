import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050816]">
      <Navbar />
      <section className="mx-auto flex-1 max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Pricing
          </h1>
          <p className="mt-3 text-sm text-gray-300 md:text-base">
            Simple, transparent pricing for trades that want more booked jobs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <GlassCard className="p-6">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Starter
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">£0</p>
            <p className="text-xs text-gray-400 mb-4">Per month</p>
            <ul className="mb-6 space-y-1.5 text-sm text-gray-300">
              <li>• AI chat on your website</li>
              <li>• Lead capture to your email</li>
              <li>• Basic job summaries</li>
            </ul>
            <Button className="w-full" variant="secondary">
              Get started
            </Button>
          </GlassCard>

          <GlassCard className="p-6 border-[#2D8CFF]/50 relative">
            <span className="absolute -top-3 right-4 rounded-full bg-[#FFD500] px-3 py-1 text-[10px] font-semibold text-black">
              Most popular
            </span>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Pro
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">£49</p>
            <p className="text-xs text-gray-400 mb-4">Per month</p>
            <ul className="mb-6 space-y-1.5 text-sm text-gray-300">
              <li>• Everything in Starter</li>
              <li>• SMS + WhatsApp lead alerts</li>
              <li>• Advanced AI job summaries</li>
              <li>• Priority support</li>
            </ul>
            <Button className="w-full">Choose Pro</Button>
          </GlassCard>

          <GlassCard className="p-6">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Trades Business
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">Let&apos;s talk</p>
            <p className="text-xs text-gray-400 mb-4">Per month</p>
            <ul className="mb-6 space-y-1.5 text-sm text-gray-300">
              <li>• Multi‑user team access</li>
              <li>• Custom integrations</li>
              <li>• Dedicated success manager</li>
            </ul>
            <Button className="w-full" variant="secondary">
              Book a call
            </Button>
          </GlassCard>
        </div>
      </section>
      <Footer />
    </main>
  );
}

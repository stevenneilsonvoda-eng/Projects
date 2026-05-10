// app/page.tsx
import Link from "next/link";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <main className="bg-slate-950 text-white">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          AI that turns conversations into customers.
        </h1>

        <p className="text-slate-300 text-lg max-w-2xl mb-10">
          TradeConnectAI captures leads, books jobs, and follows up automatically —
          even while you're on the tools. Built for trades, agencies, and local businesses.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="#live-demo"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-base font-medium"
          >
            Try Live Demo
          </Link>

          {/* TRIAL BUTTON */}
          <button
            onClick={async () => {
              const res = await fetch("/api/trial/start", { method: "POST" });
              const data = await res.json();
              window.location.href = data.url;
            }}
            className="border border-slate-600 hover:border-slate-400 text-slate-200 px-6 py-3 rounded-lg text-base font-medium"
          >
            Start Free Trial
          </button>
        </div>

        <ul className="text-slate-400 text-sm space-y-1 mt-8">
          <li>• No code needed — works on any website</li>
          <li>• Captures leads automatically</li>
          <li>• Books appointments while you're busy</li>
          <li>• Built for trades, agencies, and local businesses</li>
        </ul>
      </section>

      {/* LIVE DEMO SECTION */}
      <section id="live-demo" className="max-w-6xl mx-auto px-4 pb-24">
        <h2 className="text-3xl font-semibold mb-4">Live AI Chat Demo</h2>
        <p className="text-slate-300 text-sm mb-6">
          This is the same interface your customers will use on their own sites.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl overflow-hidden">
          <iframe
            src="/demo/chat"
            className="w-full h-[600px]"
          />
        </div>

        {/* TRIAL BUTTON UNDER DEMO */}
        <div className="mt-6">
          <button
            onClick={async () => {
              const res = await fetch("/api/trial/start", { method: "POST" });
              const data = await res.json();
              window.location.href = data.url;
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Start Free Trial
          </button>
        </div>
      </section>

      <Pricing />
      <Testimonials />

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-10 mt-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} TradeConnectAI. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/embed" className="hover:text-white">Embed Code</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}

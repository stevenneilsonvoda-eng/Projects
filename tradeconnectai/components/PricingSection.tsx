// components/Pricing.tsx

export default function Pricing() {
  return (
    <section id="pricing" className="bg-slate-950 text-white py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
        <p className="text-slate-400 mb-12">
          No contracts. No hidden fees. Cancel anytime.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Starter */}
          <div className="border border-slate-800 rounded-2xl p-8 bg-slate-900/50">
            <h3 className="text-2xl font-semibold mb-2">Starter</h3>
            <p className="text-slate-400 mb-6">Perfect for small businesses</p>
            <p className="text-4xl font-bold mb-6">
              £19<span className="text-lg text-slate-400">/mo</span>
            </p>

            <ul className="text-slate-300 space-y-2 mb-8 text-left">
              <li>• AI Chat Widget</li>
              <li>• Lead Inbox</li>
              <li>• Basic Automations</li>
              <li>• 500 messages/mo</li>
            </ul>

            {/* TRIAL BUTTON */}
            <button
              onClick={async () => {
                const res = await fetch("/api/trial/start", { method: "POST" });
                const data = await res.json();
                window.location.href = data.url;
              }}
              className="block bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg w-full"
            >
              Start Free Trial
            </button>
          </div>

          {/* Pro */}
          <div className="border border-blue-600 rounded-2xl p-8 bg-blue-600/10 shadow-xl scale-105">
            <h3 className="text-2xl font-semibold mb-2">Pro</h3>
            <p className="text-slate-300 mb-6">Our most popular plan</p>
            <p className="text-4xl font-bold mb-6">
              £49<span className="text-lg text-slate-400">/mo</span>
            </p>

            <ul className="text-slate-300 space-y-2 mb-8 text-left">
              <li>• Everything in Starter</li>
              <li>• Unlimited messages</li>
              <li>• AI Voice Calls</li>
              <li>• CRM + Calendar</li>
              <li>• Automations</li>
            </ul>

            {/* TRIAL BUTTON */}
            <button
              onClick={async () => {
                const res = await fetch("/api/trial/start", { method: "POST" });
                const data = await res.json();
                window.location.href = data.url;
              }}
              className="block bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg w-full"
            >
              Start Free Trial
            </button>
          </div>

          {/* Ultimate */}
          <div className="border border-slate-800 rounded-2xl p-8 bg-slate-900/50">
            <h3 className="text-2xl font-semibold mb-2">Ultimate</h3>
            <p className="text-slate-400 mb-6">For agencies & high‑volume teams</p>
            <p className="text-4xl font-bold mb-6">
              £99<span className="text-lg text-slate-400">/mo</span>
            </p>

            <ul className="text-slate-300 space-y-2 mb-8 text-left">
              <li>• Everything in Pro</li>
              <li>• Multi‑business support</li>
              <li>• Team seats</li>
              <li>• Priority support</li>
            </ul>

            {/* TRIAL BUTTON */}
            <button
              onClick={async () => {
                const res = await fetch("/api/trial/start", { method: "POST" });
                const data = await res.json();
                window.location.href = data.url;
              }}
              className="block bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg w-full"
            >
              Start Free Trial
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

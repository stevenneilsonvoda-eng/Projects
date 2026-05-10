"use client";

export default function BillingPage() {
  const openPortal = async () => {
    const res = await fetch("/api/stripe/create-portal", {
      method: "POST",
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const upgrade = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Billing</h1>

      <p className="text-slate-400 mb-6">
        Manage your subscription, payment methods, and invoices through the secure Stripe customer portal.
      </p>

      <div className="flex gap-4">
        <button
          onClick={upgrade}
          className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-500"
        >
          Upgrade Plan
        </button>

        <button
          onClick={openPortal}
          className="bg-slate-800 border border-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-700"
        >
          Manage Billing
        </button>
      </div>
    </div>
  );
}

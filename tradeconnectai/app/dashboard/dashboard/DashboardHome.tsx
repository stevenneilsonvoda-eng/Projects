"use client";

import { useSearchParams } from "next/navigation";

export default function DashboardHome() {
  const searchParams = useSearchParams();
  const isTrial = searchParams.get("trial") !== null;

  return (
    <div>
      {isTrial && (
        <div className="bg-blue-600 text-white p-4 rounded-lg mb-6">
          You’re on a 7‑day free trial.
          <button
            onClick={() => (window.location.href = "/api/stripe/upgrade")}
            className="underline ml-2"
          >
            Upgrade now
          </button>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
      <p className="text-slate-400">
        Use the sidebar to manage leads, bookings, and settings.
      </p>
    </div>
  );
}

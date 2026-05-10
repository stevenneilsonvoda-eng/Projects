"use client";
import clsx from "clsx";

export function GlassCard({ children, className }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)]",
        "transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(45,140,255,0.5)]",
        className
      )}
    >
      {children}
    </div>
  );
}

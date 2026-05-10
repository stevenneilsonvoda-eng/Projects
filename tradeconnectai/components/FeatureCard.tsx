"use client";
import { GlassCard } from "@/components/ui/glass-card";

type FeatureCardProps = {
  title: string;
  desc: string;
  icon?: React.ReactNode; // <-- FIXED (optional)
};

export default function FeatureCard({ title, desc, icon }: FeatureCardProps) {
  return (
    <GlassCard className="p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2D8CFF]/15 text-[#2D8CFF]">
          {icon ?? <span className="text-lg">⚡</span>}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm text-gray-300">{desc}</p>
    </GlassCard>
  );
}

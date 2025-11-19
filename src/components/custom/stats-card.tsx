"use client";

import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  gradient?: string;
}

export function StatsCard({
  icon: Icon,
  label,
  value,
  unit,
  gradient = "from-orange-500 to-red-500",
}: StatsCardProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-orange-500 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className={`bg-gradient-to-r ${gradient} p-3 rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-slate-400 text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-bold text-3xl">{value}</span>
        {unit && <span className="text-slate-400 text-lg">{unit}</span>}
      </div>
    </div>
  );
}

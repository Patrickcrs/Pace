"use client";

import { Activity } from "@/lib/types";
import { formatPace, formatDuration, formatDistance } from "@/lib/calories";
import { Calendar, Clock, Flame, TrendingUp } from "lucide-react";
import Link from "next/link";

interface ActivityCardProps {
  activity: Activity;
}

const activityIcons = {
  run: "🏃",
  bike: "🚴",
  walk: "🚶",
};

const activityLabels = {
  run: "Corrida",
  bike: "Ciclismo",
  walk: "Caminhada",
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const date = new Date(activity.date);
  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });

  return (
    <Link href={`/activity/${activity.id}`}>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-orange-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{activityIcons[activity.type]}</span>
            <div>
              <h3 className="text-white font-bold text-lg">
                {activityLabels[activity.type]}
              </h3>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-bold text-lg">
            {activity.calories} kcal
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Distância */}
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
            <div className="text-slate-400 text-xs mb-1">Distância</div>
            <div className="text-white font-bold text-xl">
              {formatDistance(activity.distance)}
              <span className="text-sm text-slate-400 ml-1">km</span>
            </div>
          </div>

          {/* Duração */}
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
            <div className="text-slate-400 text-xs mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Tempo
            </div>
            <div className="text-white font-bold text-xl">
              {formatDuration(activity.duration)}
            </div>
          </div>

          {/* Pace */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-3 border border-blue-500">
            <div className="text-blue-100 text-xs mb-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Pace
            </div>
            <div className="text-white font-bold text-xl">
              {formatPace(activity.pace)}
              <span className="text-sm text-blue-200 ml-1">/km</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

"use client";

import { useState } from "react";
import { Activity, Stats } from "@/lib/types";
import { ActivityCard } from "@/components/custom/activity-card";
import { StatsCard } from "@/components/custom/stats-card";
import { formatPace, formatDistance, formatDuration } from "@/lib/calories";
import { Flame, TrendingUp, Clock, MapPin, Plus } from "lucide-react";
import Link from "next/link";

// Dados mockados para demonstração
const mockActivities: Activity[] = [
  {
    id: "1",
    type: "run",
    date: new Date("2025-01-18T07:30:00"),
    duration: 2400, // 40 min
    distance: 8.5,
    pace: 4.71, // 4:42/km
    calories: 612,
    avgHeartRate: 165,
  },
  {
    id: "2",
    type: "run",
    date: new Date("2025-01-16T06:15:00"),
    duration: 1800, // 30 min
    distance: 6.2,
    pace: 4.84, // 4:50/km
    calories: 445,
    avgHeartRate: 158,
  },
  {
    id: "3",
    type: "bike",
    date: new Date("2025-01-14T08:00:00"),
    duration: 3600, // 60 min
    distance: 25.0,
    pace: 2.4, // 2:24/km
    calories: 720,
    avgHeartRate: 142,
  },
  {
    id: "4",
    type: "run",
    date: new Date("2025-01-12T07:00:00"),
    duration: 2700, // 45 min
    distance: 9.0,
    pace: 5.0, // 5:00/km
    calories: 648,
    avgHeartRate: 160,
  },
];

export default function HomePage() {
  const [activities] = useState<Activity[]>(mockActivities);

  // Calcular estatísticas
  const stats: Stats = {
    totalActivities: activities.length,
    totalDistance: activities.reduce((sum, a) => sum + a.distance, 0),
    totalCalories: activities.reduce((sum, a) => sum + a.calories, 0),
    totalTime: activities.reduce((sum, a) => sum + a.duration, 0),
    avgPace:
      activities
        .filter((a) => a.type === "run")
        .reduce((sum, a) => sum + a.pace, 0) /
      activities.filter((a) => a.type === "run").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-2xl sm:text-3xl">
                  PACE
                </h1>
                <p className="text-slate-400 text-sm">
                  Track. Burn. Achieve.
                </p>
              </div>
            </div>
            <Link href="/record">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50">
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Gravar</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <section className="mb-8">
          <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            Suas Estatísticas
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              icon={Flame}
              label="Calorias Totais"
              value={stats.totalCalories.toLocaleString()}
              unit="kcal"
              gradient="from-orange-500 to-red-500"
            />
            <StatsCard
              icon={MapPin}
              label="Distância Total"
              value={formatDistance(stats.totalDistance)}
              unit="km"
              gradient="from-blue-500 to-blue-600"
            />
            <StatsCard
              icon={Clock}
              label="Tempo Total"
              value={formatDuration(stats.totalTime)}
              gradient="from-purple-500 to-purple-600"
            />
            <StatsCard
              icon={TrendingUp}
              label="Pace Médio"
              value={formatPace(stats.avgPace)}
              unit="/km"
              gradient="from-green-500 to-green-600"
            />
          </div>
        </section>

        {/* Activities List */}
        <section>
          <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-orange-500" />
            Atividades Recentes
          </h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>

        {/* Empty State */}
        {activities.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flame className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">
              Comece sua jornada!
            </h3>
            <p className="text-slate-400 mb-6">
              Grave sua primeira atividade e comece a queimar calorias
            </p>
            <Link href="/record">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105">
                Gravar Atividade
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

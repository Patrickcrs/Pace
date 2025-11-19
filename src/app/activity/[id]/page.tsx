"use client";

import { useParams, useRouter } from "next/navigation";
import { Activity } from "@/lib/types";
import { formatPace, formatDuration, formatDistance } from "@/lib/calories";
import { ArrowLeft, Calendar, Clock, Flame, TrendingUp, MapPin, Heart } from "lucide-react";
import Link from "next/link";

// Mock data (mesmos dados da página principal)
const mockActivities: Activity[] = [
  {
    id: "1",
    type: "run",
    date: new Date("2025-01-18T07:30:00"),
    duration: 2400,
    distance: 8.5,
    pace: 4.71,
    calories: 612,
    avgHeartRate: 165,
  },
  {
    id: "2",
    type: "run",
    date: new Date("2025-01-16T06:15:00"),
    duration: 1800,
    distance: 6.2,
    pace: 4.84,
    calories: 445,
    avgHeartRate: 158,
  },
  {
    id: "3",
    type: "bike",
    date: new Date("2025-01-14T08:00:00"),
    duration: 3600,
    distance: 25.0,
    pace: 2.4,
    calories: 720,
    avgHeartRate: 142,
  },
  {
    id: "4",
    type: "run",
    date: new Date("2025-01-12T07:00:00"),
    duration: 2700,
    distance: 9.0,
    pace: 5.0,
    calories: 648,
    avgHeartRate: 160,
  },
];

const activityLabels = {
  run: "Corrida",
  bike: "Ciclismo",
  walk: "Caminhada",
};

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const activity = mockActivities.find((a) => a.id === params.id);

  if (!activity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold mb-4">Atividade não encontrada</h1>
          <Link href="/">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold">
              Voltar
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(activity.date);
  const formattedDate = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="text-slate-400 hover:text-white transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
            </Link>
            <div>
              <h1 className="text-white font-bold text-2xl">
                {activityLabels[activity.type]}
              </h1>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate} às {formattedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Map Placeholder */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 mb-8 border border-slate-700 h-64 sm:h-96 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.1),transparent_50%)]"></div>
          <div className="text-center z-10">
            <MapPin className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <p className="text-slate-400">Mapa da rota</p>
            <p className="text-slate-500 text-sm mt-2">{formatDistance(activity.distance)} km percorridos</p>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Calorias - Destaque */}
          <div className="md:col-span-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Flame className="w-8 h-8 text-white" />
              <span className="text-white text-lg font-medium">Calorias Queimadas</span>
            </div>
            <div className="text-white font-bold text-6xl">{activity.calories}</div>
            <div className="text-orange-100 text-xl mt-1">kcal</div>
          </div>

          {/* Distância */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 border border-blue-500">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-6 h-6 text-blue-100" />
              <span className="text-blue-100 text-sm font-medium">Distância</span>
            </div>
            <div className="text-white font-bold text-4xl">
              {formatDistance(activity.distance)}
            </div>
            <div className="text-blue-200 text-lg mt-1">quilômetros</div>
          </div>

          {/* Duração */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 border border-purple-500">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-6 h-6 text-purple-100" />
              <span className="text-purple-100 text-sm font-medium">Duração</span>
            </div>
            <div className="text-white font-bold text-4xl">
              {formatDuration(activity.duration)}
            </div>
            <div className="text-purple-200 text-lg mt-1">tempo total</div>
          </div>

          {/* Pace */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 border border-green-500">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-6 h-6 text-green-100" />
              <span className="text-green-100 text-sm font-medium">Pace Médio</span>
            </div>
            <div className="text-white font-bold text-4xl">
              {formatPace(activity.pace)}
            </div>
            <div className="text-green-200 text-lg mt-1">min/km</div>
          </div>
        </div>

        {/* Additional Stats */}
        {activity.avgHeartRate && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Frequência Cardíaca
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-white font-bold text-4xl">{activity.avgHeartRate}</span>
              <span className="text-slate-400 text-xl">bpm</span>
              <span className="text-slate-500 text-sm ml-2">(média)</span>
            </div>
          </div>
        )}

        {/* Performance Insights */}
        <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-white font-bold text-xl mb-4">Análise de Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Velocidade Média</span>
              <span className="text-white font-bold">
                {(60 / activity.pace).toFixed(1)} km/h
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Calorias por km</span>
              <span className="text-white font-bold">
                {Math.round(activity.calories / activity.distance)} kcal/km
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Intensidade</span>
              <span className="text-white font-bold">
                {activity.pace < 5 ? "Alta 🔥" : activity.pace < 6 ? "Moderada 💪" : "Leve ✨"}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

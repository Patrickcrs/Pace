"use client";

import { useState, useEffect, useRef } from "react";
import { RecordingState } from "@/lib/types";
import { calculateCalories, formatPace, formatDuration, formatDistance } from "@/lib/calories";
import { Play, Pause, Square, ArrowLeft, Flame, TrendingUp, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RecordPage() {
  const router = useRouter();
  const [recording, setRecording] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    startTime: null,
    elapsedTime: 0,
    distance: 0,
    currentPace: 0,
    calories: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simular incremento de distância durante gravação
  useEffect(() => {
    if (recording.isRecording && !recording.isPaused) {
      intervalRef.current = setInterval(() => {
        setRecording((prev) => {
          const newElapsedTime = prev.elapsedTime + 1;
          // Simular velocidade de ~12 km/h (5:00/km pace)
          const newDistance = prev.distance + (12 / 3600); // km por segundo
          const newPace = newDistance > 0 ? (newElapsedTime / 60) / newDistance : 0;
          const newCalories = calculateCalories(newDistance, newPace);

          return {
            ...prev,
            elapsedTime: newElapsedTime,
            distance: newDistance,
            currentPace: newPace,
            calories: newCalories,
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [recording.isRecording, recording.isPaused]);

  const handleStart = () => {
    setRecording({
      ...recording,
      isRecording: true,
      isPaused: false,
      startTime: Date.now(),
    });
  };

  const handlePause = () => {
    setRecording({
      ...recording,
      isPaused: !recording.isPaused,
    });
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Salvar atividade (mock)
    alert(`Atividade salva!\n\nDistância: ${formatDistance(recording.distance)} km\nTempo: ${formatDuration(recording.elapsedTime)}\nPace: ${formatPace(recording.currentPace)}/km\nCalorias: ${recording.calories} kcal`);
    router.push("/");
  };

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
              <h1 className="text-white font-bold text-2xl">Gravar Atividade</h1>
              <p className="text-slate-400 text-sm">Corrida</p>
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
            <p className="text-slate-400">Mapa da rota aparecerá aqui</p>
            <p className="text-slate-500 text-sm mt-2">GPS ativo</p>
          </div>
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Tempo */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">Tempo</div>
            <div className="text-white font-bold text-3xl">
              {formatDuration(recording.elapsedTime)}
            </div>
          </div>

          {/* Distância */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 border border-blue-500">
            <div className="text-blue-100 text-sm mb-2 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Distância
            </div>
            <div className="text-white font-bold text-3xl">
              {formatDistance(recording.distance)}
              <span className="text-lg text-blue-200 ml-1">km</span>
            </div>
          </div>

          {/* Pace */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 border border-purple-500">
            <div className="text-purple-100 text-sm mb-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Pace
            </div>
            <div className="text-white font-bold text-3xl">
              {recording.distance > 0 ? formatPace(recording.currentPace) : "--:--"}
              <span className="text-lg text-purple-200 ml-1">/km</span>
            </div>
          </div>

          {/* Calorias */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 border border-orange-400">
            <div className="text-orange-100 text-sm mb-2 flex items-center gap-1">
              <Flame className="w-4 h-4" />
              Calorias
            </div>
            <div className="text-white font-bold text-3xl">
              {recording.calories}
              <span className="text-lg text-orange-200 ml-1">kcal</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          {!recording.isRecording ? (
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-6 rounded-2xl font-bold text-xl flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50"
            >
              <Play className="w-8 h-8" fill="white" />
              Iniciar
            </button>
          ) : (
            <>
              <button
                onClick={handlePause}
                className={`${
                  recording.isPaused
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                } text-white px-10 py-6 rounded-2xl font-bold text-xl flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                {recording.isPaused ? (
                  <>
                    <Play className="w-8 h-8" fill="white" />
                    Retomar
                  </>
                ) : (
                  <>
                    <Pause className="w-8 h-8" fill="white" />
                    Pausar
                  </>
                )}
              </button>
              <button
                onClick={handleStop}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 py-6 rounded-2xl font-bold text-xl flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50"
              >
                <Square className="w-8 h-8" fill="white" />
                Finalizar
              </button>
            </>
          )}
        </div>

        {/* Instructions */}
        {!recording.isRecording && (
          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Pressione <span className="text-green-500 font-bold">Iniciar</span> para começar a gravar sua atividade
            </p>
            <p className="text-slate-500 text-sm mt-2">
              As calorias serão calculadas automaticamente baseadas no seu pace
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

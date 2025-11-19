// Tipos do aplicativo PACE

export interface Activity {
  id: string;
  type: 'run' | 'bike' | 'walk';
  date: Date;
  duration: number; // em segundos
  distance: number; // em km
  pace: number; // min/km
  calories: number;
  avgHeartRate?: number;
  route?: {
    lat: number;
    lng: number;
  }[];
}

export interface Stats {
  totalActivities: number;
  totalDistance: number;
  totalCalories: number;
  totalTime: number;
  avgPace: number;
}

export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  startTime: number | null;
  elapsedTime: number;
  distance: number;
  currentPace: number;
  calories: number;
}

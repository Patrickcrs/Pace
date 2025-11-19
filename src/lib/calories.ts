// Cálculo de calorias baseado em pace e distância

/**
 * Calcula calorias gastas baseado no pace (min/km) e distância
 * Fórmula considera: peso médio 70kg, intensidade baseada no pace
 */
export function calculateCalories(
  distance: number, // km
  pace: number, // min/km
  weight: number = 70 // kg
): number {
  // Velocidade em km/h
  const speed = 60 / pace;
  
  // MET (Metabolic Equivalent) baseado na velocidade
  let met: number;
  
  if (speed < 6) {
    met = 6.0; // caminhada rápida
  } else if (speed < 8) {
    met = 8.3; // corrida leve
  } else if (speed < 10) {
    met = 9.8; // corrida moderada
  } else if (speed < 12) {
    met = 11.0; // corrida intensa
  } else if (speed < 14) {
    met = 12.3; // corrida muito intensa
  } else {
    met = 14.5; // sprint
  }
  
  // Tempo em horas
  const timeInHours = (distance * pace) / 60;
  
  // Calorias = MET × peso (kg) × tempo (horas)
  const calories = met * weight * timeInHours;
  
  return Math.round(calories);
}

/**
 * Formata pace para exibição (min:seg/km)
 */
export function formatPace(pace: number): string {
  const minutes = Math.floor(pace);
  const seconds = Math.round((pace - minutes) * 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Formata duração para exibição (h:mm:ss)
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formata distância para exibição
 */
export function formatDistance(km: number): string {
  return km.toFixed(2);
}

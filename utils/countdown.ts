export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isFinished: boolean;
}

export function calculateCountdown(): CountdownData {
  const premiereDate = new Date('2025-09-10T00:00:00-03:00'); // Uruguay timezone
  const now = new Date();
  const timeLeft = premiereDate.getTime() - now.getTime();

  if (timeLeft <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isFinished: true,
    };
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds: Math.floor(timeLeft / 1000),
    isFinished: false,
  };
}

export function formatCountdownText(countdown: CountdownData): string {
  if (countdown.isFinished) {
    return "¡Ya está disponible en cines!";
  }

  const parts: string[] = [];
  
  if (countdown.days > 0) {
    parts.push(`${countdown.days} día${countdown.days !== 1 ? 's' : ''}`);
  }
  
  if (countdown.hours > 0) {
    parts.push(`${countdown.hours} hora${countdown.hours !== 1 ? 's' : ''}`);
  }
  
  if (countdown.minutes > 0 && countdown.days === 0) {
    parts.push(`${countdown.minutes} minuto${countdown.minutes !== 1 ? 's' : ''}`);
  }

  if (parts.length === 0) {
    return "¡Menos de un minuto!";
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return parts.slice(0, -1).join(', ') + ' y ' + parts[parts.length - 1];
}

export function generateShareText(countdown: CountdownData): string {
  if (countdown.isFinished) {
    return "¡Kimetsu no Yaiba ya está disponible en cines uruguayos! 🗡️⚡ #KimetsuNoYaiba";
  }

  const timeText = formatCountdownText(countdown);
  return `¡Faltan ${timeText} para ver Kimetsu no Yaiba en cines uruguayos! 🗡️⚡ #KimetsuNoYaiba #Countdown`;
}

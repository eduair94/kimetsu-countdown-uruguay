import { NextResponse } from 'next/server';
import { calculateCountdown, formatCountdownText, generateShareText } from '../../../utils/countdown';

export async function GET() {
  const countdown = calculateCountdown();
  const timeText = formatCountdownText(countdown);
  const shareText = generateShareText(countdown);

  return NextResponse.json({
    countdown,
    timeText,
    shareText,
    premiereDate: '2025-09-10T00:00:00-03:00',
    timezone: 'America/Montevideo',
    isFinished: countdown.isFinished,
    timestamp: new Date().toISOString(),
  });
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

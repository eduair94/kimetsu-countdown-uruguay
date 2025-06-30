'use client';

import { useState, useEffect } from 'react';
import { calculateCountdown, type CountdownData } from '../utils/countdown';

interface CountdownTimerProps {
  initialCountdown: CountdownData;
}

export default function CountdownTimer({ initialCountdown }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState<CountdownData>(initialCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isUrgent = countdown.days <= 7;
  const isFinal = countdown.days <= 1;

  return (
    <div className={`countdown-container ${isUrgent ? 'urgent' : ''}`}>
      <div className={`countdown-card ${isFinal ? 'final' : ''}`}>
        <div className="time-unit">
          <span className="number">{String(countdown.days).padStart(2, '0')}</span>
          <span className="label">Días</span>
        </div>
        <div className="separator">:</div>
        <div className="time-unit">
          <span className="number">{String(countdown.hours).padStart(2, '0')}</span>
          <span className="label">Horas</span>
        </div>
        <div className="separator">:</div>
        <div className="time-unit">
          <span className="number">{String(countdown.minutes).padStart(2, '0')}</span>
          <span className="label">Minutos</span>
        </div>
        <div className="separator">:</div>
        <div className="time-unit">
          <span className="number">{String(countdown.seconds).padStart(2, '0')}</span>
          <span className="label">Segundos</span>
        </div>
      </div>
    </div>
  );
}

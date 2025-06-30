'use client';

import { generateShareText, type CountdownData } from '../utils/countdown';

interface ShareButtonProps {
  countdown: CountdownData;
}

export default function ShareButton({ countdown }: ShareButtonProps) {
  const handleShare = async () => {
    const shareText = generateShareText(countdown);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Kimetsu no Yaiba Countdown',
          text: shareText,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('¡Texto copiado al portapapeles!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert('¡Texto copiado al portapapeles!');
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError);
        alert('No se pudo compartir. Intenta de nuevo.');
      }
    }
  };

  return (
    <div className="share-container">
      <button className="share-button" onClick={handleShare}>
        🔗 Compartir Countdown
      </button>
    </div>
  );
}

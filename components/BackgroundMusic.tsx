"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [wasPausedByVideo, setWasPausedByVideo] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      console.log("Audio can play");
      setIsLoaded(true);
    };

    const handleLoadStart = () => {
      console.log("Audio loading started");
    };

    const handleLoadedData = () => {
      console.log("Audio data loaded");
    };

    const handleError = (e) => {
      console.error("Audio loading error:", e);
      console.error("Audio error details:", audio.error);
      const errorMsg = audio.error ? `Error ${audio.error.code}: ${audio.error.message || "Unknown audio error"}` : "Audio failed to load";
      setAudioError(errorMsg);
      setIsLoaded(false);
    };

    const handlePlay = () => {
      console.log("Audio playing");
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log("Audio paused");
      setIsPlaying(false);
    };

    const handleEnded = () => {
      console.log("Audio ended");
      setIsPlaying(false);
    };

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    // Force load
    audio.load();

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  const pauseForVideo = () => {
    const audio = audioRef.current;
    if (!audio || !isPlaying) return;

    setWasPausedByVideo(true);
    audio.pause();
  };

  const resumeAfterVideo = () => {
    const audio = audioRef.current;
    if (!audio || !wasPausedByVideo) return;

    setWasPausedByVideo(false);
    audio.play().catch((error) => {
      console.error("Error resuming audio:", error);
    });
  };

  // Expose functions globally for trailer component
  useEffect(() => {
    (window as any).backgroundMusic = {
      pauseForVideo,
      resumeAfterVideo,
      isPlaying,
    };
  }, [isPlaying, wasPausedByVideo]);

  return (
    <>
      <audio ref={audioRef} src="/background-music.mp3" loop preload="auto" playsInline />

      <button className="music-control" onClick={toggleMusic} disabled={!isLoaded} title={audioError ? audioError : isPlaying ? "Pausar música" : "Reproducir música"} aria-label={isPlaying ? "Pausar música de fondo" : "Reproducir música de fondo"}>
        <span className="music-icon">{audioError ? "❌" : !isLoaded ? "⏳" : isPlaying ? "🎵" : "🔇"}</span>
        {isPlaying && (
          <div className="music-waves">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        )}
      </button>

      {/* Debug info in development */}

      <style jsx>{`
        .music-control {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          background: rgba(26, 26, 46, 0.9);
          backdrop-filter: blur(15px);
          color: white;
          cursor: pointer;
          z-index: 1000;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 107, 107, 0.2);
          border: 2px solid rgba(255, 107, 107, 0.3);
        }

        .music-icon {
          font-size: 24px;
          margin-bottom: 2px;
        }

        .music-waves {
          display: flex;
          gap: 2px;
          align-items: end;
          height: 8px;
        }

        .wave {
          width: 2px;
          background: linear-gradient(45deg, #ff6b6b, #ff9ff3);
          border-radius: 1px;
          animation: wave 1s ease-in-out infinite;
        }

        .wave:nth-child(1) {
          height: 4px;
          animation-delay: 0s;
        }

        .wave:nth-child(2) {
          height: 6px;
          animation-delay: 0.2s;
        }

        .wave:nth-child(3) {
          height: 4px;
          animation-delay: 0.4s;
        }

        .music-control:hover {
          background: rgba(255, 107, 107, 0.8);
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 107, 107, 0.5);
          border-color: rgba(255, 107, 107, 0.8);
        }

        .music-control:active {
          transform: scale(0.95);
        }

        .music-control:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .music-control:disabled:hover {
          background: rgba(26, 26, 46, 0.9);
          transform: none;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 107, 107, 0.2);
        }

        @keyframes wave {
          0%,
          100% {
            transform: scaleY(0.5);
          }
          50% {
            transform: scaleY(1.5);
          }
        }

        @media (max-width: 768px) {
          .music-control {
            top: 15px;
            right: 15px;
            width: 55px;
            height: 55px;
          }

          .music-icon {
            font-size: 20px;
          }
        }

        @media (max-width: 480px) {
          .music-control {
            top: 10px;
            right: 10px;
            width: 50px;
            height: 50px;
          }

          .music-icon {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
}

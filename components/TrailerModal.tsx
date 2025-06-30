"use client";

import { useState } from "react";

export default function TrailerModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    // Pausar música de fondo cuando se abre el trailer
    if ((window as any).backgroundMusic) {
      (window as any).backgroundMusic.pauseForVideo();
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    // Reanudar música de fondo cuando se cierra el trailer
    if ((window as any).backgroundMusic) {
      (window as any).backgroundMusic.resumeAfterVideo();
    }
  };

  return (
    <>
      <div className="trailer-container">
        <button className="trailer-button" onClick={openModal}>
          🎬 Ver Trailer Oficial
        </button>
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            <div className="video-container">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/wPFeBxt7VXI?autoplay=1&rel=0" title="Kimetsu no Yaiba Trailer Oficial" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .trailer-container {
          margin-bottom: 0;
          animation: fadeInUp 1.5s ease-out 2.5s both;
        }

        .trailer-button {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff9ff3 100%);
          border: none;
          color: white;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 500;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
          font-family: "Noto Sans JP", sans-serif;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .trailer-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.5);
          background: linear-gradient(135deg, #ff5252 0%, #e91e63 100%);
        }

        .trailer-button:active {
          transform: translateY(0);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
          animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
          position: relative;
          width: 90%;
          max-width: 900px;
          height: 70%;
          max-height: 506px;
          background: #000;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
          animation: scaleIn 0.3s ease-out;
        }

        .modal-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .video-container {
          width: 100%;
          height: 100%;
          position: relative;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .modal-content {
            width: 95%;
            height: 60%;
          }

          .trailer-button {
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .modal-content {
            width: 98%;
            height: 50%;
          }

          .trailer-button {
            padding: 0.7rem 1.2rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}

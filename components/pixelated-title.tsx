"use client";

import { useEffect, useState } from "react";

export function PixelatedTitle() {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 100); // Glitch duration
    }, 3000); // Glitch interval

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="mb-8 relative">
      {/* Main Title with Gradient and Glitch Effect */}
      <h1
        className={`text-4xl md:text-6xl font-pixel pixel-text ${
          glitching ? "glitch-effect" : ""
        } transition-all duration-50 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent`}
      >
        RAP IT UP
      </h1>

      {/* Glitch effect styles */}
      <style jsx>{`
        .glitch-effect {
          animation: glitch 0.1s infinite;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
            text-shadow: 0 0 10px rgba(255, 214, 0, 0.9),
                        0 0 20px rgba(255, 214, 0, 0.7),
                        0 0 30px rgba(255, 214, 0, 0.5),
                        0 0 40px rgba(255, 165, 0, 0.9),
                        0 0 50px rgba(255, 165, 0, 0.7),
                        0 0 60px rgba(255, 165, 0, 0.5);
          }
          25% {
            transform: translate(-2px, 2px);
            text-shadow: -2px 2px 10px rgba(255, 165, 0, 0.9),
                        -4px 4px 20px rgba(255, 165, 0, 0.7),
                        -6px 6px 30px rgba(255, 165, 0, 0.5),
                        -8px 8px 40px rgba(255, 140, 0, 0.9),
                        -10px 10px 50px rgba(255, 140, 0, 0.7),
                        -12px 12px 60px rgba(255, 140, 0, 0.5);
          }
          50% {
            transform: translate(2px, -2px);
            text-shadow: 2px -2px 10px rgba(255, 214, 0, 0.9),
                        4px -4px 20px rgba(255, 214, 0, 0.7),
                        6px -6px 30px rgba(255, 214, 0, 0.5),
                        8px -8px 40px rgba(255, 165, 0, 0.9),
                        10px -10px 50px rgba(255, 165, 0, 0.7),
                        12px -12px 60px rgba(255, 165, 0, 0.5);
          }
          75% {
            transform: translate(-2px, 2px);
            text-shadow: -2px 2px 10px rgba(255, 165, 0, 0.9),
                        -4px 4px 20px rgba(255, 165, 0, 0.7),
                        -6px 6px 30px rgba(255, 165, 0, 0.5),
                        -8px 8px 40px rgba(255, 140, 0, 0.9),
                        -10px 10px 50px rgba(255, 140, 0, 0.7),
                        -12px 12px 60px rgba(255, 140, 0, 0.5);
          }
          100% {
            transform: translate(0);
            text-shadow: 0 0 10px rgba(255, 214, 0, 0.9),
                        0 0 20px rgba(255, 214, 0, 0.7),
                        0 0 30px rgba(255, 214, 0, 0.5),
                        0 0 40px rgba(255, 165, 0, 0.9),
                        0 0 50px rgba(255, 165, 0, 0.7),
                        0 0 60px rgba(255, 165, 0, 0.5);
          }
        }
      `}</style>
    </div>
  );
}
'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PixelatedTitle } from "@/components/pixelated-title";
import { PixelatedBackground } from "@/components/pixelated-background";
import { useEffect, useState } from "react";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const slogan = "Ignite your talent and create something extraordinary.";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= slogan.length) {
        setTypedText(slogan.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Adjust typing speed here

    return () => clearInterval(typingInterval);
  }, [slogan]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-yellow-900 via-orange-900 to-yellow-900">
      <PixelatedBackground />

      <div className="z-10 flex flex-col items-center justify-center gap-8 mt-10 text-center">
        <PixelatedTitle />

        {/* Typing Effect Banner */}
        <div className="max-w-full font-pixel text-lg text-white whitespace-nowrap overflow-hidden">
          <span>{typedText}</span>
          <span className="ml-1 animate-blink">|</span>
        </div>

        <div className="max-w-md space-y-4 pixel-container bg-black/70 backdrop-blur-sm p-6 rounded-xl border-2 border-orange-600/30 hover:border-orange-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30">
          <h2 className="text-xl font-pixel text-orange-400">
            Create. Build. Earn Rewards.
          </h2>
          <p className="text-sm font-pixel text-white/80">
            Connect your wallet, showcase your skills, and earn exclusive rewards!
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link href="/connect" className="w-full">
            <Button
              variant="default"
              size="lg"
              className="w-full font-pixel bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl border-2 border-orange-400/20 hover:border-orange-400/50 animate-pulse hover:animate-none"
            >
              Get Started
            </Button>
          </Link>

          <Link href="/leaderboard" className="w-full">
            <Button
              variant="default"
              size="lg"
              className="w-full font-pixel bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl border-2 border-orange-400/20 hover:border-orange-400/50 animate-pulse hover:animate-none"
            >
              Leaderboard
            </Button>
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-4 font-pixel text-xs text-center text-white/50">
        <p>© 2024 Pixel Rewards</p>
      </footer>

      {/* Blinking cursor animation */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        /* Pulse animation for buttons */
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .animate-pulse {
          animation: pulse 1.5s infinite;
        }

        /* Ensure the font-pixel class is applied correctly */
        .font-pixel {
          font-family: "Press Start 2P", cursive; /* Example pixel font */
        }
      `}</style>
    </main>
  );
}
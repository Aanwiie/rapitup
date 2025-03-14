"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Trophy, Star, Music } from "lucide-react";
import Link from "next/link";

// Mock song data
const songs = [
  {
    id: 1,
    title: "Pixel Flow",
    difficulty: "Easy",
    duration: "1:45",
    image: "/Pixelart/pixel1.png",
    color: "bg-yellow-400",
  },
  {
    id: 2,
    title: "8-Bit Bars",
    difficulty: "Medium",
    duration: "2:10",
    image: "/Pixelart/pixel2.png",
    color: "bg-orange-400",
  },
  {
    id: 3,
    title: "Retro Rhymes",
    difficulty: "Hard",
    duration: "2:30",
    image: "/Pixelart/pixel3.png",
    color: "bg-yellow-500",
  },
  {
    id: 4,
    title: "Digital Drops",
    difficulty: "Expert",
    duration: "3:00",
    image: "/Pixelart/pixel4.png",
    color: "bg-orange-500",
  },
];

export default function SongSelection() {
  const router = useRouter();
  const [selectedSong, setSelectedSong] = useState<number | null>(null);

  const handleSelectSong = (id: number) => {
    setSelectedSong(id);
  };

  const handleStartGame = () => {
    if (selectedSong) {
      router.push(`/play/${selectedSong}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative overflow-hidden">
      {/* Collage Background with PNG Images */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 h-full w-full">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="relative w-full h-full rounded-lg overflow-hidden"
            >
              <img
                src={`/Pixelart/pixel${(index % 9) + 1}.png`} // Cycle through 9 PNGs
                alt={`Pixel Art ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/50 to-orange-900/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl">
        <header className="flex justify-between items-center mb-8 mt-4">
          <h1 className="text-2xl font-pixel text-yellow-400 pixel-text">Select a Track</h1>
          <div className="flex gap-2">
            <Link href="/leaderboard">
              <Button
                variant="outline"
                className="pixel-borders bg-yellow-400/10 text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/20 h-10 px-3"
              >
                <Trophy className="w-4 h-4 mr-2" />
                <span className="font-pixel text-xs">Ranks</span>
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="pixel-borders bg-yellow-400/10 text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/20 h-10 px-3"
              >
                <span className="font-pixel text-xs">Exit</span>
              </Button>
            </Link>
          </div>
        </header>

        {/* Song Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {songs.map((song) => (
            <Card
              key={song.id}
              className={`pixel-container bg-black/80 backdrop-blur-sm border-2 border-yellow-400/30 cursor-pointer transition-all duration-200 ${
                selectedSong === song.id ? "ring-4 ring-yellow-400" : ""
              }`}
              onClick={() => handleSelectSong(song.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-pixel pixel-text flex justify-between">
                  <span className="text-yellow-400">{song.title}</span>
                  <div className={`px-2 py-1 text-xs ${song.color} text-black rounded`}>
                    {song.difficulty}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4 items-center pb-2">
                <div className={`w-16 h-16 ${song.color} pixel-borders flex items-center justify-center`}>
                  <Music className="w-8 h-8 text-black" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i <
                          { Easy: 1, Medium: 2, Hard: 3, Expert: 4 }[song.difficulty]
                            ? "text-yellow-400"
                            : "text-yellow-400/30"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-pixel text-xs text-yellow-400/80">Duration: {song.duration}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${song.color} text-black font-pixel text-xs h-8 pixel-borders hover:${song.color}/90`}
                  onClick={() => handleSelectSong(song.id)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Select Track
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Start Button */}
        <div className="mt-8 w-full">
          <Button
            className="w-full pixel-button bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-pixel text-lg py-4 h-auto hover:shadow-lg hover:shadow-yellow-400/50"
            disabled={!selectedSong}
            onClick={handleStartGame}
          >
            Start Rap Battle
          </Button>
        </div>
      </div>
    </main>
  );
}
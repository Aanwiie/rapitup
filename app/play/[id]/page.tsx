"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, ArrowLeft } from "lucide-react";

// Mock song data
const getSongData = (id: string) => {
  const songs = {
    "1": {
      title: "Pixel Flow",
      color: "bg-yellow-400",
      lyrics: [
        "Welcome to the pixel flow",
        "Where the bits and bytes just glow",
        "Spitting rhymes in 8-bit style",
        "Retro gaming all the while",
        "Pixels forming on the screen",
        "Coolest rap you've ever seen",
        "Drop the beat and feel the vibe",
        "In this digital rhyme tribe",
      ],
    },
    "2": {
      title: "8-Bit Bars",
      color: "bg-orange-400",
      lyrics: [
        "These 8-bit bars hit different",
        "My flow's got the crowd lifted",
        "Arcade dreams in every line",
        "Old school gaming, feeling fine",
        "Pixels popping with each beat",
        "This retro flow can't be beat",
        "Level up with every verse",
        "In this pixelated universe",
      ],
    },
    "3": {
      title: "Retro Rhymes",
      color: "bg-yellow-500",
      lyrics: [
        "Retro rhymes from back in time",
        "When games were simple but sublime",
        "Blocky graphics, chunky sounds",
        "That's where true gaming is found",
        "Spitting pixels with each word",
        "Most authentic flow you've heard",
        "Old school vibes with new school skill",
        "This pixel rap is such a thrill",
      ],
    },
    "4": {
      title: "Digital Drops",
      color: "bg-orange-500",
      lyrics: [
        "Digital drops falling down",
        "Pixel perfect, wear the crown",
        "Bits and bytes form every word",
        "Electronic flow, absurd",
        "Coding rhymes like no one else",
        "Virtual worlds within myself",
        "Gaming culture is my roots",
        "These digital drops are absolute",
      ],
    },
  };

  return songs[id as keyof typeof songs] || songs["1"];
};

export default function PlaySong({ params }: { params: { id: string } }) {
  const router = useRouter();
  const songData = getSongData(params.id);
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [gameComplete, setGameComplete] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    return () => {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Toggle microphone
  const toggleMic = async () => {
    if (micEnabled) {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
        micStreamRef.current = null;
      }
      setMicEnabled(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      if (audioContextRef.current && analyserRef.current) {
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);

        // Start analyzing audio for pitch/timing
        startAudioAnalysis();
      }

      setMicEnabled(true);
      setFeedback("Mic connected! Start rapping when the lyrics highlight.");
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setFeedback("Could not access microphone. Please check permissions.");
    }
  };

  // Start/stop the game
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setFeedback("Game paused");
      return;
    }

    if (!micEnabled) {
      setFeedback("Please enable your microphone first!");
      return;
    }

    setIsPlaying(true);
    setProgress(0);
    setCurrentLine(0);
    setFeedback("Get ready to rap!");

    // Simulate game progress
    startGameSimulation();
  };

  // Simulate game progress (in a real app, this would sync with actual audio)
  const startGameSimulation = () => {
    const totalDuration = 20000; // 20 seconds total
    const interval = 100; // Update every 100ms
    const lineChangeDuration = totalDuration / songData.lyrics.length;

    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      const newProgress = (elapsed / totalDuration) * 100;
      setProgress(newProgress);

      // Change current line based on progress
      const newLineIndex = Math.min(Math.floor(elapsed / lineChangeDuration), songData.lyrics.length - 1);

      if (newLineIndex !== currentLine) {
        setCurrentLine(newLineIndex);
        // Generate random feedback occasionally
        if (Math.random() > 0.5) {
          const feedbacks = ["Great flow!", "Nice rhythm!", "Keep it up!", "Awesome!", "Fire!"];
          setFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)]);

          // Add to score
          setScore((prev) => prev + Math.floor(Math.random() * 100) + 50);
        }
      }

      // End game
      if (newProgress >= 100) {
        clearInterval(timer);
        setGameComplete(true);
        setFeedback("Rap battle complete!");
      }
    }, interval);

    return () => clearInterval(timer);
  };

  // Simulate audio analysis (in a real app, this would analyze actual pitch/timing)
  const startAudioAnalysis = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const analyze = () => {
      if (!analyserRef.current || !isPlaying) return;

      analyserRef.current.getByteFrequencyData(dataArray);

      // Calculate audio energy (simplified)
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;

      // Use average to determine if user is rapping
      if (average > 30) {
        // User is making sound - could add visual feedback here
      }

      requestAnimationFrame(analyze);
    };

    analyze();
  };

  // Toggle audio
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  // Handle game completion
  const handleGameComplete = () => {
    router.push(`/results/${params.id}?score=${score}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative overflow-hidden">
      {/* Collage Background with PNG Images */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 h-full w-full">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="relative w-full h-full rounded-lg overflow-hidden">
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
        <header className="w-full flex justify-between items-center mb-8 mt-4">
          <Button variant="ghost" onClick={() => router.push("/songs")} className="font-pixel text-xs text-yellow-400 hover:bg-yellow-400/10">
            <ArrowLeft className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="font-pixel text-xs">Back</span>
          </Button>
          <h1 className={`text-xl font-pixel pixel-text ${songData.color.replace("bg-", "text-")}`}>
            {songData.title}
          </h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="pixel-borders bg-yellow-400/10 text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/20 h-10 w-10"
              onClick={toggleAudio}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`pixel-borders bg-yellow-400/10 text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/20 h-10 w-10 ${
                micEnabled ? songData.color : ""
              }`}
              onClick={toggleMic}
            >
              {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="w-full mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-pixel text-xs text-yellow-400">Progress</span>
            <span className="font-pixel text-xs text-yellow-400">{Math.floor(progress)}%</span>
          </div>
          <div className="w-full h-6 pixel-borders bg-black/80">
            <div className={`h-full ${songData.color}`} style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Lyrics Card */}
        <Card className="w-full pixel-container bg-black/80 backdrop-blur-sm border-2 border-yellow-400/30 mb-8">
          <div className="space-y-4 p-4">
            {songData.lyrics.map((line, index) => (
              <p
                key={index}
                className={`font-pixel text-sm transition-all duration-200 ${
                  index === currentLine
                    ? `${songData.color.replace("bg-", "text-")} scale-110 font-bold`
                    : index < currentLine
                    ? "text-yellow-400/50"
                    : "text-yellow-400/80"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </Card>

        {/* Score Bar */}
        <div className="w-full mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-pixel text-xs text-yellow-400">Score</span>
            <span className="font-pixel text-xs text-yellow-400">{score}</span>
          </div>
          <div className="w-full h-6 pixel-borders bg-black/80 overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-300"
              style={{ width: `${Math.min((score / 1000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Feedback Card */}
        <div className="w-full mb-8">
          <Card className="pixel-container bg-black/80 backdrop-blur-sm border-2 border-yellow-400/30">
            <p className="font-pixel text-sm text-center p-4 text-yellow-400">{feedback}</p>
          </Card>
        </div>

        {/* Start/Pause Button */}
        <div className="w-full flex gap-4">
          <Button
            className={`w-full pixel-button ${
              isPlaying ? "bg-orange-500 hover:bg-orange-600" : songData.color
            } text-black font-pixel hover:shadow-lg hover:shadow-yellow-400/50`}
            onClick={togglePlay}
            disabled={!micEnabled && !isPlaying}
          >
            {isPlaying ? "Pause Game" : "Start Rapping"}
          </Button>
        </div>

        {/* Game Complete Modal */}
        {gameComplete && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <Card className="w-full max-w-md pixel-container bg-black/80 backdrop-blur-sm border-2 border-yellow-400/30">
              <div className="p-6 space-y-6">
                <h2 className="text-2xl font-pixel text-yellow-400 text-center pixel-text">Battle Complete!</h2>
                <div className="text-center">
                  <p className="font-pixel text-lg text-yellow-400">Your Score</p>
                  <p className="font-pixel text-4xl text-yellow-400">{score}</p>
                </div>
                <Button
                  className="w-full pixel-button bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-pixel hover:shadow-lg hover:shadow-yellow-400/50"
                  onClick={handleGameComplete}
                >
                  See Results
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
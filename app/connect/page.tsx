"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Info } from "lucide-react";
import Link from "next/link";
import { PixelatedBackground } from "@/components/pixelated-background";

export default function ConnectWallet() {
  const router = useRouter();
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");

  const connectWallet = async () => {
    setConnecting(true);
    setError("");

    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed");
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the first account
      const account = accounts[0];
      setWalletAddress(account);
      setConnected(true);

      // Simulate loading
      setTimeout(() => {
        router.push("/songs");
      }, 1500);
    } catch (err: any) {
      console.error("Error connecting wallet:", err);
      setError(err.message || "Failed to connect wallet");
    } finally {
      setConnecting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-yellow-900/50 to-orange-900/50">
      <PixelatedBackground />
      <Card className="w-full max-w-md pixel-container bg-black/80 backdrop-blur-sm border-2 border-yellow-400/30 z-20">
        <CardHeader>
          <CardTitle className="text-xl font-pixel text-yellow-400 text-center pixel-text">
            Connect Wallet
          </CardTitle>
          <CardDescription className="text-center font-pixel text-xs mt-2 text-yellow-400/80">
            Connect your MetaMask wallet to start your rap battle journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-yellow-400/20 rounded-lg flex items-center justify-center border-2 border-yellow-400/30">
              <Wallet className="w-12 h-12 text-yellow-400" />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 p-4 rounded-lg text-red-400 font-pixel text-xs text-center">
              {error}
            </div>
          )}

          {connected ? (
            <div className="space-y-2">
              <p className="font-pixel text-xs text-center text-yellow-400">Wallet Connected!</p>
              <p className="font-pixel text-xs text-center text-yellow-400 break-all">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </p>
              <div className="flex justify-center mt-4">
                <div className="w-6 h-6 border-4 border-t-yellow-400 border-r-yellow-400 border-b-yellow-400 border-l-transparent animate-spin rounded-full"></div>
              </div>
              <p className="font-pixel text-xs text-center mt-2 text-yellow-400/80">
                Redirecting to song selection...
              </p>
            </div>
          ) : (
            <Button
              onClick={connectWallet}
              className="w-full pixel-button bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-pixel hover:shadow-lg hover:shadow-yellow-400/50"
              disabled={connecting}
            >
              {connecting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-t-yellow-400 border-r-yellow-400 border-b-yellow-400 border-l-transparent animate-spin rounded-full"></div>
                  Connecting...
                </span>
              ) : (
                "Connect MetaMask"
              )}
            </Button>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-pixel text-yellow-400/80">
            <Info className="w-4 h-4 text-yellow-400" />
            <span>Don't have MetaMask?</span>
          </div>
          <Link href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="w-full">
            <Button
              variant="outline"
              className="w-full pixel-borders bg-yellow-400/10 text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/20 hover:text-yellow-400"
            >
              Get MetaMask
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Button
        variant="ghost"
        className="mt-8 font-pixel text-xs text-yellow-400 hover:bg-yellow-400/10 z-20"
        onClick={() => router.push("/")}
      >
        Back to Home
      </Button>
    </main>
  );
}

// Add TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
}
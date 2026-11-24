"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Heart, Share2, Sparkles, Check, X, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { EVENT_DETAILS } from "@/types";

interface BlueyReelVideoProps {
  onAccept: () => void;
  onDeny: () => void;
}

export default function BlueyReelVideo({ onAccept, onDeny }: BlueyReelVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play pleasant playful nursery melody
  const playMelody = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const notes = [329.63, 392.00, 440.00, 523.25, 493.88, 440.00]; // Bluey cheerful theme motif
      const note = notes[Math.floor(Math.random() * notes.length)];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(note, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // safe fallback
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1.2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      playMelody();
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      } catch {}
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[400px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-bluey-light bg-gradient-to-b from-[#255C8B] via-[#4D9DE0] to-[#E98A3C] flex flex-col justify-between select-none">
      {/* Top Reel Header Bar */}
      <div className="relative z-20 pt-4 px-4 flex items-center justify-between text-white drop-shadow-md">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-full bg-white border-2 border-yellow-300 flex items-center justify-center text-lg shadow">
            🐾
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-extrabold text-sm tracking-wide">
                {EVENT_DETAILS.childName} ({EVENT_DETAILS.nickname})
              </span>
              <span className="bg-yellow-400 text-bluey-dark text-[10px] font-black px-1.5 py-0.2 rounded-full">
                1st B&apos;DAY
              </span>
            </div>
            <p className="text-[11px] text-sky-100 flex items-center space-x-1">
              <span>🎵 Bluey Theme Celebration</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/40 text-white transition"
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Center Reel Content: Cute Bluey Character Animation */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-4">
        {/* Animated Clouds & Paw Prints in Background */}
        <div className="absolute top-10 left-3 text-2xl opacity-70 animate-float-slow">☁️</div>
        <div className="absolute top-20 right-4 text-3xl opacity-80 animate-float-slow" style={{ animationDelay: "1.5s" }}>☁️</div>
        <div className="absolute bottom-36 left-6 text-xl opacity-60">🐾</div>
        <div className="absolute top-44 right-6 text-2xl opacity-60">🎈</div>

        {/* Baby Sharvil Cartoon Character with Bluey Ears */}
        <div className="relative flex flex-col items-center my-auto">
          {/* Bluey Ears */}
          <div className="flex space-x-16 -mb-4 z-0">
            <div className="w-9 h-12 bg-[#255C8B] rounded-t-full transform -rotate-12 border-2 border-blue-900 shadow" />
            <div className="w-9 h-12 bg-[#255C8B] rounded-t-full transform rotate-12 border-2 border-blue-900 shadow" />
          </div>

          {/* Baby Face */}
          <div className="relative z-10 w-32 h-32 rounded-full bg-[#FFE5B4] border-4 border-[#3D85C6] shadow-xl flex flex-col items-center justify-center overflow-hidden">
            {/* Cute Hair Tuft */}
            <div className="absolute top-1 w-8 h-4 bg-[#4A3728] rounded-full" />

            {/* Sparkly Big Eyes */}
            <div className="flex space-x-8 mb-2">
              <div className="w-4 h-4 bg-slate-900 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -ml-1" />
              </div>
              <div className="w-4 h-4 bg-slate-900 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -ml-1" />
              </div>
            </div>

            {/* Rosy Cheeks */}
            <div className="flex justify-between w-24 px-1 -my-1">
              <div className="w-4 h-2 bg-pink-400/70 rounded-full" />
              <div className="w-4 h-2 bg-pink-400/70 rounded-full" />
            </div>

            {/* Cute Smile */}
            <div className="w-7 h-4 bg-rose-500 rounded-b-full border-2 border-rose-600 animate-wiggle" />
          </div>

          {/* Baby Body in Bluey Onesie */}
          <div className="relative -mt-2 z-10 w-24 h-16 bg-[#3D85C6] rounded-t-3xl border-2 border-[#1A4971] flex flex-col items-center justify-center shadow-lg">
            <span className="text-[11px] font-black text-yellow-300">SHIVI • 1</span>
            {/* 1st Birthday Candle Cake */}
            <div className="text-xl -mt-1">🎂</div>
            {/* Waving Baby Hand */}
            <div className="absolute -right-6 top-1 text-2xl animate-wiggle">👋</div>
          </div>
        </div>

        {/* Play / Pause tap overlay */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 z-10 flex items-center justify-center bg-transparent"
        >
          {!isPlaying && (
            <div className="w-16 h-16 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm shadow-xl">
              <Play className="w-8 h-8 fill-white ml-1" />
            </div>
          )}
        </button>

        {/* Right Action Floating Column (Reels Style) */}
        <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center space-y-4">
          <button
            onClick={handleLike}
            className="flex flex-col items-center text-white focus:outline-none"
          >
            <div className={`p-2.5 rounded-full backdrop-blur-md transition ${hasLiked ? "bg-red-500 text-white" : "bg-black/30 text-white"}`}>
              <Heart className={`w-5 h-5 ${hasLiked ? "fill-white" : ""}`} />
            </div>
            <span className="text-[10px] font-extrabold mt-1">{likes}</span>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${EVENT_DETAILS.childName}'s 1st Birthday Invitation`,
                  text: EVENT_DETAILS.hindiVoiceover,
                  url: window.location.href,
                }).catch(() => {});
              }
            }}
            className="flex flex-col items-center text-white"
          >
            <div className="p-2.5 rounded-full bg-black/30 backdrop-blur-md">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold mt-1">Share</span>
          </button>
        </div>
      </div>

      {/* Bottom Overlay: Video Voiceover Text & Prominent Action Buttons */}
      <div className="relative z-30 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-8">
        {/* Exact Hindi Voiceover from Specification */}
        <div className="bg-yellow-400/95 backdrop-blur-sm p-3 rounded-2xl border-2 border-yellow-200 shadow-lg mb-3">
          <div className="flex items-center space-x-1.5 text-bluey-dark font-black text-[11px] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>Voiceover Message from Shivi:</span>
          </div>
          <p className="text-slate-900 font-black text-sm sm:text-base leading-snug">
            &ldquo;{EVENT_DETAILS.hindiVoiceover}&rdquo;
          </p>
          <p className="text-slate-700 text-[11px] font-semibold italic mt-0.5">
            ({EVENT_DETAILS.englishTranslation})
          </p>
        </div>

        {/* Date, Time & Venue pill */}
        <div className="flex items-center justify-between text-[11px] text-white/90 font-bold mb-3 px-1">
          <span>📅 Sun, Nov 29, 2026</span>
          <span>⏰ After 5:30 PM</span>
        </div>

        {/* Two Prominent Action Buttons: Accept and Deny */}
        <div className="grid grid-cols-2 gap-3">
          {/* ACCEPT BUTTON */}
          <button
            onClick={() => {
              try {
                confetti({
                  particleCount: 80,
                  spread: 60,
                  origin: { y: 0.7 },
                  colors: ["#3D85C6", "#70B4E8", "#E98A3C", "#FFF4D6"],
                });
              } catch {}
              onAccept();
            }}
            className="group relative flex items-center justify-center space-x-1.5 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm shadow-xl shadow-emerald-500/40 transition transform active:scale-95"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            <span>ACCEPT 🎉</span>
          </button>

          {/* DENY BUTTON */}
          <button
            onClick={onDeny}
            className="flex items-center justify-center space-x-1.5 py-3 px-4 rounded-2xl bg-white/20 hover:bg-rose-500/80 text-white font-bold text-sm backdrop-blur-md border border-white/30 transition transform active:scale-95"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
            <span>DENY</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 h-1 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-yellow-400 h-full rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

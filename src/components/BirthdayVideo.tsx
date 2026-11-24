"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles, Upload, Video as VideoIcon } from "lucide-react";

interface BirthdayVideoProps {
  childName?: string;
  turningAge?: number;
}

export default function BirthdayVideo({ childName = "Liam", turningAge = 5 }: BirthdayVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const realVideoRef = useRef<HTMLVideoElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const subtitles = [
    `"Hii everyone! Guess what? I'm turning ${turningAge} years old!" 🎈✨`,
    `"I made this special video just for you because you are my best buddy!" 🌟`,
    `"We're having a magic show, a giant bouncy castle, and huge ice-cream cake!" 🎂🍦`,
    `"My dad and mom have planned super fun games and surprises!" 🦸‍♂️🎈`,
    `"Will you please come celebrate with me? Click the ACCEPT button below! Yay!" 🎉🥳`,
  ];

  const totalDuration = 20; // seconds for the animated sequence

  // Synthesizer cheerful birthday tune when playing
  const playChime = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const notes = [261.63, 261.63, 293.66, 261.63, 349.23, 329.63]; // Happy Birthday opening notes
      const note = notes[Math.floor((progress / 100) * notes.length) % notes.length];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(note, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  useEffect(() => {
    if (isPlaying) {
      if (customVideoUrl && realVideoRef.current) {
        realVideoRef.current.play();
      } else {
        timerRef.current = setInterval(() => {
          setProgress((prev) => {
            const next = prev + 100 / (totalDuration * 10);
            if (next >= 100) {
              setIsPlaying(false);
              return 100;
            }
            return next;
          });
        }, 100);
      }
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (customVideoUrl && realVideoRef.current) {
        realVideoRef.current.pause();
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, customVideoUrl]);

  useEffect(() => {
    if (!customVideoUrl) {
      const index = Math.min(
        subtitles.length - 1,
        Math.floor((progress / 100) * subtitles.length)
      );
      if (index !== activeSubtitleIndex && isPlaying) {
        setActiveSubtitleIndex(index);
        playChime();
      }
    }
  }, [progress, customVideoUrl, isPlaying]);

  const handleTogglePlay = () => {
    if (progress >= 100 && !customVideoUrl) {
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setProgress(0);
    setIsPlaying(true);
    if (realVideoRef.current) {
      realVideoRef.current.currentTime = 0;
      realVideoRef.current.play();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
      setProgress(0);
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Decorative ears / frame top */}
      <div className="flex justify-center -mb-2 space-x-12 relative z-0">
        <div className="w-12 h-12 bg-pink-400 rounded-t-full border-4 border-b-0 border-pink-500 shadow-sm" />
        <div className="w-12 h-12 bg-sky-400 rounded-t-full border-4 border-b-0 border-sky-500 shadow-sm" />
      </div>

      {/* Main Tablet / TV Frame */}
      <div className="relative z-10 bg-amber-100 p-4 sm:p-6 rounded-[2.5rem] border-8 border-yellow-300 shadow-2xl">
        {/* Antenna / Badge */}
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center space-x-2">
            <span className="flex h-3 w-3 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? "bg-red-400" : "bg-emerald-400"} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isPlaying ? "bg-red-500" : "bg-emerald-500"}`}></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              {isPlaying ? "REC • LIVE INVITATION" : "READY TO PLAY"}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center space-x-1 text-xs bg-white/80 hover:bg-white text-slate-700 px-2.5 py-1 rounded-full shadow-sm border border-amber-200 transition"
              title="Upload custom video of the child"
            >
              <Upload className="w-3.5 h-3.5 text-pink-500" />
              <span>{customVideoUrl ? "Change Video" : "Upload Child Video"}</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="video/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Video Screen Container */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-b from-sky-200 via-indigo-100 to-pink-100 border-4 border-yellow-400 shadow-inner flex flex-col justify-between">
          {customVideoUrl ? (
            /* Real Video Player */
            <video
              ref={realVideoRef}
              src={customVideoUrl}
              className="w-full h-full object-cover"
              muted={isMuted}
              onTimeUpdate={() => {
                if (realVideoRef.current) {
                  const p = (realVideoRef.current.currentTime / realVideoRef.current.duration) * 100;
                  setProgress(p || 0);
                }
              }}
              onEnded={() => setIsPlaying(false)}
              playsInline
            />
          ) : (
            /* Animated Interactive Cartoon Child Video */
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 select-none">
              {/* Floating Balloons in Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-4 left-6 text-3xl animate-bounce-slow opacity-85">🎈</div>
                <div className="absolute top-10 right-8 text-4xl animate-bounce-slow opacity-90" style={{ animationDelay: "1s" }}>🎈</div>
                <div className="absolute bottom-12 left-10 text-2xl animate-pulse opacity-75">✨</div>
                <div className="absolute top-6 right-24 text-2xl animate-float-slow opacity-80">⭐</div>
                <div className="absolute bottom-8 right-12 text-3xl animate-float-slow opacity-90">🎉</div>
              </div>

              {/* Animated Cartoon Kid (Liam) */}
              <div className="relative flex flex-col items-center my-auto">
                {/* Party Hat */}
                <div className="relative -mb-3 z-20">
                  <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[38px] border-b-pink-500 relative">
                    <div className="absolute -top-3 -left-2 text-yellow-300 text-sm animate-spin">✨</div>
                  </div>
                  <div className="w-10 h-2 bg-yellow-400 rounded-full mx-auto -mt-1 shadow-sm" />
                </div>

                {/* Kid Face & Hair */}
                <div className="relative w-28 h-28 bg-amber-200 rounded-full border-4 border-amber-300 shadow-md flex flex-col items-center justify-center">
                  {/* Hair */}
                  <div className="absolute -top-2 w-24 h-8 bg-amber-800 rounded-t-full -z-10" />

                  {/* Eyes */}
                  <div className="flex space-x-6 mb-2">
                    <div className="w-3.5 h-3.5 bg-slate-800 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full -mt-1 -ml-1" />
                    </div>
                    <div className="w-3.5 h-3.5 bg-slate-800 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full -mt-1 -ml-1" />
                    </div>
                  </div>

                  {/* Rosy Cheeks */}
                  <div className="flex justify-between w-20 px-1 -my-1">
                    <div className="w-3 h-2 bg-pink-300/80 rounded-full" />
                    <div className="w-3 h-2 bg-pink-300/80 rounded-full" />
                  </div>

                  {/* Mouth (Moves when playing) */}
                  <div
                    className={`bg-rose-500 rounded-full transition-all duration-200 ${
                      isPlaying
                        ? "w-6 h-5 rounded-b-full border-2 border-rose-600 animate-wiggle"
                        : "w-5 h-2.5 rounded-b-full"
                    }`}
                  />
                </div>

                {/* Kid Body & Waving Hand */}
                <div className="relative -mt-2 w-20 h-14 bg-blue-500 rounded-t-3xl border-2 border-blue-600 flex justify-center items-center">
                  <span className="text-white font-black text-xs">AGE {turningAge}</span>

                  {/* Waving Hand */}
                  <div className={`absolute -right-6 top-1 text-2xl transition-transform ${isPlaying ? "animate-wiggle" : ""}`}>
                    👋
                  </div>
                </div>
              </div>

              {/* Subtitles & Speech Bubble */}
              <div className="relative z-20 w-full max-w-lg bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg border-2 border-pink-300 text-center mb-2">
                <p className="text-sm sm:text-base font-bold text-slate-800 animate-fadeIn transition-all">
                  {subtitles[activeSubtitleIndex]}
                </p>
              </div>
            </div>
          )}

          {/* Big Play Overlay when paused */}
          {!isPlaying && (
            <button
              onClick={handleTogglePlay}
              className="absolute inset-0 bg-black/25 flex items-center justify-center backdrop-blur-[2px] transition hover:bg-black/30 group"
              aria-label="Play child invite video"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 p-1 shadow-2xl group-hover:scale-110 transition-transform">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center pl-1 shadow-inner">
                  <Play className="w-9 h-9 text-pink-600 fill-pink-500" />
                </div>
              </div>
            </button>
          )}

          {/* Overlay Video Controls Bar */}
          <div className="relative z-30 bg-slate-900/75 backdrop-blur-md px-3 py-2 flex items-center space-x-3 text-white">
            <button
              onClick={handleTogglePlay}
              className="p-1.5 hover:bg-white/20 rounded-lg transition"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
            </button>

            <button
              onClick={handleRestart}
              className="p-1.5 hover:bg-white/20 rounded-lg transition"
              title="Restart Video"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Progress bar */}
            <div className="flex-1 bg-white/30 rounded-full h-2 overflow-hidden relative cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = (clickX / rect.width) * 100;
                setProgress(newProgress);
                if (realVideoRef.current) {
                  realVideoRef.current.currentTime = (newProgress / 100) * (realVideoRef.current.duration || 1);
                }
              }}
            >
              <div
                className="bg-gradient-to-r from-pink-400 to-yellow-300 h-full rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Video Caption / Note */}
        <div className="mt-3 flex items-center justify-between text-xs text-amber-900/80 px-2 font-medium">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Special personal video invitation from {childName}!</span>
          </div>
          {customVideoUrl && (
            <button
              onClick={() => setCustomVideoUrl(null)}
              className="text-pink-600 hover:underline font-bold"
            >
              Reset to Animated Greeting
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

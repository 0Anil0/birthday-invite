"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calendar, Sparkles } from "lucide-react";

interface CountdownTimerProps {
  targetDate?: string; // e.g. "2026-12-12T15:00:00"
}

export default function CountdownTimer({ targetDate = "2026-12-12T15:00:00" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-1 rounded-3xl shadow-xl text-white">
      <div className="bg-white/10 backdrop-blur-md rounded-[1.4rem] p-4 sm:p-6 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs sm:text-sm font-bold mb-4 tracking-wider uppercase">
          <Clock className="w-4 h-4 text-yellow-300 animate-pulse" />
          <span>Countdown to the Big Celebration!</span>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
          <div className="bg-white/20 rounded-2xl p-2.5 sm:p-3 shadow-inner">
            <span className="block text-2xl sm:text-4xl font-extrabold text-yellow-300">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-semibold text-white/90">Days</span>
          </div>

          <div className="bg-white/20 rounded-2xl p-2.5 sm:p-3 shadow-inner">
            <span className="block text-2xl sm:text-4xl font-extrabold text-pink-200">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-semibold text-white/90">Hours</span>
          </div>

          <div className="bg-white/20 rounded-2xl p-2.5 sm:p-3 shadow-inner">
            <span className="block text-2xl sm:text-4xl font-extrabold text-sky-200">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-semibold text-white/90">Minutes</span>
          </div>

          <div className="bg-white/20 rounded-2xl p-2.5 sm:p-3 shadow-inner">
            <span className="block text-2xl sm:text-4xl font-extrabold text-emerald-300">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-semibold text-white/90">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}

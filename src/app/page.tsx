"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Calendar, Clock, MapPin, Heart, PartyPopper, Check, X, ShieldAlert, ArrowRight, Gift, Music } from "lucide-react";
import confetti from "canvas-confetti";
import BirthdayVideo from "@/components/BirthdayVideo";
import DeclineModal from "@/components/DeclineModal";
import CountdownTimer from "@/components/CountdownTimer";
import { EVENT_DETAILS } from "@/types";

export default function BirthdayInvitationPage() {
  const router = useRouter();
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // Initial welcome confetti burst
  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.2 },
      });
    } catch {
      // safe fallback
    }
  }, []);

  const handleAccept = () => {
    setHasCelebrated(true);
    try {
      // Massive celebratory confetti
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#FF6B8B", "#FFD166", "#4D96FF", "#6BCB77", "#9D4EDD"],
      });
    } catch {
      // safe fallback
    }

    // Smooth transition to party details page
    setTimeout(() => {
      router.push("/party-details?status=accepted");
    }, 900);
  };

  return (
    <main className="min-h-screen relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Balloons and Sparkles */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-4 text-5xl animate-float-slow opacity-60">🎈</div>
        <div className="absolute top-28 right-8 text-6xl animate-bounce-slow opacity-60" style={{ animationDelay: "1.5s" }}>🎈</div>
        <div className="absolute bottom-20 left-12 text-6xl animate-float-slow opacity-50" style={{ animationDelay: "2s" }}>🎈</div>
        <div className="absolute top-1/2 right-4 text-4xl animate-pulse opacity-40">✨</div>
        <div className="absolute bottom-40 right-16 text-5xl animate-wiggle opacity-60">🦁</div>
        <div className="absolute top-1/3 left-6 text-4xl animate-bounce-slow opacity-40">⭐</div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Top Header Card */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold px-5 py-2 rounded-full text-xs sm:text-sm tracking-widest uppercase shadow-lg shadow-pink-500/20 mb-4 animate-bounce-slow">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Official VIP Birthday Invitation</span>
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-800 tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600">
              {EVENT_DETAILS.childName}
            </span>{" "}
            is Turning{" "}
            <span className="inline-block relative">
              <span className="text-amber-500 underline decoration-wavy decoration-pink-400">
                {EVENT_DETAILS.turningAge}!
              </span>
              <span className="absolute -top-4 -right-6 text-3xl">🎂</span>
            </span>
          </h1>

          <p className="mt-3 text-lg sm:text-xl font-bold text-slate-600 max-w-xl mx-auto">
            You&apos;re invited to an unforgettable day of safari quests, bouncy castles, and birthday magic! 🦁✨
          </p>
        </header>

        {/* Video Invite Section */}
        <section className="mb-10">
          <BirthdayVideo childName={EVENT_DETAILS.childName} turningAge={EVENT_DETAILS.turningAge} />
        </section>

        {/* Invitation Event Summary Card */}
        <div className="glass-card rounded-[2.5rem] p-6 sm:p-8 shadow-2xl mb-10 border-4 border-white/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-pink-100">
            {/* Date */}
            <div className="flex flex-col items-center pt-3 md:pt-0">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-3 shadow-inner">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Date</span>
              <span className="text-base sm:text-lg font-black text-slate-800 mt-1">
                {EVENT_DETAILS.date}
              </span>
            </div>

            {/* Time */}
            <div className="flex flex-col items-center pt-4 md:pt-0">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3 shadow-inner">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Time</span>
              <span className="text-base sm:text-lg font-black text-slate-800 mt-1">
                {EVENT_DETAILS.time}
              </span>
            </div>

            {/* Venue */}
            <div className="flex flex-col items-center pt-4 md:pt-0">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3 shadow-inner">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Adventure Zone</span>
              <span className="text-base sm:text-lg font-black text-slate-800 mt-1">
                {EVENT_DETAILS.venueName}
              </span>
              <span className="text-xs text-slate-500 mt-0.5">{EVENT_DETAILS.address}</span>
            </div>
          </div>
        </div>

        {/* TWO PRIMARY ACTION BUTTONS: ACCEPT & REJECT */}
        <section className="mb-12">
          <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] shadow-2xl border-4 border-yellow-200 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2">
              Will you be there to celebrate with {EVENT_DETAILS.childName}? 🎈
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-8">
              Click <strong className="text-emerald-600 font-black">ACCEPT</strong> to see all party instructions, schedule, and guidelines prepared by {EVENT_DETAILS.childName}&apos;s parents!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-xl mx-auto">
              {/* ACCEPT BUTTON */}
              <button
                onClick={handleAccept}
                className="w-full sm:w-auto flex-1 group relative inline-flex items-center justify-center px-8 py-5 text-lg font-black text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-3xl shadow-xl shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center">
                    <Check className="w-6 h-6 text-white stroke-[3]" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xl leading-none">ACCEPT</span>
                    <span className="text-xs font-semibold text-emerald-100">Yes! I&apos;m Coming! 🎉</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* REJECT BUTTON */}
              <button
                onClick={() => setIsDeclineOpen(true)}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-8 py-5 text-base font-extrabold text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-3xl border-2 border-slate-200 hover:border-rose-200 shadow-md transition-all duration-300 transform hover:scale-102 active:scale-95 focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                    <X className="w-5 h-5 text-slate-500 stroke-[3]" />
                  </div>
                  <div className="text-left">
                    <span className="block text-lg leading-none">REJECT</span>
                    <span className="text-xs font-semibold text-slate-400">Can&apos;t Make It 😢</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Live Countdown preview */}
        <section className="mb-12">
          <CountdownTimer />
        </section>

        {/* Fun Preview Highlights */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center pb-8">
          <div className="bg-white/80 p-5 rounded-2xl border-2 border-pink-200 shadow-sm">
            <span className="text-3xl block mb-2">🎩🪄</span>
            <h3 className="font-bold text-slate-800 text-sm">Magic & Superhero Show</h3>
            <p className="text-xs text-slate-500 mt-1">Live illusionist and interactive superhero games!</p>
          </div>

          <div className="bg-white/80 p-5 rounded-2xl border-2 border-amber-200 shadow-sm">
            <span className="text-3xl block mb-2">🏰🎈</span>
            <h3 className="font-bold text-slate-800 text-sm">Mega Bouncy Castle</h3>
            <p className="text-xs text-slate-500 mt-1">Safe indoor bouncing fun and obstacle course.</p>
          </div>

          <div className="bg-white/80 p-5 rounded-2xl border-2 border-sky-200 shadow-sm">
            <span className="text-3xl block mb-2">🎂🍕</span>
            <h3 className="font-bold text-slate-800 text-sm">Cake & Treats Feast</h3>
            <p className="text-xs text-slate-500 mt-1">Delicious custom cake, pizza, and allergy-friendly snacks.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-400 py-6">
          <p>Hosted with love by {EVENT_DETAILS.hostName} for {EVENT_DETAILS.childName}&apos;s 5th Birthday 🎈</p>
        </footer>
      </div>

      {/* Decline / Rejection Modal */}
      <DeclineModal
        isOpen={isDeclineOpen}
        onClose={() => setIsDeclineOpen(false)}
        childName={EVENT_DETAILS.childName}
      />
    </main>
  );
}

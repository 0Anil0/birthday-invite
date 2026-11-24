"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, User, Users, Phone, MapPin, Calendar, Clock, ArrowRight, ArrowLeft, Heart, Ticket, X, Send } from "lucide-react";
import confetti from "canvas-confetti";
import BlueyReelVideo from "@/components/BlueyReelVideo";
import GardenSeatSelector from "@/components/GardenSeatSelector";
import AddCalendarButton from "@/components/AddCalendarButton";
import { EVENT_DETAILS } from "@/types";

export default function BirthdayInviteApp() {
  // Step management: 1 = Reel Video, 2 = Guest Name, 3 = Seat Selection, 4 = Final Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [phone, setPhone] = useState("");
  const [selectedSeatId, setSelectedSeatId] = useState("");
  const [selectedSeatLabel, setSelectedSeatLabel] = useState("");
  const [wishes, setWishes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [denySenderName, setDenySenderName] = useState("");
  const [denyWish, setDenyWish] = useState("");
  const [denySubmitted, setDenySubmitted] = useState(false);

  // Trigger celebration confetti
  const launchConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#3D85C6", "#70B4E8", "#E98A3C", "#F8B77D", "#FFF4D6"],
      });
    } catch {}
  };

  // Step 1 -> Step 2
  const handleAcceptInvite = () => {
    launchConfetti();
    setCurrentStep(2);
  };

  // Step 2 -> Step 3
  const handleProceedToSeatSelection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setCurrentStep(3);
  };

  // Step 3 -> Step 4 (Final Submit to MongoDB)
  const handleFinalSubmit = async () => {
    if (!selectedSeatId) {
      alert("Please choose a seat or spot from the garden layout!");
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          guestCount,
          phone,
          selectedSeatId,
          selectedSeatLabel,
          status: "accepted",
          wishes,
        }),
      });
    } catch (err) {
      console.warn("MongoDB RSVP submission (offline fallback active):", err);
    } finally {
      setIsSubmitting(false);
      launchConfetti();
      setCurrentStep(4);
    }
  };

  return (
    <main className="min-h-screen py-6 px-3 sm:px-6 flex flex-col justify-between items-center relative overflow-hidden">
      {/* Decorative Bluey clouds in background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-8 left-6 text-5xl opacity-40 animate-float-slow">☁️</div>
        <div className="absolute top-24 right-10 text-6xl opacity-40 animate-float-slow" style={{ animationDelay: "2s" }}>☁️</div>
        <div className="absolute bottom-16 left-12 text-4xl opacity-30 animate-wiggle">🐾</div>
        <div className="absolute bottom-24 right-14 text-5xl opacity-30 animate-bounce-subtle">🎈</div>
      </div>

      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col items-center">
        {/* Step Indicator Header (Steps 2, 3, 4) */}
        {currentStep > 1 && (
          <div className="w-full mb-6">
            <div className="flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border-2 border-bluey-sky shadow-sm">
              <button
                onClick={() => setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : 1))}
                className="inline-flex items-center space-x-1 text-xs font-bold text-bluey-primary hover:text-bluey-dark"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex items-center space-x-2 text-xs font-black text-slate-700">
                <span className={`px-2.5 py-0.5 rounded-full ${currentStep === 2 ? "bg-bluey-primary text-white" : "bg-slate-100"}`}>
                  1. Your Name
                </span>
                <span>•</span>
                <span className={`px-2.5 py-0.5 rounded-full ${currentStep === 3 ? "bg-bluey-primary text-white" : "bg-slate-100"}`}>
                  2. Garden Seat
                </span>
                <span>•</span>
                <span className={`px-2.5 py-0.5 rounded-full ${currentStep === 4 ? "bg-emerald-500 text-white" : "bg-slate-100"}`}>
                  3. VIP Pass
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Main Invitation Page (Instagram Video Style) */}
        {currentStep === 1 && (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <div className="text-center mb-3">
              <div className="inline-flex items-center space-x-2 bg-bluey-primary text-white text-xs font-black px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider mb-1">
                <span>🐾 Bluey-Themed 1st Birthday</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-800">
                {EVENT_DETAILS.childName} ({EVENT_DETAILS.nickname}) is Turning 1! 🎂
              </h1>
            </div>

            <BlueyReelVideo
              onAccept={handleAcceptInvite}
              onDeny={() => setIsDenyModalOpen(true)}
            />
          </div>
        )}

        {/* STEP 2: Guest Name Input */}
        {currentStep === 2 && (
          <div className="w-full max-w-md bg-white rounded-[2rem] p-6 sm:p-8 shadow-2xl border-4 border-bluey-sky animate-fadeIn">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-bluey-sky/50 text-bluey-dark flex items-center justify-center text-2xl shadow-inner">
              🐾
            </div>

            <h2 className="text-2xl font-black text-center text-slate-800 mb-1">
              Welcome! Who is attending? 🎉
            </h2>
            <p className="text-xs sm:text-sm text-center text-slate-600 mb-6">
              Please enter your name so Sharvil&apos;s family can reserve your welcome safari kit and party favors!
            </p>

            <form onSubmit={handleProceedToSeatSelection} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Full Name / Family Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sharma Family / Rahul & Priya"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-bluey-primary text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full pl-9 pr-2 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-bluey-primary text-sm font-semibold bg-white"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5+ Family</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Contact Phone (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-bluey-primary text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Sweet Blessing / Wish for Shivi
                </label>
                <textarea
                  rows={2}
                  placeholder="Happy 1st Birthday dearest Shivi! May God bless you always! ❤️"
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-bluey-primary text-xs font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-bluey-primary to-bluey-dark hover:from-bluey-dark hover:to-bluey-primary text-white font-black text-sm shadow-xl shadow-bluey-primary/30 transition transform active:scale-95 flex items-center justify-center space-x-2 mt-4"
              >
                <span>Select Your Garden Seat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Garden Layout & Seat Selection */}
        {currentStep === 3 && (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <GardenSeatSelector
              selectedSeatId={selectedSeatId}
              onSeatSelect={(seatId, label) => {
                setSelectedSeatId(seatId);
                setSelectedSeatLabel(label);
              }}
            />

            {/* Step 3 Action Bar */}
            <div className="w-full mt-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border-2 border-bluey-sky shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-extrabold text-slate-400 block">
                  Reserving for: <strong className="text-slate-800">{guestName}</strong> ({guestCount} Guests)
                </span>
                <span className="text-sm font-black text-bluey-dark">
                  {selectedSeatId ? `Selected: ${selectedSeatLabel}` : "Please tap a green seat on the map"}
                </span>
              </div>

              <button
                type="button"
                disabled={!selectedSeatId || isSubmitting}
                onClick={handleFinalSubmit}
                className={`py-3.5 px-8 rounded-2xl font-black text-sm shadow-xl transition transform flex items-center space-x-2 ${
                  selectedSeatId && !isSubmitting
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-500/30 active:scale-95 cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                }`}
              >
                {isSubmitting ? (
                  <span>Saving to Guestlist...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                    <span>Confirm & Get VIP Pass</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Final Submit & Add to Calendar */}
        {currentStep === 4 && (
          <div className="w-full max-w-lg bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border-4 border-emerald-300 text-center animate-fadeIn">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center space-x-1 bg-yellow-400 text-bluey-dark text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RSVP Confirmed & Saved!</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-1">
              Aapka Bohat Bohat Swagat Hai! 🐾🎉
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Thank you, <strong className="text-bluey-primary">{guestName}</strong>! Sharvil (Shivi) and family are overjoyed to have you celebrate his 1st Birthday!
            </p>

            {/* Official VIP Event Pass */}
            <div className="relative bg-gradient-to-br from-bluey-primary via-indigo-600 to-bluey-dark text-white rounded-3xl p-5 shadow-xl text-left mb-6 overflow-hidden border-2 border-yellow-300">
              <div className="absolute top-3 right-3 text-3xl opacity-30 pointer-events-none">
                🐾
              </div>

              <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-yellow-300 block">
                    VIP GUEST PASS
                  </span>
                  <span className="text-lg font-black text-white">
                    {EVENT_DETAILS.childName} ({EVENT_DETAILS.nickname})&apos;s 1st Birthday
                  </span>
                </div>
                <div className="bg-yellow-400 text-slate-900 text-xs font-black px-2.5 py-1 rounded-xl shadow">
                  SEAT {selectedSeatId}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-white/90">
                <div>
                  <span className="block text-white/60 text-[10px] uppercase">Guest Name</span>
                  <span className="font-extrabold text-yellow-200">{guestName}</span>
                </div>
                <div>
                  <span className="block text-white/60 text-[10px] uppercase">Total Guests</span>
                  <span className="font-extrabold">{guestCount} Member(s)</span>
                </div>
                <div>
                  <span className="block text-white/60 text-[10px] uppercase">Date & Time</span>
                  <span className="font-extrabold">{EVENT_DETAILS.date}</span>
                  <span className="block text-[11px] text-sky-200">{EVENT_DETAILS.time}</span>
                </div>
                <div>
                  <span className="block text-white/60 text-[10px] uppercase">Reserved Table</span>
                  <span className="font-extrabold text-emerald-200">{selectedSeatLabel || selectedSeatId}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-white/80">
                <span>📍 Kesarinandan Parkway, Udaipur</span>
                <span className="font-black text-yellow-300">Theme: Bluey</span>
              </div>
            </div>

            {/* Step 4: Add to Calendar Section */}
            <div className="mb-6">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-3">
                Save the Date to Your Calendar
              </span>
              <AddCalendarButton />
            </div>

            {/* Venue Location Navigation Button */}
            <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 mb-6 text-left">
              <div className="flex items-center space-x-2 text-bluey-primary font-black text-xs uppercase mb-1">
                <MapPin className="w-4 h-4" />
                <span>Venue & Navigation</span>
              </div>
              <p className="text-xs font-bold text-slate-800">
                {EVENT_DETAILS.venueName}
              </p>
              <p className="text-[11px] text-slate-600 mb-3">
                {EVENT_DETAILS.address}
              </p>

              <a
                href={EVENT_DETAILS.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-bluey-primary hover:bg-bluey-dark text-white font-extrabold text-xs shadow transition"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps (Opp. ISKCON COVEY)</span>
              </a>
            </div>

            {/* Share / Restart Option */}
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 underline"
            >
              Replay Invitation Video
            </button>
          </div>
        )}
      </div>

      {/* Gentle Deny Modal */}
      {isDenyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-bluey-sky">
            <button
              onClick={() => setIsDenyModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {!denySubmitted ? (
              <div>
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-100 flex items-center justify-center text-3xl">
                  🥺
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-center text-slate-800 mb-2">
                  We Will Miss You!
                </h3>
                <p className="text-center text-slate-600 text-xs sm:text-sm mb-5 leading-relaxed">
                  Agar aap kisi wajah se nahi aa pa rahe hain, toh bhi Shivi ke liye apna aashirvaad / sweet blessing message zaroor bhejein! 💌
                </p>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!denySenderName.trim()) return;
                    try {
                      await fetch("/api/rsvp", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          guestName: denySenderName,
                          status: "denied",
                          wishes: denyWish,
                        }),
                      });
                    } catch {}
                    setDenySubmitted(true);
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Your Name / Family Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Uncle / Auntie / Friend"
                      value={denySenderName}
                      onChange={(e) => setDenySenderName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-bluey-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Aashirvaad / Birthday Wish for Shivi
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Dearest Shivi, Happy 1st Birthday! Khoob saari khushiyan aur aashirvaad!"
                      value={denyWish}
                      onChange={(e) => setDenyWish(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-bluey-primary resize-none"
                    />
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsDenyModalOpen(false)}
                      className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-bluey-primary to-bluey-dark text-white font-bold text-xs shadow flex items-center justify-center space-x-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Blessing</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl">
                  💖
                </div>
                <h4 className="text-xl font-black text-slate-800 mb-1">Blessing Delivered!</h4>
                <p className="text-slate-600 text-xs mb-5">
                  Thank you, <strong className="text-slate-900">{denySenderName}</strong>! Your warm wishes have been saved for Shivi&apos;s 1st birthday memory book.
                </p>
                <button
                  onClick={() => setIsDenyModalOpen(false)}
                  className="py-2.5 px-6 rounded-xl bg-bluey-primary text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-4 text-xs font-semibold text-slate-400">
        <p>🐾 {EVENT_DETAILS.childName} ({EVENT_DETAILS.nickname})&apos;s 1st Birthday • {EVENT_DETAILS.venueName}, Udaipur</p>
      </footer>
    </main>
  );
}

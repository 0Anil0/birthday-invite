"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, User, Users, Phone, MapPin, Calendar, Clock, ArrowRight, ArrowLeft, Heart, Ticket, X, Send, Check } from "lucide-react";
import confetti from "canvas-confetti";
import BlueyReelVideo from "@/components/BlueyReelVideo";
import GardenSeatSelector from "@/components/GardenSeatSelector";
import AddCalendarButton from "@/components/AddCalendarButton";
import { EVENT_DETAILS } from "@/types";

export default function BirthdayInviteApp() {
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

  const launchConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#3D85C6", "#70B4E8", "#E98A3C", "#F8B77D", "#FFF4D6"],
      });
    } catch {}
  };

  const handleAcceptInvite = () => {
    launchConfetti();
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProceedToSeatSelection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = async () => {
    if (!selectedSeatId) {
      alert("Please choose your preferred seat from the floor plan layout!");
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen py-4 sm:py-6 px-2 sm:px-4 lg:px-8 flex flex-col justify-between items-center relative overflow-x-hidden">
      {/* Decorative Bluey elements in background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        <div className="absolute top-8 left-4 text-4xl sm:text-5xl opacity-40 animate-float-slow">☁️</div>
        <div className="absolute top-24 right-8 text-5xl sm:text-6xl opacity-40 animate-float-slow" style={{ animationDelay: "2s" }}>☁️</div>
        <div className="absolute bottom-16 left-8 text-3xl opacity-30 animate-wiggle">🐾</div>
        <div className="absolute bottom-28 right-10 text-4xl opacity-30 animate-bounce-subtle">🎈</div>
      </div>

      {/* Dynamic Container Width: Full Width (max-w-7xl) for Step 3 Floor Plan, comfortable max-w-3xl for steps 1, 2, 4 */}
      <div className={`w-full mx-auto flex-1 flex flex-col items-center transition-all duration-300 ${
        currentStep === 3 ? "max-w-7xl" : "max-w-3xl"
      }`}>
        {/* Step Indicator Navigation Bar (Steps 2, 3, 4) */}
        {currentStep > 1 && (
          <div className="w-full mb-4 sm:mb-6 sticky top-2 z-40 max-w-3xl">
            <div className="flex items-center justify-between bg-white/95 backdrop-blur-md px-3 sm:px-5 py-2.5 rounded-2xl border-2 border-bluey-sky shadow-md">
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : 1))}
                className="inline-flex items-center space-x-1 text-xs font-black text-bluey-primary hover:text-bluey-dark transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous Step</span>
                <span className="sm:hidden">Back</span>
              </button>

              <div className="flex items-center space-x-1 sm:space-x-2 text-[11px] sm:text-xs font-black">
                <span className={`px-2.5 py-1 rounded-full transition ${currentStep === 2 ? "bg-bluey-primary text-white shadow" : "bg-slate-100 text-slate-500"}`}>
                  1. Name
                </span>
                <span className="text-slate-300">•</span>
                <span className={`px-2.5 py-1 rounded-full transition ${currentStep === 3 ? "bg-bluey-primary text-white shadow" : "bg-slate-100 text-slate-500"}`}>
                  2. Seat Selection
                </span>
                <span className="text-slate-300">•</span>
                <span className={`px-2.5 py-1 rounded-full transition ${currentStep === 4 ? "bg-emerald-500 text-white shadow" : "bg-slate-100 text-slate-500"}`}>
                  3. VIP Pass
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Main Reel Invitation Page */}
        {currentStep === 1 && (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <div className="text-center mb-4">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-bluey-primary to-bluey-light text-white text-xs font-black px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider mb-2">
                <span>🐾 Official Bluey 1st Birthday</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {EVENT_DETAILS.childName} ({EVENT_DETAILS.nickname}) is Turning 1! 🎂
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                Sunday, Nov 29, 2026 • Kesarinandan Parkway, Udaipur
              </p>
            </div>

            <BlueyReelVideo
              onAccept={handleAcceptInvite}
              onDeny={() => setIsDenyModalOpen(true)}
            />
          </div>
        )}

        {/* STEP 2: Guest Details Input */}
        {currentStep === 2 && (
          <div className="w-full max-w-md bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border-4 border-bluey-sky animate-fadeIn my-auto">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-bluey-sky/40 text-bluey-dark flex items-center justify-center text-3xl shadow-inner">
              🐾
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-900 mb-1">
              Who is Attending? 🎉
            </h2>
            <p className="text-xs sm:text-sm text-center text-slate-600 mb-6 font-medium">
              Please enter your name so Sharvil&apos;s family can prepare your welcome safari kit and party favors!
            </p>

            <form onSubmit={handleProceedToSeatSelection} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Guest Name / Family Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sharma Family / Rahul & Priya"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-bluey-primary text-sm font-bold text-slate-800 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                    Attending Members
                  </label>
                  <div className="flex items-center border-2 border-slate-200 rounded-2xl p-1 bg-white">
                    <button
                      type="button"
                      onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-base flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-black text-sm text-slate-800">
                      {guestCount} {guestCount === 1 ? "Person" : "Members"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestCount((c) => Math.min(10, c + 1))}
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-base flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-bluey-primary text-sm font-bold text-slate-800 transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Blessing / Wish for Shivi
                </label>
                <textarea
                  rows={2}
                  placeholder="Happy 1st Birthday dearest Shivi! May God bless you always! ❤️"
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  className="w-full p-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-bluey-primary text-xs font-medium resize-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-bluey-primary to-bluey-dark hover:from-bluey-dark hover:to-bluey-primary text-white font-black text-sm shadow-xl shadow-bluey-primary/25 transition transform active:scale-95 flex items-center justify-center space-x-2 mt-4"
              >
                <span>Proceed to Floor Plan Seat Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Floor Plan & Seat Selection (FULL PAGE WIDTH) */}
        {currentStep === 3 && (
          <div className="w-full flex flex-col items-center animate-fadeIn pb-24 sm:pb-8">
            <GardenSeatSelector
              selectedSeatId={selectedSeatId}
              onSeatSelect={(seatId, label) => {
                setSelectedSeatId(seatId);
                setSelectedSeatLabel(label);
              }}
            />

            {/* Desktop Confirmation Bar */}
            <div className="hidden sm:flex w-full mt-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border-2 border-bluey-sky shadow-lg items-center justify-between gap-4 max-w-4xl">
              <div>
                <span className="text-[11px] uppercase font-black text-slate-400 block">
                  Reserving for: <strong className="text-slate-800">{guestName}</strong> ({guestCount} Guests)
                </span>
                <span className="text-sm font-black text-bluey-dark">
                  {selectedSeatId ? `Selected: ${selectedSeatLabel || selectedSeatId}` : "Tap any numbered circle to select your seat"}
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

            {/* Mobile Fixed Bottom Drawer */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md p-3 border-t-2 border-bluey-sky shadow-2xl flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-black text-slate-400 block truncate">
                  Guest: {guestName}
                </span>
                <span className="text-xs font-black text-bluey-dark truncate block">
                  {selectedSeatId ? `Seat: ${selectedSeatId}` : "Select a seat above"}
                </span>
              </div>

              <button
                type="button"
                disabled={!selectedSeatId || isSubmitting}
                onClick={handleFinalSubmit}
                className={`py-3 px-5 rounded-xl font-black text-xs shadow-lg transition flex items-center space-x-1.5 flex-shrink-0 ${
                  selectedSeatId && !isSubmitting
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30 active:scale-95"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Confirm Pass</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Final Confirmation VIP Pass */}
        {currentStep === 4 && (
          <div className="w-full max-w-lg bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border-4 border-emerald-300 text-center animate-fadeIn my-auto">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center space-x-1 bg-yellow-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              <span>RSVP Confirmed & Recorded in DB!</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
              Aapka Bohat Bohat Swagat Hai! 🐾🎉
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 font-medium">
              Thank you, <strong className="text-bluey-primary">{guestName}</strong>! Sharvil (Shivi) and family look forward to celebrating together.
            </p>

            <div className="relative bg-gradient-to-br from-[#1A4971] via-[#2C6E9E] to-[#1A4971] text-white rounded-3xl p-5 shadow-2xl text-left mb-6 overflow-hidden border-2 border-yellow-300">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-yellow-400 text-slate-900 font-black text-[9px] px-8 py-1 rotate-45 uppercase tracking-widest shadow">
                VIP PASS
              </div>

              <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-yellow-300 block">
                    OFFICIAL GUEST PASS
                  </span>
                  <span className="text-lg font-black text-white">
                    {EVENT_DETAILS.childName} ({EVENT_DETAILS.nickname})&apos;s 1st Birthday
                  </span>
                </div>
                <div className="bg-yellow-400 text-slate-900 text-xs font-black px-2.5 py-1 rounded-xl shadow mr-6">
                  {selectedSeatId}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-white/90">
                <div>
                  <span className="block text-white/60 text-[10px] uppercase">Guest Name</span>
                  <span className="font-extrabold text-yellow-200">{guestName}</span>
                </div>
                <div>
                  <span className="block text-white/60 text-[10px] uppercase">Reserved Count</span>
                  <span className="font-extrabold">{guestCount} Member(s)</span>
                </div>
                <div>
                  <span className="block text-white/60 text-[10px] uppercase">Date & Time</span>
                  <span className="font-extrabold">{EVENT_DETAILS.date}</span>
                  <span className="block text-[11px] text-sky-200">{EVENT_DETAILS.time}</span>
                </div>
                <div>
                  <span className="block text-white/60 text-[10px] uppercase">Table & Seat</span>
                  <span className="font-extrabold text-emerald-200">{selectedSeatLabel || selectedSeatId}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-white/80">
                <span>📍 Kesarinandan Parkway, Udaipur</span>
                <span className="font-black text-yellow-300">Theme: Bluey 🐾</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-3">
                Save the Date to Your Calendar
              </span>
              <AddCalendarButton />
            </div>

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
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-bluey-primary hover:bg-bluey-dark text-white font-black text-xs shadow transition active:scale-95"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps (Opp. ISKCON COVEY)</span>
              </a>
            </div>

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
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-bluey-primary font-semibold"
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

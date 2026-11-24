"use client";

import React, { useState } from "react";
import { CheckCircle2, Ticket, Sparkles, User, Users, Phone, Utensils, HeartHandshake, X } from "lucide-react";
import confetti from "canvas-confetti";
import { EVENT_DETAILS } from "@/types";

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RsvpModal({ isOpen, onClose }: RsvpModalProps) {
  const [parentName, setParentName] = useState("");
  const [childGuestName, setChildGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [dietary, setDietary] = useState("None");
  const [specialNote, setSpecialNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF6B8B", "#FFD166", "#4D96FF", "#6BCB77", "#9D4EDD"],
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-emerald-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center space-x-2 text-emerald-600 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">RSVP Yes!</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2">
              Confirm Your Attendance 🎉
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Please let Liam&apos;s family know who is attending so they can prepare party hats, delicious food, and goodie bags for your little one!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Parent / Guardian Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jessica Smith"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Child&apos;s Name *
                  </label>
                  <div className="relative">
                    <Sparkles className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oliver"
                      value={childGuestName}
                      onChange={(e) => setChildGuestName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Contact Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (555) 234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Total Attending (Kids + Adults)
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={attendeeCount}
                      onChange={(e) => setAttendeeCount(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm bg-white"
                    >
                      <option value={1}>1 (Child only)</option>
                      <option value={2}>2 (1 Child + 1 Adult)</option>
                      <option value={3}>3 (Family of 3)</option>
                      <option value={4}>4 (Family of 4+)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Dietary Restrictions / Allergies
                </label>
                <div className="relative">
                  <Utensils className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Nut allergy, Vegetarian, Gluten-free (or None)"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Note or Birthday Wish for Liam
                </label>
                <textarea
                  rows={2}
                  placeholder="Can't wait to see the magic show and celebrate!"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base shadow-xl shadow-emerald-500/25 transition transform active:scale-95 flex items-center justify-center space-x-2"
                >
                  <Ticket className="w-5 h-5" />
                  <span>Confirm RSVP & Get VIP Party Pass</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* VIP Birthday Ticket Confirmation Badge */
          <div className="text-center py-2">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-slate-800">You&apos;re On The Guest List!</h3>
            <p className="text-slate-600 text-sm mb-4">
              Yay! Liam and his parents are thrilled to celebrate with <span className="font-bold text-emerald-700">{childGuestName || "your child"}</span>!
            </p>

            {/* Visual VIP Ticket */}
            <div className="relative bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-1 rounded-2xl text-white shadow-xl text-left my-4 overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-yellow-400 text-slate-900 font-black text-[10px] px-8 py-1 rotate-45 uppercase tracking-widest shadow">
                VIP PASS
              </div>

              <div className="bg-slate-900/40 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <div className="text-xs uppercase tracking-widest text-yellow-300 font-bold mb-1">
                  OFFICIAL BIRTHDAY PASS
                </div>
                <div className="text-xl font-black text-white mb-2">
                  Liam&apos;s 5th Birthday Adventure 🦁🎈
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-white/90 border-t border-white/20 pt-2">
                  <div>
                    <span className="block text-white/60">Guest Name:</span>
                    <span className="font-bold text-yellow-200">{childGuestName || "Special Guest"}</span>
                  </div>
                  <div>
                    <span className="block text-white/60">Reserved For:</span>
                    <span className="font-bold">{attendeeCount} Attendee(s)</span>
                  </div>
                  <div>
                    <span className="block text-white/60">Date:</span>
                    <span className="font-bold">{EVENT_DETAILS.date}</span>
                  </div>
                  <div>
                    <span className="block text-white/60">Time:</span>
                    <span className="font-bold">{EVENT_DETAILS.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-5">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 hover:bg-slate-50 font-bold text-slate-700 text-xs transition"
              >
                🖨️ Print Pass
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow transition"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

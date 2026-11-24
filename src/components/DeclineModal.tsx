"use client";

import React, { useState } from "react";
import { Heart, X, Send, CheckCircle2 } from "lucide-react";

interface DeclineModalProps {
  isOpen: boolean;
  onClose: () => void;
  childName?: string;
}

export default function DeclineModal({ isOpen, onClose, childName = "Liam" }: DeclineModalProps) {
  const [senderName, setSenderName] = useState("");
  const [wish, setWish] = useState("");
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName) return;
    setIsSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-pink-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSent ? (
          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center text-3xl">
              🥺
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-center text-slate-800 mb-2">
              We will miss you so much!
            </h3>

            <p className="text-center text-slate-600 text-sm mb-6 leading-relaxed">
              We understand you can&apos;t make it to {childName}&apos;s party, but you can still send him a sweet birthday wish to make his day smile! 💌
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Name / Family Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Auntie Emma & Lucas"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Warm Birthday Message for {childName}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={`"Happy 5th Birthday ${childName}! Hope you have the happiest day full of toys and fun!"`}
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm resize-none"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Wish</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Message Delivered!</h3>
            <p className="text-slate-600 text-sm mb-6">
              Thank you, <span className="font-bold">{senderName}</span>! Your heartwarming birthday wish has been saved for {childName}&apos;s birthday scrapbook. 💖
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 px-6 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold transition"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

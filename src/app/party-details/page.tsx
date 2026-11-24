"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Heart,
  Phone,
  Car,
  Utensils,
  Shirt,
  Gift,
  AlertCircle,
  HelpCircle,
  Ticket,
  Smile,
  ShieldCheck,
  PartyPopper
} from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import RsvpModal from "@/components/RsvpModal";
import { EVENT_DETAILS } from "@/types";

export default function PartyDetailsPage() {
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-pink-50 to-indigo-50">
      <div className="max-w-4xl mx-auto">
        {/* Back navigation & Status bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-sm font-bold text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Video Invitation</span>
          </Link>

          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase shadow-sm border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Invitation Accepted! You&apos;re In!</span>
          </div>
        </div>

        {/* Hero Accepted Banner */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 text-9xl opacity-20 pointer-events-none select-none">
            🦁
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <PartyPopper className="w-4 h-4 text-yellow-300" />
              <span>Official Party Guide & Instructions</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-3">
              Hurray! We Can&apos;t Wait to Celebrate with You! 🎉
            </h1>

            <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
              Liam was so happy to see your acceptance! Below is everything Liam&apos;s dad and mom have put together so you have all the party times, safety guidelines, and fun details in one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setIsRsvpModalOpen(true)}
                className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold px-6 py-3 rounded-2xl shadow-lg transition transform hover:scale-105 active:scale-95 text-sm"
              >
                <Ticket className="w-4 h-4" />
                <span>Confirm Headcount & Get VIP Pass</span>
              </button>

              <a
                href={`tel:${EVENT_DETAILS.hostPhone}`}
                className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white font-bold px-5 py-3 rounded-2xl backdrop-blur-md transition text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Host Dad ({EVENT_DETAILS.hostName})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Live Countdown */}
        <div className="mb-8">
          <CountdownTimer />
        </div>

        {/* Section 1: Note from Liam's Dad & Mom */}
        <section className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-xl border-4 border-amber-200 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 font-black text-xl shadow-inner">
              👨‍👩‍👦
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                Host Announcement
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                A Personal Message from Liam&apos;s Dad & Mom
              </h2>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3 bg-amber-50/60 p-5 sm:p-6 rounded-2xl border border-amber-200/60">
            <p>
              <strong>&ldquo;Hello Wonderful Friends!&rdquo;</strong>
            </p>
            <p>
              We are beyond thrilled to celebrate Liam turning 5! Having his best friends and favorite families together means the world to our little guy.
            </p>
            <p>
              We designed this day to be full of laughter, magic, and boundless energy. Both children and parents are welcome to relax, enjoy hot snacks, fresh coffee/mocktails, and watch the kids have the time of their lives in a safe, fully reserved indoor and outdoor play clubhouse.
            </p>
            <p className="font-semibold text-amber-900">
              Please take 2 minutes to read the schedule and guidelines below so you know what to expect! See you all soon!
            </p>
            <div className="pt-2 text-right">
              <span className="font-black text-slate-800 italic">— David & Sarah (Liam&apos;s Parents) ❤️</span>
            </div>
          </div>
        </section>

        {/* Section 2: Hour-by-Hour Party Schedule */}
        <section className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-xl border-4 border-purple-200 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xl shadow-inner">
              ⏰
            </div>
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">
                Party Program
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Schedule of the Day
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {/* Timeline item 1 */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
              <div className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-extrabold text-xs whitespace-nowrap mt-1">
                3:00 PM
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-base">Safari Welcome & Face Painting 🎨</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Arrive through the balloon arch! Kids receive their custom safari hats, balloon animals, and glitter face paints.
                </p>
              </div>
            </div>

            {/* Timeline item 2 */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
              <div className="px-3 py-1.5 rounded-xl bg-sky-600 text-white font-extrabold text-xs whitespace-nowrap mt-1">
                3:45 PM
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-base">The Grand Magic & Superhero Show 🦸‍♂️🪄</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Live professional magic performance starring Liam and his friends, followed by fun interactive superhero group challenges!
                </p>
              </div>
            </div>

            {/* Timeline item 3 */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
              <div className="px-3 py-1.5 rounded-xl bg-pink-600 text-white font-extrabold text-xs whitespace-nowrap mt-1">
                4:30 PM
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-base">Birthday Cake Sing-Along & Candle Blow 🎂</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  We gather around the multi-tier ice cream cake, sing the Happy Birthday song, and capture special group photos!
                </p>
              </div>
            </div>

            {/* Timeline item 4 */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
              <div className="px-3 py-1.5 rounded-xl bg-amber-500 text-white font-extrabold text-xs whitespace-nowrap mt-1">
                5:00 PM
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-base">Bouncy Castle Mania & Piñata Smash 🪅</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Free play in the giant obstacle bounce zone and our giant safari lion piñata bursting with treats and stickers!
                </p>
              </div>
            </div>

            {/* Timeline item 5 */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <div className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs whitespace-nowrap mt-1">
                5:45 PM
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-base">Goodie Bags & Farewell High-Fives 🎁</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Every child receives their custom personalized thank-you goodie bag packed with toys, crafts, and healthy sweets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Crucial Information & Guidelines (What they told you to read!) */}
        <section className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-xl border-4 border-emerald-200 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xl shadow-inner">
              📋
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Important Guidelines
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                What Liam&apos;s Parents Want You to Know
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Food & Allergies */}
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
              <div className="flex items-center space-x-2 text-rose-700 font-extrabold text-sm mb-2">
                <Utensils className="w-5 h-5" />
                <span>Food & Strict Nut-Free Policy</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Our party is <strong>100% peanut and tree-nut free</strong>. We will have fresh artisanal pizzas, fruit skewers, gluten-free snack cups, and fruit juices. Please mention any dietary needs in the RSVP form!
              </p>
            </div>

            {/* Dress Code & Socks */}
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
              <div className="flex items-center space-x-2 text-blue-700 font-extrabold text-sm mb-2">
                <Shirt className="w-5 h-5" />
                <span>Dress Code: Play Clothes & Socks!</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Kids will be jumping and running! <strong>Grip socks are required</strong> for the bounce house (we will have extra pairs if needed). Feel free to dress your child in fun superhero or safari attire!
              </p>
            </div>

            {/* Gift Policy */}
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200">
              <div className="flex items-center space-x-2 text-purple-700 font-extrabold text-sm mb-2">
                <Gift className="w-5 h-5" />
                <span>Gift Suggestions & Policy</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Your presence and warm smiles are the best gift! If your child insists on bringing a present, Liam is obsessed with <strong>LEGO / Duplo, Dinosaurs, and Picture Books</strong>.
              </p>
            </div>

            {/* Parents / Supervision */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-center space-x-2 text-amber-700 font-extrabold text-sm mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Parent Lounging & Drop-Off</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Parents are encouraged to stay! We have a comfortable parents lounge with espresso, herbal teas, and gourmet finger bites. If you need to drop off and pick up at 5:45 PM, please let us know in advance.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Venue, Parking & GPS Navigation */}
        <section className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-xl border-4 border-indigo-200 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xl shadow-inner">
              📍
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                Location & Parking
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Directions & Parking Guide
              </h2>
            </div>
          </div>

          <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100 mb-6">
            <h4 className="font-extrabold text-slate-900 text-base mb-1">
              {EVENT_DETAILS.venueName}
            </h4>
            <p className="text-sm text-slate-600 mb-3">{EVENT_DETAILS.address}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  EVENT_DETAILS.venueName + " " + EVENT_DETAILS.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl shadow transition text-xs"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <div className="inline-flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl text-slate-700 font-medium text-xs border border-indigo-200">
                <Car className="w-4 h-4 text-indigo-500" />
                <span>Free Guest Parking at Lot B (Gate 2)</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Gate Code on Arrival:</strong> When you arrive at Gate 2, press <strong>#2026</strong> on the keypad for direct entry into the Wonder Clubhouse courtyard.
            </span>
          </div>
        </section>

        {/* Section 5: RSVP Confirmation Box */}
        <section className="text-center bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl text-white">
          <h2 className="text-2xl sm:text-4xl font-black mb-3">
            Ready to confirm your spot? 🎟️
          </h2>
          <p className="text-pink-100 text-sm sm:text-base max-w-lg mx-auto mb-6">
            Click below to specify the number of guests, dietary preferences, and download your customized VIP Party Pass!
          </p>

          <button
            onClick={() => setIsRsvpModalOpen(true)}
            className="inline-flex items-center space-x-3 bg-white hover:bg-yellow-300 text-slate-900 font-black px-8 py-4 rounded-2xl shadow-xl transition transform hover:scale-105 active:scale-95 text-base"
          >
            <Ticket className="w-5 h-5 text-pink-600" />
            <span>Open RSVP Confirmation Form</span>
          </button>
        </section>
      </div>

      {/* RSVP Modal */}
      <RsvpModal
        isOpen={isRsvpModalOpen}
        onClose={() => setIsRsvpModalOpen(false)}
      />
    </main>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Check, User, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

interface GardenSeatSelectorProps {
  onSeatSelect: (seatId: string, seatLabel: string) => void;
  selectedSeatId: string;
}

interface TableDefinition {
  id: string;
  name: string;
  color: string;
  seats: string[];
}

export default function GardenSeatSelector({ onSeatSelect, selectedSeatId }: GardenSeatSelectorProps) {
  const [reservedSeats, setReservedSeats] = useState<string[]>(["T1-S2", "T2-S4", "T4-S1"]);
  const [loading, setLoading] = useState(false);

  // Fetch taken seats from MongoDB API
  useEffect(() => {
    async function fetchSeats() {
      try {
        setLoading(true);
        const res = await fetch("/api/seats");
        if (res.ok) {
          const data = await res.json();
          if (data.reservedSeats && Array.isArray(data.reservedSeats)) {
            setReservedSeats(data.reservedSeats);
          }
        }
      } catch (err) {
        console.warn("Could not load reserved seats from DB:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSeats();
  }, []);

  const tables: TableDefinition[] = [
    { id: "T1", name: "Bluey's Family Lounge", color: "border-blue-400 bg-blue-50/70", seats: ["T1-S1", "T1-S2", "T1-S3", "T1-S4"] },
    { id: "T2", name: "Bingo's Sunshine Gazebo", color: "border-amber-400 bg-amber-50/70", seats: ["T2-S1", "T2-S2", "T2-S3", "T2-S4"] },
    { id: "T3", name: "Bandit's Garden Lawn", color: "border-emerald-400 bg-emerald-50/70", seats: ["T3-S1", "T3-S2", "T3-S3", "T3-S4"] },
    { id: "T4", name: "Chilli's Royal Patio", color: "border-purple-400 bg-purple-50/70", seats: ["T4-S1", "T4-S2", "T4-S3", "T4-S4"] },
    { id: "T5", name: "Mewar Heritage Terrace", color: "border-rose-400 bg-rose-50/70", seats: ["T5-S1", "T5-S2", "T5-S3", "T5-S4"] },
    { id: "T6", name: "Iskcon Covey View Table", color: "border-teal-400 bg-teal-50/70", seats: ["T6-S1", "T6-S2", "T6-S3", "T6-S4"] },
  ];

  return (
    <div className="w-full bg-white rounded-3xl p-4 sm:p-6 shadow-xl border-4 border-bluey-sky">
      {/* Garden Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
        <div>
          <div className="flex items-center space-x-1.5 text-bluey-primary font-bold text-xs uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Kesarinandan Parkway • Garden Layout</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800">
            Choose Your Preferred Table & Seat 🌿
          </h3>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-xs font-bold text-slate-600">
          <div className="flex items-center space-x-1">
            <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-emerald-500" />
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white" />
            <span>Your Choice</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3.5 h-3.5 rounded-full bg-slate-300" />
            <span>Reserved</span>
          </div>
        </div>
      </div>

      {/* Main Garden Visual Map */}
      <div className="relative bg-gradient-to-b from-emerald-100/60 via-green-50 to-amber-50/40 p-4 sm:p-6 rounded-2xl border-2 border-emerald-200">
        {/* Top: Grand Cake Cutting & Magic Stage */}
        <div className="bg-gradient-to-r from-bluey-primary via-indigo-600 to-bluey-primary text-white py-3 px-4 rounded-xl text-center shadow-md mb-6 max-w-md mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-yellow-300 block">
            MAIN STAGE AREA
          </span>
          <span className="text-sm font-black flex items-center justify-center space-x-1">
            <span>🎂 Sharvil&apos;s 1st Birthday Cake Cutting & Magic Show 🪄</span>
          </span>
        </div>

        {/* Central Lawn Area with Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`p-4 rounded-2xl border-2 ${table.color} shadow-sm flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-xs sm:text-sm text-slate-800">
                  {table.name}
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full font-bold text-slate-500 border border-slate-200">
                  {table.id}
                </span>
              </div>

              {/* Seats inside table */}
              <div className="grid grid-cols-4 gap-2">
                {table.seats.map((seatId, idx) => {
                  const isReserved = reservedSeats.includes(seatId);
                  const isSelected = selectedSeatId === seatId;
                  const seatNumber = idx + 1;
                  const label = `${table.name} (Seat ${seatNumber})`;

                  return (
                    <button
                      key={seatId}
                      type="button"
                      disabled={isReserved}
                      onClick={() => onSeatSelect(seatId, label)}
                      className={`relative py-3 rounded-xl font-black text-xs transition transform flex flex-col items-center justify-center ${
                        isSelected
                          ? "bg-emerald-500 text-white shadow-lg ring-4 ring-emerald-300 scale-105"
                          : isReserved
                          ? "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300"
                          : "bg-white hover:bg-emerald-50 text-slate-700 border-2 border-slate-200 hover:border-emerald-400 active:scale-95 shadow-sm"
                      }`}
                    >
                      <span>S{seatNumber}</span>
                      {isSelected ? (
                        <Check className="w-3 h-3 stroke-[3] mt-0.5" />
                      ) : (
                        <span className="text-[9px] font-normal opacity-70">
                          {isReserved ? "Taken" : "Free"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Attractions: Buffet & Photo Booth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          <div className="bg-amber-100/80 p-3 rounded-xl border border-amber-300 text-center text-xs font-bold text-amber-900 flex items-center justify-center space-x-2">
            <span>🍲 Live Buffet & Udaipur Delicacies Counters</span>
          </div>
          <div className="bg-sky-100/80 p-3 rounded-xl border border-sky-300 text-center text-xs font-bold text-sky-900 flex items-center justify-center space-x-2">
            <span>📸 Bluey & Bingo Selfie Photo Booth & Lawn</span>
          </div>
        </div>
      </div>

      {/* Selected Seat Feedback Pill */}
      {selectedSeatId && (
        <div className="mt-4 p-3 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              Selected Spot: <span className="text-emerald-700 font-black">{selectedSeatId}</span>
            </span>
          </div>
          <span className="text-xs text-emerald-600 font-extrabold uppercase tracking-wider">
            Ready to Confirm!
          </span>
        </div>
      )}
    </div>
  );
}

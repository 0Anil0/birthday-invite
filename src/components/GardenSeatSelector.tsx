"use client";

import React, { useState, useEffect } from "react";
import { Check, Sparkles, Music, Disc, Wine, Cake, Crown, ZoomIn, ZoomOut, RotateCcw, LayoutGrid, Map } from "lucide-react";

interface GardenSeatSelectorProps {
  onSeatSelect: (seatId: string, seatLabel: string) => void;
  selectedSeatId: string;
}

interface TableData {
  id: number;
  name: string;
  chairBg: string;
  chairText: string;
  seatsCount: number;
}

export default function GardenSeatSelector({ onSeatSelect, selectedSeatId }: GardenSeatSelectorProps) {
  const [reservedSeats, setReservedSeats] = useState<string[]>([
    "T1-S2", "T1-S5", "T2-S3", "T3-S1", "T4-S4", "T5-S8", "T7-S2", "HT-S3", "HT-S7"
  ]);
  const [viewMode, setViewMode] = useState<"floorplan" | "tablelist">("floorplan");
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Fetch live reserved seats from MongoDB
  useEffect(() => {
    async function fetchSeats() {
      try {
        const res = await fetch("/api/seats");
        if (res.ok) {
          const data = await res.json();
          if (data.reservedSeats && Array.isArray(data.reservedSeats)) {
            setReservedSeats(data.reservedSeats);
          }
        }
      } catch (err) {
        console.warn("Using offline floor plan state:", err);
      }
    }
    fetchSeats();
  }, []);

  // 16 Round Dining Tables matching the floor plan layout color coding
  const tableDefinitions: Record<number, TableData> = {
    // Row 1
    1: { id: 1, name: "Table 1", chairBg: "bg-[#E53E65]", chairText: "text-white", seatsCount: 10 },
    2: { id: 2, name: "Table 2", chairBg: "bg-[#E53E65]", chairText: "text-white", seatsCount: 10 },
    3: { id: 3, name: "Table 3", chairBg: "bg-[#2563EB]", chairText: "text-white", seatsCount: 10 },
    4: { id: 4, name: "Table 4", chairBg: "bg-[#2563EB]", chairText: "text-white", seatsCount: 10 },

    // Row 2
    5: { id: 5, name: "Table 5", chairBg: "bg-[#2563EB]", chairText: "text-white", seatsCount: 10 },
    6: { id: 6, name: "Table 6", chairBg: "bg-[#E58A1F]", chairText: "text-white", seatsCount: 10 },
    7: { id: 7, name: "Table 7", chairBg: "bg-[#D97706]", chairText: "text-white", seatsCount: 10 },
    8: { id: 8, name: "Table 8", chairBg: "bg-[#5B21B6]", chairText: "text-white", seatsCount: 10 },

    // Row 3
    9: { id: 9, name: "Table 9", chairBg: "bg-[#059669]", chairText: "text-white", seatsCount: 10 },
    10: { id: 10, name: "Table 10", chairBg: "bg-[#059669]", chairText: "text-white", seatsCount: 10 },
    11: { id: 11, name: "Table 11", chairBg: "bg-[#7C3AED]", chairText: "text-white", seatsCount: 10 },
    12: { id: 12, name: "Table 12", chairBg: "bg-[#7C3AED]", chairText: "text-white", seatsCount: 10 },

    // Row 4
    13: { id: 13, name: "Table 13", chairBg: "bg-[#E8D7BE]", chairText: "text-slate-800", seatsCount: 10 },
    14: { id: 14, name: "Table 14", chairBg: "bg-[#E8D7BE]", chairText: "text-slate-800", seatsCount: 10 },
    15: { id: 15, name: "Table 15", chairBg: "bg-[#E8D7BE]", chairText: "text-slate-800", seatsCount: 10 },
    16: { id: 16, name: "Table 16", chairBg: "bg-[#E8D7BE]", chairText: "text-slate-800", seatsCount: 10 },
  };

  const headTableSeats = Array.from({ length: 12 }, (_, i) => `HT-S${i + 1}`);

  // Render a single round table with 10 circular chairs
  const renderSingleTable = (tableId: number) => {
    const table = tableDefinitions[tableId];
    if (!table) return null;

    const seats = Array.from({ length: table.seatsCount }, (_, i) => `T${table.id}-S${i + 1}`);
    const reservedCount = seats.filter((s) => reservedSeats.includes(s)).length;

    return (
      <div key={table.id} className="flex flex-col items-center justify-center p-1 select-none">
        {/* Table Canvas with fixed 156px dimension so chairs never collide with neighbors */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
          {/* Central Circular Table */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white border-2 border-[#E7DFD5] shadow-sm flex flex-col items-center justify-center z-10 p-1">
            <span className="text-base sm:text-lg">🌸</span>
          </div>

          {/* 10 Chairs spaced cleanly with radius = 50px */}
          {seats.map((seatId, idx) => {
            const angle = (idx * (360 / table.seatsCount) - 90) * (Math.PI / 180);
            const radius = 50; // px
            const x = Math.round(radius * Math.cos(angle));
            const y = Math.round(radius * Math.sin(angle));

            const isReserved = reservedSeats.includes(seatId);
            const isSelected = selectedSeatId === seatId;
            const seatNum = idx + 1;
            const label = `${table.name} (Seat ${seatNum})`;

            return (
              <button
                key={seatId}
                type="button"
                disabled={isReserved}
                onClick={() => onSeatSelect(seatId, label)}
                title={`${label} • ${isReserved ? "Reserved" : "Available"}`}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className={`absolute w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[10px] font-black flex items-center justify-center transition-all duration-150 shadow-sm border border-white ${
                  isSelected
                    ? "bg-emerald-500 text-white ring-4 ring-emerald-300 scale-125 z-30"
                    : isReserved
                    ? "bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed z-0 opacity-70"
                    : `${table.chairBg} ${table.chairText} hover:scale-120 active:scale-95 z-20 cursor-pointer`
                }`}
              >
                {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : seatNum}
              </button>
            );
          })}
        </div>

        {/* Clean labels below table */}
        <div className="text-center mt-1">
          <span className="block text-xs font-black text-slate-800 leading-tight">
            {table.name}
          </span>
          <span className="text-[10px] font-semibold text-slate-400">
            {10 - reservedCount}/10 free
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-3xl p-3 sm:p-6 lg:p-8 shadow-xl border border-slate-200">
      {/* Top Header & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-bluey-primary font-black text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Floor Plan Layout</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-slate-900">
            Select Your Dining Seat 🍽️
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Arranged around the central Dance Floor, DJ Console, and Cake Table at Kesarinandan Parkway.
          </p>
        </div>

        {/* View Switcher: Architectural Map vs Simple Cards */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-2xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("floorplan")}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition ${
              viewMode === "floorplan"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Map className="w-3.5 h-3.5 text-bluey-primary" />
            <span>Floor Plan Map</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("tablelist")}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition ${
              viewMode === "tablelist"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-bluey-primary" />
            <span>Table Cards View</span>
          </button>
        </div>
      </div>

      {/* Selected Seat Banner */}
      {selectedSeatId && (
        <div className="mb-4 p-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-white text-emerald-600 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-100 block">Selected Spot</span>
              <span className="text-sm font-black">{selectedSeatId}</span>
            </div>
          </div>
          <span className="bg-yellow-400 text-slate-900 text-xs font-black px-3.5 py-1.5 rounded-xl shadow">
            Ready to Confirm ✓
          </span>
        </div>
      )}

      {/* Legend & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 bg-[#FBF9F5] p-3 rounded-2xl border border-[#EDE7DD] text-xs font-bold text-slate-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <div className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-bold">1</div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] flex items-center justify-center font-bold">✓</div>
            <span className="text-emerald-700 font-extrabold">Your Seat</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-400 text-[9px] flex items-center justify-center">✕</div>
            <span>Reserved</span>
          </div>
        </div>
        <span className="text-[11px] text-slate-400 font-semibold">172 Total Seats • 17 Tables</span>
      </div>

      {/* VIEW 1: OPEN ARCHITECTURAL 5-COLUMN FLOOR PLAN (Full Width) */}
      {viewMode === "floorplan" && (
        <div className="relative w-full bg-[#FBF9F5] p-3 sm:p-6 lg:p-8 rounded-3xl border border-[#EDE7DD] shadow-inner overflow-hidden">
          {/* Zoom Toolbar */}
          <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
            <span className="font-semibold flex items-center space-x-1">
              <span>💡 Tap any circular chair to select</span>
            </span>

            <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(65, z - 10))}
                className="p-1 hover:bg-slate-100 rounded text-slate-700"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-extrabold text-[10px] w-9 text-center">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                className="p-1 hover:bg-slate-100 rounded text-slate-700"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(100)}
                className="p-1 hover:bg-slate-100 rounded text-slate-700"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Full Width Scrollable Floor Plan Canvas */}
          <div className="overflow-x-auto pb-6 scrollbar-thin w-full">
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: "top center",
                backgroundImage: "radial-gradient(#E5DFD5 1.2px, transparent 1.2px)",
                backgroundSize: "28px 28px",
              }}
              className="min-w-[980px] w-full p-4 rounded-3xl transition-transform duration-150 flex flex-col items-center"
            >
              {/* 5-COLUMN SEATING MATRIX MATCHING USER REFERENCE IMAGE */}
              <div className="grid grid-cols-5 gap-x-6 gap-y-8 w-full items-center justify-items-center">
                
                {/* ROW 1 */}
                <div>{renderSingleTable(1)}</div>
                <div>{renderSingleTable(2)}</div>
                
                {/* ROW 1 CENTER: HEAD TABLE + CAKE TABLE */}
                <div className="flex flex-col items-center justify-center text-center w-full">
                  <div className="flex items-center space-x-2 px-4 py-1 bg-white border border-[#E7DFD5] rounded-full shadow-sm mb-2">
                    <span className="text-xs">🌸</span>
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider">
                      Head Table
                    </span>
                    <span className="text-xs">🌸</span>
                  </div>

                  <div className="bg-white px-3 py-2 rounded-full border-2 border-pink-300 shadow-sm flex items-center justify-center space-x-1 mb-2">
                    <Crown className="w-3.5 h-3.5 text-amber-500 mr-1 flex-shrink-0" />
                    {headTableSeats.map((seatId, i) => {
                      const isReserved = reservedSeats.includes(seatId);
                      const isSelected = selectedSeatId === seatId;
                      const seatNum = i + 1;
                      return (
                        <button
                          key={seatId}
                          type="button"
                          disabled={isReserved}
                          onClick={() => onSeatSelect(seatId, `Head Table (Seat ${seatNum})`)}
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full text-[9px] font-black transition flex items-center justify-center border shadow-sm ${
                            isSelected
                              ? "bg-emerald-500 text-white ring-2 ring-emerald-300 scale-110"
                              : isReserved
                              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                              : "bg-[#E53E65] text-white hover:scale-115 active:scale-95 cursor-pointer"
                          }`}
                        >
                          {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : seatNum}
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-white border border-[#E7DFD5] px-4 py-1.5 rounded-xl shadow-sm flex items-center space-x-2">
                    <span className="text-base">🎂</span>
                    <span className="text-[10px] font-black text-slate-800">1st Birthday Cake Table</span>
                  </div>
                </div>

                <div>{renderSingleTable(3)}</div>
                <div>{renderSingleTable(4)}</div>

                {/* ROW 2 */}
                <div>{renderSingleTable(5)}</div>
                <div>{renderSingleTable(6)}</div>

                {/* ROW 2 CENTER: DANCE FLOOR */}
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="w-48 h-48 rounded-3xl bg-[#EFE6D8] border-2 border-[#D8C7B2] shadow-md flex flex-col items-center justify-center p-3 text-center relative overflow-hidden select-none">
                    <div
                      className="absolute inset-0 opacity-25"
                      style={{
                        backgroundImage: "linear-gradient(45deg, #CBBBA4 25%, transparent 25%), linear-gradient(-45deg, #CBBBA4 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #CBBBA4 75%), linear-gradient(-45deg, transparent 75%, #CBBBA4 75%)",
                        backgroundSize: "24px 24px",
                        backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0px"
                      }}
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm mb-2">
                        <Music className="w-5 h-5 text-amber-800" />
                      </div>
                      <span className="text-xs font-black text-amber-950 uppercase tracking-widest">
                        Dance Floor
                      </span>
                      <span className="text-[10px] font-semibold text-amber-800/80 mt-0.5">
                        Bluey Beats & Family Fun
                      </span>
                    </div>
                  </div>
                </div>

                <div>{renderSingleTable(7)}</div>
                <div>{renderSingleTable(8)}</div>

                {/* ROW 3 */}
                <div>{renderSingleTable(9)}</div>
                <div>{renderSingleTable(10)}</div>

                {/* ROW 3 CENTER: DJ CONSOLE */}
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="w-44 py-3 px-4 rounded-2xl bg-slate-900 text-white shadow-lg flex items-center justify-center space-x-3 border border-slate-700">
                    <Disc className="w-6 h-6 text-yellow-400 animate-spin" style={{ animationDuration: "5s" }} />
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-widest text-yellow-400 font-black block">LIVE SOUND</span>
                      <span className="text-xs font-black">DJ Console</span>
                    </div>
                  </div>
                </div>

                <div>{renderSingleTable(11)}</div>
                <div>{renderSingleTable(12)}</div>

                {/* ROW 4 */}
                <div>{renderSingleTable(13)}</div>
                <div>{renderSingleTable(14)}</div>

                {/* ROW 4 CENTER: REFRESHMENTS BAR */}
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="w-44 py-3 px-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-sm flex items-center justify-center space-x-2.5 text-slate-800">
                    <Wine className="w-5 h-5 text-amber-600" />
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-amber-600 block">REFRESHMENTS</span>
                      <span className="text-xs font-black">Mocktails & Juices</span>
                    </div>
                  </div>
                </div>

                <div>{renderSingleTable(15)}</div>
                <div>{renderSingleTable(16)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CLEAN TABLE LIST CARDS (For mobile touch efficiency) */}
      {viewMode === "tablelist" && (
        <div className="space-y-4 animate-fadeIn">
          {/* Head Table Card */}
          <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <span className="font-black text-slate-800 text-sm">Head Table (VIP Family)</span>
              </div>
              <span className="text-xs font-bold text-pink-700 bg-pink-200/50 px-2.5 py-0.5 rounded-full">
                12 Seats
              </span>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
              {headTableSeats.map((seatId, i) => {
                const isReserved = reservedSeats.includes(seatId);
                const isSelected = selectedSeatId === seatId;
                const seatNum = i + 1;
                return (
                  <button
                    key={seatId}
                    type="button"
                    disabled={isReserved}
                    onClick={() => onSeatSelect(seatId, `Head Table (Seat ${seatNum})`)}
                    className={`py-2 rounded-xl text-xs font-black transition flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-emerald-500 text-white ring-4 ring-emerald-300"
                        : isReserved
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-white hover:bg-pink-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    <span>H{seatNum}</span>
                    <span className="text-[9px] opacity-70">{isReserved ? "Taken" : "Free"}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 16 Dining Tables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((tableId) => {
              const table = tableDefinitions[tableId];
              const seats = Array.from({ length: 10 }, (_, i) => `T${tableId}-S${i + 1}`);
              return (
                <div key={tableId} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-black text-slate-800 text-sm">{table.name}</span>
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      10 Seats
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5">
                    {seats.map((seatId, i) => {
                      const isReserved = reservedSeats.includes(seatId);
                      const isSelected = selectedSeatId === seatId;
                      const seatNum = i + 1;
                      const label = `${table.name} (Seat ${seatNum})`;

                      return (
                        <button
                          key={seatId}
                          type="button"
                          disabled={isReserved}
                          onClick={() => onSeatSelect(seatId, label)}
                          className={`py-2 px-1 rounded-xl text-xs font-black transition flex flex-col items-center justify-center ${
                            isSelected
                              ? "bg-emerald-500 text-white ring-2 ring-emerald-300"
                              : isReserved
                              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                              : "bg-slate-50 hover:bg-blue-50 text-slate-700 border border-slate-200"
                          }`}
                        >
                          <span>S{seatNum}</span>
                          <span className="text-[8px] font-normal opacity-70">
                            {isReserved ? "Taken" : "Free"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

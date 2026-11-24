"use client";

import React from "react";
import { Calendar, Download, ExternalLink, MapPin } from "lucide-react";
import { EVENT_DETAILS } from "@/types";

export default function AddCalendarButton() {
  const title = encodeURIComponent(`${EVENT_DETAILS.childName} (${EVENT_DETAILS.nickname})'s 1st Birthday Celebration 🐾🎂`);
  const details = encodeURIComponent(
    `Join us to celebrate ${EVENT_DETAILS.childName} (${EVENT_DETAILS.nickname}) turning 1 year old! Bluey Theme Birthday Celebration.\nVoiceover: "${EVENT_DETAILS.hindiVoiceover}"\nVenue: ${EVENT_DETAILS.venueName}, Udaipur.\nMaps: ${EVENT_DETAILS.locationUrl}`
  );
  const location = encodeURIComponent(`${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.address}`);

  // November 29, 2026: 5:30 PM IST (12:00 UTC) to 10:00 PM IST (16:30 UTC)
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261129T120000Z/20261129T163000Z&details=${details}&location=${location}`;

  // Generate .ICS file for Apple Calendar & Outlook
  const handleDownloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Sharvil Shivi 1st Birthday//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${EVENT_DETAILS.childName}'s 1st Birthday Celebration`,
      `DESCRIPTION:${EVENT_DETAILS.hindiVoiceover} - Theme: Bluey`,
      `LOCATION:${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.address}`,
      "DTSTART:20261129T120000Z",
      "DTEND:20261129T163000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `Sharvil_1st_Birthday.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <a
        href={googleCalendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-lg shadow-blue-500/25 transition transform active:scale-95"
      >
        <Calendar className="w-4 h-4" />
        <span>Add to Google Calendar</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
      </a>

      <button
        onClick={handleDownloadIcs}
        className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-sm border-2 border-slate-200 shadow-sm transition active:scale-95"
      >
        <Download className="w-4 h-4 text-bluey-primary" />
        <span>Apple / Outlook (.ics)</span>
      </button>
    </div>
  );
}

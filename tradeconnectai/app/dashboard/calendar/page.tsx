"use client";

import { useState } from "react";

export default function CalendarPage() {
  const [selected, setSelected] = useState(null);

  const bookings = [
    { date: "2026-05-10", job: "Boiler Repair - John Smith" },
    { date: "2026-05-11", job: "Fuse Box Upgrade - Sarah Jones" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Booking Calendar</h1>

      <div className="grid grid-cols-7 gap-3 text-center">
        {Array.from({ length: 30 }).map((_, i) => {
          const day = i + 1;
          const date = `2026-05-${String(day).padStart(2, "0")}`;
          const booking = bookings.find((b) => b.date === date);

          return (
            <div
              key={day}
              onClick={() => setSelected(booking)}
              className="border border-slate-800 bg-slate-900 p-4 rounded-lg cursor-pointer hover:border-blue-500"
            >
              <p className="font-semibold">{day}</p>
              {booking && <p className="text-xs text-blue-400 mt-1">Booked</p>}
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="mt-6 p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <h2 className="text-xl font-bold mb-2">Booking Details</h2>
          <p className="text-slate-300">{selected.job}</p>
        </div>
      )}
    </div>
  );
}

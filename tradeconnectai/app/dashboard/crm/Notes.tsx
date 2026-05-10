// app/dashboard/crm/Notes.tsx
"use client";

import { useState } from "react";

export default function Notes({ contact }) {
  const [notes, setNotes] = useState([
    "Customer prefers morning appointments.",
    "Quoted £450 for boiler repair.",
  ]);

  const [input, setInput] = useState("");

  const addNote = () => {
    if (!input.trim()) return;
    setNotes([...notes, input]);
    setInput("");
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Notes</h3>

      <div className="space-y-2 mb-4">
        {notes.map((n, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-sm">
            {n}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add note..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
        />
        <button
          onClick={addNote}
          className="bg-blue-600 px-4 py-2 rounded-lg text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
}

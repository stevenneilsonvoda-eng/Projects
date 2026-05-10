// app/dashboard/crm/Pipelines.tsx
"use client";

import { useState } from "react";

export default function Pipelines({ contact }) {
  const [stages, setStages] = useState({
    new: ["Requested quote"],
    scheduled: ["Site visit booked"],
    won: ["Job completed"],
  });

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Pipeline</h3>

      <div className="grid grid-cols-3 gap-4">
        {Object.entries(stages).map(([stage, items]) => (
          <div key={stage} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <h4 className="font-semibold capitalize mb-3">{stage}</h4>

            <div className="space-y-2">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

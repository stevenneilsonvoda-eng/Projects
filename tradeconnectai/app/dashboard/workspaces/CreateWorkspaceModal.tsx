"use client";

import { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";

export default function CreateWorkspaceModal({ open, onClose }) {
  const { addWorkspace } = useWorkspace();
  const [name, setName] = useState("");

  if (!open) return null;

  const create = () => {
    if (!name.trim()) return;
    addWorkspace(name);
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">Create Workspace</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Workspace name"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-slate-400">Cancel</button>
          <button onClick={create} className="bg-blue-600 px-4 py-2 rounded-lg">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

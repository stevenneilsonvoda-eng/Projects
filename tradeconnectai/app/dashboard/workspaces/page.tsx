"use client";

import { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import CreateWorkspaceModal from "./CreateWorkspaceModal";

export default function WorkspacesPage() {
  const { workspaces } = useWorkspace();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Workspaces</h1>

      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 px-4 py-2 rounded-lg mb-6"
      >
        + Create Workspace
      </button>

      <div className="grid grid-cols-3 gap-6">
        {workspaces.map((ws) => (
          <div
            key={ws.id}
            className="bg-slate-900 border border-slate-800 p-6 rounded-xl"
          >
            <h2 className="text-xl font-semibold">{ws.name}</h2>
            <p className="text-slate-400 text-sm mt-2">Workspace ID: {ws.id}</p>
          </div>
        ))}
      </div>

      <CreateWorkspaceModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

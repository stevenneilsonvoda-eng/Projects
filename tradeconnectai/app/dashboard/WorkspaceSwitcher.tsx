"use client";

import React from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { ChevronDown } from "lucide-react";

export default function WorkspaceSwitcher() {
  const { workspace, setWorkspace } = useWorkspace();

  const workspaces = [
    { id: "default", name: "Default Workspace" },
    { id: "sales", name: "Sales" },
    { id: "marketing", name: "Marketing" },
    { id: "operations", name: "Operations" },
  ];

  const current = workspaces.find((w) => w.id === workspace) || workspaces[0];

  const cycleWorkspace = () => {
    const order = ["default", "sales", "marketing", "operations"];
    const index = order.indexOf(workspace || "default");
    const next = order[(index + 1) % order.length];
    setWorkspace(next);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex items-center gap-2 px-3 py-2 bg-slate-800 text-slate-200 rounded-md hover:bg-slate-700 transition-colors"
        onClick={cycleWorkspace}
      >
        <span>{current.name}</span>
        <ChevronDown size={16} />
      </button>
    </div>
  );
}

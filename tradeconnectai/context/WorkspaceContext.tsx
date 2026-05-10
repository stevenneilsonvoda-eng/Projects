"use client";

import React, { createContext, useContext, useState } from "react";

export interface Workspace {
  id: string;
  name: string;
}

export interface WorkspaceContextType {
  workspace: string;
  setWorkspace: (value: string) => void;
  workspaces: Workspace[];
  addWorkspace: (name: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [workspace, setWorkspace] = useState<string>("default");

  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: "default", name: "Default Workspace" },
    { id: "sales", name: "Sales" },
    { id: "marketing", name: "Marketing" },
    { id: "operations", name: "Operations" }
  ]);

  const addWorkspace = (name: string) => {
    const id = name.toLowerCase().replace(/\s+/g, "-");
    if (!workspaces.some((ws) => ws.id === id)) {
      setWorkspaces((prev) => [...prev, { id, name }]);
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspace,
        setWorkspace,
        workspaces,
        addWorkspace
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};


"use client";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";
import { nodeTypes } from "./NodeTypes";

export default function AutomationsCanvas() {
  return (
    <div className="flex h-full">
      <Sidebar />

      <div className="flex-1 h-full">
        <ReactFlow nodeTypes={nodeTypes}>
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}

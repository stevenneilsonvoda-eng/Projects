"use client";

import { Handle, Position } from "reactflow";

export const nodeTypes = {
  basicNode: BasicNode,
};

function BasicNode({ data }: any) {
  return (
    <div className="p-3 bg-white border rounded shadow">
      <Handle type="target" position={Position.Top} />
      <div>{data?.label || "Node"}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

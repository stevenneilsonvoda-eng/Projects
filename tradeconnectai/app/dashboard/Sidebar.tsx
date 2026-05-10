// app/dashboard/automations/Sidebar.tsx
export default function Sidebar({ addNode }) {
  const items = [
    { label: "Trigger: New Lead", description: "Starts when a new lead arrives" },
    { label: "Action: Send Email", description: "Send an automated email" },
    { label: "Action: Tag Contact", description: "Add a tag to the contact" },
    { label: "Delay", description: "Wait before next step" },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Nodes</h2>

      {items.map((item, i) => (
        <div
          key={i}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("application/reactflow", JSON.stringify(item));
            e.dataTransfer.effectAllowed = "move";
          }}
          className="bg-slate-800 border border-slate-700 p-3 rounded-lg cursor-grab hover:border-blue-500"
        >
          <p className="font-semibold">{item.label}</p>
          <p className="text-slate-400 text-sm">{item.description}</p>
        </div>
      ))}
    </aside>
  );
}

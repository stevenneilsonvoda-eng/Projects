export default function LeadsPage() {
  const leads = [
    { id: 1, name: "John Smith", message: "Need a quote for boiler repair", date: "Today" },
    { id: 2, name: "Sarah Jones", message: "Looking for a roofer", date: "Yesterday" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Leads</h1>

      <div className="space-y-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="border border-slate-800 bg-slate-900 p-4 rounded-xl"
          >
            <p className="font-semibold">{lead.name}</p>
            <p className="text-slate-400">{lead.message}</p>
            <p className="text-xs text-slate-500 mt-1">{lead.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

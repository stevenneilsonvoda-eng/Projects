// app/dashboard/crm/ContactsList.tsx
export default function ContactsList({ onSelect }) {
  const contacts = [
    { id: 1, name: "John Smith", email: "john@example.com", phone: "07700 900123" },
    { id: 2, name: "Sarah Jones", email: "sarah@example.com", phone: "07700 900456" },
    { id: 3, name: "Mike Roofing", email: "mike@roofing.com", phone: "07700 900789" },
  ];

  return (
    <div className="space-y-3">
      {contacts.map((c) => (
        <div
          key={c.id}
          onClick={() => onSelect(c)}
          className="p-3 bg-slate-900 border border-slate-800 rounded-lg cursor-pointer hover:border-blue-500"
        >
          <p className="font-semibold">{c.name}</p>
          <p className="text-slate-400 text-sm">{c.email}</p>
        </div>
      ))}
    </div>
  );
}

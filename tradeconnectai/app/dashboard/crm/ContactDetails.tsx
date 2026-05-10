// app/dashboard/crm/ContactDetails.tsx
import Pipelines from "./Pipelines";
import Notes from "./Notes";

export default function ContactDetails({ contact }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-2">{contact.name}</h2>
      <p className="text-slate-400">{contact.email}</p>
      <p className="text-slate-400 mb-6">{contact.phone}</p>

      <div className="grid grid-cols-2 gap-6">
        <Pipelines contact={contact} />
        <Notes contact={contact} />
      </div>
    </div>
  );
}

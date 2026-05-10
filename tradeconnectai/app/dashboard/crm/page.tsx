// app/dashboard/crm/page.tsx
"use client";

import { useState } from "react";
import ContactsList from "./ContactsList";
import ContactDetails from "./ContactDetails";
import Pipelines from "./Pipelines";
import Notes from "./Notes";
import AddContactModal from "./AddContactModal";

export default function CRMPage() {
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="flex gap-6">
      <div className="w-72">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-blue-600 px-3 py-1 rounded-lg text-sm"
          >
            + Add
          </button>
        </div>

        <ContactsList onSelect={setSelected} />
      </div>

      <div className="flex-1">
        {selected ? (
          <ContactDetails contact={selected} />
        ) : (
          <div className="text-slate-400">Select a contact to view details</div>
        )}
      </div>

      <AddContactModal open={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );
}

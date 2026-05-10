// app/dashboard/crm/AddContactModal.tsx
"use client";

export default function AddContactModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">Add Contact</h2>

        <input
          placeholder="Name"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 mb-3"
        />
        <input
          placeholder="Email"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 mb-3"
        />
        <input
          placeholder="Phone"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-slate-400">Cancel</button>
          <button className="bg-blue-600 px-4 py-2 rounded-lg">Save</button>
        </div>
      </div>
    </div>
  );
}

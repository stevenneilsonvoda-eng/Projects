export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="mt-6 space-y-4">
        <Setting label="Business Name" />
        <Setting label="Phone Number" />
        <Setting label="Notification Email" />
      </div>
    </div>
  );
}

function Setting({ label }) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold">{label}</label>
      <input className="border p-2 rounded mt-1" />
    </div>
  );
}
export const metadata = {
  title: "Settings — TradeConnectAI",
  description: "Configure your preferences, notifications, and integrations.",
};

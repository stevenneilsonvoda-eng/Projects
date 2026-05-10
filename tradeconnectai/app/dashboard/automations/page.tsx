// app/dashboard/automations/page.tsx
import AutomationsCanvas from "./AutomationsCanvas";

export default function AutomationsPage() {
  return (
    <div className="h-full">
      <h1 className="text-3xl font-bold mb-6">Automations Builder</h1>
      <AutomationsCanvas />
    </div>
  );
}

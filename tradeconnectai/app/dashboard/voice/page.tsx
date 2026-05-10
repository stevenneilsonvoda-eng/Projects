// app/dashboard/voice/page.tsx
import VoiceClient from "./VoiceClient";

export default function VoiceDemoPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">AI Voice Call Demo</h1>
      <p className="text-slate-400 mb-6">
        Speak to the AI assistant in real time. This demo uses your microphone and streams audio to the AI model.
      </p>

      <VoiceClient />
    </div>
  );
}

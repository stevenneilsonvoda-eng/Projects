"use client";

import React, { useState } from "react";

type Role = "user" | "assistant";

type Msg = {
  role: Role;
  content: string;
};

export default function DemoChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Welcome — how can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Ensure role is a literal of type Role
    const newMessage: Msg = { role: "user", content: input };

    // Use functional update to avoid stale state and keep types clear
    setMessages((prev) => [...prev, newMessage]);

    setInput("");
    setLoading(true);

    try {
      // Example: call your API and append assistant reply
      const assistantReply = await fakeApiReply(input);
      setMessages((prev) => [...prev, { role: "assistant", content: assistantReply }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div>{m.content}</div>
          </div>
        ))}
      </div>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

/** Replace with your real API call */
async function fakeApiReply(input: string) {
  await new Promise((r) => setTimeout(r, 400));
  return `Echo: ${input}`;
}

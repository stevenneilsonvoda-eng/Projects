"use client";

import React, { useState } from "react";

type Role = "user" | "assistant";

type Message = {
  role: Role;
  content: string;
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello — how can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const userMessage: Message = { role: "user", content: input };

    // Add user message safely
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      // Replace with your real API call
      const aiReply = await fakeApiReply(input);

      const assistantMessage: Message = { role: "assistant", content: aiReply };

      // Append assistant reply safely
      setMessages((prev) => [...prev, assistantMessage]);
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
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}

/** Temporary fake API for local testing */
async function fakeApiReply(input: string) {
  await new Promise((r) => setTimeout(r, 400));
  return `Echo: ${input}`;
}

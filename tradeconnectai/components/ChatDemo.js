"use client";

import { useState } from "react";

export default function ChatDemo() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I’m your AI Lead Assistant. Tell me about the job." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hero-panel glass">
      <div className="panel-header">
        <span>AI Lead Assistant</span>
        <span className="status-dot"></span>
      </div>

      <div className="chat-window">
        <div className="chat-log">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-bubble ${m.role === "assistant" ? "outbound" : "inbound"}`}
            >
              {m.content}
            </div>
          ))}
          {loading && <div className="chat-bubble outbound">Thinking…</div>}
        </div>

        <form className="chat-input-row" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Describe a job (e.g. boiler broken in Caerphilly)…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn primary" type="submit" disabled={loading}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

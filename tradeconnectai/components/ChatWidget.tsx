"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const aiMessage = { sender: "ai", text: data.reply };

    setMessages((prev) => [...prev, aiMessage]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg"
      >
        Chat
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl border rounded-xl p-4 flex flex-col">
          <div className="h-64 overflow-y-auto mb-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 my-1 rounded ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 border p-2 rounded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// app/dashboard/voice/VoiceClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import "./VoiceStyles.css";

export default function VoiceClient() {
  const wsRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [listening, setListening] = useState(false);

  const audioContextRef = useRef(null);
  const processorRef = useRef(null);
  const inputRef = useRef(null);

  const startCall = async () => {
    wsRef.current = new WebSocket("wss://your-server.com/api/voice");

    wsRef.current.onopen = () => {
      setConnected(true);
      startMic();
    };

    wsRef.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      setTranscript((prev) => [...prev, data.text]);
    };
  };

  const stopCall = () => {
    setListening(false);
    setConnected(false);

    if (processorRef.current) processorRef.current.disconnect();
    if (inputRef.current) inputRef.current.disconnect();
    if (audioContextRef.current) audioContextRef.current.close();

    if (wsRef.current) wsRef.current.close();
  };

  const startMic = async () => {
    setListening(true);

    audioContextRef.current = new AudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    inputRef.current = audioContextRef.current.createMediaStreamSource(stream);

    processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
    processorRef.current.onaudioprocess = (e) => {
      if (!connected) return;

      const input = e.inputBuffer.getChannelData(0);
      const pcm = new Int16Array(input.length);

      for (let i = 0; i < input.length; i++) {
        pcm[i] = input[i] * 32767;
      }

      wsRef.current.send(pcm);
    };

    inputRef.current.connect(processorRef.current);
    processorRef.current.connect(audioContextRef.current.destination);
  };

  return (
    <div className="voice-container">
      <div className="voice-controls">
        {!connected ? (
          <button className="voice-btn" onClick={startCall}>
            Start AI Voice Call
          </button>
        ) : (
          <button className="voice-btn stop" onClick={stopCall}>
            End Call
          </button>
        )}
      </div>

      <div className="voice-transcript">
        <h2 className="text-xl font-semibold mb-3">Live Transcript</h2>

        <div className="transcript-box">
          {transcript.map((line, i) => (
            <p key={i} className="text-slate-300">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

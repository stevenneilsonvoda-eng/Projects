"use client";

import ChatDemo from "./ChatDemo";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Turn Every Enquiry Into a Booked Job Automatically</h1>
        <p className="hero-sub">
          AI-powered lead handling, booking, and customer management for UK trades.
        </p>

        <div className="hero-cta">
          <button className="btn primary">Start Free Trial</button>
          <button className="btn secondary">See Demo</button>
        </div>

        <p className="hero-note">
          Most trades lose enquiries because they’re on the tools, not on the phone.
        </p>

        <div className="social-proof">
          Built for plumbers, electricians, builders & local service businesses across the UK.
        </div>
      </div>

      <ChatDemo />
    </section>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <h2>How it works</h2>
      <p className="section-sub">
        Set it up once, then let the system handle enquiries 24/7.
      </p>
      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Customer sends enquiry</h3>
          <p>Via your website, SMS, WhatsApp or missed call.</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <h3>AI qualifies the job</h3>
          <p>Asks about job type, location, urgency and filters time-wasters.</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <h3>Job is booked automatically</h3>
          <p>AI suggests slots, books into your calendar and confirms with the customer.</p>
        </div>
        <div className="step">
          <div className="step-number">4</div>
          <h3>You get a confirmed booking</h3>
          <p>You receive the job details and turn up to do the work – that’s it.</p>
        </div>
      </div>
    </section>
  );
}

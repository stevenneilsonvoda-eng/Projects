export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <h2>Simple pricing that grows with your business</h2>
      <p className="section-sub">
        Start small, scale to full automation as your enquiries grow.
      </p>
      <div className="grid pricing-grid">
        <div className="card glass pricing-card">
          <h3>Starter</h3>
          <p className="price">£19<span>/month</span></p>
          <p className="plan-tag">For trades just getting started with AI.</p>
          <ul>
            <li>AI chat assistant</li>
            <li>Basic CRM</li>
            <li>Manual job booking</li>
          </ul>
          <button className="btn secondary full">Choose Starter</button>
        </div>

        <div className="card glass pricing-card featured">
          <div className="badge">Most popular</div>
          <h3>Pro</h3>
          <p className="price">£49<span>/month</span></p>
          <p className="plan-tag">Ideal for solo trades with 20–100 enquiries/month.</p>
          <ul>
            <li>AI lead qualification</li>
            <li>Smart booking system</li>
            <li>SMS notifications</li>
            <li>Lead tracking dashboard</li>
          </ul>
          <button className="btn primary full">Choose Pro</button>
        </div>

        <div className="card glass pricing-card">
          <h3>Premium</h3>
          <p className="price">£99<span>/month</span></p>
          <p className="plan-tag">For busy teams who want the phone handled 24/7.</p>
          <ul>
            <li>AI call answering</li>
            <li>Full end-to-end automation</li>
            <li>Priority lead routing</li>
            <li>Multi-worker support</li>
          </ul>
          <button className="btn secondary full">Choose Premium</button>
        </div>

        <div className="card glass pricing-card">
          <h3>Agency</h3>
          <p className="price">£199<span>/month</span></p>
          <p className="plan-tag">For agencies managing multiple trades businesses.</p>
          <ul>
            <li>Manage multiple accounts</li>
            <li>White-label option</li>
            <li>Advanced analytics</li>
            <li>Bulk lead handling</li>
          </ul>
          <button className="btn secondary full">Choose Agency</button>
        </div>
      </div>
    </section>
  );
}

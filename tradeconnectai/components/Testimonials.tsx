// components/Testimonials.tsx

export default function Testimonials() {
  return (
    <section className="bg-slate-900 text-white py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Loved by local businesses</h2>
        <p className="text-slate-400 mb-12">
          Real results from real customers using TradeConnectAI.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
            <p className="text-slate-300 mb-4">
              “We closed 14 new jobs in the first week. Customers think it’s a real person.”
            </p>
            <p className="font-semibold">— Barry Plumbing Co.</p>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
            <p className="text-slate-300 mb-4">
              “The AI books appointments while I’m on the tools. Game changer.”
            </p>
            <p className="font-semibold">— Cardiff Electrical</p>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
            <p className="text-slate-300 mb-4">
              “We added £7,000 in new leads last month. It just works.”
            </p>
            <p className="font-semibold">— Vale Roofing</p>
          </div>

        </div>
      </div>
    </section>
  );
}

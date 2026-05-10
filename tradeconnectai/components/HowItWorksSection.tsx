// app/components/HowItWorksSection.tsx
export default function HowItWorksSection() {
  return (
    <section className="relative w-full bg-black">
      <div className="relative mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <div className="mb-8 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-base text-gray-300 sm:text-lg">
            Turn missed calls into booked jobs in three simple steps.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          <img
            src="/images/how-it-works-hero.jpg"
            alt="How TradeConnectAI works"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-gray-400 md:flex-row md:items-center md:justify-between md:px-6">
        <p>© {new Date().getFullYear()} TradeConnectAI. All rights reserved.</p>
        <span className="text-xs text-gray-500">Built for trades that don’t stop.</span>
      </div>
    </footer>
  );
}

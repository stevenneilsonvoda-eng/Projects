import "./globals.css";

export const metadata = {
  title: "TradeConnect AI",
  description: "Turn conversations into booked jobs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">

        {/* STICKY NAVBAR */}
        <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/10">
          <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="font-bold text-xl">TradeConnect AI</div>

            <div className="flex gap-6 text-sm">
              <a href="#how-it-works" className="hover:text-blue-400 transition">
                How it works
              </a>
              <a href="#dashboard" className="hover:text-blue-400 transition">
                Dashboard
              </a>
              <a href="#pricing" className="hover:text-blue-400 transition">
                Pricing
              </a>
            </div>
          </nav>
        </header>

        {/* PAGE CONTENT (pushed down so header doesn't overlap) */}
        <div className="pt-20">
          {children}
        </div>

      </body>
    </html>
  );
}

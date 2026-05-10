"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2D8CFF] shadow-[0_0_20px_rgba(45,140,255,0.7)]">
            <span className="text-sm font-bold text-white">TC</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            TradeConnectAI
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm transition-colors",
                pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="secondary" size="sm">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Start free</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

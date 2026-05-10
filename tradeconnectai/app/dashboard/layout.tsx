"use client";

import React from "react";
import Link from "next/link";
import {
  Home,
  Users,
  Workflow,
  Inbox,
  Settings,
  BarChart3,
} from "lucide-react";

function NavItem({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">TradeConnect AI</h1>
          <p className="text-sm text-slate-400 mt-1">
            Business Automation Platform
          </p>
        </div>

        <nav className="space-y-2">
          <NavItem
            href="/dashboard"
            icon={<Home size={18} />}
            label="Overview"
          />

          <NavItem
            href="/dashboard/crm"
            icon={<Users size={18} />}
            label="CRM"
          />

          <NavItem
            href="/dashboard/automations"
            icon={<Workflow size={18} />}
            label="Automations"
          />

          <NavItem
            href="/dashboard/leads"
            icon={<Inbox size={18} />}
            label="Leads"
          />

          <NavItem
            href="/dashboard/analytics"
            icon={<BarChart3 size={18} />}
            label="Analytics"
          />

          <NavItem
            href="/dashboard/settings"
            icon={<Settings size={18} />}
            label="Settings"
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-slate-950">
        {children}
      </main>
    </div>
  );
}
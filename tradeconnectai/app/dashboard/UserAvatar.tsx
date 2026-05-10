"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Image from "next/image";
import { User, Settings, CreditCard, LogOut } from "lucide-react";
import DropdownItem from "@/components/DropdownItem"; // ✅ correct import
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  name: string;
  email?: string;
  avatarUrl?: string | null;
  onLogout?: () => void;
};

export default function UserAvatar({
  name,
  email,
  avatarUrl,
  onLogout,
}: UserAvatarProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent | any) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        onKeyDown={handleButtonKeyDown}
        className={cn(
          "flex items-center gap-2 rounded-full px-2 py-1",
          "hover:bg-slate-800/70 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-blue-500"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="relative h-8 w-8 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center text-sm font-medium text-white">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              fill
              sizes="32px"
              className="object-cover"
            />
          ) : (
            <span>{name.charAt(0).toUpperCase()}</span>
          )}
        </div>

        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-medium text-slate-100 truncate max-w-[140px]">
            {name}
          </span>
          {email && (
            <span className="text-xs text-slate-400 truncate max-w-[140px]">
              {email}
            </span>
          )}
        </div>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-md shadow-lg py-2 z-50"
          role="menu"
          aria-label="User menu"
        >
          <DropdownItem
            icon={<User size={16} />}
            label="Profile"
            href="/dashboard/settings/profile"
          />
          <DropdownItem
            icon={<Settings size={16} />}
            label="Settings"
            href="/dashboard/settings"
          />
          <DropdownItem
            icon={<CreditCard size={16} />}
            label="Billing"
            href="/dashboard/settings/billing"
          />

          <div className="my-2 border-t border-slate-700" />

          <DropdownItem
            icon={<LogOut size={16} />}
            label="Logout"
            href="#"
            danger
            onClick={onLogout}
          />
        </div>
      )}
    </div>
  );
}
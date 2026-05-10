"use client";

import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string; // <-- OPTIONAL, FIXES YOUR BUILD
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200";

  const variants = {
    primary: "bg-[#2D8CFF] text-white hover:bg-[#3b96ff]",
    secondary: "border border-white/20 text-white hover:bg-white/5 bg-white/5",
    ghost: "text-gray-300 hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-5 py-2 text-sm",
    lg: "px-6 py-2.5 text-base",
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

import React from "react";

export function Card({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-xl p-6 bg-white dark:bg-gray-900 shadow-md ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

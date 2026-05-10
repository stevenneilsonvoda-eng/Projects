"use client";

import { Suspense } from "react";
import DashboardHome from "./DashboardHome";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardHome />
    </Suspense>
  );
}

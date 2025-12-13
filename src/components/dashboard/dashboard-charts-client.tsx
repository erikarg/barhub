"use client";

import dynamic from "next/dynamic";
import { ChartsSkeleton } from "@/components/dashboard/charts-skeleton";

const DashboardCharts = dynamic(
  () =>
    import("@/components/dashboard/dashboard-charts").then(
      (m) => m.DashboardCharts
    ),
  { ssr: false, loading: () => <ChartsSkeleton /> }
);

export function DashboardChartsClient() {
  return <DashboardCharts />;
}



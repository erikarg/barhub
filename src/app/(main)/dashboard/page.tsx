import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import {
  metricsData,
} from "@/mocks/dashboard";
import { DashboardChartsClient } from "@/components/dashboard/dashboard-charts-client";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Overview"
        description="Real-time insights to help you manage your business efficiently."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <DashboardChartsClient />
    </div>
  );
}

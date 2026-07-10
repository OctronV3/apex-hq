import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Analytics</h2>
        <p className="text-[#888888]">
          Revenue, audience, and traffic telemetry.
        </p>
      </div>
      <AnalyticsDashboard />
    </div>
  );
}

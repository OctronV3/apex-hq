import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { PipelinePreview } from "@/components/dashboard/pipeline-preview";
import { RecentEmails } from "@/components/dashboard/recent-emails";
import { SocialPreview } from "@/components/dashboard/social-preview";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Good evening, Operator.
        </h2>
        <p className="text-[#888888]">
          The command center is online. Here is the state of the empire.
        </p>
      </div>
      <KpiGrid />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <PipelinePreview />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentEmails />
        <SocialPreview />
      </div>
    </div>
  );
}

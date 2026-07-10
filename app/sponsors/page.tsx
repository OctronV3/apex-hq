import { SponsorTable } from "@/components/sponsors/sponsor-table";

export default function SponsorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Sponsors</h2>
        <p className="text-[#888888]">Manage partnerships, deal flow, and renewals.</p>
      </div>
      <SponsorTable />
    </div>
  );
}

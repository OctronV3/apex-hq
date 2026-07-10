import { SocialDashboard } from "@/components/social/social-dashboard";

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Social Media</h2>
        <p className="text-[#888888]">Schedule, publish, and monitor the social feed.</p>
      </div>
      <SocialDashboard />
    </div>
  );
}

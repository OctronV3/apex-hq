import { PipelineBoard } from "@/components/newsletter/pipeline-board";

export default function NewsletterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Newsletter Pipeline</h2>
        <p className="text-[#888888]">Ideas, drafts, scheduled sends, and published issues.</p>
      </div>
      <PipelineBoard />
    </div>
  );
}

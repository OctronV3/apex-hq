"use client";

import Link from "next/link";
import { ArrowRight, PenTool, Calendar, Send, Lightbulb } from "lucide-react";
import { useNewsletters } from "@/hooks/use-apex";
import { NewsletterItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stageIcon: Record<string, typeof Lightbulb> = {
  idea: Lightbulb,
  writing: PenTool,
  scheduled: Calendar,
  sent: Send,
};

const stageColor: Record<string, string> = {
  idea: "bg-[#111111] text-[#888888]",
  writing: "bg-[#111111] text-white",
  scheduled: "bg-[#ff1a1a]/10 text-[#ff1a1a] border-[#ff1a1a]/20",
  sent: "bg-white/10 text-white",
};

function NewsletterRow({ item }: { item: NewsletterItem }) {
  const Icon = stageIcon[item.stage] || Lightbulb;
  return (
    <div className="flex items-center justify-between rounded border border-[#222222] bg-[#111111] p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0a0a0a] text-[#ff1a1a]">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{item.title}</p>
          <p className="text-xs text-[#888888]">{item.author}</p>
        </div>
      </div>
      <Badge variant="outline" className={stageColor[item.stage]}>
        {item.stage}
      </Badge>
    </div>
  );
}

export function PipelinePreview() {
  const { data, isLoading } = useNewsletters();
  const items = data?.slice(0, 4) || [];

  return (
    <Card className="border-[#222222] bg-[#0a0a0a]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white text-base">Newsletter Pipeline</CardTitle>
        <Link
          href="/newsletter"
          className="flex items-center text-xs text-[#ff1a1a] hover:underline"
        >
          View all <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="h-24 animate-pulse rounded bg-[#111111]" />
        ) : (
          items.map((item) => <NewsletterRow key={item.id} item={item} />)
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSocialPosts } from "@/hooks/use-apex";
import { SocialPost } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const platformColor: Record<string, string> = {
  twitter: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  linkedin: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  instagram: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  threads: "bg-white/10 text-white border-white/20",
};

function PostRow({ post }: { post: SocialPost }) {
  return (
    <div className="rounded border border-[#222222] bg-[#111111] p-3 space-y-2">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className={platformColor[post.platform] || "text-white"}>
          {post.platform}
        </Badge>
        <span className="text-xs text-[#888888] capitalize">{post.status}</span>
      </div>
      <p className="text-sm text-white line-clamp-2">{post.content}</p>
      {post.metrics && (
        <div className="flex gap-4 text-xs text-[#888888]">
          <span>{post.metrics.likes} likes</span>
          <span>{post.metrics.shares} shares</span>
        </div>
      )}
    </div>
  );
}

export function SocialPreview() {
  const { data, isLoading } = useSocialPosts();
  const posts = data?.slice(0, 3) || [];

  return (
    <Card className="border-[#222222] bg-[#0a0a0a]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white text-base">Social Feed</CardTitle>
        <Link
          href="/social"
          className="flex items-center text-xs text-[#ff1a1a] hover:underline"
        >
          View all <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="h-24 animate-pulse rounded bg-[#111111]" />
        ) : (
          posts.map((post) => <PostRow key={post.id} post={post} />)
        )}
      </CardContent>
    </Card>
  );
}

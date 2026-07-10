"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useEmails } from "@/hooks/use-apex";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentEmails() {
  const { data, isLoading } = useEmails("inbox");
  const emails = data?.slice(0, 4) || [];

  return (
    <Card className="border-[#222222] bg-[#0a0a0a]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white text-base">Inbox</CardTitle>
        <Link
          href="/email"
          className="flex items-center text-xs text-[#ff1a1a] hover:underline"
        >
          View all <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="h-24 animate-pulse rounded bg-[#111111]" />
        ) : (
          emails.map((email) => (
            <div
              key={email.id}
              className="flex items-center justify-between rounded border border-[#222222] bg-[#111111] p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0a0a0a] text-[#ff1a1a]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{email.subject}</p>
                  <p className="text-xs text-[#888888]">{email.from}</p>
                </div>
              </div>
              <p className="text-xs text-[#888888]">
                {formatDistanceToNow(new Date(email.sentAt), { addSuffix: true })}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

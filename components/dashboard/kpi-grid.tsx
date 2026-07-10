"use client";

import { TrendingUp, Users, MailOpen, Handshake } from "lucide-react";
import { useKpis } from "@/hooks/use-apex";
import { Card, CardContent } from "@/components/ui/card";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function KpiGrid() {
  const { data, isLoading } = useKpis();

  const kpis = [
    {
      label: "Monthly Revenue",
      value: data ? formatCurrency(data.mrr) : "—",
      change: data ? `+${data.mrrGrowth}%` : "—",
      icon: TrendingUp,
    },
    {
      label: "Subscribers",
      value: data ? data.subscribers.toLocaleString() : "—",
      change: data ? `+${data.subscriberGrowth}%` : "—",
      icon: Users,
    },
    {
      label: "Open Rate",
      value: data ? `${data.openRate}%` : "—",
      change: data ? `+${data.openRateGrowth}%` : "—",
      icon: MailOpen,
    },
    {
      label: "Active Sponsors",
      value: data ? data.totalSponsors.toString() : "—",
      change: data ? `+${data.sponsorGrowth}%` : "—",
      icon: Handshake,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <Card
            key={idx}
            className="border-[#222222] bg-[#0a0a0a]"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-[#888888]">
                    {kpi.label}
                  </p>
                  <p className="text-2xl font-semibold text-white font-mono">
                    {isLoading ? "—" : kpi.value}
                  </p>
                  <p className="text-xs text-[#ff1a1a]">{isLoading ? "—" : kpi.change}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-[#ff1a1a]">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

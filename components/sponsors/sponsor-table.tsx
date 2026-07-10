"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useSponsors, useAddSponsor, useUpdateSponsor, useDeleteSponsor } from "@/hooks/use-apex";
import type { SponsorStatus, SponsorTier } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

const tierColor: Record<SponsorTier, string> = {
  platinum: "bg-white/10 text-white border-white/20",
  gold: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  silver: "bg-[#888888]/10 text-[#888888] border-[#888888]/20",
  bronze: "bg-orange-700/10 text-orange-500 border-orange-700/20",
};

function AddSponsorDialog({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const add = useAddSponsor();
  const [form, setForm] = useState({
    name: "",
    tier: "gold" as SponsorTier,
    dealValue: 0,
    status: "negotiating" as SponsorStatus,
    startDate: "",
    endDate: "",
    contact: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    add.mutate(form, { onSuccess: () => setOpen(false) });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border-[#222222] bg-[#0a0a0a] text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Add Sponsor</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-[#111111] border-[#222222] text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tier</Label>
              <Select value={form.tier} onValueChange={(v) => setForm({ ...form, tier: v as SponsorTier })}>
                <SelectTrigger className="bg-[#111111] border-[#222222] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[#222222] bg-[#0a0a0a] text-white">
                  {["platinum", "gold", "silver", "bronze"].map((t) => (
                    <SelectItem key={t} value={t} className="text-white">{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as SponsorStatus })}>
                <SelectTrigger className="bg-[#111111] border-[#222222] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[#222222] bg-[#0a0a0a] text-white">
                  {["active", "pending", "expired", "negotiating"].map((s) => (
                    <SelectItem key={s} value={s} className="text-white">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Deal Value</Label>
            <Input type="number" value={form.dealValue} onChange={(e) => setForm({ ...form, dealValue: Number(e.target.value) })} className="bg-[#111111] border-[#222222] text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="bg-[#111111] border-[#222222] text-white" />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="bg-[#111111] border-[#222222] text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Contact</Label>
            <Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="bg-[#111111] border-[#222222] text-white" />
          </div>
          <Button type="submit" className="bg-[#ff1a1a] hover:bg-[#d60a0a] text-white">Add Sponsor</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function SponsorTable() {
  const { data, isLoading } = useSponsors();
  const update = useUpdateSponsor();
  const remove = useDeleteSponsor();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded border border-[#222222] bg-[#0a0a0a]" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[#888888]">
          Active deals, renewals, and pipeline in one view.
        </p>
        <Button onClick={() => setOpen(true)} size="sm" className="bg-[#ff1a1a] hover:bg-[#d60a0a] text-white">
          <Plus className="mr-2 h-4 w-4" /> Add sponsor
        </Button>
      </div>
      <Card className="border-[#222222] bg-[#0a0a0a] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#111111]">
            <TableRow className="border-[#222222] hover:bg-transparent">
              <TableHead className="text-[#888888]">Sponsor</TableHead>
              <TableHead className="text-[#888888]">Tier</TableHead>
              <TableHead className="text-[#888888]">Deal Value</TableHead>
              <TableHead className="text-[#888888]">Status</TableHead>
              <TableHead className="text-[#888888]">Term</TableHead>
              <TableHead className="text-[#888888]">Contact</TableHead>
              <TableHead className="text-[#888888]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((sponsor) => (
              <TableRow key={sponsor.id} className="border-[#222222] hover:bg-[#111111]">
                <TableCell className="text-white font-medium">{sponsor.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={tierColor[sponsor.tier]}>
                    {sponsor.tier}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-white">{formatCurrency(sponsor.dealValue)}</TableCell>
                <TableCell>
                  <Select value={sponsor.status} onValueChange={(v) => update.mutate({ id: sponsor.id, patch: { status: v as SponsorStatus } })}>
                    <SelectTrigger className="h-7 w-28 bg-[#0a0a0a] border-[#222222] text-xs text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-[#222222] bg-[#0a0a0a] text-white">
                      {["active", "pending", "expired", "negotiating"].map((s) => (
                        <SelectItem key={s} value={s} className="text-white">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-[#888888] text-xs">
                  {sponsor.startDate} {sponsor.endDate ? `→ ${sponsor.endDate}` : ""}
                </TableCell>
                <TableCell className="text-[#888888] text-xs">{sponsor.contact}</TableCell>
                <TableCell>
                  <button onClick={() => remove.mutate(sponsor.id)} className="text-[#888888] hover:text-[#ff1a1a] text-xs">Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <AddSponsorDialog open={open} setOpen={setOpen} />
    </div>
  );
}

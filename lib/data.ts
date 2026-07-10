import { getSupabase } from "./supabase/client";
import {
  NewsletterItem,
  Sponsor,
  SocialPost,
  EmailMessage,
  EmailFolder,
  RevenuePoint,
  TrafficPoint,
  SocialMetric,
} from "@/types";

function id() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// ---- Newsletter ----

let newsletters: NewsletterItem[] = [
  {
    id: id(),
    title: "Market Pulse: July 2026",
    author: "B. Wayne",
    stage: "writing",
    tags: ["markets", "weekly"],
  },
  {
    id: id(),
    title: "The Operator's Playbook #12",
    author: "A. Fox",
    stage: "scheduled",
    scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    tags: ["ops", "playbook"],
  },
  {
    id: id(),
    title: "Sponsor Spotlight: Gotham Tools",
    author: "B. Wayne",
    stage: "sent",
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    openRate: 62,
    clickRate: 14,
    tags: ["sponsor"],
  },
  {
    id: id(),
    title: "Deep Dive: Newsletter Growth Loops",
    author: "L. Cain",
    stage: "idea",
    tags: ["growth", "strategy"],
  },
  {
    id: id(),
    title: "Community Digest #45",
    author: "B. Wayne",
    stage: "sent",
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    openRate: 55,
    clickRate: 9,
    tags: ["community"],
  },
];

export async function getNewsletters(): Promise<NewsletterItem[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("newsletters")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data as NewsletterItem[];
  }
  return newsletters;
}

export async function addNewsletter(
  item: Omit<NewsletterItem, "id">
): Promise<NewsletterItem> {
  const newItem: NewsletterItem = { ...item, id: id() };
  newsletters = [newItem, ...newsletters];
  return newItem;
}

export async function updateNewsletter(
  id: string,
  patch: Partial<NewsletterItem>
): Promise<NewsletterItem | null> {
  const idx = newsletters.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  newsletters[idx] = { ...newsletters[idx], ...patch };
  return newsletters[idx];
}

export async function deleteNewsletter(id: string): Promise<void> {
  newsletters = newsletters.filter((n) => n.id !== id);
}

// ---- Sponsors ----

let sponsors: Sponsor[] = [
  {
    id: id(),
    name: "Gotham Tools",
    tier: "platinum",
    dealValue: 50000,
    status: "active",
    startDate: "2026-01-15",
    endDate: "2026-12-31",
    contact: "lucius.fox@gotham.tools",
  },
  {
    id: id(),
    name: "Wayne Enterprises",
    tier: "gold",
    dealValue: 25000,
    status: "active",
    startDate: "2026-03-01",
    endDate: "2026-08-31",
    contact: "bruce@wayne.com",
  },
  {
    id: id(),
    name: "Arkham Analytics",
    tier: "silver",
    dealValue: 12000,
    status: "negotiating",
    startDate: "2026-07-01",
    contact: "sales@arkham.io",
  },
  {
    id: id(),
    name: "Ace Chemicals",
    tier: "bronze",
    dealValue: 4000,
    status: "expired",
    startDate: "2025-06-01",
    endDate: "2026-05-31",
    contact: "contact@acechem.com",
  },
];

export async function getSponsors(): Promise<Sponsor[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("sponsors")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data as Sponsor[];
  }
  return sponsors;
}

export async function addSponsor(
  item: Omit<Sponsor, "id">
): Promise<Sponsor> {
  const newItem: Sponsor = { ...item, id: id() };
  sponsors = [newItem, ...sponsors];
  return newItem;
}

export async function updateSponsor(
  id: string,
  patch: Partial<Sponsor>
): Promise<Sponsor | null> {
  const idx = sponsors.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  sponsors[idx] = { ...sponsors[idx], ...patch };
  return sponsors[idx];
}

export async function deleteSponsor(id: string): Promise<void> {
  sponsors = sponsors.filter((s) => s.id !== id);
}

// ---- Social ----

let socialPosts: SocialPost[] = [
  {
    id: id(),
    platform: "twitter",
    content:
      "The bat-signal is on. New operator playbook drops tomorrow at 0600.",
    scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
    status: "scheduled",
  },
  {
    id: id(),
    platform: "linkedin",
    content:
      "Revenue is a lagging metric. Operating tempo is the leading one. Here's how we run the batcave.",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    status: "published",
    metrics: { likes: 432, shares: 89, comments: 34, impressions: 12000 },
  },
  {
    id: id(),
    platform: "threads",
    content:
      "Three decisions that made the July sponsor deck close 48 hours faster.",
    status: "draft",
  },
];

export async function getSocialPosts(): Promise<SocialPost[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("social_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data as SocialPost[];
  }
  return socialPosts;
}

export async function addSocialPost(
  item: Omit<SocialPost, "id">
): Promise<SocialPost> {
  const newItem: SocialPost = { ...item, id: id() };
  socialPosts = [newItem, ...socialPosts];
  return newItem;
}

export async function updateSocialPost(
  id: string,
  patch: Partial<SocialPost>
): Promise<SocialPost | null> {
  const idx = socialPosts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  socialPosts[idx] = { ...socialPosts[idx], ...patch };
  return socialPosts[idx];
}

export async function deleteSocialPost(id: string): Promise<void> {
  socialPosts = socialPosts.filter((p) => p.id !== id);
}

// ---- Email ----

let emails: EmailMessage[] = [
  {
    id: id(),
    from: "lucius.fox@wayne.com",
    to: "bruce@apex.hq",
    subject: "Q3 capex proposal",
    body:
      "Bruce —\n\nThe Q3 capex proposal is ready for review. Let me know if you want to adjust the tooling budget before we send it to the board.",
    sentAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    folder: "inbox",
    read: false,
    starred: true,
    labels: ["finance", "board"],
  },
  {
    id: id(),
    from: "sales@arkham.io",
    to: "bruce@apex.hq",
    subject: "Re: Sponsorship renewal",
    body:
      "Thanks for the quick response. We can lock in the silver tier by Friday if the invoice terms work.",
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    folder: "inbox",
    read: true,
    starred: false,
    labels: ["sponsors"],
  },
  {
    id: id(),
    from: "bruce@apex.hq",
    to: "team@apex.hq",
    subject: "Operator all-hands: Monday 0600",
    body:
      "Team —\n\nMonday kickoff will focus on newsletter cadence and sponsor deliverables. Come prepared.",
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    folder: "sent",
    read: true,
    starred: false,
    labels: ["internal"],
  },
];

export async function getEmails(folder?: EmailFolder): Promise<EmailMessage[]> {
  const supabase = getSupabase();
  if (supabase) {
    let query = supabase.from("emails").select("*").order("sent_at", {
      ascending: false,
    });
    if (folder) query = query.eq("folder", folder);
    const { data, error } = await query;
    if (!error && data) return data as EmailMessage[];
  }
  if (folder) return emails.filter((e) => e.folder === folder);
  return emails;
}

export async function sendEmail(
  email: Omit<EmailMessage, "id" | "folder" | "sentAt" | "read" | "starred" | "labels">
): Promise<EmailMessage> {
  const newEmail: EmailMessage = {
    ...email,
    id: id(),
    folder: "sent",
    sentAt: new Date().toISOString(),
    read: true,
    starred: false,
    labels: [],
  };
  emails = [newEmail, ...emails];
  return newEmail;
}

export async function updateEmail(
  id: string,
  patch: Partial<EmailMessage>
): Promise<EmailMessage | null> {
  const idx = emails.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  emails[idx] = { ...emails[idx], ...patch };
  return emails[idx];
}

export async function deleteEmail(id: string): Promise<void> {
  emails = emails.filter((e) => e.id !== id);
}

// ---- Analytics ----

export function getRevenueData(): RevenuePoint[] {
  const data: RevenuePoint[] = [];
  let revenue = 42000;
  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    revenue += Math.floor(Math.random() * 8000 - 2000);
    data.push({
      date: date.toLocaleString("default", { month: "short" }),
      revenue,
      subscriptions: Math.floor(revenue * 0.55),
      ads: Math.floor(revenue * 0.25),
      sponsors: Math.floor(revenue * 0.2),
    });
  }
  return data;
}

export function getTrafficData(): TrafficPoint[] {
  const data: TrafficPoint[] = [];
  let visitors = 12000;
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    visitors += Math.floor(Math.random() * 2000 - 900);
    data.push({
      date: date.toLocaleString("default", { weekday: "narrow" }),
      visitors,
      pageViews: Math.floor(visitors * (2.4 + Math.random())),
    });
  }
  return data;
}

export function getSocialMetrics(): SocialMetric[] {
  return [
    { platform: "Twitter", followers: 48200, growth: 4.2 },
    { platform: "LinkedIn", followers: 21500, growth: 6.7 },
    { platform: "Instagram", followers: 12800, growth: 2.1 },
    { platform: "Threads", followers: 8400, growth: 8.4 },
  ];
}

export function getKpiStats() {
  return {
    mrr: 42400,
    mrrGrowth: 12.5,
    subscribers: 14200,
    subscriberGrowth: 8.3,
    openRate: 58,
    openRateGrowth: 2.1,
    totalSponsors: 14,
    sponsorGrowth: 16,
  };
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calculator,
  BarChart3,
  Home,
  Mail,
  Newspaper,
  Search,
  Share2,
  Users,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Newsletter", href: "/newsletter", icon: Newspaper },
  { name: "Sponsors", href: "/sponsors", icon: Users },
  { name: "Social", href: "/social", icon: Share2 },
  { name: "Email", href: "/email", icon: Mail },
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 rounded-md border border-[#222222] bg-[#0a0a0a] px-3 py-1.5 text-sm text-[#888888] hover:text-white transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>Command</span>
        <kbd className="ml-2 rounded bg-[#111111] px-1.5 py-0.5 text-[10px] font-mono">
          ⌘K
        </kbd>
      </button>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden rounded-md border border-[#222222] bg-[#0a0a0a] p-2 text-[#888888]"
      >
        <Search className="h-4 w-4" />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.href}
                  onSelect={() => {
                    router.push(item.href);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Tools">
            <CommandItem
              onSelect={() => {
                router.push("/analytics");
                setOpen(false);
              }}
              className="cursor-pointer"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Revenue report
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

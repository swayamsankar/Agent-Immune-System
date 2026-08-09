import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  Boxes,
  ShieldAlert,
  Search,
  Lock,
  Activity,
  ScrollText,
  Settings,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const primary = [
  { label: "Overview", to: "/dashboard", icon: LayoutGrid },
  { label: "Agent Fleet", to: "/agents", icon: Boxes },
  { label: "Threats", to: "/threats", icon: ShieldAlert },
  { label: "Investigations", to: "/investigations", icon: Search },
  { label: "Quarantine", to: "/quarantine", icon: Lock },
  { label: "Behavior Analytics", to: "/analytics", icon: Activity },
  { label: "Audit Trail", to: "/audit", icon: ScrollText },
] as const;

const secondary = [
  { label: "Settings", to: "/settings", icon: Settings },
  { label: "Documentation", to: "/docs", icon: BookOpen },
] as const;

function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 text-highlight-foreground" aria-hidden>
      <path
        d="M12 2.5 4.5 5.6v6.1c0 4.6 3.1 8.6 7.5 9.8 4.4-1.2 7.5-5.2 7.5-9.8V5.6L12 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M12 7.5v9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.4 10.2h7.2" stroke="currentColor" strokeWidth="1.4" opacity=".55" />
    </svg>
  );
}

export function AppSidebar({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const item = (to: string, label: string, Icon: typeof LayoutGrid) => {
    const active = pathname === to;
    return (
      <Link
        key={to}
        to={to}
        onClick={onNavigate}
        className={cn(
          "group flex items-center gap-3 rounded-full px-3.5 py-2.5 text-[13px] transition-colors",
          active
            ? "bg-highlight text-highlight-foreground"
            : "text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground",
        )}
      >
        <Icon className="size-4 shrink-0" strokeWidth={1.7} />
        <span className="truncate">{label}</span>
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "flex w-[232px] shrink-0 flex-col overflow-y-auto rounded-[calc(var(--radius)+6px)] bg-primary p-3",
        className,
      )}
    >

      <div className="flex items-center gap-3 px-1.5 py-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-highlight">
          <Mark />
        </div>
        <div className="font-display leading-[1.1] text-primary-foreground">
          <div className="text-[12px] font-medium tracking-[0.12em]">AGENT IMMUNE</div>
          <div className="text-[12px] tracking-[0.12em] opacity-60">SYSTEM</div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 pt-3">
        {primary.map((i) => item(i.to, i.label, i.icon))}
        <div className="my-2 h-px bg-primary-foreground/12" />
        {secondary.map((i) => item(i.to, i.label, i.icon))}
      </nav>

      <div className="rounded-[var(--radius)] bg-primary-foreground/8 px-4 py-3.5">
        <div className="text-[10.5px] uppercase tracking-[0.08em] text-primary-foreground/50">
          System Status
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-[12px] text-primary-foreground/85">
          <span className="inline-block size-1.5 rounded-full bg-healthy" />
          All systems operational
        </div>
      </div>
    </aside>
  );
}


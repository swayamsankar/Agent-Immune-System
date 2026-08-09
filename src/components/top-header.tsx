import type { ReactNode } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";

export function TopHeader({
  title,
  breadcrumb,
  query,
  onQuery,
  menu,
}: {
  title: string;
  breadcrumb: string;
  query?: string | undefined;
  onQuery?: ((v: string) => void) | undefined;
  menu?: ReactNode;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 rounded-full border border-border bg-surface px-3 sm:h-16 sm:gap-5 sm:px-4">
      {menu}

      <div className="min-w-0 shrink-0 pl-1 sm:min-w-[170px] sm:pl-2">
        <div className="font-display truncate text-[13.5px] font-medium text-foreground sm:text-[14px]">
          {title}
        </div>
        <div className="hidden truncate text-[11px] text-muted-foreground sm:block">{breadcrumb}</div>
      </div>

      <div className="relative hidden max-w-[380px] min-w-0 flex-1 md:block">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query ?? ""}
          onChange={(e) => onQuery?.(e.target.value)}
          placeholder="Search agents, incidents, tools..."
          className="h-10 w-full rounded-full border border-border bg-secondary/70 pl-11 pr-4 text-[13px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-border-strong focus:bg-surface"
        />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2 text-[12.5px] text-muted-foreground sm:gap-2.5">
        <span className="hidden items-center gap-2 rounded-full bg-highlight px-3 py-1.5 text-highlight-foreground xl:flex">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-highlight-foreground" />
          <span className="text-[11px] tracking-[0.08em]">LIVE MONITORING</span>
        </span>
        <button className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 transition-colors hover:bg-accent hover:text-foreground lg:flex">
          Production <ChevronDown className="size-3.5" />
        </button>
        <button className="relative rounded-full border border-border p-2 transition-colors hover:bg-accent hover:text-foreground">
          <Bell className="size-4" strokeWidth={1.6} />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-critical" />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-primary p-1 text-primary-foreground sm:pr-4">
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-highlight text-[11px] font-medium text-highlight-foreground">
            SA
          </div>
          <span className="hidden text-[12.5px] sm:inline">Security Admin</span>
        </div>
      </div>
    </header>
  );
}

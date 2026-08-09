import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { TopHeader } from "@/components/top-header";
import { cn } from "@/lib/utils";

export function AppShell({
  title,
  breadcrumb,
  query,
  onQuery,
  children,
}: {
  title: string;
  breadcrumb: string;
  query?: string | undefined;
  onQuery?: ((v: string) => void) | undefined;
  children: ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex h-screen w-full gap-3 overflow-hidden bg-background p-2 sm:p-3">
      <AppSidebar className="hidden lg:flex" />

      {/* Mobile / tablet nav overlay */}
      <div
        className={cn("fixed inset-0 z-50 lg:hidden", navOpen ? "" : "pointer-events-none")}
        aria-hidden={!navOpen}
      >
        <div
          onClick={() => setNavOpen(false)}
          className={cn(
            "absolute inset-0 bg-foreground/25 transition-opacity duration-200",
            navOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute left-0 top-0 h-full p-2 transition-transform duration-200 ease-out",
            navOpen ? "translate-x-0" : "-translate-x-[110%]",
          )}
        >
          <AppSidebar className="h-full" onNavigate={() => setNavOpen(false)} />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:gap-3">
        <TopHeader
          title={title}
          breadcrumb={breadcrumb}
          query={query}
          onQuery={onQuery}
          menu={
            <button
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Toggle navigation"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-accent lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          }
        />
        <main className="flex-1 overflow-y-auto rounded-[calc(var(--radius)+6px)] border border-border bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 px-4 pb-4 pt-5 sm:px-7 sm:pt-7 md:flex-row md:items-end md:justify-between md:gap-6">
      <div className="min-w-0">
        <h1 className="max-w-[22ch] text-[26px] leading-[1.1] font-light tracking-[-0.03em] text-foreground sm:text-[34px] sm:leading-[1.08]">
          {title}
        </h1>
        <p className="mt-2 text-[12.5px] text-muted-foreground sm:text-[13px]">{subtitle}</p>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}



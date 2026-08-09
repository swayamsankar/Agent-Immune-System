import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Drawer({
  open,
  onClose,
  eyebrow,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("fixed inset-0 z-50", open ? "" : "pointer-events-none")} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-background/70 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[400px] flex-col border-l border-border bg-surface transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-start justify-between border-b border-border px-4 py-3">
          <div>
            <div className="label-xs">{eyebrow}</div>
            <div className="mt-0.5 text-[14px] font-medium text-foreground">{title}</div>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-[7px]">
      <span className="text-[11.5px] text-muted-foreground">{label}</span>
      <span className="text-[12.5px] text-foreground">{children}</span>
    </div>
  );
}

export function DrawerSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-b border-border px-4 py-3.5">
      <div className="label-xs mb-2">{title}</div>
      {children}
    </div>
  );
}

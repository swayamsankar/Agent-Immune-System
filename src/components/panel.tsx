import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  subtitle,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("panel flex flex-col overflow-hidden", className)}>
      {title && (
        <header className="flex items-start justify-between gap-4 px-5 pb-3 pt-5">
          <div>
            <h2 className="font-display text-[15px] font-medium text-foreground">{title}</h2>
            {subtitle && <p className="mt-0.5 text-[12px] text-muted-foreground">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={cn("flex-1", bodyClassName ?? "px-5 pb-5")}>{children}</div>
    </section>
  );
}

export function Btn({
  children,
  variant = "default",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary" | "danger" | "ghost";
}) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-1.5 rounded-full border px-4 text-[12.5px] transition-colors",
        variant === "default" &&
          "border-border bg-surface text-foreground hover:border-border-strong hover:bg-accent",
        variant === "primary" &&
          "border-transparent bg-primary text-primary-foreground hover:opacity-90",
        variant === "danger" && "border-transparent bg-critical/12 text-critical hover:bg-critical/20",
        variant === "ghost" &&
          "border-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}


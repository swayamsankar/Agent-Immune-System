import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Panel } from "@/components/panel";
import { Dot } from "@/components/status";
import { events } from "@/lib/mock-data";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit Trail — Agent Immune System" },
      {
        name: "description",
        content: "Immutable record of agent security events, analyst actions and containment decisions.",
      },
      { property: "og:title", content: "Audit Trail — Agent Immune System" },
      { property: "og:description", content: "Immutable record of agent security events and actions." },
    ],
  }),
  component: AuditPage,
});

const actors = ["system", "Security Admin", "M. Okonkwo", "policy-engine", "S. Lindqvist"];

function AuditPage() {
  return (
    <AppShell title="Audit Trail" breadcrumb="Security / Audit Trail">
      <PageHeader
        title="Audit Trail"
        subtitle="Append-only log of security events and analyst actions."
      />
      <div className="p-4 sm:p-6">
        <Panel title="Event Log" subtitle="Indexed in Elasticsearch." bodyClassName="divide-y divide-border/70">
          {[...events, ...events].map((e, idx) => (
            <div key={idx} className="flex items-center gap-4 px-4 py-2.5 hover:bg-accent/40">
              <span className="tabular w-16 font-mono text-[11.5px] text-muted-foreground">{e.time}</span>
              <Dot
                tone={
                  e.severity === "critical"
                    ? "critical"
                    : e.severity === "high"
                      ? "suspicious"
                      : e.severity === "medium"
                        ? "info"
                        : "muted"
                }
              />
              <span className="text-[12.5px] text-foreground">{e.title}</span>
              <span className="ml-auto text-[11.5px] text-muted-foreground">{e.agent}</span>
              <span className="w-28 text-right font-mono text-[11px] text-muted-foreground">
                {actors[idx % actors.length]}
              </span>
            </div>
          ))}
        </Panel>
      </div>
    </AppShell>
  );
}

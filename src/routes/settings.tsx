import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Panel } from "@/components/panel";
import { Dot } from "@/components/status";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Agent Immune System" },
      {
        name: "description",
        content: "Detection thresholds, telemetry sources and containment policy configuration.",
      },
      { property: "og:title", content: "Settings — Agent Immune System" },
      { property: "og:description", content: "Detection thresholds and containment policy configuration." },
    ],
  }),
  component: SettingsPage,
});

const rows: [string, string][] = [
  ["Detection sensitivity", "Balanced"],
  ["Auto-quarantine threshold", "Risk ≥ 90"],
  ["Baseline learning window", "30 days"],
  ["Telemetry retention", "180 days"],
  ["Notification channel", "soc-alerts (webhook)"],
];

function SettingsPage() {
  return (
    <AppShell title="Settings" breadcrumb="Security / Settings">
      <PageHeader title="Settings" subtitle="Detection, containment and telemetry configuration." />
      <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 xl:grid-cols-2">
        <Panel title="Detection Policy" bodyClassName="divide-y divide-border/70">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between px-4 py-2.5 text-[12.5px]">
              <span className="text-muted-foreground">{k}</span>
              <span className="text-foreground">{v}</span>
            </div>
          ))}
        </Panel>
        <Panel title="Integrations" bodyClassName="divide-y divide-border/70">
          {[
            ["Elasticsearch", "Connected", "1.84M traces indexed"],
            ["Amazon Bedrock", "Connected", "Investigation model"],
            ["Tool Gateway", "Connected", "Enforcement point"],
          ].map(([name, status, note]) => (
            <div key={name} className="flex items-center justify-between px-4 py-2.5 text-[12.5px]">
              <div>
                <div className="text-foreground">{name}</div>
                <div className="text-[11.5px] text-muted-foreground">{note}</div>
              </div>
              <span className="flex items-center gap-1.5 text-healthy">
                <Dot tone="healthy" /> {status}
              </span>
            </div>
          ))}
        </Panel>
      </div>
    </AppShell>
  );
}

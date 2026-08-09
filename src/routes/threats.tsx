import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Panel } from "@/components/panel";
import { IncidentDrawer } from "@/components/incident-drawer";
import { Dot, toneText, type Tone } from "@/components/status";
import { incidents, type Incident } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/threats")({
  head: () => ({
    meta: [
      { title: "Threat Detections — Agent Immune System" },
      {
        name: "description",
        content:
          "Open threat detections across the agent fleet with evidence, severity and recommended containment actions.",
      },
      { property: "og:title", content: "Threat Detections — Agent Immune System" },
      {
        property: "og:description",
        content: "Prompt injection, privilege escalation and exfiltration detections across agents.",
      },
    ],
  }),
  component: ThreatsPage,
});

const sev = (s: Incident["severity"]): Tone =>
  s === "CRITICAL" ? "critical" : s === "HIGH" ? "suspicious" : "info";

const severities = ["ALL", "CRITICAL", "HIGH", "MEDIUM"] as const;

function ThreatsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof severities)[number]>("ALL");
  const [incident, setIncident] = useState<Incident | null>(null);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return incidents.filter(
      (i) =>
        (filter === "ALL" || i.severity === filter) &&
        (!q || i.threat.toLowerCase().includes(q) || i.agent.toLowerCase().includes(q)),
    );
  }, [query, filter]);

  return (
    <AppShell title="Threats" breadcrumb="Security / Threats" query={query} onQuery={setQuery}>
      <PageHeader
        title="Threat Detections"
        subtitle="Behavioral detections raised against monitored agents."
      />
      <div className="p-4 sm:p-6">
        <Panel
          title="Open Detections"
          subtitle="Click an incident to open the investigation drawer."
          action={
            <div className="flex gap-1">
              {severities.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={cn(
                    "rounded-sm border px-2 py-1 text-[10.5px] tracking-wider transition-colors",
                    filter === s
                      ? "border-info/50 bg-info/12 text-info"
                      : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          }
          bodyClassName="divide-y divide-border/70"
        >
          {data.map((i) => (
            <button
              key={i.id}
              onClick={() => setIncident(i)}
              className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-accent/50"
            >
              <span className="font-mono text-[11.5px] text-muted-foreground">#{i.id}</span>
              <Dot tone={sev(i.severity)} />
              <div className="min-w-0">
                <div className="text-[13px] text-foreground">{i.threat}</div>
                <div className="text-[11.5px] text-muted-foreground">{i.agent}</div>
              </div>
              <span className={cn("ml-auto text-[10.5px] tracking-wider", toneText(sev(i.severity)))}>
                {i.severity}
              </span>
              <span className={cn("tabular w-14 text-right text-[12.5px]", toneText(sev(i.severity)))}>
                {i.risk}/100
              </span>
              <span className="w-24 text-right text-[11.5px] text-muted-foreground">{i.status}</span>
              <span className="w-24 text-right text-[11.5px] text-muted-foreground">{i.detected}</span>
            </button>
          ))}
        </Panel>
      </div>
      <IncidentDrawer incident={incident} onClose={() => setIncident(null)} />
    </AppShell>
  );
}

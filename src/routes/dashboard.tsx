import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Download, ArrowUpRight } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Panel, Btn } from "@/components/panel";
import { AgentTable } from "@/components/agent-table";
import { AgentDrawer } from "@/components/agent-drawer";
import { IncidentDrawer } from "@/components/incident-drawer";
import { Dot, toneText } from "@/components/status";
import { agents, events, incidents, riskDistribution, type Agent, type Incident } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Agent Fleet Overview — Agent Immune System" },
      {
        name: "description",
        content:
          "Real-time security and behavioral health across autonomous AI agents: threats, risk scores, quarantine and investigations.",
      },
      { property: "og:title", content: "Agent Fleet Overview — Agent Immune System" },
      {
        property: "og:description",
        content: "Enterprise security console for monitoring autonomous AI agent fleets.",
      },
    ],
  }),
  component: Dashboard,
});

function Kpi({
  value,
  label,
  caption,
  accent,
  children,
}: {
  value: string;
  label: string;
  caption: string;
  accent?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[calc(var(--radius)+4px)] border px-5 py-5",
        accent ? "border-transparent bg-highlight text-highlight-foreground" : "panel",
      )}
    >
      <div className={cn("label-xs", accent && "text-highlight-foreground/70")}>{label}</div>
      <div className="tabular font-display mt-3 text-[40px] leading-none font-light">{value}</div>
      <div className={cn("mt-2 text-[12px]", accent ? "opacity-70" : "text-muted-foreground")}>
        {caption}
      </div>
      <div
        className={cn(
          "mt-4 border-t pt-3 text-[11.5px]",
          accent ? "border-highlight-foreground/20" : "border-border",
        )}
      >
        {children}
      </div>
    </div>
  );
}


const sevTone = (s: string) =>
  s === "critical" || s === "CRITICAL"
    ? "critical"
    : s === "high" || s === "HIGH"
      ? "suspicious"
      : s === "medium" || s === "MEDIUM"
        ? "info"
        : "muted";

function Dashboard() {
  const [query, setQuery] = useState("");
  const [agent, setAgent] = useState<Agent | null>(null);
  const [incident, setIncident] = useState<Incident | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return agents;
    return agents.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.status.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q),
    );
  }, [query]);

  const maxRisk = Math.max(...riskDistribution.map((r) => r.value));

  return (
    <AppShell title="Agent Fleet" breadcrumb="Security / Agent Fleet" query={query} onQuery={setQuery}>
      <PageHeader
        title="Agent Fleet"
        subtitle="Real-time security and behavioral health across autonomous AI agents."
        actions={
          <>
            <Btn variant="primary">
              <Plus className="size-3.5" /> Register Agent
            </Btn>
            <Btn>
              <Download className="size-3.5" /> Export Report
            </Btn>
          </>
        }
      />

      <div className="space-y-4 px-4 pb-6 sm:px-7 sm:pb-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Kpi value="24" label="Agents" caption="Active agent fleet">
            <div className="flex items-center justify-between">
              <span className="text-healthy">Healthy fleet coverage</span>
              <span className="text-muted-foreground">+3 this week</span>
            </div>
          </Kpi>
          <Kpi value="7" label="Active Threats" caption="Requires investigation" accent>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Dot tone="critical" /> 3 Critical
              </span>
              <span className="flex items-center gap-1.5">
                <Dot tone="suspicious" /> 4 Medium
              </span>
            </div>
          </Kpi>
          <Kpi value="2" label="Quarantined" caption="Agents isolated">
            <span className="text-muted-foreground">1 today · 1 pending review</span>
          </Kpi>
          <Kpi value="31%" label="Overall Risk" caption="Fleet risk score">
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-secondary">
                <div className="h-1.5 w-[31%] rounded-full bg-suspicious" />
              </div>
              <span className="text-suspicious">Elevated</span>
            </div>
          </Kpi>
        </div>


        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <Panel
              title="Agent Fleet Health"
              subtitle="Behavioral status across monitored agents."
              action={
                <span className="text-[11px] text-muted-foreground">
                  {filtered.length} of {agents.length} agents
                </span>
              }
              bodyClassName=""
            >
              <AgentTable data={filtered} onSelect={setAgent} selectedId={agent?.id} />
            </Panel>

            <Panel
              title="Live Security Events"
              subtitle="Streaming agent telemetry from the last hour."
              bodyClassName="divide-y divide-border/70"
            >
              {events.map((e) => (
                <div
                  key={e.time}
                  className="flex items-center gap-4 px-4 py-2.5 transition-colors hover:bg-accent/40"
                >
                  <span className="tabular w-16 font-mono text-[11.5px] text-muted-foreground">
                    {e.time}
                  </span>
                  <Dot tone={sevTone(e.severity)} />
                  <span className="text-[12.5px] text-foreground">{e.title}</span>
                  <span className="ml-auto text-[11.5px] text-muted-foreground">{e.agent}</span>
                  <span
                    className={cn(
                      "w-14 text-right text-[10.5px] tracking-wider",
                      toneText(sevTone(e.severity)),
                    )}
                  >
                    {e.severity.toUpperCase()}
                  </span>
                </div>
              ))}
            </Panel>

            <Panel title="Recommended Actions" subtitle="Prioritized by risk score and blast radius.">
              <div className="space-y-2">
                {[
                  {
                    n: 1,
                    title: "Review Finance Assistant",
                    desc: "Unusual database write behavior detected.",
                    cta: "Review",
                    inc: incidents[1]!,
                  },
                  {
                    n: 2,
                    title: "Investigate File Operations Agent",
                    desc: "Critical behavioral deviation detected.",
                    cta: "Investigate",
                    inc: incidents[0]!,
                  },
                ].map((r) => (
                  <div
                    key={r.n}
                    className="flex items-center gap-3 rounded-sm border border-border bg-background px-3 py-2.5"
                  >
                    <span className="tabular text-[11.5px] text-muted-foreground">{r.n}.</span>
                    <div>
                      <div className="text-[12.5px] text-foreground">{r.title}</div>
                      <div className="text-[11.5px] text-muted-foreground">{r.desc}</div>
                    </div>
                    <Btn className="ml-auto" onClick={() => setIncident(r.inc)}>
                      {r.cta}
                    </Btn>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <div className="space-y-4">
            <Panel title="Threat Activity" subtitle="Open incidents by severity.">
              <div className="flex items-baseline gap-2">
                <span className="tabular text-[26px] leading-none font-light text-foreground">7</span>
                <span className="text-[12px] text-muted-foreground">Active Threats</span>
              </div>
              <div className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full">
                <div className="h-full bg-critical" style={{ width: "28.5%" }} />
                <div className="h-full bg-suspicious" style={{ width: "43%" }} />
                <div className="h-full bg-info" style={{ width: "28.5%" }} />
              </div>
              <div className="mt-3 space-y-1.5">
                {[
                  ["Critical", 2, "critical"],
                  ["High", 3, "suspicious"],
                  ["Medium", 2, "info"],
                ].map(([label, n, tone]) => (
                  <div key={label as string} className="flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Dot tone={tone as "critical"} /> {label}
                    </span>
                    <span className="tabular text-foreground">{n}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-border pt-3">
                <div className="label-xs">Latest Detection</div>
                <div className="mt-1.5 text-[12.5px] text-foreground">
                  Unauthorized tool invocation
                </div>
                <div className="mt-2 space-y-1 text-[11.5px] text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Agent</span>
                    <span className="text-foreground">Finance Assistant</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk</span>
                    <span className="tabular text-critical">82 / 100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Detected</span>
                    <span className="text-foreground">34 seconds ago</span>
                  </div>
                </div>
                <Btn
                  variant="primary"
                  className="mt-3 w-full"
                  onClick={() => setIncident(incidents[1]!)}
                >
                  Investigate <ArrowUpRight className="size-3.5" />
                </Btn>
              </div>
            </Panel>

            <Panel title="Fleet Risk Distribution" subtitle="24 monitored agents.">
              <div className="space-y-2.5">
                {riskDistribution.map((r) => (
                  <div key={r.label} className="flex items-center gap-3">
                    <span className="w-[74px] text-[11.5px] text-muted-foreground">{r.label}</span>
                    <div className="h-2 flex-1 bg-secondary">
                      <div
                        className={cn(
                          "h-2",
                          r.tone === "healthy" && "bg-healthy",
                          r.tone === "info" && "bg-info",
                          r.tone === "suspicious" && "bg-suspicious",
                          r.tone === "critical" && "bg-critical",
                        )}
                        style={{ width: `${(r.value / maxRisk) * 100}%` }}
                      />
                    </div>
                    <span className="tabular w-5 text-right text-[12px] text-foreground">
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Telemetry Backbone">
              <div className="space-y-1.5 text-[11.5px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data source</span>
                  <span className="text-foreground">Elasticsearch</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="flex items-center gap-1.5 text-healthy">
                    <Dot tone="healthy" /> Connected
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Indexed traces</span>
                  <span className="tabular text-foreground">1.84M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last indexed</span>
                  <span className="text-foreground">2 sec ago</span>
                </div>
                <div className="flex justify-between border-t border-border pt-1.5">
                  <span className="text-muted-foreground">Inference</span>
                  <span className="text-foreground">Amazon Bedrock</span>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>

      <AgentDrawer agent={agent} onClose={() => setAgent(null)} />
      <IncidentDrawer incident={incident} onClose={() => setIncident(null)} />
    </AppShell>
  );
}

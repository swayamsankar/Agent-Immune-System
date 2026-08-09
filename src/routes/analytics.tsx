import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Panel } from "@/components/panel";
import { agents, riskDistribution } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Behavior Analytics — Agent Immune System" },
      {
        name: "description",
        content: "Baseline deviation, tool invocation volume and trust trends across the monitored agent fleet.",
      },
      { property: "og:title", content: "Behavior Analytics — Agent Immune System" },
      { property: "og:description", content: "Baseline deviation and trust trends across agents." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const maxCalls = Math.max(...agents.map((a) => a.toolCalls));
  const maxRisk = Math.max(...riskDistribution.map((r) => r.value));

  return (
    <AppShell title="Behavior Analytics" breadcrumb="Security / Behavior Analytics">
      <PageHeader
        title="Behavior Analytics"
        subtitle="Baseline deviation and tool invocation patterns across the fleet."
      />
      <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 xl:grid-cols-2">
        <Panel title="Tool Invocation Volume" subtitle="Calls in the last hour, per agent.">
          <div className="space-y-2">
            {agents.map((a) => (
              <div key={a.id} className="flex items-center gap-3">
                <span className="w-44 truncate text-[11.5px] text-muted-foreground">{a.name}</span>
                <div className="h-2 flex-1 bg-secondary">
                  <div
                    className={cn(
                      "h-2",
                      a.risk >= 70 ? "bg-critical" : a.risk >= 40 ? "bg-suspicious" : "bg-healthy",
                    )}
                    style={{ width: `${(a.toolCalls / maxCalls) * 100}%` }}
                  />
                </div>
                <span className="tabular w-6 text-right text-[12px] text-foreground">{a.toolCalls}</span>
              </div>
            ))}
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
                <span className="tabular w-5 text-right text-[12px] text-foreground">{r.value}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

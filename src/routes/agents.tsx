import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Panel, Btn } from "@/components/panel";
import { AgentTable } from "@/components/agent-table";
import { AgentDrawer } from "@/components/agent-drawer";
import { agents, type Agent, type AgentStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Agent Fleet Inventory — Agent Immune System" },
      {
        name: "description",
        content:
          "Full inventory of monitored autonomous agents with permission profiles, trust scores and behavioral status.",
      },
      { property: "og:title", content: "Agent Fleet Inventory — Agent Immune System" },
      {
        property: "og:description",
        content: "Every monitored agent, its permission profile, trust score and behavioral status.",
      },
    ],
  }),
  component: AgentsPage,
});

const filters: (AgentStatus | "ALL")[] = ["ALL", "HEALTHY", "SUSPICIOUS", "COMPROMISED", "QUARANTINED"];

function AgentsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof filters)[number]>("ALL");
  const [agent, setAgent] = useState<Agent | null>(null);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return agents.filter(
      (a) =>
        (status === "ALL" || a.status === status) &&
        (!q || a.name.toLowerCase().includes(q) || a.type.toLowerCase().includes(q)),
    );
  }, [query, status]);

  return (
    <AppShell title="Agent Fleet" breadcrumb="Security / Agent Fleet / Inventory" query={query} onQuery={setQuery}>
      <PageHeader
        title="Agent Inventory"
        subtitle="All registered agents, permission profiles and behavioral baselines."
      />
      <div className="p-4 sm:p-6">
        <Panel
          title="Registered Agents"
          subtitle="Click a row to open the agent execution trace."
          action={
            <div className="flex gap-1">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setStatus(f)}
                  className={cn(
                    "rounded-sm border px-2 py-1 text-[10.5px] tracking-wider transition-colors",
                    status === f
                      ? "border-info/50 bg-info/12 text-info"
                      : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          }
          bodyClassName=""
        >
          <AgentTable data={data} onSelect={setAgent} selectedId={agent?.id} />
          {data.length === 0 && (
            <div className="px-4 py-10 text-center text-[12.5px] text-muted-foreground">
              No agents match the current filter.
            </div>
          )}
        </Panel>
        <div className="mt-4 flex justify-end">
          <Btn>Export Inventory</Btn>
        </div>
      </div>
      <AgentDrawer agent={agent} onClose={() => setAgent(null)} />
    </AppShell>
  );
}

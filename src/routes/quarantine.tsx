import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Panel, Btn } from "@/components/panel";
import { AgentTable } from "@/components/agent-table";
import { AgentDrawer } from "@/components/agent-drawer";
import { agents, type Agent } from "@/lib/mock-data";

export const Route = createFileRoute("/quarantine")({
  head: () => ({
    meta: [
      { title: "Quarantine — Agent Immune System" },
      {
        name: "description",
        content: "Isolated agents held for manual security review, with containment history and release controls.",
      },
      { property: "og:title", content: "Quarantine — Agent Immune System" },
      { property: "og:description", content: "Isolated agents held for manual security review." },
    ],
  }),
  component: QuarantinePage,
});

function QuarantinePage() {
  const [agent, setAgent] = useState<Agent | null>(null);
  const data = agents.filter((a) => a.status === "QUARANTINED");

  return (
    <AppShell title="Quarantine" breadcrumb="Security / Quarantine">
      <PageHeader
        title="Quarantine"
        subtitle="Agents isolated from production tools pending manual review."
        actions={<Btn>Export Containment Log</Btn>}
      />
      <div className="p-4 sm:p-6">
        <Panel title="Isolated Agents" subtitle="Tool access revoked at the gateway." bodyClassName="">
          <AgentTable data={data} onSelect={setAgent} selectedId={agent?.id} />
        </Panel>
      </div>
      <AgentDrawer agent={agent} onClose={() => setAgent(null)} />
    </AppShell>
  );
}

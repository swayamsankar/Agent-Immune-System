import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Panel, Btn } from "@/components/panel";
import { Dot } from "@/components/status";
import { investigations } from "@/lib/mock-data";

export const Route = createFileRoute("/investigations")({
  head: () => ({
    meta: [
      { title: "Investigations — Agent Immune System" },
      {
        name: "description",
        content:
          "Active and closed security investigations into agent behavioral anomalies, with analyst ownership and linked incidents.",
      },
      { property: "og:title", content: "Investigations — Agent Immune System" },
      {
        property: "og:description",
        content: "Analyst-owned investigations into agent behavioral anomalies.",
      },
    ],
  }),
  component: InvestigationsPage,
});

function InvestigationsPage() {
  const [query, setQuery] = useState("");
  const data = investigations.filter((i) =>
    i.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <AppShell
      title="Investigations"
      breadcrumb="Security / Investigations"
      query={query}
      onQuery={setQuery}
    >
      <PageHeader
        title="Investigations"
        subtitle="Analyst-owned cases assembled from correlated security events."
        actions={<Btn variant="primary">Open Case</Btn>}
      />
      <div className="p-4 sm:p-6">
        <Panel title="Case Queue" subtitle="Sorted by most recent activity." bodyClassName="divide-y divide-border/70">
          {data.map((i) => (
            <div
              key={i.id}
              className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/40"
            >
              <span className="font-mono text-[11.5px] text-muted-foreground">{i.id}</span>
              <Dot
                tone={i.status === "Active" ? "critical" : i.status === "Closed" ? "muted" : "suspicious"}
              />
              <div>
                <div className="text-[13px] text-foreground">{i.title}</div>
                <div className="text-[11.5px] text-muted-foreground">
                  {i.incidents} linked incident{i.incidents > 1 ? "s" : ""} · opened {i.opened}
                </div>
              </div>
              <span className="ml-auto text-[11.5px] text-muted-foreground">{i.analyst}</span>
              <span className="w-28 text-right text-[11.5px] text-foreground">{i.status}</span>
              <Btn>Open</Btn>
            </div>
          ))}
        </Panel>
      </div>
    </AppShell>
  );
}

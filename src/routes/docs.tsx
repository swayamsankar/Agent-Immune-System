import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Panel } from "@/components/panel";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — Agent Immune System" },
      {
        name: "description",
        content: "Reference for agent telemetry ingestion, risk scoring, permission profiles and containment APIs.",
      },
      { property: "og:title", content: "Documentation — Agent Immune System" },
      { property: "og:description", content: "Telemetry ingestion, risk scoring and containment reference." },
    ],
  }),
  component: DocsPage,
});

const sections: [string, string][] = [
  ["Agent telemetry", "Emit execution traces and tool invocations to the ingest endpoint."],
  ["Behavior baseline", "How a 30-day rolling baseline is computed per agent and per tool."],
  ["Risk score", "Weighted model combining deviation, permission scope and blast radius."],
  ["Permission profile", "Declaring the allowed tool surface for each registered agent."],
  ["Containment", "Quarantine semantics and gateway-level tool revocation."],
  ["Audit trail", "Append-only event schema and Elasticsearch index mapping."],
];

function DocsPage() {
  return (
    <AppShell title="Documentation" breadcrumb="Security / Documentation">
      <PageHeader title="Documentation" subtitle="Platform reference for security engineers." />
      <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-2 xl:grid-cols-3">
        {sections.map(([title, desc]) => (
          <Panel key={title}>
            <div className="text-[13px] text-foreground">{title}</div>
            <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">{desc}</p>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}

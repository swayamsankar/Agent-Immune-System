import { Drawer, DrawerSection, Field } from "@/components/drawer";
import { Btn } from "@/components/panel";
import { Dot, StatusLabel, riskTone, toneText } from "@/components/status";
import type { Agent } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function AgentDrawer({ agent, onClose }: { agent: Agent | null; onClose: () => void }) {
  return (
    <Drawer
      open={!!agent}
      onClose={onClose}
      eyebrow={agent ? `${agent.id} · Agent detail` : "Agent detail"}
      title={agent?.name ?? ""}
    >
      {agent && (
        <>
          <DrawerSection title="Status">
            <div className="flex items-center justify-between">
              <StatusLabel status={agent.status} />
              <span className={cn("tabular text-[20px]", toneText(riskTone(agent.risk)))}>
                {agent.risk}
                <span className="text-[12px] text-muted-foreground"> / 100</span>
              </span>
            </div>
            <div className="mt-3 h-1 w-full rounded-full bg-secondary">
              <div
                className={cn(
                  "h-1 rounded-full",
                  riskTone(agent.risk) === "critical"
                    ? "bg-critical"
                    : riskTone(agent.risk) === "suspicious"
                      ? "bg-suspicious"
                      : "bg-healthy",
                )}
                style={{ width: `${agent.risk}%` }}
              />
            </div>
            <div className="mt-2 divide-y divide-border">
              <Field label="Agent type">{agent.type}</Field>
              <Field label="Last activity">{agent.lastActivity}</Field>
              <Field label="Tool calls (1h)">{agent.toolCalls}</Field>
              <Field label="Agent trust">{agent.trust}%</Field>
            </div>
          </DrawerSection>

          <DrawerSection title="Recent tool calls">
            <ul className="space-y-1">
              {agent.toolTrace.map((t) => (
                <li
                  key={t.name}
                  className={cn(
                    "flex items-center justify-between rounded-sm border px-2.5 py-1.5 font-mono text-[12px]",
                    t.flagged
                      ? "border-critical/40 bg-critical/8 text-critical"
                      : "border-border bg-background text-muted-foreground",
                  )}
                >
                  {t.name}
                  {t.flagged && <span className="text-[10px] tracking-wider">FLAGGED</span>}
                </li>
              ))}
            </ul>
          </DrawerSection>

          <DrawerSection title="Behavioral anomalies">
            {agent.anomalies.length === 0 ? (
              <p className="text-[12.5px] text-muted-foreground">
                No anomalies in the current trace window.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {agent.anomalies.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-[12.5px] text-foreground">
                    <Dot tone={agent.status === "COMPROMISED" ? "critical" : "suspicious"} className="mt-1.5" />
                    {a}
                  </li>
                ))}
              </ul>
            )}
          </DrawerSection>

          <DrawerSection title="AI assessment">
            <p className="text-[12.5px] leading-relaxed text-foreground">"{agent.assessment}"</p>
            <div className="mt-2.5 flex items-center justify-between text-[11.5px] text-muted-foreground">
              <span>Amazon Bedrock · analysis complete</span>
              <span className="tabular text-foreground">Confidence {agent.confidence}%</span>
            </div>
          </DrawerSection>

          <div className="flex flex-wrap gap-2 p-4">
            <Btn variant="primary">Investigate Incident</Btn>
            <Btn>Restrict Tools</Btn>
            <Btn variant="danger">Quarantine Agent</Btn>
          </div>
        </>
      )}
    </Drawer>
  );
}

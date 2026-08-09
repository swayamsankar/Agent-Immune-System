import { Drawer, DrawerSection, Field } from "@/components/drawer";
import { Btn } from "@/components/panel";
import { toneText } from "@/components/status";
import type { Incident } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const sevTone = (s: Incident["severity"]) =>
  s === "CRITICAL" ? "critical" : s === "HIGH" ? "suspicious" : "info";

export function IncidentDrawer({
  incident,
  onClose,
}: {
  incident: Incident | null;
  onClose: () => void;
}) {
  return (
    <Drawer
      open={!!incident}
      onClose={onClose}
      eyebrow={incident ? `INCIDENT #${incident.id}` : "Incident"}
      title={incident?.threat ?? ""}
    >
      {incident && (
        <>
          <DrawerSection title="Summary">
            <div className="divide-y divide-border">
              <Field label="Agent">{incident.agent}</Field>
              <Field label="Risk">
                <span className={cn("tabular", toneText(sevTone(incident.severity)))}>
                  {incident.risk} / 100
                </span>
              </Field>
              <Field label="Severity">
                <span className={cn("tracking-wider text-[11px]", toneText(sevTone(incident.severity)))}>
                  {incident.severity}
                </span>
              </Field>
              <Field label="Detected">{incident.detected}</Field>
              <Field label="Status">{incident.status}</Field>
            </div>
          </DrawerSection>

          <DrawerSection title="Evidence">
            <ol className="space-y-1.5">
              {incident.evidence.map((e, i) => (
                <li key={e} className="flex gap-2.5 text-[12.5px] text-foreground">
                  <span className="tabular text-muted-foreground">{i + 1}.</span>
                  {e}
                </li>
              ))}
            </ol>
          </DrawerSection>

          <DrawerSection title="AI investigation · Amazon Bedrock">
            <div className="mb-2 flex items-center justify-between text-[11.5px]">
              <span className="flex items-center gap-1.5 text-healthy">
                <span className="inline-block size-1.5 rounded-full bg-healthy" />
                Analysis complete
              </span>
              <span className="tabular text-muted-foreground">
                Confidence <span className="text-foreground">{incident.confidence}%</span>
              </span>
            </div>
            <p className="text-[12.5px] leading-relaxed text-foreground">"{incident.explanation}"</p>
          </DrawerSection>

          <DrawerSection title="Recommended action">
            <span
              className={cn(
                "inline-flex rounded-sm border px-2 py-1 text-[11px] tracking-[0.1em]",
                incident.severity === "CRITICAL"
                  ? "border-critical/40 bg-critical/10 text-critical"
                  : "border-suspicious/40 bg-suspicious/10 text-suspicious",
              )}
            >
              {incident.recommended}
            </span>
          </DrawerSection>

          <div className="flex flex-wrap gap-2 p-4">
            <Btn variant="danger">Quarantine Agent</Btn>
            <Btn>View Evidence</Btn>
            <Btn variant="ghost">Dismiss</Btn>
          </div>
        </>
      )}
    </Drawer>
  );
}

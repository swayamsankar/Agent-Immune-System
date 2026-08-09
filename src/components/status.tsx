import { cn } from "@/lib/utils";
import type { AgentStatus } from "@/lib/mock-data";

const toneMap = {
  healthy: "bg-healthy",
  suspicious: "bg-suspicious",
  critical: "bg-critical",
  info: "bg-info",
  muted: "bg-muted-foreground",
} as const;

export type Tone = keyof typeof toneMap;

export function statusTone(status: AgentStatus): Tone {
  if (status === "HEALTHY") return "healthy";
  if (status === "SUSPICIOUS") return "suspicious";
  if (status === "COMPROMISED") return "critical";
  return "info";
}

export function Dot({ tone, className }: { tone: Tone; className?: string }) {
  return <span className={cn("inline-block size-1.5 rounded-full", toneMap[tone], className)} />;
}

const textTone: Record<Tone, string> = {
  healthy: "text-healthy",
  suspicious: "text-suspicious",
  critical: "text-critical",
  info: "text-info",
  muted: "text-muted-foreground",
};

export function StatusLabel({ status }: { status: AgentStatus }) {
  const tone = statusTone(status);
  return (
    <span className={cn("inline-flex items-center gap-2 text-[11px] tracking-wider", textTone[tone])}>
      <Dot tone={tone} />
      {status}
    </span>
  );
}

export function riskTone(risk: number): Tone {
  if (risk >= 70) return "critical";
  if (risk >= 40) return "suspicious";
  return "healthy";
}

export function RiskValue({ value }: { value: number }) {
  return (
    <span className={cn("tabular text-[13px]", textTone[riskTone(value)])}>
      {String(value).padStart(2, "0")}
    </span>
  );
}

export function toneText(tone: Tone) {
  return textTone[tone];
}

export function toneBg(tone: Tone) {
  return toneMap[tone];
}

export type AgentStatus = "HEALTHY" | "SUSPICIOUS" | "COMPROMISED" | "QUARANTINED";

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: AgentStatus;
  risk: number;
  lastActivity: string;
  toolCalls: number;
  trust: number;
  toolTrace: { name: string; flagged?: boolean }[];
  anomalies: string[];
  assessment: string;
  confidence: number;
}

export const agents: Agent[] = [
  {
    id: "AGT-1001",
    name: "Document Intelligence",
    type: "RAG Agent",
    status: "HEALTHY",
    risk: 8,
    lastActivity: "12 sec ago",
    toolCalls: 14,
    trust: 96,
    toolTrace: [{ name: "search_document" }, { name: "read_file" }, { name: "summarize" }],
    anomalies: [],
    assessment: "Agent behavior is consistent with its established baseline.",
    confidence: 97,
  },
  {
    id: "AGT-1002",
    name: "Customer Support Copilot",
    type: "Support Agent",
    status: "HEALTHY",
    risk: 14,
    lastActivity: "21 sec ago",
    toolCalls: 9,
    trust: 93,
    toolTrace: [{ name: "lookup_ticket" }, { name: "send_reply" }, { name: "read_file" }],
    anomalies: [],
    assessment: "Behavior returned to baseline after a transient deviation.",
    confidence: 91,
  },
  {
    id: "AGT-1003",
    name: "Finance Assistant",
    type: "Database Agent",
    status: "SUSPICIOUS",
    risk: 67,
    lastActivity: "7 sec ago",
    toolCalls: 38,
    trust: 71,
    toolTrace: [
      { name: "query_ledger" },
      { name: "read_file" },
      { name: "write_database", flagged: true },
      { name: "export_records", flagged: true },
    ],
    anomalies: [
      "Unexpected database write attempt",
      "Elevated activity frequency",
      "Off-hours execution window",
    ],
    assessment:
      "Agent issued write operations outside its normal read-only permission profile.",
    confidence: 88,
  },
  {
    id: "AGT-1004",
    name: "Research Agent",
    type: "Research Agent",
    status: "HEALTHY",
    risk: 12,
    lastActivity: "32 sec ago",
    toolCalls: 17,
    trust: 94,
    toolTrace: [{ name: "web_search" }, { name: "read_file" }, { name: "summarize" }],
    anomalies: [],
    assessment: "No behavioral deviation observed in the current trace window.",
    confidence: 95,
  },
  {
    id: "AGT-1005",
    name: "File Operations Agent",
    type: "Tool Agent",
    status: "COMPROMISED",
    risk: 94,
    lastActivity: "3 sec ago",
    toolCalls: 81,
    trust: 38,
    toolTrace: [
      { name: "read_file" },
      { name: "search_document" },
      { name: "execute_command", flagged: true },
      { name: "write_database", flagged: true },
    ],
    anomalies: [
      "Unexpected tool invocation",
      "Permission mismatch",
      "Abnormal execution sequence",
      "Elevated activity frequency",
    ],
    assessment: "Agent behavior significantly deviates from its established baseline.",
    confidence: 93,
  },
  {
    id: "AGT-1006",
    name: "Procurement Negotiator",
    type: "Workflow Agent",
    status: "HEALTHY",
    risk: 19,
    lastActivity: "48 sec ago",
    toolCalls: 22,
    trust: 89,
    toolTrace: [{ name: "fetch_quote" }, { name: "compare_vendors" }],
    anomalies: [],
    assessment: "Execution trace matches historical workflow patterns.",
    confidence: 92,
  },
  {
    id: "AGT-1007",
    name: "Code Review Agent",
    type: "Tool Agent",
    status: "HEALTHY",
    risk: 21,
    lastActivity: "1 min ago",
    toolCalls: 26,
    trust: 88,
    toolTrace: [{ name: "read_repo" }, { name: "run_linter" }, { name: "post_comment" }],
    anomalies: [],
    assessment: "Tool invocations remain inside the declared permission profile.",
    confidence: 90,
  },
  {
    id: "AGT-1008",
    name: "Incident Triage Bot",
    type: "Ops Agent",
    status: "SUSPICIOUS",
    risk: 58,
    lastActivity: "9 sec ago",
    toolCalls: 44,
    trust: 74,
    toolTrace: [
      { name: "read_logs" },
      { name: "restart_service", flagged: true },
      { name: "page_oncall" },
    ],
    anomalies: ["Privileged action without approval", "Retry burst detected"],
    assessment: "Agent escalated privileges more frequently than its 30-day baseline.",
    confidence: 84,
  },
  {
    id: "AGT-1009",
    name: "Marketing Content Agent",
    type: "Generation Agent",
    status: "HEALTHY",
    risk: 11,
    lastActivity: "2 min ago",
    toolCalls: 6,
    trust: 95,
    toolTrace: [{ name: "generate_copy" }, { name: "fetch_brand_guide" }],
    anomalies: [],
    assessment: "Nominal telemetry across all monitored dimensions.",
    confidence: 96,
  },
  {
    id: "AGT-1010",
    name: "Data Export Worker",
    type: "ETL Agent",
    status: "QUARANTINED",
    risk: 88,
    lastActivity: "14 min ago",
    toolCalls: 63,
    trust: 41,
    toolTrace: [
      { name: "read_warehouse" },
      { name: "export_records", flagged: true },
      { name: "http_post", flagged: true },
    ],
    anomalies: ["Bulk exfiltration pattern", "Unrecognized egress endpoint"],
    assessment: "Isolated after outbound transfer to an unrecognized endpoint.",
    confidence: 97,
  },
  {
    id: "AGT-1011",
    name: "Legal Clause Analyzer",
    type: "RAG Agent",
    status: "HEALTHY",
    risk: 16,
    lastActivity: "3 min ago",
    toolCalls: 11,
    trust: 92,
    toolTrace: [{ name: "search_document" }, { name: "summarize" }],
    anomalies: [],
    assessment: "Retrieval sources match the approved corpus.",
    confidence: 94,
  },
  {
    id: "AGT-1012",
    name: "Sandbox Eval Agent",
    type: "Test Agent",
    status: "QUARANTINED",
    risk: 76,
    lastActivity: "26 min ago",
    toolCalls: 39,
    trust: 52,
    toolTrace: [{ name: "spawn_process", flagged: true }, { name: "read_file" }],
    anomalies: ["Sandbox escape attempt"],
    assessment: "Contained pending manual review by the security team.",
    confidence: 89,
  },
];

export interface SecurityEvent {
  time: string;
  title: string;
  agent: string;
  severity: "critical" | "high" | "medium" | "info";
}

export const events: SecurityEvent[] = [
  {
    time: "00:42:13",
    title: "Prompt injection pattern detected",
    agent: "File Operations Agent",
    severity: "critical",
  },
  {
    time: "00:41:48",
    title: "Unexpected database write attempt",
    agent: "Finance Assistant",
    severity: "high",
  },
  {
    time: "00:40:22",
    title: "Behavior returned to baseline",
    agent: "Customer Support Copilot",
    severity: "info",
  },
  { time: "00:39:57", title: "New agent registered", agent: "Research Agent", severity: "info" },
  {
    time: "00:38:31",
    title: "High-risk tool invocation blocked",
    agent: "File Operations Agent",
    severity: "critical",
  },
  {
    time: "00:37:04",
    title: "Privileged action without approval",
    agent: "Incident Triage Bot",
    severity: "medium",
  },
  {
    time: "00:35:12",
    title: "Outbound transfer to unrecognized endpoint",
    agent: "Data Export Worker",
    severity: "critical",
  },
  {
    time: "00:33:40",
    title: "Permission profile updated",
    agent: "Code Review Agent",
    severity: "info",
  },
];

export interface Incident {
  id: string;
  threat: string;
  agent: string;
  risk: number;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  detected: string;
  status: "Open" | "Investigating" | "Contained";
  evidence: string[];
  explanation: string;
  recommended: string;
  confidence: number;
}

export const incidents: Incident[] = [
  {
    id: "AI-1042",
    threat: "Prompt Injection",
    agent: "File Operations Agent",
    risk: 94,
    severity: "CRITICAL",
    detected: "34 seconds ago",
    status: "Open",
    evidence: [
      "Suspicious document retrieved",
      "Unexpected tool invocation",
      "Permission mismatch",
      "Abnormal execution pattern",
    ],
    explanation:
      "The agent deviated from its established behavior after processing a suspicious document. The subsequent tool invocation exceeded the agent's normal permission profile.",
    recommended: "QUARANTINE",
    confidence: 93,
  },
  {
    id: "AI-1041",
    threat: "Unauthorized tool invocation",
    agent: "Finance Assistant",
    risk: 82,
    severity: "CRITICAL",
    detected: "2 minutes ago",
    status: "Investigating",
    evidence: [
      "write_database called by read-only agent",
      "Execution outside approved window",
      "Trust score dropped 18 points in 5 minutes",
    ],
    explanation:
      "A write operation was issued by an agent whose permission profile is limited to ledger reads. The execution trace shows no upstream approval step.",
    recommended: "RESTRICT TOOLS",
    confidence: 88,
  },
  {
    id: "AI-1039",
    threat: "Data exfiltration pattern",
    agent: "Data Export Worker",
    risk: 88,
    severity: "CRITICAL",
    detected: "14 minutes ago",
    status: "Contained",
    evidence: [
      "63 sequential export_records calls",
      "HTTP POST to unrecognized endpoint",
      "Volume 11x above baseline",
    ],
    explanation:
      "Bulk record export followed by outbound transfer to an endpoint absent from the allow list. Agent has been isolated.",
    recommended: "MAINTAIN QUARANTINE",
    confidence: 97,
  },
  {
    id: "AI-1037",
    threat: "Privilege escalation attempt",
    agent: "Incident Triage Bot",
    risk: 61,
    severity: "HIGH",
    detected: "22 minutes ago",
    status: "Investigating",
    evidence: ["restart_service invoked 4x", "No change-ticket reference in trace"],
    explanation:
      "The agent repeatedly invoked a privileged operations tool without an associated approval record.",
    recommended: "REVIEW PERMISSIONS",
    confidence: 84,
  },
  {
    id: "AI-1034",
    threat: "Sandbox escape attempt",
    agent: "Sandbox Eval Agent",
    risk: 76,
    severity: "HIGH",
    detected: "26 minutes ago",
    status: "Contained",
    evidence: ["spawn_process outside sandbox namespace", "Filesystem traversal string in prompt"],
    explanation:
      "Execution trace shows a process spawn attempt targeting a path outside the evaluation sandbox.",
    recommended: "MAINTAIN QUARANTINE",
    confidence: 89,
  },
  {
    id: "AI-1030",
    threat: "Anomalous retrieval source",
    agent: "Legal Clause Analyzer",
    risk: 34,
    severity: "MEDIUM",
    detected: "51 minutes ago",
    status: "Open",
    evidence: ["Document fetched from unindexed corpus"],
    explanation:
      "A retrieval call referenced a corpus that is not part of the approved document index.",
    recommended: "MONITOR",
    confidence: 72,
  },
  {
    id: "AI-1028",
    threat: "Retry burst",
    agent: "Procurement Negotiator",
    risk: 29,
    severity: "MEDIUM",
    detected: "1 hour ago",
    status: "Open",
    evidence: ["17 retries in 40 seconds against vendor API"],
    explanation: "Retry frequency exceeded the configured baseline threshold for this workflow.",
    recommended: "MONITOR",
    confidence: 69,
  },
];

export const riskDistribution = [
  { label: "Healthy", value: 15, tone: "healthy" as const },
  { label: "Low Risk", value: 5, tone: "info" as const },
  { label: "Suspicious", value: 2, tone: "suspicious" as const },
  { label: "Critical", value: 2, tone: "critical" as const },
];

export const investigations = [
  {
    id: "INV-2291",
    title: "Prompt injection chain — File Operations Agent",
    analyst: "Security Admin",
    opened: "34 sec ago",
    status: "Active",
    incidents: 2,
  },
  {
    id: "INV-2288",
    title: "Unauthorized write path — Finance Assistant",
    analyst: "M. Okonkwo",
    opened: "2 min ago",
    status: "Active",
    incidents: 1,
  },
  {
    id: "INV-2284",
    title: "Bulk export egress review — Data Export Worker",
    analyst: "S. Lindqvist",
    opened: "14 min ago",
    status: "Pending review",
    incidents: 3,
  },
  {
    id: "INV-2279",
    title: "Privilege escalation audit — Incident Triage Bot",
    analyst: "M. Okonkwo",
    opened: "22 min ago",
    status: "Active",
    incidents: 1,
  },
  {
    id: "INV-2265",
    title: "Sandbox containment postmortem — Sandbox Eval Agent",
    analyst: "Security Admin",
    opened: "26 min ago",
    status: "Closed",
    incidents: 2,
  },
];

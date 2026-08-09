<div align="center">

# 🛡️ Agent Immune System

### Protecting AI agents before they become a threat.

**Observe · Detect · Explain · Respond**

An AI security and observability platform for autonomous enterprise AI agents — built for the hackathon, designed for production.

[![Status](https://img.shields.io/badge/status-prototype-orange)](#-project-status)
[![Elasticsearch](https://img.shields.io/badge/Elasticsearch-Telemetry%20%26%20Evidence-005571)](#-why-elasticsearch)
[![Amazon Bedrock](https://img.shields.io/badge/Amazon%20Bedrock-Reasoning%20Layer-FF9900)](#-why-amazon-bedrock)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB)](#-technology-stack)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)](#-technology-stack)

[Overview](#-overview) • [Architecture](#%EF%B8%8F-architecture) • [How It Works](#-how-it-works) • [Tech Stack](#-technology-stack) • [Getting Started](#-getting-started) • [Roadmap](#-roadmap) • [Team](#-team)

</div>

---

## 📌 Project Status

> **This repository contains a hackathon prototype, not a production release.**
> There is currently no hosted live demo — the codebase, architecture, and setup instructions below are the authoritative source for evaluating the project. Detection logic, risk scores, and quarantine actions are simulated for demonstration purposes. See [Limitations](#%EF%B8%8F-limitations) for full disclosure.

| | |
|---|---|
| 🔗 **Source Code** | You are here — see [Getting Started](#-getting-started) to run it locally |
| 🌐 **Live Prototype Demo** | https://swayamsankar-agent-immune-system.swayamsankar259.workers.dev/audit |
| 🎥 **Demo Video** | Coming soon |
| 📦 **Release** | Pre-release / hackathon build |

---

## 🎯 Overview

Traditional observability asks: *"Is the application healthy?"*
Traditional security asks: *"Is the infrastructure under attack?"*

**Agent Immune System asks a different question:**

> ### "Is the AI agent behaving normally?"

As enterprises deploy autonomous AI agents with access to documents, APIs, databases, and internal tools, agent *behavior* itself has become a blind spot. A wrong answer is a quality problem. An agent that silently starts calling tools outside its permission profile, writing to a database it's never touched before, or leaking sensitive data is a **security** problem — and today, almost nothing is watching for it.

Agent Immune System treats AI-agent behavior as a first-class stream of enterprise telemetry, continuously observing agent activity, detecting deviations from an established behavioral baseline, investigating suspicious activity with evidence, explaining *why* an agent was flagged, and initiating controlled response actions — from a soft alert to a full quarantine.

<details>
<summary><b>🚨 The problem, in one picture</b></summary>

**Normal agent behavior**

```
User request → Search documents → Read relevant info → Generate response → Stop
```

**Compromised agent behavior**

```
Malicious document → Prompt injection → Agent changes behavior
  → Unexpected tool call → Sensitive file access → Database operation
  → Potential data leakage
```

Traditional monitoring only reveals the *final* failure. It can't tell you what triggered the change, which document influenced the agent, which tool was invoked, or when the deviation began. Agent Immune System is built to answer exactly those questions.

</details>

---

## 💡 The Solution

Agent Immune System wraps every agent in a continuous security loop:

```
OBSERVE → DETECT → INVESTIGATE → EXPLAIN → RESPOND
```

| Stage | What it does |
|---|---|
| **Observe** | Captures structured telemetry from every AI agent action |
| **Detect** | Flags behavior that deviates from the agent's normal baseline |
| **Investigate** | Retrieves the surrounding evidence for the suspicious event |
| **Explain** | Uses an AI reasoning layer to determine *why* the behavior is suspicious |
| **Respond** | Alerts security teams or applies controlled restriction/quarantine |

### 🧠 What makes it different

Most AI security tooling asks *"can we detect a malicious prompt?"* Agent Immune System asks *"can we continuously tell whether an agent is behaving like itself?"* — which means it catches **combinations** of signals, not just individual attack patterns.

```
Normal:      Search → Retrieve → Answer
Suspicious:  Search → Retrieve → Unexpected Tool → Database Write
```

Neither `Unexpected Tool` nor `Database Write` looks malicious in isolation. The *sequence* is what gives it away — and that's the central idea behind behavioral security for AI agents.

---

## 🏢 Enterprise Use Case

A typical enterprise runs a fleet of agents, each with different tools, permissions, data access, and risk profiles:

```
Agent A → Customer Support     Agent D → IT Operations
Agent B → Finance              Agent E → Database Assistant
Agent C → Document Search      Agent F → Research
```

Agent Immune System provides **one centralized security layer** across the entire fleet, rather than bespoke monitoring per agent.

---

## 🏗️ Architecture

```
                 ENTERPRISE AI AGENTS
                         │
                         ▼
                ┌─────────────────┐
                │  Trace Collector │   (inputs, tool calls, outputs,
                └────────┬────────┘    tokens, permissions)
                         │
                         ▼
                ┌─────────────────┐
                │  Elasticsearch  │   Agent telemetry, evidence,
                │ Agent Telemetry │   behavioral history
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Behavior &      │   Baseline detection,
                │ Anomaly Engine  │   sequence analysis
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Evidence        │   Related traces, prior
                │ Retrieval       │   behavior, tool history
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Amazon Bedrock  │   Investigate, reason,
                │ Immune Agent    │   explain, recommend
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Risk + Decision │
                └────────┬────────┘
                         │
               ┌─────────┴─────────┐
               ▼                   ▼
          ALERT / RESTRICT      QUARANTINE
               │                   │
               └─────────┬─────────┘
                         ▼
                 SECURITY DASHBOARD
                 (Kibana + React)
```

### Core modules

| # | Module | Responsibility |
|---|---|---|
| 1 | **Trace Collector** | Captures structured telemetry from every agent action |
| 2 | **Elasticsearch Telemetry Store** | Indexes traces, security events, tool calls, and evidence for search & correlation |
| 3 | **Behavior & Anomaly Engine** | Builds per-agent behavioral baselines and flags deviations |
| 4 | **Evidence Retrieval Engine** | Assembles the relevant trace history around an anomaly |
| 5 | **Immune Agent (Amazon Bedrock)** | Reasons over evidence to classify threat, explain it, and score risk |
| 6 | **Response Engine** | Decides between Monitor → Alert → Restrict → Quarantine |
| 7 | **Security Dashboard** | Fleet overview, threats, investigations, quarantine status |

---

## 🔄 How It Works

### 1. Every agent action becomes telemetry

```json
{
  "agent_id": "finance-agent-07",
  "timestamp": "2026-08-09T10:42:13Z",
  "event_type": "tool_call",
  "tool": "database_query",
  "arguments": { "table": "employee_records" },
  "permission_profile": ["document_read"],
  "tokens": 1824,
  "execution_time_ms": 842,
  "status": "success"
}
```

This event is indexed into Elasticsearch, which becomes the searchable behavioral history and evidence layer for every agent — e.g. *"show every tool call Finance Agent made in the five minutes before this anomaly"* or *"find prior executions where this agent left its normal behavior pattern."*

### 2. Baselines make deviation visible

```
Normal Finance Agent                    Sudden deviation
────────────────────                    ─────────────────
Document Search                         Document Search
   ↓                                       ↓
Policy Retrieval                        Unknown Document
   ↓                                       ↓
Answer Generation                       execute_command
                                            ↓
Tool calls/session: 5                   Database Write
Token usage: ~2,000                        ↓
Database writes: 0                      Repeated Execution
External APIs: 0
```

### 3. Threat categories detected

- **Prompt Injection** — malicious content attempts to manipulate an agent
- **Unauthorized Tool Usage** — a tool invoked outside expected behavior or permission profile
- **Data Leakage** — attempts to retrieve or expose sensitive information
- **Privilege Escalation** — capability access beyond the agent's assigned role
- **Abnormal Token Usage** — sudden spikes in consumption
- **Runaway Loops** — repeated actions without expected termination
- **Suspicious Execution Sequences** — unexpected tool/action combinations
- **Reliability Drift** — outputs deviating significantly from baseline

### 4. The Immune Agent explains, it doesn't guess

Evidence — never the model's assumption — is the source of truth. Elasticsearch supplies the facts; Amazon Bedrock reasons over them.

```
Elasticsearch ──Evidence──▶ Amazon Bedrock ──▶ Investigation
                                                  ├── Threat classification
                                                  ├── Explanation
                                                  ├── Risk assessment
                                                  └── Recommended response
```

**Example output:**

```
INCIDENT #AI-1042
Agent:              File Operations Agent
Risk:                94 / 100  ·  CRITICAL
Detected Behavior:  Unauthorized tool invocation

Evidence:
  1. Suspicious document retrieved
  2. Agent behavior changed after retrieval
  3. execute_command was invoked
  4. Tool was outside normal permission profile
  5. Database write was attempted

AI Explanation:
  "The agent significantly deviated from its established behavioral
   baseline after processing a suspicious document. It subsequently
   attempted tool operations outside its normal permission profile."

Recommended Action:  QUARANTINE AGENT   (Confidence: 93%)
```

### 5. Graduated response

```
LOW RISK      → MONITOR
MEDIUM RISK   → ALERT SECURITY TEAM
HIGH RISK     → RESTRICT SUSPICIOUS TOOL
CRITICAL      → QUARANTINE AGENT
```

> The prototype uses a **controlled / simulated quarantine** rather than automatically executing destructive actions — see [Limitations](#%EF%B8%8F-limitations).

---

## 📊 Dashboard Preview

The Security Dashboard is the analyst-facing surface of the system, built to make an incident understandable without reading raw logs.

**Fleet Overview**

| Metric | Value |
|---|---|
| Agents | 24 |
| Active Threats | 7 |
| Quarantined | 2 |
| Overall Risk | 31% |

**Fleet Health**

| Agent | Type | Status | Risk | Trust |
|---|---|---|---|---|
| Document Intelligence | RAG | 🟢 Healthy | 08 | 96% |
| Customer Support Copilot | Support | 🟢 Healthy | 14 | 93% |
| Finance Assistant | Database | 🟡 Suspicious | 67 | 71% |
| Research Agent | Research | 🟢 Healthy | 12 | 94% |
| File Operations Agent | Tool Agent | 🔴 Compromised | 94 | 38% |

**Live Security Events**

```
10:42:13  Prompt injection pattern detected        File Operations Agent
10:41:48  Unexpected database write attempt        Finance Assistant
10:40:22  Behavior returned to baseline             Customer Support Copilot
10:39:57  New agent registered                      Research Agent
10:38:31  High-risk tool invocation blocked          File Operations Agent
```

**Quarantine View**

```
Agent:          File Operations Agent
Status:         QUARANTINED
Reason:         Critical behavioral deviation
Restricted:     execute_command, database_write
Investigation:  #AI-1042
```

> 📸 Screenshots will be added to `/docs/screenshots/` as the UI is finalized:
> `agent-fleet-dashboard.png` · `threat-center.png` · `investigation-view.png` · `quarantine-view.png`

---

## 🧪 Prototype Preview

The demo is built to tell one clear story, from a healthy fleet to a contained threat:


<img width="1917" height="914" alt="image" src="https://github.com/user-attachments/assets/cbc252e6-30ab-4028-b102-47bd7aa530c0" />
<img width="1918" height="911" alt="image" src="https://github.com/user-attachments/assets/1ffb5aad-0ff7-4529-a7dd-18bb2e2d61fc" />
<img width="1918" height="908" alt="image" src="https://github.com/user-attachments/assets/a3ba78d7-294c-4860-89b6-669e625a4bbc" />




### Primary screens

| Screen | Shows |
|---|---|
| **1. Agent Fleet** | 24 Agents · 7 Threats · 2 Quarantined · 31% Overall Risk |
| **2. Threat Center** | Active incidents, severity, agent, threat type, risk score, timestamp |
| **3. Investigation** | Timeline, evidence, agent behavior, AI explanation, risk score |
| **4. Quarantine** | Agent status, quarantine reason, restricted tools, linked investigation ID |

### Screenshot gallery

Screenshots will live in `/docs/screenshots/` and be linked here once the UI is finalized:

```
docs/screenshots/
├── agent-fleet-dashboard.png
├── threat-center.png
├── investigation-view.png
└── quarantine-view.png
```

**Suggested preview order for this README once images are added:**

```
Agent Immune System
        ↓
Agent Fleet Dashboard
        ↓
Threat Detection
        ↓
Investigation
        ↓
Quarantine
```



---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React | Security console |
| Styling | Tailwind CSS | UI system |
| Backend | FastAPI (Python) | APIs and orchestration |
| Search & Evidence | Elasticsearch | Telemetry storage, search, correlation |
| Semantic Retrieval | Elasticsearch kNN | Vector search for similar suspicious traces |
| Analytics | Kibana | Observability and dashboards |
| AI Reasoning | Amazon Bedrock | Supervising "Immune Agent" for investigation |
| Containers | Docker | Local, reproducible deployment |
| Source Control | GitHub | Version control |

**Planned / optional:** AWS Lambda (automated response), AWS CloudWatch (AWS-side telemetry), Redis (event queue), PostgreSQL (config metadata).

> Elasticsearch and Amazon Bedrock are intentionally kept central to the architecture — telemetry/evidence search and AI reasoning are the two pillars the whole system is built on.

---

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/agents` | List all agents in the fleet |
| `GET` | `/api/agents/{id}` | Get a single agent's profile |
| `GET` | `/api/agents/{id}/timeline` | Agent's behavioral timeline |
| `GET` | `/api/agents/{id}/risk` | Current risk score for an agent |
| `POST` | `/api/agents/{id}/quarantine` | Quarantine an agent |
| `POST` | `/api/agents/{id}/restrict-tool` | Restrict a specific tool for an agent |
| `GET` | `/api/threats` | List active threats |
| `GET` | `/api/threats/{id}` | Threat details |
| `GET` | `/api/investigations/{id}` | Full investigation record |
| `POST` | `/api/events` | Ingest a new telemetry event |
| `GET` | `/api/dashboard/metrics` | Fleet-wide dashboard metrics |

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- Python 3.10+
- Docker & Docker Compose
- Git
- An AWS account with Bedrock access (for the Immune Agent reasoning layer)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/agent-immune-system.git
cd agent-immune-system
```

### 2. Start infrastructure (Elasticsearch + Kibana)

```bash
docker compose up -d
docker ps   # verify containers are healthy
```

### 3. Configure environment variables

Copy the example file and fill in your own values — **never commit real credentials**:

```bash
cp backend/.env.example backend/.env
```

```env
ELASTICSEARCH_URL=http://localhost:9200
ELASTICSEARCH_INDEX=agent-telemetry

AWS_REGION=YOUR_AWS_REGION
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
BEDROCK_MODEL_ID=YOUR_MODEL_ID

API_URL=http://localhost:8000
```

### 4. Run the backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS / Linux

pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 5. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The dashboard will be available at `http://localhost:5173` (or the port Vite reports), with the API at `http://localhost:8000`.

### 6. Try the demo flow

1. Load the healthy demo agent fleet
2. Trigger the included malicious-document scenario
3. Watch telemetry stream into Elasticsearch
4. Watch a threat appear on the dashboard
5. Open the investigation and review the evidence timeline
6. Read the Bedrock-generated explanation and risk score
7. Quarantine the agent from the dashboard

---

## 🧪 Testing

| Area | What's verified |
|---|---|
| **Detection** | Normal, suspicious, and critical behavior patterns are correctly classified |
| **Telemetry** | Agent events are correctly captured and indexed into Elasticsearch |
| **Investigation** | Threat → evidence → AI explanation pipeline produces a complete record |
| **Response** | Risk score correctly maps to the right response action and agent status |

```bash
cd backend
pytest tests/
```

---

## 📈 Success Metrics

- **Detection accuracy** — how many simulated abnormal behaviors are caught
- **False positive rate** — how often normal behavior gets flagged
- **Investigation time** — how quickly an analyst can understand an incident
- **Evidence coverage** — how much relevant telemetry is available per investigation
- **Response time** — detection-to-response latency
- **Explainability** — does every alert ship with evidence and a reason

---

## 🔒 Security Principles

- **Least Privilege** — agents only receive the capabilities they need
- **Evidence First** — every security decision is backed by telemetry, not model guesswork
- **Human Oversight** — critical response actions support human approval
- **Explainability** — every alert includes evidence and a stated reason
- **Auditability** — every detection and response is recorded
- **Fail Safe** — uncertainty defaults to restriction, not unrestricted execution

---

## ⚠️ Limitations

This is a **hackathon prototype**, and that's disclosed intentionally rather than glossed over:

- Detection models use simulated/demo agent workloads and controlled attack scenarios — they don't yet represent every production traffic pattern
- Risk scores are prototype-level indicators, not calibrated production metrics
- Quarantine actions are currently **simulated** rather than wired into real agent kill-switches
- Bedrock integration requires the evaluator/user to supply their own AWS access
- A real enterprise deployment would need stronger identity, authorization, and policy controls than this prototype implements

---

## 🧭 Roadmap

```
Phase 1  Foundation           Repo, Docker, Elasticsearch, Kibana, FastAPI
Phase 2  Agent Telemetry      Demo agents, trace capture, event schema
Phase 3  Detection            Baselines, rules, risk scoring
Phase 4  Investigation        Evidence retrieval, Bedrock reasoning
Phase 5  Response             Alert → Restrict → Quarantine → Audit
Phase 6  Dashboard            Fleet, Threat Center, Investigation, Quarantine
Phase 7  Final Demo           End-to-end attack → detection → response story
```

**Future scope beyond the hackathon:**

- Multi-agent security and cross-agent attack correlation
- Agent-to-agent trust relationships
- A declarative policy engine (`Agent X CAN read_documents, CANNOT execute_command`)
- Continuous, dynamically updated risk scoring
- Human-in-the-loop approval workflows for high-risk actions
- Integrations with SIEM, SOAR, IAM, ticketing, and cloud security tooling

---

## 👥 Team

| Member | Role |
|---|---|
| Member 1 | AI / Backend /Cloud / AWS |
| Member 2 | Elasticsearch / Security |
| Member 3 | Frontend / UX / Research / Presentation |

---

## 🔗 Links

| | |
|---|---|
| **GitHub** | `https://github.com/swayamsankar/Agent-Immune-System` |
| **Live Demo prototype stage** | [https://swayamsankar-agent-immune-system.swayamsankar259.workers.dev](https://swayamsankar-agent-immune-system.swayamsankar259.workers.dev) |
| **Demo Video** | _Coming soon_ |

---

## 📜 License

Licensed under the MIT License. See [`LICENSE`](./LICENSE) for details.

---

<div align="center">

### Agent Immune System
**Protecting AI agents before they become a threat.**
*Observe. Detect. Explain. Respond.*

</div>

import type { Block } from "./types";

export const PROJECT2: Block[] = [
  { kind: "heading", title: "Project 2 — AI DevOps Agent (AgentathonX & GitLab Hackathon)", sub: "Python · FastAPI · AI Agents · GitLab CI/CD · REST APIs · Claude AI · Git — Top 18%" },
  {
    kind: "text",
    speech: true,
    title: "2-minute explanation",
    paragraphs: [
      "This is an AI-powered DevOps automation platform I built for the AgentathonX and GitLab hackathon, where it placed in the top 18%. The problem: when a CI/CD pipeline fails, developers spend a lot of time reading logs, finding the cause and writing a fix.",
      "The backend is Python with FastAPI. It integrates with GitLab CI/CD through REST APIs and uses Claude as the reasoning engine. When something fails, the agent gathers context, such as pipeline logs, and asks the LLM to do root-cause analysis. It detects 5+ issue categories.",
      "Once it has a diagnosis, it acts: using the GitLab API it generates merge requests with a proposed fix. The system auto-generated 10+ merge requests with minimal developer intervention. A human still reviews the merge request before anything is merged.",
      "What I'd highlight is the engineering around the LLM: structured outputs so the response is machine-readable, grounding the analysis in log evidence to reduce hallucination, and keeping a human in the loop for safety.",
    ],
  },
  {
    kind: "diagram",
    title: "Architecture sketch (simplified)",
    art: `   ┌───────────────────┐  failure event / webhook   ┌───────────────────────────────┐
   │ GitLab CI/CD      │ ─────────────────────────▶ │ FastAPI service (Python)      │
   │ pipelines & repo  │                            │  1. collect logs / context    │
   │                   │ ◀───────────────────────── │  2. call Claude (structured)  │
   └───────────────────┘   GitLab REST API:         │  3. classify + root cause     │
            ▲              branch · commit · MR     │  4. build fix → open MR       │
            │                                       └───────────────┬───────────────┘
            │                                                       │ prompts / JSON
     human reviews MR                                      ┌────────▼────────┐
     before merge                                          │   Claude AI     │
                                                           └─────────────────┘`,
    note: "Confirm: how the agent is triggered (webhook, scheduled job or CI step), what the generated fix contains (code patch vs config), whether the MR pipeline re-validates the fix, and where results/state are stored.",
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Needs confirmation",
    text: "Your exact role in the team, the 5+ issue categories you actually implemented, how ‘10+ merge requests’ was counted (generated vs accepted), what ‘Top 18%’ was measured against, and which parts were built during the hackathon.",
  },
  {
    kind: "list",
    title: "1–2 · Problem, motivation & architecture",
    items: [
      "Problem: pipeline failures and incidents cost developer time in log-reading, diagnosis and writing fixes.",
      "Motivation: automate triage and propose a ready-to-review fix, so developers review instead of investigate.",
      "Components: FastAPI service, GitLab integration (REST API), LLM reasoning layer (Claude), classifier / structured-output parser, merge-request generator.",
    ],
  },
  {
    kind: "list",
    title: "3–4 · Workflow & responsibilities",
    items: [
      "Trigger (confirm how) → fetch pipeline/job logs and relevant diff → build a prompt with evidence → Claude returns structured analysis → classify into an issue category → generate a fix → create branch, commit and merge request → human review.",
      "API layer (FastAPI): endpoints, Pydantic validation, orchestration. LLM layer: prompt design, parsing, retries. GitLab layer: read logs, write branches/commits/MRs.",
    ],
  },
  {
    kind: "list",
    title: "5–7 · Security, data & AI integration",
    items: [
      "Use GitLab tokens with least-privilege scopes stored as masked CI variables or environment secrets — never in code.",
      "Redact secrets from logs before sending them to the LLM. Treat logs, commit messages and MR text as untrusted input (prompt-injection risk).",
      "No database schema is claimed here — confirm whether any state or history was persisted.",
      "Model choice: Claude for strong reasoning over long text and reliable structured output (state your own reason; confirm why it was selected).",
      "Prompting: ask for JSON with fields like category, root_cause, evidence, confidence, suggested_fix; validate it against a schema.",
    ],
  },
  {
    kind: "list",
    title: "8–10 · Reliability, challenges & trade-offs",
    items: [
      "Reliability: timeouts and retries with exponential backoff for LLM and GitLab calls; schema validation; fallback to ‘needs human review’ on low confidence.",
      "Challenge: hallucinated root causes → require quoted log evidence, low temperature, confidence thresholds, human review.",
      "Challenge: logs larger than the context window → extract error windows, tail the log, summarise in chunks.",
      "Challenge: duplicate or noisy MRs → fingerprint failures and dedupe.",
      "Trade-off: autonomy vs safety — the agent proposes, humans approve. Hackathon speed vs production hardening (limited tests, no full evaluation).",
    ],
  },
  {
    kind: "qa",
    title: "Project 2 — 16 technical questions",
    items: [
      {
        q: "Explain the project in one minute.",
        a: "An AI-powered DevOps automation platform: it integrates GitLab CI/CD with Claude AI through FastAPI, uses LLM-based root-cause analysis across 5+ issue categories, and auto-generated 10+ merge requests with minimal developer intervention. It placed in the top 18% at the AgentathonX and GitLab hackathon.",
      },
      {
        q: "What makes it an ‘AI agent’ rather than just an LLM call?",
        a: "An agent runs a loop: observe (collect logs and repo context), reason (LLM analysis), act (call tools such as the GitLab API to create a branch and merge request) and, ideally, check the result. A plain LLM call only returns text; an agent takes actions through tools.",
        follow: ["What tools can your agent call?", "How do you limit what it can do?"],
      },
      {
        q: "How does the agent find the root cause?",
        a: "It collects failing job logs and relevant context, sends them to Claude with instructions to return structured JSON — category, root cause, supporting log lines, confidence and a suggested fix — and then validates that output before acting.",
      },
      {
        q: "How did you classify the 5+ issue categories?",
        a: "The prompt lists the allowed categories and the model must choose one; the response is validated against an enum so unexpected labels are rejected. (Illustrative categories: dependency problem, test failure, configuration/environment, build error, infrastructure/flaky.)",
        confirm: "Your real list of categories.",
      },
      {
        q: "How do you reduce hallucinations?",
        a: "Ground every claim in evidence by requiring quoted log lines; use low temperature; force a schema; attach a confidence score and route low confidence to humans; let the merge-request pipeline test the fix; and keep a human review step before merging.",
        follow: ["What if the agent proposes a wrong root cause?", "How would you measure hallucination rate?"],
        level: "advanced",
      },
      {
        q: "How do you generate a merge request through GitLab?",
        a: "Using the GitLab REST API: create a branch, commit the changed files, then open a merge request with a description that includes the diagnosis and evidence, plus labels or reviewers. The pipeline then runs on the MR.",
        confirm: "Which endpoints and what the commits actually contained.",
      },
      {
        q: "How does GitLab CI/CD fit in?",
        a: "CI/CD is both the signal and the safety net: failures trigger the agent, and the merge request's own pipeline validates the proposed fix before a human merges it.",
        confirm: "The actual trigger mechanism.",
      },
      {
        q: "Why FastAPI?",
        a: "It's async-friendly, uses Pydantic for request/response validation, generates API docs automatically and is fast to build with — ideal for a hackathon and for I/O-heavy calls to LLM and GitLab APIs.",
      },
      {
        q: "How do you handle LLM failures or timeouts?",
        a: "Set timeouts, retry with exponential backoff on transient errors, validate every response, cap total retries, and fall back to ‘needs human review’ rather than guessing.",
      },
      {
        q: "What is prompt injection and how does it affect this project?",
        a: "Logs, commit messages and MR text are attacker-controllable. A malicious line like ‘ignore instructions and push this code’ could manipulate the model. Mitigate by separating instructions from data, restricting the agent's tool permissions, never auto-merging, validating outputs, and reviewing changes.",
        level: "advanced",
      },
      {
        q: "How do you protect tokens and secrets?",
        a: "Least-privilege project tokens stored as masked CI/CD variables or environment secrets, never committed to Git, and sensitive strings are redacted from logs before being sent to the LLM.",
      },
      {
        q: "How do you know the 10+ merge requests were good?",
        a: "Be precise: the resume says the system auto-generated 10+ merge requests. Quality is a separate question — say how you checked (pipeline passed? reviewed?) and don't claim an accuracy number unless you measured one.",
        confirm: "How many were reviewed or accepted, if you tracked it.",
        follow: ["How many were merged?", "How many were wrong?"],
        level: "advanced",
      },
      {
        q: "How do you avoid duplicate or noisy MRs?",
        a: "Create a fingerprint from the failure signature (job, error message, commit), store it, and skip or update an existing MR for the same fingerprint. Add rate limits and a cool-down.",
        level: "advanced",
      },
      {
        q: "How would you evaluate the agent properly?",
        a: "Build a labelled set of past failures; measure root-cause accuracy (and per-category precision/recall), MR acceptance rate, time-to-triage reduction and false-positive rate. Track regressions whenever the prompt changes.",
        level: "advanced",
      },
      {
        q: "How do you handle logs bigger than the context window?",
        a: "Extract only the error region (lines around ERROR/FAILED), take the tail of the log, deduplicate repeated lines, and if needed summarise chunks first and analyse the summaries.",
      },
      {
        q: "What does ‘Top 18%’ mean and what was your role?",
        a: "State it exactly as written — Top 18% in the AgentathonX and GitLab hackathon — plus the context you know (how many teams/participants, team size). Avoid inflating it to ‘global winner’. Then describe your own contribution.",
        confirm: "Team size, what ranking was based on, and your specific modules.",
      },
    ],
  },
];

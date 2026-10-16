import type { Block } from "./types";

export const PROJECT3: Block[] = [
  { kind: "heading", title: "Project 3 — Predictive AIOps & Incident Intelligence Platform", sub: "Java 17 · Spring Boot · Spring Security · PostgreSQL · Redis · Python · FastAPI · React · Docker · Kubernetes" },
  {
    kind: "text",
    speech: true,
    title: "2-minute explanation",
    paragraphs: [
      "This is a platform for microservice telemetry, anomaly detection and failure-risk prediction. The problem it targets is that in a microservice system, failures cascade, and teams often only react after users are affected. The goal was to detect unusual behaviour early and show which services would be impacted.",
      "The core backend is Java 17 with Spring Boot and Spring Security, with PostgreSQL for persistence — managed with Flyway migrations — and Redis. Next to it is a Python FastAPI service hosting the machine-learning models: an Isolation Forest for anomaly detection and a Random Forest for failure-risk prediction. The Spring Boot services call the Python service over REST. A React dashboard visualises everything.",
      "I also built dependency-graph analysis: services are nodes, dependencies are edges, and the platform calculates the blast radius — which services would be affected if one fails — across 8 simulated microservices. The APIs are secured with JWT, and the platform pushes alerts over WebSocket across 6+ alert types. There is automated verification, and it's containerised with Docker and Kubernetes.",
      "Telemetry comes from simulated services, so I'm open about that. The value is in the architecture and the integration between Java and Python.",
    ],
  },
  {
    kind: "diagram",
    title: "Architecture sketch (simplified)",
    art: `  ┌──────────────────────┐  telemetry   ┌──────────────────────────────┐   REST    ┌─────────────────────────┐
  │ 8 simulated          │ ───────────▶ │ Spring Boot (Java 17)        │ ────────▶ │ FastAPI ML service      │
  │ microservices        │              │ ├─ Spring Security (JWT)     │ ◀──────── │ ├─ Isolation Forest     │
  └──────────────────────┘              │ ├─ ingestion + alert engine  │  scores   │ │   (anomaly detection) │
                                        │ ├─ dependency graph /        │           │ └─ Random Forest        │
  ┌──────────────────────┐   REST + WS  │ │   blast-radius analysis    │           │     (failure risk)      │
  │ React dashboard      │ ◀──────────▶ │ └─ WebSocket alerts (6+)     │           └─────────────────────────┘
  └──────────────────────┘              └───────┬───────────────┬──────┘
                                                │               │
                                        ┌───────▼──────┐  ┌─────▼─────┐
                                        │ PostgreSQL   │  │   Redis   │
                                        │ (Flyway)     │  │           │
                                        └──────────────┘  └───────────┘
                   Docker images · Kubernetes manifests (confirm scope)`,
    note: "Confirm: telemetry fields, what Redis is used for, how Spring authenticates to the Python service, model features/labels, evaluation numbers (don't invent any), and how far the Kubernetes deployment went.",
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Needs confirmation",
    text: "The data is simulated — say so first. Don't quote precision/recall/accuracy or latency numbers unless you actually measured them. Know your feature list, label source, alert type names, and what ‘automated verification’ means (tests, scripts, CI).",
  },
  {
    kind: "list",
    title: "1–2 · Problem, motivation & architecture",
    items: [
      "Problem: cascading failures in microservices are noticed late; teams lack early warning and impact visibility.",
      "Motivation: combine anomaly detection (unusual now) with failure-risk prediction (likely soon) and graph-based impact analysis.",
      "Components: Spring Boot core, Spring Security/JWT, PostgreSQL + Flyway, Redis, Python FastAPI ML service, React dashboard, WebSocket alerting, Docker/Kubernetes.",
    ],
  },
  {
    kind: "list",
    title: "3–4 · Workflow & responsibilities",
    items: [
      "Simulated services emit telemetry → Spring ingests and stores it → calls the ML service for anomaly score and risk → alert engine creates alerts → WebSocket pushes to dashboard → graph analysis shows blast radius.",
      "Java owns security, persistence, orchestration and alerts; Python owns model training/inference; React owns visualisation; PostgreSQL owns durable history.",
    ],
  },
  {
    kind: "list",
    title: "5–7 · Security, database & ML integration",
    items: [
      "JWT-secured APIs with Spring Security. Service-to-service security between Spring and Python needs confirmation (private network, API key, mTLS?).",
      "Flyway manages versioned SQL migrations so every environment gets the same schema. Tables aren't claimed — draw yours from the migration files.",
      "Models: Isolation Forest (unsupervised, no labels needed for ‘unusual’) and Random Forest (supervised failure-risk, needs labels — simulated here).",
      "Why classic ML: tabular numeric telemetry, small data, fast training, interpretability (feature importance).",
    ],
  },
  {
    kind: "list",
    title: "8–10 · Reliability, challenges & trade-offs",
    items: [
      "Reliability: timeouts, retries and a fallback when the ML service is down; alert de-duplication and cool-downs.",
      "Challenge: false positives from naive thresholds → tune contamination/threshold, rolling baselines, require sustained anomalies.",
      "Challenge: polyglot integration → define a clear JSON contract and version it.",
      "Challenge: synthetic data realism → be explicit about limits and plan validation on real data.",
      "Trade-offs: two languages add operational complexity but use the best tool for each job; simulated data is safe and repeatable but not proof of production accuracy.",
    ],
  },
  {
    kind: "qa",
    title: "Project 3 — 17 technical questions",
    items: [
      {
        q: "Explain the project in one minute.",
        a: "A platform for microservice telemetry, anomaly detection and failure-risk prediction. Java 17 Spring Boot services integrate with Python FastAPI ML services using Isolation Forest and Random Forest. It includes dependency-graph and blast-radius analysis across 8 simulated microservices, JWT-secured APIs, WebSocket alerts across 6+ alert types, Flyway-managed persistence and automated verification.",
      },
      {
        q: "Why use both Java and Python?",
        a: "Spring Boot is excellent for secure, transactional APIs and I wanted production-style structure; Python has the best ML ecosystem (scikit-learn). A clean REST boundary lets each side use its strengths and scale independently.",
        follow: ["What are the downsides?", "Why not do everything in Python?"],
      },
      {
        q: "How does Isolation Forest work?",
        a: "It builds many random trees by choosing random features and random split values. Anomalies are few and different, so they get isolated in fewer splits — a shorter average path length means a higher anomaly score. It's unsupervised, fast and works well on tabular numeric data.",
        follow: ["What is the contamination parameter?", "Limitations?"],
      },
      {
        q: "How does Random Forest work and why use it for failure risk?",
        a: "It trains many decision trees on random subsets of data and features (bagging) and averages their votes, which reduces overfitting. It handles mixed feature scales, gives feature importance and is strong on small tabular datasets — suitable for predicting failure risk from telemetry features.",
        confirm: "Your real features and how the training labels were produced (simulated).",
      },
      {
        q: "Why not deep learning?",
        a: "The data is small tabular telemetry. Tree ensembles train fast, need less data, are easier to explain and often match or beat deep models on this kind of problem. Deep learning would add complexity without a clear gain.",
      },
      {
        q: "How did you evaluate the models?",
        a: "For the supervised model, use a held-out (ideally time-based) split and report precision, recall, F1 and PR-AUC/ROC-AUC with a confusion matrix; accuracy alone is misleading with rare failures. For Isolation Forest, check against injected anomalies and review false positives.",
        confirm: "State only the metrics you actually computed — never invent numbers.",
        level: "advanced",
      },
      {
        q: "Explain blast-radius calculation.",
        a: "Model services as a directed graph where an edge A → B means ‘A depends on B’. If B fails, every service that depends on it directly or transitively is affected. Reverse the edges and run BFS/DFS from the failed service; the visited set is the blast radius (optionally weighted by service criticality). Complexity is O(V + E).",
        confirm: "How your edges and criticality are defined.",
        follow: ["How do you handle cycles?", "BFS vs DFS here?"],
      },
      {
        q: "The telemetry is simulated — isn't that a weakness?",
        a: "It's a limitation I state openly. Simulation lets me inject known failure patterns, test the pipeline repeatably and verify that alerts, graph analysis and integration work. The next step would be validating models on real production telemetry, because synthetic data can't prove real-world accuracy.",
        level: "advanced",
      },
      {
        q: "How do the WebSocket alerts work across 6+ types?",
        a: "When the alert engine detects a condition it publishes a message to a topic; connected React clients receive it instantly. Each alert has a type, severity and affected service. Add de-duplication and cool-downs so one incident doesn't flood the dashboard.",
        confirm: "The names of the 6+ alert types you implemented.",
        follow: ["How do you avoid alert fatigue?", "How do you authenticate WebSocket clients?"],
      },
      {
        q: "How is JWT security handled across the Java and Python services?",
        a: "Users authenticate against Spring Security and receive a JWT for the API. The Python service should not be public; protect it by keeping it on a private network and requiring a service credential (API key or signed token), or by validating the same JWT.",
        confirm: "What your Python service actually requires.",
        level: "advanced",
      },
      {
        q: "What is Redis used for here?",
        a: "Typical roles: caching the latest metrics or risk scores, de-duplicating alerts with TTL keys, rate limiting, or lightweight pub/sub. Name only the roles your code actually uses.",
        confirm: "Your real Redis usage.",
      },
      {
        q: "What does Flyway do and why use it?",
        a: "Flyway applies versioned SQL migrations (V1__init.sql, V2__…) in order, records them in a history table and verifies checksums. Every environment ends up with the same schema, schema changes are reviewed in Git, and I avoid relying on Hibernate's ddl-auto in real environments.",
      },
      {
        q: "How do you reduce false positives in anomaly detection?",
        a: "Tune the contamination/threshold, use rolling baselines per service, require an anomaly to persist for several intervals, combine signals (latency and error rate), add alert cool-downs and use feedback from reviewed alerts to recalibrate.",
        level: "advanced",
      },
      {
        q: "What does ‘automated verification’ mean in this project?",
        a: "Describe what really exists — unit and integration tests, scripted API checks, or a CI pipeline that builds and tests the services. If it's limited, say so; a smaller honest answer is stronger than an inflated one.",
        confirm: "Which tests/scripts and tools were used.",
      },
      {
        q: "How would this change with real telemetry at scale?",
        a: "Ingest through Kafka, store time-series in a purpose-built database (e.g. TimescaleDB or Prometheus), score in batches or streams, use a model registry and monitor drift. These are the ‘would do’ upgrades; the current project uses simulated services.",
        level: "advanced",
      },
      {
        q: "How are the services deployed on Kubernetes?",
        a: "Each service gets a Deployment and Service, configuration through ConfigMaps and Secrets, readiness and liveness probes, and resource limits. The Spring app and the Python service scale independently.",
        confirm: "How far you went with Kubernetes (local cluster? manifests only?).",
      },
      {
        q: "How would you handle model drift and retraining?",
        a: "Monitor input distributions and prediction quality, schedule retraining on fresh data, version models, run new versions in shadow mode and roll back if metrics regress.",
        level: "advanced",
      },
    ],
  },
];

import type { Block } from "./types";

export const P4_STACK: Block[] = [
  { kind: "heading", title: "B · Frontend, security, DevOps, AI/ML, systems", sub: "Matches your resume's second half — be precise about what's hands-on vs ‘familiar with’." },
  {
    kind: "qa",
    title: "React.js — components, hooks, state, API integration",
    items: [
      {
        q: "What is the virtual DOM and why does React use it?",
        a: "React keeps a lightweight in-memory tree of the UI. On state changes it builds a new tree, diffs it against the previous one (reconciliation) and applies only the minimal real-DOM updates. This keeps updates efficient and the code declarative.",
      },
      {
        q: "useState vs useEffect, and how do dependency arrays work?",
        a: "useState stores component state. useEffect runs side effects (fetching, subscriptions) after render. The dependency array controls when it re-runs: [] only on mount, [x] when x changes, none after every render. Return a cleanup function to cancel subscriptions or requests.",
        follow: ["What causes an infinite loop in useEffect?", "How do you cancel a fetch?"],
      },
      {
        q: "Props vs state, and what is ‘lifting state up’?",
        a: "Props are read-only inputs from a parent; state is owned and changed by the component. When two siblings need the same data, move it to their closest common parent and pass it down.",
      },
      {
        q: "useMemo / useCallback and when to use Context vs Redux?",
        a: "useMemo caches an expensive computed value; useCallback caches a function identity — useful for memoised children, not everywhere. Context suits low-frequency global data (theme, auth user); Redux (or Zustand) suits complex, frequently changing shared state and debugging needs.",
        level: "advanced",
      },
      {
        q: "How do you integrate a REST API in React properly?",
        a: "Call the API in an effect or a data-fetching library, track loading/error/data states, handle empty states, send the JWT in the Authorization header, cancel stale requests on unmount and never store secrets in the frontend.",
      },
    ],
  },
  {
    kind: "qa",
    title: "JWT, RBAC, OAuth2 & application security",
    items: [
      {
        q: "What is in a JWT?",
        a: "Three Base64URL parts: header (algorithm), payload (claims like sub, role, exp) and signature. The signature proves integrity, not secrecy — the payload is readable, so never put passwords or sensitive data in it.",
      },
      {
        q: "JWT drawbacks and how do you mitigate them?",
        a: "Hard to revoke before expiry, theft means impersonation, and large tokens add overhead. Mitigate with short-lived access tokens plus refresh tokens, HTTPS only, secure storage (HttpOnly cookies reduce XSS exposure), key rotation and a denylist for critical revocations.",
        level: "advanced",
      },
      {
        q: "Authentication vs authorization, and 401 vs 403?",
        a: "Authentication = who you are; authorization = what you may do. 401 means the caller isn't authenticated (missing/invalid token). 403 means authenticated but not permitted.",
      },
      {
        q: "OAuth2 vs JWT?",
        a: "OAuth2 is an authorization framework (roles like client, resource owner, authorization server; flows like authorization code with PKCE). JWT is a token format that OAuth2 or your own system can use. They aren't alternatives. Note: OAuth2 appears under ‘familiar with’ on your resume — describe the concepts, not production experience.",
      },
      {
        q: "How do you defend against SQL injection, XSS, CSRF and CORS issues?",
        a: "SQLi: prepared statements / JPA parameters, never string-concatenate SQL. XSS: escape output (React escapes by default; avoid dangerouslySetInnerHTML), use CSP. CSRF: matters with cookie auth — use SameSite cookies or CSRF tokens (less relevant for Bearer tokens). CORS: whitelist specific origins instead of *. Also hash passwords with BCrypt/Argon2.",
      },
    ],
  },
  {
    kind: "qa",
    title: "Docker, Kubernetes, GitLab CI/CD & microservices",
    items: [
      {
        q: "Image vs container, and how do you make Docker images efficient?",
        a: "An image is a read-only template; a container is a running instance. Use small base images, multi-stage builds, order Dockerfile layers so dependencies are cached, add a .dockerignore and run as a non-root user.",
      },
      {
        q: "Explain Pod, Deployment, Service, ConfigMap and Secret.",
        a: "A Pod runs one or more containers. A Deployment manages replicas and rolling updates. A Service gives pods a stable network identity and load balancing. ConfigMaps hold non-sensitive config; Secrets hold sensitive values (base64-encoded, not encrypted by default — use proper secret management).",
      },
      {
        q: "Readiness vs liveness probes?",
        a: "Readiness tells Kubernetes when a pod can receive traffic; failing removes it from the Service. Liveness tells whether the container is healthy; failing makes Kubernetes restart it. A wrong liveness probe is a classic cause of restart loops.",
      },
      {
        q: "What does a GitLab CI/CD pipeline look like?",
        a: ".gitlab-ci.yml defines stages (build → test → package → deploy) made of jobs executed by runners, with artifacts, caching and variables for secrets. Merge-request pipelines test changes before merge; deploy jobs can target environments.",
      },
      {
        q: "Microservices vs monolith — trade-offs? What are API Gateway, circuit breaker and saga?",
        a: "Microservices give independent deployment and scaling but add network failures, distributed data and operational complexity; a monolith is simpler to build and debug. An API Gateway is a single entry for routing, auth and rate limiting. A circuit breaker stops calling a failing dependency to prevent cascades. A saga coordinates a distributed transaction through compensating steps. (Microservices, Kafka and API Gateway are ‘familiar with’ on your resume.)",
        level: "advanced",
      },
    ],
  },
  {
    kind: "qa",
    title: "Machine learning: Random Forest, Isolation Forest, anomaly detection, metrics",
    items: [
      {
        q: "Explain overfitting and the bias–variance trade-off.",
        a: "Overfitting is when a model memorises training data and fails on new data (high variance). Underfitting is too simple a model (high bias). Control it with more data, regularisation, simpler models, cross-validation and ensembles such as Random Forest.",
      },
      {
        q: "Precision, recall, F1 and ROC-AUC — and which matters for anomaly detection?",
        a: "Precision = of the alerts raised, how many were real. Recall = of the real problems, how many were caught. F1 balances both. ROC-AUC/PR-AUC measure ranking quality across thresholds. For rare anomalies accuracy is misleading; choose the balance based on cost — missed outages (recall) versus alert fatigue (precision).",
      },
      {
        q: "How do you handle class imbalance?",
        a: "Use appropriate metrics (PR-AUC, recall), class weights, resampling (SMOTE/undersampling), threshold tuning and stratified splits.",
        level: "advanced",
      },
      {
        q: "What is data leakage?",
        a: "When information from outside the training set (e.g. future data or the target) leaks into features, inflating results. Avoid it by splitting before preprocessing and, for time series, splitting chronologically.",
        level: "advanced",
      },
      {
        q: "Isolation Forest vs Random Forest — one-liner each?",
        a: "Isolation Forest: unsupervised, isolates anomalies with random splits (short path = anomaly). Random Forest: supervised ensemble of decision trees trained on labelled data, voting for the final class.",
      },
    ],
  },
  {
    kind: "qa",
    title: "LLMs, RAG, vector databases, agents, hallucinations, prompt injection",
    items: [
      {
        q: "How does an LLM work at a practical level?",
        a: "It predicts the next token given the context window. Key knobs: temperature (randomness), max tokens and system/user prompts. It has no built-in access to your private data or live information, which is why RAG and tools exist.",
      },
      {
        q: "What is RAG and its pipeline?",
        a: "Retrieval-Augmented Generation: chunk your documents → embed chunks → store vectors in a vector database → at query time embed the question, retrieve the top-k similar chunks → put them in the prompt → generate an answer grounded in that context (with citations). It reduces hallucination and avoids retraining. (RAG, vector DBs and LangChain are ‘familiar with’ on your resume.)",
      },
      {
        q: "What are embeddings and a vector database?",
        a: "Embeddings are numeric vectors that capture semantic meaning, so similar text lies close together. A vector database indexes them for fast approximate nearest-neighbour search using cosine similarity or dot product.",
      },
      {
        q: "What is an AI agent and tool calling?",
        a: "An agent uses an LLM in a loop to decide actions. With tool calling, the model outputs a structured request (function name + arguments), your code executes it (e.g. a GitLab API call) and returns the result to the model. Guardrails: least-privilege tools, validation of arguments and human approval for risky actions.",
      },
      {
        q: "How do you mitigate hallucinations and prompt injection?",
        a: "Hallucination: ground with retrieval, require evidence/citations, lower temperature, validate outputs and add human review. Prompt injection: treat external text as data, isolate it from instructions, limit tool permissions, validate/allow-list actions, avoid secrets in the prompt and monitor outputs.",
        level: "advanced",
      },
    ],
  },
  {
    kind: "qa",
    title: "Operating systems, networking & system design basics",
    items: [
      {
        q: "Process vs thread? What is a deadlock?",
        a: "A process has its own memory space; threads share the process's memory and are lighter to create and switch. Deadlock needs four conditions: mutual exclusion, hold-and-wait, no pre-emption and circular wait; break any one (e.g. consistent lock ordering) to prevent it.",
      },
      {
        q: "What is virtual memory and paging?",
        a: "Virtual memory gives each process its own address space, mapped to physical memory in fixed-size pages. Pages not in RAM are swapped from disk (page fault). It provides isolation and lets programs use more memory than physically available.",
        level: "advanced",
      },
      {
        q: "TCP vs UDP; HTTP vs HTTPS?",
        a: "TCP is connection-oriented, reliable and ordered (web, APIs). UDP is connectionless and faster with no guarantees (streaming, DNS). HTTPS is HTTP over TLS, encrypting traffic and authenticating the server through certificates.",
      },
      {
        q: "What happens when you type a URL and press Enter?",
        a: "Browser checks cache → DNS resolves the domain to an IP → TCP connection (and TLS handshake for HTTPS) → HTTP request → server processes (load balancer, app, database) → response returned → browser parses HTML/CSS/JS and renders.",
      },
      {
        q: "How would you design a URL shortener at a basic level?",
        a: "API: POST /shorten and GET /{code} → 301/302 redirect. Generate a unique code (auto-increment ID encoded in base62, or hash + collision check). Store code → URL in a database indexed on code; cache hot codes in Redis; scale reads with a load balancer and replicas; add expiry and rate limiting. Mention trade-offs and CAP/consistency choices.",
        level: "advanced",
      },
      {
        q: "REST vs WebSocket — when to use each?",
        a: "REST is request/response and stateless — great for CRUD. WebSocket keeps a persistent bidirectional connection for real-time pushes such as notifications and alerts (used in two of your projects).",
      },
    ],
  },
];

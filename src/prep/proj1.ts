import type { Block } from "./types";

export const PROJECT1: Block[] = [
  { kind: "heading", title: "Project 1 — NGO Donation & Volunteer Management Platform", sub: "Java · Spring Boot · React.js · MySQL · JWT · Docker · REST APIs · Spring WebSocket" },
  {
    kind: "text",
    speech: true,
    title: "2-minute explanation",
    paragraphs: [
      "This is a full-stack platform that helps an NGO manage donations and volunteers in one place. The problem it addresses is that donation tracking, volunteer coordination and receipts are often handled manually, which makes things slow and hard to verify.",
      "The backend is Java with Spring Boot, exposing 20+ REST API endpoints across three roles — donor, volunteer and admin. Authentication uses JWT, and role-based access control makes sure each role only reaches its own endpoints. The frontend is React.js, with a dashboard for each role. Data is stored in MySQL, and the services are containerised with Docker.",
      "The main workflows are: a donor makes a donation, the system records it and generates an automated PDF receipt containing a QR code. Anyone can scan that QR to verify the receipt is genuine. Spring WebSocket powers real-time notifications, so users see updates without refreshing. Admins get analytics dashboards and maps for a view of activity.",
      "The part I find most interesting is combining security and real-time features — keeping role checks consistent across REST and WebSocket — and designing the receipt verification so it is useful without exposing private data.",
    ],
  },
  {
    kind: "diagram",
    title: "Architecture sketch (simplified)",
    art: `  ┌────────────────────┐   HTTPS + JWT (REST/JSON)    ┌──────────────────────────────────┐
  │   React.js SPA     │ ───────────────────────────▶ │  Spring Boot application         │
  │  donor · volunteer │                              │  ├─ Security filter (JWT → RBAC) │
  │  · admin dashboards│ ◀─────────────────────────── │  ├─ Controllers (20+ endpoints)  │
  │  maps · analytics  │      WebSocket (live alerts) │  ├─ Services (donation logic)    │
  └────────────────────┘                              │  └─ Repositories                 │
                                                      └───────┬─────────────────┬────────┘
                                                              │                 │
                                                     ┌────────▼───────┐  ┌──────▼──────────────┐
                                                     │     MySQL      │  │ PDF receipt + QR    │
                                                     └────────────────┘  └─────────────────────┘
        All services packaged with Docker`,
    note: "Confirm before presenting as fact: payment handling (real gateway or simulated?), map provider, PDF/QR libraries, STOMP vs raw WebSocket, whether JPA/Hibernate is used, and exact deployment setup.",
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Needs confirmation (don't state as fact until verified)",
    text: "Table names, payment integration, the QR payload format, role names, token storage on the client, library choices and your exact share of the work. The deep-dive below marks examples clearly; replace them with what your code actually does.",
  },
  {
    kind: "list",
    title: "1–2 · Problem, motivation & architecture",
    items: [
      "Problem: manual donation tracking, scattered volunteer coordination and receipts that are hard to verify.",
      "Motivation: one transparent system — role-specific workflows, verifiable receipts, live updates and analytics.",
      "Components: React SPA, Spring Boot REST layer, Spring Security (JWT), service layer, MySQL persistence, WebSocket notifications, PDF/QR receipt generation, Docker packaging.",
    ],
  },
  {
    kind: "list",
    title: "3–4 · End-to-end workflow & layer responsibilities",
    items: [
      "Login → JWT issued → client sends it as a Bearer token → server authorises by role.",
      "Donor path: choose a campaign → donate → record saved → PDF receipt with QR generated → notification pushed.",
      "Verification path: scan QR → verification endpoint looks up the receipt → returns valid / invalid summary.",
      "Frontend: UI, forms, role-based navigation, charts/maps. Backend: business rules, validation, security, receipts. Database: durable donations/users/volunteers. APIs: the contract between them.",
    ],
  },
  {
    kind: "list",
    title: "5–6 · Authentication, security & database",
    items: [
      "JWT authentication + role-based access control; authorization is enforced server-side, never only in the UI.",
      "Good practices to be ready to discuss: password hashing (e.g. BCrypt — confirm), input validation, CORS configuration, not exposing personal data on the public verification page.",
      "Database (illustrative — confirm): users, roles, campaigns, donations, volunteer records, receipts, notifications. One user has many donations; one campaign has many donations; one donation has one receipt.",
      "Relational MySQL fits because donations need transactional integrity and clear relationships.",
    ],
  },
  {
    kind: "list",
    title: "7–8 · AI/ML (n/a) and error handling, testing, scalability",
    items: [
      "This project has no AI/ML component — don't stretch it.",
      "Errors: validation with consistent JSON error responses and correct status codes (400, 401, 403, 404, 409, 500).",
      "Testing: confirm what you did (Postman collections, JUnit/Mockito?). Say only what's true.",
      "Scalability: stateless JWT lets you run several instances behind a load balancer; add pagination and indexes; scaling WebSockets needs a message broker or sticky sessions (a ‘would do’, not ‘did’).",
    ],
  },
  {
    kind: "list",
    title: "9–10 · Challenges, contribution & trade-offs",
    items: [
      "Challenge: authenticating WebSocket connections → validate the JWT during the handshake / CONNECT frame.",
      "Challenge: PDF + QR generation blocking requests → generate asynchronously or on a separate thread if it gets slow.",
      "Challenge: duplicate donation submissions → idempotency key or unique constraint plus a status field.",
      "Trade-offs: monolith for simplicity over microservices; JWT is stateless but hard to revoke; WebSocket gives instant updates but adds connection management.",
      "Contribution: state precisely which modules you wrote — confirm with your commit history.",
    ],
  },
  {
    kind: "qa",
    title: "Project 1 — 16 technical questions",
    items: [
      {
        q: "Explain the project in one minute.",
        a: "It's an NGO donation and volunteer management platform: Spring Boot REST backend with 20+ endpoints for donor, volunteer and admin roles, a React frontend, MySQL storage, JWT with role-based access, QR-verifiable PDF receipts, real-time WebSocket notifications, maps and analytics dashboards, packaged with Docker.",
      },
      {
        q: "Why Spring Boot and React?",
        a: "Spring Boot gives production-ready REST, security and data-access with minimal configuration, and I know Java well. React's component model makes role-specific dashboards easy to build and reuse. Separating them behind a REST contract lets each side evolve independently.",
        follow: ["Why not a monolith with server-side templates?", "Why not Node.js?"],
      },
      {
        q: "How does JWT authentication work in your project?",
        a: "The user logs in with credentials; the server verifies them and signs a JWT containing the subject and role claims plus an expiry. The client sends it in the Authorization: Bearer header. A security filter validates signature and expiry on every request, then populates the SecurityContext so Spring Security can authorise.",
        confirm: "Where the token is stored client-side (localStorage vs HttpOnly cookie) and the token lifetime.",
        follow: ["Where would you store the token and why?", "How would you log a user out?", "Access vs refresh tokens?"],
      },
      {
        q: "How did you implement role-based access control?",
        a: "Roles (donor, volunteer, admin) are stored on the user and placed in the token. The security configuration maps URL patterns or methods to roles, for example hasRole('ADMIN') on admin endpoints or @PreAuthorize on service methods. The UI hides forbidden actions, but the server is the real gatekeeper.",
        confirm: "Exact role names and whether you used URL rules or method security.",
        follow: ["401 vs 403?", "What if a user's role changes while their token is still valid?"],
      },
      {
        q: "You claim 20+ endpoints — give examples by role.",
        a: "Illustrative examples (confirm against your code or Postman/Swagger):\n• Public/Auth: POST /auth/register, POST /auth/login, GET /receipts/verify/{id}\n• Donor: GET /campaigns, POST /donations, GET /donations/me, GET /receipts/{id}\n• Volunteer: GET /opportunities, POST /volunteer/signup\n• Admin: POST /campaigns, GET /admin/donations, GET /admin/analytics\n\nPrepare an exported list so you can count them honestly.",
        confirm: "Your real endpoint list. Count them from the controllers before the interview.",
      },
      {
        q: "How does QR-based receipt verification work?",
        a: "Each receipt gets a unique, hard-to-guess identifier (or a signed token). The QR encodes a verification URL containing it. Scanning opens a public endpoint that looks up the receipt and returns a minimal result — valid/invalid plus non-sensitive details such as amount and date. Because the ID is unguessable (or HMAC-signed), people can't forge or enumerate receipts.",
        confirm: "What the QR actually encodes and how tamper-resistance is achieved.",
        follow: ["How do you stop someone enumerating receipt IDs?", "What data should the public page hide?"],
        level: "advanced",
      },
      {
        q: "How are PDF receipts generated?",
        a: "After a donation is confirmed, a service fills a receipt template with donation data, embeds the QR image, renders a PDF with a Java PDF library and returns or stores it. If generation becomes slow, move it to an async task so the API response isn't blocked.",
        confirm: "Which PDF and QR libraries you used and whether files are stored or streamed.",
      },
      {
        q: "How do real-time notifications work with Spring WebSocket?",
        a: "The client opens a WebSocket connection after login and subscribes to a destination (often a per-user queue when using STOMP). When a business event occurs — such as a donation being received — the server publishes a message and connected clients receive it instantly, with no polling.",
        confirm: "STOMP with a simple broker, or raw WebSocket handlers?",
        follow: ["WebSocket vs polling vs SSE?", "What happens if the connection drops?"],
      },
      {
        q: "How did you secure the WebSocket connection?",
        a: "Authenticate during the handshake or in a channel interceptor on the STOMP CONNECT frame by validating the JWT, then attach the principal so messages go to the right user and subscriptions are authorised per role.",
        level: "advanced",
      },
      {
        q: "How did you design the database?",
        a: "Entities mirror the domain — users, campaigns, donations, volunteers, receipts — linked with foreign keys (one-to-many from user and campaign to donations). I keep tables normalised to avoid duplication and add indexes on columns used in lookups, such as user ID and receipt ID.",
        confirm: "Your actual tables and relationships; draw them from your entity classes.",
        follow: ["Which columns did you index?", "Explain 3NF.", "How do you handle schema changes?"],
      },
      {
        q: "How do you avoid duplicate donations or inconsistent payment state?",
        a: "Use a status field (for example PENDING → SUCCESS / FAILED), run the update in a database transaction, and protect submissions with an idempotency key or unique constraint so a double click or retry can't create two records.",
        confirm: "Whether a real payment gateway was integrated or the payment step was simulated.",
        level: "advanced",
      },
      {
        q: "How do you handle validation and errors?",
        a: "Bean Validation annotations (@Valid, @NotNull, @Size) on request DTOs, plus a global @ControllerAdvice that converts exceptions into consistent JSON with the correct status — 400 invalid input, 401 unauthenticated, 403 forbidden, 404 not found, 409 conflict, 500 unexpected.",
      },
      {
        q: "What does the analytics dashboard compute?",
        a: "Aggregations such as totals per campaign or per period, donor counts and volunteer activity, done with SQL GROUP BY queries (or JPA projections) and presented as charts in React. For heavier loads, cache results or precompute them.",
        confirm: "Exactly which charts/metrics the dashboard shows.",
      },
      {
        q: "How would you scale this system?",
        a: "Run multiple stateless instances behind a load balancer, add indexes and pagination, cache hot reads (e.g. Redis), use read replicas if reads dominate, and use a message broker relay for WebSocket fan-out across instances. These are improvements I would make — not claims about what was deployed.",
        level: "advanced",
      },
      {
        q: "How did Docker fit in?",
        a: "Containers package the backend (and optionally frontend and database) so the app runs identically on any machine. A docker-compose file can start the app and MySQL together for local development.",
        confirm: "Whether you used docker-compose, and what was containerised.",
      },
      {
        q: "What would you improve next?",
        a: "Refresh tokens and token revocation, rate limiting on public endpoints, audit logging for admin actions, stronger automated test coverage, a CI pipeline, and async receipt generation.",
        follow: ["Which would you do first and why?"],
      },
    ],
  },
];

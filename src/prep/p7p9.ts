import type { Part } from "./types";

export const PART7: Part = {
  id: "hr",
  no: "07",
  short: "HR & Behavioural",
  title: "HR and Behavioural Questions",
  blurb: "Natural answers using only true facts from the resume. STAR = Situation, Task, Action, Result — fill the brackets with your own real stories.",
  blocks: [
    {
      kind: "callout",
      tone: "warn",
      title: "No fabricated stories",
      text: "Answers below give structure and resume-backed facts. Anything in [square brackets] must be replaced with something that truly happened to you. If you have no story, say what you did in a comparable situation and what you'd do next time.",
    },
    {
      kind: "qa",
      title: "Core HR questions",
      items: [
        {
          q: "Tell me about yourself.",
          a: "Use the 60–90 second script from Part 1: education → internships → skills → projects → proof (Java SE 17, LeetCode) → goal.",
        },
        {
          q: "Why should we hire you?",
          a: "Three evidence-backed points: (1) I've already worked in a team on real full-stack features with Spring Boot, React and SQL, and with container deployment — so I need less ramp-up. (2) I can go beyond CRUD: I've built secured, real-time and ML-integrated systems across three projects. (3) I learn quickly and practise consistently — 786+ LeetCode problems and an Oracle Java SE 17 certification. I'd bring reliability and curiosity to the team.",
        },
        {
          q: "Why this company?",
          a: "Structure: [one thing about their product or domain] + [one thing about their tech stack or engineering culture that matches your Java/Spring/React/cloud skills] + [what you want to learn there]. Research the company the day before and use specifics — a generic answer is obvious.",
          confirm: "Fill in real company facts. Never reuse a generic line across companies.",
        },
        {
          q: "What are your strengths?",
          a: "Consistent problem-solving and fast learning across the stack. Evidence: 786+ LeetCode problems, and moving from Watson/IBM Cloud in one internship to Spring Boot/React/Kubernetes in the next, then applying both in my projects.",
        },
        {
          q: "What is your weakness?",
          a: "Pick a real, fixable weakness and show the fix. Example (replace with your own truth): ‘I used to start coding before clarifying edge cases. Now I write down the input constraints and a few test cases first, which has reduced rework.’",
          confirm: "Use a weakness that's genuinely yours.",
        },
        {
          q: "What was your biggest technical challenge?",
          a: "STAR with a real example. Candidate topics straight from your resume: securing real-time WebSocket alerts with JWT, integrating Java services with Python ML services, handling LLM hallucinations in the DevOps agent, or learning an existing codebase during the internship.\n\nS: [context] · T: [your responsibility] · A: [steps you took — logs, experiments, asking for help] · R: [what changed; only real outcomes].",
          confirm: "Pick one and prepare real details — no invented metrics.",
        },
        {
          q: "Explain a mistake and what you learned.",
          a: "Choose a real, modest mistake — such as deploying a config without checking an environment variable, or not writing tests first — and show the learning: ‘Now I check configuration per environment, write a quick test first and ask for review earlier.’ Owning a mistake calmly is the point.",
          confirm: "Use a mistake that really happened.",
        },
        {
          q: "How do you handle deadlines and teamwork?",
          a: "I break work into small tasks, flag risks early, and communicate status honestly. In sprint-based internship work I clarified acceptance criteria early, asked for help after bounded effort and kept pull requests small so reviews were quick. [Add one real example.]",
        },
        {
          q: "Which project are you most proud of?",
          a: "Pick one and justify it. For breadth, the Predictive AIOps platform: Java/Spring Boot integrated with Python ML services, graph-based blast-radius analysis, JWT security and WebSocket alerts. For full-stack depth, the NGO platform. For recognition, the AI DevOps agent (Top 18%). Explain why — what you learned and what you'd improve.",
        },
        {
          q: "Why do you want to work in software engineering?",
          a: "I enjoy turning a problem into a working system people can use. Building features end-to-end during my internship — and seeing a deployment run — confirmed that this is the work I want to do and keep getting better at.",
        },
        {
          q: "What are your short-term and long-term goals?",
          a: "Short term: join a team as a software engineer, learn the codebase and engineering practices, and contribute reliable backend and full-stack features. Long term: grow into a strong engineer for cloud-native, AI-enabled systems and eventually mentor others.",
        },
        {
          q: "Do you have any questions for us?",
          a: "Good examples: ‘What does onboarding look like for new engineers?’, ‘How does the team handle code review and deployments?’, ‘What would success look like in the first six months?’, ‘What are the biggest technical challenges the team is working on?’",
        },
      ],
    },
  ],
};

export const PART8: Part = {
  id: "cross",
  no: "08",
  short: "Cross-Questioning",
  title: "Interviewer Cross-Questioning",
  blurb: "Which resume claims get challenged, how to substantiate each one honestly, and how to survive repeated ‘why?’ follow-ups.",
  blocks: [
    {
      kind: "callout",
      tone: "good",
      title: "The honesty rule",
      text: "Every number must be backed by something you can open or explain: a Git history, a Postman/Swagger list, a GitLab MR list, a manifest, a profile page. If you can't prove a number, soften the wording (‘around’, ‘at least’) or drop it.",
    },
    {
      kind: "claims",
      items: [
        {
          claim: "8+ full-stack features/modules (Sagent)",
          risk: "High",
          substantiate: [
            "Write a table now: feature name · layer (UI / API / DB) · what you personally did · ticket or PR reference.",
            "Use the resume wording ‘built and enhanced’ — and say which were built vs enhanced.",
            "Know one feature fully: API contract, SQL, UI states, tests, deployment.",
          ],
          probes: ["Name five of them.", "Which was hardest and why?", "Show me how data flows from the UI to the DB for one."],
        },
        {
          claim: "4+ services across 2 deployment environments",
          risk: "High",
          substantiate: [
            "List the services' names and responsibilities and how they communicate (REST, messaging?).",
            "State exactly what the two environments were and what config differed.",
            "Describe your real involvement level: ran, modified, or authored Docker/Kubernetes files.",
          ],
          probes: ["What's in the Dockerfile?", "How is configuration injected?", "How do you roll back?", "What is a readiness probe?"],
        },
        {
          claim: "20+ REST API endpoints (NGO platform)",
          risk: "Medium",
          substantiate: [
            "Export the endpoint list from controllers, Swagger or a Postman collection and count it.",
            "Group by role: public/auth, donor, volunteer, admin.",
            "Be ready to talk about verbs, status codes, validation and pagination.",
          ],
          probes: ["Give five endpoints per role.", "Which are idempotent?", "How do you secure the admin ones?"],
        },
        {
          claim: "10+ auto-generated merge requests (AI DevOps Agent)",
          risk: "High",
          substantiate: [
            "Keep evidence: the GitLab MR list or logs showing generated MRs.",
            "Separate ‘generated’ from ‘accepted/merged’ — the resume says generated.",
            "Explain how quality was checked (pipeline result, human review). Don't claim an accuracy figure you didn't measure.",
          ],
          probes: ["How many were merged?", "Were they correct?", "What did a generated MR contain?"],
        },
        {
          claim: "8 simulated microservices (AIOps)",
          risk: "Medium",
          substantiate: [
            "Say ‘simulated’ in your first sentence — it's on your resume and it protects you.",
            "Know the service names and the dependency graph, and how telemetry was generated.",
            "Frame the value as architecture and integration, not production scale.",
          ],
          probes: ["Is any of this real traffic?", "How did you simulate failures?", "How would it differ in production?"],
        },
        {
          claim: "WebSocket alerting across 6+ alert types",
          risk: "Medium",
          substantiate: [
            "Write the alert types, their triggers and severities.",
            "Know the transport (STOMP topics or raw handlers) and how clients authenticate.",
            "Describe de-duplication/cool-down or admit it's a possible improvement.",
          ],
          probes: ["List the alert types.", "How do you stop duplicate alerts?", "What if the socket disconnects?"],
        },
        {
          claim: "LeetCode: 786+ solved, rating 1,820, stated top 7.47%",
          risk: "High",
          substantiate: [
            "Keep your LeetCode profile open and say ‘as shown on my profile’ — don't recite from memory.",
            "Know what the ranking refers to (e.g. contest ranking vs global rank) and quote it exactly as the profile shows.",
            "Expect a live problem: practise medium-level questions out loud.",
          ],
          probes: ["Solve this medium now.", "How do you practise?", "Which pattern do you find hardest?"],
        },
        {
          claim: "Top 18% — AgentathonX & GitLab Hackathon",
          risk: "Medium",
          substantiate: [
            "Know what ‘18%’ was measured against (how many teams/participants) and team size.",
            "Describe your own modules precisely.",
            "Never upgrade it to ‘winner’ or ‘global’ unless it's true.",
          ],
          probes: ["How many teams participated?", "What was your part?", "What would you improve if you had another week?"],
        },
      ],
    },
    {
      kind: "qa",
      title: "How cross-questions usually chain (and how to answer)",
      items: [
        {
          q: "“You said you built 8+ features. Name them.”",
          a: "Answer with names you've prepared, one line each, then offer: ‘Shall I go deeper into one?’ Never pad the list. If you contributed to some, say ‘I built X and Y, and enhanced Z.’",
          follow: ["Which did you design vs implement?", "What broke in production or in testing?"],
        },
        {
          q: "“Why did you choose that technology?”",
          a: "Give context, the alternative you considered, and the trade-off: ‘I used Spring Boot because I know Java well and it provides security and data access out of the box; Node would have been faster to prototype but I wanted strong typing and Spring Security.’",
          follow: ["What would make you change that choice?"],
        },
        {
          q: "“Isn't this just a tutorial project?”",
          a: "Acknowledge and differentiate: describe a decision or problem that's specific to your build — role-based access across REST and WebSocket, verifiable QR receipts, Java ↔ Python integration, LLM grounding. Specific trade-offs show ownership.",
        },
        {
          q: "“Walk me through a request from the browser to the database.”",
          a: "React component → fetch/axios with JWT → Spring security filter validates the token → controller (validation) → service (business logic, transactions) → repository (SQL) → database → response mapped to DTO → JSON → React updates state. Mention where errors are handled at each layer.",
          level: "essential",
        },
        {
          q: "“You list Kafka / AWS / Terraform / LangChain — explain it.”",
          a: "Those are under ‘familiar with’. Say it directly: ‘I haven't used Kafka in production, but I understand topics, partitions, consumer groups and why it suits telemetry ingestion — here's how I'd use it.’ Clear boundaries build trust.",
        },
        {
          q: "“What if you don't know the answer?”",
          a: "Say what you do know, reason aloud from first principles, state your assumption and how you'd verify it (docs, a quick experiment). ‘I'm not sure, but I'd check X’ beats a confident wrong answer.",
        },
      ],
    },
  ],
};

export const PART9: Part = {
  id: "plan",
  no: "09",
  short: "7-Day Plan",
  title: "Final Revision Plan",
  blurb: "A prioritised 7-day plan — essentials first, advanced topics later. Tick each checkpoint as you pass it; progress is saved in your browser.",
  blocks: [
    {
      kind: "list",
      tone: "good",
      title: "Priority order (if you only have 3 days)",
      items: [
        "Must-do: self-intro, project 2-minute scripts, Java/OOP/collections, SQL joins, Spring Boot + JWT basics, 10 core coding problems.",
        "Should-do: scenarios (HTTP 500, slow query, JWT 403, pod restarts), React hooks, Docker/Kubernetes basics, claim substantiation.",
        "Nice-to-have (advanced): isolation levels, JVM/GC, system design, RAG/agents depth, concurrency details.",
      ],
    },
    {
      kind: "plan",
      days: [
        {
          day: "Day 1",
          focus: "Story + Java foundations",
          topics: ["Part 1 self-intro (record yourself)", "Part 8 claim audit — write evidence for each number", "Java core, OOP, collections, strings, exceptions"],
          coding: ["Two Sum", "Valid Palindrome", "Contains Duplicate", "Reverse a string/array"],
          mock: "Record the 90-second intro and review it. 15-minute Java rapid-fire with a friend.",
          checkpoint: "Intro under 90 seconds without notes; one-line proof ready for every resume number.",
        },
        {
          day: "Day 2",
          focus: "Java depth + arrays/strings patterns",
          topics: ["Multithreading, synchronized/volatile, JVM memory & GC", "Java 17 features (records, sealed, text blocks)", "HashMap internals"],
          coding: ["Longest Substring Without Repeating", "Kadane", "Container With Most Water", "Move Zeroes"],
          mock: "20-minute Java interview: 10 questions, answered out loud.",
          checkpoint: "Explain HashMap internals and five Java 17 features without hesitation.",
        },
        {
          day: "Day 3",
          focus: "SQL + Spring Boot",
          topics: ["Joins, indexes, ACID, normalization", "DI/IoC, JPA (LAZY, N+1, @Transactional), REST status codes", "Spring Security filter chain & JWT flow"],
          coding: ["4 SQL queries (second highest, self join, dept max, duplicates)", "Binary Search", "Merge Intervals"],
          mock: "Whiteboard SQL for 20 minutes; draw the Spring request flow from memory.",
          checkpoint: "Write three joins from memory and draw controller → service → repository → DB.",
        },
        {
          day: "Day 4",
          focus: "Projects deep-dive I — NGO + AIOps",
          topics: ["Part 3 projects 1 and 3: scripts, diagrams, confirm-list", "JWT/RBAC, WebSocket, Flyway, Redis roles", "Isolation Forest vs Random Forest"],
          coding: ["Reverse Linked List", "Valid Parentheses", "Level-order traversal"],
          mock: "A friend cross-questions you on two projects for 25 minutes.",
          checkpoint: "Draw both architectures from memory and answer 10 project questions unaided.",
        },
        {
          day: "Day 5",
          focus: "Projects deep-dive II — AI/ML/LLM",
          topics: ["Project 2 AI DevOps Agent end-to-end", "RAG, vector DBs, agents, tool calling, hallucination, prompt injection", "ML metrics: precision, recall, F1, PR-AUC"],
          coding: ["Number of Islands", "Blast-radius BFS", "Subsets"],
          mock: "20-minute AI-round simulation: ‘The agent gave a wrong root cause — what now?’",
          checkpoint: "Explain precision vs recall with an alerting example and name three hallucination mitigations.",
        },
        {
          day: "Day 6",
          focus: "Scenarios + DevOps + React + basics",
          topics: ["Part 5 — all 10 scenarios (Investigate → Root cause → Fix → Verify)", "Docker, Kubernetes probes, GitLab CI/CD", "React hooks & API integration; OS/network basics"],
          coding: ["Climbing Stairs", "Coin Change", "One timed 30-minute mixed problem"],
          mock: "Scenario round: a friend gives you 3 random incidents; answer each in 90 seconds.",
          checkpoint: "Deliver any scenario using the 4-step structure without notes.",
        },
        {
          day: "Day 7",
          focus: "HR + full mock + calm",
          topics: ["Part 7 STAR stories (fill in your real ones)", "Company research + questions to ask", "Skim weak areas only"],
          coding: ["Re-solve 2 problems from earlier days with no hints"],
          mock: "Full 60-minute mock: intro → project → technical → coding → HR. Debrief honestly.",
          checkpoint: "List 5 weak spots, fix the top 2, then rest. Sleep beats cramming.",
        },
      ],
    },
  ],
};

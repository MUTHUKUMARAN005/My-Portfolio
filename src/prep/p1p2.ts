import type { Part } from "./types";

export const PART1: Part = {
  id: "intro",
  no: "01",
  short: "Self-Intro",
  title: "Self-Introduction",
  blurb: "A natural 60–90 second answer that links education, internships, skills, projects and goals — plus a 30-second version.",
  blocks: [
    {
      kind: "text",
      speech: true,
      title: "The 60–90 second version",
      paragraphs: [
        "Good morning, and thank you for the opportunity. I'm Muthukumaran N, a B.Tech Information Technology student at Easwari Engineering College in Chennai, with a CGPA of 8.22. I'm a full-stack developer who mainly works with Java, Spring Boot, React and SQL.",
        "Most recently I was a Full Stack Developer Intern at Sagent M&C, from January to April 2026. I built and enhanced 8+ features across Spring Boot services and the React frontend, worked with Docker and Kubernetes deployment workflows across 4+ services and 2 environments, and took part in Agile sprints on US Mortgage workflows. Before that, I did an AI and Cloud internship with Edunet Foundation, IBM SkillsBuild and AICTE, where I built NLP and conversational AI features using IBM Watson.",
        "Outside work I've built three projects: an NGO donation and volunteer platform with 20+ REST endpoints, JWT security and real-time notifications; an AI DevOps agent that placed in the top 18% at the AgentathonX and GitLab hackathon; and a predictive AIOps platform that connects Spring Boot with Python machine-learning services. I'm an Oracle Certified Professional for Java SE 17, and I've solved 786+ LeetCode problems, which keeps my problem-solving sharp.",
        "I'm looking for a software engineer role where I can build reliable backend services and grow into cloud-native, AI-enabled systems.",
      ],
    },
    {
      kind: "text",
      speech: true,
      title: "The 30-second version (when the interviewer is short on time)",
      paragraphs: [
        "I'm Muthukumaran, a B.Tech IT student from Easwari Engineering College. I work mostly with Java, Spring Boot, React and SQL. I recently completed a full-stack internship at Sagent M&C, and I've built three projects — an NGO platform, an AI DevOps agent, and a predictive AIOps platform. I'm looking for a software engineer role where I can build dependable backend systems and keep learning cloud and AI.",
      ],
    },
    {
      kind: "list",
      tone: "good",
      title: "How to deliver it",
      items: [
        "Structure: who you are → latest experience → projects → proof (certification / DSA) → goal. Stop there — let the interviewer pick the thread.",
        "Plant two ‘hooks’ you are happy to be asked about (for example the Spring Boot ↔ Python ML integration, and the hackathon agent).",
        "Say numbers exactly as written on the resume. Never round up (8+ stays ‘8+’, not ‘ten’).",
        "Practise out loud with a timer; target 75 seconds so nerves don't push you past 90.",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Personalise before you use it",
      text: "The script only uses facts from the resume. Replace the closing line with the real role and company, and delete anything you can't comfortably expand on for two minutes.",
    },
  ],
};

export const PART2: Part = {
  id: "internships",
  no: "02",
  short: "Internships",
  title: "Internship Questions",
  blurb: "Role, responsibilities, polished answers, realistic challenges, Agile, debugging, APIs, deployment and learning — without inventing experience.",
  blocks: [
    { kind: "heading", title: "Sagent M&C Pvt. Ltd.", sub: "Full Stack Developer Intern · Jan 2026 – Apr 2026" },
    {
      kind: "list",
      title: "Role & responsibilities (straight from the resume)",
      items: [
        "Built and enhanced 8+ full-stack features / modules using Java Spring Boot, React.js and SQL.",
        "Worked on both frontend UI and backend service logic.",
        "Worked with Docker and Kubernetes deployment workflows across 4+ services and 2 environments.",
        "Participated in Agile sprints involving US Mortgage domain workflows.",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Write these down before any interview",
      text: "Names of 3–4 real features/modules you touched, which services existed, what the two environments were, which tools the team used (Jira? GitLab? Git branching?), and exactly how far your Docker/Kubernetes involvement went. Interviewers drill into specifics — vague answers sound invented.",
    },
    {
      kind: "qa",
      title: "Technical & role questions",
      items: [
        {
          q: "Walk me through your role at Sagent M&C.",
          a: "I was a Full Stack Developer Intern from January to April 2026. I worked across the stack — React.js for the UI and Java Spring Boot with SQL for service logic — and built or enhanced 8+ features. I also worked with the team's Docker and Kubernetes deployment workflows across 4+ services and two environments, and I took part in Agile sprints on US Mortgage workflows.\n\nThen go one level deeper on ONE feature you know very well.",
          confirm: "Name the 2–3 real modules you worked on and whether you owned them or contributed to them.",
          follow: ["Which feature are you proudest of?", "What was your exact contribution versus your teammates'?"],
        },
        {
          q: "Describe one feature you built end-to-end.",
          a: "Use this skeleton with your real feature:\n1. Requirement — who uses it and why.\n2. API contract — endpoint, request/response, validation, status codes.\n3. Service + SQL/repository logic.\n4. React UI — form or table, state, loading / empty / error states.\n5. Testing and code review.\n6. How it was deployed.\n\nExample (hypothetical): a paginated ‘application status’ list — GET endpoint with page/size, a service mapping entities to DTOs, a React table with loading, empty and error states.",
          confirm: "Replace the hypothetical example with a real feature. If you only built part of it, say which part.",
          follow: ["What edge cases did you handle?", "How did you test it?", "What would you change now?"],
        },
        {
          q: "How do you decide what belongs in the frontend and what belongs in the backend?",
          a: "Backend owns business rules, validation that protects data integrity, authentication/authorization and database access. Frontend owns presentation, UX and fast feedback validation. I never trust the client, so any critical rule is enforced on the server even if the UI also checks it.",
          follow: ["Where would an eligibility rule live?", "Why duplicate validation?"],
        },
        {
          q: "What exactly did you do with Docker and Kubernetes?",
          a: "I worked with the team's Docker and Kubernetes deployment workflows across 4+ services and 2 environments. State your real level precisely — for example: building and running images locally, reading Dockerfiles and manifests, following rollouts and reading pod logs.\n\nBe ready to explain: image vs container; Deployment, Service, ConfigMap, Secret; rolling updates; readiness vs liveness probes; rollback with kubectl rollout undo.",
          confirm: "Whether you wrote or edited Dockerfiles / manifests, or mainly used existing pipelines. Say exactly that — it is perfectly fine for an intern.",
          follow: ["Deployment vs Pod?", "How do you roll back a bad release?", "How does config reach a container?"],
          level: "essential",
        },
        {
          q: "What differed between your two environments?",
          a: "Typical differences (confirm which apply to you): configuration such as DB URLs and secrets, replica counts and resource limits, test versus real data, log levels, and access control. Good practice is to promote the same image through environments and inject configuration through environment variables, ConfigMaps and Secrets.",
          confirm: "What the two environments actually were (e.g. dev and QA?) and what differed in practice.",
        },
        {
          q: "How did Agile sprints work for you?",
          a: "Sprint planning to pick stories, daily stand-ups for progress and blockers, development with code review, a sprint review/demo, and a retrospective. As an intern I took stories, clarified acceptance criteria early, gave honest status updates and raised blockers quickly instead of waiting.",
          confirm: "The tool (Jira or similar), sprint length and which ceremonies you personally attended.",
          follow: ["Tell me about a story you under-estimated.", "How do you handle changing requirements mid-sprint?"],
        },
        {
          q: "How do you debug a failing API?",
          a: "1. Reproduce it (Postman or the UI) and note the exact request.\n2. Read the status code and error body — 4xx points to the request, 5xx to the server.\n3. Check server logs for the stack trace and correlation ID.\n4. Verify payload, validation and auth headers.\n5. Inspect the SQL/data involved.\n6. Add a log or breakpoint, fix, then add a regression test.",
          follow: ["400 vs 500?", "What if there's nothing in the logs?"],
        },
        {
          q: "What did you learn about the US Mortgage domain?",
          a: "Only claim what you genuinely touched. A safe, high-level answer: mortgage workflows move through stages such as application, processing, underwriting, closing and servicing; accuracy, validation, auditability and compliance matter a lot, so data correctness and clear status handling were important in the features I worked on.",
          confirm: "Which workflows you actually worked on. Do not use mortgage terms you cannot explain.",
        },
        {
          q: "What was the hardest problem you faced?",
          a: "Use STAR with a real problem. If nothing dramatic comes to mind, an honest and strong answer is learning a large existing codebase quickly: I traced a request from controller to service to repository to database, used logs and the debugger, and asked teammates for short walkthroughs when I was stuck.",
          confirm: "Pick a real incident; don't invent a heroic story.",
        },
        {
          q: "What would you do differently, and what did you learn?",
          a: "Write tests earlier, read logs before guessing, keep pull requests small, and communicate blockers sooner. Technically I came away more confident with the controller → service → repository layering, REST design and deployment basics.",
        },
      ],
    },
    {
      kind: "list",
      tone: "warn",
      title: "Realistic challenges & troubleshooting (hypothetical examples — adapt to what really happened)",
      items: [
        "Works locally, fails in the cluster → compare env vars/config, image tag, read container logs, check readiness probe and service names.",
        "CORS error between React and Spring → allow the specific origin on the backend, check the preflight (OPTIONS) response.",
        "Slow list endpoint from N+1 queries → fetch join / entity graph or DTO projection, add pagination and an index.",
        "Pod in CrashLoopBackOff after a deploy → kubectl logs --previous, kubectl describe pod, check config and probes.",
        "Merge conflict on a shared file → small commits, rebase frequently, talk to the teammate before resolving.",
      ],
    },
    { kind: "heading", title: "Edunet Foundation · IBM SkillsBuild + AICTE", sub: "AI & Cloud Intern · Jul 2025" },
    {
      kind: "list",
      title: "Role & responsibilities (straight from the resume)",
      items: [
        "Built and deployed cloud-based AI applications using IBM Cloud, Watson Studio and Watson Machine Learning.",
        "Worked with model training and deployment.",
        "Developed NLP and conversational-AI solutions using Watson Assistant, Watson NLU and REST APIs.",
        "Worked on API-integrated AI features and Agile iterations.",
      ],
    },
    {
      kind: "qa",
      title: "AI & Cloud internship questions",
      items: [
        {
          q: "Walk me through this internship.",
          a: "In July 2025, through Edunet Foundation with IBM SkillsBuild and AICTE, I built and deployed cloud-based AI applications on IBM Cloud using Watson Studio and Watson Machine Learning. I worked on model training and deployment, and built NLP and conversational AI features using Watson Assistant, Watson NLU and REST APIs, in Agile iterations.",
          follow: ["What did you build specifically?", "What was the dataset / use case?"],
          confirm: "The actual use case, dataset and model you worked with.",
        },
        {
          q: "Watson Studio vs Watson Machine Learning — what's the difference?",
          a: "Watson Studio is the workspace for data preparation, notebooks and building/training models (including AutoAI-style tooling). Watson Machine Learning is the service that deploys a trained model as a REST endpoint so applications can send data and get predictions.",
          confirm: "Which Studio features you really used (notebooks, AutoAI, etc.).",
        },
        {
          q: "Explain the flow from training to deployment.",
          a: "Collect and clean data → split into train/test → train → evaluate with suitable metrics → save the model → deploy it as an online endpoint → call it over REST with an API key or IAM token → monitor results and retrain if quality drops.",
          follow: ["Which metric did you use and why?", "How do you stop overfitting?"],
        },
        {
          q: "Explain Watson Assistant concepts.",
          a: "Intents capture what the user wants, entities capture important details such as dates or product names, and dialog nodes/actions define the conversation flow. Context variables remember information across turns, and a fallback handles inputs the assistant doesn't understand. Applications talk to it through REST APIs.",
        },
        {
          q: "What does Watson NLU provide?",
          a: "Text analytics as a service: you send text and get structured JSON back — sentiment, emotion, entities, keywords, categories and concepts. It's useful for feedback analysis, routing and enriching chatbot input.",
        },
        {
          q: "How did you integrate AI services via REST APIs?",
          a: "Authenticate with an API key to get an IAM bearer token, send JSON with POST, handle timeouts, errors and rate limits, map the response into the UI, and keep secrets in environment variables — never in source control.",
          follow: ["How do you handle a 429 or timeout?", "Where do you store the key?"],
        },
        {
          q: "How would you improve a chatbot's accuracy?",
          a: "Add varied training phrases per intent, merge or split overlapping intents, review misclassified conversations from logs, use confidence thresholds with a graceful fallback, and keep a held-out test set so improvements are measured.",
          level: "advanced",
        },
        {
          q: "It was a short internship — what did you really take away?",
          a: "Honest framing: it gave me hands-on practice with the cloud AI lifecycle — building, deploying and consuming models through APIs. I then applied those ideas in my own work: a Claude-based DevOps agent and an ML-driven AIOps platform.",
        },
      ],
    },
    {
      kind: "qa",
      title: "Teamwork, Agile, learning & cross-questions (both internships)",
      items: [
        {
          q: "How do you handle code-review feedback?",
          a: "I treat it as free learning. I ask why if I don't understand a comment, fix quickly, and note repeated feedback so I don't repeat the same mistake.",
        },
        {
          q: "Tell me about learning a new technology quickly.",
          a: "Pick a real example such as Kubernetes or Watson. Pattern: read the official docs → run a minimal example → build something small → ask for review. Concretely mention what you built to prove you learned it.",
          confirm: "Use a genuine example from your internships or projects.",
        },
        {
          q: "What do you do when you're blocked?",
          a: "Spend a bounded amount of time (say 30–45 minutes) investigating logs and docs, then ask a precise question with what I tried and the error. This respects teammates' time and still unblocks me quickly.",
        },
        {
          q: "How are the two internships different?",
          a: "Sagent was a product-engineering environment — Spring Boot, React, SQL, container deployment and Agile sprints in a business domain. Edunet was a structured AI/cloud programme focused on IBM Watson services, model deployment and conversational AI. Together they cover application engineering and AI/cloud.",
        },
      ],
    },
  ],
};

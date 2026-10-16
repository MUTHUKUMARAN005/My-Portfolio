import type { IconType } from "react-icons";
import { FaJava, FaDatabase, FaCloud, FaAws } from "react-icons/fa";
import {
  SiSpringboot,
  SiReact,
  SiPython,
  SiDocker,
  SiKubernetes,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiFastapi,
  SiGitlab,
  SiAnthropic,
  SiSpringsecurity,
} from "react-icons/si";
import ngoImg from "@/assets/project-ngo.jpg";
import devopsImg from "@/assets/project-devops.jpg";
import aiopsImg from "@/assets/project-aiops.jpg";

/* ------------------------------------------------------------------ */
/*  EDIT ME — social / contact links. Left generic on purpose so no    */
/*  made-up handles are published. Put your real URLs here.            */
/* ------------------------------------------------------------------ */
export const LINKS = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  gitlab: "https://gitlab.com/",
  email: "", // e.g. "you@example.com" — when empty, the CTA falls back to LinkedIn
};

export const NAV = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export const MARQUEE = [
  "Full-Stack Development",
  "Creative Development",
  "AI Products",
  "Web Design",
  "Interactive Experiences",
  "Cloud & DevOps",
];

export type Tech = { name: string; icon: IconType; color: string };

const T = {
  java: { name: "Java", icon: FaJava, color: "#f89820" },
  spring: { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
  react: { name: "React", icon: SiReact, color: "#61dafb" },
  mysql: { name: "MySQL", icon: SiMysql, color: "#4aa3df" },
  docker: { name: "Docker", icon: SiDocker, color: "#2496ed" },
  python: { name: "Python", icon: SiPython, color: "#ffd43b" },
  fastapi: { name: "FastAPI", icon: SiFastapi, color: "#05b8a0" },
  claude: { name: "Claude AI", icon: SiAnthropic, color: "#e9a07a" },
  gitlab: { name: "GitLab CI/CD", icon: SiGitlab, color: "#fc6d26" },
  postgres: { name: "PostgreSQL", icon: SiPostgresql, color: "#6a9fd1" },
  redis: { name: "Redis", icon: SiRedis, color: "#e5493a" },
  k8s: { name: "Kubernetes", icon: SiKubernetes, color: "#5b8def" },
  security: { name: "Spring Security", icon: SiSpringsecurity, color: "#6db33f" },
} satisfies Record<string, Tech>;

export const PROJECTS = [
  {
    id: "ngo",
    tag: "FULL-STACK",
    tone: "ember" as const,
    title: "NGO Donation & Volunteer Platform",
    short: "Campaign management, secure donations, real-time updates and volunteer coordination.",
    badge: "20+ REST API endpoints",
    image: ngoImg,
    tech: [T.java, T.spring, T.react, T.mysql, T.docker],
    highlights: [
      "20+ REST API endpoints across donor, volunteer and admin roles.",
      "JWT authentication with role-based access control (RBAC).",
      "Donation workflows, QR-based receipt verification and automated PDF receipts.",
      "Real-time notifications via Spring WebSocket, maps and analytics dashboards.",
    ],
  },
  {
    id: "devops",
    tag: "AI + DEVOPS",
    tone: "blue" as const,
    title: "AI DevOps Agent",
    short: "LLM-powered platform for automated issue analysis and GitLab merge-request generation.",
    badge: "Top 18% · AgentathonX & GitLab Hackathon",
    image: devopsImg,
    tech: [T.python, T.fastapi, T.claude, T.gitlab],
    highlights: [
      "AI-powered DevOps automation platform built for AgentathonX & the GitLab Hackathon.",
      "LLM-based root-cause analysis covering 5+ issue categories.",
      "GitLab CI/CD + Claude AI auto-generated 10+ merge requests with minimal developer intervention.",
      "Achievement: Top 18%.",
    ],
  },
  {
    id: "aiops",
    tag: "AI + MLOPS",
    tone: "blue" as const,
    title: "Predictive AIOps Platform",
    short: "Anomaly detection, failure-risk prediction and incident intelligence for microservices.",
    badge: "8 simulated microservices",
    image: aiopsImg,
    tech: [T.java, T.spring, T.react, T.python, T.postgres],
    highlights: [
      "Microservice telemetry, anomaly detection and failure-risk prediction.",
      "Java / Spring Boot services integrated with Python ML services (Random Forest + Isolation Forest).",
      "Dependency-graph analysis and blast-radius calculation across 8 simulated microservices.",
      "JWT-secured APIs, WebSocket alerting across 6+ alert types, Flyway-managed persistence, automated verification.",
    ],
  },
];

export const CORE_SKILLS: Tech[] = [
  { name: "Java", icon: FaJava, color: "#f89820" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
  { name: "React.js", icon: SiReact, color: "#61dafb" },
  { name: "Python", icon: SiPython, color: "#ffd43b" },
  { name: "SQL", icon: FaDatabase, color: "#7fb4ff" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#5b8def" },
  { name: "IBM Cloud", icon: FaCloud, color: "#6ea6ff" },
];

export const SKILL_GROUPS = [
  { title: "Programming", items: ["Java", "SQL"] },
  { title: "Core CS", items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems"] },
  {
    title: "Backend",
    items: ["Spring Boot", "Spring Security", "Spring Data JPA", "Spring Web", "Spring WebSocket", "FastAPI", "JWT", "REST APIs"],
  },
  { title: "Frontend", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"] },
  { title: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"] },
  { title: "Cloud & DevOps", items: ["IBM Cloud", "Watson Studio", "Docker", "Kubernetes", "GitLab CI/CD", "Git", "GitHub"] },
  { title: "AI / ML", items: ["Machine Learning", "NLP", "Computer Vision", "AI Agents", "OpenCV"] },
  { title: "Tools & Methods", items: ["Postman", "Agile / Scrum"] },
];

export const FAMILIAR: { name: string; icon?: IconType }[] = [
  { name: "Microservices" },
  { name: "Kafka" },
  { name: "API Gateway" },
  { name: "OAuth2" },
  { name: "Hibernate" },
  { name: "JUnit" },
  { name: "Mockito" },
  { name: "AWS", icon: FaAws },
  { name: "Terraform" },
  { name: "RAG" },
  { name: "Vector Databases" },
  { name: "LangChain" },
];

export const EXPERIENCE = [
  {
    company: "Sagent M&C Pvt. Ltd.",
    sub: "Agile team · US Mortgage domain",
    role: "Full Stack Developer Intern",
    period: "Jan 2026 – Apr 2026",
    stack: ["Java", "Spring Boot", "React.js", "SQL", "Docker", "Kubernetes"],
    bullets: [
      "Built and enhanced 8+ full-stack features / modules using Java Spring Boot, React.js and SQL.",
      "Worked on frontend UI and backend service logic.",
      "Worked with Docker and Kubernetes deployment workflows across 4+ services and 2 environments.",
      "Participated in Agile sprints involving US Mortgage domain workflows.",
    ],
  },
  {
    company: "Edunet Foundation",
    sub: "IBM SkillsBuild + AICTE",
    role: "AI & Cloud Intern",
    period: "Jul 2025",
    stack: ["IBM Cloud", "Watson Studio", "Watson ML", "Watson Assistant", "Watson NLU"],
    bullets: [
      "Built and deployed cloud-based AI applications using IBM Cloud, Watson Studio and Watson Machine Learning.",
      "Worked with model training and deployment.",
      "Developed NLP and conversational-AI solutions using Watson Assistant, Watson NLU and REST APIs.",
      "Worked on API-integrated AI features and Agile iterations.",
    ],
  },
];

export const CERTS = [
  { title: "Oracle Certified Professional", sub: "Java SE 17" },
  { title: "IBM Data Science", sub: "Professional certificate" },
  { title: "Google Data Analytics", sub: "Professional certificate" },
  { title: "SAP Generative AI Developer", sub: "Certificate" },
];

export const SERVICES = [
  {
    title: "Full-Stack Web Apps",
    text: "Spring Boot + React applications with secure REST APIs, JWT / RBAC, SQL persistence and real-time WebSocket features.",
    chips: ["Java", "Spring Boot", "React", "SQL"],
  },
  {
    title: "AI-Powered Products",
    text: "LLM agents, NLP and ML services wired into real products — from root-cause analysis to anomaly detection.",
    chips: ["FastAPI", "Claude AI", "ML", "NLP"],
  },
  {
    title: "Cloud & DevOps",
    text: "Containerised services, Kubernetes deployment workflows and GitLab CI/CD pipelines across multiple environments.",
    chips: ["Docker", "Kubernetes", "GitLab CI/CD"],
  },
  {
    title: "Interactive Experiences",
    text: "Polished, motion-rich interfaces with Tailwind CSS — dashboards, analytics views and live notification UIs.",
    chips: ["React", "Tailwind", "Dashboards"],
  },
];

export function buildResumeText() {
  const lines: string[] = [];
  lines.push("MUTHUKUMARAN N");
  lines.push("Software Engineer | Full-Stack Developer — Chennai, India");
  lines.push("");
  lines.push("EDUCATION");
  lines.push("B.Tech Information Technology — Easwari Engineering College, Chennai (CGPA 8.22/10)");
  lines.push("");
  lines.push("EXPERIENCE");
  EXPERIENCE.forEach((e) => {
    lines.push(`${e.role} — ${e.company} (${e.period})`);
    e.bullets.forEach((b) => lines.push(`  - ${b}`));
    lines.push("");
  });
  lines.push("PROJECTS");
  PROJECTS.forEach((p) => {
    lines.push(`${p.title} [${p.tech.map((t) => t.name).join(", ")}]`);
    p.highlights.forEach((b) => lines.push(`  - ${b}`));
    lines.push("");
  });
  lines.push("SKILLS");
  SKILL_GROUPS.forEach((g) => lines.push(`${g.title}: ${g.items.join(", ")}`));
  lines.push(`Familiar with: ${FAMILIAR.map((f) => f.name).join(", ")}`);
  lines.push("");
  lines.push("CERTIFICATIONS & ACHIEVEMENTS");
  CERTS.forEach((c) => lines.push(`  - ${c.title} (${c.sub})`));
  lines.push("  - Top 18% in AgentathonX & GitLab Hackathon");
  lines.push("  - 786+ LeetCode problems solved, rating 1,820 (stated global ranking: top 7.47%)");
  return lines.join("\n");
}

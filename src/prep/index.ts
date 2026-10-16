import type { Part } from "./types";
import { PART1, PART2 } from "./p1p2";
import { PROJECT1 } from "./proj1";
import { PROJECT2 } from "./proj2";
import { PROJECT3 } from "./proj3";
import { P4_CORE } from "./p4a";
import { P4_STACK } from "./p4b";
import { PART5 } from "./p5";
import { PART6 } from "./p6";
import { PART7, PART8, PART9 } from "./p7p9";

const PART3: Part = {
  id: "projects",
  no: "03",
  short: "Projects",
  title: "Deep Project Explanations",
  blurb: "Three projects × (2-minute script, architecture diagram, 10-point deep-dive and 15+ technical Q&As). Anything uncertain is flagged ‘confirm’, never stated as fact.",
  blocks: [
    {
      kind: "callout",
      tone: "info",
      title: "How to use this part",
      text: "Memorise the 2-minute scripts, redraw each diagram from memory, then replace every ‘confirm’ item with what your code really does. Resume-backed facts are stated plainly; everything else is a labelled example.",
    },
    ...PROJECT1,
    ...PROJECT2,
    ...PROJECT3,
  ],
};

const PART4: Part = {
  id: "technical",
  no: "04",
  short: "Technical Q&A",
  title: "Technical Interview Questions",
  blurb: "Java 17, OOP, collections, JVM, DSA, SQL, Spring, React, security, DevOps, ML, LLMs and systems. Use the Essential / Advanced filter to prioritise.",
  blocks: [
    {
      kind: "callout",
      tone: "good",
      title: "Hands-on vs ‘familiar with’",
      text: "Hands-on: Java, SQL, Spring Boot/Security/Data JPA/WebSocket, FastAPI, JWT, React, MySQL/PostgreSQL/MongoDB/Redis, Docker, Kubernetes, GitLab CI/CD, IBM Cloud. Familiar with: Microservices, Kafka, API Gateway, OAuth2, Hibernate, JUnit, Mockito, AWS, Terraform, RAG, Vector Databases, LangChain — explain concepts honestly and don't claim production use.",
    },
    ...P4_CORE,
    ...P4_STACK,
  ],
};

export const PARTS: Part[] = [PART1, PART2, PART3, PART4, PART5, PART6, PART7, PART8, PART9];

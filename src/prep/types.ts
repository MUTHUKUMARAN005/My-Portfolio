export type Level = "essential" | "advanced";

export type QA = {
  q: string;
  a: string;
  follow?: string[];
  level?: Level;
  /** Anything the candidate must verify against what they actually built — never present as fact. */
  confirm?: string;
};

export type Claim = {
  claim: string;
  risk: "High" | "Medium" | "Low";
  substantiate: string[];
  probes: string[];
};

export type Day = {
  day: string;
  focus: string;
  topics: string[];
  coding: string[];
  mock: string;
  checkpoint: string;
};

export type Block =
  | { kind: "heading"; title: string; sub?: string }
  | { kind: "text"; title?: string; paragraphs: string[]; speech?: boolean }
  | { kind: "list"; title: string; items: string[]; tone?: "default" | "warn" | "good" }
  | { kind: "callout"; tone: "warn" | "info" | "good"; title: string; text: string }
  | { kind: "qa"; title: string; subtitle?: string; items: QA[] }
  | { kind: "diagram"; title: string; art: string; note?: string }
  | {
      kind: "code";
      title: string;
      level?: Level;
      problem: string;
      code: string;
      io?: string;
      time: string;
      space: string;
      dry?: string;
      why?: string;
    }
  | {
      kind: "scenario";
      title: string;
      symptom: string;
      investigate: string[];
      root: string;
      fix: string[];
      verify: string[];
    }
  | { kind: "claims"; items: Claim[] }
  | { kind: "plan"; days: Day[] };

export type Part = {
  id: string;
  no: string;
  short: string;
  title: string;
  blurb: string;
  blocks: Block[];
};

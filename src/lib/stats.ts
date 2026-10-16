import { Boxes, Code, GraduationCap, Trophy } from "lucide-react";

/**
 * Stats are taken from the resume (not the mock-up): 786+ LeetCode problems, CGPA 8.22,
 * 20+ REST endpoints (NGO platform) and Top 18% in the AgentathonX & GitLab Hackathon.
 */
export const STATS = [
  { icon: Code, to: 786, suffix: "+", decimals: 0, prefix: "", label: "LeetCode Problems", short: "LeetCode Problems Solved" },
  { icon: GraduationCap, to: 8.22, suffix: "", decimals: 2, prefix: "", label: "CGPA (B.Tech IT)", short: "CGPA · B.Tech IT" },
  { icon: Boxes, to: 20, suffix: "+", decimals: 0, prefix: "", label: "REST API Endpoints", short: "REST Endpoints Built" },
  { icon: Trophy, to: 18, suffix: "%", decimals: 0, prefix: "Top ", label: "AgentathonX Hackathon", short: "AgentathonX & GitLab" },
];

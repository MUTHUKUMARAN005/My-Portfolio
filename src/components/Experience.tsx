import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Award, Briefcase, GraduationCap, MapPin, Target } from "lucide-react";
import { CERTS, EXPERIENCE } from "@/lib/data";
import { EASE, container } from "@/lib/ready";
import { Reveal, SectionLabel, SplitHeading } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  return (
    <div ref={ref} className="relative pl-10 sm:pl-12">
      <div className="absolute bottom-2 left-[11px] top-2 w-px bg-white/10" />
      <motion.div
        style={{ scaleY }}
        className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-sky via-brand to-brand/30 shadow-[0_0_12px_#5b8cff]"
      />
      <div className="space-y-8">
        {EXPERIENCE.map((e, i) => (
          <Reveal key={e.company} delay={i * 0.1} x={-30} y={20}>
            <div className="group relative">
              <span className="absolute -left-[41px] top-6 flex h-6 w-6 items-center justify-center sm:-left-[49px]">
                <span className="absolute h-6 w-6 animate-ping rounded-full bg-brand/40 [animation-duration:2.6s]" />
                <span className="relative h-3.5 w-3.5 rounded-full border-2 border-sky bg-ink shadow-[0_0_14px_#8fcaff] transition-colors group-hover:bg-sky" />
              </span>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-panel/70 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-sky/40 hover:shadow-[0_20px_60px_-20px_rgba(47,91,255,0.5)]">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-[17px] font-bold tracking-tight">
                      <Briefcase size={16} className="text-sky" />
                      {e.company}
                    </div>
                    <div className="mt-1 text-[13.5px] text-white/70">{e.role}</div>
                    <div className="mt-0.5 font-mono text-[10.5px] uppercase tracking-wider text-white/40">{e.sub}</div>
                  </div>
                  <span className="rounded-full border border-sky/30 bg-sky/10 px-3 py-1 font-mono text-[11px] text-sky">{e.period}</span>
                </div>
                <ul className="mt-5 space-y-2">
                  {e.bullets.map((b, bi) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + bi * 0.1, duration: 0.6, ease: EASE }}
                      className="flex gap-2.5 text-[13px] leading-relaxed text-white/65"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-sky" />
                      {b}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {e.stack.map((s) => (
                    <span key={s} className="rounded-full bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] text-white/70">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function CgpaRing() {
  const r = 42;
  return (
    <div className="relative h-28 w-28 shrink-0">
      <div className="absolute inset-2 rounded-full bg-brand/20 blur-xl" />
      <svg viewBox="0 0 100 100" className="relative h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2f5bff" />
            <stop offset="100%" stopColor="#8fcaff" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#cg)"
          strokeWidth="6"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          initial={{ strokeDashoffset: 1 }}
          whileInView={{ strokeDashoffset: 1 - 0.822 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: EASE, delay: 0.2 }}
          style={{ filter: "drop-shadow(0 0 6px rgba(120,170,255,.8))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-extrabold leading-none">
          <Counter to={8.22} decimals={2} />
        </span>
        <span className="mt-0.5 font-mono text-[9px] text-white/45">/ 10 CGPA</span>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative z-10 border-t border-white/[0.06] py-24 lg:py-28">
      <div className={`${container} grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16`}>
        <div>
          <SectionLabel n="05">Experience</SectionLabel>
          <SplitHeading
            className="mb-12 mt-5 text-[clamp(2rem,3.6vw,3.2rem)] font-extrabold tracking-[-0.03em]"
            lines={[{ text: "Where I've been" }, { text: "learning by shipping.", className: "text-shimmer" }]}
          />
          <Timeline />
        </div>

        <div id="education">
          <SectionLabel n="06">Education</SectionLabel>
          <Reveal className="mt-8" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-panel/70 p-6 backdrop-blur">
              <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-ember/10 blur-3xl" />
              <div className="flex items-center gap-5">
                <CgpaRing />
                <div>
                  <div className="flex items-center gap-2 text-[17px] font-bold leading-tight tracking-tight">
                    <GraduationCap size={18} className="shrink-0 text-sky" />
                    Easwari Engineering College
                  </div>
                  <div className="mt-1 text-[13.5px] text-white/70">B.Tech Information Technology</div>
                  <div className="mt-2 flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-white/40">
                    <MapPin size={11} /> Chennai · Sep 2023 – Present
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <SectionLabel n="07" className="mt-12">
            Certifications & Wins
          </SectionLabel>
          <div className="mt-6 space-y-2.5">
            {CERTS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08} x={30} y={0}>
                <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition-all duration-300 hover:translate-x-1.5 hover:border-sky/40 hover:bg-white/[0.06]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/25 text-sky transition-transform duration-500 group-hover:rotate-[360deg]">
                    <Award size={16} />
                  </span>
                  <div>
                    <div className="text-[13.5px] font-semibold">{c.title}</div>
                    <div className="text-[11.5px] text-white/50">{c.sub}</div>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.35} x={30} y={0}>
              <div className="flex items-center gap-4 rounded-2xl border border-ember/30 bg-ember/[0.06] px-4 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ember/20 text-ember">
                  <Target size={16} />
                </span>
                <div>
                  <div className="text-[13.5px] font-semibold">Top 18% · AgentathonX & GitLab Hackathon</div>
                  <div className="text-[11.5px] text-white/50">786+ LeetCode problems · rating 1,820 · top 7.47% (as stated)</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

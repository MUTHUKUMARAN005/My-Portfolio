import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Brain, Container, Layers, Sparkles } from "lucide-react";
import { CORE_SKILLS, FAMILIAR, SERVICES, SKILL_GROUPS } from "@/lib/data";
import { EASE, container } from "@/lib/ready";
import { Reveal, SectionLabel, SplitHeading } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/utils/cn";

export function Skills() {
  return (
    <section id="skills" className="relative z-10 border-t border-white/[0.06] py-24 lg:py-28">
      <div className={container}>
        <SectionLabel n="03">Skills</SectionLabel>
        <SplitHeading
          className="mt-5 text-[clamp(2rem,3.6vw,3.2rem)] font-extrabold tracking-[-0.03em]"
          lines={[{ text: "Tools I build with," }, { text: "and what I'm still learning.", className: "text-shimmer" }]}
        />

        {/* Hands-on icon strip */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {CORE_SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.7, ease: EASE }}
              whileHover={{ y: -8 }}
              style={{ "--c": s.color } as CSSProperties}
              className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-6 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-8px_var(--c)]"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3 + (i % 4) * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              >
                <s.icon size={38} style={{ color: s.color, filter: `drop-shadow(0 0 12px ${s.color}88)` }} />
              </motion.div>
              <span className="text-[12px] font-medium text-white/80">{s.name}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Hands-on groups */}
          <div className="rounded-3xl border border-white/10 bg-panel/60 p-6 backdrop-blur sm:p-8">
            <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-sky">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              Hands-on
            </div>
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {SKILL_GROUPS.map((g, gi) => (
                <div key={g.title}>
                  <div className="mb-2.5 text-[12px] font-semibold uppercase tracking-wider text-white/45">{g.title}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((it, i) => (
                      <motion.span
                        key={it}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: gi * 0.05 + i * 0.04, duration: 0.4 }}
                        whileHover={{ y: -2, backgroundColor: "rgba(47,91,255,0.25)" }}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] text-white/85"
                      >
                        {it}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Familiar */}
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-ember/30 bg-ember/[0.03] p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ember/10 blur-3xl" />
            <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ember">
              <span className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_10px_#ff9f43]" />
              Familiar with
            </div>
            <p className="mb-6 text-[12.5px] leading-relaxed text-white/50">
              Exposure through learning and smaller builds — honestly separated from the hands-on stack.
            </p>
            <div className="flex flex-wrap gap-2">
              {FAMILIAR.map((f, i) => (
                <motion.span
                  key={f.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="flex items-center gap-1.5 rounded-full border border-ember/25 bg-ink/50 px-3 py-1.5 text-[12px] text-white/80"
                >
                  {f.icon && <f.icon size={13} className="text-ember" />}
                  {f.name}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICE_ICONS = [Layers, Brain, Container, Sparkles];

export function Services() {
  return (
    <section id="services" className="relative z-10 border-t border-white/[0.06] py-24 lg:py-28">
      <div className={container}>
        <SectionLabel n="04">Services</SectionLabel>
        <SplitHeading
          className="mt-5 text-[clamp(2rem,3.6vw,3.2rem)] font-extrabold tracking-[-0.03em]"
          lines={[{ text: "What I can build" }, { text: "for your team.", className: "text-shimmer" }]}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <Reveal key={s.title} delay={i * 0.1} y={40}>
                <TiltCard className="h-full rounded-3xl" glow="rgba(255,150,60,0.16)">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-panel/60 p-6 backdrop-blur transition-colors duration-500 hover:border-sky/40">
                    <span className="absolute right-5 top-4 font-mono text-[44px] font-bold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-sky/15">
                      0{i + 1}
                    </span>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/40 to-sky/10 ring-1 ring-white/10 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <Icon size={22} className="text-sky" />
                    </div>
                    <h3 className="text-[18px] font-bold tracking-tight">{s.title}</h3>
                    <p className="mt-3 flex-1 text-[13px] leading-relaxed text-white/60">{s.text}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {s.chips.map((c) => (
                        <span key={c} className={cn("rounded-full bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] text-white/70")}>
                          {c}
                        </span>
                      ))}
                    </div>
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-brand to-sky transition-all duration-700 group-hover:w-full" />
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

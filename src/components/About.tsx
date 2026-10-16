import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PortraitAttachment, PortraitImage } from "@/components/Portrait";
import { STATS } from "@/lib/stats";
import { EASE, container } from "@/lib/ready";
import { Reveal, SectionLabel, SplitHeading } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { TiltCard } from "@/components/ui/TiltCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/utils/cn";

const wipe = (delay: number) => ({
  initial: { clipPath: "inset(0 100% 0 0)" },
  whileInView: { clipPath: "inset(0 0% 0 0)" },
  viewport: { once: true },
  transition: { duration: 1.5, ease: "easeInOut" as const, delay },
});

export function About({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section id="about" className="relative z-10 overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute left-[22%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(255,140,50,0.2),transparent_65%)] blur-2xl" />

      <div className={cn(container, "grid items-center gap-14 lg:grid-cols-12 lg:gap-6")}>
        {/* Copy */}
        <div className="lg:col-span-4">
          <SectionLabel n="01">About Me</SectionLabel>
          <SplitHeading
            className="mt-6 text-[clamp(2.4rem,4.4vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
            lines={[{ text: "More than" }, { text: "a developer." }]}
          />
          <Reveal delay={0.15} className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/65">
            I build digital experiences that combine engineering, design and interaction. I'm passionate about full-stack
            development, AI-powered products, interactive web experiences and modern digital solutions.
          </Reveal>
          <Reveal delay={0.25} className="mt-8">
            <Magnetic strength={0.25}>
              <button
                onClick={() => onNav("experience")}
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13.5px] font-semibold text-ink"
              >
                Know More About Me
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </Magnetic>
          </Reveal>
        </div>

        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-[360px] lg:col-span-3">
          <div className="relative aspect-[4/4.6]">
            <div className="absolute inset-[6%] animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(255,150,60,0.9),transparent_55%,rgba(100,150,255,0.7),transparent)] opacity-70 blur-xl" />
            <div className="absolute inset-[10%] rounded-full border border-ember/40 shadow-[0_0_60px_rgba(255,140,50,0.35),inset_0_0_60px_rgba(255,140,50,0.15)]" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
              className="absolute inset-0"
            >
              <PortraitImage variant="about" />
            </motion.div>
          </div>
          <div className="absolute -left-2 top-[34%] -rotate-[8deg] font-hand text-[28px] leading-[1.05] text-white/75 sm:-left-14 lg:-left-16">
            <motion.div {...wipe(0.2)}>Curious</motion.div>
            <motion.div {...wipe(0.7)}>Creative</motion.div>
            <motion.div {...wipe(1.2)}>Consistent</motion.div>
          </div>
          <PortraitAttachment />
        </div>

        {/* Stats + note */}
        <div className="lg:col-span-5 lg:pl-8">
          <div className="grid grid-cols-2 gap-3.5">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} y={36}>
                <TiltCard className="rounded-2xl" glow="rgba(80,130,255,0.25)">
                  <div className="relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand/[0.14] to-white/[0.02] p-5 backdrop-blur transition-colors duration-500 hover:border-sky/50">
                    <div className="absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-sky/60 to-transparent opacity-0 group-hover:opacity-100" />
                    <s.icon size={30} strokeWidth={1.5} className="shrink-0 text-sky" />
                    <div>
                      <div className="text-[24px] font-bold leading-none tracking-tight">
                        <Counter to={s.to} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                      </div>
                      <div className="mt-1.5 text-[12.5px] leading-tight text-white/60">{s.short}</div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-8 flex items-end justify-between gap-6">
            <p className="max-w-[17rem] text-[13px] leading-relaxed text-white/55">
              I enjoy solving real-world problems, learning new technologies and creating products that make an impact. From
              full-stack web applications to AI/ML solutions and cloud platforms, I love turning ideas into working products.
            </p>
            <div className="shrink-0 text-right">
              <motion.div {...wipe(0.4)} className="font-script text-[54px] leading-[0.8] text-white/90">
                Muthukumaran N
              </motion.div>
              <div className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.3em] text-white/45">Full-Stack Developer</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";
import { LINKS, PROJECTS } from "@/lib/data";
import { EASE, container } from "@/lib/ready";
import { Reveal, SectionLabel, SplitHeading } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/utils/cn";

type Project = (typeof PROJECTS)[number];

function Tag({ p }: { p: Project }) {
  return (
    <span
      className={cn(
        "inline-block rounded px-2 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em]",
        p.tone === "ember" ? "bg-ember/90 text-ink" : "bg-brand/80 text-white",
      )}
    >
      {p.tag}
    </span>
  );
}

function TechChips({ p, size = "sm" }: { p: Project; size?: "sm" | "md" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {p.tech.map((t, i) => (
        <motion.span
          key={t.name}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: EASE }}
          whileHover={{ y: -3 }}
          className={cn(
            "flex items-center gap-1.5 rounded-full border border-white/10 bg-ink/70 backdrop-blur",
            size === "sm" ? "px-2.5 py-1.5 text-[11px]" : "px-3.5 py-2 text-[12.5px]",
          )}
        >
          <t.icon size={size === "sm" ? 13 : 15} style={{ color: t.color }} />
          {t.name}
        </motion.span>
      ))}
    </div>
  );
}

function ProjectModal({ p, onClose, onPrep }: { p: Project; onClose: () => void; onPrep: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 60, scale: 0.92, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="beam relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-panel"
      >
        <div className="relative h-52 overflow-hidden">
          <img src={p.image} alt={p.title} className="animate-kenburns h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/40 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 backdrop-blur transition-transform hover:rotate-90"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-6">
            <Tag p={p} />
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{p.title}</h3>
          <p className="mt-2 text-[14.5px] text-white/65">{p.short}</p>
          <ul className="mt-6 space-y-3">
            {p.highlights.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.09, ease: EASE, duration: 0.6 }}
                className="flex gap-3 text-[14px] leading-relaxed text-white/80"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/30 text-sky">
                  <Check size={12} />
                </span>
                {h}
              </motion.li>
            ))}
          </ul>
          <div className="mt-6">
            <TechChips p={p} size="md" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onPrep}
              className="rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-ink transition-transform hover:scale-105"
            >
              Open interview deep-dive
            </button>
            <button onClick={onClose} className="rounded-full border border-white/20 px-5 py-2.5 text-[13px] hover:bg-white/10">
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects({ onPrep }: { onPrep: () => void }) {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="work" className="relative z-10 border-t border-white/[0.06] py-24 lg:py-28">
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel n="02">Selected Work</SectionLabel>
            <SplitHeading
              className="mt-5 text-[clamp(2rem,3.6vw,3.2rem)] font-extrabold tracking-[-0.03em]"
              lines={[{ text: "A few of my recent projects" }, { text: "that showcase my skills.", className: "text-shimmer" }]}
            />
          </div>
          <Reveal>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-1.5 text-[13px] text-white/70 transition-colors hover:text-white"
            >
              View All Projects
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12} y={50}>
              <TiltCard className="h-full rounded-3xl" max={5} glow="rgba(80,130,255,0.18)">
                <article
                  className={cn(
                    "beam relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-panel/80",
                    p.tone === "ember" && "beam-ember",
                  )}
                >
                  <div className="absolute inset-x-0 top-0 h-[64%] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute right-0 top-0 h-full w-[88%] object-cover opacity-90 transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-panel via-panel/75 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
                  </div>

                  <div className="relative z-20 flex flex-1 flex-col p-6">
                    <div>
                      <Tag p={p} />
                      <h3 className="mt-4 max-w-[15rem] text-[22px] font-bold leading-tight tracking-tight">{p.title}</h3>
                      <p className="mt-3 max-w-[15rem] text-[13px] leading-relaxed text-white/65">{p.short}</p>
                      <div className="mt-3 flex items-center gap-1.5 font-mono text-[10.5px] text-sky/90">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky" />
                        {p.badge}
                      </div>
                      <button
                        onClick={() => setOpen(p)}
                        className="group/btn mt-5 flex items-center gap-1.5 rounded-full border border-white/25 bg-ink/40 px-4 py-2 text-[12.5px] font-medium backdrop-blur transition-all hover:border-white hover:bg-white hover:text-ink"
                      >
                        View Project
                        <ArrowUpRight size={13} className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                      </button>
                    </div>
                    <div className="mt-auto pt-14">
                      <TechChips p={p} />
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <ProjectModal
            p={open}
            onClose={() => setOpen(null)}
            onPrep={() => {
              setOpen(null);
              onPrep();
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

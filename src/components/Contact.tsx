import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { FaGithub, FaGitlab, FaLinkedin } from "react-icons/fa";
import { LINKS } from "@/lib/data";
import { EASE, container } from "@/lib/ready";
import { Reveal, SectionLabel, SplitHeading } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

export function Contact() {
  const href = LINKS.email ? `mailto:${LINKS.email}?subject=Hello%20Muthukumaran` : LINKS.linkedin;

  return (
    <section id="contact" className="relative z-10 overflow-hidden border-t border-white/[0.06] py-28 lg:py-36">
      {/* aurora */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[10%] top-10 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[110px]"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[8%] h-[380px] w-[380px] rounded-full bg-ember/20 blur-[110px]"
        animate={{ x: [0, -70, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className={`${container} relative`}>
        <SectionLabel n="08">Contact</SectionLabel>
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SplitHeading
              className="text-[clamp(2.6rem,6vw,5.6rem)] font-extrabold leading-[1.02] tracking-[-0.035em]"
              lines={[{ text: "Let's build something" }, { text: "amazing together.", className: "text-shimmer" }]}
            />
            <Reveal delay={0.2} className="mt-7 max-w-md text-[15px] leading-relaxed text-white/60">
              Open to full-time opportunities, internships and interesting projects — Java, Spring Boot, React and AI/Cloud.
            </Reveal>
            <Reveal delay={0.3} className="mt-6 flex flex-wrap items-center gap-3 text-[12.5px] text-white/60">
              <span className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to opportunities
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} /> Chennai, India
              </span>
            </Reveal>
          </div>

          <div className="flex flex-col items-center gap-8 lg:items-end">
            <Magnetic strength={0.35}>
              <a href={href} target={LINKS.email ? undefined : "_blank"} rel="noreferrer" className="group relative block h-44 w-44">
                <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0 h-full w-full">
                  <defs>
                    <path id="circ" d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0" />
                  </defs>
                  <text fontSize="11" fill="#8fcaff" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
                    <textPath href="#circ" textLength="470" lengthAdjust="spacing">
                      OPEN TO FULL-TIME ROLES • INTERNSHIPS •
                    </textPath>
                  </text>
                </svg>
                <span className="absolute inset-[22px] flex flex-col items-center justify-center rounded-full bg-gradient-to-b from-[#2450ff] to-[#1230b8] text-[13px] font-bold shadow-[0_0_50px_-4px_rgba(47,91,255,0.9)] transition-transform duration-500 group-hover:scale-110">
                  Get In Touch
                  <ArrowUpRight size={20} className="mt-1 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
              </a>
            </Magnetic>

            <div className="flex items-center gap-3">
              {[
                { i: <FaLinkedin size={18} />, h: LINKS.linkedin, l: "LinkedIn" },
                { i: <FaGithub size={18} />, h: LINKS.github, l: "GitHub" },
                { i: <FaGitlab size={18} />, h: LINKS.gitlab, l: "GitLab" },
              ].map((s, i) => (
                <motion.a
                  key={s.l}
                  href={s.h}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.l}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, ease: EASE, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-sky hover:bg-sky/15 hover:text-sky"
                >
                  {s.i}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6 font-mono text-[11px] text-white/40">
          <span>© {new Date().getFullYear()} Muthukumaran N · Chennai, India</span>
          <span>Built with React · Tailwind CSS · Framer Motion</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition-colors hover:text-sky"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </section>
  );
}

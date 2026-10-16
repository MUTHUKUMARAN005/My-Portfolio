import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Brain, ChevronDown, Cloud, Code2, Download, Mail } from "lucide-react";
import { FaGithub, FaGitlab, FaJava, FaLinkedin } from "react-icons/fa";
import { SiReact } from "react-icons/si";
import heroBg from "@/assets/hero-bg.jpg";
import { PortraitImage } from "@/components/Portrait";
import { LINKS, buildResumeText } from "@/lib/data";
import { STATS } from "@/lib/stats";
import { EASE, container, useReady } from "@/lib/ready";
import { SplitHeading } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/utils/cn";

function downloadResume() {
  const blob = new Blob([buildResumeText()], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Muthukumaran_N_Resume.txt";
  a.click();
  URL.revokeObjectURL(url);
}

/* ---------- Orbit ring (rendered twice: behind & in front of the portrait for depth) ---------- */
function Ring({ front }: { front?: boolean }) {
  const id = front ? "f" : "b";
  return (
    <svg viewBox="0 0 600 760" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={`rg-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff7a2e" />
          <stop offset="35%" stopColor="#ffd9a0" />
          <stop offset="55%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ff8a3d" />
        </linearGradient>
        <clipPath id={`clip-${id}`}>
          <rect x="-200" y={front ? 470 : -200} width="1000" height={front ? 500 : 1200} />
        </clipPath>
        <filter id={`blur-${id}`}>
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <g clipPath={`url(#clip-${id})`}>
        <g transform="rotate(-16 300 470)">
          <ellipse cx="300" cy="470" rx="300" ry="100" fill="none" stroke="#ff8a3d" strokeWidth="14" opacity="0.35" filter={`url(#blur-${id})`} />
          <ellipse cx="300" cy="470" rx="300" ry="100" fill="none" stroke={`url(#rg-${id})`} strokeWidth="1.2" opacity="0.55" />
          <ellipse
            cx="300"
            cy="470"
            rx="300"
            ry="100"
            fill="none"
            stroke={`url(#rg-${id})`}
            strokeWidth="3.2"
            strokeLinecap="round"
            pathLength={1000}
            strokeDasharray="380 120"
            className="animate-flow"
            style={{ filter: "drop-shadow(0 0 8px rgba(255,150,60,.9))" }}
          />
          <path id={`orb-${id}`} d="M 0 470 a 300 100 0 1 0 600 0 a 300 100 0 1 0 -600 0" fill="none" />
          <circle r="5" fill="#fff" style={{ filter: "drop-shadow(0 0 10px #ffb35c) drop-shadow(0 0 4px #fff)" }}>
            <animateMotion dur="7s" repeatCount="indefinite">
              <mpath href={`#orb-${id}`} />
            </animateMotion>
          </circle>
        </g>
      </g>
    </svg>
  );
}

/* ---------- Floating glass card with mouse parallax ---------- */
function FloatCard({
  depth,
  className,
  delay,
  tilt,
  mx,
  my,
  children,
}: {
  depth: number;
  className: string;
  delay: number;
  tilt: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  children: ReactNode;
}) {
  const ready = useReady();
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={cn("absolute z-30", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 40 }}
        animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ delay: 1 + delay, duration: 1, ease: EASE }}
      >
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [tilt, tilt + 2.5, tilt] }}
          transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.08 }}
          className="glass flex items-center gap-2.5 rounded-2xl p-3.5 sm:p-4"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Bokeh() {
  const orbs = [
    { l: "8%", t: "22%", s: 120, c: "rgba(70,110,255,.22)", d: 9 },
    { l: "30%", t: "70%", s: 90, c: "rgba(255,150,60,.15)", d: 11 },
    { l: "52%", t: "12%", s: 70, c: "rgba(120,180,255,.18)", d: 8 },
    { l: "72%", t: "60%", s: 140, c: "rgba(70,110,255,.16)", d: 13 },
    { l: "90%", t: "18%", s: 80, c: "rgba(255,170,90,.14)", d: 10 },
  ];
  return (
    <>
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full blur-2xl"
          style={{ left: o.l, top: o.t, width: o.s, height: o.s, background: o.c }}
          animate={{ y: [0, -40, 0], x: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        />
      ))}
    </>
  );
}

export function Hero({ onNav }: { onNav: (id: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const ready = useReady();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 14, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 50, damping: 14, mass: 0.6 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const portraitX = useTransform(smx, (v) => v * 18);
  const portraitY = useTransform(smy, (v) => v * 10);

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      className="relative min-h-[100svh] overflow-hidden pt-[88px]"
    >
      {/* Background plate */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -bottom-24">
        <img src={heroBg} alt="" className="animate-kenburns h-full w-full object-cover object-right opacity-70" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      <Bokeh />

      <motion.div
        style={{ opacity: heroOpacity }}
        className={cn(
          container,
          "relative z-10 grid min-h-[calc(100svh-88px)] items-center gap-6 pb-24 lg:grid-cols-[1.08fr_1fr_0.5fr] lg:gap-4 lg:pb-16",
        )}
      >
        {/* ---------------- Left: copy ---------------- */}
        <motion.div style={{ y: textY }} className="relative z-20 pt-6 lg:pt-0">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.42em] text-sky/80"
          >
            Full-Stack Developer
          </motion.p>

          <SplitHeading
            as="h1"
            delay={0.15}
            className="text-[clamp(2.5rem,5.3vw,5.1rem)] font-extrabold leading-[1.03] tracking-[-0.03em]"
            lines={[
              { text: "Building digital" },
              { text: "experiences that" },
              { text: "people remember.", className: "text-shimmer" },
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
            className="mt-6 max-w-[27rem] text-[15px] leading-relaxed text-white/70"
          >
            I'm Muthukumaran, a Full-Stack Developer who loves building scalable web applications, AI-powered products and
            interactive digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.95 }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <Magnetic strength={0.3}>
              <button
                onClick={() => onNav("work")}
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-ink"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-sky/0 via-sky/50 to-sky/0 transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">View My Work</span>
                <ArrowUpRight size={15} className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button
                onClick={downloadResume}
                className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-[14px] font-medium backdrop-blur transition-colors hover:border-sky/60 hover:bg-white/10"
              >
                Download Resume
                <Download size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </Magnetic>
          </motion.div>

          <div className="mt-8 flex items-center gap-5">
            {[
              { i: <FaGithub size={22} />, href: LINKS.github, l: "GitHub" },
              { i: <FaLinkedin size={22} />, href: LINKS.linkedin, l: "LinkedIn" },
              { i: <FaGitlab size={22} />, href: LINKS.gitlab, l: "GitLab" },
              { i: <Mail size={22} />, href: LINKS.email ? `mailto:${LINKS.email}` : "#contact", l: "Contact" },
            ].map((s, i) => (
              <motion.a
                key={s.l}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.l}
                initial={{ opacity: 0, y: 14 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.1 + i * 0.08, duration: 0.7, ease: EASE }}
                whileHover={{ y: -4, scale: 1.15 }}
                className="text-white/80 transition-colors hover:text-sky"
              >
                {s.i}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ---------------- Center: portrait + orbit + floating cards ---------------- */}
        <div className="relative mx-auto aspect-[4/5.2] w-full max-w-[560px] lg:-mx-6 lg:max-w-none">
          <div className="absolute left-1/2 top-[40%] h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(255,150,60,0.28),rgba(70,110,255,0.15)_50%,transparent_70%)] blur-2xl" />
          <Ring />

          <motion.div
            style={{ x: portraitX, y: portraitY }}
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            className="absolute inset-0 z-10 flex items-end justify-center"
          >
            <PortraitImage variant="hero" />
          </motion.div>

          <div className="absolute inset-0 z-20">
            <Ring front />
          </div>

          <FloatCard mx={smx} my={smy} depth={46} delay={0.1} tilt={-6} className="-left-[2%] top-[10%]">
            <Code2 size={30} className="text-sky" />
          </FloatCard>
          <FloatCard mx={smx} my={smy} depth={70} delay={0.25} tilt={-4} className="-left-[2%] top-[38%] sm:-left-[8%]">
            <FaJava size={30} className="text-[#f89820]" />
            <div className="text-[12px] font-semibold leading-tight">
              Java
              <br />
              <span className="text-white/70">Spring Boot</span>
            </div>
          </FloatCard>
          <FloatCard mx={smx} my={smy} depth={34} delay={0.4} tilt={5} className="left-[2%] top-[66%]">
            <div className="flex h-9 items-end gap-1">
              {[40, 65, 50, 90].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-2.5 rounded-sm bg-gradient-to-t from-brand to-sky"
                  animate={{ height: [`${h * 0.45}%`, `${h}%`, `${h * 0.55}%`] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
                />
              ))}
            </div>
          </FloatCard>
          <FloatCard mx={smx} my={smy} depth={52} delay={0.2} tilt={6} className="-right-[4%] top-[7%]">
            <SiReact size={28} className="animate-spin-slow text-[#61dafb]" />
            <span className="text-[11px] font-semibold text-white/80">React.js</span>
          </FloatCard>
          <FloatCard mx={smx} my={smy} depth={64} delay={0.35} tilt={7} className="-right-[2%] top-[28%] sm:-right-[8%]">
            <Brain size={28} className="text-fuchsia-300" />
            <span className="text-[11px] font-semibold leading-tight text-white/80">
              AI / ML
            </span>
          </FloatCard>
          <FloatCard mx={smx} my={smy} depth={40} delay={0.5} tilt={-5} className="right-[4%] top-[50%]">
            <Cloud size={28} className="text-sky" />
            <span className="text-[11px] font-semibold text-white/80">Cloud</span>
          </FloatCard>
        </div>

        {/* ---------------- Right: stats timeline ---------------- */}
        <div className="relative hidden pr-8 lg:block">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={ready ? { scaleY: 1 } : {}}
            transition={{ duration: 1.6, ease: EASE, delay: 0.6 }}
            className="absolute bottom-3 right-0 top-3 w-px origin-top bg-gradient-to-b from-sky/60 via-white/20 to-transparent"
          />
          <motion.span
            className="absolute -right-[2px] h-1 w-1 rounded-full bg-white shadow-[0_0_12px_3px_rgba(143,202,255,0.9)]"
            animate={{ top: ["2%", "96%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <div className="flex flex-col gap-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 40 }}
                animate={ready ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9 + i * 0.15, duration: 0.9, ease: EASE }}
                className="group relative flex items-center gap-4"
              >
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/[0.04] backdrop-blur transition-all duration-500 group-hover:border-sky group-hover:shadow-[0_0_24px_rgba(80,140,255,0.6)]">
                  <s.icon size={20} className="text-sky" />
                  <span className="absolute inset-0 animate-ping rounded-full border border-sky/30 [animation-duration:3s]" />
                </div>
                <div>
                  <div className="text-[22px] font-bold leading-none tracking-tight">
                    <Counter to={s.to} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-[12.5px] text-white/60">{s.label}</div>
                </div>
                <span className="absolute -right-[37px] h-[7px] w-[7px] rounded-full border border-sky bg-ink transition-all duration-500 group-hover:bg-sky group-hover:shadow-[0_0_12px_rgba(143,202,255,1)]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile stats */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {STATS.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4">
              <s.icon size={18} className="mb-2 text-sky" />
              <div className="text-xl font-bold">
                <Counter to={s.to} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-[12px] text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => onNav("about")}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-label="Scroll to explore"
      >
        <span className="flex h-8 w-5 justify-center rounded-full border border-white/50 pt-1.5">
          <span className="animate-wheel h-1.5 w-[3px] rounded-full bg-white" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/70">Scroll to explore</span>
        <ChevronDown size={14} className="animate-bounce text-white/70" />
      </motion.button>
    </section>
  );
}

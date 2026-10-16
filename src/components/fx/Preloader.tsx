import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";

const NAME = "MUTHUKUMARAN".split("");

/** Cinematic intro: ring draws with progress, name rises letter-by-letter, then a split-curtain opens. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const c = animate(0, 100, {
      duration: 2.1,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setP(Math.round(v)),
      onComplete: () => setTimeout(onDone, 280),
    });
    return () => c.stop();
  }, [onDone]);

  const curtain = { duration: 1.05, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <motion.div className="fixed inset-0 z-[100]" exit={{ pointerEvents: "none" }}>
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 border-b border-sky/20 bg-ink"
        exit={{ y: "-100%" }}
        transition={curtain}
      />
      <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" exit={{ y: "100%" }} transition={curtain} />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-7"
        exit={{ opacity: 0, scale: 1.12, filter: "blur(10px)" }}
        transition={{ duration: 0.55 }}
      >
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 animate-pulse-glow rounded-full bg-brand/25 blur-2xl" />
          <svg viewBox="0 0 120 120" className="relative h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
            <defs>
              <linearGradient id="pl" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2f5bff" />
                <stop offset="60%" stopColor="#8fcaff" />
                <stop offset="100%" stopColor="#ff9f43" />
              </linearGradient>
            </defs>
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="url(#pl)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - p / 100}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold tracking-tight">
            M<span className="text-sky">N</span>
          </span>
        </div>

        <div className="flex overflow-hidden">
          {NAME.map((l, i) => (
            <motion.span
              key={i}
              className="inline-block text-xl font-bold tracking-[0.35em] text-white/90 sm:text-2xl"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {l}
            </motion.span>
          ))}
        </div>

        <div className="flex w-64 flex-col items-center gap-3">
          <div className="h-px w-full overflow-hidden bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-brand via-sky to-ember"
              style={{ width: `${p}%`, boxShadow: "0 0 14px rgba(120,170,255,.9)" }}
            />
          </div>
          <div className="flex w-full justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            <span>Full-stack developer</span>
            <span className="tabular-nums text-sky">{String(p).padStart(3, "0")}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

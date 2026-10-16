import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { MARQUEE } from "@/lib/data";

/** Infinite ticker whose skew reacts to scroll velocity. */
export function Marquee() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const skewX = useTransform(smooth, [-2500, 2500], [-9, 9], { clamp: true });
  const half = [...MARQUEE, ...MARQUEE];

  return (
    <div className="marquee relative z-10 overflow-hidden border-y border-white/[0.08] bg-ink/60 py-4 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <motion.div style={{ skewX }}>
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {half.map((t, i) => (
                <div key={`${k}-${i}`} className="flex items-center">
                  <span className="px-9 font-mono text-[12px] font-medium uppercase tracking-[0.3em] text-sky transition-colors hover:text-white">
                    {t}
                  </span>
                  <span className="text-[15px] text-white/80">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

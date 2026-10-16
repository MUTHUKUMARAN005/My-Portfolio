import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Soft ambient spotlight + magnetic ring cursor (fine pointers only). */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const gx = useSpring(x, { stiffness: 55, damping: 20, mass: 0.9 });
  const gy = useSpring(y, { stiffness: 55, damping: 20, mass: 0.9 });
  const rx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.3 });
  const ry = useSpring(y, { stiffness: 420, damping: 32, mass: 0.3 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest?.("a,button,[data-cursor]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;
  const size = hover ? 58 : 28;

  return (
    <>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[1]" style={{ x: gx, y: gy }}>
        <div
          className="-ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(70,110,255,0.14) 0%, rgba(255,150,60,0.045) 42%, transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[95] mix-blend-difference" style={{ x: rx, y: ry }}>
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 transition-all duration-300 ease-out"
          style={{
            width: size,
            height: size,
            backgroundColor: hover ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0)",
          }}
        />
      </motion.div>
    </>
  );
}

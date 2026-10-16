import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/utils/cn";

/** 3D tilt card with a cursor-following spotlight. Add `group` styling hooks via className. */
export function TiltCard({
  children,
  className,
  max = 7,
  glow = "rgba(70,120,255,0.22)",
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const spot = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, ${glow}, transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      className={cn("group relative", className)}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        mx.set(px);
        my.set(py);
        ry.set((px / r.width - 0.5) * max * 2);
        rx.set(-(py / r.height - 0.5) * max * 2);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
        mx.set(-300);
        my.set(-300);
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spot }}
      />
      {children}
    </motion.div>
  );
}

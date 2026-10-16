import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useReady } from "@/lib/ready";

/** Count-up number that starts when visible (and after the preloader). */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2.2,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const ready = useReady();
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView || !ready) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (x) => setV(x),
    });
    return () => controls.stop();
  }, [inView, ready, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

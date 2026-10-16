import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { EASE, useReady } from "@/lib/ready";
import { cn } from "@/utils/cn";

/** Fade + rise + de-blur when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  x = 0,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      onAnimationComplete={() => {
        // drop the no-op filter so backdrop-blur / fixed descendants behave normally
        if (ref.current) ref.current.style.filter = "none";
      }}
    >
      {children}
    </motion.div>
  );
}

type Line = { text: string; className?: string };

/** Masked word-by-word headline reveal (waits for preloader via ReadyContext). */
export function SplitHeading({
  lines,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: Line[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const ready = useReady();
  const show = inView && ready;
  let idx = 0;
  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.text.split(" ").map((word, wi) => {
            const i = idx++;
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
                <motion.span
                  className={cn("inline-block will-change-transform", line.className)}
                  initial={{ y: "115%", rotate: 5, opacity: 0 }}
                  animate={show ? { y: "0%", rotate: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: delay + i * 0.08, ease: EASE }}
                >
                  {word}
                  {wi < line.text.split(" ").length - 1 ? "\u00A0" : ""}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

export function SectionLabel({ n, children, className }: { n: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-sky/80", className)}>
      <motion.span initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        {n}.
      </motion.span>
      <motion.span initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        {children}
      </motion.span>
      <motion.span
        className="h-px w-16 origin-left bg-gradient-to-r from-sky/60 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV } from "@/lib/data";
import { EASE, container, useReady } from "@/lib/ready";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/utils/cn";

export type View = "portfolio" | "prep";

export function Navbar({
  view,
  onNav,
  onPrep,
  onHome,
}: {
  view: View;
  onNav: (id: string) => void;
  onPrep: () => void;
  onHome: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const ready = useReady();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 300) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (view !== "portfolio") {
      setActive("");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && window.scrollY > 300 && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [view]);

  const go = (id: string) => {
    setOpen(false);
    onNav(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className={cn(container, "flex h-[68px] items-center justify-between")}>
          <button onClick={onHome} className="group flex items-center gap-2 text-[17px] font-extrabold tracking-tight" aria-label="Home">
            <span className="relative">
              MUTHUKUMARAN
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-sky transition-all duration-500 group-hover:w-full" />
            </span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(n.id);
                }}
                className="relative px-3.5 py-2 text-[14px] text-white/80 transition-colors hover:text-white"
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {n.label}
              </a>
            ))}
            <button
              onClick={onPrep}
              className={cn(
                "relative ml-1 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14px] transition-colors",
                view === "prep" ? "bg-white/10 text-white ring-1 ring-white/10" : "text-white/80 hover:text-white",
              )}
            >
              Interview Prep
              <span className="rounded-full bg-ember/20 px-1.5 py-px font-mono text-[9px] font-semibold tracking-wider text-ember">NEW</span>
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go("contact");
                }}
                className="beam group flex items-center gap-2 rounded-full bg-gradient-to-b from-[#1a3fe0] to-[#1230b8] px-5 py-2.5 text-[13.5px] font-semibold shadow-[0_0_30px_-4px_rgba(47,91,255,0.75)] transition-shadow hover:shadow-[0_0_44px_-2px_rgba(80,130,255,0.95)]"
              >
                Let's Work Together
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
              aria-label="Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center gap-1 bg-ink/95 px-8 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {[...NAV.map((n) => ({ label: n.label, fn: () => go(n.id) })), { label: "Interview Prep", fn: () => { setOpen(false); onPrep(); } }].map((l, i) => (
              <motion.button
                key={l.label}
                onClick={l.fn}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06, ease: EASE, duration: 0.6 }}
                className="border-b border-white/5 py-4 text-left text-3xl font-bold tracking-tight text-white/90"
              >
                <span className="mr-4 font-mono text-xs text-sky/70">0{i + 1}</span>
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

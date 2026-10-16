import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ReadyContext } from "@/lib/ready";
import { ParticleField } from "@/components/fx/ParticleField";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { Preloader } from "@/components/fx/Preloader";
import { Navbar, type View } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills, Services } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { InterviewPrep } from "@/components/prep/InterviewPrep";
import { PortraitProvider } from "@/components/Portrait";

const getView = (): View => (window.location.hash.startsWith("#/prep") ? "prep" : "portfolio");

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

function PortfolioApp() {
  const [view, setView] = useState<View>(getView);
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const sync = () => setView(getView());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  // pushState can throw on file:// documents — fall back to the hash.
  const setUrl = (hash: string) => {
    try {
      history.pushState(null, "", hash || window.location.pathname + window.location.search);
    } catch {
      window.location.hash = hash;
    }
  };

  const goPrep = () => {
    setUrl("#/prep");
    setView("prep");
    window.scrollTo({ top: 0 });
  };

  const goPortfolio = (after?: string) => {
    setUrl("");
    setView("portfolio");
    window.scrollTo({ top: 0 });
    if (after) setTimeout(() => scrollToId(after), 700);
  };

  const onNav = (id: string) => {
    if (view === "prep") goPortfolio(id);
    else scrollToId(id);
  };

  const onHome = () => {
    if (view === "prep") goPortfolio();
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ReadyContext.Provider value={!loading}>
      <div className="grain relative min-h-screen bg-ink text-white">
        <ParticleField />
        <CursorGlow />
        <ScrollProgress />
        <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>

        <Navbar view={view} onNav={onNav} onPrep={goPrep} onHome={onHome} />

        <AnimatePresence mode="wait">
          {view === "portfolio" ? (
            <motion.main
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              <Hero onNav={onNav} />
              <Marquee />
              <About onNav={onNav} />
              <Projects onPrep={goPrep} />
              <Skills />
              <Services />
              <Experience />
              <Contact />
            </motion.main>
          ) : (
            <motion.main
              key="prep"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              <InterviewPrep onBack={() => goPortfolio()} />
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </ReadyContext.Provider>
  );
}

export default function App() {
  return (
    <PortraitProvider>
      <PortfolioApp />
    </PortraitProvider>
  );
}

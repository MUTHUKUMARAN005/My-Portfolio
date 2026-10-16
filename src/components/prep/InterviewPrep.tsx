import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Copy,
  Lightbulb,
  Quote,
  Search,
  ShieldCheck,
  TriangleAlert,
  X,
} from "lucide-react";
import { PARTS } from "@/prep";
import type { Block, Level, Part, QA } from "@/prep/types";
import { EASE, container } from "@/lib/ready";
import { Reveal, SectionLabel, SplitHeading } from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/*  Tiny syntax highlighter (Java + SQL)                              */
/* ------------------------------------------------------------------ */
const TOKEN =
  /(\/\/.*$|\/\*[\s\S]*?\*\/|--.*$|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|\b(?:public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|break|continue|switch|case|default|void|int|long|double|boolean|char|var|try|catch|finally|throw|throws|this|super|null|true|false|import|package|abstract|record|enum|instanceof|synchronized|volatile|sealed|permits)\b|\b(?:SELECT|FROM|WHERE|GROUP|BY|HAVING|JOIN|LEFT|INNER|ON|ORDER|LIMIT|AS|AND|OR|NOT|IN|COUNT|SUM|AVG|MAX|MIN|DISTINCT|OVER|PARTITION|DESC|ASC|IS|NULL|UNION|WITH|CREATE|INDEX|TABLE|BEGIN|COMMIT|UPDATE|SET|DENSE_RANK|EXISTS|OFFSET)\b|\b\d+\b)/gm;

function Highlight({ code }: { code: string }) {
  const parts = code.split(TOKEN);
  return (
    <>
      {parts.map((p, i) => {
        if (i % 2 === 0) return <span key={i}>{p}</span>;
        let cls = "text-fuchsia-300";
        if (p.startsWith("//") || p.startsWith("/*") || p.startsWith("--")) cls = "text-white/35 italic";
        else if (p.startsWith('"') || p.startsWith("'")) cls = "text-emerald-300";
        else if (/^\d/.test(p)) cls = "text-ember";
        else if (/^[A-Z_]+$/.test(p)) cls = "text-sky";
        return (
          <span key={i} className={cls}>
            {p}
          </span>
        );
      })}
    </>
  );
}

function LevelBadge({ level = "essential" }: { level?: Level }) {
  return (
    <span
      className={cn(
        "rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider",
        level === "essential" ? "bg-emerald-400/15 text-emerald-300" : "bg-fuchsia-400/15 text-fuchsia-300",
      )}
    >
      {level}
    </span>
  );
}

const card = "rounded-3xl border border-white/10 bg-panel/70 backdrop-blur";

/* ------------------------------------------------------------------ */
/*  Q&A accordion item                                                */
/* ------------------------------------------------------------------ */
function QAItem({ qa, n, signal }: { qa: QA; n: number; signal: { v: boolean; t: number } }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (signal.t) setOpen(signal.v);
  }, [signal]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-colors duration-300",
        open ? "border-sky/40 bg-brand/[0.07]" : "border-white/10 bg-white/[0.025] hover:border-white/25",
      )}
    >
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-4 px-5 py-4 text-left">
        <span className="mt-0.5 font-mono text-[11px] text-sky/70">{String(n).padStart(2, "0")}</span>
        <span className="flex-1 text-[14.5px] font-semibold leading-snug">{qa.q}</span>
        <span className="mt-0.5 flex shrink-0 items-center gap-2">
          <LevelBadge level={qa.level} />
          <ChevronDown size={16} className={cn("text-white/50 transition-transform duration-300", open && "rotate-180 text-sky")} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="space-y-4 px-5 pb-5 pl-[3.25rem]">
              <p className="whitespace-pre-line text-[13.5px] leading-[1.75] text-white/75">{qa.a}</p>
              {qa.confirm && (
                <div className="flex gap-2.5 rounded-xl border border-ember/30 bg-ember/[0.07] p-3 text-[12.5px] leading-relaxed text-ember/90">
                  <TriangleAlert size={15} className="mt-0.5 shrink-0" />
                  <span>
                    <b className="font-semibold">Confirm before you say this:</b> {qa.confirm}
                  </span>
                </div>
              )}
              {qa.follow && qa.follow.length > 0 && (
                <div>
                  <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Likely follow-ups</div>
                  <ul className="space-y-1">
                    {qa.follow.map((f) => (
                      <li key={f} className="flex gap-2 text-[12.5px] text-white/60">
                        <span className="text-sky">↳</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QABlock({ block }: { block: Extract<Block, { kind: "qa" }> }) {
  const [signal, setSignal] = useState({ v: false, t: 0 });
  const [allOpen, setAllOpen] = useState(false);
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-[19px] font-bold tracking-tight">{block.title}</h3>
          {block.subtitle && <p className="mt-1 text-[12.5px] text-white/50">{block.subtitle}</p>}
        </div>
        <button
          onClick={() => {
            const next = !allOpen;
            setAllOpen(next);
            setSignal({ v: next, t: Date.now() });
          }}
          className="rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-wider text-white/60 transition-colors hover:border-sky hover:text-sky"
        >
          {allOpen ? "Collapse all" : "Expand all"} · {block.items.length}
        </button>
      </div>
      <div className="space-y-2.5">
        {block.items.map((qa, i) => (
          <QAItem key={qa.q} qa={qa} n={i + 1} signal={signal} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Other block renderers                                             */
/* ------------------------------------------------------------------ */
function CopyButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 1400);
      }}
      className="flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60 hover:border-sky hover:text-sky"
    >
      {ok ? <Check size={11} /> : <Copy size={11} />}
      {ok ? "Copied" : "Copy"}
    </button>
  );
}

function CodeBlock({ block }: { block: Extract<Block, { kind: "code" }> }) {
  return (
    <div className={cn(card, "overflow-hidden")}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <h3 className="text-[16px] font-bold tracking-tight">{block.title}</h3>
          <LevelBadge level={block.level} />
        </div>
        <div className="flex gap-2 font-mono text-[10.5px]">
          <span className="rounded-full bg-sky/10 px-2.5 py-1 text-sky">Time {block.time}</span>
          <span className="rounded-full bg-ember/10 px-2.5 py-1 text-ember">Space {block.space}</span>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <p className="text-[13.5px] leading-relaxed text-white/70">{block.problem}</p>
        <div className="relative">
          <div className="absolute right-3 top-3 z-10">
            <CopyButton text={block.code} />
          </div>
          <pre className="hide-scrollbar overflow-x-auto rounded-2xl border border-white/10 bg-[#030510] p-5 pr-24 font-mono text-[12.5px] leading-[1.7] text-white/85">
            <code>
              <Highlight code={block.code} />
            </code>
          </pre>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {block.io && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/80">Sample I/O</div>
              <pre className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-white/70">{block.io}</pre>
            </div>
          )}
          {block.dry && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-sky/80">Dry run</div>
              <pre className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-white/70">{block.dry}</pre>
            </div>
          )}
        </div>
        {block.why && (
          <p className="flex gap-2.5 text-[13px] leading-relaxed text-white/60">
            <Lightbulb size={15} className="mt-0.5 shrink-0 text-ember" />
            {block.why}
          </p>
        )}
      </div>
    </div>
  );
}

function ScenarioBlock({ block }: { block: Extract<Block, { kind: "scenario" }> }) {
  const steps: { t: string; c: string; items: string[] }[] = [
    { t: "1 · Investigate", c: "text-sky", items: block.investigate },
    { t: "2 · Root cause", c: "text-ember", items: [block.root] },
    { t: "3 · Fix", c: "text-emerald-300", items: block.fix },
    { t: "4 · Verify", c: "text-fuchsia-300", items: block.verify },
  ];
  return (
    <div className={cn(card, "p-5 sm:p-6")}>
      <h3 className="text-[17px] font-bold tracking-tight">{block.title}</h3>
      <p className="mt-1.5 flex gap-2 text-[13px] text-white/55">
        <TriangleAlert size={14} className="mt-0.5 shrink-0 text-ember" />
        {block.symptom}
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
            className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
          >
            <div className={cn("mb-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em]", s.c)}>{s.t}</div>
            <ul className="space-y-1.5">
              {s.items.map((it) => (
                <li key={it} className="flex gap-2 text-[12.5px] leading-relaxed text-white/70">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PlanBlock({ block }: { block: Extract<Block, { kind: "plan" }> }) {
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem("mk-prep-plan") ?? "{}");
    } catch {
      return {};
    }
  });
  const toggle = (k: string) =>
    setDone((d) => {
      const n = { ...d, [k]: !d[k] };
      try {
        localStorage.setItem("mk-prep-plan", JSON.stringify(n));
      } catch {
        /* ignore */
      }
      return n;
    });
  const count = block.days.filter((d) => done[d.day]).length;
  const pct = Math.round((count / block.days.length) * 100);

  return (
    <div>
      <div className={cn(card, "mb-5 flex items-center gap-5 p-5")}>
        <div className="flex-1">
          <div className="mb-2 flex justify-between font-mono text-[11px] uppercase tracking-wider text-white/50">
            <span>Checkpoint progress</span>
            <span className="text-sky">
              {count}/{block.days.length} days
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand via-sky to-ember shadow-[0_0_14px_rgba(120,170,255,.8)]"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.7, ease: EASE }}
            />
          </div>
        </div>
        <span className="text-3xl font-extrabold tabular-nums">{pct}%</span>
      </div>

      <div className="relative space-y-4 pl-8">
        <div className="absolute bottom-3 left-[9px] top-3 w-px bg-gradient-to-b from-sky/60 via-white/10 to-transparent" />
        {block.days.map((d) => (
          <Reveal key={d.day} y={24}>
            <div className="relative">
              <span
                className={cn(
                  "absolute -left-[31px] top-6 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 transition-all",
                  done[d.day] ? "border-emerald-400 bg-emerald-400 text-ink" : "border-sky bg-ink",
                )}
              >
                {done[d.day] && <Check size={10} strokeWidth={4} />}
              </span>
              <div className={cn(card, "p-5", done[d.day] && "opacity-60")}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-sky">{d.day}</div>
                    <h4 className="text-[17px] font-bold tracking-tight">{d.focus}</h4>
                  </div>
                  <button
                    onClick={() => toggle(d.day)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-wider transition-colors",
                      done[d.day]
                        ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
                        : "border-white/20 text-white/60 hover:border-sky hover:text-sky",
                    )}
                  >
                    {done[d.day] ? "Checkpoint passed" : "Mark checkpoint"}
                  </button>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <PlanCol t="Topics" items={d.topics} />
                  <PlanCol t="Coding practice" items={d.coding} />
                  <div>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Mock + checkpoint</div>
                    <p className="text-[12.5px] leading-relaxed text-white/70">{d.mock}</p>
                    <p className="mt-2 flex gap-1.5 text-[12.5px] leading-relaxed text-emerald-300/90">
                      <ShieldCheck size={13} className="mt-0.5 shrink-0" />
                      {d.checkpoint}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function PlanCol({ t, items }: { t: string; items: string[] }) {
  return (
    <div>
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{t}</div>
      <ul className="space-y-1.5">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-white/70">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-sky" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "heading":
      return (
        <div className="pt-6">
          <div className="flex items-center gap-4">
            <h2 className="text-[clamp(1.5rem,2.6vw,2.2rem)] font-extrabold tracking-tight">{block.title}</h2>
            <span className="h-px flex-1 bg-gradient-to-r from-sky/40 to-transparent" />
          </div>
          {block.sub && <p className="mt-2 text-[13.5px] text-white/50">{block.sub}</p>}
        </div>
      );
    case "text": {
      const words = block.paragraphs.join(" ").split(/\s+/).length;
      return (
        <div className={cn(card, "relative overflow-hidden p-6 sm:p-8", block.speech && "border-sky/25")}>
          {block.speech && <Quote size={64} className="absolute right-5 top-4 text-sky/10" />}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {block.title && <h3 className="text-[18px] font-bold tracking-tight">{block.title}</h3>}
            {block.speech && (
              <span className="flex items-center gap-1.5 rounded-full bg-sky/10 px-2.5 py-1 font-mono text-[10.5px] text-sky">
                <Clock size={11} /> ≈ {Math.round(words / 2.5)} sec spoken · {words} words
              </span>
            )}
          </div>
          <div className="space-y-3.5">
            {block.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className={cn("leading-[1.85]", block.speech ? "text-[15px] text-white/85" : "text-[14px] text-white/70")}>
                {p}
              </p>
            ))}
          </div>
        </div>
      );
    }
    case "list":
      return (
        <div
          className={cn(
            card,
            "p-5 sm:p-6",
            block.tone === "warn" && "border-ember/30 bg-ember/[0.04]",
            block.tone === "good" && "border-emerald-400/25 bg-emerald-400/[0.03]",
          )}
        >
          <h3 className="mb-3 text-[16px] font-bold tracking-tight">{block.title}</h3>
          <ul className="space-y-2">
            {block.items.map((it) => (
              <li key={it} className="flex gap-2.5 text-[13.5px] leading-relaxed text-white/72">
                <span
                  className={cn(
                    "mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full",
                    block.tone === "warn" ? "bg-ember" : block.tone === "good" ? "bg-emerald-400" : "bg-sky",
                  )}
                />
                {it}
              </li>
            ))}
          </ul>
        </div>
      );
    case "callout": {
      const tones = {
        warn: { c: "border-ember/35 bg-ember/[0.07] text-ember", I: TriangleAlert },
        info: { c: "border-sky/35 bg-sky/[0.07] text-sky", I: Lightbulb },
        good: { c: "border-emerald-400/35 bg-emerald-400/[0.07] text-emerald-300", I: ShieldCheck },
      }[block.tone];
      return (
        <div className={cn("flex gap-3.5 rounded-2xl border p-4 sm:p-5", tones.c)}>
          <tones.I size={18} className="mt-0.5 shrink-0" />
          <div>
            <div className="text-[13.5px] font-bold">{block.title}</div>
            <p className="mt-1 text-[13px] leading-relaxed text-white/70">{block.text}</p>
          </div>
        </div>
      );
    }
    case "qa":
      return <QABlock block={block} />;
    case "diagram":
      return (
        <div className={cn(card, "overflow-hidden")}>
          <div className="border-b border-white/10 px-5 py-3.5 text-[15px] font-bold">{block.title}</div>
          <div className="relative overflow-hidden bg-[#030510] p-5">
            <div className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-sky/10 to-transparent" />
            <pre className="hide-scrollbar relative overflow-x-auto font-mono text-[12px] leading-[1.55] text-sky/90">{block.art}</pre>
          </div>
          {block.note && <p className="px-5 py-3.5 text-[12.5px] leading-relaxed text-ember/90">{block.note}</p>}
        </div>
      );
    case "code":
      return <CodeBlock block={block} />;
    case "scenario":
      return <ScenarioBlock block={block} />;
    case "claims":
      return (
        <div className="grid gap-4 lg:grid-cols-2">
          {block.items.map((c, i) => (
            <Reveal key={c.claim} delay={(i % 2) * 0.08} y={24}>
              <div className={cn(card, "h-full p-5 sm:p-6")}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[16px] font-bold leading-snug tracking-tight">{c.claim}</h3>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-wider",
                      c.risk === "High" && "bg-red-400/15 text-red-300",
                      c.risk === "Medium" && "bg-ember/15 text-ember",
                      c.risk === "Low" && "bg-emerald-400/15 text-emerald-300",
                    )}
                  >
                    {c.risk} challenge risk
                  </span>
                </div>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/80">Substantiate honestly</div>
                <ul className="mt-2 space-y-1.5">
                  {c.substantiate.map((s) => (
                    <li key={s} className="flex gap-2 text-[12.5px] leading-relaxed text-white/70">
                      <Check size={13} className="mt-0.5 shrink-0 text-emerald-300" />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ember/80">Likely probes</div>
                <ul className="mt-2 space-y-1.5">
                  {c.probes.map((s) => (
                    <li key={s} className="flex gap-2 text-[12.5px] leading-relaxed text-white/60">
                      <span className="text-ember">?</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      );
    case "plan":
      return <PlanBlock block={block} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Filtering                                                         */
/* ------------------------------------------------------------------ */
function filterBlocks(blocks: Block[], q: string, level: "all" | Level): Block[] {
  if (!q && level === "all") return blocks;
  const out: Block[] = [];
  for (const b of blocks) {
    if (b.kind === "heading") {
      if (!q) out.push(b);
      continue;
    }
    if (b.kind === "qa") {
      const items = b.items.filter(
        (i) =>
          (level === "all" || (i.level ?? "essential") === level) &&
          (!q || (i.q + " " + i.a + " " + (i.follow ?? []).join(" ")).toLowerCase().includes(q)),
      );
      if (items.length) out.push({ ...b, items });
      continue;
    }
    if (b.kind === "code" && level !== "all" && (b.level ?? "essential") !== level) continue;
    if (q) {
      if (JSON.stringify(b).toLowerCase().includes(q)) out.push(b);
    } else out.push(b);
  }
  return out;
}

function countItems(p: Part) {
  return p.blocks.reduce((n, b) => n + (b.kind === "qa" ? b.items.length : b.kind === "code" || b.kind === "scenario" ? 1 : 0), 0);
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export function InterviewPrep({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<"all" | Level>("all");
  const tabsRef = useRef<HTMLDivElement>(null);
  const q = query.trim().toLowerCase();
  const total = useMemo(() => PARTS.reduce((n, p) => n + countItems(p), 0), []);
  const part = PARTS[active];

  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  const go = (i: number) => {
    setActive(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const results: { part: Part; blocks: Block[] }[] = useMemo(() => {
    if (!q) return [];
    return PARTS.map((p) => ({ part: p, blocks: filterBlocks(p.blocks, q, level) })).filter((r) => r.blocks.length);
  }, [q, level]);

  const blocks = useMemo(() => filterBlocks(part.blocks, "", level), [part, level]);

  return (
    <div className="relative z-10 pb-24 pt-[100px]">
      <div className={container}>
        <button onClick={onBack} className="group mb-8 flex items-center gap-2 text-[13px] text-white/60 transition-colors hover:text-white">
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
          Back to portfolio
        </button>

        <SectionLabel n="∞">Interview Prep Hub</SectionLabel>
        <SplitHeading
          as="h1"
          className="mt-5 max-w-4xl text-[clamp(2.2rem,4.8vw,4.2rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
          lines={[{ text: "Resume-based interview" }, { text: "preparation guide.", className: "text-shimmer" }]}
        />
        <Reveal delay={0.2} className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60">
          Built only from the resume facts — Java, Spring Boot, React, SQL, AI/Cloud. Anything that depends on what you personally
          built is flagged <span className="text-ember">“confirm”</span> so you never state it as fact. Hands-on skills and
          “familiar with” technologies are kept separate.
        </Reveal>

        <Reveal delay={0.3} className="mt-6 flex flex-wrap gap-3 font-mono text-[11px]">
          {[`${PARTS.length} parts`, `${total}+ Q&As, problems & scenarios`, "Essential / Advanced filters", "Search across everything"].map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/65">
              {t}
            </span>
          ))}
        </Reveal>

        {/* Controls */}
        <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all parts — e.g. JWT, HashMap, Kubernetes, Isolation Forest…"
              className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-11 text-[14px] outline-none transition-colors placeholder:text-white/30 focus:border-sky/60 focus:bg-white/[0.06]"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white" aria-label="Clear">
                <X size={15} />
              </button>
            )}
          </div>
          <div className="flex rounded-full border border-white/10 bg-white/[0.04] p-1">
            {(["all", "essential", "advanced"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={cn(
                  "relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors",
                  level === l ? "text-ink" : "text-white/60 hover:text-white",
                )}
              >
                {level === l && <motion.span layoutId="lvl" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky tabs */}
      <div className="sticky top-[68px] z-30 mt-8 border-y border-white/[0.07] bg-ink/80 backdrop-blur-xl">
        <div className={container}>
          <div ref={tabsRef} className="hide-scrollbar flex gap-1.5 overflow-x-auto py-3">
            {PARTS.map((p, i) => (
              <button
                key={p.id}
                data-tab={i}
                onClick={() => {
                  setQuery("");
                  go(i);
                }}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                  !q && active === i ? "text-white" : "text-white/55 hover:text-white",
                )}
              >
                {!q && active === i && (
                  <motion.span
                    layoutId="prep-tab"
                    className="absolute inset-0 rounded-full bg-brand/30 ring-1 ring-sky/40"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative font-mono text-[10px] text-sky/80">{p.no}</span>
                <span className="relative whitespace-nowrap">{p.short}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={cn(container, "mt-12")}>
        {q ? (
          <div>
            <p className="mb-8 font-mono text-[12px] text-white/50">
              {results.reduce((n, r) => n + r.blocks.length, 0)} matching blocks for “{query}” across {results.length} parts
            </p>
            {results.length === 0 && <p className="text-white/50">Nothing matched — try a broader keyword.</p>}
            <div className="space-y-14">
              {results.map((r) => (
                <div key={r.part.id} className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-sky">{r.part.no}</span>
                    <h2 className="text-xl font-bold">{r.part.title}</h2>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  {r.blocks.map((b, i) => (
                    <BlockView key={i} block={b} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={part.id + level}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="mb-10 flex items-end gap-6">
                <span className="text-[clamp(4rem,9vw,7.5rem)] font-extrabold leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(143,202,255,0.35)]">
                  {part.no}
                </span>
                <div className="pb-1">
                  <h2 className="text-[clamp(1.6rem,3vw,2.5rem)] font-extrabold tracking-tight">{part.title}</h2>
                  <p className="mt-1.5 max-w-2xl text-[14px] text-white/55">{part.blurb}</p>
                </div>
              </div>

              <div className="space-y-6">
                {blocks.length === 0 && <p className="text-white/50">No items at this level in this part — switch the filter to “all”.</p>}
                {blocks.map((b, i) => (
                  <BlockView key={`${part.id}-${i}`} block={b} />
                ))}
              </div>

              <div className="mt-16 flex items-center justify-between gap-4 border-t border-white/10 pt-8">
                <button
                  disabled={active === 0}
                  onClick={() => go(active - 1)}
                  className="group flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[13px] transition-colors hover:border-sky disabled:opacity-30 disabled:hover:border-white/15"
                >
                  <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
                  {active > 0 ? PARTS[active - 1].short : "Start"}
                </button>
                <button
                  disabled={active === PARTS.length - 1}
                  onClick={() => go(active + 1)}
                  className="group flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-semibold text-ink transition-transform hover:scale-105 disabled:opacity-30"
                >
                  {active < PARTS.length - 1 ? PARTS[active + 1].short : "Finish"}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

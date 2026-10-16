import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; warm: boolean; tw: number };
type Shooter = { x: number; y: number; vx: number; vy: number; life: number };

/** Fixed full-screen canvas: drifting stars + constellation lines that react to the cursor + shooting stars. */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let parts: P[] = [];
    const shooters: Shooter[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(95, Math.floor((w * h) / 15000));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.4,
        warm: Math.random() < 0.14,
        tw: Math.random() * 2 + 0.6,
      }));
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130) {
          const d = Math.sqrt(d2) || 1;
          const f = (130 - d) / 130;
          p.x += (dx / d) * f * 1.4;
          p.y += (dy / d) * f * 1.4;
        }

        const a = 0.3 + 0.4 * Math.sin(t * 0.001 * p.tw + p.x * 0.01);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.warm ? `rgba(255,172,96,${a})` : `rgba(160,205,255,${a})`;
        ctx.fill();
      }

      // constellation lines
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) {
            const o = (1 - Math.sqrt(d2) / 120) * 0.16;
            ctx.strokeStyle = `rgba(110,160,255,${o})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 170 * 170) {
          const o = (1 - Math.sqrt(md2) / 170) * 0.45;
          ctx.strokeStyle = `rgba(160,210,255,${o})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // shooting stars
      if (!reduce && Math.random() < 0.0035 && shooters.length < 2) {
        shooters.push({
          x: Math.random() * w * 0.8,
          y: Math.random() * h * 0.4,
          vx: 7 + Math.random() * 4,
          vy: 3 + Math.random() * 2.5,
          life: 1,
        });
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.014;
        if (s.life <= 0) {
          shooters.splice(i, 1);
          continue;
        }
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 9, s.y - s.vy * 9);
        g.addColorStop(0, `rgba(255,255,255,${s.life})`);
        g.addColorStop(1, "rgba(120,170,255,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 9, s.y - s.vy * 9);
        ctx.stroke();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[5] h-full w-full" />;
}

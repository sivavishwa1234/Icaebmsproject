import { useEffect, useRef } from "react";

/**
 * Lightweight canvas particle network (no external deps).
 * Sits behind hero content. Reacts subtly to mouse movement.
 */
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(110, Math.floor((w * h) / 14000));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.4,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Soft moving radial glow
      const t = Date.now() * 0.0002;
      const gx = w * (0.5 + Math.cos(t) * 0.3);
      const gy = h * (0.5 + Math.sin(t * 1.3) * 0.3);
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.6);
      grad.addColorStop(0, "rgba(217, 165, 65, 0.10)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const f = (1 - d2 / 14000) * 0.6;
          p.x += (dx / Math.sqrt(d2)) * f;
          p.y += (dy / Math.sqrt(d2)) * f;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(230, 200, 130, 0.85)";
        ctx.fill();
      }

      // Lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 13000) {
            const o = 1 - d2 / 13000;
            ctx.strokeStyle = `rgba(180, 200, 240, ${o * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, #000 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 40%, transparent 75%)",
        }}
      />
      {/* gradient blobs */}
      <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full bg-accent/20 blur-3xl animate-float" />
      <div className="absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-primary-glow/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default AnimatedBackground;

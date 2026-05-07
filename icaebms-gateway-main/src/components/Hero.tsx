import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, FileText, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import Counter from "./Counter";

const TYPING = [
  "Applied Science",
  "Engineering & AI",
  "Education",
  "Business & Management",
  "Social Science",
];

const Typewriter = () => {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = TYPING[i % TYPING.length];
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), 1400);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setI((v) => v + 1); }
      }
    }, del ? 40 : 70);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="text-gradient-gold">
      {text}
      <span className="inline-block w-[2px] h-[0.9em] bg-accent align-middle ml-1 animate-blink" />
    </span>
  );
};

const Hero = () => {
  const reduce = useReducedMotion();
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-hero">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/40 to-primary/90" />

      <div className="container relative z-10 py-20 text-primary-foreground">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          style={{ transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)` }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-accent text-xs font-semibold tracking-widest uppercase mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Hybrid Conference · Aug 10–11, 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-balance"
          >
            International Conference on{" "}
            <Typewriter />
            <br className="hidden md:block" />
            <span className="text-primary-foreground/90"> Business, Management & Social Science</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-6 text-sm md:text-base font-semibold tracking-[0.3em] text-accent uppercase"
          >
            ICAEBMS · 2026
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 text-lg md:text-2xl font-display italic text-primary-foreground/85 text-balance"
          >
            "Interdisciplinary Innovations for a Sustainable Future"
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm md:text-base text-primary-foreground/90"
          >
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" /> 10–11 August, 2026
            </span>
            <span className="hidden md:inline opacity-30">·</span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" /> Bangkok, Thailand + Virtual
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/submission"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent-gradient text-accent-foreground font-semibold shadow-glow hover:scale-105 transition-transform overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <FileText className="w-5 h-5 relative" /> <span className="relative">Submit Paper</span>
              <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#highlights"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass-dark text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              Register Now
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { n: 50, s: "+", l: "Countries" },
              { n: 6, s: "", l: "Tracks" },
              { n: 25, s: "+", l: "Keynotes" },
              { n: 500, s: "+", l: "Delegates" },
            ].map((s) => (
              <div key={s.l} className="glass-dark rounded-2xl py-5 px-3">
                <div className="font-display font-bold text-3xl md:text-4xl text-gradient-gold">
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="text-xs uppercase tracking-widest text-primary-foreground/70 mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-t border-primary-foreground/10 bg-primary/80 backdrop-blur-md py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 text-primary-foreground/80 text-sm font-medium tracking-wide">
              <span className="text-accent">●</span> Hybrid Event — Bangkok + Virtual
              <span className="text-accent">●</span> Scopus & Web of Science Indexed
              <span className="text-accent">●</span> 50+ Countries Participating
              <span className="text-accent">●</span> Keynotes by Global Scholars
              <span className="text-accent">●</span> Best Paper Awards
              <span className="text-accent">●</span> Workshops & Networking
            </div>
          ))}
        </div>
      </div>

      {/* wave divider */}
      <svg className="absolute bottom-12 inset-x-0 z-[5] w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" fill="hsl(var(--background))" opacity="0.0" />
      </svg>
    </section>
  );
};

export default Hero;

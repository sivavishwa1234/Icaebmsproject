import Section from "@/components/Section";
import FeatureCard from "@/components/FeatureCard";
import Hero from "@/components/Hero";
import {
  Globe2, Award, BookOpen, Mic, Users, Wrench, GraduationCap, Network,
  FlaskConical, Cpu, Briefcase, Heart, TrendingUp, Sparkles, CheckCircle2,
  Calendar, FileText, Trophy
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import AutoMarquee from "@/components/AutoMarquee";
import { motion } from "framer-motion";
import logoCerada from "@/assets/logo-cerada.png";
import logoIcaebms from "@/assets/logo-icaebms.png";
import logoUnSdg from "@/assets/logo-un-sdg.png";
import logoSdg from "@/assets/logo-sdg.png";
import logoScopus from "@/assets/logo-scopus.png";
import logoWos from "@/assets/logo-wos.png";
import logoCrossref from "@/assets/logo-crossref.png";

// Image helper – Unsplash thematic photos
const img = (id: string, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const partners = [
  { name: "CERADA", logo: logoCerada },
  { name: "ICAEBMS", logo: logoIcaebms },
  { name: "UN SDG", logo: logoUnSdg },
  { name: "SDGs", logo: logoSdg },
  { name: "Scopus", logo: logoScopus },
  { name: "Web of Science", logo: logoWos },
  { name: "Crossref", logo: logoCrossref },
];

const About = () => (
  <Section
    id="about"
    eyebrow="About the Conference"
    title={<>Welcome to <span className="text-accent">ICAEBMS 2026</span></>}
    subtitle="A premier global gathering where pioneering minds across science, engineering, education, business, and the humanities converge to shape an interdisciplinary, sustainable future."
    className="bg-soft"
  >
    <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
      <div className="space-y-5 text-muted-foreground leading-relaxed">
        <p>
          ICAEBMS 2026 brings together <span className="text-primary font-semibold">researchers, academicians, industry experts, and policymakers</span> from over 50 countries
          to share ground-breaking innovations and forge collaborations that transcend traditional disciplinary boundaries.
        </p>
        <p>
          Officially organized by the <span className="text-primary font-semibold">Confworld Educational Research and Development Association (CERADA)</span>,
          the conference fosters a dynamic ecosystem for scholarly exchange — featuring rigorously peer-reviewed
          publications, world-class keynotes, hands-on workshops, and meaningful networking.
        </p>
        <ul className="space-y-3 pt-2">
          {[
            "Indexed in Scopus & Web of Science",
            "Aligned with the UN Sustainable Development Goals",
            "Hybrid format — attend in Bangkok or virtually",
          ].map((t) => (
            <li key={t} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span className="text-foreground">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative grid grid-cols-2 gap-4">
        <img src={img("photo-1540575467063-178a50c2df87")} alt="Conference audience" className="rounded-2xl shadow-elegant aspect-[4/5] object-cover" loading="lazy" />
        <div className="space-y-4 pt-8">
          <img src={img("photo-1521737711867-e3b97375f902")} alt="Researchers collaborating" className="rounded-2xl shadow-elegant aspect-square object-cover" loading="lazy" />
          <img src={img("photo-1505373877841-8d25f7d46678")} alt="Bangkok skyline" className="rounded-2xl shadow-elegant aspect-square object-cover" loading="lazy" />
        </div>
      </div>
    </div>

    {/* Partners / Indexing */}
    <div className="mt-20 max-w-6xl mx-auto">
      <p className="text-center text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-8">
        Organized by · Indexed in · Aligned with
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        {partners.map((p) => (
          <div key={p.name} className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center justify-center gap-2 shadow-card hover:shadow-elegant hover:border-accent transition-all min-h-[120px]">
            <img src={p.logo} alt={p.name} className="h-12 w-auto object-contain" loading="lazy" />
            <div className="text-xs font-semibold text-primary text-center">{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const Theme = () => {
  const cards = [
    { icon: Network, title: "Interdisciplinary Collaboration", desc: "Bridging silos across science, engineering, business, and the humanities to solve complex global challenges." },
    { icon: Sparkles, title: "Disruptive Innovation", desc: "Showcasing transformative research and emerging technologies that redefine industries and societies." },
    { icon: Globe2, title: "Sustainable Futures", desc: "Aligning scholarly work with the UN SDGs to drive measurable, lasting impact for people and planet." },
    { icon: Cpu, title: "AI & Emerging Tech", desc: "Exploring the frontier of artificial intelligence, robotics, and human-centered computing." },
    { icon: GraduationCap, title: "Future of Learning", desc: "Reimagining education with EdTech, open access, and inclusive pedagogy." },
    { icon: Heart, title: "Human-Centered Research", desc: "Putting people, ethics, and culture at the heart of scientific discovery." },
  ];
  return (
    <Section
      eyebrow="Conference Theme"
      title={<>Interdisciplinary Innovations for a <span className="text-accent">Sustainable Future</span></>}
      subtitle="At the intersection of disciplines lies the most fertile ground for transformative discovery."
    >
      <AutoMarquee speed={45} className="py-6">
        {cards.map((c) => (
          <div
            key={c.title}
            className="group relative w-72 sm:w-80 shrink-0 rounded-2xl p-7 glass gradient-border shadow-card hover:shadow-elegant transition-all hover:-translate-y-2 animate-float"
            style={{ animationDelay: `${Math.random() * 2}s` }}
          >
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-accent/10 via-transparent to-primary-glow/10 pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center mb-5 shadow-glow group-hover:rotate-6 transition-transform">
              <c.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary mb-2">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </AutoMarquee>
    </Section>
  );
};

const Highlights = () => {
  const items = [
    { icon: Network, title: "Multidisciplinary Platform", description: "Six tracks spanning science, engineering, business, and humanities.", image: img("photo-1517245386807-bb43f82c33c4") },
    { icon: Globe2, title: "Global Participation", description: "Delegates from 50+ countries, both onsite and virtual.", image: img("photo-1526778548025-fa2f459cd5c1") },
    { icon: BookOpen, title: "Scopus Publications", description: "Selected papers indexed in Scopus & Web of Science.", image: img("photo-1532012197267-da84d127e765") },
    { icon: Mic, title: "Distinguished Keynotes", description: "World-renowned scholars and industry pioneers.", image: img("photo-1505373877841-8d25f7d46678") },
    { icon: Wrench, title: "Hands-on Workshops", description: "Practical sessions led by leading experts.", image: img("photo-1552664730-d307ca884978") },
    { icon: Users, title: "Networking", description: "Curated sessions to build lasting collaborations.", image: img("photo-1556761175-5973dc0f32e7") },
    { icon: Award, title: "Best Paper Awards", description: "Recognition for outstanding research contributions.", image: img("photo-1567427017947-545c5f8d16ad") },
    { icon: GraduationCap, title: "Student Engagement", description: "Dedicated tracks, mentorship, and travel grants.", image: img("photo-1523050854058-8df90110c9f1") },
  ];
  return (
    <Section
      id="highlights"
      eyebrow="Why ICAEBMS"
      title="Key Highlights"
      subtitle="Eight reasons researchers and academics make ICAEBMS their conference of choice."
      className="bg-soft"
    >
      <div className="max-w-7xl mx-auto px-2 md:px-12">
        <Carousel
          opts={{ align: "center", loop: true }}
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
        >
          <CarouselContent>
            {items.map((it) => (
              <CarouselItem key={it.title} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <motion.div
                  whileHover={{ scale: 1.04, y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all"
                >
                  <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-accent/30 blur-xl -z-0" />
                  <div className="relative">
                    <div className="relative h-44 overflow-hidden">
                      <img src={it.image} alt={it.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center shadow-glow">
                        <it.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-lg text-primary mb-1.5">{it.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{it.description}</p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
    </Section>
  );
};

const CallForPapers = () => {
  const tracks = [
    { icon: FlaskConical, name: "Applied Science", topics: "Physics · Chemistry · Biology · Environmental Science", image: img("photo-1532094349884-543bc11b234d", 1000) },
    { icon: Cpu, name: "Engineering", topics: "AI · Computing · Civil · Mechanical · Electrical · Robotics", image: img("photo-1518770660439-4636190af475", 1000) },
    { icon: GraduationCap, name: "Education", topics: "Pedagogy · EdTech · Curriculum · Higher Education", image: img("photo-1503676260728-1c00da094a0b", 1000) },
    { icon: Briefcase, name: "Business & Management", topics: "Strategy · HR · Operations · Entrepreneurship", image: img("photo-1556761175-b413da4baf72", 1000) },
    { icon: Heart, name: "Social Science & Humanities", topics: "Sociology · Psychology · Languages · Culture", image: img("photo-1529070538774-1843cb3265df", 1000) },
    { icon: TrendingUp, name: "Finance & Marketing", topics: "Fintech · Banking · Consumer Behavior · Branding", image: img("photo-1611974789855-9c2a0a7236a3", 1000) },
  ];
  return (
    <Section
      id="cfp"
      eyebrow="Call for Papers"
      title="Conference Tracks & Sessions"
      subtitle="Submit original research across six interdisciplinary tracks. All accepted papers undergo double-blind peer review."
    >
      <div className="max-w-6xl mx-auto mb-12 px-2 md:px-12 [perspective:1200px]">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
        >
          <CarouselContent>
            {tracks.map((t) => (
              <CarouselItem key={t.name} className="md:basis-1/2 lg:basis-1/3">
                <TiltCard className="group h-full rounded-2xl">
                  <div className="relative h-full rounded-2xl overflow-hidden glass gradient-border shadow-card group-hover:shadow-elegant transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <img src={t.image} alt={t.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                      <div className="absolute top-3 left-3 w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center shadow-glow">
                        <t.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="absolute bottom-3 left-4 right-4 font-display font-bold text-xl text-primary-foreground">
                        {t.name}
                      </h3>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-muted-foreground">{t.topics}</p>
                    </div>
                  </div>
                </TiltCard>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
      <Reveal className="text-center">
        <Link to="/submission" className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent-gradient text-accent-foreground font-semibold shadow-glow hover:scale-105 transition-transform overflow-hidden">
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <FileText className="w-5 h-5 relative" /> <span className="relative">Submit Your Paper</span>
        </Link>
      </Reveal>
    </Section>
  );
};

const Deadlines = () => {
  const milestones = [
    { date: "31 Dec 2025", title: "Early Bird Registration", icon: Sparkles },
    { date: "31 Jan 2026", title: "Abstract Submission", icon: FileText },
    { date: "28 Feb 2026", title: "Full Paper Submission", icon: BookOpen },
    { date: "31 Mar 2026", title: "Final Registration", icon: CheckCircle2 },
  ];
  return (
    <Section
      id="deadlines"
      eyebrow="Important Dates"
      title="Key Deadlines"
      subtitle="Mark these dates and join the global ICAEBMS community."
      className="bg-primary text-primary-foreground"
    >
      <div className="relative max-w-5xl mx-auto">
        <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-primary-foreground/20" />
        <div className="grid md:grid-cols-4 gap-8 md:gap-4 relative">
          {milestones.map((m, i) => (
            <div key={i} className="text-center">
              <div className="relative mx-auto w-24 h-24 rounded-2xl bg-accent-gradient shadow-glow flex items-center justify-center mb-5">
                <m.icon className="w-10 h-10 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary-foreground text-primary text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">
                <Calendar className="w-4 h-4 inline mr-1" /> {m.date}
              </div>
              <h3 className="font-display font-bold text-lg">{m.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const WhyJoin = () => {
  const reasons = [
    { icon: BookOpen, title: "Publish Your Research", description: "Get indexed in Scopus, WoS, and reputable journals.", image: img("photo-1457369804613-52c61a468e7d") },
    { icon: Network, title: "Global Networking", description: "Connect with academics & industry leaders worldwide.", image: img("photo-1591115765373-5207764f72e7") },
    { icon: Trophy, title: "Win Awards", description: "Best paper, best presenter, and young researcher prizes.", image: img("photo-1567427017947-545c5f8d16ad") },
    { icon: Mic, title: "Inspiring Keynotes", description: "Insights from globally renowned thought leaders.", image: img("photo-1475721027785-f74eccf877e2") },
    { icon: Wrench, title: "Skill-Building Workshops", description: "Master new methodologies and emerging tools.", image: img("photo-1552664730-d307ca884978") },
    { icon: Globe2, title: "Visit Bangkok", description: "Experience Thailand's vibrant culture & hospitality.", image: img("photo-1563492065599-3520f775eeed") },
  ];
  return (
    <Section
      eyebrow="Why Join Us"
      title="The ICAEBMS Advantage"
      subtitle="A conference designed to elevate your research, your career, and your network."
      className="bg-soft"
    >
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {reasons.map((r) => (
          <motion.div
            key={r.title}
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-72 rounded-2xl overflow-hidden shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all"
          >
            <img src={r.image} alt={r.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/10" />
            <div className="relative h-full flex flex-col justify-end p-6 text-primary-foreground">
              <div className="w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center mb-3 shadow-glow group-hover:rotate-6 group-hover:scale-110 transition-transform">
                <r.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl mb-1">{r.title}</h3>
              <p className="text-sm text-primary-foreground/85">{r.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

const Index = () => (
  <main>
    <Hero />
    <About />
    <Theme />
    <Highlights />
    <CallForPapers />
    <Deadlines />
    <WhyJoin />
  </main>
);

export default Index;

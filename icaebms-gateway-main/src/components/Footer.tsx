import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Globe, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address." });
      return;
    }
    toast({ title: "Subscribed!", description: "You'll receive ICAEBMS 2026 updates soon." });
    setEmail("");
  };

  return (
    <footer id="contact" className="relative bg-primary text-primary-foreground pt-20 pb-8 scroll-mt-20 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-accent/20 blur-3xl animate-float" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 rounded-full bg-primary-glow/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>
      <div className="container relative grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center font-display font-bold text-primary shadow-glow">
              IC
            </div>
            <div>
              <div className="font-display font-bold text-xl">ICAEBMS 2026</div>
              <div className="text-xs text-primary-foreground/60 tracking-widest uppercase">Bangkok · Hybrid</div>
            </div>
          </div>
          <p className="text-primary-foreground/70 leading-relaxed max-w-md">
            A premier interdisciplinary conference uniting researchers, academics, and industry leaders to advance a
            sustainable global future.
          </p>

          <form onSubmit={subscribe} className="mt-6 max-w-md">
            <label className="block text-xs uppercase tracking-widest text-accent mb-2">Newsletter</label>
            <div className="flex glass-dark rounded-full p-1.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-2 text-sm placeholder:text-primary-foreground/40 focus:outline-none"
              />
              <button type="submit" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent-gradient text-accent-foreground text-sm font-semibold hover:scale-105 transition-transform">
                <Send className="w-4 h-4" /> Join
              </button>
            </div>
          </form>

          <div className="flex gap-3 mt-6">
            {[Linkedin, Twitter, Facebook, Globe].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-primary hover:-translate-y-1 hover:rotate-6 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4 text-accent">Quick Links</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li><a href="/#about" className="hover:text-accent transition-colors">About</a></li>
            <li><a href="/#cfp" className="hover:text-accent transition-colors">Call for Papers</a></li>
            <li><Link to="/submission" className="hover:text-accent transition-colors">Submission</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4 text-accent">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex gap-3"><MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Bangkok, Thailand</li>
            <li className="flex gap-3"><Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" /> info@icaebms.org</li>
            <li className="flex gap-3"><Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" /> +66 000 000 000</li>
          </ul>
        </div>
      </div>

      <div className="container relative mt-14 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-primary-foreground/50">
        <p>© 2026 ICAEBMS · Organized by Confworld Educational Research and Development Association.</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

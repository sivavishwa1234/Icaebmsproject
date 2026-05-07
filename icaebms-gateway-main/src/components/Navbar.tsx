import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/#about", label: "About" },
  { to: "/#cfp", label: "Call for Papers" },
  { to: "/submission", label: "Submission" },
  { to: "/#contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const solid = scrolled || open || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    if (location.hash) {
      const el = document.querySelector(location.hash);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        solid
          ? "bg-background/90 backdrop-blur-lg shadow-card"
          : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center group">
          <img src="/logo.png" alt="ICAEBMS Logo" className="h-14 w-auto object-contain group-hover:scale-105 transition-transform" />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative px-4 py-2 rounded-md text-sm font-medium transition-colors group",
                    solid
                      ? "text-foreground hover:text-accent"
                      : "text-primary-foreground/90 hover:text-accent",
                    isActive && location.pathname === l.to && !l.to.includes("#") && "text-accent"
                  )
                }
              >
                {l.label}
                <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/submission"
              className="ml-3 group relative inline-flex items-center px-5 py-2.5 rounded-full bg-accent-gradient text-accent-foreground font-semibold text-sm shadow-glow hover:scale-105 transition-transform overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="relative">Submit Paper</span>
            </Link>
          </li>
        </ul>

        <button
          className={cn("lg:hidden p-2", solid ? "text-foreground" : "text-primary-foreground")}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <ul className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="block py-3 px-2 text-foreground hover:text-accent font-medium">
                  {l.label}
                </Link>
              </li>
            ))}
            <Link to="/submission" className="mt-2 inline-flex justify-center px-5 py-3 rounded-full bg-accent-gradient text-accent-foreground font-semibold">
              Submit Paper
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;

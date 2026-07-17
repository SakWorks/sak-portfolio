import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaFeatherAlt } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Achievements", href: "#achievements" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

const Logo = () => {
  return (
    <motion.a
      href="#home"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex items-center shrink-0"
      aria-label="SAK Home"
    >
      <span
        className="relative z-10 text-[22px] md:text-[24px] font-semibold leading-none text-white"
        style={{
          fontFamily: "Orbitron, sans-serif",
          letterSpacing: "0.11em",
        }}
      >
        SAK
      </span>
      <span className="absolute -bottom-1.5 left-0 h-[1px] w-full scale-x-0 bg-gradient-to-r from-purple-400 to-fuchsia-400 transition-transform duration-300 group-hover:scale-x-100" />
    </motion.a>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", "")).filter(Boolean);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = navLinks.find(
              (l) => l.href.replace("#", "") === entry.target.id
            );
            if (match) setActive(match.name);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-3 pt-3 md:px-6 md:pt-5">
      <nav
        className={`mx-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border transition-all duration-500 ${
          scrolled
            ? "border-white/20 bg-black/75 shadow-[0_8px_40px_rgba(168,85,247,0.22)]"
            : "border-white/15 bg-black/45 shadow-[0_8px_40px_rgba(168,85,247,0.16)]"
        } px-4 py-2.5 backdrop-blur-2xl md:px-6 md:py-3`}
      >
        <Logo />

        <div className="hidden min-w-0 items-center gap-1 overflow-x-auto lg:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navLinks.map((link) => {
            const isActive = active === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-purple-500/15 text-purple-300"
                    : "text-white/90 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-purple-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <motion.a
            href="#developer-note"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Read the developer's note"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-400/40 bg-purple-500/10 text-purple-300 transition-colors duration-300 hover:border-purple-300/70 hover:bg-purple-500/20 hover:text-white"
          >
            <FaFeatherAlt className="text-[14px]" />
          </motion.a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-white backdrop-blur-xl lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-full px-4 py-3 text-center transition-colors duration-300 ${
                    active === link.name
                      ? "bg-purple-500/15 text-purple-300"
                      : "text-white/90 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

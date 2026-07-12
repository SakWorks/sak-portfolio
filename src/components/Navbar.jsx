import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#" },
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
      href="#"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group relative inline-flex items-center"
      aria-label="SAK Home"
    >
      <span
        className="relative z-10 text-[34px] font-semibold leading-none text-white"
        style={{
          fontFamily: "Orbitron, sans-serif",
          letterSpacing: "0.11em",
        }}
      >
        SAK
      </span>

      <motion.span
        className="absolute -bottom-2 left-0 h-[1px] w-full origin-center bg-white/80"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut",
        }}
      />

      <span className="absolute -bottom-2 left-0 h-[1px] w-full scale-x-0 bg-purple-400 transition-transform duration-300 group-hover:scale-x-100" />
    </motion.a>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/80 py-3 backdrop-blur-xl"
          : "bg-black/10 py-5 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <Logo />

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -2 }}
              className="relative text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 h-[1px] w-full scale-x-0 bg-purple-400 transition-transform duration-300 hover:scale-x-100" />
            </motion.a>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-xl text-white backdrop-blur-xl md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-6 mt-4 overflow-hidden rounded-md border border-white/10 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-md px-4 py-3 text-center text-gray-300 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
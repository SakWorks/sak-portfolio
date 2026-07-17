import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { FaFileAlt, FaLock, FaEnvelope } from "react-icons/fa";

const cards = [
  {
    icon: <FaFileAlt />,
    title: "Academic Portfolio",
    description:
      "A public record of my debate achievements, leadership roles, and academic recognitions across national competitions. Open for anyone to view.",
    href: "/academic-portfolio.pdf",
    external: true,
    buttonLabel: "View Portfolio",
    buttonStyle: "solid",
  },
  {
    icon: <FaLock />,
    title: "Business Resume",
    description:
      "My detailed professional resume covering work experience, technical skills, and roles — shared privately, one request at a time.",
    href: "mailto:sakupwork111@gmail.com?subject=Business Resume Request&body=Hi Subhan, I would like to request a copy of your business resume.",
    external: false,
    buttonLabel: "Request Access",
    buttonIcon: <FaEnvelope />,
    buttonStyle: "outline",
  },
];

const usePointerFine = () => {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const handler = () => setFine(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return fine;
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
};

// ---------- Heading ----------

const SectionHeading = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-14 relative"
  >
    <div
      aria-hidden="true"
      className="absolute -inset-x-10 -top-8 h-32 pointer-events-none opacity-20 blur-[70px]"
      style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }}
    />
    <h2 className="relative text-3xl md:text-5xl font-extrabold text-white tracking-tight">
      My <span className="text-purple-500">Documents</span>
    </h2>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="h-[2px] w-32 mx-auto mt-4 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
    />
    <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
      One record built for public view, one written for a serious conversation. Pick the
      document that fits what you're here for.
    </p>
  </motion.div>
);

// ---------- Access card ----------
// Same cursor-tracking specular light + 3D tilt interaction system used
// across Achievements/Projects/Leadership, so this section feels like
// part of the same site rather than a leftover static block.

const AccessCard = ({ card, index, pointerFine, reducedMotion }) => {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const lightX = useMotionValue(0.5);
  const lightY = useMotionValue(0.5);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 20, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 20, mass: 0.5 });
  const springLightX = useSpring(lightX, { stiffness: 120, damping: 22 });
  const springLightY = useSpring(lightY, { stiffness: 120, damping: 22 });
  const [hovered, setHovered] = useState(false);

  const lightXPercent = useTransform(springLightX, (v) => `${v * 100}%`);
  const lightYPercent = useTransform(springLightY, (v) => `${v * 100}%`);
  const lightBackground = useMotionTemplate`radial-gradient(360px circle at ${lightXPercent} ${lightYPercent}, rgba(216,180,254,0.16), transparent 62%)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    lightX.set(relX);
    lightY.set(relY);
    if (!pointerFine || reducedMotion) return;
    rotateY.set((relX - 0.5) * 7);
    rotateX.set(-(relY - 0.5) * 7);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    lightX.set(0.5);
    lightY.set(0.5);
    setHovered(false);
  };

  const isSolid = card.buttonStyle === "solid";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.97, filter: "blur(10px)" }
      }
      whileInView={
        reducedMotion
          ? { opacity: 1 }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 55, damping: 18, mass: 1, delay: index * 0.08 }}
      style={{
        rotateX: pointerFine ? springX : 0,
        rotateY: pointerFine ? springY : 0,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
        borderColor: hovered ? "rgba(216,180,254,0.7)" : "rgba(126,34,206,0.3)",
        boxShadow: hovered
          ? "0 20px 50px -20px rgba(168,85,247,0.35), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 10px 30px -20px rgba(0,0,0,0.5)",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        contain: "layout paint style",
        willChange: hovered ? "transform" : "auto",
      }}
      className="relative rounded-2xl border bg-white/5 p-8 flex flex-col items-center text-center overflow-hidden"
    >
      {/* cursor-reactive specular light */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: lightBackground }}
      />

      <motion.div
        animate={{
          scale: hovered ? 1.08 : 1,
          boxShadow: hovered
            ? "0 0 26px rgba(168,85,247,0.6)"
            : "0 0 0px rgba(168,85,247,0)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="relative w-16 h-16 rounded-full bg-purple-600/10 border border-purple-500/40 flex items-center justify-center text-purple-400 text-3xl mb-6"
        style={{ transform: "translateZ(30px)" }}
      >
        {card.icon}
      </motion.div>

      <h3 className="relative text-white font-bold text-xl mb-3" style={{ transform: "translateZ(20px)" }}>
        {card.title}
      </h3>
      <p className="relative text-gray-400 text-sm leading-relaxed mb-6" style={{ transform: "translateZ(10px)" }}>
        {card.description}
      </p>

      <a
        href={card.href}
        target={card.external ? "_blank" : undefined}
        rel={card.external ? "noopener noreferrer" : undefined}
        className={
          isSolid
            ? "relative mt-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 text-white font-semibold transition-all duration-300"
            : "relative mt-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-semibold transition-colors duration-300"
        }
        style={{
          transform: "translateZ(24px)",
          boxShadow: isSolid && hovered ? "0 0 24px rgba(168,85,247,0.55)" : undefined,
        }}
      >
        {card.buttonIcon}
        {card.buttonLabel}
      </a>
    </motion.div>
  );
};

function PortfolioAccess() {
  const pointerFine = usePointerFine();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="portfolio" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto" style={{ perspective: 1200 }}>
        <SectionHeading />

        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, i) => (
            <AccessCard
              key={card.title}
              card={card}
              index={i}
              pointerFine={pointerFine}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioAccess;

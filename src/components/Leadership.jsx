import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { FaCrown, FaTimes } from "react-icons/fa";

const positions = [
  {
    role: "Vice President",
    society: "Young Speakers' Union",
    category: "Debating Society",
    org: "Government College University, Lahore",
    date: "2023 – 2025",
    logo: "/leadership/logos/ysu-logo.png",
    reflection:
      "Fostered a culture of confident communication by mentoring speakers, organizing debating initiatives, and creating opportunities for students to develop their voices through meaningful competition and collaboration.",
    contributions: ["Organized debating activities", "Mentored junior members", "Led event coordination", "Strengthened teamwork"],
    skills: ["Leadership", "Public Speaking", "Event Management"],
  },
  {
    role: "President",
    society: "Bazm-e-Shahab",
    category: "Literary Society",
    org: "Government College University, Lahore",
    date: "2023 – 2025",
    logo: "/leadership/logos/bazm-e-shahab-logo.png",
    reflection:
      "Led literary initiatives that encouraged creativity, dialogue, and intellectual growth while guiding members through collaborative projects and impactful campus events.",
    contributions: ["Managed society operations", "Organized literary events", "Led executive team", "Mentored members"],
    skills: ["Strategic Leadership", "Communication", "Management"],
  },
  {
    role: "Vice President",
    society: "Majlis Ameer Khusroo",
    category: "Literary Society",
    org: "Government College University, Lahore",
    date: "2023 – 2025",
    logo: "/leadership/logos/majlis-ameer-khusroo-logo.png",
    reflection:
      "Collaborated with executive members to strengthen literary engagement through impactful events and student-centered initiatives.",
    contributions: ["Coordinated programs", "Supported executive planning", "Managed event logistics"],
    skills: ["Leadership", "Collaboration", "Organization"],
  },
  {
    role: "Assistant Secretary",
    society: "IEEE Society",
    category: "Technology Society",
    org: "Government College University, Lahore",
    date: "2023 – 2025",
    logo: "/leadership/logos/ieee-logo.png",
    reflection:
      "Supported technical events, streamlined organizational activities, and helped create valuable professional learning opportunities for students.",
    contributions: ["Assisted event planning", "Coordinated workshops", "Supported administration"],
    skills: ["Technical Leadership", "Coordination", "Planning"],
  },
  {
    role: "Associate Secretary",
    society: "TAQS Quiz Society",
    category: "Quiz & Knowledge Society",
    org: "Government College University, Lahore",
    date: "2023 – 2025",
    logo: "/leadership/logos/taqs-logo.png",
    reflection:
      "Contributed to organizing knowledge-based competitions while promoting teamwork, discipline, and academic excellence.",
    contributions: ["Organized quiz competitions", "Managed event operations", "Coordinated participants"],
    skills: ["Organization", "Teamwork", "Communication"],
  },
  {
    role: "Member",
    society: "Pioneers' Debating Society",
    category: "Debating Society",
    org: "University of the Punjab, Lahore",
    date: "",
    logo: "/leadership/logos/pioneers-logo.png",
    reflection:
      "Began my competitive debating journey by refining communication skills, embracing constructive feedback, and building the foundation for future leadership roles.",
    contributions: ["Active participation", "Competitive debating", "Team collaboration"],
    skills: ["Critical Thinking", "Public Speaking", "Confidence"],
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

// ---------- Safe image (same as Achievements) ----------

const SafeImage = ({ src, alt, className, style, fallback }) => {
  const [errored, setErrored] = useState(false);
  if (!src || errored) return fallback;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setErrored(true)}
      className={className}
      style={style}
    />
  );
};

// ---------- Logo badge (same as Achievements) ----------

const LogoBadge = ({ src, icon, size = 48, active = false, hovered = false }) => {
  const [ripples, setRipples] = useState([]);
  const wasHovered = useRef(false);

  useEffect(() => {
    if (hovered && !wasHovered.current) {
      const id = Date.now() + Math.random();
      setRipples((r) => [...r, id]);
      const t = setTimeout(() => {
        setRipples((r) => r.filter((rid) => rid !== id));
      }, 650);
      wasHovered.current = true;
      return () => clearTimeout(t);
    }
    if (!hovered) wasHovered.current = false;
  }, [hovered]);

  const lit = active || hovered;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <motion.div
        aria-hidden="true"
        whileInView={{
          opacity: lit ? [0.6, 1, 0.6] : [0.35, 0.6, 0.35],
        }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: lit ? 1.8 : 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: lit
            ? "0 0 24px 6px rgba(216,180,254,0.7), 0 0 12px rgba(255,255,255,0.4)"
            : "0 0 16px 3px rgba(255,255,255,0.3), 0 0 10px rgba(168,85,247,0.45)",
          willChange: "opacity",
        }}
      />

      <AnimatePresence>
        {ripples.map((id) => (
          <motion.span
            key={id}
            initial={{ opacity: 0.5, scale: 0.75 }}
            animate={{ opacity: 0, scale: 1.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(216,180,254,0.55)" }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        animate={{ rotate: hovered ? 4 : 0, scale: hovered ? 1.04 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "inset 0 1px 3px rgba(255,255,255,0.8), 0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <SafeImage
            src={src}
            alt=""
            className="w-full h-full object-contain"
            style={{ padding: size * 0.14 }}
            fallback={<span className="text-purple-600" style={{ fontSize: size * 0.4 }}>{icon}</span>}
          />
        </div>
      </motion.div>
    </div>
  );
};

// ---------- Section heading ----------
// Matches the "Who is SAK?" heading treatment: same size, weight, and
// solid-color accent (no gradient, no Orbitron, no glow). The former
// separate "Leadership Beyond Positions" block is folded into a single
// bold, prominent subtitle directly under the heading.

const GalleryHeading = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    <h2 className="text-4xl md:text-6xl font-extrabold text-center text-white mb-4">
      Leadership <span className="text-purple-500">Gallery</span>
    </h2>
    <p className="text-gray-300 font-semibold max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
      Every role became an opportunity to lead with purpose, collaborate with diverse teams, and
      build communities that encourage growth.
    </p>
  </motion.div>
);

const AmbientGlow = ({ variant = "section" }) => {
  const isModal = variant === "modal";
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full"
      style={{
        width: isModal ? 360 : 480,
        height: isModal ? 360 : 480,
        top: isModal ? "10%" : "10%",
        [isModal ? "left" : "right"]: isModal ? "20%" : "10%",
        background: "radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)",
        filter: "blur(90px)",
        willChange: "transform",
      }}
      animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

// ---------- Leadership card ----------
// Same interaction system as Achievements: cursor-tracking specular light,
// subtle 3D tilt, translateZ depth lift on active. Clicking opens the
// full LeadershipCapsule modal (via onOpen, which captures this card's
// exact position) instead of expanding an inline accordion.

const LeadershipCard = ({ item, index, onOpen, pointerFine, reducedMotion, isActive }) => {
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
  const lightBackground = useMotionTemplate`radial-gradient(360px circle at ${lightXPercent} ${lightYPercent}, rgba(216,180,254,0.14), transparent 62%)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    lightX.set(relX);
    lightY.set(relY);
    if (!pointerFine || reducedMotion) return;
    rotateY.set((relX - 0.5) * 6);
    rotateX.set(-(relY - 0.5) * 6);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    lightX.set(0.5);
    lightY.set(0.5);
    setHovered(false);
  };

  const handleClick = () => {
    const rect = ref.current?.getBoundingClientRect();
    onOpen(index, rect);
  };

  const glowing = hovered || isActive;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={handleClick}
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
      transition={{ type: "spring", stiffness: 55, damping: 18, mass: 1, delay: index * 0.07 }}
      whileTap={{ scale: 0.985 }}
      style={{
        rotateX: pointerFine ? springX : 0,
        rotateY: pointerFine ? springY : 0,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
        background: isActive
          ? "rgba(255,255,255,0.06)"
          : glowing
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0.035)",
        borderColor: isActive
          ? "rgba(216,180,254,0.85)"
          : glowing
          ? "rgba(168,85,247,0.45)"
          : "rgba(168,85,247,0.16)",
        boxShadow: isActive
          ? "0 0 0 1px rgba(216,180,254,0.4), 0 24px 60px -22px rgba(168,85,247,0.4), inset 0 1px 0 rgba(255,255,255,0.08)"
          : glowing
          ? "0 20px 45px -24px rgba(168,85,247,0.28), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 12px 30px -22px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        transform: isActive ? "translateY(-4px) translateZ(12px) scale(1.015)" : "none",
        transition:
          "background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className="group relative text-left w-full rounded-[28px] border p-6 md:p-7 backdrop-blur-md cursor-pointer overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: glowing ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{ background: lightBackground }}
      />

      <div className="relative flex items-start justify-between gap-3 mb-4" style={{ transform: "translateZ(20px)" }}>
        <LogoBadge src={item.logo} icon={<FaCrown />} size={48} active={isActive} hovered={hovered} />
        <span
          className="px-3 py-1 rounded-full text-[10px] tracking-wider text-purple-300 border border-purple-500/30 bg-purple-500/10 whitespace-nowrap"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          {item.date || "ONGOING"}
        </span>
      </div>

      <h3 className="relative text-white font-semibold text-lg mb-1" style={{ transform: "translateZ(16px)" }}>
        {item.role}
      </h3>
      <p className="relative text-purple-400 text-sm font-medium mb-1">{item.society}</p>
      <p className="relative text-gray-500 text-xs mb-1">{item.category}</p>
      <p className="relative text-gray-500 text-xs mb-4">{item.org}</p>

      <div className="relative flex items-center gap-2 text-purple-400 text-sm">
        <span>View Details</span>
        <motion.span animate={{ x: glowing ? 4 : 0 }} transition={{ duration: 0.2 }}>
          →
        </motion.span>
      </div>
    </motion.button>
  );
};

// ---------- Leadership Capsule (popup) ----------

const LeadershipCapsule = ({ item, origin, onClose }) => {
  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const getOriginTransform = () => {
    if (!origin || !panelRef.current) return null;
    const panelRect = panelRef.current.getBoundingClientRect();
    const scaleX = origin.width / panelRect.width;
    const scaleY = origin.height / panelRect.height;
    const originCenterX = origin.left + origin.width / 2;
    const originCenterY = origin.top + origin.height / 2;
    const panelCenterX = panelRect.left + panelRect.width / 2;
    const panelCenterY = panelRect.top + panelRect.height / 2;
    return {
      x: originCenterX - panelCenterX,
      y: originCenterY - panelCenterY,
      scaleX,
      scaleY,
    };
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && containerRef.current) {
        const focusables = containerRef.current.querySelectorAll('button, [href]');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    const t = setTimeout(() => containerRef.current?.querySelector("button")?.focus(), 350);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const originTransform = getOriginTransform();

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: "rgba(5,2,8,0.8)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${item.role} at ${item.society}`}
        onClick={(e) => e.stopPropagation()}
        initial={
          reducedMotion
            ? { opacity: 0 }
            : originTransform
            ? {
                opacity: 0.4,
                x: originTransform.x,
                y: originTransform.y,
                scaleX: originTransform.scaleX,
                scaleY: originTransform.scaleY,
                borderRadius: 24,
              }
            : { opacity: 0, scale: 0.9, y: 20 }
        }
        animate={{ opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: 1, borderRadius: 30 }}
        exit={
          reducedMotion
            ? { opacity: 0 }
            : originTransform
            ? {
                opacity: 0.3,
                x: originTransform.x,
                y: originTransform.y,
                scaleX: originTransform.scaleX,
                scaleY: originTransform.scaleY,
                borderRadius: 24,
              }
            : { opacity: 0, scale: 0.92, y: 10 }
        }
        transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.9 }}
        ref={(node) => {
          panelRef.current = node;
          containerRef.current = node;
        }}
        className="relative w-full border border-purple-500/30 overflow-hidden"
        style={{
          maxWidth: 780,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "rgba(10,10,16,0.88)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          boxShadow: "0 0 70px rgba(168,85,247,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
          transformOrigin: "center center",
        }}
      >
        <AmbientGlow variant="modal" />

        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-white/[0.05] backdrop-blur-md text-white hover:border-purple-400/60 hover:text-purple-300 transition-colors duration-200"
        >
          <FaTimes />
        </button>

        <div className="relative p-8 md:p-12">
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 110, damping: 16 }}
            className="flex justify-center mb-6"
          >
            <LogoBadge src={item.logo} icon={<FaCrown />} size={88} active />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-purple-400 text-xs tracking-widest text-center mb-2"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {item.date || "ONGOING"}
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-white text-2xl md:text-3xl font-bold text-center mb-2"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {item.role}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-purple-300 text-center text-sm md:text-base mb-1"
          >
            {item.society}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="text-gray-500 text-center text-xs mb-8"
          >
            {item.category} · {item.org}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="max-w-xl mx-auto"
          >
            <p className="text-purple-300 text-xs tracking-wide mb-2 text-center" style={{ fontFamily: "Orbitron, sans-serif" }}>
              LEADERSHIP REFLECTION
            </p>
            <p className="text-gray-400 text-sm text-center mb-8" style={{ lineHeight: 1.8 }}>
              {item.reflection}
            </p>

            <p className="text-purple-300 text-xs tracking-wide mb-3 text-center" style={{ fontFamily: "Orbitron, sans-serif" }}>
              KEY CONTRIBUTIONS
            </p>
            <ul className="mb-8 space-y-2 flex flex-col items-center">
              {item.contributions.map((c) => (
                <li key={c} className="text-gray-400 text-sm flex items-start gap-2 max-w-md">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <p className="text-purple-300 text-xs tracking-wide mb-3 text-center" style={{ fontFamily: "Orbitron, sans-serif" }}>
              SKILLS DEVELOPED
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {item.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-xs text-purple-200 border border-purple-500/30 bg-purple-500/10"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.4 }}
            onClick={onClose}
            className="relative block mx-auto mt-10 px-6 py-2.5 rounded-full border border-purple-500/40 text-purple-300 text-sm hover:bg-purple-500/10 hover:border-purple-400/60 transition-colors duration-200"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const LeadershipGallery = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [origin, setOrigin] = useState(null);
  const pointerFine = usePointerFine();
  const reducedMotion = usePrefersReducedMotion();

  const handleOpen = useCallback((index, rect) => {
    if (rect) {
      setOrigin({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    }
    setActiveIndex(index);
    setOpenIndex(index);
  }, []);

  const handleClose = useCallback(() => setOpenIndex(null), []);

  return (
    <section id="leadership" className="relative py-24 px-6 md:px-16 overflow-hidden">
      <AmbientGlow variant="section" />

      <GalleryHeading />

      <div
        className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        style={{ perspective: 1200 }}
      >
        {positions.map((item, i) => (
          <LeadershipCard
            key={i}
            item={item}
            index={i}
            onOpen={handleOpen}
            pointerFine={pointerFine}
            reducedMotion={reducedMotion}
            isActive={activeIndex === i}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-gray-400 text-sm md:text-base mt-20 max-w-2xl mx-auto italic"
        style={{ letterSpacing: "0.02em", textShadow: "0 0 12px rgba(168,85,247,0.25)" }}
      >
        "True leadership is not defined by the position we hold, but by the people we inspire, the
        opportunities we create, and the legacy we leave behind."
      </motion.p>

      <AnimatePresence>
        {openIndex !== null && (
          <LeadershipCapsule item={positions[openIndex]} origin={origin} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default LeadershipGallery;

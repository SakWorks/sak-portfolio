import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { FaTrophy, FaMedal, FaTimes } from "react-icons/fa";

const achievements = [
  {
    icon: <FaTrophy />,
    logo: "/achievements/logos/king-edward.png",
    photo: "/achievements/photos/king-edward.jpg",
    award: "Best Speaker",
    competition: "25th All Pakistan Debating Championship",
    institution: "King Edward Medical University",
    year: "2024",
    memory:
      "A defining milestone where preparation met opportunity. Competing among Pakistan's finest speakers strengthened my confidence, sharpened my critical thinking, and reinforced the value of communicating with clarity under pressure.",
  },
  {
    icon: <FaTrophy />,
    logo: "/achievements/logos/forman.png",
    photo: "/achievements/photos/forman.jpg",
    award: "Best Speaker",
    competition: "18th Forman Bilingual Declamation Contest",
    institution: "Forman Christian College",
    year: "2024",
    memory:
      "An unforgettable experience that celebrated the power of language and meaningful expression. This achievement strengthened my ability to engage diverse audiences with confidence, authenticity, and purpose.",
  },
  {
    icon: <FaMedal />,
    logo: "/achievements/logos/uvas.png",
    photo: "/achievements/photos/uvas.jpg",
    award: "2nd Best Speaker",
    competition: "UVAS All Pakistan Debating Championship",
    institution: "UVAS",
    year: "2025",
    memory:
      "A milestone that reflected continuous growth and perseverance. Competing against accomplished speakers strengthened my analytical reasoning and inspired me to keep raising my own standards.",
  },
  {
    icon: <FaMedal />,
    logo: "/achievements/logos/iqbal-day.png",
    photo: "/achievements/photos/iqbal-day.jpg",
    award: "2nd Best Speaker",
    competition: "Iqbal Day All Punjab Declamation Contest",
    institution: "",
    year: "2025",
    memory:
      "Inspired by the philosophy of Allama Muhammad Iqbal, this competition deepened my appreciation for purposeful communication and strengthened my ability to deliver ideas with conviction and lasting impact.",
  },
  {
    icon: <FaMedal />,
    logo: "/achievements/logos/markehaq.png",
    photo: "/achievements/photos/markehaq.jpg",
    award: "2nd Best Speaker",
    competition: "Mark-e-Haq Interdepartmental Trilingual Debating Competition",
    institution: "",
    year: "2026",
    memory:
      "Competing across multiple languages demanded adaptability, confidence, and composure. This achievement reinforced the importance of connecting with diverse audiences while maintaining clarity and persuasive communication.",
  },
  {
    icon: <FaMedal />,
    logo: "/achievements/logos/pwcs.png",
    photo: "/achievements/photos/pwcs.jpg",
    award: "2nd Best Speaker",
    competition: "1st PWCS Debate Summit",
    institution: "",
    year: "2026",
    memory:
      "A proud milestone that reflected consistency, resilience, and the pursuit of excellence. Every debate became another opportunity to refine my communication, leadership, and professional confidence.",
  },
];

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

// ---------- Safe image ----------

const SafeImage = ({ src, alt, className, style, fallback }) => {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (!src || errored) return fallback;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => setErrored(true)}
      className={className}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    />
  );
};

// ---------- Section heading ----------
// Matches the "Who is SAK?" heading treatment: same size, weight, and
// solid-color accent (no gradient, no Orbitron, no glow). The former
// separate "Every Achievement Has a Story" block is now folded into a
// single bold, prominent subtitle directly under the heading.

const GalleryHeading = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    <h2 className="text-4xl md:text-6xl font-extrabold text-center text-white mb-4">
      Achievements <span className="text-purple-500">Gallery</span>
    </h2>
    <p className="text-gray-300 font-semibold max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
      Every stage became more than a competition — it became an opportunity to grow, lead, and
      communicate with purpose, turning challenges into milestones of discipline and excellence.
    </p>
  </motion.div>
);

// ---------- Institution logo badge ----------

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

// ---------- Achievement card ----------
// Static premium glow only (no infinite sweeping overlay). The only moving
// light is the cursor-tracking specular highlight, which is intentional
// and tied directly to mouse position.

const AchievementCard = ({ item, index, onOpen, pointerFine, reducedMotion, isActive }) => {
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

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

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

      <div className="relative mb-4" style={{ transform: "translateZ(24px)" }}>
        <LogoBadge src={item.logo} icon={item.icon} size={48} active={isActive} hovered={hovered} />
      </div>

      <motion.p
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: index * 0.07 + 0.08 }}
        className="relative text-purple-400 text-xs tracking-wide mb-1"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        {item.year}
      </motion.p>

      <motion.h3
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: index * 0.07 + 0.13 }}
        className="relative text-white font-semibold text-lg mb-1"
      >
        {item.award}
      </motion.h3>

      <motion.p
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: index * 0.07 + 0.18 }}
        className="relative text-gray-400 text-sm mb-1"
      >
        {item.competition}
      </motion.p>

      {item.institution && (
        <motion.p
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: index * 0.07 + 0.22 }}
          className="relative text-gray-500 text-xs mb-4"
        >
          {item.institution}
        </motion.p>
      )}

      <motion.div
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: index * 0.07 + 0.27 }}
        className="relative flex items-center gap-2 text-purple-400 text-sm"
      >
        <span>Open Memory</span>
        <motion.span animate={{ x: glowing ? 4 : 0 }} transition={{ duration: 0.2 }}>
          →
        </motion.span>
      </motion.div>
    </motion.button>
  );
};

// ---------- Ambient background ----------

const AuroraBackground = ({ variant = "section" }) => {
  const isModal = variant === "modal";
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: isModal ? 360 : 480,
          height: isModal ? 360 : 480,
          top: isModal ? "10%" : "20%",
          left: isModal ? "20%" : "55%",
          background: "radial-gradient(circle, rgba(168,85,247,0.22), transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

// ---------- Memory Capsule (popup) ----------

const MemoryCapsule = ({ item, origin, onClose }) => {
  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const isBest = item.award.toLowerCase().includes("best speaker") && !item.award.toLowerCase().includes("2nd");
  const BadgeIcon = isBest ? FaTrophy : FaMedal;

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
        aria-label={`${item.award} memory`}
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
        ref={panelRef}
        className="relative w-full border border-purple-500/30 overflow-hidden"
        style={{
          maxWidth: 950,
          maxHeight: "90vh",
          background: "rgba(10,10,16,0.88)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          boxShadow: "0 0 70px rgba(168,85,247,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
          transformOrigin: "center center",
        }}
      >
        {/* Plain (non-animated) scroll container. Keeping this separate
            from the motion.div above is the fix for trackpad/wheel scroll
            not working: a single element that's both being transform-
            animated (scaleX/scaleY/x/y here) AND is the scrollable
            overflow container gets its wheel/trackpad input mishandled by
            some browsers during and after the transform. Splitting the
            "animate" job and the "scroll" job onto two different elements
            avoids that entirely. */}
        <div
          ref={containerRef}
          className="relative w-full overflow-y-auto overscroll-contain"
          style={{
            maxHeight: "90vh",
            // Fixes a known mobile-browser bug: a scrollable element whose
            // ancestor has an active CSS transform (Framer Motion's
            // motion.div always keeps one applied, even at rest — that's
            // the outer panel here) can get broken or one-directional
            // touch scrolling, especially on iOS Safari and in-app
            // webviews (Instagram/Snapchat/etc). These two properties
            // explicitly tell the browser "this element owns vertical
            // touch-panning and should use native momentum scrolling",
            // which routes around the bug instead of relying on default
            // touch-scroll inference that transforms can confuse.
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
          }}
        >
          <AuroraBackground variant="modal" />

          <button
            onClick={onClose}
            aria-label="Close memory"
            className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-white/[0.05] backdrop-blur-md text-white hover:border-purple-400/60 hover:text-purple-300 transition-colors duration-200"
          >
            <FaTimes />
          </button>

          <div className="relative p-8 md:p-12">
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 110, damping: 16 }}
            className="relative mx-auto mb-8"
            style={{ width: "fit-content", maxWidth: "100%" }}
          >
            <motion.div
              aria-hidden="true"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-5 pointer-events-none rounded-2xl"
              style={{ background: "radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%)" }}
            />
            <SafeImage
              src={item.photo}
              alt={item.award}
              className="relative block rounded-2xl border border-purple-400/30"
              style={{
                maxHeight: "55vh",
                maxWidth: "100%",
                width: "auto",
                height: "auto",
                boxShadow: "0 0 50px rgba(168,85,247,0.25)",
              }}
              fallback={
                <div
                  className="relative w-[300px] h-[300px] flex items-center justify-center text-6xl text-purple-300 bg-purple-500/10 rounded-2xl border border-purple-400/30"
                  style={{ boxShadow: "0 0 50px rgba(168,85,247,0.25)" }}
                >
                  {item.icon}
                </div>
              }
            />
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 14 }}
              className="absolute -bottom-4 -right-4 w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white border-2 border-[#0a0a10]"
              style={{
                background: "linear-gradient(135deg, #c084fc, #7c3aed)",
                boxShadow: "0 0 20px rgba(168,85,247,0.6)",
              }}
            >
              <BadgeIcon />
            </motion.div>
          </motion.div>

          {item.logo && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <LogoBadge src={item.logo} icon={item.icon} size={40} />
              {item.institution && (
                <span className="text-gray-400 text-xs">{item.institution}</span>
              )}
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-purple-400 text-xs tracking-widest text-center mb-2"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {item.year}
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-white text-2xl md:text-3xl font-bold text-center mb-2"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {item.award}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="text-purple-300 text-center text-sm md:text-base mb-8"
          >
            {item.competition}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="max-w-xl mx-auto text-center"
          >
            <p className="text-gray-400 text-sm md:text-base" style={{ lineHeight: 1.8 }}>
              {item.memory}
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.4 }}
            onClick={onClose}
            className="relative block mx-auto mt-10 px-6 py-2.5 rounded-full border border-purple-500/40 text-purple-300 text-sm hover:bg-purple-500/10 hover:border-purple-400/60 transition-colors duration-200"
          >
            Close Memory
          </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------- Main section ----------

const Achievements = () => {
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
    <section id="achievements" className="relative py-24 px-6 md:px-16 overflow-hidden">
      <AuroraBackground variant="section" />

      <GalleryHeading />

      <div
        className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        style={{ perspective: 1200 }}
      >
        {achievements.map((item, i) => (
          <AchievementCard
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
        "Every achievement marks a milestone, but the true reward lies in the growth, resilience,
        and purpose discovered throughout the journey."
      </motion.p>

      <AnimatePresence>
        {openIndex !== null && (
          <MemoryCapsule item={achievements[openIndex]} origin={origin} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;

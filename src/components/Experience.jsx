import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const experiences = [
  {
    role: "Amazon VA & Website Developer",
    company: "Servzon / Gibazon",
    orgType:
      "E-commerce operations and web development, keeping client-facing sites and listings running smoothly.",
    duration: "2022 — 2023",
    logo: "/servzon-logo.png",
    achievements: [
      "Managed end-to-end Amazon virtual assistant operations across listings and orders",
      "Designed and maintained business websites supporting client workflows",
      "Improved coordination between technical and operational teams",
    ],
    technologies: ["Amazon Seller Central", "WordPress", "JavaScript", "HTML/CSS"],
    impact: [
      "Improved order processing efficiency",
      "Reduced manual coordination overhead",
      "Delivered reliable client-facing web presence",
    ],
  },
  {
    role: "Software VA & Accountant",
    company: "ECOM Technologies",
    orgType:
      "Software operations paired with accounting and bookkeeping, supporting the business's day-to-day financial and technical workflows.",
    duration: "Apr 2025 — Present",
    logo: "/ecom-logo.png",
    achievements: [
      "Managing software operations alongside accounting and bookkeeping workflows",
      "Supporting business automation initiatives across daily operations",
      "Providing technical virtual assistance for company-wide activities",
    ],
    technologies: ["Excel", "QuickBooks", "Process Automation", "Reporting"],
    impact: [
      "Streamlined financial reporting cycles",
      "Reduced manual data-entry workload",
      "Improved cross-functional operational visibility",
    ],
  },
  {
    role: "Amazon VA",
    company: "BESTITHUB.COM INC",
    orgType:
      "E-commerce operations at scale, covering listings, inventory, and customer support.",
    duration: "Apr 2025 — Present",
    logo: "/bestithub-logo.png",
    achievements: [
      "Managing Amazon listings, inventory, and order processing at scale",
      "Delivering customer support with a focus on retention and satisfaction",
      "Maintaining operational efficiency across daily business activity",
    ],
    technologies: ["Amazon Seller Central", "Inventory Management", "Customer Support"],
    impact: [
      "Improved listing accuracy and visibility",
      "Reduced order-processing turnaround time",
      "Strengthened customer satisfaction metrics",
    ],
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

// Tiny inline SVG turbulence, used at very low opacity as a glass "grain".
const NOISE_URL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter>" +
  "<rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

const GlassNoise = ({ className = "" }) => (
  <div
    className={`pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay ${className}`}
    style={{ backgroundImage: `url("${NOISE_URL}")`, backgroundSize: "120px 120px" }}
  />
);

// ---------- Heading ----------
// Matches the "Who is SAK?" heading treatment: same size, weight, and
// solid-color accent (no gradient, no Orbitron, no glow). The former
// "Every Role, a Step Forward" block is folded into a single bold,
// prominent subtitle directly under the heading.

const SectionHeading = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-20"
  >
    <h2 className="text-4xl md:text-6xl font-extrabold text-center text-white mb-4">
      Work <span className="text-purple-500">Experience</span>
    </h2>
    <p className="text-gray-300 font-semibold max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
      Each position has been an opportunity to take on real responsibility across operations,
      development, and automation. While building the technical and professional judgment that
      comes from delivering results, not just tasks.
    </p>
  </motion.div>
);

// ---------- Logo sphere ----------
// The company logo mounted inside a glass sphere: soft reflections, purple
// ambient light, a slow few-degree drift, a gentle tilt toward the cursor,
// and the same rotating-ring + one-shot ripple language used for the
// Achievements and Leadership badges. Standard, moderate size — not an
// oversized centerpiece.

const LogoSphere = ({ logo, company }) => {
  const ref = useRef(null);
  const pointerFine = usePointerFine();
  const [hovered, setHovered] = useState(false);
  const [ripple, setRipple] = useState(0);
  const wasHovered = useRef(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 160, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 160, damping: 18 });

  useEffect(() => {
    if (hovered && !wasHovered.current) {
      setRipple((r) => r + 1);
    }
    wasHovered.current = hovered;
  }, [hovered]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!pointerFine || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * 12);
      rotateX.set(-py * 12);
    },
    [pointerFine, rotateX, rotateY]
  );

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className="relative shrink-0 mx-auto md:mx-0"
      style={{ width: 88, height: 88, perspective: 700 }}
    >
      {/* ambient breathing bloom — stronger on hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-40%] rounded-full blur-2xl"
        animate={{ opacity: hovered ? [0.35, 0.55, 0.35] : [0.18, 0.32, 0.18] }}
        transition={{ duration: hovered ? 2 : 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.55), transparent 70%)" }}
      />

      {/* rotating premium ring */}
      <motion.div
        className="absolute inset-[-5px] rounded-full"
        style={{
          border: "1px solid rgba(192,132,252,0.3)",
          boxShadow: hovered
            ? "0 0 20px rgba(168,85,247,0.5), inset 0 0 14px rgba(168,85,247,0.2)"
            : "0 0 8px rgba(168,85,247,0.15)",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 13, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[2px] rounded-full border border-white/10"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />

      {/* one-shot ripple, fired on hover-enter */}
      <AnimatePresence>
        {ripple > 0 && (
          <motion.div
            key={ripple}
            initial={{ opacity: 0.55, scale: 0.7 }}
            animate={{ opacity: 0, scale: 1.7 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-purple-300/60"
          />
        )}
      </AnimatePresence>

      {/* the sphere itself */}
      <motion.div
        animate={{ rotate: [-3, 3, -3], scale: hovered ? 1.04 : 1 }}
        transition={{
          rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          scale: { type: "spring", stiffness: 260, damping: 20 },
        }}
        style={{
          rotateX: pointerFine ? springRotateX : 0,
          rotateY: pointerFine ? springRotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-full"
      >
        {/* glass sphere body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(238,232,255,0.55) 32%, rgba(168,85,247,0.18) 62%, rgba(30,20,50,0.5) 100%)",
            boxShadow:
              "inset -6px -8px 20px rgba(80,40,140,0.35), inset 5px 6px 14px rgba(255,255,255,0.5), 0 12px 28px rgba(0,0,0,0.45), 0 0 24px rgba(168,85,247,0.28)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        />

        {/* specular highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full blur-md"
          style={{
            width: "36%",
            height: "20%",
            top: "15%",
            left: "18%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.85), transparent 75%)",
          }}
        />

        {/* logo — larger fill so it reads clearly at this smaller sphere size */}
        <div
          className="absolute rounded-full bg-white flex items-center justify-center overflow-hidden"
          style={{
            inset: "13%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.35), inset 0 1px 2px rgba(255,255,255,0.8)",
          }}
        >
          <img src={logo} alt={company} className="w-full h-full object-contain p-2" />
        </div>
      </motion.div>
    </div>
  );
};

// ---------- Experience card ----------
// Independent, self-contained card: cursor-reactive lighting, hover
// elevation, and a 3D tilt-up entrance on scroll. Clicking toggles a
// persistent selected glow AND fires a one-shot expanding glow ring for
// tactile click feedback (not a loop — it fires once and fades).

const ExperienceCard = ({ exp, reverse, parallaxX, parallaxY }) => {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [clickPulse, setClickPulse] = useState(0);
  const pointerFine = usePointerFine();
  const reducedMotion = usePrefersReducedMotion();
  const cardRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const glow = hovered || selected;

  const handleMouseMove = useCallback(
    (e) => {
      if (!pointerFine || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      setGlowPos({ x: px * 100, y: py * 100 });
    },
    [pointerFine]
  );

  const handleClick = () => {
    setSelected((s) => !s);
    setClickPulse((p) => p + 1);
  };

  return (
    <motion.div
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 40, scale: 0.94, rotateX: 8, filter: "blur(10px)" }
      }
      whileInView={
        reducedMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 55, damping: 18, mass: 1 }}
      style={{ x: parallaxX, y: parallaxY, transformPerspective: 1200 }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        animate={{ y: glow ? -5 : 0, scale: selected ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className="relative rounded-[28px] cursor-pointer p-7 md:p-8 overflow-hidden"
      >
        {/* soft radial nebula glow behind the card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-16 -z-10 opacity-[0.10] blur-[100px]"
          style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }}
        />

        {/* base glass surface */}
        <div
          className="absolute inset-0 rounded-[28px] border bg-white/[0.03] backdrop-blur-xl transition-all duration-500"
          style={{
            borderColor: selected
              ? "rgba(216,180,254,0.75)"
              : glow
              ? "rgba(192,132,252,0.4)"
              : "rgba(255,255,255,0.08)",
            boxShadow: selected
              ? "0 26px 65px rgba(0,0,0,0.5), 0 0 40px rgba(168,85,247,0.35), inset 0 1px 0 rgba(255,255,255,0.08)"
              : glow
              ? "0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(168,85,247,0.12), inset 0 1px 0 rgba(255,255,255,0.06)"
              : "0 10px 30px rgba(0,0,0,0.28)",
          }}
        />

        {/* one-shot click glow ring */}
        <AnimatePresence>
          {clickPulse > 0 && (
            <motion.div
              key={clickPulse}
              aria-hidden="true"
              initial={{ opacity: 0.6, scale: 0.96 }}
              animate={{ opacity: 0, scale: 1.04 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 rounded-[28px]"
              style={{ boxShadow: "0 0 0 1px rgba(216,180,254,0.7), 0 0 50px rgba(168,85,247,0.5)" }}
            />
          )}
        </AnimatePresence>

        {/* cursor-following light */}
        {pointerFine && (
          <div
            className="absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(360px circle at ${glowPos.x}% ${glowPos.y}%, rgba(168,85,247,0.13), transparent 60%)`,
            }}
          />
        )}

        <GlassNoise className="rounded-[28px]" />

        {/* content */}
        <div
          className={`relative flex flex-col gap-6 md:gap-9 md:items-center ${
            reverse ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          <LogoSphere logo={exp.logo} company={exp.company} />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
              <span className="text-white font-semibold text-sm">{exp.company}</span>
              <span className="text-gray-500 text-xs">•</span>
              <span
                className="text-purple-300 text-xs tracking-wide"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {exp.duration}
              </span>
            </div>

            <h3
              className="text-white text-2xl md:text-[1.75rem] font-semibold mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {exp.role}
            </h3>

            <p className="text-gray-400 text-sm md:text-base mb-6" style={{ lineHeight: 1.75 }}>
              {exp.orgType}
            </p>

            <div className="mb-6">
              <p className="text-gray-500 text-xs tracking-wide uppercase mb-3">Key Achievements</p>
              <ul className="space-y-2">
                {exp.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-gray-300 text-sm" style={{ lineHeight: 1.6 }}>
                    <span className="text-purple-400 mt-1.5 shrink-0" style={{ fontSize: 6 }}>
                      ●
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-gray-500 text-xs tracking-wide uppercase mb-3">Business Impact</p>
              <ul className="space-y-2">
                {exp.impact.map((i) => (
                  <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm">
                    <FaCheckCircle className="text-purple-400 mt-0.5 shrink-0" size={14} />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------- Main section ----------
// No timeline. No connecting line. Each experience is an independent
// premium card, alternating orientation for rhythm. A subtle section-wide
// cursor parallax ties them together instead of a literal line.

const Experience = () => {
  const sectionRef = useRef(null);
  const pointerFine = usePointerFine();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springMx = useSpring(mx, { stiffness: 60, damping: 20 });
  const springMy = useSpring(my, { stiffness: 60, damping: 20 });

  const glowX = useTransform(springMx, (v) => `${50 + v * 8}%`);
  const glowY = useTransform(springMy, (v) => `${50 + v * 8}%`);
  const parallaxX = useTransform(springMx, (v) => v * 8);
  const parallaxY = useTransform(springMy, (v) => v * 6);

  const handleSectionMouseMove = (e) => {
    if (!pointerFine || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      id="experience"
      className="relative py-24 px-6 md:px-16 overflow-hidden"
    >
      {/* subtle ambient background, reacting gently to cursor position */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          background: `radial-gradient(600px circle at ${glowX} ${glowY}, #7c3aed, transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 w-[420px] h-[420px] rounded-full opacity-[0.07] blur-[140px]"
        style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)" }}
      />

      <SectionHeading />

      <div className="relative max-w-5xl mx-auto flex flex-col gap-8 md:gap-10">
        {experiences.map((exp, index) => (
          <ExperienceCard
            key={index}
            exp={exp}
            reverse={index % 2 === 1}
            parallaxX={parallaxX}
            parallaxY={parallaxY}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;

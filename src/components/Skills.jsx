import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { FaLayerGroup, FaCloud, FaBolt, FaUsersCog, FaTimes } from "react-icons/fa";

const skills = [
  {
    id: "web",
    icon: <FaLayerGroup />,
    name: "Full Stack Development",
    level: 85,
    tag: "Advanced",
    experience: "3+ Years",
    capabilities: [
      { icon: "🚀", label: "SaaS Platforms" },
      { icon: "🌐", label: "Responsive Interfaces" },
      { icon: "⚙️", label: "Performance Optimization" },
      { icon: "📱", label: "Cross-device Experience" },
    ],
    process: ["Discovery & Requirements", "System Architecture", "Iterative Development", "Performance Tuning", "Launch & Monitoring"],
    metrics: [
      { value: "★★★★★", label: "Production Ready" },
      { value: "99%", label: "Performance Focus" },
      { value: "100%", label: "Responsive Design" },
      { value: "24/7", label: "Problem Solving" },
    ],
    color: "#a855f7",
    tier: 1,
    speed: 0.12,
  },
  {
    id: "operations",
    icon: <FaCloud />,
    name: "Cloud & Operations",
    level: 90,
    tag: "Advanced",
    experience: "4+ Years",
    capabilities: [
      { icon: "📦", label: "Listing Optimization" },
      { icon: "🔄", label: "Order Management" },
      { icon: "🧭", label: "Multi-Account Ops" },
      { icon: "📊", label: "Process Efficiency" },
    ],
    process: ["Account Audit", "Listing & Catalog Optimization", "Order & Inventory Management", "Performance Reporting", "Continuous Scaling"],
    metrics: [
      { value: "★★★★★", label: "Client Trusted" },
      { value: "95%", label: "Accuracy Rate" },
      { value: "100%", label: "On-Time Delivery" },
      { value: "24/7", label: "Operational Support" },
    ],
    color: "#f59e0b",
    tier: 2,
    speed: 0.085,
  },
  {
    id: "automation",
    icon: <FaBolt />,
    name: "Automation Engineering",
    level: 75,
    tag: "Professional",
    experience: "2+ Years",
    capabilities: [
      { icon: "🤖", label: "Workflow Automation" },
      { icon: "💰", label: "Financial Systems" },
      { icon: "📈", label: "Reporting Pipelines" },
      { icon: "🔒", label: "Data Accuracy" },
    ],
    process: ["Process Mapping", "Tool Selection", "Workflow Build", "Testing & Validation", "Ongoing Monitoring"],
    metrics: [
      { value: "★★★★☆", label: "Reliable Systems" },
      { value: "90%", label: "Time Saved" },
      { value: "100%", label: "Data Integrity" },
      { value: "24/7", label: "Monitoring Mindset" },
    ],
    color: "#10b981",
    tier: 1,
    speed: 0.15,
  },
  {
    id: "communication",
    icon: <FaUsersCog />,
    name: "Strategic Communication",
    level: 95,
    tag: "Expert",
    experience: "5+ Years",
    capabilities: [
      { icon: "🎙️", label: "Public Speaking" },
      { icon: "🧠", label: "Critical Thinking" },
      { icon: "🏆", label: "National Recognition" },
      { icon: "🤝", label: "Persuasive Argumentation" },
    ],
    process: ["Research & Framing", "Argument Construction", "Rehearsal & Refinement", "Live Delivery", "Reflection & Growth"],
    metrics: [
      { value: "★★★★★", label: "Award Winning" },
      { value: "6+", label: "Major Titles" },
      { value: "100%", label: "Audience Engagement" },
      { value: "24/7", label: "Mentorship Mindset" },
    ],
    color: "#ec4899",
    tier: 2,
    speed: 0.1,
  },
  {
    id: "leadership",
    icon: <FaUsersCog />,
    name: "People-First Leadership",
    level: 88,
    tag: "Advanced",
    experience: "3+ Years",
    capabilities: [
      { icon: "🧭", label: "Team Management" },
      { icon: "🎯", label: "Event Leadership" },
      { icon: "🌱", label: "Mentorship" },
      { icon: "🛠️", label: "Program Execution" },
    ],
    process: ["Team Onboarding", "Goal Setting", "Mentorship & Support", "Execution Oversight", "Retrospective & Growth"],
    metrics: [
      { value: "★★★★★", label: "Trusted Leader" },
      { value: "6", label: "Leadership Roles" },
      { value: "100%", label: "Team Delivery" },
      { value: "24/7", label: "Team Support" },
    ],
    color: "#6366f1",
    tier: 3,
    speed: 0.095,
  },
];

// ---------- Breakpoint detection ----------

const useBreakpoint = () => {
  const [bp, setBp] = useState("desktop");
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return bp;
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

// ---------- Per-breakpoint layout config ----------
// Desktop: original elliptical multi-orbit, wide and airy.
// Tablet: proportionally smaller ellipses, more spacing between rings.
// Mobile: genuinely different — tight circular orbits grouped into just
// 3 rings (by `tier`), bigger touch targets, no floating name labels
// (avoids clutter), sun made the clear visual focus.

const LAYOUTS = {
  desktop: {
    sunSize: 192,
    planetSize: 56,
    showLabels: true,
    orbits: {
      web: { rx: 220, ry: 105 },
      operations: { rx: 300, ry: 135 },
      automation: { rx: 150, ry: 70 },
      communication: { rx: 260, ry: 115 },
      leadership: { rx: 180, ry: 168 },
    },
    stageWidth: 720,
    stageHeight: 680,
  },
  tablet: {
    sunSize: 140,
    planetSize: 46,
    showLabels: true,
    orbits: {
      web: { rx: 150, ry: 90 },
      operations: { rx: 200, ry: 112 },
      automation: { rx: 105, ry: 62 },
      communication: { rx: 175, ry: 100 },
      leadership: { rx: 128, ry: 138 },
    },
    stageWidth: 480,
    stageHeight: 460,
  },
  mobile: {
    sunSize: 104,
    planetSize: 50,
    showLabels: false,
    // circular rings grouped by tier, evenly spaced angles within a tier
    tierRadius: { 1: 92, 2: 132, 3: 172 },
    stageWidth: 360,
    stageHeight: 380,
  },
};

// ---------- Ambient dust ----------

const DepthDust = ({ count }) => {
  const motes = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2,
      depth: Math.random(),
      duration: 6 + Math.random() * 6,
    }))
  ).current;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {motes.map((m) => (
        <motion.span
          key={m.id}
          className="absolute rounded-full bg-purple-200"
          style={{ left: `${m.left}%`, top: `${m.top}%`, width: m.size, height: m.size, opacity: 0.15 + m.depth * 0.35 }}
          animate={{ y: [0, -14 - m.depth * 10, 0], opacity: [0.1, 0.15 + m.depth * 0.4, 0.1] }}
          transition={{ duration: m.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

// ---------- Heading ----------

const SectionHeading = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-10 md:mb-14 relative"
  >
    <div
      aria-hidden="true"
      className="absolute -inset-x-10 -top-8 h-32 pointer-events-none opacity-20 blur-[70px]"
      style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }}
    />
    <h2 className="relative text-3xl md:text-5xl font-extrabold text-white tracking-tight">
      Capability <span className="text-purple-500">System</span>
    </h2>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="h-[2px] w-32 mx-auto mt-4 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
    />
    <p className="text-gray-400 mt-6 max-w-xl mx-auto text-sm md:text-base leading-relaxed px-4">
      Every capability orbits the same core. Tap or click a planet to explore it.
    </p>
  </motion.div>
);

// ---------- Sun ----------

const SunCore = ({ size }) => {
  const lightAngle = useMotionValue(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const rawDt = now - last;
      last = now;
      const dt = Math.min(rawDt, 48);
      lightAngle.set((lightAngle.get() + dt * 0.02) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [lightAngle, reducedMotion]);

  const lightX = useTransform(lightAngle, (a) => 50 + Math.cos((a * Math.PI) / 180) * 22);
  const lightY = useTransform(lightAngle, (a) => 40 + Math.sin((a * Math.PI) / 180) * 18);
  const highlightBg = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.55), transparent 45%)`;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      style={{ width: size, height: size, zIndex: 20 }}
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ boxShadow: `0 0 ${size * 0.55}px ${size * 0.14}px rgba(168,85,247,0.55)` }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-8px] rounded-full"
        style={{ background: "conic-gradient(from 0deg, transparent, #a855f7, transparent 60%)", padding: 2 }}
      >
        <div className="w-full h-full rounded-full bg-transparent" />
      </motion.div>

      <div
        className="relative w-full h-full rounded-full flex flex-col items-center justify-center text-center overflow-hidden px-3"
        style={{
          background: "radial-gradient(circle at 35% 30%, rgba(168,85,247,0.42), rgba(5,2,10,0.94) 70%)",
          border: "1px solid rgba(216,180,254,0.45)",
          boxShadow: "inset 0 2px 24px rgba(216,180,254,0.35), inset 0 -10px 30px rgba(0,0,0,0.6)",
        }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{ background: highlightBg }}
        />
        <span
          className="relative text-white font-bold"
          style={{ fontFamily: "Orbitron, sans-serif", letterSpacing: "0.08em", fontSize: Math.max(16, size * 0.13) }}
        >
          SAK
        </span>
        <span className="relative text-gray-300 tracking-wide mt-1" style={{ fontSize: Math.max(9, size * 0.055) }}>
          Full Stack Engineer
        </span>
      </div>
    </div>
  );
};

// ---------- Orbit ring (ellipse for desktop/tablet, circle for mobile) ----------

const OrbitRing = ({ rx, ry, color }) => (
  <svg
    className="absolute pointer-events-none"
    style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
    width={rx * 2 + 24}
    height={ry * 2 + 24}
    viewBox={`0 0 ${rx * 2 + 24} ${ry * 2 + 24}`}
  >
    <ellipse cx={rx + 12} cy={ry + 12} rx={rx} ry={ry} fill="none" stroke={`${color}22`} strokeWidth="1" />
  </svg>
);

// ---------- Planet ----------

const Planet = ({ skill, onOpen, reducedMotion, planetSize, radiusX, radiusY, showLabel, startAngle, speed }) => {
  const ref = useRef(null);
  const angle = useMotionValue(startAngle);
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);

  const x = useTransform(angle, (a) => Math.cos((a * Math.PI) / 180) * radiusX);
  const y = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * radiusY);
  const depth = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180));
  const scale = useTransform(depth, [-1, 1], [0.82, 1.12]);
  const opacity = useTransform(depth, [-1, 1], [0.6, 1]);
  const zIndex = useTransform(depth, (d) => Math.round(d * 8) + 15);
  const blurAmt = useTransform(depth, [-1, 1], [1, 0]);
  const filterBlur = useTransform(blurAmt, (b) => `blur(${b}px)`);

  useEffect(() => {
    if (reducedMotion) return;
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const rawDt = now - last;
      last = now;
      const dt = Math.min(rawDt, 48) / 16.6667;
      angle.set((angle.get() + speed * dt) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [angle, speed, reducedMotion]);

  const handleClick = () => {
    setTapped(true);
    setTimeout(() => setTapped(false), 350);
    const rect = ref.current?.getBoundingClientRect();
    onOpen(skill.id, rect);
  };

  const glowing = hovered || tapped;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ x, y, scale, opacity, zIndex, filter: filterBlur }}
      className="absolute top-1/2 left-1/2 flex flex-col items-center touch-manipulation"
    >
      <motion.div
        animate={{ scale: glowing ? 1.16 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-white cursor-pointer"
        style={{
          width: planetSize,
          height: planetSize,
          fontSize: Math.max(16, planetSize * 0.36),
          background: `linear-gradient(145deg, ${skill.color}, ${skill.color}cc)`,
          border: `2.5px solid ${glowing ? "#ffffff" : skill.color}`,
          boxShadow: glowing
            ? `0 0 26px ${skill.color}dd, inset 0 1px 6px rgba(255,255,255,0.4)`
            : `0 0 16px ${skill.color}77, inset 0 1px 4px rgba(255,255,255,0.25)`,
        }}
      >
        {skill.icon}
      </motion.div>

      {showLabel && (
        <span
          className="absolute top-full mt-1.5 -translate-x-1/2 left-1/2 whitespace-nowrap px-2.5 py-1 rounded-full"
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: glowing ? skill.color : `${skill.color}cc`,
            background: "rgba(5,2,10,0.72)",
            border: `1px solid ${glowing ? `${skill.color}88` : `${skill.color}40`}`,
            boxShadow: glowing ? `0 0 10px ${skill.color}55` : "none",
          }}
        >
          {skill.name}
        </span>
      )}
    </motion.button>
  );
};

// ---------- Detail console pieces ----------

const SignalMeter = ({ level, color }) => {
  const segments = 10;
  const filled = Math.round((level / 100) * segments);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: segments }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.04 * i, duration: 0.25 }}
          className="w-1 rounded-sm"
          style={{
            height: 8 + (i / segments) * 10,
            background: i < filled ? color : "rgba(255,255,255,0.1)",
            boxShadow: i < filled ? `0 0 6px ${color}` : "none",
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
};

const CapabilityCapsule = ({ cap, index, color }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.05, duration: 0.35 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -3, scale: 1.04 }}
      className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs cursor-default"
      style={{
        background: hovered ? `${color}22` : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? `${color}80` : "rgba(255,255,255,0.1)"}`,
        color: hovered ? color : "#d1d5db",
        transition: "background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease",
      }}
    >
      <span>{cap.icon}</span>
      <span>{cap.label}</span>
    </motion.div>
  );
};

const WorkflowStep = ({ step, index, skillColor, isLast }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 + index * 0.06, duration: 0.35 }}
    className="relative flex items-center gap-3 pb-2.5"
  >
    {!isLast && (
      <span className="absolute left-[3px] top-3 w-px" style={{ height: "calc(100% - 4px)", background: `${skillColor}30` }} />
    )}
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.22 + index * 0.06, type: "spring", stiffness: 300, damping: 18 }}
      className="relative w-2 h-2 rounded-full shrink-0"
      style={{ background: skillColor, boxShadow: `0 0 8px ${skillColor}` }}
    />
    <span className="text-gray-300 text-xs md:text-sm font-mono">{step}</span>
  </motion.div>
);

const MetricTile = ({ metric, index, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3 + index * 0.06, type: "spring", stiffness: 220, damping: 20 }}
    className="rounded-2xl border p-3.5 text-center"
    style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
  >
    <div className="font-bold text-lg mb-1" style={{ color, fontFamily: "Orbitron, sans-serif" }}>
      {metric.value}
    </div>
    <div className="text-gray-500 text-[10px] tracking-wide uppercase">{metric.label}</div>
  </motion.div>
);

const DetailConsole = ({ skill, origin, onClose }) => {
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
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
    return { x: originCenterX - panelCenterX, y: originCenterY - panelCenterY, scaleX, scaleY };
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    // Robust body scroll lock: position:fixed prevents mobile browsers
    // (especially iOS Safari) from letting touch-scroll bleed through to
    // the page behind the modal — plain overflow:hidden alone is not
    // reliable on touch devices.
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
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
        onTouchMove={(e) => e.preventDefault()}
        className="absolute inset-0"
        style={{ background: "rgba(5,2,8,0.8)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <style>{`
        .skill-console-scroll { scrollbar-width: thin; scrollbar-color: ${skill.color} rgba(255,255,255,0.06); }
        .skill-console-scroll::-webkit-scrollbar { width: 7px; }
        .skill-console-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); }
        .skill-console-scroll::-webkit-scrollbar-thumb { background: ${skill.color}; border-radius: 8px; }
      `}</style>

      {/* Outer motion.div: handles ONLY the open/close transform animation.
          No overflow property here — that job is fully delegated to the
          plain inner div below. This split is the fix for trackpad/touch
          scroll not working: a single element that's both transform-
          animated AND the scroll container gets its wheel/touch input
          mishandled by some browsers. */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        initial={
          reducedMotion
            ? { opacity: 0 }
            : originTransform
            ? { opacity: 0.4, x: originTransform.x, y: originTransform.y, scaleX: originTransform.scaleX, scaleY: originTransform.scaleY, borderRadius: 24, filter: "blur(3px)" }
            : { opacity: 0, scale: 0.9 }
        }
        animate={{ opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: 1, borderRadius: 28, filter: "blur(0px)" }}
        exit={
          reducedMotion
            ? { opacity: 0 }
            : originTransform
            ? { opacity: 0.3, x: originTransform.x, y: originTransform.y, scaleX: originTransform.scaleX, scaleY: originTransform.scaleY, borderRadius: 24, filter: "blur(3px)" }
            : { opacity: 0, scale: 0.92 }
        }
        transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.85 }}
        className="relative w-full border overflow-hidden"
        style={{
          maxWidth: 640,
          maxHeight: "88vh",
          background: "rgba(10,10,16,0.92)",
          borderColor: `${skill.color}55`,
          backdropFilter: "blur(28px)",
          boxShadow: `0 0 70px ${skill.color}33, inset 0 1px 0 rgba(255,255,255,0.06)`,
          transformOrigin: "center center",
        }}
      >
        {/* Plain (non-animated) scroll container — owns overflow-y-auto
            and receives all wheel/touch scroll input directly. */}
        <div
          ref={scrollRef}
          className="skill-console-scroll relative w-full h-full overflow-y-auto overscroll-contain"
          style={{
            maxHeight: "88vh",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0.55, scale: 0.3 }}
            animate={{ opacity: 0, scale: 1.7 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${skill.color}55, transparent 70%)` }}
          />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/[0.05] text-white hover:border-purple-400/60 transition-colors duration-200"
          >
            <FaTimes size={13} />
          </button>

          <div className="relative p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                initial={{ scale: 0.7, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl shrink-0"
                style={{ backgroundColor: skill.color, boxShadow: `0 0 24px ${skill.color}77` }}
              >
                {skill.icon}
              </motion.div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-1">{skill.name}</h3>
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <span
                    className="text-xs px-3 py-1 rounded-full border"
                    style={{ borderColor: `${skill.color}66`, color: skill.color, background: `${skill.color}15` }}
                  >
                    {skill.tag}
                  </span>
                  <span className="text-gray-400 text-xs font-mono">{skill.experience}</span>
                </div>
                <SignalMeter level={skill.level} color={skill.color} />
              </div>
            </div>

            <div className="flex items-center gap-1.5 mb-6 -mt-2">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: skill.color, boxShadow: `0 0 6px ${skill.color}` }}
              />
              <span className="text-[10px] text-gray-500 tracking-wide uppercase font-mono">Verified Professional</span>
            </div>

            <div className="mb-6">
              <p className="text-xs tracking-wide uppercase mb-3" style={{ color: skill.color }}>
                Core Capabilities
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.capabilities.map((cap, i) => (
                  <CapabilityCapsule key={cap.label} cap={cap} index={i} color={skill.color} />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs tracking-wide uppercase mb-3" style={{ color: skill.color }}>
                How I Approach It
              </p>
              <div className="flex flex-col pl-1">
                {skill.process.map((step, i) => (
                  <WorkflowStep key={step} step={step} index={i} skillColor={skill.color} isLast={i === skill.process.length - 1} />
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-white/10">
              <p className="text-xs tracking-wide uppercase mb-3" style={{ color: skill.color }}>
                Professional Impact
              </p>
              <div className="grid grid-cols-2 gap-3">
                {skill.metrics.map((m, i) => (
                  <MetricTile key={m.label} metric={m} index={i} color={skill.color} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------- Main section ----------

const Skills = () => {
  const [openId, setOpenId] = useState(null);
  const [origin, setOrigin] = useState(null);
  const reducedMotion = usePrefersReducedMotion();
  const bp = useBreakpoint();
  const layout = LAYOUTS[bp];

  const openSkill = skills.find((s) => s.id === openId);

  const handleOpen = useCallback((id, rect) => {
    if (rect) setOrigin({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    setOpenId(id);
  }, []);

  const handleClose = useCallback(() => setOpenId(null), []);

  // Build per-planet radius/angle, differently for mobile (circular, tiered,
  // evenly spaced within each tier) vs desktop/tablet (elliptical, per-skill).
  const planetLayout = skills.map((s, i) => {
    if (bp === "mobile") {
      const tierMembers = skills.filter((sk) => sk.tier === s.tier);
      const indexInTier = tierMembers.findIndex((sk) => sk.id === s.id);
      const angleStep = 360 / tierMembers.length;
      const r = layout.tierRadius[s.tier];
      return { ...s, radiusX: r, radiusY: r, startAngle: angleStep * indexInTier + s.tier * 20 };
    }
    const o = layout.orbits[s.id];
    return { ...s, radiusX: o.rx, radiusY: o.ry, startAngle: (360 / skills.length) * i };
  });

  const uniqueRings =
    bp === "mobile"
      ? Object.entries(layout.tierRadius).map(([tier, r]) => ({ id: tier, rx: r, ry: r, color: "#a855f7" }))
      : skills.map((s) => ({ id: s.id, rx: layout.orbits[s.id].rx, ry: layout.orbits[s.id].ry, color: s.color }));

  const stageHeight = layout.stageHeight;
  const containerHeight = bp === "mobile" ? 460 : bp === "tablet" ? 520 : 700;

  return (
    <section id="skills" className="relative py-20 md:py-24 px-4 md:px-16 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full opacity-10 blur-[130px]"
        style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }}
        animate={{ x: [0, 25, 0], y: [0, 15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <SectionHeading />

      <div
        className="relative max-w-5xl mx-auto flex items-center justify-center overflow-visible"
        style={{ height: containerHeight }}
      >
        <div
          className="relative"
          style={{ width: layout.stageWidth, height: stageHeight, maxWidth: "100%" }}
        >
          <DepthDust count={bp === "mobile" ? 8 : 14} />

          {uniqueRings.map((ring) => (
            <OrbitRing key={ring.id} rx={ring.rx} ry={ring.ry} color={ring.color} />
          ))}

          <SunCore size={layout.sunSize} />

          {planetLayout.map((s) => (
            <Planet
              key={s.id}
              skill={s}
              onOpen={handleOpen}
              reducedMotion={reducedMotion}
              planetSize={layout.planetSize}
              radiusX={s.radiusX}
              radiusY={s.radiusY}
              startAngle={s.startAngle}
              speed={s.speed}
              showLabel={layout.showLabels}
            />
          ))}
        </div>
      </div>

      {/* mobile-only: no floating labels on planets, so surface the tapped
          skill's name briefly as a centered chip beneath the orbit */}
      {bp === "mobile" && (
        <AnimatePresence mode="wait">
          {openId && (
            <motion.p
              key={openId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-center text-sm font-medium mt-2"
              style={{ color: skills.find((s) => s.id === openId)?.color }}
            >
              {skills.find((s) => s.id === openId)?.name}
            </motion.p>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {openSkill && <DetailConsole skill={openSkill} origin={origin} onClose={handleClose} />}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { FaChevronDown, FaCheckCircle, FaUserTie } from "react-icons/fa";

const projects = [
  {
    number: "01",
    title: "SAK Magician",
    category: "Digital Services Agency",
    tagline: "Appointment Setting • Content Writing • Blog Writing • Business Support",
    year: "2019 – 2020",
    overview:
      "SAK Magician was my first venture into professional digital services, delivering appointment setting, business support, content creation, and client-focused solutions. It laid the foundation for my understanding of digital communication, client management, and online business growth.",
    features: ["Appointment Setting", "Professional Content Writing", "Blog Development", "Client Communication"],
    role: "Founder • Service Provider • Content Strategist",
  },
  {
    number: "02",
    title: "Pashton Posh",
    category: "Premium Peshawari Chappal Brand",
    tagline: "Facebook Commerce",
    year: "2021 – 2022",
    overview:
      "Pashton Posh was built to connect Pakistan's traditional craftsmanship with a broader digital audience. Through Facebook commerce, the brand introduced authentic Peshawari Chappals to customers by combining cultural heritage with modern online marketing.",
    features: ["Facebook Selling", "Brand Identity", "Digital Marketing", "Customer Engagement"],
    role: "Founder • Brand Manager • Digital Marketer",
  },
  {
    number: "03",
    title: "CarsReloaded.com",
    category: "UK Automotive Marketplace",
    tagline: "United Kingdom",
    year: "2023",
    overview:
      "Developed a modern web platform for the UK automotive market, enabling customers to discover and purchase vehicle spare parts and accessories through a streamlined digital experience focused on reliability, accessibility, and performance.",
    features: ["Automotive Marketplace", "Spare Parts Catalog", "Product Management", "User-Friendly Shopping Experience"],
    role: "Website Developer",
  },
  {
    number: "04",
    title: "ERP Software Development",
    category: "Enterprise Business Solution",
    tagline: "Workflow & Financial Management",
    year: "2025",
    overview:
      "Contributed to the development and management of an Enterprise Resource Planning (ERP) solution that streamlined business operations by integrating workflows, financial management, inventory processes, and organizational reporting into a unified digital ecosystem.",
    features: ["ERP Development", "Business Process Automation", "Workflow Management", "Reporting & Operations"],
    role: "Software Developer • Business Process Analyst",
  },
  {
    number: "05",
    title: "SAK Council",
    category: "Personal Digital Portfolio",
    tagline: "Interactive Portfolio • Motion Design",
    year: "2026",
    overview:
      "SAK Council is more than a portfolio — it's a digital archive of my professional journey, achievements, leadership experiences, and technical growth. Every section has been intentionally crafted to reflect innovation, storytelling, and the vision of its creator, Subhan Anjum Khan.",
    features: ["Interactive Portfolio", "Premium UI/UX", "Motion Design", "Responsive Development", "Performance Optimization"],
    role: "Designer • Developer • Creative Director",
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

// ---------- Section heading ----------
// Matches the "Who is SAK?" heading treatment: same size, weight, and
// solid-color accent (no gradient, no Orbitron, no glow). The former
// "Building Ideas Into Reality" block is folded into a single bold,
// prominent subtitle directly under the heading.

const GalleryHeading = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    <h2 className="text-4xl md:text-6xl font-extrabold text-center text-white mb-4">
      Projects <span className="text-purple-500">Gallery</span>
    </h2>
    <p className="text-gray-300 font-semibold max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
      From digital services and e-commerce to enterprise software and modern web experiences,
      every project reflects a commitment to solving real problems with thoughtful design,
      scalable technology, and continuous innovation.
    </p>
  </motion.div>
);

const AmbientGlow = () => (
  <motion.div
    aria-hidden="true"
    className="pointer-events-none absolute rounded-full"
    style={{
      width: 500,
      height: 500,
      top: "15%",
      left: "60%",
      background: "radial-gradient(circle, rgba(168,85,247,0.16), transparent 70%)",
      filter: "blur(90px)",
      willChange: "transform",
    }}
    animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
  />
);

// ---------- Project card ----------
// A distinct visual language from Achievements/Leadership: each card
// carries a large "ghost" case-study number as a background watermark
// (an agency-portfolio convention that signals "real shipped work," not
// a badge/medal), and a one-shot diagonal shine sweep fires across the
// card on hover-enter rather than a static cursor glow — closer to a
// premium case-study reveal than a trophy card.

const ProjectCard = ({ project, index, isActive, onToggle, pointerFine, reducedMotion, spanClass }) => {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 20, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 20, mass: 0.5 });
  const [hovered, setHovered] = useState(false);
  const [shine, setShine] = useState(0);
  const wasHovered = useRef(false);

  useEffect(() => {
    if (hovered && !wasHovered.current) {
      setShine((s) => s + 1);
    }
    wasHovered.current = hovered;
  }, [hovered]);

  const handleMouseMove = (e) => {
    if (!pointerFine || reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    rotateY.set((relX - 0.5) * 6);
    rotateX.set(-(relY - 0.5) * 6);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  const glowing = hovered || isActive;

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
      transition={{ type: "spring", stiffness: 55, damping: 18, mass: 1, delay: index * 0.07 }}
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
      className={`relative rounded-[28px] border overflow-hidden backdrop-blur-md ${isActive ? spanClass : ""}`}
    >
      {/* ghost case-study number watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-3 -right-2 select-none font-black text-transparent"
        style={{
          fontSize: "6.5rem",
          lineHeight: 1,
          WebkitTextStroke: glowing ? "1.5px rgba(192,132,252,0.35)" : "1.5px rgba(255,255,255,0.06)",
          transition: "-webkit-text-stroke 0.4s ease",
        }}
      >
        {project.number}
      </span>

      {/* one-shot diagonal shine sweep, fired on hover-enter */}
      <AnimatePresence>
        {shine > 0 && (
          <motion.div
            key={shine}
            aria-hidden="true"
            initial={{ x: "-120%" }}
            animate={{ x: "220%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
            }}
          />
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded={isActive}
        className="relative w-full text-left p-6 md:p-7 cursor-pointer"
      >
        <div className="relative flex items-start justify-between gap-3 mb-3" style={{ transform: "translateZ(20px)" }}>
          <span className="text-purple-500/80 text-xs" style={{ fontFamily: "Orbitron, sans-serif" }}>
            {project.number}
          </span>
          <span
            className="px-3 py-1 rounded-full text-[10px] tracking-wider text-purple-300 border border-purple-500/30 bg-purple-500/10 whitespace-nowrap"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {project.year}
          </span>
        </div>

        <h3 className="relative text-white font-semibold text-xl mb-1" style={{ transform: "translateZ(16px)" }}>
          {project.title}
        </h3>
        <p className="relative text-purple-400 text-sm font-medium mb-1">{project.category}</p>
        <p className="relative text-gray-500 text-xs mb-4">{project.tagline}</p>

        <div className="relative flex items-center gap-2 text-purple-400 text-sm">
          <span>{isActive ? "Close" : "Explore Project"}</span>
          <motion.span
            animate={{ x: hovered && !isActive ? 4 : 0, rotate: isActive ? 90 : 0 }}
            transition={{ duration: 0.25 }}
          >
            {isActive ? <FaChevronDown size={12} /> : "→"}
          </motion.span>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: "hidden" }}
      >
        <div className="relative px-6 md:px-7 pb-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-6" />

          <div className="flex items-center gap-2 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/10 text-purple-300 text-sm shrink-0">
              <FaUserTie />
            </span>
            <p className="text-gray-300 text-sm font-medium">{project.role}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p
                className="text-purple-300 text-xs tracking-wide mb-3"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                PROJECT OVERVIEW
              </p>
              <p className="text-gray-400 text-sm" style={{ lineHeight: 1.8 }}>
                {project.overview}
              </p>
            </div>

            <div>
              <p
                className="text-purple-300 text-xs tracking-wide mb-3"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                KEY FEATURES
              </p>
              <ul className="space-y-2.5">
                {project.features.map((f, idx) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -8 }}
                    animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                    transition={{ delay: 0.1 + idx * 0.06, duration: 0.3 }}
                    className="flex items-start gap-2.5 text-gray-400 text-sm"
                  >
                    <FaCheckCircle className="text-purple-400 mt-0.5 shrink-0" size={13} />
                    <span>{f}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const pointerFine = usePointerFine();
  const reducedMotion = usePrefersReducedMotion();

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  // First row keeps the full 3-column grid. The second row is a separate,
  // narrower grid (2/3 the width, same gap) centered with mx-auto - so
  // its 2 cards sit symmetrically under the middle of the row above
  // instead of left-aligned under columns 1-2 with an empty gap under 3.
  const topRow = projects.slice(0, 3);
  const bottomRow = projects.slice(3);

  return (
    <section id="projects" className="relative py-24 px-6 md:px-16 overflow-hidden">
      <AmbientGlow />

      <GalleryHeading />

      <div className="relative max-w-6xl mx-auto" style={{ perspective: 1200 }}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRow.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              isActive={activeIndex === i}
              onToggle={handleToggle}
              pointerFine={pointerFine}
              reducedMotion={reducedMotion}
              spanClass="md:col-span-2 lg:col-span-3"
            />
          ))}
        </div>

        {bottomRow.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mt-6 lg:w-2/3 lg:mx-auto">
            {bottomRow.map((project, i) => {
              const realIndex = i + topRow.length;
              return (
                <ProjectCard
                  key={realIndex}
                  project={project}
                  index={realIndex}
                  isActive={activeIndex === realIndex}
                  onToggle={handleToggle}
                  pointerFine={pointerFine}
                  reducedMotion={reducedMotion}
                  spanClass="md:col-span-2"
                />
              );
            })}
          </div>
        )}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-gray-400 text-sm md:text-base mt-20 max-w-2xl mx-auto italic"
        style={{ letterSpacing: "0.02em", textShadow: "0 0 12px rgba(168,85,247,0.25)" }}
      >
        "Every project begins with an idea, evolves through curiosity, and succeeds through
        execution. Innovation is not about building more, it is about building with purpose."
      </motion.p>
    </section>
  );
};

export default Projects;

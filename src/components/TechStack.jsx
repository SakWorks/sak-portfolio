import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaGithub, FaJs } from "react-icons/fa";
import { SiVite, SiTailwindcss, SiFramer } from "react-icons/si";

// ---------- Dominant heading ----------
// Matches the "Who is SAK?" font treatment (extrabold, solid purple accent,
// no gradient/Orbitron), but stands apart from the plainer fade-in section
// headings elsewhere via two things: a letter-by-letter reveal on scroll-in,
// and a subtle cursor-reactive 3D tilt + spotlight while hovering it.

const DominantHeading = ({ prefix, accent, subtitle }) => {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const fullText = `${prefix} ${accent}`;
  const letters = fullText.split("");

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 6);
    rotateX.set(-(py - 0.5) * 6);
    setGlowPos({ x: px * 100, y: py * 100 });
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: -16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative text-center mb-4"
      style={{ perspective: 700 }}
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(320px circle at ${glowPos.x}% ${glowPos.y}%, rgba(168,85,247,0.16), transparent 70%)`,
        }}
      />

      <motion.h2
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="inline-block text-4xl md:text-6xl font-extrabold text-white"
      >
        {letters.map((char, i) => {
          const isAccent = i >= prefix.length + 1;
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.025, ease: [0.22, 1, 0.36, 1] }}
              className={`inline-block ${isAccent ? "text-purple-500" : "text-white"}`}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </motion.h2>

      <p className="text-gray-400 mt-3 max-w-2xl mx-auto">{subtitle}</p>
    </motion.div>
  );
};

const techs = [
  { icon: <FaReact />, name: "React", color: "#61DAFB" },
  { icon: <SiVite />, name: "Vite", color: "#a78bfa" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS", color: "#38BDF8" },
  { icon: <SiFramer />, name: "Framer Motion", color: "#7c8bff" },
  { icon: <FaJs />, name: "JavaScript", color: "#F7DF1E" },
  { icon: <FaHtml5 />, name: "HTML5", color: "#E34F26" },
  { icon: <FaCss3Alt />, name: "CSS3", color: "#1572B6" },
  { icon: <FaGithub />, name: "GitHub", color: "#a855f7" },
];

const TechCard = ({ tech, index }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  const shineX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="w-[calc(50%-10px)] sm:w-[calc(33.33%-14px)] md:w-[calc(25%-15px)]"
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{
          y: hovered ? -10 : 0,
          scale: hovered ? 1.03 : 1,
          borderColor: hovered ? `${tech.color}80` : "rgba(168,85,247,0.15)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative flex flex-col items-center justify-center gap-4 border rounded-2xl py-8 px-4 cursor-pointer overflow-hidden bg-transparent"
      >
        {/* ambient glow underneath */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: hovered ? [0.5, 0.8, 0.5] : 0,
            background: `radial-gradient(circle at center, ${tech.color}25 0%, transparent 70%)`,
          }}
          transition={{ duration: 2, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
        />

        {/* shine sweep */}
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
              left: shineX,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {/* icon */}
        <motion.div
          animate={{
            scale: hovered ? 1.12 : 1,
            y: hovered ? [-2, 2, -2] : 0,
            filter: hovered
              ? `drop-shadow(0 0 16px ${tech.color}) drop-shadow(0 0 6px ${tech.color})`
              : "drop-shadow(0 0 0px transparent)",
            color: hovered ? tech.color : "rgba(255,255,255,0.9)",
          }}
          transition={{
            scale: { type: "spring", stiffness: 300, damping: 20 },
            y: { duration: 2, repeat: hovered ? Infinity : 0, ease: "easeInOut" },
            filter: { duration: 0.3 },
            color: { duration: 0.3 },
          }}
          className="relative z-10 text-5xl md:text-6xl"
        >
          {tech.icon}
        </motion.div>

        <motion.p
          animate={{
            color: hovered ? "#ffffff" : "rgba(156,163,175,1)",
            letterSpacing: hovered ? "0.03em" : "0em",
            fontWeight: hovered ? 600 : 400,
          }}
          transition={{ duration: 0.3 }}
          className="relative z-10 text-xs md:text-sm"
        >
          {tech.name}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const TechStack = () => {
  return (
    <section id="tech-stack" className="relative py-24 px-6 md:px-16">
      <DominantHeading
        prefix="My"
        accent="Tech Stack"
        subtitle="A production-grade stack for building fast, accessible interfaces from component architecture and state to motion, styling, and deployment."
      />

      <div className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto mt-16">
        {techs.map((tech, i) => (
          <TechCard key={i} tech={tech} index={i} />
        ))}
      </div>
    </section>
  );
};

export default TechStack;
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaLinkedin, FaLayerGroup } from "react-icons/fa";
import OrbitScene from "./OrbitScene";

const words = [
  "a Good Listener",
  "a Software Developer",
  "a Web Developer",
  "an Amazon VA",
  "a Software Accountant",
  "a Debater",
];

const TypewriterText = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 70);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1300);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 35);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex]);

  return (
    <span
      className="text-purple-400 font-semibold"
      style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif", letterSpacing: "0.01em" }}
    >
      {text}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        _
      </motion.span>
    </span>
  );
};
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fadeOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const fadeY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16 pt-28 pb-16 overflow-hidden text-center"
    >
      <motion.div
        style={{ opacity: fadeOpacity, y: fadeY }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto mb-10"
      >
        <p className="text-purple-400 font-medium mb-3">Hi, I am</p>

        <h1 className="font-extrabold leading-tight mb-4 text-[clamp(1.8rem,6vw,3.75rem)] whitespace-nowrap">
          <span className="text-white">Subhan </span>
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Anjum
          </span>
          <span className="text-white"> Khan</span>
        </h1>

        <h2 className="text-xl md:text-2xl text-gray-300 mb-6 min-h-[2rem]">
          I am <TypewriterText />
        </h2>

        <p className="text-gray-400 leading-relaxed max-w-xl mx-auto">
          I build fast, responsive, and visually engaging web experiences
          while bringing a rare combination of technical skill and strong
          communication. I am a dedicated team player who thrives on solving
          real problems, and I am currently open to new opportunities.
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: fadeOpacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-16"
      >
        <motion.a
          href="https://www.linkedin.com/in/subhan-anjum-khan-9b9501295"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors duration-300"
        >
          <FaLinkedin /> Connect on LinkedIn
        </motion.a>
        <motion.a
          href="#tech-stack"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-semibold transition-colors duration-300"
        >
          <FaLayerGroup /> SAK Stack
        </motion.a>
      </motion.div>

      {/* Photo with big animated SAK watermark, like a name-behind-portrait poster */}
      <motion.div
  style={{ opacity: fadeOpacity, y: fadeY }}
  className="relative flex justify-center items-center w-full max-w-2xl mt-10 md:mt-14"
>
        <motion.span
  className="absolute select-none pointer-events-none font-black whitespace-nowrap leading-none text-[5rem] sm:text-[7rem] md:text-[9.5rem] lg:text-[11rem]"
  style={{
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "0.03em",
    WebkitTextStroke: "1px rgba(216,180,254,0.25)",
    color: "rgba(168,85,247,0.14)",
    textShadow: "0 0 40px rgba(168,85,247,0.35)",
  }}
  animate={{
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.05, 1],
  }}
  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
>
  SAK
</motion.span>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <OrbitScene size="small" />
        </div>

        <motion.div
  initial={{ opacity: 0, scale: 0.85 }}
  animate={{
    opacity: 1,
    scale: 1,
    y: [0, -10, 0],
  }}
  transition={{
    opacity: { duration: 0.9, delay: 0.3 },
    scale: { duration: 0.9, delay: 0.3 },
    y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
  }}
  className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden border border-purple-500/40 shadow-[0_0_45px_rgba(168,85,247,0.35)]"
>
  <img
    src="/profile.png"
    alt="Subhan Anjum Khan"
    className="w-full h-full object-cover object-top scale-105"
  />
</motion.div>
      </motion.div>

      <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 1 }}
  whileHover={{
    scale: 1.08,
    backgroundColor: "rgba(168,85,247,0.25)",
    borderColor: "rgba(216,180,254,1)",
    boxShadow: "0 0 30px rgba(168,85,247,0.8)",
    color: "#f3e8ff",
  }}
  transition={{
    default: { duration: 0.6, delay: 1 },
    scale: { duration: 0.4 },
    backgroundColor: { duration: 0.4 },
    boxShadow: { duration: 0.4 },
  }}
  className="mt-5 px-4 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/30 text-purple-300 text-xs tracking-wide cursor-pointer"
>
  Admin — SAK Council
</motion.div>
    </section>
  );
};

export default Hero;
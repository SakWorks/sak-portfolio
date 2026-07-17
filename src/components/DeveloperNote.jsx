import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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

const DeveloperNote = () => {
  const ref = useRef(null);
  const pointerFine = usePointerFine();
  const [hovered, setHovered] = useState(false);
  const [lit, setLit] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 20 });
  const shineX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!ref.current || !pointerFine) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const active = hovered || lit;

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="developer-note" className="relative py-16 px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
        style={{ perspective: 900 }}
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleLeave}
          onClick={() => setLit((prev) => !prev)}
          style={{
            rotateX: pointerFine ? rotateX : 0,
            rotateY: pointerFine ? rotateY : 0,
            transformStyle: "preserve-3d",
            contain: "layout paint style",
            willChange: active ? "transform" : "auto",
          }}
          animate={{
            scale: active ? 1.015 : 1,
            borderColor: active ? "rgba(216,180,254,0.9)" : "rgba(168,85,247,0.2)",
            backgroundColor: active ? "rgba(168,85,247,0.08)" : "rgba(255,255,255,0.05)",
          }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="relative border rounded-2xl p-6 md:p-10 text-center cursor-pointer select-none overflow-hidden"
        >
          {/* ambient breathing glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: active ? [0.5, 0.9, 0.5] : 0,
              background: "radial-gradient(circle at center, rgba(168,85,247,0.3) 0%, transparent 70%)",
            }}
            transition={{ duration: 2.4, repeat: active ? Infinity : 0, ease: "easeInOut" }}
          />

          {/* shine sweep on hover - desktop only, since there's no cursor to track on touch */}
          {hovered && pointerFine && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                left: shineX,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          {/* inner glow ring when lit */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: active
                ? "0 0 70px rgba(168,85,247,0.7), inset 0 0 35px rgba(168,85,247,0.15)"
                : "0 0 0px rgba(168,85,247,0)",
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          <div className="relative z-10">
            <motion.p
              {...fadeUp(0)}
              animate={{
                color: active ? "#e9d5ff" : "#c084fc",
                letterSpacing: active ? "0.18em" : "0.05em",
              }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase mb-4"
            >
              A Note From The Developer
            </motion.p>

            <motion.p
              {...fadeUp(0.08)}
              animate={{
                opacity: active ? 1 : 0.85,
                textShadow: active
                  ? "0 0 22px rgba(216,180,254,0.7)"
                  : "0 0 0px rgba(216,180,254,0)",
              }}
              transition={{ duration: 0.5 }}
              className="text-purple-300 italic text-sm md:text-base mb-5"
            >
              "Speak, so that I may see you." — Hazrat Ali (RA)
            </motion.p>

            <motion.p
              {...fadeUp(0.16)}
              animate={{
                color: active ? "#f3e8ff" : "#d1d5db",
                textShadow: active
                  ? "0 0 14px rgba(216,180,254,0.4)"
                  : "0 0 0px rgba(216,180,254,0)",
                letterSpacing: active ? "0.01em" : "0em",
              }}
              transition={{ duration: 0.5 }}
              className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
            >
              "There was a time when this was only a dream, a quiet belief that discipline, honest communication, and curiosity could one day become something real. Today, that dream has become a path. As a Debater, Amazon Virtual Assistant, Web Developer, and Software Engineering student, I have learned that lasting success is built one deliberate effort at a time, not inherited overnight. I still believe communication, innovation, and integrity outlast any single achievement. My journey across e-commerce, web development, and business growth has taught me that value comes not from chasing outcomes, but from showing up with purpose turning ideas into results that quietly outlive the moment they were made."
            </motion.p>

            <motion.p
              {...fadeUp(0.24)}
              animate={{ opacity: active ? 1 : 0.6 }}
              transition={{ duration: 0.5 }}
              className="text-purple-400 text-xs mt-6 tracking-widest"
            >
              Published by SAK Council
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DeveloperNote;

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DeveloperNote = () => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [lit, setLit] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 20 });
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

  const active = hovered || lit;

  return (
    <section className="relative py-16 px-6 md:px-16">
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
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
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

          {/* shine sweep on hover */}
          {hovered && (
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
              I believe that communication, innovation, and integrity are the
              foundations of lasting success. As a Debater, Amazon Virtual
              Assistant, Web Developer, and Software Engineering student, I
              combine persuasive communication with technical expertise to
              deliver impactful digital solutions. My experience spans
              e-commerce, web development, and business growth, supported by
              a passion for leadership, continuous learning, and
              problem-solving. My goal is to create value, build meaningful
              partnerships, and turn ideas into results that make a lasting
              impact.
            </motion.p>

            <motion.p
              animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
              transition={{ duration: 0.5 }}
              className="text-purple-400 text-xs mt-6 tracking-widest"
            >
              — SAK Council —
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DeveloperNote;
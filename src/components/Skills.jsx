import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAmazon, FaCalculator, FaMicrophone, FaUsers, FaCode } from "react-icons/fa";

const skills = [
  {
    icon: <FaCode />,
    name: "Web Development",
    tag: "Advanced",
    desc: "React, Tailwind, responsive builds, animation",
    level: 85,
    color: "#a855f7",
  },
  {
    icon: <FaAmazon />,
    name: "Amazon VA",
    tag: "Advanced",
    desc: "E-commerce support, listings, account operations",
    level: 90,
    color: "#f59e0b",
  },
  {
    icon: <FaCalculator />,
    name: "Software Accounting",
    tag: "Professional",
    desc: "Invoices, records, reporting, business support",
    level: 75,
    color: "#10b981",
  },
  {
    icon: <FaMicrophone />,
    name: "Debating (Urdu/English)",
    tag: "Expert",
    desc: "National-level competitive debate & declamation",
    level: 95,
    color: "#ec4899",
  },
  {
    icon: <FaUsers />,
    name: "Leadership",
    tag: "Advanced",
    desc: "Team leadership, societies, event responsibility",
    level: 88,
    color: "#6366f1",
  },
];

const RADIUS = 180;
const DURATION = 30;
const ANGLE_STEP = 360 / skills.length;

const Skills = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="skills" className="relative py-24 px-6 md:px-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          My <span className="text-purple-500">Skills</span>
        </h2>
        <p className="text-gray-400 mt-3">An orbiting map of the domains I operate in</p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="relative flex items-center justify-center h-[460px] md:h-[500px]">
          <div
            className="absolute rounded-full border border-purple-500/15"
            style={{ width: RADIUS * 2, height: RADIUS * 2 }}
          />

          <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
  <motion.div
    aria-hidden="true"
    animate={{ opacity: [0.35, 0.85, 0.35] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="absolute inset-0 rounded-full pointer-events-none"
    style={{ boxShadow: "0 0 45px 10px rgba(168,85,247,0.55)", willChange: "opacity" }}
  />
  <div className="relative w-full h-full rounded-full bg-black border border-purple-500/50 flex flex-col items-center justify-center text-center">
    <span className="text-white font-black text-xl md:text-2xl" style={{ fontFamily: "Orbitron, sans-serif" }}>
      SAK
    </span>
    <span className="text-[9px] md:text-[10px] text-purple-400 tracking-widest mt-1">
      SKILL SYSTEM
    </span>
  </div>
</div>

          <motion.div
            className="absolute w-full h-full"
            style={{ top: 0, left: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: DURATION, repeat: Infinity, ease: "linear" }}
          >
            {skills.map((skill, i) => {
              const angle = ANGLE_STEP * i;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translateY(-${RADIUS}px)`,
                  }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: DURATION, repeat: Infinity, ease: "linear" }}
                    style={{ transform: `rotate(-${angle}deg)` }}
                  >
                    <div className="relative w-12 h-12 md:w-14 md:h-14">
  {active === i && (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{ boxShadow: `0 0 25px ${skill.color}`, willChange: "opacity" }}
    />
  )}
  <motion.button
    type="button"
    onClick={() => setActive(i)}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    animate={{ scale: active === i ? 1.3 : 1 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    style={{
      backgroundColor: active === i ? skill.color : "rgba(255,255,255,0.06)",
      borderColor: skill.color,
      willChange: "transform",
    }}
    className="relative w-full h-full rounded-full border-2 flex items-center justify-center text-white text-xl"
  >
    {skill.icon}
  </motion.button>
</div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#0a0a14] border rounded-2xl p-6 md:p-8"
            style={{ borderColor: `${skills[active].color}55` }}
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl"
                style={{ backgroundColor: skills[active].color }}
              >
                {skills[active].icon}
              </motion.div>
              <div>
                <h3 className="text-white font-bold text-xl">{skills[active].name}</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">
                  {skills[active].tag}
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-5">{skills[active].desc}</p>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skills[active].level}%` }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                className="h-full rounded-full"
                style={{ backgroundColor: skills[active].color }}
              />
            </div>
            <p className="text-right text-sm text-gray-500 mt-2">{skills[active].level}%</p>

            <div className="flex gap-2 mt-6 flex-wrap">
              {skills.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className="h-2.5 rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? 24 : 10,
                    backgroundColor: active === i ? s.color : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
import { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaShoppingCart, FaCogs } from "react-icons/fa";

const projects = [
  {
    title: "Amazon VA Operations Dashboard",
    icon: <FaShoppingCart />,
    description:
      "Streamlined Amazon virtual assistant workflows including listing management, order processing, and inventory tracking.",
    tags: ["Amazon VA", "E-commerce", "Automation"],
    color: "#f59e0b",
  },
  {
    title: "Portfolio Website (SAK)",
    icon: <FaCode />,
    description:
      "A personal portfolio built with React, Vite, Tailwind CSS, and Framer Motion, featuring smooth animations and a modern dark theme.",
    tags: ["React", "Tailwind", "Framer Motion"],
    color: "#a855f7",
  },
  {
    title: "ERP Solutions Development",
    icon: <FaCogs />,
    description:
      "Designed and contributed to ERP-based business workflows, streamlining operations, accounting, and process management for growing companies.",
    tags: ["ERP", "Business Systems", "Process Automation"],
    color: "#22c55e",
  },
];

const Projects = () => {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className="relative py-24 px-6 md:px-16" style={{ perspective: 1000 }}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center text-white mb-16"
      >
        My <span className="text-purple-500">Projects</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, i) => {
          const isActive = active === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                onClick={() => setActive(isActive ? null : i)}
                whileHover={{
                  y: -10,
                  rotateX: 6,
                  rotateY: 6,
                  scale: 1.03,
                }}
                whileTap={{ scale: 0.97 }}
                animate={
                  isActive
                    ? {
                        borderColor: project.color,
                        boxShadow: `0 25px 50px -15px ${project.color}77`,
                        backgroundColor: `${project.color}14`,
                      }
                    : {
                        borderColor: "rgba(168,85,247,0.2)",
                        boxShadow: "0 0 0px rgba(0,0,0,0)",
                        backgroundColor: "rgba(255,255,255,0.05)",
                      }
                }
                transition={{ duration: 0.4 }}
                style={{ transformStyle: "preserve-3d" }}
                className="border rounded-2xl p-6 backdrop-blur-sm cursor-pointer h-full"
              >
                <motion.div
                  animate={{
                    backgroundColor: isActive ? project.color : `${project.color}22`,
                    color: isActive ? "#000" : project.color,
                    rotate: isActive ? 360 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 flex items-center justify-center rounded-full text-xl mb-4"
                >
                  {project.icon}
                </motion.div>

                <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + idx * 0.08, duration: 0.3 }}
                      className="text-xs px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: `${project.color}18`,
                        borderColor: `${project.color}55`,
                        color: project.color,
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
import { motion } from "framer-motion";
import { FaTrophy, FaCrown, FaMedal, FaUsers, FaBullhorn } from "react-icons/fa";

const achievements = [
  {
    icon: <FaTrophy />,
    title: "Best U19 Speaker",
    sub: "25th All Pakistan Debating Championship, King Edward Medical University",
  },
  {
    icon: <FaTrophy />,
    title: "Best Speaker",
    sub: "18th Forman Bilingual Declamation Contest, Forman Christian College",
  },
  {
    icon: <FaCrown />,
    title: "Open Category Finalist",
    sub: "32nd All Pakistan Debating Championship, UET Lahore",
  },
  {
    icon: <FaMedal />,
    title: "Best Speaker",
    sub: "Lahore Division Declamation Contest, Punjab Education Department",
  },
  {
    icon: <FaUsers />,
    title: "Assistant Secretary",
    sub: "IEEE, GCU Lahore",
  },
  {
    icon: <FaBullhorn />,
    title: "Associate Secretary",
    sub: "Taqs Quiz Society, GCU Lahore",
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="relative py-24 px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          Achievements & <span className="text-purple-500">Leadership</span>
        </h2>
        <p className="text-gray-400">
          A selection of my recognitions and roles across debating and student societies
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {achievements.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02, borderColor: "rgba(168,85,247,0.7)" }}
            whileTap={{ scale: 0.96 }}
            className="group bg-white/5 border border-purple-900/40 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 360, backgroundColor: "#a855f7" }}
              transition={{ duration: 0.6 }}
              className="w-14 h-14 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 text-2xl mb-5 group-hover:text-white"
            >
              {item.icon}
            </motion.div>
            <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
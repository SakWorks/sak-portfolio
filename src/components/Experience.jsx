import { motion } from "framer-motion";

const experiences = [
  {
    role: "Amazon VA & Website Developer",
    company: "Servzon / Gibazon",
    duration: "2022 – 2023",
    description: "Managed Amazon virtual assistant tasks and built/maintained websites for the company.",
    logo: "/servzon-logo.png",
 },
  {
    role: "Software VA & Software Accountant",
    company: "ECOM Technologies",
    duration: "April 2025 – Present",
    description: "Handling software-related virtual assistance and accounting operations for the company.",
    logo: "/ecom-logo.png",
 },
  {
    role: "Amazon VA",
    company: "BESTITHUB.COM INC",
    duration: "April 2025 – Present",
    description: "Managing Amazon listings, order processing, and virtual assistance operations for the company.",
    logo: "/bestithub-logo.png",
},
];

const Experience = () => {
  return (
    <section id="experience" className="relative py-24 px-6 md:px-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center text-white mb-16"
      >
        Work <span className="text-purple-500">Experience</span>
      </motion.h2>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-purple-500/20 md:-translate-x-1/2" />

        <motion.div
          className="absolute left-4 md:left-1/2 w-[2px] md:-translate-x-1/2 bg-gradient-to-b from-transparent via-purple-400 to-transparent"
          style={{ height: "120px", top: 0 }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {experiences.map((exp, index) => (
          <div
            key={index}
            className="relative flex items-start md:items-center mb-12 pl-12 md:pl-0"
          >
           <motion.div
  initial={{ boxShadow: "0 0 0px rgba(168,85,247,0)", borderColor: "rgba(168,85,247,0.3)", scale: 0.9 }}
  whileInView={{
    boxShadow: "0 0 25px rgba(168,85,247,0.9)",
    borderColor: "rgba(168,85,247,1)",
    scale: 1.1,
  }}
  viewport={{ once: false, amount: 0.6 }}
  transition={{ duration: 0.5 }}
  className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 z-10 overflow-hidden p-1.5"
>
  <img
    src={exp.logo}
    alt={exp.company}
    className="w-full h-full object-contain"
  />
</motion.div>

            <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-10 md:text-right md:ml-0" : "md:pl-10 md:ml-auto"}`}>
              <motion.div
                initial={{ opacity: 0.35, y: 30, borderColor: "rgba(168,85,247,0.1)" }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  borderColor: "rgba(168,85,247,0.6)",
                  boxShadow: "0 0 25px rgba(168,85,247,0.35)",
                }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/5 border rounded-xl p-5 backdrop-blur-sm transition-colors duration-300 cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                <p className="text-purple-400 text-sm mb-1">{exp.company}</p>
                <p className="text-gray-500 text-xs mb-3">{exp.duration}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
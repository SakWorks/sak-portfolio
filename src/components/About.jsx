import { FaGraduationCap, FaMicrophone, FaLaptopCode, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";

const stats = [
  { icon: <FaAward />, label: "Debating Champion", sub: "National Level" },
  { icon: <FaMicrophone />, label: "President & VP", sub: "Literary & Tech Societies" },
  { icon: <FaLaptopCode />, label: "4 Companies", sub: "Work Experience" },
  { icon: <FaGraduationCap />, label: "Software Engineering", sub: "FCIT, Lahore" },
];

function About() {
  return (
    <section id="about" className="relative py-5 px-7">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-center text-white mb-3">
            Who is <span className="text-purple-500">SAK</span>?
          </h2>
          <p className="text-gray-400 text-center mb-10">
            Get to know a bit more about our administrator
      
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-300 leading-relaxed mb-4">
              I'm Subhan Anjum Khan, a Software Engineering student at FCIT,
              Lahore, currently working across web development, virtual
              assistance, and software accounting for multiple companies.
              Alongside my technical work, I am an active competitive
              debater and orator, having represented my college in multiple
              All Pakistan National-level Urdu declamation and
              parliamentary debate competitions.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              I completed my Intermediate of Computer Science from GCU Lahore. I served as Vice President of the Young Speakers' Union and
              previously served as President of Bazm-e-Shahab, Government
              College Lahore (GCU) literary society, where I organized
              training camps, competitions, and events for hundreds of
              students. Currently I am working with Pioneers' Debating
              Society.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This mix of technical skill and communication experience
              shapes how I work: I don't just build websites and manage
              operations, I know how to present ideas clearly, lead teams,
              and connect with people. I am currently open to new
              opportunities where both skill sets add real value.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.03, borderColor: "rgba(168,85,247,0.7)" }}
                whileTap={{ scale: 0.93 }}
                className="bg-white/5 border border-purple-900/40 rounded-xl p-6 text-center hover:border-purple-500 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] cursor-pointer"
              >
                <div className="text-purple-400 text-3xl mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <p className="text-white font-semibold">{stat.label}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
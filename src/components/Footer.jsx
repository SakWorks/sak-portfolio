import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";

const socials = [
  { icon: <FaWhatsapp />, href: "https://wa.me/923074905197", label: "WhatsApp" },
{ icon: <FaInstagram />, href: "https://www.instagram.com/subhan_anjum_786", label: "Instagram" },
  { icon: <FaLinkedin />, href: "https://linkedin.com/", label: "LinkedIn" },
  { icon: <FaEnvelope />, href: "mailto:sakupwork111@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-purple-500/20 pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="flex gap-4">
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-purple-500/20 text-purple-400 text-lg hover:bg-purple-600 hover:text-white hover:border-purple-500 hover:-translate-y-1 transition-all duration-300">
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.2 }}
>

</motion.div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-6">
<p className="text-gray-600 text-xs">© {new Date().getFullYear()} Developed by SAK Council. All rights reserved.</p>
          <div className="flex gap-6 text-gray-500 text-xs">
            <a href="#about" className="hover:text-purple-400 transition-colors duration-300">About</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors duration-300">Projects</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
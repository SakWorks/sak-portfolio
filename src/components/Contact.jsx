import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaInstagram } from "react-icons/fa";

const contactMethods = [
  { icon: <FaEnvelope />, label: "Email", value: "sakupwork111@gmail.com", href: "mailto:sakupwork111@gmail.com", color: "#a855f7" },
  { icon: <FaPhone />, label: "Phone", value: "0307-4905197", href: "tel:03074905197", color: "#6366f1" },
  { icon: <FaWhatsapp />, label: "WhatsApp", value: "Message directly", href: "https://wa.me/923074905197", color: "#22c55e" },
  { icon: <FaInstagram />, label: "Instagram", value: "@subhan_anjum_786", href: "https://www.instagram.com/subhan_anjum_786", color: "#ec4899" },
  { icon: <FaMapMarkerAlt />, label: "Location", value: "Lahore, Pakistan", href: null, color: "#f59e0b" },
];

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 px-6 md:px-16" style={{ perspective: 1000 }}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center text-white mb-4"
      >
        Get In <span className="text-purple-500">Touch</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="text-gray-400 text-center max-w-xl mx-auto mb-14"
      >
        Have a project in mind, a role to discuss, or just want to say hi?
        Reach out through whichever channel works best for you.
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 max-w-5xl mx-auto">
        {contactMethods.map((item, i) => {
          const Wrapper = item.href ? motion.a : motion.div;
          return (
            <Wrapper
              key={i}
              href={item.href || undefined}
              target={item.href ? "_blank" : undefined}
              rel={item.href ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{
                y: -10,
                rotateX: 8,
                rotateY: 6,
                scale: 1.05,
                boxShadow: `0 20px 40px -10px ${item.color}66`,
              }}
              whileTap={{ scale: 0.94 }}
              style={{ transformStyle: "preserve-3d" }}
              className="flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-sm cursor-pointer h-full"
            >
              <motion.div
                className="w-12 h-12 flex items-center justify-center rounded-full text-lg mb-3"
                style={{ backgroundColor: `${item.color}22`, color: item.color }}
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
              </motion.div>
              <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-1">{item.label}</p>
              <p className="text-white text-xs md:text-sm break-words">{item.value}</p>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
};

export default Contact;
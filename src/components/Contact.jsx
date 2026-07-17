import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const EASE = [0.22, 1, 0.36, 1];

const contactMethods = [
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "sakupwork111@gmail.com",
    href: "mailto:sakupwork111@gmail.com",
    color: "#a855f7",
  },
  {
    icon: <FaPhone />,
    label: "Phone",
    value: "0307-4905197",
    href: "tel:03074905197",
    color: "#22d3ee",
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    value: "Message directly",
    href: "https://wa.me/923074905197",
    color: "#22c55e",
  },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    value: "@subhan_anjum_786",
    href: "https://www.instagram.com/subhan_anjum_786",
    color: "#ec4899",
  },
  {
    icon: <FaXTwitter />,
    label: "X",
    value: "SAK Council",
    href: "https://x.com/trade_sak42731",
    color: "#e5e7eb",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "Lahore, Pakistan",
    href: null,
    color: "#f59e0b",
  },
];

const ContactCard = ({ item, index, extraClassName = "" }) => {
  const [hovered, setHovered] = useState(false);
  const Wrapper = item.href ? motion.a : motion.div;

  return (
    <Wrapper
      href={item.href || undefined}
      target={item.href ? "_blank" : undefined}
      rel={item.href ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onTapStart={() => setHovered(true)}
      animate={{
        y: hovered ? -6 : 0,
        borderColor: hovered ? "rgba(139,92,246,0.45)" : "rgba(139,92,246,0.20)",
        boxShadow: hovered
          ? `0 16px 32px -12px ${item.color}4d, 0 0 0 1px rgba(139,92,246,0.12)`
          : "0 8px 20px -14px rgba(0,0,0,0.5)",
      }}
      transition={{
        y: { type: "spring", stiffness: 300, damping: 24 },
        borderColor: { duration: 0.35, ease: EASE },
        boxShadow: { duration: 0.35, ease: EASE },
      }}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
      }}
      className={`flex h-full cursor-pointer flex-col items-center rounded-3xl border p-5 text-center md:p-6 ${extraClassName}`}
    >
      <motion.div
        animate={{
          borderColor: hovered ? `${item.color}99` : "rgba(168,85,247,0.25)",
          color: hovered ? item.color : "#ffffff",
          boxShadow: hovered
            ? `0 0 18px 2px ${item.color}4d`
            : "0 0 0 0 rgba(168,85,247,0)",
        }}
        transition={{ duration: 0.35, ease: EASE }}
        className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border bg-transparent text-lg"
      >
        {item.icon}
      </motion.div>
      <p className="mb-1 text-[11px] tracking-wide text-gray-500">{item.label}</p>
      <p className="break-words text-xs text-white/90 md:text-sm">{item.value}</p>
    </Wrapper>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="relative px-6 py-16 md:px-16">
      {/* subtle atmospheric wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(139,92,246,0.08), transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center text-4xl font-extrabold text-white md:text-6xl"
        >
          Get In <span className="text-purple-500">Touch</span>
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mx-auto mt-5 mb-6 h-px w-28 origin-center bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          style={{ boxShadow: "0 0 12px rgba(168,85,247,0.6)" }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
          className="mx-auto mb-10 max-w-xl text-center leading-relaxed text-gray-400"
        >
          Have a project in mind, a role to discuss, or just want to say hi?
          Reach out through whichever channel works best for you.
        </motion.p>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-6">
          {contactMethods.map((item, i) => {
            const isLoneLast =
              i === contactMethods.length - 1 && contactMethods.length % 2 !== 0;
            return (
              <ContactCard
                key={item.label}
                item={item}
                index={i}
                extraClassName={isLoneLast ? "col-span-2 mx-auto w-1/2 md:col-span-1 md:w-full" : ""}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";
import badgeIcon from "../assets/sak-badge.png";

const socials = [
  {
    icon: <FaWhatsapp />,
    href: "https://wa.me/923074905197",
    color: "#25D366",
    label: "WhatsApp",
  },
  {
    icon: <FaInstagram />,
    href: "https://instagram.com/subhan_anjum_786",
    color: "#E1306C",
    label: "Instagram",
  },
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/subhan-anjum-khan-9b9501295",
    color: "#0A66C2",
    label: "LinkedIn",
  },
  {
    icon: <FaEnvelope />,
    href: "mailto:sakupwork111@gmail.com",
    color: "#a855f7",
    label: "Email",
  },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050208]">
      {/* Ambient glow - reduced ~55% and pulled in closer to the logo,
          so it reads as a subtle accent rather than empty visual weight */}
      <div
        className="pointer-events-none absolute top-2 left-1/2 h-20 w-40 -translate-x-1/2 opacity-10 blur-[60px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.8), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-6 md:py-8">
        {/* Logo (left) + social icons + arrow, all in one line */}
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <motion.img
              src={badgeIcon}
              alt="SAK Council Logo"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="h-9 w-9 rounded-full object-cover"
            />
            <h2
              className="text-xl font-semibold tracking-[0.2em] text-white"
              style={{
                fontFamily: "Orbitron, sans-serif",
              }}
            >
              SAK
            </h2>
          </div>

          <div className="flex items-center justify-center gap-3">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-white backdrop-blur-md transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 14px ${social.color}`;
                  e.currentTarget.style.borderColor = social.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.1)";
                }}
              >
                {social.icon}
              </motion.a>
            ))}

            <motion.button
              onClick={scrollToTop}
              aria-label="Back to top"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center"
            >
              <motion.span
                variants={{
                  hover: {
                    y: -2,
                    borderColor: "#a855f7",
                    backgroundColor: "rgba(168,85,247,0.12)",
                    boxShadow: "0 0 12px rgba(168,85,247,0.5)",
                  },
                }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors duration-300 group-hover:text-purple-400"
              >
                <motion.span
                  variants={{ hover: { rotate: 360 } }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex items-center justify-center"
                >
                  <FaArrowUp size={11} />
                </motion.span>
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* Copyright, on its own line beneath */}
        <p className="mt-4 text-center text-xs text-gray-500 md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-purple-400">SAK Council</span>.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

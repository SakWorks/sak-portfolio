import { motion } from "framer-motion";

const rings = [
  { rx: 90, ry: 28, tilt: -18, duration: 14, direction: 1, opacity: 0.35, particleColor: "#e9d5ff" },
  { rx: 130, ry: 40, tilt: 12, duration: 22, direction: -1, opacity: 0.28, particleColor: "#c084fc" },
  { rx: 170, ry: 52, tilt: -8, duration: 32, direction: 1, opacity: 0.2, particleColor: "#a855f7" },
];

const SaturnOrbit = ({ mouseX = 0, mouseY = 0 }) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ perspective: 700 }}
      animate={{
        rotateY: mouseX * 3,
        rotateX: -mouseY * 3,
      }}
      transition={{ type: "spring", stiffness: 60, damping: 15, mass: 0.6 }}
    >
      {/* center glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 140,
          height: 140,
          background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(168,85,247,0) 70%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {rings.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: ring.rx * 2,
            height: ring.ry * 2,
            transform: `rotate(${ring.tilt}deg)`,
            transformStyle: "preserve-3d",
          }}
          animate={{ opacity: [ring.opacity * 0.6, ring.opacity, ring.opacity * 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        >
         <svg
  width={ring.rx * 2}
  height={ring.ry * 2}
  viewBox={`0 0 ${ring.rx * 2} ${ring.ry * 2}`}
  style={{ overflow: "visible" }}
>
  <defs>
    <filter id={`glow-${i}`} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  {/* glow layer */}
  <ellipse
    cx={ring.rx}
    cy={ring.ry}
    rx={ring.rx}
    ry={ring.ry}
    fill="none"
    stroke="#B388FF"
    strokeWidth="2.5"
    opacity="0.5"
    filter={`url(#glow-${i})`}
  />
  {/* crisp line on top */}
  <ellipse
    cx={ring.rx}
    cy={ring.ry}
    rx={ring.rx}
    ry={ring.ry}
    fill="none"
    stroke="#E9D5FF"
    strokeWidth="0.75"
  />
</svg>
          {/* orbiting particle */}
          <motion.div
  key={i}
  className="absolute"
  style={{
    width: ring.rx * 2,
    height: ring.ry * 2,
    transform: `rotate(${ring.tilt}deg)`,
    transformStyle: "preserve-3d",
    filter: "drop-shadow(0 0 6px rgba(168,85,247,0.6))",
  }}
  animate={{ opacity: [ring.opacity * 0.5, ring.opacity * 1.4, ring.opacity * 0.5] }}
  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
>
            <div
              style={{
                position: "absolute",
                width: "1px",
                height: `${ring.ry}px`,
                left: "50%",
                bottom: "50%",
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SaturnOrbit;
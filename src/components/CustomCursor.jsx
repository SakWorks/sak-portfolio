import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let particleId = 0;

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let lastEmit = 0;
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      const now = Date.now();
      if (now - lastEmit > 60) {
        lastEmit = now;
        const id = particleId++;
        setParticles((prev) => [
          ...prev.slice(-10),
          { id, x: e.clientX, y: e.clientY },
        ]);
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== id));
        }, 700);
      }

      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "A" ||
          target.tagName === "BUTTON"
      );
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[9996]"
          style={{
            left: p.x,
            top: p.y,
            width: 10,
            height: 10,
            background:
              "radial-gradient(circle, rgba(196,150,255,0.55) 0%, rgba(196,150,255,0) 70%)",
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0.6, scale: 0.6 }}
          animate={{ opacity: 0, scale: 2.4, y: 12 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[9997]"
        style={{
          width: 60,
          height: 60,
          background:
            "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(168,85,247,0) 70%)",
        }}
        animate={{ x: pos.x - 30, y: pos.y - 30, scale: isPointer ? 1.5 : 1 }}
transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.4 }}
      />

      <motion.div
        className="hidden md:block fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] border-purple-400/60"
        style={{ width: 42, height: 42 }}
        animate={{
          x: pos.x - 21,
          y: pos.y - 21,
          scale: isPointer ? 1.7 : clicked ? 0.8 : 1,
          opacity: isPointer ? 0.9 : 0.45,
        }}
transition={{ type: "spring", stiffness: 160, damping: 24, mass: 0.35 }}
      />

      <motion.div
        className="hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[9999] bg-purple-400"
        style={{ width: 14, height: 14 }}
        animate={{
          x: pos.x - 7,
          y: pos.y - 7,
          scale: clicked ? 0.6 : isPointer ? 1.3 : 1,
        }}
transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.4 }}      />
    </>
  );
};

export default CustomCursor;    
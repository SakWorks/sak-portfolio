import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SaturnOrbit from "./SaturnOrbit";

const DURATION = 3000;

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    startTime.current = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
      }
    }, 100);

    // hard safety fallback: force-reveal the page no matter what
    const fallback = setTimeout(() => {
      setLoading(false);
    }, DURATION + 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && !complete) {
      setComplete(true);
      const exitTimer = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, complete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{ background: "#050816" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, rgba(88,28,135,0.18) 0%, rgba(5,8,22,0) 55%)",
            }}
          />

          <motion.div
            className="absolute rounded-full"
            style={{
              width: 520,
              height: 520,
              background: "radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(168,85,247,0) 70%)",
            }}
            animate={{
              opacity: complete ? [0.7, 0] : [0.4, 0.85, 0.4],
              scale: complete ? [1, 2.2] : [0.92, 1.08, 0.92],
            }}
            transition={{
              duration: complete ? 0.8 : 2.8,
              repeat: complete ? 0 : Infinity,
              ease: complete ? "easeOut" : "easeInOut",
            }}
          />

          <div className="relative w-[460px] h-[460px] max-w-[80vw] max-h-[80vw] flex items-center justify-center">
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: complete ? 1 : [0.5, 1, 0.5],
                scale: complete ? 1.15 : 1,
              }}
              transition={{
                opacity: { duration: complete ? 0.4 : 2, repeat: complete ? 0 : Infinity, ease: "easeInOut" },
                scale: { duration: 0.7, ease: "easeOut" },
              }}
            >
              <SaturnOrbit />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.span
                animate={{
                  color: complete ? ["#ffffff", "#e9d5ff"] : ["#ffffff", "#c084fc", "#ffffff"],
                  textShadow: complete
                    ? ["0 0 15px rgba(168,85,247,0.4)", "0 0 60px rgba(216,180,254,1)"]
                    : [
                        "0 0 10px rgba(168,85,247,0.3)",
                        "0 0 35px rgba(168,85,247,0.9)",
                        "0 0 10px rgba(168,85,247,0.3)",
                      ],
                }}
                transition={{
                  duration: complete ? 0.6 : 2,
                  repeat: complete ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                className="text-white text-4xl md:text-6xl font-bold tracking-widest"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                SAK
              </motion.span>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-20 h-[1px] bg-purple-400/30 mt-4"
              />
            </motion.div>
          </div>

          <AnimatePresence>
            {!complete && (
              <motion.p
                key="loading-label"
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute bottom-28 text-purple-300 text-xs tracking-[0.3em] uppercase"
              >
                Initializing Experience
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!complete && (
              <motion.div
                key="progress-bar"
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="absolute bottom-16 w-40 h-[2px] bg-purple-500/20 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-500 relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute top-0 h-full w-8"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                    }}
                    animate={{ x: ["-30px", "160px"] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {complete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 bg-white pointer-events-none"
              style={{ mixBlendMode: "overlay" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
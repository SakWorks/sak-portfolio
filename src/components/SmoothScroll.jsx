import { useEffect } from "react";
import Lenis from "lenis";

// Site-wide buttery smooth scrolling. Renders nothing — it just sets up
// Lenis on mount and tears it down on unmount.
//
// Why this instead of CSS `scroll-behavior: smooth`: the native version
// only smooths anchor-link jumps and uses a fixed, fairly abrupt curve.
// Lenis intercepts the actual mouse-wheel/trackpad/touch scrolling itself,
// so every bit of scrolling — not just anchor clicks — gets the same
// momentum-based easing. It also plays correctly with Framer Motion's
// whileInView/IntersectionObserver-driven reveals used throughout the
// site, since those watch real element position, not how scroll got there.
//
// Respects prefers-reduced-motion: if the user has that set, this does
// nothing and scrolling stays instant/native.

const SmoothScroll = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      // lerp interpolates toward the scroll target every frame based on
      // velocity, rather than restarting a fixed duration/easing animation
      // on every wheel tick. For continuous real-time scrolling this reads
      // as more fluid and responsive — duration/easing below is reserved
      // for the one-off anchor-link jumps, where a fixed curve makes sense.
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      autoRaf: true,
    });

    // Smooth in-page anchor navigation (navbar links, footer CTA, etc.)
    // through Lenis too, instead of letting the browser jump-scroll it.
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, {
        offset: -84,
        duration: 1.4,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      });
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;

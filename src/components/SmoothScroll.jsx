import { useEffect } from "react";
import Lenis from "lenis";

// Site-wide buttery smooth scrolling — desktop/mouse only.
//
// Why this instead of CSS `scroll-behavior: smooth`: the native version
// only smooths anchor-link jumps and uses a fixed, fairly abrupt curve.
// Lenis intercepts the actual mouse-wheel/trackpad scrolling itself, so
// every bit of scrolling — not just anchor clicks — gets the same
// momentum-based easing. It also plays correctly with Framer Motion's
// whileInView/IntersectionObserver-driven reveals used throughout the
// site, since those watch real element position, not how scroll got there.
//
// IMPORTANT: Lenis is only enabled on `pointer: fine` devices (real mice/
// trackpads). It is deliberately left OFF on touch devices. Custom JS
// scroll libraries — Lenis included — are a known source of broken or
// one-directional scrolling inside mobile in-app browsers (Instagram,
// Snapchat, Facebook's embedded webviews, etc.), which have nonstandard
// touch/momentum handling that these libraries can't always account for.
// Native touch scrolling on phones is already smooth by default and far
// more reliable across every browser/webview than anything we could layer
// on top of it, so we simply don't touch it.
//
// Respects prefers-reduced-motion: if the user has that set, this does
// nothing and scrolling stays fully native.

const SmoothScroll = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouchDevice) {
      // Still give in-page anchor links (nav, footer CTA) a smooth jump
      // on touch devices, using the browser's own native smooth-scroll —
      // no custom scroll-hijacking library involved, so it can't break
      // regular scrolling.
      const handleAnchorClickNative = (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const hash = anchor.getAttribute("href");
        if (!hash || hash === "#") return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      };
      document.addEventListener("click", handleAnchorClickNative);
      return () => document.removeEventListener("click", handleAnchorClickNative);
    }

    const lenis = new Lenis({
      // lerp interpolates toward the scroll target every frame based on
      // velocity, rather than restarting a fixed duration/easing animation
      // on every wheel tick. For continuous real-time scrolling this reads
      // as more fluid and responsive — duration/easing below is reserved
      // for the one-off anchor-link jumps, where a fixed curve makes sense.
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
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
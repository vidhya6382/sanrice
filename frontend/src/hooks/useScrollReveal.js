import { useEffect } from "react";

// Boxes that fade/slide in as they scroll into view.
const SELECTORS = [
  ".section-head",
  ".promise__intro",
  ".story-card",
  ".product-card",
  ".highlights__item",
  ".farmers-banner__text",
  ".farmers-banner__img",
  ".video-showcase__frame",
  ".info-card",
  ".about-grid__img",
  ".contact-grid__img",
  ".contact-grid__map",
  ".timeline__item",
  ".values__card",
  ".reach__col",
  ".mission__text",
  ".mission__img",
  ".rooted__inner",
  ".about-intro .container",
  ".detail__media",
  ".detail__info",
  ".brand-filter",
].join(",");

/**
 * Adds a scroll-reveal animation to every box on the page.
 * Works for content that arrives later from the API too (e.g. product cards).
 */
export default function useScrollReveal(key) {
  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const prepare = () => {
      document.querySelectorAll(SELECTORS).forEach((el) => {
        if (el.classList.contains("is-visible")) return;
        if (!el.classList.contains("reveal")) {
          // Stagger boxes that sit side by side (cards in a row).
          const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
          const index = Math.max(0, siblings.indexOf(el));
          el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 90}ms`);
          el.classList.add("reveal");
        }
        // Always (re)observe boxes that haven't appeared yet – this observer may be new.
        io.observe(el);
      });
    };

    prepare();
    const main = document.querySelector("main");
    const mo = new MutationObserver(prepare);
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [key]);
}

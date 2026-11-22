"use client";

import { useEffect } from "react";

/**
 * Parallax por scroll: qualquer elemento com data-speed="0.2" se desloca
 * proporcionalmente à distância do centro da viewport. Só usa transform.
 */
export default function ParallaxController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-speed]"));
    let ticking = false;

    const update = () => {
      const vh = window.innerHeight;
      for (const el of items) {
        const rect = el.parentElement!.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        const offset = rect.top + rect.height / 2 - vh / 2;
        const speed = parseFloat(el.dataset.speed ?? "0");
        el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}

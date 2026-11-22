"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

const DURATION = 600; // ms — mantém em sincronia com --dur
const STAGGER = 400; // ms — mantém em sincronia com --stagger

type Props = {
  as?: ElementType;
  className?: string;
  /** Posição do elemento no grupo; o delay é step * 400ms */
  step?: number;
  children: ReactNode;
};

export default function Reveal({ as: Tag = "div", className = "", step = 0, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible", "is-done");
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-visible");
        // Depois da entrada, remove o delay para o hover responder na hora
        timer = setTimeout(() => el.classList.add("is-done"), step * STAGGER + DURATION);
        io.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [step]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--delay": `${step * STAGGER}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

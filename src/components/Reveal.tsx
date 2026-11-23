"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

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
  // Estado no React (e não classList) para que re-renders com outro className não percam as classes
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setVisible(true);
      setDone(true);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        // Depois da entrada, remove o delay para o hover responder na hora
        timer = setTimeout(() => setDone(true), step * STAGGER + DURATION);
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
      className={`reveal${visible ? " is-visible" : ""}${done ? " is-done" : ""} ${className}`}
      style={{ "--delay": `${step * STAGGER}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

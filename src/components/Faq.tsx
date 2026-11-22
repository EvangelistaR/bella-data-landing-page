"use client";

import { useState } from "react";
import { faq } from "@/data/content";
import Reveal from "./Reveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {faq.map((item, i) => (
        <Reveal key={item.q} step={i % 3} className={`faq-item${open === i ? " is-open" : ""}`}>
          <button
            type="button"
            className="faq-q"
            aria-expanded={open === i}
            aria-controls={`faq-${i}`}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item.q}</span>
            <span className="faq-icon" aria-hidden="true">+</span>
          </button>
          <div className="faq-panel" id={`faq-${i}`} role="region">
            <div>
              <p>{item.a}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

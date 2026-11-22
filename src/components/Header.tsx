"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      // esconde ao descer, mostra ao subir
      if (Math.abs(y - last) > 8) {
        setHidden(y > last && y > 160);
        last = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${hidden ? " is-hidden" : ""}${scrolled ? " is-scrolled" : ""}`}>
      <div className="container nav">
        <a className="brand" href="#inicio" aria-label="Bella Data, início">
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.png`} alt="Bella Data" width={1108} height={196} priority />
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn" href="#contato">
          Quero conhecer
        </a>
      </div>
    </header>
  );
}

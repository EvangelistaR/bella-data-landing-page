"use client";

import { plans } from "@/data/content";
import { useState, type SubmitEvent } from "react";

// Máscara (99) 99999-9999: mantém só dígitos e reaplica a formatação
function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");

  // Sem backend ainda: troque por uma chamada à sua API / serviço de e-mail.
  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form form-success" role="status">
        <h3>Recebemos seu contato 💜</h3>
        <p>Em breve entraremos em contato para conversar sobre o melhor plano para sua clínica.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="telefone">WhatsApp</label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          inputMode="numeric"
          required
          autoComplete="tel"
          placeholder="(99) 99999-9999"
          maxLength={15}
          pattern="\(\d{2}\) \d{5}-\d{4}"
          title="Use o formato (99) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
        />
      </div>
      <div className="field">
        <label htmlFor="plano">Plano de interesse</label>
        <select id="plano" name="plano" defaultValue="">
          <option value="" disabled>Selecione</option>
          {plans.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name} — {p.price}/mês ({p.access.toLowerCase()})
            </option>
          ))}
        </select>
      </div>
      <label className="consent">
        <input type="checkbox" required />
        <span>Concordo em receber contato da Bella Data e com o tratamento dos meus dados conforme a LGPD.</span>
      </label>
      <button className="btn" type="submit">
        Quero conhecer a Bella Data <span className="arrow" aria-hidden="true">→</span>
      </button>
    </form>
  );
}

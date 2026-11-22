import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bella Data | Gestão de agendas para clínicas de estética",
  description:
    "Organize as agendas da sua clínica, evite conflitos de horários e consulte a agenda pelo WhatsApp com IA. Planos a partir de R$ 110/mês.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

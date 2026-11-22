import Image from "next/image";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import ParallaxController from "@/components/ParallaxController";
import Icon from "@/components/Icon";
import Faq from "@/components/Faq";
import LeadForm from "@/components/LeadForm";
import { benefits, guarantees, hero, plans, planFeatures, problems, steps } from "@/data/content";

const schedule = [
  { time: "09:00", what: "Atendimento", who: "Agenda 01" },
  { time: "10:30", what: "Consulta", who: "Agenda 02" },
  { time: "14:00", what: "Atendimento", who: "Agenda 01" },
  { time: "16:00", what: "Retorno", who: "Agenda 03" },
];

export default function Home() {
  return (
    <>
      <ParallaxController />
      <Header />
      <main>
        {/* 1. HERO */}
        <section className="hero" id="inicio">
          <div className="blob blob-a" data-speed="0.12" />
          <div className="blob blob-b" data-speed="-0.08" />
          <div className="container hero-grid">
            <div>
              <Reveal as="p" className="eyebrow">{hero.eyebrow}</Reveal>
              <Reveal as="h1" step={1}>{hero.title}</Reveal>
              <Reveal as="p" step={2} className="lead">{hero.lead}</Reveal>
              <Reveal step={3} className="hero-actions">
                <a className="btn" href="#contato">Quero conhecer <span className="arrow" aria-hidden="true">→</span></a>
                <a className="btn btn-secondary" href="#planos">Ver planos</a>
              </Reveal>
              <Reveal as="p" step={3} className="hero-note">{hero.note}</Reveal>
            </div>
            <Reveal step={2} className="hero-visual">
              <div className="glow" data-speed="0.05" />
              <div data-speed="0.1" className="parallax" style={{ width: "100%", display: "grid", placeItems: "center" }}>
                <div className="dashboard" aria-label="Exemplo ilustrativo da agenda">
                  <div className="dash-top">
                    <span className="dash-title">Agenda da clínica</span>
                    <span className="pill">Visão do dia</span>
                  </div>
                  {schedule.map((a) => (
                    <div className="appointment" key={a.time}>
                      <time>{a.time}</time>
                      <div><strong>{a.what}</strong><small>{a.who}</small></div>
                      <i />
                    </div>
                  ))}
                </div>
              </div>
              <div data-speed="0.28" className="wa-card parallax">
                <div className="chat-label">Consulta via WhatsApp · exemplo</div>
                <div className="bubble">Como está a agenda de hoje?</div>
                <div className="bubble reply">Você tem 4 atendimentos hoje. Quer ver os horários livres?</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Problemas */}
        <div className="problems" aria-label="Problemas que a Bella Data resolve">
          <div className="container">
            <ul>
              {problems.map((p, i) => (
                <Reveal as="li" key={p} step={i % 4 === 0 ? 0 : 1}>{p}</Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. BENEFÍCIOS */}
        <section className="section" id="beneficios">
          <div className="container">
            <div className="section-intro">
              <Reveal as="p" className="eyebrow">Benefícios</Reveal>
              <Reveal as="h2" step={1}>Mais visibilidade da operação. Menos dependência.</Reveal>
              <Reveal as="p" step={2}>Tudo o que a clínica precisa para acompanhar compromissos e manter pacientes informados.</Reveal>
            </div>
            <div className="grid-3">
              {benefits.map((b, i) => (
                <Reveal as="article" key={b.title} step={i % 3} className="card">
                  <div className="icon-box"><Icon name={b.icon} /></div>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3. DEMONSTRAÇÃO (no lugar de prova social: ainda não há clientes) */}
        <section className="section dark" id="demonstracao">
          <div className="blob blob-c" data-speed="0.15" />
          <div className="container">
            <div className="section-intro">
              <Reveal as="p" className="eyebrow">Veja na prática</Reveal>
              <Reveal as="h2" step={1}>Pergunte no WhatsApp. A IA responde.</Reveal>
              <Reveal as="p" step={2}>Chega de interromper a recepção para saber um horário. A demonstração abaixo é ilustrativa.</Reveal>
            </div>
            <Reveal className="demo-panel">
              <div>
                <h3>Uma pergunta. Uma resposta na hora.</h3>
                <p>Profissionais consultam informações da agenda por meio de conversas no WhatsApp, com auxílio de inteligência artificial.</p>
              </div>
              <DemoChat />
            </Reveal>
          </div>
        </section>

        {/* 4. COMO FUNCIONA */}
        <section className="section" id="como-funciona">
          <div className="container">
            <div className="section-intro">
              <Reveal as="p" className="eyebrow">Como funciona</Reveal>
              <Reveal as="h2" step={1}>Três passos para organizar a clínica.</Reveal>
            </div>
            <div className="grid-3">
              {steps.map((s, i) => (
                <Reveal as="article" key={s.title} step={i} className="card">
                  <span className="step-number">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. OFERTA */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <Reveal className="offer-band">
              <div>
                <p className="eyebrow">Uma plataforma inteligente</p>
                <h2>Agendas, pacientes e WhatsApp conectados.</h2>
                <p>Da organização dos horários à consulta pelo WhatsApp, a Bella Data apoia a rotina de clínicas de estética de ponta a ponta.</p>
              </div>
              <a className="btn" href="#planos">Encontrar meu plano <span className="arrow" aria-hidden="true">→</span></a>
            </Reveal>
          </div>
        </section>

        {/* 6. PLANOS */}
        <section className="section" id="planos" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="section-intro">
              <Reveal as="p" className="eyebrow">Planos e preços</Reveal>
              <Reveal as="h2" step={1}>Escolha pela quantidade de acessos.</Reveal>
              <Reveal as="p" step={2}>Mesmos recursos em todos os planos. Muda apenas o número de pessoas da equipe com acesso.</Reveal>
            </div>
            <div className="grid-3">
              {plans.map((p, i) => (
                <Reveal as="article" key={p.name} step={i} className="card plan">
                  <h3>{p.name}</h3>
                  <p className="plan-price">{p.price}<small>/mês</small></p>
                  <p className="plan-access">{p.access}</p>
                  <p>{p.text}</p>
                  <ul>{planFeatures.map((f) => <li key={f}>{f}</li>)}</ul>
                  <a className={`btn${i === 1 ? "" : " btn-secondary"}`} href="#contato">Quero o {p.name}</a>
                </Reveal>
              ))}
            </div>
            <Reveal as="p" className="note">A Bella Data não oferece consultas online nem emissão de documentos para procedimentos invasivos.</Reveal>
          </div>
        </section>

        {/* 7. FAQ */}
        <section className="section" id="faq" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="section-intro">
              <Reveal as="p" className="eyebrow">Dúvidas frequentes</Reveal>
              <Reveal as="h2" step={1}>O que você precisa saber.</Reveal>
            </div>
            <Faq />
          </div>
        </section>

        {/* 8. GARANTIAS */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="section-intro">
              <Reveal as="p" className="eyebrow">Transparência</Reveal>
              <Reveal as="h2" step={1}>Decida com informação clara.</Reveal>
            </div>
            <div className="grid-3">
              {guarantees.map((g, i) => (
                <Reveal as="article" key={g.title} step={i} className="card">
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FORMULÁRIO */}
        <section className="section" id="contato" style={{ paddingTop: 0 }}>
          <div className="container">
            <Reveal className="conversion">
              <div>
                <p className="eyebrow">Próximo passo</p>
                <h2>Veja qual plano acompanha a sua clínica.</h2>
                <p>Deixe seus dados e conversamos sobre a melhor opção para o tamanho da sua equipe.</p>
              </div>
              <LeadForm />
            </Reveal>
          </div>
        </section>

        {/* 10. CTA FINAL */}
        <section className="section final-cta">
          <div className="container">
            <Reveal as="p" className="eyebrow">Bella Data</Reveal>
            <Reveal as="h2" step={1}>Cuide dos pacientes. A agenda a gente organiza.</Reveal>
            <Reveal as="p" step={2} className="lead">Centralize agendas, notifique pacientes e consulte tudo pelo WhatsApp.</Reveal>
            <Reveal step={3}>
              <a className="btn" href="#contato">Quero conhecer <span className="arrow" aria-hidden="true">→</span></a>
            </Reveal>
          </div>
        </section>
      </main>

      {/* 11. RODAPÉ */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <a className="footer-brand" href="#inicio" aria-label="Bella Data, início">
                <Image src="/logo.png" alt="Bella Data" width={1108} height={196} />
              </a>
              <p>Gestão de agendas para clínicas de estética.</p>
            </div>
            <div>
              <p><strong>Navegue</strong></p>
              <div className="footer-links">
                <a href="#beneficios">Benefícios</a>
                <a href="#como-funciona">Como funciona</a>
                <a href="#planos">Planos</a>
                <a href="#faq">FAQ</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">© {new Date().getFullYear()} Bella Data. Todos os direitos reservados.</div>
        </div>
      </footer>
    </>
  );
}

function DemoChat() {
  const msgs: [string, boolean][] = [
    ["Como está a agenda de hoje?", false],
    ["Você tem 4 atendimentos hoje, o próximo é às 14:00.", true],
    ["Quais horários estão livres amanhã?", false],
    ["Amanhã há horários livres às 9:00 e às 15:30.", true],
  ];
  return (
    <Reveal className="demo-chat">
      <div className="chat-label">Bella Data · exemplo ilustrativo</div>
      {msgs.map(([t, reply], i) => (
        <div key={t} className={`bubble${reply ? " reply" : ""}`} style={{ ["--delay" as string]: `${(i + 1) * 400}ms` }}>
          {t}
        </div>
      ))}
    </Reveal>
  );
}

# Spec 01 — Gerar a landing page com o padrão de cores

Gera a landing page da Bella Data (estrutura, conteúdo e identidade visual), **sem animações**. As animações são aplicadas na [Spec 02](./02-landing-page-animacoes.md).

## Fontes de verdade

- `projeto_bella_data.yaml`: produto, persona, planos e restrições. Não inventar números, depoimentos nem clientes.
- `public/logo.png`: logo da marca (1108×196).
- `src/data/content.ts`: todo o texto da página fica aqui, fora dos componentes.

## Stack

Next.js 16 (App Router), React 19 e TypeScript. Estilos em um único `src/app/globals.css`, sem biblioteca de UI. Fonte do sistema (sem download).

## Paleta de cores

Definir como variáveis CSS em `:root` e usar **somente** via `var(--...)`. Nenhum hex solto nos componentes.

| Variável | Hex | Uso |
| --- | --- | --- |
| `--color-primary` | `#493788` | Botão primário, eyebrow, ícones, links ativos, bolha de resposta |
| `--color-deep` | `#231b48` | Títulos (h1–h3), hover do botão primário, seções escuras e rodapé |
| `--color-lavender` | `#ede7f9` | Fundo de ícones, hover de botão secundário, pílulas e detalhes |
| `--color-white` | `#fcfafd` | Fundo do `body` |
| `--color-muted` | `#c6c2df` | Blobs decorativos e elementos de apoio |
| `--color-text` | `#29243b` | Texto de corpo |
| `--color-text-light` | `#686276` | Texto secundário e parágrafos de apoio |
| `--color-border` | `#e5e0ee` | Bordas de cards, inputs e divisores |

Complementos permitidos: branco puro `#fff` para cards e botão secundário, e `#9b8bd0` para o outline de foco. O hero usa o gradiente `linear-gradient(135deg, #fcfafd 0%, #f5f1fb 100%)`.

### Regras de uso

- Predomínio de fundo claro (`--color-white`), com **uma** seção escura (`--color-deep`) para a demonstração via WhatsApp.
- Contraste mínimo WCAG AA: texto de corpo ≥ 4.5:1. Texto claro em fundo escuro usa `#fff` ou `#e1dcec`.
- Foco visível em todo elemento interativo: `outline: 3px solid #9b8bd0; outline-offset: 3px`.
- Sombras em tom roxo: `--shadow-soft: 0 18px 55px rgba(35,27,72,.09)` e `--shadow-lift: 0 22px 50px rgba(35,27,72,.18)`.

## Design tokens

```css
--font-body: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
--container: 1200px;
--gap-section: 60px;   /* 120px a partir de 768px */
--radius-md: 16px;     /* cards */
--radius-lg: 28px;     /* painéis grandes */
--radius-pill: 30px;   /* botões */
```

- Títulos com a mesma fonte do corpo. H1 `clamp(2.3rem, 7vw, 4.2rem)`, H2 `clamp(1.9rem, 5vw, 3.1rem)`, `letter-spacing: -0.035em`.
- Container: `min(100% - 40px, 1200px)` no mobile e `min(100% - 64px, 1200px)` a partir de 768px.
- Estilo visual: material suave (sombras e cantos arredondados), com toques de glassmorphism no header.
- Mobile-first.

## Estrutura da página

Ordem das seções em `src/app/page.tsx`:

1. **Header**: logo + links (Benefícios, Como funciona, Planos, FAQ) + CTA. Altura ~100px, translúcido com blur.
2. **Hero** (`#inicio`): layout esquerda-direita. Texto à esquerda (eyebrow, H1, lead, dois botões, nota). À direita, um mock da agenda e um card de WhatsApp, ambos ilustrativos.
3. **Faixa de problemas**: lista curta das dores da persona.
4. **Benefícios** (`#beneficios`): grid de 3 cards com ícone.
5. **Demonstração** (`#demonstracao`): seção escura com conversa de WhatsApp ilustrativa, no lugar de prova social, já que não há clientes.
6. **Como funciona** (`#como-funciona`): 3 passos numerados.
7. **Faixa de oferta**: chamada para ver os planos.
8. **Planos** (`#planos`): Standard (R$ 110, até 5 acessos), Team (R$ 180, até 8) e Clinic (R$ 250, até 25). O Team tem o botão primário e os outros o secundário. Nota: não oferece consultas online nem emissão de documentos para procedimentos invasivos.
9. **FAQ** (`#faq`): accordion.
10. **Transparência**: grid de 3 cards de garantias.
11. **Formulário** (`#contato`): nome, e-mail, WhatsApp com máscara `(99) 99999-9999` e plano de interesse. Sem backend, e o envio mostra a mensagem de sucesso.
12. **CTA final** e **rodapé** com logo, links e copyright.

### Hero

- Eyebrow: "Gestão de agendas para clínicas de estética"
- Título: "Sua clínica sob controle. Sem depender de ninguém para saber a agenda."
- Lead: "Organize as agendas da sua clínica, evite conflitos de horários e mantenha seus pacientes informados, tudo em uma única plataforma inteligente."
- CTAs: "Quero conhecer" (`#contato`) e "Ver planos" (`#planos`).

## Componentes

`Header`, `Icon`, `Faq`, `LeadForm`, mais `app/layout.tsx` e `app/page.tsx`. Ícones do favicon em `src/app/icon.png` e `src/app/apple-icon.png`.

## Botões

- Pílula (`--radius-pill`), altura ~52px, `padding: 0 26px`, peso 700.
- Primário: fundo `--color-primary`, texto branco, e `--color-deep` no hover.
- Secundário: fundo branco, borda `--color-border`, texto `--color-deep`, e `--color-lavender` no hover.
- Claro (`.btn-light`): para fundos escuros.

## Fora de escopo

Animações, transições, parallax e scroll reveal (Spec 02). Backend do formulário. Consultas online e emissão de documentos.

## Critérios de aceite

- [ ] `npm run build` conclui sem erros de tipo.
- [ ] Todas as cores vêm das variáveis da paleta, sem hex solto nos componentes.
- [ ] As 12 seções existem, na ordem acima, e os links âncora funcionam.
- [ ] Textos e preços batem com o `projeto_bella_data.yaml`, sem números ou depoimentos inventados.
- [ ] Layout correto em 375px, 768px e 1280px, sem scroll horizontal.
- [ ] Contraste AA e foco visível em links, botões e inputs.

# Spec 02 — Aplicar as animações

Adiciona movimento à landing page gerada na [Spec 01](./01-landing-page-cores.md). Pré-requisito: a página, a paleta e os tokens da Spec 01 já existem. Esta spec **não altera cores, textos nem estrutura**.

## Nível de animação: moderada

Scroll reveal + hover + transições suaves, com parallax leve só nos elementos decorativos do hero.

## Tokens de movimento

Em `:root`, ao lado dos demais tokens:

```css
--dur: 600ms;       /* duração padrão, timing médio */
--stagger: 400ms;   /* delay entre elementos do mesmo grupo */
--ease: ease-in-out;
--lift: -6px;       /* elevação no hover */
```

Toda transição usa `var(--dur)` e `var(--ease)`. Sem valores soltos.

## 1. Scroll reveal (fade-in + slide-up)

**CSS** (`globals.css`):

- `.reveal`: `opacity: 0; transform: translateY(28px)`, com transição de `opacity`, `transform`, `box-shadow` e `background`, e `transition-delay: var(--delay, 0ms)`.
- `.reveal.is-visible`: `opacity: 1; transform: translateY(0)`.
- `.reveal.is-done`: `transition-delay: 0ms`, para o hover responder na hora depois da entrada.

**Componente** `src/components/Reveal.tsx` (client component):

- Props: `as` (tag, padrão `div`), `className`, `step` (posição no grupo) e `children`.
- Define `--delay = step * 400ms` via `style`.
- `IntersectionObserver` com `threshold: 0.15` e `rootMargin: "0px 0px -40px 0px"`. Ao entrar na viewport, adiciona `is-visible` e desconecta o observer (anima só uma vez).
- Depois de `step * 400 + 600` ms, adiciona `is-done`.
- Limpa o observer e o timer no unmount.
- Sem `IntersectionObserver` ou com `prefers-reduced-motion`, adiciona `is-visible is-done` direto.

**Aplicação** (envolver o conteúdo em `<Reveal>` em `page.tsx`):

- Eyebrow → H2 → parágrafo de cada seção usam `step` 0, 1 e 2.
- Hero: eyebrow 0, H1 1, lead 2, botões e nota 3, visual 2.
- Cards em grid usam `step={i % 3}`, para a coreografia se repetir a cada linha.
- Itens da faixa de problemas e do FAQ também usam `step`.

## 2. Hover e micro-interações

| Elemento | Efeito |
| --- | --- |
| `.btn` | `translateY(var(--lift))`, cor de fundo para `--color-deep` e `--shadow-lift`. No `:active`, `translateY(-2px)`. |
| `.btn .arrow` | `translateX(6px)` no hover do botão. |
| `.btn-secondary` e `.btn-light` | Fundo `--color-lavender` no hover. |
| `.card.is-visible:hover` | `translateY(var(--lift))` + `--shadow-lift`. O seletor com `.is-visible` evita conflito com o estado inicial do reveal. |
| `.card:hover .icon-box` | `rotate(-8deg) scale(1.12)`, fundo `--color-primary` e ícone branco. |
| Links | Transição de cor em `var(--dur)`. |
| Inputs | Borda colorida no `:focus`. |

## 3. Accordion do FAQ

- O painel anima `grid-template-rows` de `0fr` para `1fr` em `var(--dur)`, com o conteúdo interno em `overflow: hidden`.
- O ícone `+` gira 45° ao abrir (`.is-open`) e o texto da pergunta muda de cor.
- `aria-expanded` e `aria-controls` mantidos no botão (acessibilidade).

## 4. Conversa do WhatsApp (seção escura)

- `.demo-chat .bubble` começa com `opacity: 0; translateY(14px)`.
- Quando o `.demo-chat` recebe `is-visible`, as bolhas entram em sequência, com `--delay` de `(i + 1) * 400ms`.

## 5. Parallax por scroll

Componente `src/components/ParallaxController.tsx` (client, renderizado uma vez em `page.tsx`):

- Qualquer elemento com `data-speed="0.2"` se desloca em Y proporcionalmente à distância do centro da viewport: `translate3d(0, -offset * speed, 0)`.
- Cálculo com base no `getBoundingClientRect()` do **pai**, para o transform do próprio elemento não afetar a medição.
- Atualização com `requestAnimationFrame` e throttle por flag `ticking`. Listeners de `scroll` (`passive: true`) e `resize`, removidos no cleanup.
- Ignora elementos a mais de 200px fora da viewport.
- Usa **só** `transform`, para não causar reflow.

Velocidades sugeridas:

| Elemento | `data-speed` |
| --- | --- |
| `.blob-a` (hero) | `0.12` |
| `.blob-b` (hero) | `-0.08` |
| `.glow` (hero) | `0.05` |
| Dashboard da agenda | `0.10` |
| Card do WhatsApp (hero) | `0.28` |
| `.blob-c` (seção escura) | `0.15` |

Parallax só em elementos decorativos, nunca em texto de leitura.

## 6. Header

- Esconde ao rolar para baixo (após 160px) e reaparece ao rolar para cima, com limiar de 8px para evitar tremor.
- Com `scrollY > 10`, ganha fundo translúcido, blur e sombra sutil.
- A mudança usa transição de `transform` e `background` em `var(--dur)`.

## 7. Acessibilidade e performance

- `@media (prefers-reduced-motion: reduce)`:
  - `transition-duration` e `animation-duration` em `0.01ms`, `transition-delay: 0ms` e `scroll-behavior: auto`.
  - `.reveal` e `.demo-chat .bubble` ficam sempre visíveis (`opacity: 1; transform: none`).
  - `ParallaxController` não registra listeners.
- Animar apenas `transform` e `opacity`, mais `box-shadow` e `background` nos hovers. Nunca `width`, `height`, `top` ou `left`.
- Nenhuma biblioteca de animação (Framer Motion, GSAP etc.). CSS + `IntersectionObserver` + `requestAnimationFrame`.
- `html { scroll-behavior: smooth; scroll-padding-top: 90px }` para os links âncora não ficarem sob o header.
- Conteúdo acima da dobra não pode depender de scroll para aparecer. O hero dispara o reveal ao carregar.

## Fora de escopo

Cursor customizado, contadores numéricos, barras de progresso animadas, vídeo de fundo e animações Lottie.

## Critérios de aceite

- [ ] Os elementos entram com fade + slide-up de 600ms e stagger de múltiplos de 400ms, uma vez só.
- [ ] Após a entrada, o hover de cards e botões responde sem atraso (`is-done`).
- [ ] Botões e cards sobem 6px com sombra no hover, e a seta do botão desliza.
- [ ] O accordion abre e fecha com transição suave e o ícone gira.
- [ ] As bolhas do chat aparecem em sequência.
- [ ] Os blobs e o card do hero se movem com o scroll sem engasgar, em ~60fps.
- [ ] Com `prefers-reduced-motion: reduce`, tudo aparece de imediato e sem movimento.
- [ ] Sem layout shift causado por animação (Lighthouse CLS < 0.1).
- [ ] `npm run build` sem erros.

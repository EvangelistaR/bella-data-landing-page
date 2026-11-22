# Bella Data — Landing Page

Landing page do **Bella Data**, aplicação web para clínicas de estética que centraliza a gestão de agendas, notificações de consultas, integração com calendários, anamnese/prontuários e consulta da agenda por WhatsApp com auxílio de IA.

Projeto desenvolvido para a disciplina de Marketing da Pós-Graduação (Impacta).

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- TypeScript

## Como rodar

Pré-requisito: Node.js e npm.

```bash
npm install
npm run dev     # desenvolvimento em http://localhost:3000
npm run build   # build de produção
npm start       # serve o build de produção
```

## Estrutura

```
├── public/                  # Assets estáticos (logo)
├── specs/landing-page.md    # Briefing/especificação usada para gerar a página
├── projeto_bella_data.yaml  # Definição do produto, persona e posicionamento
├── belladata_landing_page-example.html  # Exemplo de referência
└── src/
    ├── app/                 # layout, página principal, estilos globais e ícones
    ├── components/          # Header, LeadForm, Faq, Icon, Reveal, ParallaxController
    └── data/content.ts      # Todo o conteúdo textual da página
```

## Conteúdo

Os textos (hero, problemas, benefícios, passos, planos, FAQ e garantias) ficam centralizados em `src/data/content.ts`. Para alterar copy ou preços, edite esse arquivo sem mexer nos componentes.

### Planos

| Plano    | Preço       | Acessos |
| -------- | ----------- | ------- |
| Standard | R$ 110/mês  | até 5   |
| Team     | R$ 180/mês  | até 8   |
| Clinic   | R$ 250/mês  | até 25  |

## Formulário de leads

O `LeadForm` (nome, e-mail, WhatsApp com máscara e plano de interesse) **ainda não possui backend**: o envio apenas exibe a mensagem de sucesso. Para captar leads de verdade, substitua o `onSubmit` em `src/components/LeadForm.tsx` por uma chamada à sua API ou serviço de e-mail/CRM.

## Observações

O Bella Data ainda não tem clientes reais nem dados de uso; as necessidades descritas na persona são hipóteses a validar com potenciais clientes. O produto não oferece consultas online nem emissão de documentos para procedimentos invasivos.

## Autor

Rafael Evangelista da Silva

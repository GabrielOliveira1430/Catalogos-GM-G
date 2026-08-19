# Relatório do Projeto — Catálogo GM Oficina Mesas

**Data:** Agosto de 2026
**Status:** Base funcional completa, pronta para revisão final e deploy

---

## 1. Visão geral

O projeto é um **catálogo de móveis online** para a GM Oficina Mesas, construído como uma aplicação web de página única (SPA). O visitante pode navegar pela home, ver o catálogo completo de mesas, filtrar e buscar produtos, abrir a página de detalhes de cada mesa e entrar em contato direto pelo WhatsApp — tudo sem sair do site.

**Domínio previsto:** `coreauth.dev`

---

## 2. Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Framework | React 18+ com TypeScript |
| Build tool | Vite |
| Roteamento | React Router (`react-router-dom`) |
| Estilo | CSS puro, organizado em `variables.css`, `globals.css` e `responsive.css` |
| Dados | Array local em TypeScript (`src/data/products.ts`) — sem backend/banco de dados por enquanto |

Não há framework de CSS (Tailwind, Bootstrap etc.) nem gerenciador de estado externo (Redux, Zustand) — o projeto usa apenas `useState`/`useEffect`/`useMemo` do próprio React, o que é adequado para o tamanho atual do catálogo.

---

## 3. Como o site funciona, por dentro

### 3.1 Ponto de entrada

`main.tsx` monta a aplicação React na `div#root` do `index.html` e importa os três arquivos CSS **nessa ordem**: `variables.css` → `globals.css` → `responsive.css`. Essa ordem é proposital: garante que as regras responsivas (media queries) sempre vençam a cascata do CSS, evitando bugs de layout que já ocorreram durante o desenvolvimento (ver seção 6).

### 3.2 Roteamento

O arquivo `src/routes/AppRoutes.tsx` define as páginas do site dentro de um `BrowserRouter`:

| Rota | Página | Componente |
|---|---|---|
| `/` | Início | `Home.tsx` |
| `/catalogo` | Catálogo completo | `Catalog.tsx` |
| `/catalogo/:slug` | Detalhes de uma mesa | `ProductDetails.tsx` |
| `*` (qualquer outra) | Página não encontrada | `NotFound.tsx` |

`Header`, `Footer` e o botão flutuante de `WhatsApp` ficam **fora** do `<Routes>`, ou seja, aparecem fixos em todas as páginas.

### 3.3 Dados dos produtos

Cada mesa é um objeto no array `products` (`src/data/products.ts`), com esta estrutura (`src/types/product.ts`):

```ts
interface Product {
  id: string;
  name: string;
  slug: string;          // usado na URL (/catalogo/slug-da-mesa)
  category: string;      // usado no filtro do catálogo
  description: string;
  price: number;
  dimensions: { width: number; depth: number; height: number };
  images: string[];      // caminhos das fotos em /public/imagens/mesas/...
  featured: boolean;     // se true, aparece na Home em "Mesas em destaque"
}
```

Hoje há **3 mesas cadastradas**: Mesa de Jantar Verona, Mesa de Jantar Milano e Mesa de Centro Roma. Adicionar uma nova mesa é feito diretamente nesse arquivo — não requer nenhuma tela administrativa (ver seção 7, "Limitações atuais").

### 3.4 Página Início (Home)

Estrutura, de cima para baixo:
1. **Hero** — chamada principal com botão para o catálogo.
2. **Diferenciais** — três pilares da marca (Design Exclusivo, Produção Sob Medida, Qualidade que se Vê), com ícones em SVG.
3. **Mesas em destaque** — renderiza automaticamente apenas os produtos com `featured: true`. Se nenhum produto tiver esse campo marcado, a seção inteira desaparece sem quebrar o layout.

### 3.5 Página Catálogo

Contém busca por texto (`ProductSearch`) e filtro por categoria (`ProductFilter`), ambos controlados por `useState` em `Catalog.tsx`. A lista de categorias é gerada dinamicamente a partir dos produtos existentes (`useMemo`), então uma nova categoria adicionada em `products.ts` aparece automaticamente no filtro, sem precisar editar mais nada.

Se a busca + filtro não encontrarem nenhuma mesa, aparece um estado vazio estilizado ("Nenhuma mesa encontrada") em vez de uma grade em branco.

### 3.6 Página de Detalhes do Produto

Ao clicar em "Ver detalhes", o usuário vai para `/catalogo/slug-da-mesa`. Essa página:
- Mostra breadcrumb (Início / Catálogo / Nome da mesa) para navegação e contexto.
- Exibe galeria de fotos com miniaturas clicáveis e zoom em tela cheia (fecha com clique fora, botão X ou tecla **Esc**).
- Mostra dimensões e preço formatado em Real (`toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })`).
- Botão de contato direto no WhatsApp, já preenchendo a mensagem com o nome da mesa.
- Seção **"Você também pode gostar"** — sugere até 3 mesas da mesma categoria. Se não houver nenhuma, a seção não aparece.
- Se o slug da URL não corresponder a nenhuma mesa cadastrada, mostra uma mensagem amigável de "produto não encontrado" com link de volta ao catálogo (em vez de tela em branco ou erro).

### 3.7 Contato via WhatsApp

Toda a lógica de abrir o WhatsApp está centralizada em `src/services/whatsapp.ts`:

```ts
export function openWhatsApp(productName: string) {
  const phone = '5581986539622';
  const message = `Olá! Tenho interesse na ${productName}. Gostaria de saber mais informações.`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
```

Essa função é reaproveitada em 4 lugares: botão do header, botão flutuante fixo, botão de cada card de produto e botão da página de detalhes — sempre abrindo o WhatsApp já com a mensagem personalizada pelo nome da mesa (exceto no header e no botão flutuante, que usam o texto genérico "uma mesa", já que ali não há um produto específico em contexto).

**Número configurado:** (81) 98653-9622

### 3.8 Tratamento de imagens ausentes

Foi implementado um utilitário (`src/utils/image.ts`) que troca automaticamente qualquer imagem quebrada (arquivo renomeado, caminho errado, upload que falhou) por um placeholder ilustrado com o texto "Imagem indisponível", gerado via SVG embutido no código — não depende de nenhum arquivo externo. Isso evita que o site já pareça "com problema" para o visitante caso falte alguma foto no futuro.

---

## 4. Identidade visual

Baseada na arte de referência fornecida (peça em tons de preto, dourado e branco), o site usa:

- **Paleta:** fundo claro (`#f8f7f4`), texto escuro (`#222222`), detalhes em preto/dourado nos elementos de destaque.
- **Tipografia:** Arial/Helvetica (fonte de sistema, sem dependência externa).
- **Componentes com identidade própria:** cards de produto com elevação e zoom sutil no hover, botão WhatsApp flutuante no verde oficial da marca (`#25d366`), rodapé escuro com tom mais sóbrio.

---

## 5. Acessibilidade

Itens implementados até o momento:

- **Skip link** ("Pular para o conteúdo") — visível ao navegar por teclado (Tab), permite pular o menu e ir direto ao conteúdo principal.
- **Foco visível** (`:focus-visible`) em todos os links, botões, inputs e selects — importante para quem navega sem mouse.
- **`aria-label` e `aria-expanded`** no botão do menu mobile, com `aria-controls` associando-o à navegação.
- **Fechamento por teclado** — tanto o menu mobile quanto o modal de zoom de imagem fecham ao apertar **Esc**, devolvendo o foco ao elemento que os abriu.
- **Textos alternativos (`alt`)** em todas as imagens de produto.
- **Contraste de cores** conferido (texto secundário `#666` sobre fundo claro atinge 5.7:1, acima do mínimo AA de 4.5:1).

---

## 6. Principais problemas encontrados e corrigidos durante o desenvolvimento

Um resumo do histórico de bugs corrigidos, útil como referência caso algo semelhante volte a acontecer:

| Problema | Causa | Correção |
|---|---|---|
| Menu mobile sobrepondo o Hero | Regra CSS duplicada/conflitante de `display` sem media query, competindo com o `responsive.css` | Reorganização da ordem de importação do CSS (`variables → globals → responsive`) |
| "Ver detalhes" não abria a página da mesa | Faltava a rota `/catalogo/:slug` no roteador | Rota adicionada, junto com uma rota coringa (`*`) para páginas inexistentes |
| Textos com acentuação quebrada (`MÃ³veis`, `NÃ£o`) | Arquivos salvos com encoding incorreto | Reescrita dos textos em UTF-8 |
| Mesa de Centro Roma exibindo fotos da Mesa Verona | Erro de digitação nos caminhos de imagem em `products.ts` | Caminhos corrigidos para a pasta certa de cada produto |
| Tipo `Product` sem o campo `height` | Interface `ProductDimensions` incompleta | Campo `height` adicionado ao tipo |
| WhatsApp com número fictício (`5500000000000`) | Placeholder nunca substituído | Número real da empresa configurado |
| Botão WhatsApp flutuante e Footer "sumidos" | Componentes existiam mas nunca foram importados/renderizados no `AppRoutes.tsx` | Componentes conectados à árvore de rotas |

---

## 7. Limitações atuais e próximos passos sugeridos

- **Sem painel administrativo:** adicionar/editar mesas exige editar `src/data/products.ts` manualmente e subir as fotos na pasta `public/imagens/mesas/`. Para uma operação maior, valeria considerar futuramente um CMS ou planilha conectada.
- **Sem backend:** todos os dados são estáticos, compilados junto com o site. Não há carrinho, cadastro de cliente ou histórico de pedidos — o fluxo de venda é 100% via WhatsApp.
- **Deploy ainda não realizado:** o projeto até agora só foi testado em ambiente local (`npm run dev`). O próximo passo natural é gerar a build de produção (`npm run build`) e publicar no domínio `coreauth.dev`.
- **Sem imagem própria de Open Graph:** o preview de compartilhamento do link (WhatsApp, redes sociais) está usando o banner já existente do site; vale revisar se essa é de fato a melhor imagem para esse fim, ou se compensa criar uma versão dedicada 1200×630px.

---

## 8. Estrutura de arquivos (resumo)

```
src/
├── App.tsx                     → componente raiz
├── main.tsx                    → ponto de entrada, importa CSS
├── components/
│   ├── catalog/                → ProductCard, ProductGrid, ProductSearch, ProductFilter
│   ├── layout/                 → Header, Footer, WhatsAppButton
│   └── ui/                     → Loading, Button, Modal
├── data/
│   ├── products.ts             → lista de mesas (fonte única de dados)
│   └── categories.ts
├── pages/
│   ├── Home/, Catalog/, Product/, NotFound/
├── routes/
│   └── AppRoutes.tsx           → define as rotas do site
├── services/
│   └── whatsapp.ts             → lógica central do botão de contato
├── styles/
│   ├── variables.css, globals.css, responsive.css
├── types/
│   └── product.ts              → contrato de dados de um produto
└── utils/
    └── image.ts                → fallback de imagem quebrada
```

---

## 9. Conclusão

O catálogo saiu de um esqueleto inicial (sem rotas funcionando, sem menu mobile, sem tratamento de erros) para uma aplicação estável, com identidade visual consistente com a marca, contato direto por WhatsApp em múltiplos pontos, boas práticas de acessibilidade e resiliência a falhas comuns (imagem faltando, rota inexistente). O item pendente mais importante agora é o **deploy** — colocar o site no ar no domínio `coreauth.dev`.

# TASKS_SPEC — Plano de implementação

**Versão:** 1.0 · **Data:** 2026-11-24
**Ordem:** executar de cima para baixo. Marcar status e fazer commit semântico ao concluir cada tarefa.

**Legenda de status:** `[ ]` pendente · `[~]` em andamento · `[x]` concluído · `[-]` bloqueado

---

## TASK-01 — Documentação SPEC inicial
- **Descrição:** escrever PRD_SPEC, TECH_SPEC, TASKS_SPEC, AGENTS.md e AI_USAGE.md.
- **Pré-requisitos:** clone do repositório vazio.
- **RF/RN:** todos (rastreabilidade).
- **Arquivos:** `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASKS_SPEC.md`, `AGENTS.md`, `docs/AI_USAGE.md`.
- **Critério de pronto:** RF-01..16 e RN-01..10 listados; TECH referencia os IDs; checklist executável.
- **Status:** [x] (2026-11-24)

## TASK-02 — Conteúdo: 10 issues autorais
- **Descrição:** criar 10 arquivos Markdown em `content/issues/` e publicar as 10 issues no repositório público (títulos, Markdown com títulos/listas/código/links).
- **Pré-requisitos:** TASK-01.
- **RF/RN:** RF-03, RN-02, RN-07.
- **Arquivos:** `content/issues/issue-01.md` … `issue-10.md`.
- **Critério de pronto:** `GET /repos/isaave/Projeto6_GitHubBlog/issues?state=all` retorna ≥ 10 issues sem PRs.
- **Status:** [x] (2026-11-24) — 10 issues publicadas (#1–#10) via API autenticada usando a credencial do Git; `GET /issues?state=all` retorna 10 sem PRs e a Search API retorna `total_count: 10`.

## TASK-03 — Scaffold Vite + React + TypeScript + Tailwind v4
- **Descrição:** criar projeto na raiz, instalar dependências, configurar Tailwind, tokens do Figma, fonte Nunito e scripts.
- **Pré-requisitos:** TASK-01.
- **RF/RN:** RF-15, RF-16, RN-10.
- **Arquivos:** `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles/index.css`, `.gitignore`.
- **Critério de pronto:** `npm run build` passa; tokens `brand/base-*` disponíveis como classes; fonte carregada.
- **Status:** [x] (2026-11-24) — build OK; `#3294f8`, `#071422`, `container-blog` e `text-title-l` presentes no CSS compilado.

## TASK-04 — Config, tipos e serviço Axios
- **Descrição:** centralizar config; definir interfaces; implementar `getProfile`, `searchIssues`, `getIssue`, mapeador de erros e `AbortSignal`.
- **Pré-requisitos:** TASK-03.
- **RF/RN:** RF-01, RF-05, RF-10, RF-14, RN-01, RN-03, RN-04, RN-06, RN-08, RN-09, RN-10.
- **Arquivos:** `src/config/blog.ts`, `src/types/github.ts`, `src/services/githubApi.ts`, `src/utils/apiError.ts`.
- **Critério de pronto:** chamadas retornam tipos corretos; 403/429/404/rede diferenciados; nenhuma string de API fora desses arquivos.
- **Status:** [x] (2026-11-24) — `npm run build` e `npm run lint` sem erros; RFCancel adicionado ao union de erros na TECH_SPEC.

## TASK-05 — Hooks e utils
- **Descrição:** `useDebouncedValue`, `useProfile`, `useIssues`, `useIssue`, formatação de data e resumo.
- **Pré-requisitos:** TASK-04.
- **RF/RN:** RF-06, RF-07, RF-08, RF-13, RF-14, RN-05, RN-07, RN-08.
- **Arquivos:** `src/hooks/*.ts`, `src/utils/format.ts`.
- **Critério de pronto:** debounce de 500 ms; página reseta na busca; cleanup aborta requisição; estados `idle|loading|success|error`.
- **Status:** [x] (2026-11-24) — hooks criados; data relativa validada como "há 2 dias"; build e lint sem erros. Reset da página será ligado ao input na TASK-07.

## TASK-06 — Layout: Header, ProfileCard e estados
- **Descrição:** banner decorativo, card de perfil sobreposto e componentes LoadingState/ErrorState/EmptyState.
- **Pré-requisitos:** TASK-05.
- **RF/RN:** RF-01, RF-02, RF-13, RF-15, RF-16.
- **Arquivos:** `src/components/Header.tsx`, `ProfileCard.tsx`, `LoadingState.tsx`, `ErrorState.tsx`, `EmptyState.tsx`.
- **Critério de pronto:** perfil real com fallbacks; alt do avatar; Tentar novamente presente; foco visível.
- **Status:** [x] (2026-11-24) — componentes criados; build e lint OK.Ícone do GitHub implementado em SVG local porque o lucide-react v1 não exporta ícones de marca.

## TASK-07 — Home: busca, cards e paginação
- **Descrição:** montar feed com SearchInput, IssueList/IssueCard e Pagination; integrar hooks.
- **Pré-requisitos:** TASK-06.
- **RF/RN:** RF-04, RF-05, RF-06, RF-07, RF-08, RF-09, RF-15, RF-16, RN-03, RN-05, RN-06, RN-07.
- **Arquivos:** `src/components/SearchInput.tsx`, `IssueCard.tsx`, `IssueList.tsx`, `Pagination.tsx`, `src/pages/HomePage.tsx`.
- **Critério de pronto:** grid responsivo; contador; cards clicáveis; paginação real; vazio tratado.
- **Status:** [x] (2026-11-24) — build/lint OK; Home validada no navegador com perfil real. Após a TASK-02: 6 cards reais, contador “10 publicações” e paginação ativa.

## TASK-08 — Detalhe do post e 404
- **Descrição:** rota `/post/:number`, PostHeader, MarkdownView e NotFoundPage.
- **Pré-requisitos:** TASK-07.
- **RF/RN:** RF-09..RF-12, RF-16, RN-07, RN-08.
- **Arquivos:** `src/pages/PostPage.tsx`, `src/pages/NotFoundPage.tsx`, `src/components/MarkdownView.tsx`, `src/App.tsx`.
- **Critério de pronto:** URL direta funciona; Markdown formatado; Voltar e Ver no GitHub funcionam; rota inválida mostra 404.
- **Status:** [x] (2026-11-24) — build/lint OK; rotas validadas no navegador (`/post/abc` → 404; `/post/1` → erro 404 com retry antes da publicação). Após a TASK-02, `/post/1` exibe título, metadados e Markdown reais.

## TASK-09 — Testes automatizados
- **Descrição:** configurar Vitest + Testing Library + MSW e cobrir 3 cenários da TECH_SPEC.
- **Pré-requisitos:** TASK-08.
- **RF/RN:** RF-13, RF-14.
- **Arquivos:** `vitest.config.ts`, `src/test/setup.ts`, `src/test/mocks/handlers.ts`, `src/test/*.test.tsx`.
- **Critério de pronto:** `npm run test` com 3+ testes passando; `npm run build` sem erros.
- **Status:** [x] (2026-11-24) — 4 testes passando; build e lint sem erros. Ajustes: adapter HTTP no jsdom e `onUnhandledFrame` (MSW 3).

## TASK-10 — Documentação final, README, screenshots e deploy
- **Descrição:** atualizar SPEC/AI_USAGE, escrever README, capturar imagens, publicar no Vercel/Netlify e registrar evidências.
- **Pré-requisitos:** TASK-02 e TASK-09.
- **RF/RN:** RF-15, RF-16; seção 11 da spec de entrega.
- **Arquivos:** `README.md`, `docs/AI_USAGE.md`, `docs/PRD_SPEC.md`, `docs/TASKS_SPEC.md`, `docs/screenshots/*`.
- **Critério de pronto:** checklist da seção 10 integralmente marcado; links de repo e deploy no README.
- **Status:** [~] (2026-11-24) — README escrito, issues publicadas e capturas reais geradas em `docs/screenshots/`; falta publicar a aplicação e adicionar o link no README.

## TASK-11 — Fidelidade visual às capturas do Figma
- **Descrição:** alinhar Home e detalhe às capturas fornecidas: logo centralizada, container 1280, perfil maior, busca em largura total, grid de 2 colunas e cabeçalho do post em card próprio.
- **Pré-requisitos:** TASK-10 (ajuste solicitado após a validação inicial).
- **RF/RN:** RF-02, RF-08, RF-12, RF-15, RN-07.
- **Arquivos:** `src/styles/index.css`, `src/components/Header.tsx`, `ProfileCard.tsx`, `SearchInput.tsx`, `IssueCard.tsx`, `IssueList.tsx`, `MarkdownView.tsx`, `src/pages/HomePage.tsx`, `PostPage.tsx`, `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`.
- **Critério de pronto:** build/lint/test passando; medidas e posições conferidas no navegador; documentação atualizada para 2 colunas e `line-clamp-4`.
- **Status:** [x] (2026-11-24) — build/lint/test OK; geometria conferida no navegador (header 516 px, perfil 1280×322 com avatar 224, input 72 px, grid 2 colunas com gap 52 px, card 388 px).

## TASK-12 — Ajustar tipografia da logo à referência
- **Descrição:** substituir a logo atual por uma tipografia equivalente à da captura enviada: texto “GITHUB BLOG” em azul, com largura/altura e espaçamento próximos ao Figma.
- **Pré-requisitos:** TASK-11.
- **RF/RN:** RF-15, RN-10.
- **Arquivos:** `src/components/Header.tsx`.
- **Critério de pronto:** caixa da logo próxima de 215×26 px; build/lint/test OK; captura conferida no navegador.
- **Status:** [x] (2026-11-24) — logo em Nunito Bold 33 px, `tracking-[-0.02em]` e `#3294F8`, caixa de 218×33 px no navegador (ink ~215×24 px), equivalente à referência descontado o zoom; build/lint/test OK. Não há arquivo de logo no repo (apenas `cover.svg`, `icons.svg` e `favicon.svg`), então a logo é tipográfica.

## TASK-13 — Ícone `vector.png` acima da escrita
- **Descrição:** posicionar o asset `vector.png` (45×35 px) centralizado acima do texto “GITHUB BLOG” no banner.
- **Pré-requisitos:** TASK-12.
- **RF/RN:** RF-15, RN-10.
- **Arquivos:** `public/vector.png`, `src/components/Header.tsx`.
- **Critério de pronto:** ícone visível e centralizado acima do texto em 375/768/1280 px; asset versionado fora de `dist/`; build/lint/test OK.
- **Status:** [x] (2026-11-24) — ícone 45×35 px carregado de `/vector.png`, centralizado acima do texto no navegador; build/lint/test OK.

---

## Registro de commits

| Tarefa | Commit | Data |
| --- | --- | --- |
| TASK-01 | `docs: add PRD, TECH, TASKS, AGENTS and AI usage specs` | 2026-11-24 |
| TASK-02 | — (10 issues publicadas via API em 2026-11-24) | — |
| TASK-03 | `feat: scaffold Vite React TS with Tailwind v4 tokens` | 2026-11-24 |
| TASK-04 | `feat: add typed GitHub API service and error mapping` | 2026-11-24 |
| TASK-05 | `feat: add async hooks and formatting utilities` | 2026-11-24 |
| TASK-06 | `feat: add header, profile card and async state views` | 2026-11-24 |
| TASK-07 | `feat: build home feed with search and pagination` | 2026-11-24 |
| TASK-08 | `feat: add post detail route, markdown view and 404` | 2026-11-24 |
| TASK-09 | `test: cover feed, search, pagination, detail and rate limit` | 2026-11-24 |
| TASK-10 | `docs: add project README and update task status` | 2026-11-24 |
| TASK-11 | `refactor: match Figma layout from reference screenshots` | 2026-11-24 |
| TASK-12 | `fix: match logo typography from reference screenshot` | 2026-11-24 |
| TASK-13 | `fix: place vector icon above github blog wordmark` | 2026-11-24 |

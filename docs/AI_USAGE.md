# AI_USAGE — Evidências de uso do OpenCode

Registro de como o OpenCode foi usado como apoio (não substituto da compreensão) neste projeto. Cada entrada contém contexto/prompt, objetivo, resultado, ajustes e verificação pelo aluno.

---

## Evidência 1 — Leitura da spec e planejamento (2026-11-24)

- **Contexto/prompt:** o aluno forneceu o `AGENTS.md` inicial e, em seguida, a especificação completa da recuperação (seções 1–14), além do link do repositório vazio `https://github.com/isaave/Projeto6_GitHubBlog.git`.
- **Objetivo:** transformar a spec em documentação de produto, técnica e plano de tarefas antes de escrever código; definir versões e estratégia de API.
- **Resultado do OpenCode:** criou `docs/PRD_SPEC.md` (RF-01..16, RN-01..10, fluxos, critérios), `docs/TECH_SPEC.md` (arquitetura, interfaces, hooks, serviços, testes, rastreabilidade), `docs/TASKS_SPEC.md` (10 tarefas com ID, pré-requisitos, arquivos, critério de pronto e status), `AGENTS.md` e este arquivo. Decidiu Tailwind v4 com `@tailwindcss/vite`, `react-markdown` seguro por padrão, Search API para lista vazia e busca, `per_page=6`, debounce 500 ms e config centralizada.
- **Ajustes feitos pelo aluno:** confirmou o repositório alvo e a configuração `isaave/Projeto6_GitHubBlog`; identificou que as 10 issues ainda precisam ser publicadas (TASK-02 bloqueada sem credencial).
- **Verificação pelo aluno:** conferir se todos os RF/RN aparecem nos documentos e se a TASK-01 está marcada como concluída; validar as URLs oficiais consultadas (Tailwind Vite e react-markdown).

## Evidência 2 — Consulta à documentação oficial antes de configurar dependências (2026-11-24)

- **Contexto/prompt:** "Check documentation (via Context7 or official docs) when configuring Tailwind v4/v3, React Router, or Markdown plugins" (regra do `AGENTS.md` original).
- **Objetivo:** evitar configuração obsoleta de Tailwind e garantir renderização segura de Markdown.
- **Resultado do OpenCode:** consultou `https://tailwindcss.com/docs/installation/using-vite` (plugin `@tailwindcss/vite`, `@import "tailwindcss"`, tokens via `@theme`) e o README de `remarkjs/react-markdown` (seguro por padrão, `remark-gfm` para GFM, manter `urlTransform` padrão). Registrou as decisões na TECH_SPEC.
- **Ajustes feitos pelo aluno:** nenhum até o momento; revisar quando da TASK-03.
- **Verificação pelo aluno:** comparar `vite.config.ts` e `src/styles/index.css` com o trecho oficial durante a TASK-03; checar que nenhum `rehype-raw` foi adicionado.

## Evidência 3 — Preparação do ambiente e diagnóstico de bloqueio (2026-11-24)

- **Contexto/prompt:** aluno informou o repositório GitHub e recebeu a spec; foi necessário saber se era possível criar as issues automaticamente.
- **Objetivo:** clonar o repositório, checar versões de Node/npm e autenticação disponível.
- **Resultado do OpenCode:** clonou o repo vazio em `Projeto6_GitHubBlog`; confirmou Node v26.13.0, npm 11.20.0 e Git 2.56.0; detectou ausência do `gh` CLI e, portanto, bloqueio para criar issues sem token. Consultou `GET /users/isaave` e confirmou perfil real (Isabella Avelina, 17 seguidores, bio preenchida). Registrou o bloqueio na TASK-02.
- **Ajustes feitos pelo aluno:** deverá publicar as 10 issues pela interface do GitHub ou fornecer credencial temporária fora do repositório.
- **Verificação pelo aluno:** checar `git remote -v`, abrir a API do perfil no navegador e confirmar que a TASK-02 permanece `[ ]`.

---

## Evidência 4 — Scaffold e tokens Tailwind (TASK-03, 2026-11-24)

- **Contexto/prompt:** executar a TASK-03 do `TASKS_SPEC.md`: gerar Vite React TS, instalar dependências e configurar Tailwind v4 com os tokens do Figma.
- **Objetivo:** deixar a base compilando com identidade visual consistente antes de implementar componentes.
- **Resultado do OpenCode:** gerou o scaffold `react-ts` com create-vite v9.3.4 (React 19.3.1, Vite 8.3.6, TypeScript 7.0.2), moveu os arquivos para a raiz preservando `docs/`, `.git/` e `AGENTS.md`; instalou Axios, React Router DOM, react-markdown, remark-gfm, date-fns, lucide-react, Tailwind v4, Vitest, Testing Library, jsdom e MSW; criou `vite.config.ts` com `tailwindcss()`, `src/styles/index.css` com `@theme` (cores, fontes e escalas tipográficas do Figma), `index.html` com Nunito e `lang="pt-BR"`, `strict: true` no tsconfig e script `test`. Removeu CSS/asset padrão do Vite.
- **Ajustes feitos pelo aluno:** conferir `npm run build` e o CSS gerado; validar visualmente a fonte e o tema escuro no navegador.
- **Verificação pelo aluno:** `npm run build` concluiu sem erros; `grep` no CSS de `dist` confirmou `#3294f8`, `#071422`, `container-blog` e `text-title-l`.

---

## Evidência 5 — Serviço Axios e mapeamento de erros (TASK-04, 2026-11-24)

- **Contexto/prompt:** implementar a TASK-04: config centralizada, interfaces tipadas, `getProfile`, `searchIssues`, `getIssue` e tratamento de 403/429/404/rede/cancelamento.
- **Objetivo:** isolar toda a lógica HTTP fora dos componentes e tornar os estados de erro previsíveis.
- **Resultado do OpenCode:** criou `src/config/blog.ts`, `src/types/github.ts`, `src/services/githubApi.ts` e `src/utils/apiError.ts`. A query de busca usa `params` do Axios com `repo:... is:issue`, `sort=created`, `order=desc`, `page` e `per_page`; itens com `pull_request` são removidos. Erros viram `BlogApiError` (`rate_limit`, `not_found`, `network`, `canceled`, `unknown`) com mensagens em português. Atualizou a TECH_SPEC para documentar o tipo `canceled`.
- **Ajustes feitos pelo aluno:** revisar se a mensagem de rate limit aparece apenas em 403/429 reais e confirmar que nenhum token foi adicionado ao código.
- **Verificação pelo aluno:** `npm run build` e `npm run lint` passaram; na aba Network, `q` deve conter `repo:isaave/Projeto6_GitHubBlog is:issue` codificado.

---

## Evidência 6 — Hooks e utils (TASK-05, 2026-11-24)

- **Contexto/prompt:** implementar a TASK-05 com `useDebouncedValue`, `useProfile`, `useIssues`, `useIssue`, datas relativas e resumo de Markdown.
- **Objetivo:** isolar estados assíncronos e cancelamento fora dos componentes de interface.
- **Resultado do OpenCode:** criou `useAsyncData.ts` (genérico, com `requestId`, `AbortController` e `reload`), wrappers `useProfile`/`useIssues`/`useIssue`, `useDebouncedValue` (500 ms da config) e `utils/format.ts`. Adicionou em `apiError.ts` um type guard para não perder erros já convertidos pelo serviço.
- **Ajustes feitos pelo aluno:** o lint apontou aviso de `setState` síncrono no efeito; o estado de carregamento passou a ser derivado no render pela comparação de `requestId`. Confirmou com Node que `formatDistanceToNow(..., ptBR, addSuffix)` gera "há 2 dias".
- **Verificação pelo aluno:** `npm run build` e `npm run lint` sem erros nem avisos; conferir no navegador que digitar no campo não dispara requisição antes de 500 ms (TASK-07).

---

## Evidência 7 — Componentes de layout e estados (TASK-06, 2026-11-24)

- **Contexto/prompt:** criar Header, ProfileCard, LoadingState, ErrorState e EmptyState conforme TASK-06 e tokens do Figma.
- **Objetivo:** preparar a camada visual reutilizável antes de integrar o feed.
- **Resultado do OpenCode:** criou `public/cover.svg` (arte vetorial com malha/órbitas), `Header.tsx`, `ProfileCard.tsx`, `LoadingState.tsx` (variantes profile/cards/post), `ErrorState.tsx` (com mensagem específica para rate limit e botão Tentar novamente) e `EmptyState.tsx`. Avatar com `alt`, link externo com `rel="noreferrer"`, `role="status"`/`role="alert"` nos estados.
- **Ajustes feitos pelo aluno:** build acusou que `lucide-react@1.79` não exporta mais `Github`; foi criado `GitHubIcon.tsx` com SVG próprio e os imports foram corrigidos.
- **Verificação pelo aluno:** `npm run build` e `npm run lint` sem erros; validar contraste e sobreposição do card no navegador após a TASK-07.

---

## Evidência 8 — Home integrada e validação no navegador (TASK-07, 2026-11-24)

- **Contexto/prompt:** implementar a TASK-07: SearchInput, IssueCard, IssueList, Pagination e HomePage conectando os Hooks.
- **Objetivo:** entregar o fluxo Home → Busca → Paginação com estados claros.
- **Resultado do OpenCode:** criou os quatro componentes e a HomePage. O campo usa `label`/`htmlFor`, contador `aria-live`, botão de limpar; cards exibem resumo `line-clamp-3`, data relativa e comentários; a paginação desabilita as bordas. `setPage(1)` é chamada a cada alteração do termo; o valor debounced alimenta `useIssues`. Substituiu um `useEffect` que dava aviso de lint por um `displayedPage` derivado no render.
- **Ajustes feitos pelo aluno:** conferir no DevTools se a busca dispara uma requisição após ~500 ms e se `page=2` é enviada ao clicar em Próxima (depende das issues da TASK-02).
- **Verificação pelo aluno:** `npm run build` e `npm run lint` sem erros. No navegador, perfil real apareceu com bio e 17 seguidores; contador mostrou 0 publicações e o estado vazio foi exibido corretamente; console sem erros.

---

## Evidência 9 — Detalhe, Markdown e 404 (TASK-08, 2026-11-24)

- **Contexto/prompt:** implementar a TASK-08 com rota `/post/:number`, MarkdownView, cabeçalho detalhado e fallback de rota inexistente.
- **Objetivo:** completar o terceiro fluxo central da recuperação.
- **Resultado do OpenCode:** criou `PostPage.tsx` (valida o parâmetro, usa `useIssue`, metadados, Voltar com `navigate(-1)` ou `/`, link externo seguro), `MarkdownView.tsx` (react-markdown + remark-gfm com componentes estilizados e links `target="_blank" rel="noreferrer"`) e `NotFoundPage.tsx`. Registrou as três rotas no `App.tsx`.
- **Ajustes feitos pelo aluno:** o build gerou aviso de chunk >500 kB; `PostPage` passou a ser carregado com `React.lazy` + `Suspense`, separando 169 kB do bundle inicial. Removeu `useNavigate` não usado no componente externo.
- **Verificação pelo aluno:** `npm run build` e `npm run lint` sem erros nem avisos. No navegador, `/post/abc` mostrou 404 com link de retorno e `/post/1` mostrou mensagem de não encontrado com botão Tentar novamente (404 real da API sem issues).

---

## Evidência 10 — Testes automatizados (TASK-09, 2026-11-24)

- **Contexto/prompt:** configurar Vitest + Testing Library + MSW e cobrir busca/paginação, detalhe com Markdown e estados de falha conforme TECH_SPEC.
- **Objetivo:** produzir pelo menos três cenários verificáveis com mocks da API do GitHub.
- **Resultado do OpenCode:** adicionou configuração de teste em `vite.config.ts`, setup com MSW 3, handlers e dados mockados (12 issues) e quatro testes: perfil/feed, debounce+paginação, `/post/12` com Markdown e rate limit com retry. Documentou a estratégia na TECH_SPEC.
- **Ajustes feitos pelo aluno:** os testes falhavam com erro de rede porque o jsdom bloqueia CORS no adapter XHR; passou-se a forçar `githubApi.defaults.adapter = 'http'`. O TypeScript apontou `onUnhandledRequest` inexistente no MSW 3; substituído por `onUnhandledFrame: 'error'`.
- **Verificação pelo aluno:** `npm run test` → 4/4 passando; `npm run build` e `npm run lint` sem erros.

---

> As próximas evidências serão adicionadas a cada tarefa implementada, com o prompt usado, o resultado, os ajustes manuais e a forma de verificação.

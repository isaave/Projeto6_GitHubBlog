# TECH_SPEC — GitHub Blog

**Versão:** 1.0 · **Data:** 2026-11-24
**Rastreabilidade:**Este documento referencia os IDs de `docs/PRD_SPEC.md` (RF-xx / RN-xx).

---

## 1. Tecnologias e decisões

| Tecnologia | Versão/decisão | Motivo (RF/RN atendido) |
| --- | --- | --- |
| React + Vite | React 19, Vite 7, `.tsx` | RF-09, RF-12 — SPA com roteamento sem reload. |
| TypeScript | `strict: true` | RN-08, RF-16 — contratos de API e props tipados, sem `any`. |
| Tailwind CSS | v4 com `@tailwindcss/vite` | RF-15 — tokens via `@theme` em `src/styles/index.css`; documentação oficial consultada. |
| Axios | instância única com `baseURL=https://api.github.com` | RF-01, RF-05, RF-10 — interceptors/headers e `params`. |
| React Router DOM | v7 (`BrowserRouter`, `Routes`, `useNavigate`, `useParams`) | RF-09, RF-12, RF-16 — rotas e 404. |
| react-markdown + remark-gfm | v10 + v4 | RF-11, RN-07 — Markdown seguro, sem `dangerouslySetInnerHTML`. |
| date-fns | `formatDistanceToNow` + `ptBR` | RF-08, RF-12 — datas relativas em português. |
| lucide-react | ícones | RF-12, RF-16 — ícones com `aria-hidden`, rótulos textuais nos controles. |
| Vitest + Testing Library + MSW | testes de serviços e componentes | RF-13, RF-14, seção 5 da spec — 3+ cenários verificáveis. |

**Decisões consultadas em documentação oficial (2026-11-24):**
- Tailwind v4: instalação com `@tailwindcss/vite`, `@import "tailwindcss";` e plugin no `vite.config.ts`.
- react-markdown: seguro por padrão; `remark-gfm` adiciona tabelas/tasklists; manter `urlTransform` padrão para links seguros (RN-07/RN-09).

## 2. Arquitetura e fluxo de dados

```
App.tsx (BrowserRouter)
 ├── /            → HomePage
 │    ├── useProfile()          → githubApi.getProfile()      [RF-01, RF-02]
 │    ├── useDebouncedValue()   → 500 ms                      [RF-06]
 │    └── useIssues(term,page)  → githubApi.searchIssues()    [RF-04, RF-05, RF-07, RF-13, RF-14]
 │         ├── SearchInput → estado controlado (debounce)     [RF-05, RF-06, RF-16]
 │         ├── ProfileCard / Header                          [RF-02]
 │         ├── IssueList → IssueCard[]                       [RF-08, RF-09]
 │         └── Pagination                                    [RF-07]
 └── /post/:number → PostPage
 │    └── useIssue(number) → githubApi.getIssue()             [RF-10, RF-13, RF-14]
 │         ├── PostHeader (Voltar, Ver no GitHub, metadados)  [RF-12]
 │         └── MarkdownView (react-markdown + remark-gfm)     [RF-11]
 └── * → NotFoundPage                                         [RF-16]
```

**Fluxo de requisição:** componente → custom Hook → serviço Axios → API GitHub → tipo validado em `types/` → estado `{data, status, error}` → renderização.

**Cancelamento:** cada serviço recebe um `AbortSignal` opcional. Hooks criam `AbortController` no `useEffect` e chamam `abort()` no cleanup, evitando que resposta antiga sobrescreva a recente (RF-06, RN-08).

## 3. Estrutura de diretórios

```
src/
├── App.tsx
├── main.tsx
├── config/blog.ts              # username, repo, perPage, debounceMs (RN-10)
├── services/githubApi.ts       # instância Axios + getProfile/searchIssues/getIssue
├── hooks/
│   ├── useProfile.ts
│   ├── useIssues.ts
│   ├── useIssue.ts
│   └── useDebouncedValue.ts
├── types/github.ts             # GitHubUser, GitHubIssue, IssueSearchResponse, ApiErrorKind
├── utils/
│   ├── format.ts               # datas relativas, fallback de texto, resumo sem Markdown
│   └── apiError.ts             # mapeia AxiosError → 404 | rate_limit | network | unknown
├── components/
│   ├── Header.tsx
│   ├── ProfileCard.tsx
│   ├── SearchInput.tsx
│   ├── IssueCard.tsx
│   ├── IssueList.tsx
│   ├── Pagination.tsx
│   ├── MarkdownView.tsx
│   ├── LoadingState.tsx
│   ├── ErrorState.tsx
│   └── EmptyState.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── PostPage.tsx
│   └── NotFoundPage.tsx
└── styles/index.css            # @import "tailwindcss" + @theme tokens + markdown styles
```

`content/issues/` (raiz) guarda os 10 arquivos Markdown de apoio usados para cadastrar as issues no GitHub (RF-03) — a app **não** lê esses arquivos.

## 4. Interfaces TypeScript

```ts
export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  company?: string | null;
  public_repos?: number;
}

export interface GitHubIssueAuthor {
  login: string;
  avatar_url?: string;
  html_url?: string;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string | null;
  created_at: string;
  comments: number;
  html_url: string;
  user: GitHubIssueAuthor | null;
  pull_request?: unknown; // presente => PR; filtrado (RN-03)
}

export interface IssueSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubIssue[];
}

export type ApiErrorKind = 'rate_limit' | 'not_found' | 'network' | 'canceled' | 'unknown';

export interface BlogApiError {
  kind: ApiErrorKind;
  status?: number;
  message: string;
}
```

Todas as funções de serviço retornam `Promise<T>`; falhas são convertidas em `BlogApiError` antes de chegar aos componentes.

## 5. Serviços Axios, headers e erros

```ts
// src/services/githubApi.ts (esqueleto)
const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
});

export async function getProfile(signal?: AbortSignal): Promise<GitHubUser>;
export async function searchIssues(params: {
  term: string; page: number; perPage: number; signal?: AbortSignal;
}): Promise<IssueSearchResponse>;
export async function getIssue(number: number, signal?: AbortSignal): Promise<GitHubIssue>;
```

- `searchIssues` monta `q` com `params: { q, sort: 'created', order: 'desc', page, per_page }` — Axios codifica a query (RN-06).
- `q = [term.trim(), `repo:${username}/${repo}`, 'is:issue'].filter(Boolean).join(' ')` (RN-01, RN-03, RN-04).
- Erros mapeados em `utils/apiError.ts`: 403/429 com header de rate limit → `rate_limit`; 404 → `not_found`; sem resposta → `network`; demais → `unknown` (RN-08, RF-14).
- Cancelamento (`ERR_CANCELED`) vira `kind: 'canceled'` e é ignorado pelos Hooks, nunca aparecendo como erro visível.

## 6. Hooks, roteamento, busca e paginação

| Hook | Responsabilidade | IDs |
| --- | --- | --- |
| `useDebouncedValue<T>(value, delay)` | retorna valor estável após 500 ms | RF-06 |
| `useProfile()` | `{ profile, status, error, reload }` | RF-01, RF-02, RF-13 |
| `useIssues(term, page)` | `{ issues, total, status, error, reload }`; cancela requisição anterior; reseta `page` quando `term` muda | RF-04, RF-05, RF-07, RF-13, RF-14 |
| `useIssue(number)` | `{ issue, status, error, reload }` | RF-10, RF-13 |

- **Debounce:** `SearchInput` mantém o valor imediato; `HomePage` usa `useDebouncedValue` antes de passar o termo ao `useIssues`. Invalidação de página é feita no evento de mudança do input (`setPage(1)`).
- **Paginação:** `total_count` da API define `totalPages = Math.ceil(total / perPage)`; `Pagination` desabilita Anterior em `page === 1` e Próxima em `page === totalPages` (RN-05, RF-07).
- **Rotas:** `/`, `/post/:number`, `*` para 404; `useParams` valida `Number.isInteger` e positivo, senão renderiza 404 (RF-09, RF-16).
- Botão Voltar: `navigate(-1)` quando há histórico interno, senão `navigate('/')` (RF-12).

## 7. Renderização de Markdown

`<Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>` com componentes customizados para `a` (sempre `target="_blank" rel="noreferrer"`), `pre`, `code`, `h1`-`h3`, `ul`, `ol`, `blockquote` e `table`, estilizados por classes Tailwind. HTML bruto permanece escapado; `urlTransform` padrão é mantido (RN-07, RF-11, RN-09).

Resumo do card: `body` passa por remoção de blocos de código, markdown syntax e links, colapsado em `line-clamp-3`; `body` nulo exibe "Sem conteúdo disponível." (RN-07).

## 8. Acessibilidade

- `<label htmlFor="issue-search">` real; `aria-live="polite"` no contador e nos estados.
- Ícones `aria-hidden="true"`; botões com texto visível ou `aria-label`.
- `focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base-background`.
- Avatar com `alt` descritivo; link externo com texto "Ver perfil no GitHub" e "Ver no GitHub".
- `role="alert"` em `ErrorState`; contraste mínimo AA com tokens do Figma.

## 9. Estratégia de testes

Framework: Vitest + Testing Library + jsdom + MSW 3 (mock de `https://api.github.com`). Como o jsdom aplica CORS antes da interceptação do XHR, `src/test/setup.ts` força `githubApi.defaults.adapter = 'http'`; a opção do MSW 3 é `onUnhandledFrame: 'error'`.

| Cenário | ID | Verificação |
| --- | --- | --- |
| Perfil e feed renderizam dados reais do mock | RF-01, RF-02, RF-04 | Espera avatar/nome/bio/seguidores e 6 cards. |
| Busca com debounce e paginação | RF-05, RF-06, RF-07 | Digitar termo → 1 chamada ao Search API com `q` codificado; clique em Próxima → `page=2`. |
| Detalhe por rota direta e erro/limite | RF-10, RF-11, RF-13, RF-14 | Renderizar `/post/12` com MemoryRouter → título + Markdown; 403 → mensagem de limite + Tentar novamente. |

Comandos: `npm run test`, `npm run build`, `npm run lint` (quando configurado), verificação manual no navegador em 390/768/1280 px.

## 10. Segurança e configuração

- Nenhum segredo no repositório; nenhuma variável `VITE_` com token (RN-09).
- `src/config/blog.ts` é a única fonte de `username`, `repo`, `perPage`, `debounceMs` (RN-10).
- Links externos sempre `target="_blank" rel="noreferrer"` (RF-16).

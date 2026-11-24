# GitHub Blog

Blog pessoal construído como projeto de **recuperação da disciplina Single Page Application**. O perfil do autor vem da API pública do GitHub e as **issues deste repositório** são as publicações do blog.

- **Repositório:** https://github.com/isaave/Projeto6_GitHubBlog
- **Referência visual (Figma):** https://www.figma.com/design/UklolDw90CmcDAj9piQVUJ/GitHub-Blog--Community---Copy-?node-id=2-1297
- **Deploy:** _a publicar (Vercel/Netlify)_

## Proposta

Transformar um repositório público em um blog SPA:

1. **Home** — perfil real do GitHub (avatar, nome, bio, @login, seguidores, link externo), campo de busca e grade de publicações com paginação.
2. **Busca** — usa a GitHub Search API com `is:issue`, debounce de 500 ms e paginação real por `page`/`per_page`.
3. **Detalhe** — rota `/post/:number`, requisição individual da issue e corpo renderizado em Markdown.

Não há backend próprio, banco de dados, autenticação ou edição de posts pela aplicação.

## Stack

| Camada | Tecnologia |
| --- | --- |
| UI | React 19 + Vite 8 |
| Linguagem | TypeScript strict |
| Estilo | Tailwind CSS v4 (`@tailwindcss/vite`) com tokens do Figma |
| HTTP | Axios (instância única, `baseURL=https://api.github.com`) |
| Rotas | React Router DOM |
| Markdown | react-markdown + remark-gfm |
| Datas | date-fns (pt-BR) |
| Ícones | lucide-react ( marca GitHub em SVG próprio ) |
| Testes | Vitest + Testing Library + MSW |
| IA | OpenCode (ver `docs/AI_USAGE.md`) |

## Configuração

Os parâmetros públicos ficam centralizados em `src/config/blog.ts`:

```ts
export const blogConfig = {
  username: 'isaave',
  repo: 'Projeto6_GitHubBlog',
  perPage: 6,
  debounceMs: 500,
} as const
```

**Nenhum token GitHub é usado ou armazenado.** A aplicação funciona somente com a API pública e não possui variáveis `VITE_*` secretas (RN-09).

## Executando localmente

```bash
git clone https://github.com/isaave/Projeto6_GitHubBlog.git
cd Projeto6_GitHubBlog
npm install
npm run dev
```

Abra `http://localhost:5173`.

### Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | checagem de tipos + build de produção |
| `npm run preview` | serve o build localmente |
| `npm run test` | executa os testes com Vitest |
| `npm run lint` | lint com oxlint |

> Para publicar em Vercel/Netlify, configure o build com `npm run build`, diretório `dist` e redirect de SPA (`/*` → `/index.html`) para que `/post/:number` funcione em acesso direto.

## Estrutura

```
src/
├── App.tsx                 # rotas /, /post/:number e 404
├── config/blog.ts          # username, repo, perPage, debounceMs
├── services/githubApi.ts   # Axios + getProfile/searchIssues/getIssue
├── hooks/                  # useAsyncData, useProfile, useIssues, useIssue, useDebouncedValue
├── types/github.ts         # GitHubUser, GitHubIssue, resposta paginada, erros
├── utils/                  # apiError.ts e format.ts
├── components/             # Header, ProfileCard, SearchInput, IssueCard, IssueList,
│                           # Pagination, MarkdownView, estados de loading/erro/vazio
├── pages/                  # HomePage, PostPage, NotFoundPage
├── styles/index.css        # @theme com tokens do Figma
└── test/                   # setup, MSW e cenários automatizados

content/issues/             # rascunhos Markdown das 10 publicações
docs/                       # PRD_SPEC, TECH_SPEC, TASKS_SPEC e AI_USAGE
```

## Funcionalidades

- [x] Perfil real via Users API, com fallbacks para campos nulos
- [x] Lista de issues recentes sem termo de busca (`repo:... is:issue`)
- [x] Busca na Search API com debounce e normalização do termo
- [x] Paginação real com `page`/`per_page` e botões desabilitados nas bordas
- [x] Cards com título, data relativa, resumo e comentários
- [x] Detalhe em `/post/:number`, inclusive por URL direta
- [x] Markdown com títulos, listas, links, código e tabelas
- [x] Loading, erro, 404, rate limit, resultado vazio e Tentar novamente
- [x] Cancelamento de requisições obsoletas
- [x] Responsividade 375/768/1280 px e acessibilidade
- [x] Testes automatizados (4 cenários)
- [ ] Publicação das 10 issues no repositório (conteúdo pronto em `content/issues/`)
- [ ] Aplicação publicada

## Decisões técnicas

- **Search API para lista vazia e busca:** padroniza paginação e já exclui PRs com `is:issue`.
- **`useAsyncData` genérico:** centraliza loading/erro/reload e cancelamento; hooks específicos apenas adaptam os parâmetros.
- **Erros tipados:** `rate_limit`, `not_found`, `network`, `canceled` e `unknown` com mensagens em pt-BR.
- **Markdown seguro:** `react-markdown` sem HTML bruto e `urlTransform` padrão.
- **Code splitting:** `PostPage` é carregado sob demanda para reduzir o bundle inicial.
- **Tokens no CSS:** Tailwind v4 com `@theme`, sem `tailwind.config.js`.

## Documentação

- `docs/PRD_SPEC.md` — produto, RF-01..RF-16, RN-01..RN-10 e fluxos.
- `docs/TECH_SPEC.md` — arquitetura, interfaces, serviços, hooks e testes.
- `docs/TASKS_SPEC.md` — plano de tarefas com status e commits.
- `docs/AI_USAGE.md` — evidências de uso do OpenCode.
- `AGENTS.md` — instruções para o assistente.

## Testes

```bash
npm run test
```

Cenários cobertos: perfil/feed; debounce e paginação; detalhe com Markdown; rate limit com retry.

## Evidências

Capturas de tela serão adicionadas em `docs/screenshots/` após a publicação das issues.

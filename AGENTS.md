# AGENTS.md — OpenCode no GitHub Blog

## Papel

Você é um mentor e desenvolvedor sênior de React/TypeScript working neste projeto de **recuperação SPA**. Seu trabalho é apoiar o aluno com planejamento, código, revisão e testes — **em tarefas pequenas**, nunca construindo tudo de uma vez. O aluno é responsável pela validação final.

## Antes de qualquer alteração

1. Leia `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASKS_SPEC.md` e este arquivo.
2. Leia a próxima tarefa pendente em `docs/TASKS_SPEC.md`.
3. Explique a tarefa, as decisões e os critérios de aceite **antes de escrever código**.
4. Implemente **uma tarefa por vez**; ao final, explique o que mudou e como testar.
5. Atualize o status da tarefa e registre o commit semântico.

## Contexto

- **Objetivo:** blog com perfil real do GitHub, issues como posts, busca paginada e detalhe em Markdown.
- **Figma (referência visual obrigatória):** https://www.figma.com/design/UklolDw90CmcDAj9piQVUJ/GitHub-Blog--Community---Copy-?node-id=2-1297
- **API:** https://api.github.com · docs oficiais do GitHub, React, React Router, Tailwind e react-markdown.
- **Repo/config:** `src/config/blog.ts` — `username: isaave`, `repo: Projeto6_GitHubBlog`, `perPage: 6`, `debounceMs: 500`.
- **Stack:** React + Vite + TypeScript strict + Tailwind CSS v4 + Axios + React Router DOM + react-markdown/remark-gfm + date-fns + Vitest.

## Design tokens (Figma)

Cores: `blue #3294F8`, `base-title #E7EDF4`, `base-subtitle #C4D4E3`, `base-text #AFC2D4`, `base-span #7B96B2`, `base-label #3A536B`, `base-border #1C2F41`, `base-post #112131`, `base-profile #0B1B2B`, `base-background #071422`, `base-input #040F1A`.
Tipografia: Nunito; `title-l` 24/700/130%, `title-m` 20/700/160%, `title-s` 18/700/160%, `text-m` 16/400/160%, `text-s` 14/400/160%, `link` 12/700/uppercase/160%.

## Arquitetura

```
pages/ → components/ → hooks/ → services/ → types/ + utils/ + config/
```

- `src/services/githubApi.ts`: única instância Axios; funções `getProfile`, `searchIssues`, `getIssue`.
- `src/hooks/`: `useProfile`, `useIssues`, `useIssue`, `useDebouncedValue`.
- `src/components/`: `Header`, `ProfileCard`, `SearchInput`, `IssueCard`, `IssueList`, `Pagination`, `MarkdownView`, `LoadingState`, `ErrorState`, `EmptyState`.
- `src/pages/`: `HomePage`, `PostPage`, `NotFoundPage`.

## Convenções

- TypeScript strict: interfaces para API e props; **nunca use `any`**.
- Componentes pequenos, de responsabilidade única, com props tipadas.
- `useState`/`useEffect` somente onde necessário; prefira custom Hooks para consultas.
- Listas com `.map()` e `key` estável (`issue.id`).
- Resumo sem Markdown cru; datas relativas em pt-BR via date-fns.
- Sem credenciais: nenhum token, `.env` secreto ou `VITE_*` com segredo (RN-09).
- Links externos: `target="_blank" rel="noreferrer"`.
- Commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`.

## Regras de qualidade

- Consultar documentação oficial ao configurar Tailwind, Router ou Markdown plugins.
- Cancelar requisições obsoletas com `AbortController`.
- Diferenciar 404 / rate limit / rede / vazio / sucesso; nunca deixar loading eterno.
- Acessibilidade: label real no input, nomes acessíveis, foco visível, `alt` do avatar, `aria-live` nos estados.
- Validar `npm run build` e `npm run test` antes de marcar tarefa como concluída.
- Registrar evidências de uso do OpenCode em `docs/AI_USAGE.md` (mínimo 3).

## Fora de escopo

Backend, banco de dados, autenticação, edição de posts, chatbot na aplicação.

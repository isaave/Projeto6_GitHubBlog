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

> As próximas evidências serão adicionadas a cada tarefa implementada, com o prompt usado, o resultado, os ajustes manuais e a forma de verificação.

# PRD_SPEC — GitHub Blog (Projeto 06 — Recuperação SPA)

**Versão:** 1.0 · **Data:** 2026-11-24 · **Repositório:** https://github.com/isaave/Projeto6_GitHubBlog
**Referência visual obrigatória:** [Figma — GitHub Blog Community](https://www.figma.com/design/UklolDw90CmcDAj9piQVUJ/GitHub-Blog--Community---Copy-?node-id=2-1297)

---

## 1. Contexto

Em uma SPA de recuperação da disciplina Single Page Application, o aluno deve demonstrar domínio de componentes, TypeScript, consumo de API REST, roteamento e estado assíncrono. A API pública do GitHub é usada como fonte de dados: o perfil do autor vira o cabeçalho e as **issues de um repositório público** viram publicações de um blog.

## 2. Problema

Aplicações estáticas com dados fictícios não comprovam integração real, tratamento de erros nem navegação SPA. É necessário um fluxo verificável de ponta a ponta: perfil real → listagem paginada → busca → leitura do post em rota própria → retorno.

## 3. Objetivo

Entregar um blog funcional, responsivo e acessível, sem backend próprio, no qual:

- o perfil é lido de `GET /users/{username}`;
- as publicações vêm das issues do repositório público do aluno;
- a busca usa a Search API do GitHub com debounce e paginação real no servidor;
- cada publicação é aberta em `/post/:number` com corpo renderizado em Markdown.

## 4. Público-alvo

- **Primário:** estudante/software developer que consome conteúdo técnico rápido em português.
- **Secundário:** avaliador da disciplina, que verifica requisitos, código, documentação e deploy.

## 5. Fluxos principais

### Fluxo A — Home (RF-01, RF-02, RF-04, RF-08)
1. Usuário abre `/`.
2. A app carrega o perfil e as issues mais recentes (`page=1`, `per_page=6`).
3. Enquanto carrega, exibe skeletons/indicador; em falha, exibe `ErrorState` com **Tentar novamente**.
4. Usuário vê avatar, nome, bio, @login, seguidores, link externo e grade de cards.

### Fluxo B — Busca e paginação (RF-05, RF-06, RF-07)
1. Usuário digita no campo com label real "Buscar publicação".
2. Após 500 ms sem digitação, a Search API é chamada com `q="<termo> repo:isaave/Projeto6_GitHubBlog is:issue"`.
3. A página volta para 1; requisições antigas são canceladas via `AbortController`.
4. Controles **Anterior** e **Próxima** navegam páginas reais (`page`/`per_page`).
5. Sem resultados, exibe mensagem e mantém o campo disponível para nova busca.

### Fluxo C — Detalhe e retorno (RF-09 a RF-12)
1. Usuário clica em um card → SPA navega para `/post/:number` (sem reload).
2. A rota busca `GET /repos/{owner}/{repo}/issues/{number}`, inclusive em acesso direto à URL.
3. Cabeçalho mostra título, autor, data relativa, comentários, "Ver no GitHub" e "Voltar".
4. Corpo é renderizado em Markdown (títulos, listas, links, blocos de código).
5. "Voltar" usa `navigate(-1)` com fallback para `/`; rota inexistente cai em 404 com link para Home.

## 6. Requisitos funcionais (RF)

| ID | Requisito | Critério de aceite verificável |
| --- | --- | --- |
| RF-01 | Consumir perfil via `GET /users/{username}` | Dados reais de `isaave` aparecem na Home; requisição visível na aba Network. |
| RF-02 | Exibir avatar, nome, bio, @username, seguidores e link de perfil | Todos os campos presentes; `null`/vazio recebe fallback legível; avatar tem `alt`. |
| RF-03 | Repositório público com ≥ 10 issues autorais | `api.github.com/repos/isaave/Projeto6_GitHubBlog/issues?state=all` retorna ≥ 10 issues com Markdown pertinente. |
| RF-04 | Listar issues recentes com busca vazia | Sem termo, Issues Search API retorna issues em ordem decrescente de criação, sem PRs. |
| RF-05 | Busca textual na Search API | Digitar termo e confirmar dispara `GET /search/issues?q=...`; não é filtro local. |
| RF-06 | Debounce de 500 ms | Digitar rápido gera uma requisição, não uma por tecla; troca de termo reinicia na página 1. |
| RF-07 | Paginação real | Com `per_page=6` e ≥ 10 issues existem 2+ páginas; Anterior/Próxima funcionam e desabilitam nas bordas. |
| RF-08 | Cards de issue | Cada card traz título, data relativa em pt-BR e resumo sem Markdown cru; o número de comentários aparece quando há comentários. |
| RF-09 | Rota dinâmica `/post/:number` | Clique no card abre a URL correta sem reload completo. |
| RF-10 | Detalhe via `GET /repos/{owner}/{repo}/issues/{number}` | Requisição individual ocorre também ao colar a URL diretamente. |
| RF-11 | Markdown no detalhe | Títulos, listas, links e blocos de código do `body` aparecem formatados. |
| RF-12 | Cabeçalho do detalhe e retorno | Título, autor, data, comentários, link externo e botão Voltar funcionam. |
| RF-13 | Loading, erro e vazio | Cada consulta mostra carregando, falha, sem resultados ou sucesso, com **Tentar novamente**. |
| RF-14 | Rate limit | HTTP 403/429 exibe mensagem compreensível e permite nova tentativa; requisições obsoletas são canceladas. |
| RF-15 | Responsividade Tailwind | Layout utilizável em 375/390 px, 768 px e 1280/1440 px, sem scroll horizontal. |
| RF-16 | Acessibilidade e SPA | Labels, nomes acessíveis, foco visível, contraste, 404 tratado, links externos com `rel="noreferrer"`. |

## 7. Regras de negócio (RN)

| ID | Regra |
| --- | --- |
| RN-01 | Perfil e publicações vêm da API do GitHub; nenhum dado fixo substitui as chamadas. |
| RN-02 | Usar `isaave/Projeto6_GitHubBlog`, público, com ≥ 10 issues autorais. |
| RN-03 | Toda consulta de posts usa `is:issue`, excluindo pull requests. |
| RN-04 | Busca vazia = últimas issues em ordem decrescente; estratégia escolhida: Search API com `repo:... is:issue&sort=created&order=desc`. |
| RN-05 | Paginação é feita no servidor por `page`/`per_page`; nunca com `slice()` local. Estado desabilitado é exibido nas bordas. |
| RN-06 | Termo é normalizado (trim/espaços) e passado por `params` do Axios, que codifica a query. |
| RN-07 | Resumo é texto limpo com `line-clamp-4`; corpo ausente mostra "Sem conteúdo disponível.". Links Markdown usam o `urlTransform` seguro padrão. |
| RN-08 | Diferenciar 404, rate limit, erro de rede e vazio; nenhum estado preso em loading. |
| RN-09 | Nenhum token GitHub no código, README, `.env`, variáveis `VITE_*` ou histórico. SPA funciona sem autenticação. |
| RN-10 | `username`, `repo`, `per_page` e `debounceMs` ficam apenas em `src/config/blog.ts`. |

## 8. Escopo

### Incluído
Home com perfil e feed; busca com debounce; paginação; detalhe com Markdown; estados de carregamento/erro/vazio; 404; responsividade; acessibilidade; documentação SPEC; testes automatizados; deploy estático.

### Fora de escopo
Backend próprio, banco de dados, login/autenticação, criação/edição de issues pela app, chatbot, editor de Markdown.

## 9. Requisitos não funcionais

- **Qualidade:** TypeScript strict, sem `any` implícito; componentes pequenos e reutilizáveis.
- **Performance:** debounce, cancelamento de requisições, no máximo uma chamada por intenção do usuário.
- **Disponibilidade:** respeitar limites da API pública; cache local opcional apenas em memória.
- **Compatibilidade:** navegadores modernos; build estático sem variáveis secretas.
- **Manutenibilidade:**SPEC rastreável por IDs; commits semânticos.

## 10. Critérios de aprovação (recuperação)

1. Nota **> 7,0** (≥ 71/100).
2. Três fluxos centrais funcionando: perfil real, listagem/busca paginada de issues reais, detalhe por rota dinâmica com Markdown.
3. `PRD_SPEC.md`, `TECH_SPEC.md`, `TASKS_SPEC.md` entregues, além do repo de issues público.
4. Demonstração individual com explicação das decisões técnicas.

## 11. Decisões de interface

- Tema escuro do Figma: fundo `#071422`, cards `#112131`, profile `#0B1B2B`, destaque azul `#3294F8`.
- Fonte **Nunito** importada no `index.html`; títulos com line-height 130%, textos 160%.
- Banner decorativo no topo com logo **GITHUB BLOG** centralizada (tipografia Nunito Bold 33 px, azul `#3294F8`); card de perfil sobreposto ao banner.
- Container centralizado de 1280 px; avatar de 224 px no perfil.
- Busca em largura total acima da grade, com contador de publicações ao lado do label "Publicações".
- Grid responsivo: 1 coluna no mobile e 2 colunas a partir de 768 px (conforme capturas do Figma).
- Detalhe com cabeçalho em card próprio e Markdown direto no fundo (bloco de código com fundo `#112131`).
- Foco visível com `focus-visible:ring-2 focus-visible:ring-brand` em todos os controles interativos.

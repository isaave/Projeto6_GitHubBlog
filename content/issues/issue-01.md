## A ideia

Um blog não precisa de um CMS para começar. Se o conteúdo já vive no GitHub, as **issues** podem funcionar como publicações: cada issue tem título, corpo em Markdown, data, autor e comentários.

Neste projeto, a API pública do GitHub fornece tudo:

- `GET /users/{username}` → perfil do autor;
- `GET /search/issues` → lista e busca de posts;
- `GET /repos/{owner}/{repo}/issues/{number}` → detalhe de um post.

## Por que issues?

1. Não é necessário backend próprio nem banco de dados.
2. O Markdown é nativo, então títulos, listas e código já funcionam.
3. A edição acontece na interface do GitHub, sem um painel administrativo.

> O resultado é uma SPA estática que consome dados reais e pode ser publicada em qualquer host de arquivos estáticos.

Mais informações na [documentação da API do GitHub](https://docs.github.com/rest/issues/issues).

## Consulta

A paginação acontece no servidor, com `page` e `per_page`:

```txt
GET /search/issues?q=repo:isaave/Projeto6_GitHubBlog%20is:issue&sort=created&order=desc&page=2&per_page=6
```

## Montando os parâmetros

```ts
api.get('/search/issues', {
  params: {
    q: [term.trim(), `repo:${username}/${repo}`, 'is:issue'].join(' '),
    sort: 'created',
    order: 'desc',
    page,
    per_page: 6,
  },
})
```

O Axios codifica a query, então não é necessário concatenar strings manualmente.

## Número de páginas

```ts
const totalPages = Math.ceil(totalCount / perPage)
```

- Anterior desabilitado quando `page === 1`;
- Próxima desabilitado quando `page === totalPages`.

## Por que não usar `slice()`?

Fatiar a primeira resposta apenas simula paginação: não reduz transferência de dados e quebra quando a busca muda. A paginação real usa os parâmetros da API.

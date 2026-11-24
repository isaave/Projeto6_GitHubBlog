## Rotas da aplicação

```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/post/:number" element={<PostPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

O parâmetro dinâmico `:number` é lido com `useParams()`.

## Acesso direto

Ao colar `/post/12` na barra de endereço, o servidor estático precisa devolver `index.html` para que o React Router assuma a rota. Em Vercel/Netlify isso é feito com redirect para SPA.

## Validando o parâmetro

```tsx
const { number } = useParams<{ number: string }>()
const issueNumber = Number(number)

if (!Number.isSafeInteger(issueNumber) || issueNumber <= 0) {
  return <NotFoundPage />
}
```

## Navegação

- clique no card: `<Link to={`/post/${issue.id}`}>`;
- voltar: `navigate(-1)` com fallback para `/`;
- links externos: `target="_blank" rel="noreferrer"`.

Nenhuma dessas ações recarrega a página inteira.

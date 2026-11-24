## Requisições obsoletas

Ao digitar na busca ou trocar de página, uma requisição antiga pode terminar depois da nova e sobrescrever a tela com dados velhos.

## AbortController

O Axios aceita um `signal`:

```ts
export function getProfile(signal?: AbortSignal) {
  return api.get('/users/isaave', { signal })
}
```

No efeito:

```ts
useEffect(() => {
  const controller = new AbortController()

  getProfile(controller.signal)
    .then(setProfile)
    .catch((error) => {
      if (error.kind === 'canceled') return
      setError(error)
    })

  return () => controller.abort()
}, [])
```

## Erros mapeados

| Situação | Tipo |
| --- | --- |
| 403/429 | `rate_limit` |
| 404 | `not_found` |
| sem resposta | `network` |
| cancelado | `canceled` |

Assim a interface mostra mensagens compreensíveis e nunca fica em carregamento eterno.

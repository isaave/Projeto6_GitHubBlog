## O problema

Respostas de API podem conter campos nulos. Usar `any` esconde esse fato e permite erros em tempo de execução.

```ts
// Evite
const user: any = await response.json()
```

## Uma interface explícita

```ts
export interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  followers: number
}
```

Agora o compilador obriga você a tratar `name` e `bio` como possivelmente nulos.

## Fallbacks

```ts
function valueOrFallback(value: string | null, fallback: string): string {
  return value?.trim() ? value.trim() : fallback
}

valueOrFallback(user.bio, 'Sem bio informada.')
```

## Checklist

- [x] `strict: true` no `tsconfig`;
- [x] interfaces para perfil, issue e resposta paginada;
- [x] nenhum `any` implícito;
- [x] campos nulos tratados na interface.

Ver também: [TypeScript — Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).

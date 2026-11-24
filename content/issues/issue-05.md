## O que é debounce

Debounce atrasa a execução de uma função até que ela deixe de ser chamada por um intervalo. Em busca, isso evita uma requisição por tecla.

## Implementação

```ts
export function useDebouncedValue<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])

  return debounced
}
```

## Uso na Home

1. O input controlado guarda o valor imediato.
2. `useDebouncedValue` espera 500 ms.
3. O valor estabilizado alimenta a consulta à API.
4. Qualquer alteração no termo reinicia a página para 1.

> Resultado: digitar `React` gera **uma** chamada, não cinco.

Cuidado para cancelar a requisição anterior quando o termo mudar — veja a publicação sobre `AbortController`.

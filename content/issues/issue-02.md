## Props e estado

Em React, **props** são dados que o componente recebe de fora, enquanto o **estado** é dado que ele administra internamente.

```tsx
interface IssueCardProps {
  title: string
  comments: number
}

export function IssueCard({ title, comments }: IssueCardProps) {
  return <article>{title} — {comments} comentários</article>
}
```

O componente é puro: com as mesmas props, produz o mesmo resultado.

## Quando usar estado?

- valores que mudam por interação do usuário, como o campo de busca;
- dados vindos de uma API assíncrona;
- paginação e seleção de itens.

```tsx
const [term, setTerm] = useState('')

<input value={term} onChange={(event) => setTerm(event.target.value)} />
```

## Resumo

| Conceito | Origem | Quem altera |
| --- | --- | --- |
| Props | componente pai | pai |
| Estado | `useState` | próprio componente |

Manter essa separação evita componentes difíceis de testar e reutilizar.

## Renderização segura

O `react-markdown` converte Markdown em elementos React sem `dangerouslySetInnerHTML`. HTML bruto continua escapado por padrão.

```tsx
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

<Markdown remarkPlugins={[remarkGfm]}>{issue.body}</Markdown>
```

Com `remark-gfm` ganhamos tabelas, listas de tarefas e links automáticos.

## Componentes customizados

```tsx
const components = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer">{children}</a>
  ),
}
```

Mantenha o `urlTransform` padrão: ele bloqueia protocolos perigosos como `javascript:`.

## Resumo no card

O corpo completo vai para o detalhe. No card, removemos blocos de código e sintaxe Markdown antes de aplicar `line-clamp-4`, evitando texto cru e blocos longos.

Referência: [react-markdown no GitHub](https://github.com/remarkjs/react-markdown).

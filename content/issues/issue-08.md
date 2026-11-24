## Tailwind v4 com Vite

```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({ plugins: [react(), tailwindcss()] })
```

```css
@import "tailwindcss";
```

## Tokens do Figma

```css
@theme {
  --color-brand: #3294f8;
  --color-base-background: #071422;
  --color-base-post: #112131;
  --font-sans: "Nunito", sans-serif;
}
```

Depois disso, classes como `bg-base-background` e `text-brand` ficam disponíveis.

## Responsividade

| Largura | Colunas do grid |
| --- | --- |
| ~375 px | 1 |
| ~768 px | 2 |
| ~1280 px | 3 |

Evite rolagem horizontal: use `min-w-0` em containers flexíveis e `overflow-x-auto` apenas em blocos de código e tabelas.

Fonte: [Tailwind CSS — Using Vite](https://tailwindcss.com/docs/installation/using-vite).

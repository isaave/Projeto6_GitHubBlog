## Labels e nomes acessíveis

Todo campo precisa de um label associado:

```tsx
<label htmlFor="issue-search">Buscar publicação</label>
<input id="issue-search" type="search" />
```

Ícones são decorativos: `aria-hidden="true"`. Botões com ícone precisam de texto visível ou `aria-label`.

## Foco

```css
:focus-visible {
  outline: 2px solid #3294f8;
  outline-offset: 2px;
}
```

## Estados assíncronos

- carregando: `role="status"` e `aria-live="polite"`;
- erro: `role="alert"` e mensagem com ação de repetir;
- vazio: `role="status"` com orientação clara.

## Contraste e estrutura

- títulos em `h1`/`h2`/`h3` na ordem;
- texto principal com cor clara sobre fundo escuro;
- data em `<time dateTime="...">`;
- avatar com `alt` descritivo.

Acessibilidade não é extra: ela faz parte do critério de aceite de cada tela.

import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { valueOrFallback } from '../utils/format'

interface MarkdownViewProps {
  content: string | null
}

/** Componentes customizados para o Markdown do post (RF-11, RN-07). */
const components: Components = {
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-brand underline decoration-brand/50 underline-offset-2 hover:decoration-brand focus-visible:ring-2 focus-visible:ring-brand"
    >
      {children}
    </a>
  ),
  h1: ({ children }) => (
    <h2 className="mb-4 mt-10 text-title-l font-bold text-base-title">{children}</h2>
  ),
  h2: ({ children }) => (
    <h3 className="mb-3 mt-8 text-title-m font-bold text-base-title">{children}</h3>
  ),
  h3: ({ children }) => (
    <h4 className="mb-3 mt-6 text-title-s font-bold text-base-title">{children}</h4>
  ),
  p: ({ children }) => <p className="my-4 text-text-m text-base-text">{children}</p>,
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-text-m text-base-text">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-text-m text-base-text">{children}</ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-brand bg-base-input/60 px-5 py-3 text-base-subtitle">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded border border-base-border bg-base-input p-4 text-text-s text-base-subtitle">
      {children}
    </pre>
  ),
  code: ({ className, children }) => (
    <code className={`${className ?? ''} rounded bg-base-input px-1.5 py-0.5 text-brand`}>
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-text-s">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-base-border bg-base-input px-3 py-2 text-left font-bold text-base-title">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-base-border px-3 py-2 text-base-text">{children}</td>
  ),
  img: ({ src, alt }) => (
    <img src={src} alt={alt ?? ''} className="my-6 max-w-full rounded" loading="lazy" />
  ),
}

/** Renderiza o corpo da issue como Markdown, sem HTML bruto (seguro por padrão). */
export function MarkdownView({ content }: MarkdownViewProps) {
  if (!content?.trim()) {
    return <p className="text-text-m text-base-span">Sem conteúdo disponível.</p>
  }

  return (
    <div className="break-words">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {valueOrFallback(content, '')}
      </Markdown>
    </div>
  )
}

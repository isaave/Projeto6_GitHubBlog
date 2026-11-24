import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  message?: string
}

/** Resultado vazio de busca ou feed (RF-13). */
export function EmptyState({
  title = 'Nenhuma publicação encontrada',
  message = 'Tente outro termo de busca ou remova o filtro para ver todas as publicações.',
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-3 rounded-post border border-dashed border-base-border bg-base-post/50 px-6 py-14 text-center"
    >
      <SearchX className="size-10 text-base-span" aria-hidden="true" />
      <h2 className="text-title-s font-bold text-base-title">{title}</h2>
      <p className="max-w-lg text-text-m text-base-text">{message}</p>
    </div>
  )
}

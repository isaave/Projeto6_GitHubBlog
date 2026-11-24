import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

/** Paginação real no servidor, com estados desabilitados nas bordas (RF-07/RN-05). */
export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const canGoBack = page > 1
  const canGoForward = page < totalPages

  return (
    <nav
      aria-label="Paginação de publicações"
      className="mt-10 flex flex-wrap items-center justify-center gap-4"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={!canGoBack}
        className="inline-flex items-center gap-2 rounded border border-base-border bg-base-post px-4 py-2 text-text-s font-bold text-base-subtitle transition-colors hover:enabled:border-brand hover:enabled:text-base-title focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Anterior
      </button>

      <p aria-live="polite" className="text-text-s text-base-span">
        Página <strong className="font-bold text-base-title">{page}</strong> de{' '}
        <strong className="font-bold text-base-title">{totalPages}</strong>
      </p>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={!canGoForward}
        className="inline-flex items-center gap-2 rounded border border-base-border bg-base-post px-4 py-2 text-text-s font-bold text-base-subtitle transition-colors hover:enabled:border-brand hover:enabled:text-base-title focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-40"
      >
        Próxima
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </nav>
  )
}

import { AlertTriangle, RotateCcw } from 'lucide-react'
import type { BlogApiError } from '../types/github'

interface ErrorStateProps {
  error: BlogApiError | null
  onRetry: () => void
  context?: string
}

/** Erro acessível com ação de nova tentativa (RF-13, RF-14, RN-08). */
export function ErrorState({
  error,
  onRetry,
  context = 'dos dados',
}: ErrorStateProps) {
  const title =
    error?.kind === 'rate_limit'
      ? 'Muitas requisições ao GitHub'
      : error?.kind === 'not_found'
        ? 'Conteúdo não encontrado'
        : 'Não foi possível carregar'

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center gap-4 rounded-post border border-base-border bg-base-post px-6 py-12 text-center"
    >
      <AlertTriangle className="size-10 text-brand" aria-hidden="true" />
      <div>
        <h2 className="text-title-s font-bold text-base-title">{title}</h2>
        <p className="mt-2 max-w-lg text-text-m text-base-text">
          {error?.message ?? 'Ocorreu um erro inesperado.'} Verifique {' '}
          {context} e tente novamente.
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded border border-brand bg-brand/10 px-5 py-2 text-link font-bold uppercase tracking-widest text-brand transition-colors hover:bg-brand hover:text-base-input focus-visible:ring-2 focus-visible:ring-brand"
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Tentar novamente
      </button>
    </div>
  )
}

interface LoadingStateProps {
  variant?: 'profile' | 'cards' | 'post'
  cardCount?: number
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-base-border/70 ${className}`} />
}

/** Indicadores visuais de carregamento por seção (RF-13). */
export function LoadingState({
  variant = 'cards',
  cardCount = 6,
}: LoadingStateProps) {
  if (variant === 'profile') {
    return (
      <div className="container-blog relative z-10 -mt-12 sm:-mt-16" role="status" aria-live="polite">
        <span className="sr-only">Carregando perfil do GitHub…</span>
        <div className="flex flex-col gap-6 rounded-post border border-base-border bg-base-profile p-6 sm:flex-row sm:p-8">
          <Skeleton className="size-24 rounded-full sm:size-36" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'post') {
    return (
      <div className="container-blog py-12" role="status" aria-live="polite">
        <span className="sr-only">Carregando publicação…</span>
        <div className="space-y-4 rounded-post border border-base-border bg-base-profile p-6 sm:p-10">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-3 pt-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Carregando publicações…</span>
      {Array.from({ length: cardCount }, (_, index) => (
        <div
          key={index}
          className="flex h-64 flex-col gap-4 rounded-post border border-base-border bg-base-post p-6"
        >
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-auto h-4 w-28" />
        </div>
      ))}
    </div>
  )
}

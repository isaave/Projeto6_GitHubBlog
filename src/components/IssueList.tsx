import type { BlogApiError, GitHubIssue } from '../types/github'
import type { AsyncStatus } from '../hooks/useAsyncData'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { IssueCard } from './IssueCard'
import { LoadingState } from './LoadingState'

interface IssueListProps {
  issues: GitHubIssue[]
  status: AsyncStatus
  error: BlogApiError | null
  onRetry: () => void
  hasSearchTerm: boolean
}

/** Grade de posts com os quatro estados da consulta (RF-04, RF-08, RF-13). */
export function IssueList({
  issues,
  status,
  error,
  onRetry,
  hasSearchTerm,
}: IssueListProps) {
  if (status === 'loading') {
    return <LoadingState variant="cards" />
  }

  if (status === 'error') {
    return (
      <ErrorState
        error={error}
        onRetry={onRetry}
        context={hasSearchTerm ? 'da busca' : 'das publicações'}
      />
    )
  }

  if (issues.length === 0) {
    return (
      <EmptyState
        title={
          hasSearchTerm
            ? 'Nenhuma publicação encontrada'
            : 'Ainda não há publicações'
        }
        message={
          hasSearchTerm
            ? 'Tente outro termo ou limpe o campo de busca para ver todas as publicações.'
            : 'Quando houver issues neste repositório, elas aparecerão aqui.'
        }
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-[52px]">
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  )
}

import { ArrowUpRight, CalendarDays, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { GitHubIssue } from '../types/github'
import { formatRelativeDate, summarizeBody } from '../utils/format'

interface IssueCardProps {
  issue: GitHubIssue
}

/** Resumo clicável de uma issue/post (RF-08, RF-09). */
export function IssueCard({ issue }: IssueCardProps) {
  return (
    <article className="group flex min-h-64 flex-col rounded-post border border-base-border bg-base-post p-6 transition-colors hover:border-brand/60 focus-within:border-brand">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-title-s font-bold leading-snug text-base-title">
          <Link
            to={`/post/${issue.number}`}
            aria-label={`Ler publicação ${issue.title}`}
            className="hover:text-brand focus-visible:ring-2 focus-visible:ring-brand"
          >
            {issue.title}
            <span className="sr-only"> (abre a publicação)</span>
          </Link>
        </h3>
        <ArrowUpRight
          className="mt-1 size-5 shrink-0 text-base-span transition-colors group-hover:text-brand"
          aria-hidden="true"
        />
      </div>

      <p className="mt-4 line-clamp-3 text-text-m text-base-text">
        {summarizeBody(issue.body)}
      </p>

      <footer className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-text-s text-base-span">
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="size-4" aria-hidden="true" />
          <time dateTime={issue.created_at}>
            {formatRelativeDate(issue.created_at)}
          </time>
        </span>
        <span className="inline-flex items-center gap-2">
          <MessageSquare className="size-4" aria-hidden="true" />
          {issue.comments} {issue.comments === 1 ? 'comentário' : 'comentários'}
        </span>
        <span className="ml-auto font-bold text-brand">#{issue.number}</span>
      </footer>
    </article>
  )
}

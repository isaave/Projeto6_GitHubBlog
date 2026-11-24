import { MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { GitHubIssue } from '../types/github'
import { formatRelativeDate, summarizeBody } from '../utils/format'

interface IssueCardProps {
  issue: GitHubIssue
}

/** Resumo clicável de uma issue/post (RF-08, RF-09). */
export function IssueCard({ issue }: IssueCardProps) {
  return (
    <article className="group flex min-h-[320px] flex-col rounded-post border border-base-border bg-base-post p-6 transition-colors hover:border-brand/60 focus-within:border-brand sm:min-h-[388px] sm:p-12">
      <div className="flex items-start justify-between gap-6">
        <h3 className="text-[20px] font-bold leading-tight text-base-title sm:text-[24px]">
          <Link
            to={`/post/${issue.number}`}
            aria-label={`Ler publicação ${issue.title}`}
            className="hover:text-brand focus-visible:ring-2 focus-visible:ring-brand"
          >
            {issue.title}
            <span className="sr-only"> (abre a publicação)</span>
          </Link>
        </h3>

        <time
          dateTime={issue.created_at}
          className="shrink-0 whitespace-nowrap text-text-s text-base-span"
        >
          {formatRelativeDate(issue.created_at)}
        </time>
      </div>

      <p className="mt-8 line-clamp-4 text-text-m text-base-text">
        {summarizeBody(issue.body, 240)}
      </p>

      {issue.comments > 0 ? (
        <footer className="mt-auto flex items-center gap-2 border-t border-base-border pt-6 text-text-s text-base-span">
          <MessageSquare className="size-4" aria-hidden="true" />
          {issue.comments} {issue.comments === 1 ? 'comentário' : 'comentários'}
        </footer>
      ) : null}
    </article>
  )
}

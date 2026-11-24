import { ArrowLeft, CalendarDays, ExternalLink, MessageSquare } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { ErrorState } from '../components/ErrorState'
import { Header } from '../components/Header'
import { LoadingState } from '../components/LoadingState'
import { MarkdownView } from '../components/MarkdownView'
import { GitHubIcon } from '../components/GitHubIcon'
import { useIssue } from '../hooks/useIssue'
import { formatRelativeDate } from '../utils/format'
import { NotFoundPage } from './NotFoundPage'

/** Detalhe de uma publicação, acessível por rota dinâmica (RF-09 a RF-12). */
export function PostPage() {
  const { number } = useParams<{ number: string }>()
  const issueNumber = Number(number)
  const isValidNumber = Number.isSafeInteger(issueNumber) && issueNumber > 0

  if (!isValidNumber) return <NotFoundPage />

  return <PostContent issueNumber={issueNumber} />
}

function PostContent({ issueNumber }: { issueNumber: number }) {
  const navigate = useNavigate()
  const issue = useIssue(issueNumber)

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <Header />

      <main className="container-blog -mt-8 pb-16 sm:-mt-12">
        <div className="relative z-10 rounded-post border border-base-border bg-base-profile p-6 shadow-xl shadow-black/20 sm:p-10">
          {issue.status === 'loading' ? (
            <div className="-m-6 sm:-m-10">
              <LoadingState variant="post" />
            </div>
          ) : issue.status === 'error' || !issue.data ? (
            <ErrorState
              error={issue.error}
              onRetry={issue.reload}
              context="da publicação"
            />
          ) : (
            <article>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 rounded text-link font-bold uppercase tracking-widest text-brand transition-colors hover:text-base-title focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Voltar
                </button>

                <a
                  href={issue.data.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded text-link font-bold uppercase tracking-widest text-brand transition-colors hover:text-base-title focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <GitHubIcon className="size-4" />
                  Ver no GitHub
                  <ExternalLink className="size-3" aria-hidden="true" />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </div>

              <h1 className="mt-8 text-title-l font-bold text-base-title sm:text-3xl">
                {issue.data.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-text-s text-base-span">
                <span>
                  por{' '}
                  <strong className="font-bold text-base-subtitle">
                    @{issue.data.user?.login ?? 'desconhecido'}
                  </strong>
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  <time dateTime={issue.data.created_at}>
                    {formatRelativeDate(issue.data.created_at)}
                  </time>
                </span>
                <span className="inline-flex items-center gap-2">
                  <MessageSquare className="size-4" aria-hidden="true" />
                  {issue.data.comments}{' '}
                  {issue.data.comments === 1 ? 'comentário' : 'comentários'}
                </span>
                <span className="font-bold text-brand">#{issue.data.number}</span>
              </div>

              <div className="mt-10 border-t border-base-border pt-6">
                <MarkdownView content={issue.data.body} />
              </div>
            </article>
          )}
        </div>
      </main>
    </>
  )
}

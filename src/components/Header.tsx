import { Link } from 'react-router-dom'
import { GitHubIcon } from './GitHubIcon'

/** Banner decorativo com a identidade visual do blog (RF-15). */
export function Header() {
  return (
    <header className="relative isolate overflow-hidden bg-base-profile">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-80"
        style={{ backgroundImage: 'url(/cover.svg)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-base-background via-base-background/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container-blog flex min-h-44 items-center justify-between gap-6 py-8 sm:min-h-56 sm:py-10">
        <div className="flex items-center gap-3 text-base-title">
          <GitHubIcon className="size-8 text-brand sm:size-10" />
          <span className="text-title-m font-bold tracking-tight sm:text-title-l">
            github<span className="text-brand">blog</span>
          </span>
        </div>

        <Link
          to="/"
          className="rounded-full border border-base-border bg-base-background/60 px-4 py-2 text-link font-bold uppercase tracking-widest text-base-subtitle transition-colors hover:border-brand hover:text-base-title focus-visible:ring-2 focus-visible:ring-brand"
        >
          Início
        </Link>
      </div>
    </header>
  )
}

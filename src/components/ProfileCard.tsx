import { Building2, Users } from 'lucide-react'
import type { GitHubUser } from '../types/github'
import { GitHubIcon } from './GitHubIcon'
import { formatNumber, valueOrFallback } from '../utils/format'

interface ProfileCardProps {
  profile: GitHubUser
}

/** Card de perfil sobreposto ao banner, com dados reais da Users API (RF-01/RF-02). */
export function ProfileCard({ profile }: ProfileCardProps) {
  const displayName = valueOrFallback(profile.name, profile.login)

  return (
    <section
      className="container-blog relative z-10 -mt-12 sm:-mt-16"
      aria-labelledby="profile-name"
    >
      <div className="flex flex-col gap-6 rounded-post border border-base-border bg-base-profile p-6 shadow-xl shadow-black/20 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
        <img
          src={profile.avatar_url}
          alt={`Foto de perfil de ${displayName} no GitHub`}
          width={148}
          height={148}
          className="size-24 shrink-0 rounded-full border-4 border-base-background object-cover sm:size-36"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 id="profile-name" className="text-title-l font-bold text-base-title">
                {displayName}
              </h1>
              <p className="text-text-m text-base-subtitle">@{profile.login}</p>
            </div>

            <a
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded border border-brand px-4 py-2 text-link font-bold uppercase tracking-widest text-brand transition-colors hover:bg-brand hover:text-base-input focus-visible:ring-2 focus-visible:ring-brand"
            >
              <GitHubIcon className="size-4" />
              Ver perfil
              <span className="sr-only"> no GitHub (abre em nova aba)</span>
            </a>
          </div>

          <p className="mt-4 text-text-m text-base-text">
            {valueOrFallback(
              profile.bio,
              'Este usuário ainda não escreveu uma bio no GitHub.',
            )}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-text-s text-base-span">
            <span className="inline-flex items-center gap-2">
              <Users className="size-4 text-brand" aria-hidden="true" />
              <strong className="font-bold text-base-subtitle">
                {formatNumber(profile.followers)}
              </strong>{' '}
              seguidores
            </span>

            {profile.company ? (
              <span className="inline-flex items-center gap-2">
                <Building2 className="size-4 text-brand" aria-hidden="true" />
                {profile.company}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { EmptyState } from '../components/EmptyState'
import { ErrorState } from '../components/ErrorState'
import { Header } from '../components/Header'
import { IssueList } from '../components/IssueList'
import { LoadingState } from '../components/LoadingState'
import { Pagination } from '../components/Pagination'
import { ProfileCard } from '../components/ProfileCard'
import { SearchInput } from '../components/SearchInput'
import { blogConfig } from '../config/blog'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useIssues } from '../hooks/useIssues'
import { useProfile } from '../hooks/useProfile'

/** Feed principal: perfil + busca paginada de issues (fluxos A e B do PRD). */
export function HomePage() {
  const profile = useProfile()
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  const debouncedTerm = useDebouncedValue(searchValue)
  const issues = useIssues(debouncedTerm, page)

  const total = issues.data?.total_count ?? null
  const totalPages = Math.max(1, Math.ceil((total ?? 0) / blogConfig.perPage))
  const displayedPage = Math.min(page, totalPages)

  function handleSearchChange(value: string) {
    setSearchValue(value)
    setPage(1)
  }

  return (
    <>
      <Header />

      {profile.status === 'loading' ? (
        <LoadingState variant="profile" />
      ) : profile.status === 'error' || !profile.data ? (
        <div className="container-blog relative z-10 -mt-12 sm:-mt-16">
          <ErrorState
            error={profile.error}
            onRetry={profile.reload}
            context="do perfil"
          />
        </div>
      ) : (
        <ProfileCard profile={profile.data} />
      )}

      <main className="container-blog py-12 sm:py-16">
        <SearchInput
          value={searchValue}
          onChange={handleSearchChange}
          total={total}
          isSearching={searchValue.trim() !== debouncedTerm.trim()}
        />

        <div className="mt-10">
          {issues.status === 'success' && issues.data && total === 0 ? (
            <EmptyState />
          ) : (
            <IssueList
              issues={issues.data?.items ?? []}
              status={issues.status}
              error={issues.error}
              onRetry={issues.reload}
              hasSearchTerm={debouncedTerm.trim().length > 0}
            />
          )}
        </div>

        {issues.status === 'success' && total !== null && total > 0 ? (
          <Pagination
            page={displayedPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        ) : null}
      </main>
    </>
  )
}

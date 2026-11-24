import { blogConfig } from '../config/blog'
import { searchIssues } from '../services/githubApi'
import type { IssueSearchResponse } from '../types/github'
import { useAsyncData, type AsyncResult } from './useAsyncData'

/**
 * Carrega a página atual de posts. Busca vazia retorna as últimas issues do
 * repositório; termo preenchido usa a Search API (RF-04, RF-05, RF-07).
 */
export function useIssues(
  term: string,
  page: number,
): AsyncResult<IssueSearchResponse> {
  const normalizedTerm = term.trim()

  return useAsyncData<IssueSearchResponse>(
    `issues:${normalizedTerm.toLowerCase()}:${page}`,
    (signal) =>
      searchIssues({
        term: normalizedTerm,
        page,
        perPage: blogConfig.perPage,
        signal,
      }),
  )
}

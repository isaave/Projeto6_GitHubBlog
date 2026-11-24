import { getIssue } from '../services/githubApi'
import type { GitHubIssue } from '../types/github'
import { useAsyncData, type AsyncResult } from './useAsyncData'

/** Carrega uma issue individual, inclusive em acesso direto à URL (RF-10). */
export function useIssue(issueNumber: number): AsyncResult<GitHubIssue> {
  return useAsyncData<GitHubIssue>(`issue:${issueNumber}`, (signal) =>
    getIssue(issueNumber, signal),
  )
}

/** Contratos das respostas da API do GitHub usadas pela aplicação. */

export interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  followers: number
  company?: string | null
  public_repos?: number
}

export interface GitHubIssueAuthor {
  login: string
  avatar_url?: string
  html_url?: string
}

export interface GitHubIssue {
  id: number
  number: number
  title: string
  body: string | null
  created_at: string
  comments: number
  html_url: string
  user: GitHubIssueAuthor | null
  /** Presente quando o item é um pull request; esses itens são filtrados (RN-03). */
  pull_request?: unknown
}

export interface IssueSearchResponse {
  total_count: number
  incomplete_results: boolean
  items: GitHubIssue[]
}

export type ApiErrorKind =
  | 'rate_limit'
  | 'not_found'
  | 'network'
  | 'canceled'
  | 'unknown'

export interface BlogApiError {
  kind: ApiErrorKind
  status?: number
  message: string
}

import axios, { type AxiosRequestConfig } from 'axios'
import { blogConfig } from '../config/blog'
import type {
  BlogApiError,
  GitHubIssue,
  GitHubUser,
  IssueSearchResponse,
} from '../types/github'
import { toBlogApiError } from '../utils/apiError'

/** Única instância Axios da aplicação (RN-01). */
export const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
  timeout: 15_000,
})

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await githubApi.request<T>(config)
    return response.data
  } catch (error) {
    throw toBlogApiError(error) satisfies BlogApiError
  }
}

export interface SearchIssuesParams {
  term: string
  page: number
  perPage?: number
  signal?: AbortSignal
}

/** Perfil público do autor (RF-01). */
export function getProfile(signal?: AbortSignal): Promise<GitHubUser> {
  return request<GitHubUser>({
    url: `/users/${blogConfig.username}`,
    signal,
  })
}

/**
 * Busca de issues no repositório do blog (RF-04, RF-05, RF-07).
 * O termo é normalizado e a query é montada pelo Axios, que a codifica (RN-06).
 */
export async function searchIssues({
  term,
  page,
  perPage = blogConfig.perPage,
  signal,
}: SearchIssuesParams): Promise<IssueSearchResponse> {
  const q = [term.trim(), `repo:${blogConfig.username}/${blogConfig.repo}`, 'is:issue']
    .filter(Boolean)
    .join(' ')

  const data = await request<IssueSearchResponse>({
    url: '/search/issues',
    params: {
      q,
      sort: 'created',
      order: 'desc',
      page,
      per_page: perPage,
    },
    signal,
  })

  return {
    ...data,
    items: data.items.filter((issue) => !issue.pull_request),
  }
}

/** Detalhe individual de uma issue, inclusive em acesso direto à URL (RF-10). */
export function getIssue(
  issueNumber: number,
  signal?: AbortSignal,
): Promise<GitHubIssue> {
  return request<GitHubIssue>({
    url: `/repos/${blogConfig.username}/${blogConfig.repo}/issues/${issueNumber}`,
    signal,
  })
}

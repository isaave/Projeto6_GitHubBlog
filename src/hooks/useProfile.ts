import { getProfile } from '../services/githubApi'
import type { GitHubUser } from '../types/github'
import { useAsyncData, type AsyncResult } from './useAsyncData'

/** Carrega o perfil público do autor (RF-01, RF-02). */
export function useProfile(): AsyncResult<GitHubUser> {
  return useAsyncData<GitHubUser>('profile', (signal) => getProfile(signal))
}

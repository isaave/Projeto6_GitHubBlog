import axios from 'axios'
import type { BlogApiError } from '../types/github'

const MESSAGES: Record<BlogApiError['kind'], string> = {
  rate_limit:
    'Limite de requisições da API do GitHub atingido. Aguarde alguns minutos e tente novamente.',
  not_found: 'Não encontramos esse conteúdo no GitHub.',
  network:
    'Não foi possível conectar ao GitHub. Verifique sua conexão e tente novamente.',
  canceled: 'Requisição cancelada.',
  unknown: 'Ocorreu um erro inesperado ao consultar o GitHub.',
}

function createError(
  kind: BlogApiError['kind'],
  status?: number,
): BlogApiError {
  return { kind, status, message: MESSAGES[kind] }
}

/**
 * Converte qualquer falha do Axios em um erro de domínio previsível (RN-08/RF-14).
 * Requisições canceladas pelo cleanup dos Hooks não devem virar erro visível.
 */
function isBlogApiError(value: unknown): value is BlogApiError {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Partial<BlogApiError>
  return typeof candidate.kind === 'string' && typeof candidate.message === 'string'
}

export function toBlogApiError(error: unknown): BlogApiError {
  // Os serviços já convertem falhas do Axios; evita perder a mensagem original.
  if (isBlogApiError(error)) {
    return error
  }

  if (!axios.isAxiosError(error)) {
    return createError('unknown')
  }

  if (error.code === 'ERR_CANCELED') {
    return createError('canceled')
  }

  const status = error.response?.status
  const remaining = error.response?.headers?.['x-ratelimit-remaining']
  const responseMessage = String(error.response?.data?.message ?? '')
  const looksLikeRateLimit =
    status === 429 ||
    remaining === '0' ||
    /rate limit|secondary rate/i.test(responseMessage)

  if (looksLikeRateLimit) {
    return createError('rate_limit', status)
  }

  if (status === 404) {
    return createError('not_found', status)
  }

  if (!error.response) {
    return createError('network')
  }

  return createError('unknown', status)
}

export function isCanceledError(error: BlogApiError): boolean {
  return error.kind === 'canceled'
}

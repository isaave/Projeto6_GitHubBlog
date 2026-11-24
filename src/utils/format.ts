import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

const EMPTY_BODY_MESSAGE = 'Sem conteúdo disponível.'

/** Data relativa em português, ex.: "há 2 dias" (RF-08, RF-12). */
export function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return 'data indisponível'

  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR })
}

/** Substitui campos nulos/vazios por um texto legível (RF-02). */
export function valueOrFallback(
  value: string | null | undefined,
  fallback: string,
): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

/** Números com agrupamento brasileiro, ex.: 1.234 (RF-02). */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value)
}

/**
 * Transforma o Markdown do corpo em texto curto para o card, sem blocos de
 * código extensos nem sintaxe crua (RN-07).
 */
export function summarizeBody(body: string | null, maxLength = 180): string {
  if (!body?.trim()) return EMPTY_BODY_MESSAGE

  const plainText = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/^\s{0,3}([-*+]|\d+\.)\s+/gm, '')
    .replace(/[*_~]{1,3}/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!plainText) return EMPTY_BODY_MESSAGE

  return plainText.length > maxLength
    ? `${plainText.slice(0, maxLength).trimEnd()}…`
    : plainText
}

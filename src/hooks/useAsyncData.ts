import { useCallback, useEffect, useState } from 'react'
import type { BlogApiError } from '../types/github'
import { toBlogApiError } from '../utils/apiError'

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  status: AsyncStatus
  error: BlogApiError | null
}

export interface AsyncResult<T> extends AsyncState<T> {
  reload: () => void
}

interface StoredState<T> extends AsyncState<T> {
  requestId: string
}

/**
 * Hook genérico de consulta assíncrona: controla estados, cancela a requisição
 * anterior e expõe reload() para o botão "Tentar novamente" (RF-13/RN-08).
 * `key` deve representar todos os parâmetros da consulta.
 */
export function useAsyncData<T>(
  key: string,
  fetcher: (signal: AbortSignal) => Promise<T>,
): AsyncResult<T> {
  const [reloadCount, setReloadCount] = useState(0)
  const requestId = `${key}:${reloadCount}`
  const [stored, setStored] = useState<StoredState<T>>({
    requestId,
    data: null,
    status: 'loading',
    error: null,
  })

  // Trocar os parâmetros já coloca a consulta em carregamento, sem setState no efeito.
  const state: AsyncState<T> =
    stored.requestId === requestId
      ? stored
      : { data: null, status: 'loading', error: null }

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    fetcher(controller.signal)
      .then((data) => {
        if (active) {
          setStored({ requestId, data, status: 'success', error: null })
        }
      })
      .catch((error: unknown) => {
        if (!active) return
        const apiError = toBlogApiError(error)
        if (apiError.kind === 'canceled') return
        setStored({ requestId, data: null, status: 'error', error: apiError })
      })

    return () => {
      active = false
      controller.abort()
    }
    // O fetcher é recriado a cada render; `requestId` identifica a consulta.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestId])

  const reload = useCallback(() => {
    setReloadCount((count) => count + 1)
  }, [])

  return { ...state, reload }
}

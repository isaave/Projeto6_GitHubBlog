import { useEffect, useState } from 'react'
import { blogConfig } from '../config/blog'

/** Retorna o valor somente após `delay` ms sem alterações (RF-06). */
export function useDebouncedValue<T>(
  value: T,
  delay: number = blogConfig.debounceMs,
): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])

  return debounced
}

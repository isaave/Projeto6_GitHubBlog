import { Search, X } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  total: number | null
  isSearching?: boolean
}

/** Campo controlado de busca com label real e contador acessível (RF-05, RF-16). */
export function SearchInput({
  value,
  onChange,
  total,
  isSearching = false,
}: SearchInputProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="w-full sm:max-w-xl">
        <label
          htmlFor="issue-search"
          className="mb-2 block text-text-s font-bold text-base-subtitle"
        >
          Buscar publicação
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-base-span"
            aria-hidden="true"
          />
          <input
            id="issue-search"
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Digite um termo e pressione Enter…"
            autoComplete="off"
            className="h-12 w-full rounded border border-base-border bg-base-input pl-12 pr-11 text-text-m text-base-title placeholder:text-base-span focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
          {value ? (
            <button
              type="button"
              onClick={() => onChange('')}
              aria-label="Limpar busca"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-base-span transition-colors hover:text-base-title focus-visible:ring-2 focus-visible:ring-brand"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      <p
        aria-live="polite"
        className="shrink-0 text-text-m text-base-subtitle"
      >
        {isSearching ? (
          'Buscando…'
        ) : total === null ? (
          'Contando publicações…'
        ) : (
          <>
            <strong className="font-bold text-base-title">{total}</strong>{' '}
            {total === 1 ? 'publicação' : 'publicações'}
          </>
        )}
      </p>
    </div>
  )
}

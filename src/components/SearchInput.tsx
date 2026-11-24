import { Search, X } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  total: number | null
  isSearching?: boolean
}

/** Busca em largura total com label real e contador alinhado (RF-05, RF-16). */
export function SearchInput({
  value,
  onChange,
  total,
  isSearching = false,
}: SearchInputProps) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <label
          htmlFor="issue-search"
          className="text-text-m font-bold text-base-subtitle"
        >
          Publicações
        </label>

        <p aria-live="polite" className="text-text-m text-base-subtitle">
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

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-6 top-1/2 size-5 -translate-y-1/2 text-base-span"
          aria-hidden="true"
        />
        <input
          id="issue-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Buscar conteúdo"
          aria-label="Buscar publicação"
          autoComplete="off"
          className="h-[72px] w-full rounded-post border border-base-border bg-base-input pl-14 pr-14 text-text-m text-base-title placeholder:text-base-span focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Limpar busca"
            className="absolute right-5 top-1/2 -translate-y-1/2 rounded p-1 text-base-span transition-colors hover:text-base-title focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  )
}

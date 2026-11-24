/**
 * Configuração pública do blog (RN-10).
 * Nenhuma credencial deve ser adicionada aqui ou em variáveis VITE_* (RN-09).
 */
export const blogConfig = {
  username: 'isaave',
  repo: 'Projeto6_GitHubBlog',
  perPage: 6,
  debounceMs: 500,
} as const

export type BlogConfig = typeof blogConfig

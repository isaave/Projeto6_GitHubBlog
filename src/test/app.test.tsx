import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { HomePage } from '../pages/HomePage'
import { PostPage } from '../pages/PostPage'
import { mockIssues } from './mocks/data'
import { searchCalls } from './mocks/handlers'
import { server } from './mocks/server'

function renderHome() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

describe('GitHub Blog', () => {
  it('RF-01/RF-02/RF-04: exibe perfil real e as últimas issues', async () => {
    renderHome()

    expect(await screen.findByText('Isabella Avelina')).toBeInTheDocument()
    expect(
      screen.getByText('Desenvolvedora Full Stack & iOS'),
    ).toBeInTheDocument()
    expect(screen.getByText('17')).toBeInTheDocument()
    expect(await screen.findAllByRole('article')).toHaveLength(6)
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('RF-05/RF-06/RF-07: debounce agrupa a busca e a paginação muda de página', async () => {
    renderHome()
    await screen.findAllByRole('article')
    searchCalls.length = 0

    const input = screen.getByRole('searchbox', { name: 'Buscar publicação' })
    fireEvent.change(input, { target: { value: 'R' } })
    fireEvent.change(input, { target: { value: 'Re' } })
    fireEvent.change(input, { target: { value: 'React' } })

    await waitFor(() => expect(searchCalls).toHaveLength(1), { timeout: 2000 })
    expect(searchCalls[0].searchParams.get('q')).toContain(
      'React repo:isaave/Projeto6_GitHubBlog is:issue',
    )
    expect(searchCalls[0].searchParams.get('page')).toBe('1')

    fireEvent.click(screen.getByRole('button', { name: /Próxima/i }))
    await waitFor(() =>
      expect(
        searchCalls.some((url) => url.searchParams.get('page') === '2'),
      ).toBe(true),
    )
  })

  it('RF-10/RF-11: abre /post/:number diretamente e renderiza Markdown', async () => {
    render(
      <MemoryRouter initialEntries={['/post/12']}>
        <Routes>
          <Route path="/post/:number" element={<PostPage />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(
      await screen.findByRole('heading', { name: /Publicação de teste 12/ }),
    ).toBeInTheDocument()
    expect(screen.getByText('Resumo 12')).toBeInTheDocument()

    const markdownLink = screen.getByRole('link', { name: 'link' })
    expect(markdownLink).toHaveAttribute('href', 'https://example.com')
    expect(markdownLink).toHaveAttribute('target', '_blank')
    expect(markdownLink).toHaveAttribute('rel', 'noreferrer')
    expect(screen.getByText(/const n = 12/)).toBeInTheDocument()
  })

  it('RF-13/RF-14: trata rate limit e recupera com Tentar novamente', async () => {
    let limited = true
    server.use(
      http.get('https://api.github.com/search/issues', () =>
        limited
          ? HttpResponse.json(
              { message: 'API rate limit exceeded' },
              { status: 403, headers: { 'x-ratelimit-remaining': '0' } },
            )
          : HttpResponse.json({
              total_count: mockIssues.length,
              incomplete_results: false,
              items: mockIssues.slice(0, 6),
            }),
      ),
    )

    renderHome()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Muitas requisições ao GitHub',
    )
    const retry = screen.getByRole('button', { name: /Tentar novamente/i })

    limited = false
    fireEvent.click(retry)

    expect(await screen.findAllByRole('article')).toHaveLength(6)
  })
})

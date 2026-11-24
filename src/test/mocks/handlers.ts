import { http, HttpResponse } from 'msw'
import { blogConfig } from '../../config/blog'
import { mockIssues, mockUser } from './data'

export const searchCalls: URL[] = []

const base = 'https://api.github.com'

export const handlers = [
  http.get(`${base}/users/${blogConfig.username}`, () =>
    HttpResponse.json(mockUser),
  ),

  http.get(`${base}/search/issues`, ({ request }) => {
    const url = new URL(request.url)
    searchCalls.push(url)

    const page = Number(url.searchParams.get('page') ?? 1)
    const perPage = Number(url.searchParams.get('per_page') ?? blogConfig.perPage)
    const start = (page - 1) * perPage

    return HttpResponse.json({
      total_count: mockIssues.length,
      incomplete_results: false,
      items: mockIssues.slice(start, start + perPage),
    })
  }),

  http.get(
    `${base}/repos/${blogConfig.username}/${blogConfig.repo}/issues/:number`,
    ({ params }) => {
      const number = Number(params.number)
      const issue = mockIssues.find((item) => item.number === number)
      return issue
        ? HttpResponse.json(issue)
        : HttpResponse.json({ message: 'Not Found' }, { status: 404 })
    },
  ),
]

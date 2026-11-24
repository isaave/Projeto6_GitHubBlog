import type { GitHubIssue, GitHubUser } from '../../types/github'

export const mockUser: GitHubUser = {
  login: 'isaave',
  name: 'Isabella Avelina',
  bio: 'Desenvolvedora Full Stack & iOS',
  avatar_url: 'https://avatars.githubusercontent.com/u/150173781?v=4',
  html_url: 'https://github.com/isaave',
  followers: 17,
  company: 'Apple Developer Academy Senac',
}

export const mockIssues: GitHubIssue[] = Array.from({ length: 12 }, (_, index) => {
  const number = index + 1
  return {
    id: 1000 + number,
    number,
    title: `Publicação de teste ${number}`,
    body: `## Resumo ${number}\n\nConteúdo com **Markdown**, [link](https://example.com) e código:\n\n\`\`\`ts\nconst n = ${number}\n\`\`\`\n\n- item um\n- item dois`,
    created_at: new Date(Date.UTC(2026, 10, 24 - index)).toISOString(),
    comments: number % 3,
    html_url: `https://github.com/isaave/Projeto6_GitHubBlog/issues/${number}`,
    user: { login: 'isaave' },
  }
})

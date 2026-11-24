import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { githubApi } from '../services/githubApi'
import { server } from './mocks/server'

// No jsdom, o adapter XHR sofre CORS antes do MSW interceptar; usar o adapter HTTP do Node.
githubApi.defaults.adapter = 'http'

beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => server.close())

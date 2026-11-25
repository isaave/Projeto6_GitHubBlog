import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Elemento #root não encontrado no documento.')
}

// O 404.html do GitHub Pages devolve a rota perdida na query; restaure-a antes do Router.
const redirectedPath = window.location.search.startsWith('?/')
  ? decodeURIComponent(window.location.search.slice(2))
  : null

if (redirectedPath) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  window.history.replaceState(null, '', `${base}${redirectedPath}`)
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

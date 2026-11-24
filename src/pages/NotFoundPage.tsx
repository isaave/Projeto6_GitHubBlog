import { Link } from 'react-router-dom'
import { Header } from '../components/Header'

/** Rota inexistente ou parâmetro inválido (RF-16). */
export function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="container-blog -mt-8 pb-20 sm:-mt-12">
        <div className="relative z-10 rounded-post border border-base-border bg-base-profile px-6 py-16 text-center">
          <p className="text-link font-bold uppercase tracking-widest text-brand">404</p>
          <h1 className="mt-4 text-title-l font-bold text-base-title">
            Página não encontrada
          </h1>
          <p className="mx-auto mt-3 max-w-md text-text-m text-base-text">
            O endereço acessado não existe ou esta publicação não está disponível.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded border border-brand px-5 py-2 text-link font-bold uppercase tracking-widest text-brand transition-colors hover:bg-brand hover:text-base-input focus-visible:ring-2 focus-visible:ring-brand"
          >
            Voltar para o início
          </Link>
        </div>
      </main>
    </>
  )
}

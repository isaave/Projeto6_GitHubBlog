/** Banner decorativo com a identidade visual do blog (RF-15). */
export function Header() {
  return (
    <header className="relative isolate overflow-hidden bg-base-profile">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-80"
        style={{ backgroundImage: 'url(/cover.svg)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-base-background via-base-background/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container-blog flex min-h-[360px] flex-col items-center justify-center gap-4 py-16 sm:min-h-[516px] sm:gap-6">
        <img
          src="/vector.png"
          alt=""
          aria-hidden="true"
          width={45}
          height={35}
          className="h-[35px] w-[45px] object-contain"
        />
        <span className="text-center text-[24px] font-bold uppercase leading-none tracking-[-0.02em] text-brand sm:text-[33px]">
          Github Blog
        </span>
      </div>
    </header>
  )
}

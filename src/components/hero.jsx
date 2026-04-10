import { Link } from 'react-router-dom'
import { Info, Play, Star } from 'lucide-react'

const fallbackDescription = 'Travel beyond the known world and discover a story worth watching tonight.'

export default function Hero({ featuredMovie }) {
  const title = featuredMovie?.title || 'Interstellar'
  const description = featuredMovie?.plot && featuredMovie.plot !== 'N/A'
    ? featuredMovie.plot
    : fallbackDescription
  const backgroundImage = featuredMovie?.backdrop && featuredMovie.backdrop !== 'N/A'
    ? featuredMovie.backdrop
    : featuredMovie?.poster && featuredMovie.poster !== 'N/A'
      ? featuredMovie.poster
      : ''
  const detailsPath = featuredMovie ? `/movie/${featuredMovie.id}` : '/movies'

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt={title}
            className="h-full w-full object-cover object-center opacity-45"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(229,9,20,0.35),transparent_22%),linear-gradient(90deg,rgba(8,8,8,0.95)_0%,rgba(8,8,8,0.72)_42%,rgba(8,8,8,0.3)_72%,rgba(8,8,8,0.78)_100%)]" />
      <div className="absolute inset-y-0 right-[10%] hidden w-[34vw] max-w-[400px] rounded-full border border-[#ff6a5f]/60 blur-[2px] md:block" />

      <div className="relative z-10 flex min-h-[420px] items-end px-6 py-10 sm:px-8 md:min-h-[520px] md:px-12 md:py-14">
        <div className="max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
            <span className="text-[#e50914]">N</span>
            Cinema Noir Originals
          </div>

          <h1 className="max-w-lg text-5xl font-black uppercase leading-[0.88] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl">
            {title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/75">
            {featuredMovie?.year && featuredMovie.year !== 'N/A' && (
              <span>{featuredMovie.year}</span>
            )}
            {featuredMovie?.rating && featuredMovie.rating !== 'N/A' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1">
                <Star className="h-3.5 w-3.5 fill-current text-[#f5c451]" />
                {featuredMovie.rating}
              </span>
            )}
          </div>

          <p className="mt-5 max-w-md text-sm leading-6 text-white/78 sm:text-base">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={detailsPath}
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              <Play className="h-4 w-4 fill-current" />
              Play
            </Link>
            <Link
              to={detailsPath}
              className="inline-flex items-center gap-2 rounded-md bg-white/18 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/28"
            >
              <Info className="h-4 w-4" />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

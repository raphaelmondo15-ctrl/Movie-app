import { Link } from 'react-router-dom'

const fallbackPoster = 'https://via.placeholder.com/240x360?text=No+Image'

export default function MovieRow({ title, movies = [] }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
          {title}
        </h2>
      </div>

      <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max space-x-2 gap-3 sm:gap-4 mx-auto">
          {movies.map((movie) => {
            const imageUrl = movie.poster && movie.poster !== 'N/A' ? movie.poster : fallbackPoster

            return (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="group block w-[112px] flex-shrink-0 sm:w-[138px] md:w-[158px]"
              >
                <article className="overflow-hidden rounded-md border border-white/8 bg-[#1b1b1b] shadow-[0_16px_30px_rgba(0,0,0,0.25)] transition duration-300 group-hover:-translate-y-1 group-hover:border-white/20">
                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={movie.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

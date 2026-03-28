import { Play } from 'lucide-react'

export default function MovieRow({ title, movies }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-min">
          {movies?.map((movie) => (
            <div
              key={movie.imdbID}
              className="flex-shrink-0 w-40 group cursor-pointer"
            >
              <div className="relative h-56 rounded-lg overflow-hidden">
                <img
                  src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}
                  alt={movie.Title}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                  <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition" />
                </div>
              </div>
              <p className="text-white font-semibold mt-2 truncate">
                {movie.Title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

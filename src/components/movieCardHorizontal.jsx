import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Heart, Star, Play, Calendar, Clock } from 'lucide-react'

export default function MovieCardHorizontal({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const imageUrl = movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/200x300?text=No+Image'

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="bg-secondary rounded-lg overflow-hidden hover:scale-[1.02] transition transform cursor-pointer shadow-lg group">
        <div className="grid grid-cols-[120px_1fr] gap-4 p-4">
          {/* Poster Image */}
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsFavorite(!isFavorite)
              }}
              className="absolute top-2 right-2 bg-black bg-opacity-50 p-1.5 rounded-full hover:bg-opacity-75 transition z-10"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </button>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
              <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition" />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between min-h-[120px]">
            <div>
              <h3 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2">
                {movie.Title}
              </h3>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.Year}</span>
                </div>
                {movie.Runtime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{movie.Runtime}</span>
                  </div>
                )}
              </div>

              {movie.Plot && (
                <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                  {movie.Plot}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">{movie.imdbRating || 'N/A'}</span>
              </div>
              <span className="text-accent text-sm font-medium hover:text-red-400 transition">
                View Details →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
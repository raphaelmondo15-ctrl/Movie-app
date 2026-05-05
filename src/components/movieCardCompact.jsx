import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Heart, Star, Play } from 'lucide-react'
import { MyListContext } from '../context/mylistcontext'

export default function MovieCardCompact({ movie }) {
  const { addToMyList, removeFromMyList, isInMyList } = useContext(MyListContext)
  const isFavorite = isInMyList(movie.id)
  const imageUrl = movie.poster && movie.poster !== 'N/A'
    ? movie.poster
    : 'https://via.placeholder.com/200x300?text=No+Image'

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-secondary rounded-lg overflow-hidden hover:scale-105 transition transform cursor-pointer shadow-lg group relative">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay with title and rating */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-2">
                {movie.title}
              </h3>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 text-xs">{movie.rating || 'N/A'}</span>
                </div>
                <span className="text-white text-xs">{movie.year}</span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  isFavorite ? removeFromMyList(movie.id) : addToMyList(movie)
                }}
                className="w-full bg-accent hover:bg-red-600 text-white py-1 px-2 rounded text-xs font-medium transition"
              >
                {isFavorite ? "Remove" : "Add to My List"}
              </button>
            </div>
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              isFavorite ? removeFromMyList(movie.id) : addToMyList(movie)
            }}
            className="absolute top-2 right-2 bg-black bg-opacity-50 p-1.5 rounded-full hover:bg-opacity-75 transition z-10"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>

          {/* Play button */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center">
            <Play className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition" />
          </div>
        </div>
      </div>
    </Link>
  )
}

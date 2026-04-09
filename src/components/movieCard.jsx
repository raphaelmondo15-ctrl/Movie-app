import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Heart, Star, Play } from 'lucide-react'

export default function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const imageUrl = movie.poster && movie.poster !== 'N/A'
    ? movie.poster
    : 'https://via.placeholder.com/200x300?text=No+Image'

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-secondary rounded-lg overflow-hidden hover:scale-105 transition transform cursor-pointer shadow-lg group grid grid-rows-[auto_1fr_auto] h-full">
        {/* Image Section */}
        <div className="relative aspect-[2/3] overflow-hidden">
            <img
              src={imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
            className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition z-10"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
            <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition" />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 grid grid-rows-[auto_auto_1fr] gap-2 flex-1">
          {/* Title */}
          <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">
            {movie.title}
          </h3>

          {/* Year */}
          <p className="text-gray-400 text-xs">
            {movie.year}
          </p>

          {/* Rating and Details */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-2 mt-auto">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 flex-shrink-0" />
              <span className="text-yellow-400 text-xs font-medium">{movie.rating || 'N/A'}</span>
            </div>
            <span className="text-accent text-xs font-medium">View</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Heart } from 'lucide-react'
import { MyListContext } from '../context/mylistcontext'

export default function MovieCard({ movie }) {
  const { addToMyList, removeFromMyList, isInMyList } = useContext(MyListContext)
  const isFavorite = isInMyList(movie.id)
  const imageUrl = movie.poster && movie.poster !== 'N/A'
    ? movie.poster
    : 'https://via.placeholder.com/240x360?text=No+Image'

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block relative"
    >
      <article className="relative overflow-hidden rounded-md border border-white/8 bg-[#1b1b1b] shadow-[0_16px_30px_rgba(0,0,0,0.25)] transition duration-300 group-hover:-translate-y-1 group-hover:border-white/20">
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            isFavorite ? removeFromMyList(movie.id) : addToMyList(movie)
          }}
          className="absolute right-3 top-3 z-20 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>
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
}

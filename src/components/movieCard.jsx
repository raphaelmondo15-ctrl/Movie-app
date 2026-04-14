import { Link } from 'react-router-dom'

export default function MovieCard({ movie }) {
  const imageUrl = movie.poster && movie.poster !== 'N/A'
    ? movie.poster
    : 'https://via.placeholder.com/240x360?text=No+Image'

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block"
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
}

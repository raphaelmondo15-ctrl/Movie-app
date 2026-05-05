import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getMovieDetails } from '../api/movieService'
import ReactPlayer from 'react-player'
import { Play, Star, Calendar, Clock, Award, Users, Globe } from 'lucide-react'

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true)
      try {
        const data = await getMovieDetails(id)
        setMovie(data)
      } catch (error) {
        console.error('Error fetching movie details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchMovieDetails()
    }
  }, [id])

  if (isLoading) {
    return <div className="text-white text-center py-12">Loading...</div>
  }

  if (!movie) {
    return <div className="text-white text-center py-12">Movie not found</div>
  }

  // Generate YouTube search URL for movie trailer
  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.title} ${movie.year} official trailer`)}`

  return (
    <div className="text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <div className="lg:col-span-1">
            <img
            src={movie.poster && movie.poster !== 'N/A' ? movie.poster : 'https://via.placeholder.com/300x450?text=No+Image'}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />

          {/* Trailer Button */}
          <button
            onClick={() => setShowTrailer(!showTrailer)}
            className="w-full mt-4 bg-accent hover:bg-red-600 text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition"
          >
            <Play className="w-5 h-5" />
            {showTrailer ? 'Hide Trailer' : 'Watch Trailer'}
          </button>
        </div>

        {/* Movie Details */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>

          {/* Rating and Year */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-400 font-bold">{movie.rating}/10</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">{movie.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">{movie.runtime}</span>
            </div>
          </div>

          {/* Plot */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-3">Plot</h2>
            <p className="text-gray-300 leading-relaxed">{movie.plot}</p>
          </div>

          {/* Movie Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Cast & Crew
              </h3>
              <div className="space-y-2">
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Writer:</strong> {movie.writer}</p>
                <p><strong>Actors:</strong> {movie.actors}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Details
              </h3>
              <div className="space-y-2">
                <p><strong>Genre:</strong> {movie.genres}</p>
                <p><strong>Language:</strong> {movie.language}</p>
                <p><strong>Country:</strong> {movie.country}</p>
                <p><strong>Rated:</strong> {movie.rated}</p>
              </div>
            </div>
          </div>

          {/* Awards */}
          {movie.awards && movie.awards !== 'N/A' && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Awards
              </h3>
              <p className="text-gray-300">{movie.awards}</p>
            </div>
          )}

          {/* Ratings */}
          {movie.ratings && movie.ratings.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Additional Ratings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {movie.ratings.map((rating, index) => (
                  <div key={index} className="bg-secondary p-3 rounded-lg">
                    <p className="font-semibold">{rating.Source}</p>
                    <p className="text-accent">{rating.Value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trailer Section */}
      {showTrailer && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Trailer</h2>
          <div className="bg-secondary rounded-lg p-6">
            <div className="text-center mb-4">
              <p className="text-gray-300 mb-4">
                Click below to watch the official trailer on YouTube
              </p>
              <a
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition"
              >
                <Play className="w-5 h-5" />
                Watch on YouTube
              </a>
            </div>

            {/* Optional: You could embed a YouTube player here if you have specific trailer URLs */}
            {/* <ReactPlayer
              url={trailerUrl}
              controls={true}
              width="100%"
              height="400px"
              className="rounded-lg overflow-hidden"
            /> */}
          </div>
        </div>
      )}
    </div>
  )
}

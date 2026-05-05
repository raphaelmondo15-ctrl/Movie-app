import { useEffect, useState } from 'react'
import { getPopularMovies } from '../api/movieService'
import Hero from '../components/hero'
import MovieRow from '../components/movieRow'
import MovieSkeleton from '../components/movieSkeleton'

const chunkMovies = (movies, size) => {
  const chunks = []

  for (let index = 0; index < movies.length; index += size) {
    chunks.push(movies.slice(index, index + size))
  }

  return chunks
}

export default function Popularpages() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)

      try {
        const data = await getPopularMovies()
        setMovies(data.results || [])
      } catch (error) {
        console.error('Error fetching popular movies:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const featuredMovie = movies[0] || null
  const [firstRow = [], secondRow = [], thirdRow = []] = chunkMovies(movies.slice(0, 18), 6)

  return (
    <div className="-mt-8 w-full min-h-screen bg-[#141414] px-4 pb-14 pt-0 text-white sm:px-6 lg:px-8">
      <Hero featuredMovie={featuredMovie} />

      <div className="mx-auto mt-8 max-w-7xl space-y-10">
        {isLoading ? (
          <MovieSkeleton count={12} />
        ) : (
          <>
            <MovieRow title="Popular Right Now" movies={firstRow} />
            <MovieRow title="Fan Favorites" movies={secondRow} />
            <MovieRow title="Worth The Hype" movies={thirdRow} />
          </>
        )}
      </div>
    </div>
  )
}

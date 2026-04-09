import { useContext, useEffect, useState } from 'react'
import { MovieContext } from '../context/movieContext'
import Hero from '../components/hero'
import MovieRow from '../components/movieRow'
import MovieSkeleton from '../components/movieSkeleton'
import { getTrendingMovies } from '../api/movieService'

export default function Home() {
  const { movies, isLoading } = useContext(MovieContext)
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingLoading, setTrendingLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingMovies()
        setTrendingMovies(data.results?.slice(0, 8) || [])
      } catch (error) {
        console.error('Error fetching trending movies:', error)
      } finally {
        setTrendingLoading(false)
      }
    }

    fetchTrending()
  }, [])

  return (
    <div className='bg-gray-500'>
      <Hero />
      <div className="mt-12">
        {trendingLoading ? (
          <MovieSkeleton count={8} />
        ) : (
          <MovieRow title="Trending Now" movies={trendingMovies} />
        )}
      </div>
    </div>
  )
}

import { useContext, useEffect, useState } from 'react'
import { MovieContext } from '../context/movieContext'
import Hero from '../components/hero'
import MovieRow from '../components/movieRow'
import MovieSkeleton from '../components/movieSkeleton'
import { getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from '../api/movieService'

export default function Home() {
  const { movies, isLoading } = useContext(MovieContext)
  const [trendingMovies, setTrendingMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [trendingLoading, setTrendingLoading] = useState(true)
  const featuredMovie = trendingMovies[0] || movies[0] || null

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const [trendingData, topRatedData, upcomingData] = await Promise.all([
          getTrendingMovies(),
          getTopRatedMovies(1),
          getUpcomingMovies(1),
        ])

        setTrendingMovies(trendingData.results?.slice(0, 6) || [])
        setTopRatedMovies(topRatedData.results?.slice(0, 6) || [])
        setUpcomingMovies(upcomingData.results?.slice(0, 6) || [])
      } catch (error) {
        console.error('Error fetching homepage movies:', error)
      } finally {
        setTrendingLoading(false)
      }
    }

    fetchRows()
  }, [])

  return (
    <div className="-mt-8 w-full min-h-screen bg-[#141414] px-4 pb-14 pt-0 text-white sm:px-6 lg:px-8">
      <Hero featuredMovie={featuredMovie} />

      <div className="mx-auto mt-8 space-y-10">
        {trendingLoading || isLoading ? (
          <MovieSkeleton count={12} />
        ) : (
          <>
            <MovieRow title="Trending Now" movies={trendingMovies} />
            <MovieRow title="Popular On CineMatch" movies={topRatedMovies.length ? topRatedMovies : movies.slice(0, 6)} />
            <MovieRow title="New Releases" movies={upcomingMovies} />
          </>
        )}
      </div>
    </div>
  )
}

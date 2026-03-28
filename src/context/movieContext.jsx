import { createContext, useState, useEffect } from 'react'
import { getPopularMovies } from '../api/movieService'

export const MovieContext = createContext()

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      try {
        const data = await getPopularMovies(currentPage)
        setMovies(data.results || [])
        setTotalPages(data.total_pages || 1)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [currentPage])

  return (
    <MovieContext.Provider
      value={{
        movies,
        isLoading,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

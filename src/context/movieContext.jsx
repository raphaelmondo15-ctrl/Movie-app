import { createContext, useState, useEffect } from 'react'
import { getPopularMovies } from '../api/movieService'

export const MovieContext = createContext()

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage')
    return savedPage ? parseInt(savedPage, 10) : 1
  })
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage)
  }, [currentPage])

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
        currentPage,
        setCurrentPage,
        totalPages,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

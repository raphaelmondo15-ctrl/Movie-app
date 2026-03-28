import { useEffect, useState } from 'react'
import { searchMovies } from '../api/movieService'

export function useFetchMovies(query, page = 1) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query.trim()) {
      setMovies([])
      return
    }

    const fetchMovies = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await searchMovies(query, page)
        setMovies(data.results || [])
      } catch (err) {
        setError(err.message)
        setMovies([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [query, page])

  return { movies, isLoading, error }
}

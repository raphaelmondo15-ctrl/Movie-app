import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MovieGrid from '../components/movieGrid'
import Pagination from '../components/pagination'
import { searchMovies } from '../api/movieService'

export default function Search() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [error, setError] = useState('')
  const [totalResults, setTotalResults] = useState(0)

  const searchQuery = useMemo(
    () => (searchParams.get('q') || '').trim(),
    [searchParams]
  )

  const currentPage = useMemo(() => {
    const page = Number(searchParams.get('page') || '1')
    return Number.isFinite(page) && page > 0 ? page : 1
  }, [searchParams])

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery) {
        setSearchResults([])
        setTotalPages(0)
        setTotalResults(0)
        setError('')
        return
      }

      setIsLoading(true)
      setError('')
      try {
        const data = await searchMovies(searchQuery, currentPage)
        setSearchResults(data.results || [])
        setTotalPages(data.total_pages || 0)
        setTotalResults(data.total_results || 0)
      } catch (error) {
        console.error('Search error:', error)
        setSearchResults([])
        setTotalPages(0)
        setTotalResults(0)
        setError(error.message || 'Unable to search right now.')
      } finally {
        setIsLoading(false)
      }
    }

    performSearch()
  }, [searchQuery, currentPage])

  const handlePageChange = (page) => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&page=${page}`)
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-6">
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Search Movies'}
      </h1>

      {!searchQuery ? (
        <p className="mb-6 text-gray-400">
          Enter a movie title in the search bar to see live TMDb results.
        </p>
      ) : (
        <p className="text-gray-400 mb-6">
          Found {totalResults} result{totalResults !== 1 ? 's' : ''}
        </p>
      )}

      {error && (
        <p className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200">
          {error}
        </p>
      )}
      
      <MovieGrid movies={searchResults} isLoading={isLoading} />
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

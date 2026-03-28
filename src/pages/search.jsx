import { useContext, useState, useEffect } from 'react'
import { MovieContext } from '../context/movieContext'
import MovieGrid from '../components/movieGrid'
import Pagination from '../components/pagination'
import { searchMovies } from '../api/movieService'

export default function Search() {
  const { searchQuery, currentPage, setCurrentPage } = useContext(MovieContext)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([])
        return
      }

      setIsLoading(true)
      try {
        const data = await searchMovies(searchQuery, currentPage)
        setSearchResults(data.results || [])
        setTotalPages(data.total_pages || 0)
      } catch (error) {
        console.error('Search error:', error)
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    }

    performSearch()
  }, [searchQuery, currentPage])

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-6">
        Search Results for "{searchQuery}"
      </h1>
      
      <p className="text-gray-400 mb-6">
        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
      </p>
      
      <MovieGrid movies={searchResults} isLoading={isLoading} />
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

import { useContext, useState, useEffect } from 'react'
import { MovieContext } from '../context/movieContext'
import MovieGrid from '../components/movieGrid'
import Pagination from '../components/pagination'
import SortFilters from '../components/sortfilters'

export default function Movies() {
  const { movies, isLoading, currentPage, setCurrentPage } = useContext(MovieContext)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [sortBy, setSortBy] = useState('popularity.desc')

  useEffect(() => {
    setFilteredMovies(movies)
  }, [movies])

  const handleSortChange = (newSort) => {
    setSortBy(newSort)
    // Sort would be applied via API in a real scenario
  }

  const handleFilterChange = (filterType, value) => {
    // Filter logic would be applied here
  }

  const ITEMS_PER_PAGE = 20
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const displayMovies = filteredMovies.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  return (
    <div className="-mt-8 -mx-4 min-h-screen bg-[#141414] px-4 pb-14 pt-0 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6 pt-8">
        <h1 className="text-4xl font-bold text-white">All Movies</h1>

        <SortFilters
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />

        <MovieGrid movies={displayMovies} isLoading={isLoading} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}

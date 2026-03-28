import { useContext, useState, useEffect } from 'react'
import { MovieContext } from '../context/movieContext'
import MovieGrid from '../components/movieGrid'
import Pagination from '../components/pagination'
import SortFilters from '../components/sortfilters'

export default function Series() {
  const { movies, isLoading, currentPage, setCurrentPage } = useContext(MovieContext)
  const [seriesData, setSeriesData] = useState([])

  useEffect(() => {
    // Filter for TV shows only
    const tvShows = movies.filter(m => m.media_type === 'tv' || m.first_air_date)
    setSeriesData(tvShows)
  }, [movies])

  const handleSortChange = (newSort) => {
    // Sort logic
  }

  const handleFilterChange = (filterType, value) => {
    // Filter logic
  }

  const ITEMS_PER_PAGE = 20
  const totalPages = Math.ceil(seriesData.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const displaySeries = seriesData.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-6">TV Series</h1>
      
      <SortFilters 
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
      
      <MovieGrid movies={displaySeries} isLoading={isLoading} />
      
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

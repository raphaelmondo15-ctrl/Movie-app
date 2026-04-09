import { useState } from 'react'
import { Grid3X3, List, Square } from 'lucide-react'
import MovieCard from './movieCard'
import MovieCardHorizontal from './movieCardHorizontal'
import MovieCardCompact from './movieCardCompact'

export default function MovieGrid({ movies, isLoading }) {
  const [layout, setLayout] = useState('grid') 

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Layout Toggle Skeleton */}
        <div className="flex justify-end gap-2 mb-4">
          <div className="w-8 h-8 bg-secondary rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-secondary rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-secondary rounded animate-pulse"></div>
        </div>

        {/* Cards Skeleton */}
        {layout === 'horizontal' ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-secondary h-32 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className={`grid gap-4 md:gap-6 ${
            layout === 'compact'
              ? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
              : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}>
            {[...Array(layout === 'compact' ? 12 : 8)].map((_, i) => (
              <div key={i} className="bg-secondary aspect-[2/3] rounded-lg animate-pulse" />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No movies found</p>
      </div>
    )
  }

  const renderCards = () => {
    switch (layout) {
      case 'horizontal':
        return (
          <div className="space-y-4">
            {movies.map((movie) => (
              <MovieCardHorizontal key={movie.id} movie={movie} />
            ))}
          </div>
        )
      case 'compact':
        return (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {movies.map((movie) => (
              <MovieCardCompact key={movie.id} movie={movie} />
            ))}
          </div>
        )
      default:
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      {/* Layout Toggle */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setLayout('grid')}
          className={`p-2 rounded-lg transition ${
            layout === 'grid'
              ? 'bg-accent text-white'
              : 'bg-secondary text-gray-400 hover:text-white'
          }`}
          title="Grid Layout"
        >
          <Grid3X3 className="w-5 h-5" />
        </button>
        <button
          onClick={() => setLayout('horizontal')}
          className={`p-2 rounded-lg transition ${
            layout === 'horizontal'
              ? 'bg-accent text-white'
              : 'bg-secondary text-gray-400 hover:text-white'
          }`}
          title="List Layout"
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={() => setLayout('compact')}
          className={`p-2 rounded-lg transition ${
            layout === 'compact'
              ? 'bg-accent text-white'
              : 'bg-secondary text-gray-400 hover:text-white'
          }`}
          title="Compact Layout"
        >
          <Square className="w-5 h-5" />
        </button>
      </div>

      {/* Cards */}
      {renderCards()}
    </div>
  )
}

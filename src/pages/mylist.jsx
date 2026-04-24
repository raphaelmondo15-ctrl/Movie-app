import { useState, useEffect } from 'react'
import MovieGrid from '../components/movieGrid'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    // Load favorites from localStorage
    const saved = localStorage.getItem('favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-6">My Favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No favorites yet. Start adding your favorite movies!</p>
        </div>
      ) : (
        <>
          <p className="text-gray-400 mb-6">You have {favorites.length} favorite(s)</p>
          <MovieGrid movies={favorites} isLoading={false} />
        </>
      )}
    </div>
  )
}

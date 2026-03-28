import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Search } from 'lucide-react'
import { MovieContext } from '../context/movieContext'

export default function SearchBar() {
  const navigate = useNavigate()
  const { setSearchQuery, setCurrentPage } = useContext(MovieContext)

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    setCurrentPage(1)
    if (query.trim()) {
      navigate('/search')
    }
  }

  return (
    <div className="flex-1 md:flex-none relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search movies..."
          onChange={handleSearch}
          className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg bg-secondary text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
    </div>
  )
}

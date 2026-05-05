import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState(searchParams.get('q') || '')

  useEffect(() => {
    if (location.pathname === '/search') {
      setInputValue(searchParams.get('q') || '')
    }
  }, [location.pathname, searchParams])

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = inputValue.trim()
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}&page=1`)
    } else if (location.pathname === '/search') {
      navigate('/search')
    }
  }

  return (
    <div className="flex-1 md:flex-none relative">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search movies..."
          value={inputValue}
          onChange={handleChange}
          className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg bg-secondary text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </form>
    </div>
  )
}

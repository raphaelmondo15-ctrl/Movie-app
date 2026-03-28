import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import SearchBar from './searchBar'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-accent">
            🎬 CineMatch
          </Link>
          
          <div className="hidden md:flex gap-6 flex-1 ml-8">
            <Link to="/" className="hover:text-accent transition">
              Home
            </Link>
            <Link to="/movies" className="hover:text-accent transition">
              Movies
            </Link>
            <Link to="/series" className="hover:text-accent transition">
              Series
            </Link>
            <Link to="/favorites" className="hover:text-accent transition">
              Favorites
            </Link>
          </div>

          <div className="hidden md:block">
            <SearchBar />
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link to="/" className="hover:text-accent transition">
              Home
            </Link>
            <Link to="/movies" className="hover:text-accent transition">
              Movies
            </Link>
            <Link to="/series" className="hover:text-accent transition">
              Series
            </Link>
            <Link to="/favorites" className="hover:text-accent transition">
              Favorites
            </Link>
            <SearchBar />
          </div>
        )}
      </div>
    </nav>
  )
}

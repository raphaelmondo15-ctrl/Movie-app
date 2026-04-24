import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, UserRound, Bell } from 'lucide-react'
import SearchBar from './searchBar'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'TV Shows', to: '/tvshows' },
    { label: 'Movies', to: '/movies' },
    { label: 'New & Popular', to: '/popular' },
    { label: 'My List', to: '/favorites' },
  ]

  const linkStyle = ({ isActive }) =>
    isActive
      ? "underline text-accent"
      : "hover:text-accent transition"

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-center h-16">
          
          <NavLink to="/" className="text-red-500 text-2xl font-bold">
            🎬 CineMatch
          </NavLink>
          
          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-6 flex-1 ml-8">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkStyle}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* SEARCH */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-3">
          <button className="text-white p-2">
            <Bell className="w-6 h-6" />
          </button>
          <button className="text-white p-2">
            <UserRound className="w-6 h-6" />
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkStyle}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <SearchBar />
          </div>
        )}
      </div>
    </nav>
  )
}

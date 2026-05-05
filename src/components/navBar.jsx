import { NavLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import { Menu, X, UserRound, Bell } from 'lucide-react'
import SearchBar from './searchBar'
import { UserContext } from '../context/userContext.jsx'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [newUser, setNewUser] = useState('')
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'TV Shows', to: '/tvshows' },
    { label: 'Movies', to: '/movies' },
    { label: 'New & Popular', to: '/popular' },
    { label: 'My List', to: '/mylist' },
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
        <div className="relative flex items-center gap-3">
          <button className="text-white p-2">
            <Bell className="w-6 h-6" />
          </button>
          <button
            className="text-white p-2"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
          >
            <UserRound className="w-6 h-6" />
          </button>
          {isUserMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-3xl border border-white/10 bg-[#111111] p-4 shadow-2xl">
              <p className="text-sm text-gray-400 mb-3">
                Signed in as <span className="font-semibold text-white">{currentUser}</span>
              </p>
              <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                Switch user
              </label>
              <input
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                placeholder="Enter username"
                className="w-full rounded-2xl border border-white/10 bg-black px-3 py-2 text-white placeholder:text-gray-500 focus:border-accent focus:outline-none"
              />
              <button
                onClick={() => {
                  if (!newUser.trim()) return
                  setCurrentUser(newUser.trim())
                  setNewUser('')
                  setIsUserMenuOpen(false)
                }}
                className="mt-3 w-full rounded-2xl bg-accent px-4 py-2 text-black font-semibold transition hover:bg-accent/90"
              >
                Switch user
              </button>
              <p className="mt-3 text-xs text-gray-500">
                Favorites are stored separately per user.
              </p>
            </div>
          )}
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

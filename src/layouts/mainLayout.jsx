import { Outlet } from 'react-router-dom'
import NavBar from '../components/navBar'

export default function MainLayout() {
  return (
    <div className="bg-primary min-h-screen">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-secondary text-gray-400 text-center py-8 mt-12">
        <p>&copy; 2026 CineMatch. All rights reserved.</p>
      </footer>
    </div>
  )
}

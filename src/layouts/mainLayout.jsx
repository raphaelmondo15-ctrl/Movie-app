import { Outlet } from 'react-router-dom'
import NavBar from '../components/navBar'
import Footer from '../components/footer'

export default function MainLayout() {
  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

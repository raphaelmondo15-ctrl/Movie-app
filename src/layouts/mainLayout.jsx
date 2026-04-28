import { Outlet } from 'react-router-dom'
import NavBar from '../components/navBar'
import Footer from '../components/footer'

export default function MainLayout() {
  return (
    <div className="bg-primary min-h-screen flex flex-col w-full">
      <NavBar />
      <main className="flex-1 w-full sm:px-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MovieProvider } from './context/movieContext'
import MainLayout from './layouts/mainLayout'
import Home from './pages/home'
import Movies from './pages/movies'
import Series from './pages/series'
import Search from './pages/search'
import Favorites from './pages/fav'
import MovieDetails from './pages/movieDetails'
import './App.css'

function App() {
  return (
    <MovieProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Route>
        </Routes>
      </Router>
    </MovieProvider>
  )
}

export default App

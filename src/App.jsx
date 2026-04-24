import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MovieProvider } from './context/movieContext'
import MainLayout from './layouts/mainLayout'
import Home from './pages/home'
import Movies from './pages/movies'
import Series from './pages/series'
import Popularpages from './pages/Popularpages'
import Search from './pages/search'
import Favorites from './pages/mylist'
import MovieDetails from './pages/movieDetails'
import TvShows from './pages/tvshows'
import Mylist from './pages/mylist'
import './App.css'

function App() {
  return (
    <MovieProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<TvShows />} />
            <Route path="/popular" element={<Popularpages />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/mylist" element={<Mylist />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tvshows" element={<TvShows />} />
          </Route>
        </Routes>
      </Router>
    </MovieProvider>
  )
}

export default App

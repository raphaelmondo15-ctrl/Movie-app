import axiosInstance from './axiosconfig'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'
const FALLBACK_TEXT = 'N/A'

const getImageUrl = (path) => (
  path ? `${IMAGE_BASE_URL}${path}` : FALLBACK_TEXT
)

const getBackdropUrl = (path) => (
  path ? `${BACKDROP_BASE_URL}${path}` : FALLBACK_TEXT
)

const getYear = (dateString) => (
  dateString ? dateString.slice(0, 4) : FALLBACK_TEXT
)

const formatRuntime = (minutes) => (
  minutes ? `${minutes} min` : FALLBACK_TEXT
)

const formatNames = (items, key = 'name', limit) => {
  if (!Array.isArray(items) || items.length === 0) {
    return FALLBACK_TEXT
  }

  const names = items
    .map((item) => item?.[key])
    .filter(Boolean)

  if (names.length === 0) {
    return FALLBACK_TEXT
  }

  return (limit ? names.slice(0, limit) : names).join(', ')
}

const getCertification = (releaseDates = []) => {
  const usRelease = releaseDates.find((entry) => entry.iso_3166_1 === 'US')
  const certification = usRelease?.release_dates?.find((item) => item.certification)
  return certification?.certification || FALLBACK_TEXT
}

const normalizeMovie = (movie) => ({
  id: String(movie.id),
  title: movie.title || movie.name || FALLBACK_TEXT,
  year: getYear(movie.release_date || movie.first_air_date),
  poster: getImageUrl(movie.poster_path),
  backdrop: getBackdropUrl(movie.backdrop_path),
  plot: movie.overview || FALLBACK_TEXT,
  rating: movie.vote_average ? movie.vote_average.toFixed(1) : FALLBACK_TEXT,
  runtime: formatRuntime(movie.runtime),
  media_type: movie.media_type || (movie.first_air_date ? 'tv' : 'movie'),
  first_air_date: movie.first_air_date,
})

const normalizeMovieDetails = (movie) => {
  const crew = movie.credits?.crew || []
  const cast = movie.credits?.cast || []
  const directors = crew.filter((person) => person.job === 'Director')
  const writers = crew.filter((person) =>
    ['Writer', 'Screenplay', 'Novel', 'Story'].includes(person.job)
  )

  return {
    ...normalizeMovie(movie),
    genres: formatNames(movie.genres),
    language: formatNames(movie.spoken_languages, 'english_name'),
    country: formatNames(movie.production_countries, 'name'),
    rated: getCertification(movie.release_dates?.results),
    director: formatNames(directors),
    writer: formatNames(writers),
    actors: formatNames(cast, 'name', 5),
    awards: FALLBACK_TEXT,
    ratings: movie.vote_average
      ? [{ Source: 'TMDb', Value: `${movie.vote_average.toFixed(1)}/10` }]
      : [],
  }
}

const fetchFromTMDB = async (url, params = {}) => {
  if (!import.meta.env.VITE_TMDB_TOKEN) {
    throw new Error('Missing TMDb token. Add VITE_TMDB_TOKEN to your .env.local file.')
  }

  try {
    const { data } = await axiosInstance.get(url, { params })
    return data
  } catch (error) {
    throw new Error(
      error.response?.data?.status_message ||
      error.message ||
      'Something went wrong'
    )
  }
}

const formatListResponse = (data) => ({
  results: (data.results || []).map(normalizeMovie),
  total_pages: data.total_pages || 0,
  total_results: data.total_results || 0,
  page: data.page || 1,
})

export const searchMovies = async (query, page = 1) => {
  const data = await fetchFromTMDB('/search/movie', {
    query,
    page,
    include_adult: false,
  })

  return formatListResponse(data)
}

export const getPopularMovies = async (page = 1) => {
  const data = await fetchFromTMDB('/movie/popular', { page })
  return formatListResponse(data)
}

export const getTrendingMovies = async () => {
  const data = await fetchFromTMDB('/trending/movie/week')
  return {
    results: (data.results || []).map(normalizeMovie),
  }
}

export const getTopRatedMovies = async (page = 1) => {
  const data = await fetchFromTMDB('/movie/top_rated', { page })
  return formatListResponse(data)
}

export const getUpcomingMovies = async (page = 1) => {
  const data = await fetchFromTMDB('/movie/upcoming', { page })
  return formatListResponse(data)
}

export const getMovieDetails = async (movieId) => {
  const data = await fetchFromTMDB(`/movie/${movieId}`, {
    append_to_response: 'credits,release_dates',
  })

  return normalizeMovieDetails(data)
}

export const searchSeries = async (query, page = 1) => {
  const data = await fetchFromTMDB('/search/tv', {
    query,
    page,
    include_adult: false,
  })

  return formatListResponse(data)
}

export const getSeriesDetails = async (seriesId) => {
  const data = await fetchFromTMDB(`/tv/${seriesId}`, {
    append_to_response: 'credits,content_ratings',
  })

  return {
    ...normalizeMovieDetails(data),
    title: data.name || FALLBACK_TEXT,
    year: getYear(data.first_air_date),
    rated: data.content_ratings?.results?.find((entry) => entry.iso_3166_1 === 'US')?.rating || FALLBACK_TEXT,
  }
}

export const getSeason = async (seriesId, season) => {
  return fetchFromTMDB(`/tv/${seriesId}/season/${season}`)
}

export const getEpisode = async (seriesId, season, episode) => {
  return fetchFromTMDB(`/tv/${seriesId}/season/${season}/episode/${episode}`)
}

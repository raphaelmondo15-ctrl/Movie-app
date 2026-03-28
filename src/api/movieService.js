import axiosInstance from './axiosconfig'

// Get popular movies (OMDB doesn't have "popular", so we'll use a default search)
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await axiosInstance.get('/', {
      params: {
        s: 'movie', // Search for movies
        page: page,
        type: 'movie'
      },
    })

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error)
    }

    // Transform OMDB response to match our expected format
    return {
      results: response.data.Search || [],
      total_pages: Math.ceil((response.data.totalResults || 0) / 10),
      page: page
    }
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    throw error
  }
}

// Search movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axiosInstance.get('/', {
      params: {
        s: query,
        page: page,
        type: 'movie'
      },
    })

    if (response.data.Response === 'False') {
      return {
        results: [],
        total_pages: 0,
        page: page
      }
    }

    return {
      results: response.data.Search || [],
      total_pages: Math.ceil((response.data.totalResults || 0) / 10),
      page: page
    }
  } catch (error) {
    console.error('Error searching movies:', error)
    throw error
  }
}

// Get movie details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await axiosInstance.get('/', {
      params: {
        i: movieId, // IMDB ID
        plot: 'full'
      },
    })

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error)
    }

    return response.data
  } catch (error) {
    console.error('Error fetching movie details:', error)
    throw error
  }
}

// Get trending movies (using a popular search term)
export const getTrendingMovies = async () => {
  try {
    const response = await axiosInstance.get('/', {
      params: {
        s: 'action', // Popular genre
        type: 'movie'
      },
    })

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error)
    }

    return {
      results: response.data.Search || []
    }
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    throw error
  }
}

// Get top rated movies (OMDB doesn't have top rated, so we'll use a different approach)
export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await axiosInstance.get('/', {
      params: {
        s: 'oscar', // Search for Oscar-winning movies
        page: page,
        type: 'movie'
      },
    })

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error)
    }

    return {
      results: response.data.Search || [],
      total_pages: Math.ceil((response.data.totalResults || 0) / 10),
      page: page
    }
  } catch (error) {
    console.error('Error fetching top rated movies:', error)
    throw error
  }
}

// Get upcoming movies (OMDB doesn't have upcoming, so we'll use recent movies)
export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await axiosInstance.get('/', {
      params: {
        s: '2024', // Search for recent movies
        page: page,
        type: 'movie'
      },
    })

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error)
    }

    return {
      results: response.data.Search || [],
      total_pages: Math.ceil((response.data.totalResults || 0) / 10),
      page: page
    }
  } catch (error) {
    console.error('Error fetching upcoming movies:', error)
    throw error
  }
}

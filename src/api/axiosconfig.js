import axios from 'axios'

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN
const BASE_URL = 'https://api.themoviedb.org/3'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    ...(TMDB_TOKEN
      ? { Authorization: `Bearer ${TMDB_TOKEN}` }
      : {}),
  },
})

axiosInstance.interceptors.request.use((config) => {
  console.log('Request:', config.baseURL + config.url)
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error:', error.message)
    console.error('URL:', error.config?.url)
    return Promise.reject(error)
  }
)

export default axiosInstance

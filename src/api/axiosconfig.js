import axios from 'axios'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'a93e9177'
const BASE_URL = 'http://www.omdbapi.com'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
})

export default axiosInstance

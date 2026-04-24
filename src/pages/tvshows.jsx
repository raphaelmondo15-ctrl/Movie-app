import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieGrid from '../components/movieGrid'
import Pagination from '../components/pagination'
import { getPopularTvShows } from '../api/movieService'

const TvShows = () => {
    const [shows, setShows] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page') || 1)

    useEffect(() => {
        const fetchShows = async () => {
            setIsLoading(true)
            setErrorMessage('')

            try {
                const data = await getPopularTvShows(currentPage)
                setShows(data.results || [])
                setTotalPages(data.total_pages || 1)
            } catch (error) {
                console.error('Error fetching TV shows:', error)
                setShows([])
                setTotalPages(0)
                setErrorMessage(error.message || 'Unable to load TV shows right now.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchShows()
    }, [currentPage])

    const handlePageChange = (newPage) => {
        setSearchParams({ page: String(newPage) })
    }

    return (
        <div className="-mt-8 -mx-4 min-h-screen bg-[#141414] px-4 pb-14 pt-0 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6 pt-8">
                <h1 className="text-4xl font-bold text-white">TV Shows</h1>
                {errorMessage && (
                    <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {errorMessage}
                    </div>
                )}
                <MovieGrid movies={shows} isLoading={isLoading} />
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    )
}

export default TvShows

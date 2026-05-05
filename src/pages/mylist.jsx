import { useContext } from 'react'
import MovieGrid from '../components/movieGrid'
import { MyListContext } from '../context/mylistcontext'

export default function Favorites() {
  const { myList } = useContext(MyListContext)

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-6">My List</h1>
      
      {myList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No movies in your list yet. Add some favorites to see them here!
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-400 mb-6">
            You have {myList.length} movie{myList.length === 1 ? '' : 's'} saved.
          </p>
          <MovieGrid movies={myList} isLoading={false} />
        </>
      )}
    </div>
  )
}
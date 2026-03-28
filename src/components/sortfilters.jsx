export default function SortFilters({ onSortChange, onFilterChange }) {
  return (
    <div className="bg-secondary rounded-lg p-4 mb-6 flex flex-wrap gap-4">
      <div>
        <label className="text-white font-semibold mr-2">Sort By:</label>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-primary text-white px-3 py-2 rounded"
        >
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc">Rating</option>
          <option value="release_date.desc">Newest</option>
          <option value="release_date.asc">Oldest</option>
        </select>
      </div>
      
      <div>
        <label className="text-white font-semibold mr-2">Genre:</label>
        <select
          onChange={(e) => onFilterChange('genre', e.target.value)}
          className="bg-primary text-white px-3 py-2 rounded"
        >
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="27">Horror</option>
          <option value="10749">Romance</option>
          <option value="878">Sci-Fi</option>
        </select>
      </div>

      <div>
        <label className="text-white font-semibold mr-2">Rating:</label>
        <select
          onChange={(e) => onFilterChange('rating', e.target.value)}
          className="bg-primary text-white px-3 py-2 rounded"
        >
          <option value="">All</option>
          <option value="8">8+</option>
          <option value="7">7+</option>
          <option value="6">6+</option>
          <option value="5">5+</option>
        </select>
      </div>
    </div>
  )
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-accent hover:bg-red-600 disabled:bg-gray-600 text-white px-4 py-2 rounded transition"
      >
        Previous
      </button>

      <div className="flex gap-1">
        {[...Array(Math.min(5, totalPages))].map((_, i) => {
          const pageNum = i + 1
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 rounded transition ${
                currentPage === pageNum
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-white hover:bg-accent'
              }`}
            >
              {pageNum}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-accent hover:bg-red-600 disabled:bg-gray-600 text-white px-4 py-2 rounded transition"
      >
        Next
      </button>

      <span className="text-white ml-4">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  )
}

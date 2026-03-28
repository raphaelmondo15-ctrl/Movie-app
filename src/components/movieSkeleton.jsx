export default function MovieSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-secondary rounded-lg overflow-hidden">
          <div className="w-full h-64 bg-gray-700 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-700 rounded animate-pulse" />
            <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse" />
            <div className="flex justify-between pt-2">
              <div className="h-3 bg-gray-700 rounded w-1/3 animate-pulse" />
              <div className="h-3 bg-gray-700 rounded w-1/4 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

import { Play, Heart, Search, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary via-secondary to-primary text-black py-20 text-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10">
          <Play className="w-16 h-16" />
        </div>
        <div className="absolute top-20 right-20">
          <Star className="w-12 h-12" />
        </div>
        <div className="absolute bottom-20 left-20">
          <Heart className="w-14 h-14" />
        </div>
        <div className="absolute bottom-10 right-10">
          <Search className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-green-500 text-white bg-opacity-10 px-4 py-2 rounded-full">
            <Play className="w-6 h-6 text-accent" />
            <span className="text-sm font-medium">Now Playing</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Discover Your Next Favorite Movie
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Explore thousands of movies and series. Save your favorites and get personalized recommendations.
        </p>

        <div className="flex bg-gray-500 flex-col sm:flex-row gap-4 justify-center items-center">
          <button className=" hover:bg-red-600 px-8 py-3 rounded-lg font-bold text-lg transition flex items-center gap-2">
            <Play className="w-5 h-5" />
            Explore Now
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-bold text-lg transition flex items-center gap-2">
            <Heart className="w-5 h-5" />
            View Favorites
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-12">
          <div className="text-center">
            <div className="text-2xl font-bold">10K+</div>
            <div className="text-gray-300 text-sm">Movies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-gray-300 text-sm">Series</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">4.8★</div>
            <div className="text-gray-300 text-sm">Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}

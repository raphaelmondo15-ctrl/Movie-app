export default function footer() {
    return (
        <footer className="bg-black text-gray-400 py-6 mt-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} CineMatch. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
          <span className="hover:text-white cursor-pointer">Contact</span>
        </div>
      </div>
    </footer>
    )
}
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen background flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 py-16 w-full">
      
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors duration-300 inline-block"
        >
          Go Back Home
        </Link>
        <p className="text-gray-600 mt-4 text-sm">Powered by <a href="https://similater.com/" target="_blank" rel="noopener noreferrer">Similater (PVT) LTD</a></p>
      </div>
    </div>
  )
}


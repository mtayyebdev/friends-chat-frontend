import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center max-w-md">
        <svg className="w-20 h-20 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="22" strokeWidth="4" stroke="currentColor" fill="none"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M24 16v10M24 36h.01" />
        </svg>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">404</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default Error
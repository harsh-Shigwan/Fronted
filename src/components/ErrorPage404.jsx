
import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationCircleIcon } from '@heroicons/react/outline'; 
const ErrorPage404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <ExclamationCircleIcon className="w-20 h-20 mx-auto text-red-500" />
        <h1 className="mt-4 text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-2 text-xl text-gray-600">Page not found</p>
        <p className="mt-2 text-gray-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage404;

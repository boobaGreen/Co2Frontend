// src/pages/PageNotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-green-700 mb-4">404</h1>
      <p className="text-xl text-green-900 mb-4">Page Not Found</p>
      <Link to="/" className="text-green-700 hover:text-green-900 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;

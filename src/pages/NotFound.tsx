
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "@/components/Button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl md:text-6xl font-bold text-newtifi-navy mb-4">404</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button to="/" size="lg">
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

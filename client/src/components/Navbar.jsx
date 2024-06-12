import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Handle logout logic here
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-2xl font-bold">MyApp</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/user-profile" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">User Profile</Link>
                <Link to="/payment" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Payment</Link>
                <Link to="/stripe-payment" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Stripe</Link>
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:text-white"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link to="/profile" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">User Profile</Link>
          <Link to="/payment" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Payment</Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-3">
          <div className="flex items-center">
            <img src="/navlogo.png" alt="Trivara" className="h-7 sm:h-8" />
          </div>
          <nav className="hidden md:flex flex-1 justify-center space-x-6 text-sm font-normal">
            <a href="#home" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#properties" className="text-gray-600 hover:text-gray-900">Buy</a>
            <a href="#properties" className="text-gray-600 hover:text-gray-900">Rent</a>
            <a href="#properties" className="text-gray-600 hover:text-gray-900">Properties</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          </nav>
          <div className="hidden sm:flex items-center space-x-3 sm:space-x-4">
            <button className="text-sm text-gray-600 hover:text-gray-900">Login</button>
            <button className="text-sm bg-[#19233e] text-white px-3 sm:px-4 py-2 rounded">Add Listing</button>
          </div>
          {/* Mobile hamburger button */}
          <div className="md:hidden">
            <button aria-label="Open menu" className="p-2 rounded hover:bg-gray-100" onClick={() => setMobileOpen(true)}>
              <Menu size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <img src="/navlogo.png" alt="Trivara" className="h-7" />
              <button aria-label="Close menu" className="p-2 rounded hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
                <X size={20} className="text-gray-700" />
              </button>
            </div>
            <nav className="flex flex-col space-y-3 text-sm">
              <a href="#home" className="text-gray-700 hover:text-gray-900" onClick={() => setMobileOpen(false)}>Home</a>
              <a href="#properties" className="text-gray-700 hover:text-gray-900" onClick={() => setMobileOpen(false)}>Buy</a>
              <a href="#properties" className="text-gray-700 hover:text-gray-900" onClick={() => setMobileOpen(false)}>Rent</a>
              <a href="#properties" className="text-gray-700 hover:text-gray-900" onClick={() => setMobileOpen(false)}>Properties</a>
              <a href="#about" className="text-gray-700 hover:text-gray-900" onClick={() => setMobileOpen(false)}>About</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900" onClick={() => setMobileOpen(false)}>Contact</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
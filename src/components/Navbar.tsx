import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePropsOpen, setMobilePropsOpen] = useState(false);
  
  // refs for desktop dropdown menus so we can trigger AOS classes on hover
  const propsMenuRef = useRef<HTMLDivElement | null>(null);
  

  const handleMenuEnter = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMenuLeave = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      autoAlpha: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.in"
    });
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-1 sm:py-2">
          <div className="flex items-center">
            <Link to="/" aria-label="Home" onClick={() => setMobileOpen(false)}>
              <img src="/navlogo-min.webp" alt="Trivara" className="h-16 w-auto" />
            </Link>
          </div>
          <nav className="hidden md:flex flex-1 justify-end items-center space-x-6 text-sm font-semibold">
            <Link to="/" className="text-black hover:text-black py-2">Home</Link>

            {/* Properties dropdown */}
            <div className="relative group flex items-center" onMouseEnter={() => handleMenuEnter(propsMenuRef)} onMouseLeave={() => handleMenuLeave(propsMenuRef)}>
              <button className="inline-flex items-center gap-1 hover:text-white">
                <span className="text-black hover:text-black">Properties</span> <ChevronDown size={14} className="opacity-80 text-gray-700" />
              </button>
              <div ref={propsMenuRef} className="absolute left-0 top-full mt-1 opacity-0 invisible bg-white text-black rounded shadow-lg border border-gray-200 w-56 p-3" style={{ transform: 'translateY(-10px)' }}>
                <div className="absolute -top-2 left-0 h-2 w-full" />
                <ul className="space-y-2 text-sm">
                  <li><Link to="/offplan" className="block hover:underline py-1">Off Plan Property</Link></li>
                  <li><Link to="/buyproperty" className="block hover:underline py-1">Buy Property</Link></li>
                  <li><Link to="/rent" className="block hover:underline py-1">Rent Property</Link></li>
                  <li><Link to="/international" className="block hover:underline py-1">International Properties</Link></li>
                  <li><Link to="/readytomove" className="block hover:underline py-1">Ready To Move In</Link></li>
                </ul>
              </div>
            </div>

            

            <Link to="/services" className="text-black hover:text-black py-2">Services</Link>

            <Link to="/contact" className="text-black hover:text-black py-2">Contact</Link>

            <Link to="/about" className="text-black hover:text-black py-2">About</Link>
          </nav>
          {/* Removed Contact button per request */}
          {/* Mobile hamburger button */}
          <div className="md:hidden">
            <button aria-label="Open menu" className="p-2 rounded hover:bg-gray-100" onClick={() => setMobileOpen(true)}>
              <Menu size={20} className="text-gray-800" />
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <Link to="/" onClick={() => setMobileOpen(false)}>
                <img src="/navlogo-min.webp" alt="Trivara" className="h-16 w-auto" />
              </Link>
              <button aria-label="Close menu" className="p-2 rounded hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
                <X size={20} className="text-gray-700" />
              </button>
            </div>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/" className="text-gray-900 font-medium" onClick={() => setMobileOpen(false)}>Home</Link>

              {/* Properties accordion */}
              <button className="flex items-center justify-between w-full text-gray-900 font-medium" onClick={() => setMobilePropsOpen(v=>!v)}>
                <span>Properties</span>
                <ChevronDown size={16} className={`transition-transform ${mobilePropsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobilePropsOpen && (
                <ul className="pl-3 space-y-2 text-gray-700">
                  <li><Link to="/offplan" onClick={() => setMobileOpen(false)}>Off Plan Property</Link></li>
                  <li><Link to="/buyproperty" onClick={() => setMobileOpen(false)}>Buy Property</Link></li>
                  <li><Link to="/rent" onClick={() => setMobileOpen(false)}>Rent Property</Link></li>
                  <li><Link to="/international" onClick={() => setMobileOpen(false)}>International Properties</Link></li>
                  <li><Link to="/readytomove" onClick={() => setMobileOpen(false)}>Ready To Move In</Link></li>
                </ul>
              )}

              

              <Link to="/services" className="text-gray-900 font-medium" onClick={() => setMobileOpen(false)}>Services</Link>

              <Link to="/contact" className="text-gray-900 font-medium" onClick={() => setMobileOpen(false)}>Contact</Link>

              <Link to="/about" className="text-gray-900 font-medium" onClick={() => setMobileOpen(false)}>About</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
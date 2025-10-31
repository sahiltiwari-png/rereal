import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a1628] text-white py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <img src="/applog.png" alt="Trivara" className="h-7 sm:h-8 mb-3 sm:mb-4" />
            <p className="text-gray-400 text-xs leading-relaxed">Dubai's premier real estate marketplace connecting buyers, sellers, and investors.</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#properties" className="hover:text-white">Properties</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
              <li><a href="https://www.trivararealestate.com" target="_blank" rel="noreferrer" className="hover:text-white">www.trivararealestate.com</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4">Services</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white">Buy Property</a></li>
              <li><a href="#" className="hover:text-white">Rent Property</a></li>
              <li><a href="#" className="hover:text-white">Property Management</a></li>
              <li><a href="#" className="hover:text-white">Investment Advisory</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4">Contact Info</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>Office 1203, Business Bay, Dubai, UAE</li>
              <li><a href="tel:+971504554151" className="hover:text-white">+971 50 455 4151</a></li>
              <li><a href="mailto:Media@trivararealestate.com" className="hover:text-white">Media@trivararealestate.com</a></li>
              <li><a href="https://www.trivararealestate.com" target="_blank" rel="noreferrer" className="hover:text-white">www.trivararealestate.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-5 sm:pt-6 text-center text-gray-400 text-xs">
          <p>&copy; 2024 Trivara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
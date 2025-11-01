import React from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a1628] text-white py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <img src="/applog.png" alt="Trivara" className="h-16 mb-3 sm:mb-4" />
            <p className="text-gray-400 text-xs leading-relaxed">Dubai's premier real estate marketplace connecting buyers, sellers, and investors.</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4 compact-heading">Quick Links</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#properties" className="hover:text-white">Properties</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
              <li><a href="https://www.trivararealestate.com" target="_blank" rel="noreferrer" className="hover:text-white">www.trivararealestate.com</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4 compact-heading">Services</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white">Buy Property</a></li>
              <li><a href="#" className="hover:text-white">Rent Property</a></li>
              <li><a href="#" className="hover:text-white">Property Management</a></li>
              <li><a href="#" className="hover:text-white">Investment Advisory</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4 compact-heading">Contact Info</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-gray-400 mt-0.5" />
                <span>Office 1203, Business Bay, Dubai, UAE</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} className="text-gray-400 mt-0.5" />
                <a href="tel:+971504554151" className="hover:text-white">+971 50 455 4151</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-gray-400 mt-0.5" />
                <a href="mailto:Media@trivararealestate.com" className="hover:text-white">Media@trivararealestate.com</a>
              </li>
              <li className="flex items-start gap-2">
                <Globe size={14} className="text-gray-400 mt-0.5" />
                <a href="https://www.trivararealestate.com" target="_blank" rel="noreferrer" className="hover:text-white">www.trivararealestate.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-5 sm:pt-6 text-gray-400 text-xs">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <p className="text-center sm:text-left">© 2024 Trivara. All rights reserved.</p>
            <div className="text-center sm:text-right">
              <a href="#" className="hover:text-white">Terms &amp; Conditions</a>
              <span className="mx-2">•</span>
              <a href="#" className="hover:text-white">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
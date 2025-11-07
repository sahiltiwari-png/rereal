import React from 'react';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

export default function ContactPage() {
  return (
    <section id="contact" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-[#19233e]">We are always happy to<br />hear from you</h2>
          </div>
          <div className="md:pl-8">
            <p className="text-gray-600 text-sm sm:text-base">Contact us now for a free consultation to learn more about how best we can serve you.</p>
          </div>
        </div>

        {/* Main content cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Contact with us card */}
          <div className="rounded-xl border border-gray-200 bg-slate-50 p-5 sm:p-6">
            <h3 className="font-semibold text-lg text-[#19233e] mb-4">Contact with us</h3>
            <div className="space-y-5">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-[#19233e]" size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Phone Number</div>
                  <div className="text-sm font-medium text-gray-900">+971 5060 40777</div>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-[#19233e]" size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="text-sm font-medium text-gray-900">Info@trivararealestate@gmail.com</div>
                </div>
              </div>
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-[#19233e]" size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Address</div>
                  <div className="text-sm font-medium text-gray-900">Office 1203, Business Bay, Dubai, UAE</div>
                  <div className="text-xs text-gray-500">Office 1203, Business Bay, Dubai, UAE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Enquire form card */}
          <div className="rounded-xl border border-gray-200 p-5 sm:p-6">
            <h3 className="font-semibold text-lg text-[#19233e] mb-4">Enquire with Us</h3>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Name</label>
                <input type="text" placeholder="Your Name" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#19233e]" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Email</label>
                <input type="email" placeholder="Your Email" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#19233e]" />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-xs text-gray-600 mb-1">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l text-sm bg-gray-50">+971</span>
                  <input type="tel" placeholder="Your Phone" className="w-full border border-gray-300 rounded-r px-3 py-2 text-sm focus:outline-none focus:border-[#19233e]" />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-xs text-gray-600 mb-1">Subject</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#19233e]">
                  <option>Select Subject</option>
                  <option>Buy Property</option>
                  <option>Rent Property</option>
                  <option>Investment Advisory</option>
                  <option>Property Management</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-gray-600 mb-1">Message</label>
                <textarea rows={5} placeholder="Enter Message" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#19233e]"></textarea>
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button type="button" className="px-5 py-2 bg-[#19233e] text-white rounded text-sm inline-flex items-center gap-2">
                  Submit
                  <ChevronRight size={16} className="opacity-90" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map embed */}
        <div className="mt-8 rounded-xl overflow-hidden border border-gray-200">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps?q=Business+Bay,+Dubai&output=embed"
            className="w-full h-[320px] sm:h-[420px]"
            loading="lazy"
          ></iframe>
        </div>

        {/* Floating actions */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <a href="tel:+971506040777" className="w-11 h-11 rounded-full bg-[#19233e] text-white shadow-lg flex items-center justify-center" aria-label="Call">
            <Phone size={18} />
          </a>
          <a href="#" className="w-11 h-11 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center" aria-label="WhatsApp">
            {/* Using MessageSquare icon from lucide-react is possible, but simple dot suffices */}
            <span className="text-sm">WA</span>
          </a>
        </div>
      </div>
    </section>
  );
}
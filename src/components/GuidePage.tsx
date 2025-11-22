import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Card, CardContent } from './ui/card';
import { MapPin, FileCheck, Handshake, Home, BadgePercent } from 'lucide-react';
import { Link } from 'react-router-dom';

const brand = { primary: '#19233e' };

const steps = [
  { icon: MapPin, title: 'Discover Areas', desc: 'Shortlist communities that match your lifestyle and goals.' },
  { icon: Home, title: 'View Properties', desc: 'Schedule viewings and compare options side-by-side.' },
  { icon: BadgePercent, title: 'Finance & Budget', desc: 'Understand total costs and explore mortgage options.' },
  { icon: Handshake, title: 'Make an Offer', desc: 'Negotiate confidently with market-backed recommendations.' },
  { icon: FileCheck, title: 'Transfer & Move-In', desc: 'Complete paperwork and handover with guided support.' },
];

const GuidePage: React.FC = () => {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      <section className="relative w-full">
        <img src="/aerial-view-city-against-sky-sunset-min.webp" alt="Guide" className="w-full h-[240px] sm:h-[320px] md:h-[380px] object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Buyer & Renter Guide</h1>
          <div className="mt-3">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full" style={{ backgroundColor: brand.primary, color: 'white' }}>
              <Link to="/" className="hover:underline">Home</Link>
              <span className="opacity-70">/</span>
              <span className="font-semibold">Guide</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s) => (
              <Card key={s.title} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border bg-white">
                <div className="h-40 w-full">
                  <img src="/view-modern-skyscrapers-shining-sunrise-lights-dubai-marina-dubai-uae-min.webp" alt="Guide" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <s.icon className="h-5 w-5 text-gray-700" />
                    <div className="text-base sm:text-lg font-semibold text-gray-900">{s.title}</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default GuidePage;
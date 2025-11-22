import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url: string;
}

const brand = {
  primary: '#19233e',
};

const InternationalPropertiesPage: React.FC = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [filterLocation, setFilterLocation] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  useEffect(() => {
    const data: Property[] = [
      { id: 'intl-1', title: 'Sea View Condo – Miami', location: 'Miami, USA', price: 850000, bedrooms: 2, bathrooms: 2, area: 1300, image_url: '/modern-architecture.webp' },
      { id: 'intl-2', title: 'City Apartment – London', location: 'London, UK', price: 1200000, bedrooms: 2, bathrooms: 2, area: 1000, image_url: '/city-london.webp' },
      { id: 'intl-3', title: 'Alps Chalet – Switzerland', location: 'Zermatt, CH', price: 2100000, bedrooms: 4, bathrooms: 3, area: 2400, image_url: '/swiss-chalet.webp' },
      { id: 'intl-4', title: 'Beach Villa – Bali', location: 'Bali, Indonesia', price: 980000, bedrooms: 3, bathrooms: 3, area: 2000, image_url: '/bali-beach-villa.webp' },
      { id: 'intl-5', title: 'Skyscraper Apt – Singapore', location: 'Singapore', price: 1500000, bedrooms: 3, bathrooms: 2, area: 1600, image_url: '/singapore-skyline.webp' },
      { id: 'intl-6', title: 'Countryside Home – Tuscany', location: 'Tuscany, Italy', price: 780000, bedrooms: 3, bathrooms: 2, area: 2100, image_url: '/tuscany-countryside.webp' },
    ];
    setAllProperties(data);
    setFilteredProperties(data);
  }, []);

  const totalPages = useMemo(() => Math.ceil(filteredProperties.length / pageSize), [filteredProperties.length]);
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProperties.slice(start, start + pageSize);
  }, [filteredProperties, currentPage]);

  const gotoPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyFilter = () => {
    let filtered = [...allProperties];
    if (filterLocation.trim()) {
      filtered = filtered.filter((p) => p.location.toLowerCase().includes(filterLocation.toLowerCase()));
    }
    if (filterPrice.trim()) {
      const priceNum = parseInt(filterPrice, 10);
      if (!Number.isNaN(priceNum)) {
        filtered = filtered.filter((p) => p.price <= priceNum);
      }
    }
    setFilteredProperties(filtered);
    setCurrentPage(1);
  };

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      <section className="relative w-full">
      <img
        src="/city-rotterdam-netherlands-min.webp"
        alt="International Properties"
        className="w-full h-[220px] sm:h-[320px] md:h-[380px] object-cover"
        fetchpriority="high"
        decoding="async"
      />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">International Properties</h1>
          <div className="mt-3">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full" style={{ backgroundColor: brand.primary, color: 'white' }}>
              <Link to="/" className="hover:underline">Home</Link>
              <span className="opacity-70">/</span>
              <span aria-current="page" className="font-semibold">International Properties</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar (compact) */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form className="bg-white border rounded-lg p-3 sm:p-4 shadow-sm" onSubmit={(e)=>{e.preventDefault(); applyFilter();}}>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-lg flex-1 basis-full sm:basis-auto">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-700">Location</span>
                <input
                  type="text"
                  placeholder="e.g. London, UK"
                  className="w-full focus:outline-none text-gray-900"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-lg flex-1 basis-full sm:basis-auto">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-700">USD</span>
                <input
                  type="text"
                  placeholder="Max Price"
                  className="w-full focus:outline-none text-gray-900"
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                />
              </div>
              <button
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: brand.primary }}
                type="submit"
              >
                Apply Filter
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-gray-700 font-medium border"
                onClick={() => { setFilterLocation(''); setFilterPrice(''); setFilteredProperties(allProperties); setCurrentPage(1); }}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Results</h2>
            <div className="text-sm text-gray-600">Showing {pageItems.length} of {filteredProperties.length}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map((p) => (
              <Link key={p.id} to={`/property/${p.id}`} state={{ property: p }} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition block">
                <img src={p.image_url} alt={p.title} className="w-full h-44 object-cover" loading="lazy" />
                <div className="p-4">
                  <div className="text-sm text-gray-500">{p.location}</div>
                  <div className="font-semibold text-gray-900 text-base mt-1">{p.title}</div>
          <div className="text-[#19233e] font-semibold mt-2">AED {p.price.toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button className="px-3 py-1.5 border rounded text-sm hover:bg-gray-50" onClick={() => gotoPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                const active = p === currentPage;
                return (
                  <button
                    key={p}
                    className={`px-3 py-1.5 border rounded text-sm ${active ? 'text-white' : 'text-gray-700'} hover:bg-gray-50`}
                    style={active ? { backgroundColor: brand.primary, borderColor: brand.primary } : undefined}
                    onClick={() => gotoPage(p)}
                  >
                    {p}
                  </button>
                );
              })}
              <button className="px-3 py-1.5 border rounded text-sm hover:bg-gray-50" onClick={() => gotoPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default InternationalPropertiesPage;
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

const RentPropertyPage: React.FC = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [filterLocation, setFilterLocation] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  useEffect(() => {
    const data: Property[] = [
      { id: 'rent-1', title: 'Marina View Apartment', location: 'Dubai Marina', price: 160000, bedrooms: 2, bathrooms: 2, area: 1150, image_url: '/view-modern-skyscrapers-shining-sunrise-lights-dubai-marina-dubai-uae-min.webp' },
      { id: 'rent-2', title: 'Downtown City Apartment', location: 'Downtown', price: 130000, bedrooms: 1, bathrooms: 2, area: 900, image_url: '/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp' },
      { id: 'rent-3', title: 'Business Bay Loft', location: 'Business Bay', price: 145000, bedrooms: 2, bathrooms: 2, area: 1050, image_url: '/reflection-buildings-glass-window-min.webp' },
      { id: 'rent-4', title: 'JVC Community Apartment', location: 'JVC', price: 95000, bedrooms: 1, bathrooms: 1, area: 780, image_url: '/living-room-with-couch-table-lamp.webp' },
      { id: 'rent-5', title: 'Arabian Ranches Townhouse', location: 'Arabian Ranches', price: 220000, bedrooms: 3, bathrooms: 3, area: 2200, image_url: '/luxury-living-room-interior-min.webp' },
      { id: 'rent-6', title: 'Palm Jumeirah Residence', location: 'Palm Jumeirah', price: 550000, bedrooms: 4, bathrooms: 5, area: 4200, image_url: '/panorama-pudong-business-reflection-sky-office-min.webp' },
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
        alt="Rent Property"
        className="w-full h-[220px] sm:h-[320px] md:h-[380px] object-cover"
        fetchpriority="high"
        decoding="async"
      />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Rent Property</h1>
          <div className="mt-3">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full" style={{ backgroundColor: brand.primary, color: 'white' }}>
              <Link to="/" className="hover:underline">Home</Link>
              <span className="opacity-70">/</span>
              <span aria-current="page" className="font-semibold">Rent Property</span>
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
                  placeholder="e.g. Dubai Marina"
                  className="w-full focus:outline-none text-gray-900"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-lg flex-1 basis-full sm:basis-auto">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-700">AED</span>
                <input
                  type="text"
                  placeholder="Max Price (AED)"
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

export default RentPropertyPage;
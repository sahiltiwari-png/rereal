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

const BuyPropertyPage: React.FC = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [filterLocation, setFilterLocation] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  useEffect(() => {
    const data: Property[] = [
      {
        id: 'buy-1',
        title: 'Beachfront Apartment – JBR',
        location: 'JBR',
        price: 2800000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1400,
        image_url: '/living-room-with-couch-table-lamp.webp',
      },
      {
        id: 'buy-2',
        title: 'Garden Villa – Dubai Hills',
        location: 'Dubai Hills',
        price: 6200000,
        bedrooms: 4,
        bathrooms: 4,
        area: 3900,
        image_url: '/3d-rendering-contemporary-modern-dining-room-living-room-with-luxury-decor-min.webp',
      },
      {
        id: 'buy-3',
        title: 'Marina View Residence',
        location: 'Dubai Marina',
        price: 3150000,
        bedrooms: 3,
        bathrooms: 3,
        area: 1750,
        image_url: '/view-modern-skyscrapers-shining-sunrise-lights-dubai-marina-dubai-uae-min.webp',
      },
      {
        id: 'buy-4',
        title: 'Downtown City Apartment',
        location: 'Downtown',
        price: 2400000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        image_url: '/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp',
      },
      {
        id: 'buy-5',
        title: 'Palm Jumeirah Luxury Home',
        location: 'Palm Jumeirah',
        price: 9800000,
        bedrooms: 5,
        bathrooms: 6,
        area: 5200,
        image_url: '/panorama-pudong-business-reflection-sky-office-min.webp',
      },
      {
        id: 'buy-6',
        title: 'Stylish Loft – Business Bay',
        location: 'Business Bay',
        price: 2100000,
        bedrooms: 1,
        bathrooms: 2,
        area: 900,
        image_url: '/reflection-buildings-glass-window-min.webp',
      },
      {
        id: 'buy-7',
        title: 'Family Townhouse – Arabian Ranches',
        location: 'Arabian Ranches',
        price: 3700000,
        bedrooms: 3,
        bathrooms: 3,
        area: 2500,
        image_url: '/luxury-living-room-interior-min.webp',
      },
      {
        id: 'buy-8',
        title: 'Skyline Apartment – DIFC',
        location: 'DIFC',
        price: 3300000,
        bedrooms: 2,
        bathrooms: 3,
        area: 1350,
        image_url: '/3d-rendering-modern-dining-room-living-room-with-luxury-decor-min.webp',
      },
      {
        id: 'buy-9',
        title: 'Waterfront Condo – Creek Harbour',
        location: 'Creek Harbour',
        price: 2600000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1180,
        image_url: '/buildings-city-against-sky-min.webp',
      },
      {
        id: 'buy-10',
        title: 'Penthouse – Bluewaters',
        location: 'Bluewaters',
        price: 12000000,
        bedrooms: 4,
        bathrooms: 5,
        area: 6800,
        image_url: '/dubai-united-arab-emirates-november-11-view-dubai-marina-towers-dubai-united-arab-emirates-november-11-2014-dubai-marina-is-district-dubai-artificial-canal-city-min.webp',
      },
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

      {/* Hero */}
      <section className="relative w-full">
        <img
          src="/buyproperty.webp"
          alt="Buy Property"
          className="w-full h-[220px] sm:h-[320px] md:h-[380px] object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Buy Property</h1>
          <div className="mt-3">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full" style={{ backgroundColor: brand.primary, color: 'white' }}>
              <Link to="/" className="hover:underline">Home</Link>
              <span className="opacity-70">/</span>
              <span aria-current="page" className="font-semibold">Buy Property</span>
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
                  placeholder="e.g. Downtown"
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

      {/* Listings grid */}
      <section className="bg-white py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Results</h2>
            <div className="text-sm text-gray-600">Showing {pageItems.length} of {filteredProperties.length}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map((p) => (
              <Link
                key={p.id}
                to={`/property/${p.id}`}
                state={{ property: p }}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition block"
              >
                <img src={p.image_url} alt={p.title} className="w-full h-44 object-cover" loading="lazy" />
                <div className="p-4">
                  <div className="text-sm text-gray-500">{p.location}</div>
                  <div className="font-semibold text-gray-900 text-base mt-1">{p.title}</div>
                  <div className="text-[#19233e] font-semibold mt-2">
                    AED {p.price.toLocaleString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                className="px-3 py-1.5 border rounded text-sm hover:bg-gray-50"
                onClick={() => gotoPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
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
              <button
                className="px-3 py-1.5 border rounded text-sm hover:bg-gray-50"
                onClick={() => gotoPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BuyPropertyPage;
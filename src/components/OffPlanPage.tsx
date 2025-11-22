import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

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

const OffPlanPage: React.FC = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);

  // Local filter state (replicates the behavior of our existing filter)
  const [filterLocation, setFilterLocation] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  useEffect(() => {
    // Mock data similar to homepage
    const data: Property[] = [
      {
        id: 'off-1',
        title: 'Nad Al Sheba Gardens Phase 7',
        location: 'Nad Al Sheba',
        price: 4430000,
        bedrooms: 3,
        bathrooms: 3,
        area: 2100,
        image_url: '/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp',
      },
      {
        id: 'off-2',
        title: 'Town Square Dubai – Nshama',
        location: 'Town Square',
        price: 1700000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        image_url: '/3d-rendering-modern-dining-room-living-room-with-luxury-decor-min.webp',
      },
      {
        id: 'off-3',
        title: 'Bliss Point – Jumeirah',
        location: 'Jumeirah',
        price: 2950000,
        bedrooms: 3,
        bathrooms: 3,
        area: 1800,
        image_url: '/luxury-living-room-interior-min.webp',
      },
      {
        id: 'off-4',
        title: 'Marina Heights – Dubai Marina',
        location: 'Dubai Marina',
        price: 3100000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1500,
        image_url: '/3d-rendering-luxury-modern-living-room-with-leather-sofa-lamp-wood-decor-loft-style-min.webp',
      },
    ];
    setAllProperties(data);
    setProperties(data);
  }, []);

  const applyFilter = () => {
    let filtered = [...allProperties];
    if (filterLocation.trim()) {
      filtered = filtered.filter((p) =>
        p.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }
    if (filterPrice.trim()) {
      const priceNum = parseInt(filterPrice, 10);
      if (!Number.isNaN(priceNum)) {
        filtered = filtered.filter((p) => p.price <= priceNum);
      }
    }
    setProperties(filtered);
  };

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Hero with Offplan image */}
      <section className="relative w-full">
        <img
          src="/offplaneimage.webp"
          alt="Offplan Properties"
          className="w-full h-[220px] sm:h-[320px] md:h-[380px] object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Offplan Properties</h1>
          <div className="mt-3">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full" style={{ backgroundColor: brand.primary, color: 'white' }}>
              <Link to="/" className="hover:underline">Home</Link>
              <span className="opacity-70">/</span>
              <span aria-current="page" className="font-semibold">Offplan Properties</span>
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
                <MapPin size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Location"
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
                onClick={() => { setFilterLocation(''); setFilterPrice(''); setProperties(allProperties); }}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results grid */}
      <section className="bg-white pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
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
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default OffPlanPage;
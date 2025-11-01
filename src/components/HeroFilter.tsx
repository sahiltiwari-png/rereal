import React, { useState } from 'react';
import { MapPin, Home, DollarSign, Search } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
}

type Props = {
  allProperties: Property[];
  onApply: (filtered: Property[]) => void;
};

const HeroFilter: React.FC<Props> = ({ allProperties, onApply }) => {
  const [filterCategory, setFilterCategory] = useState<'Ready to Move' | 'Offplan'>('Ready to Move');
  const [filterSubOption, setFilterSubOption] = useState<'Rent' | 'Sale' | 'Projects' | 'Area'>('Rent');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterArea, setFilterArea] = useState('');

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
    if (filterArea.trim()) {
      const areaNum = parseInt(filterArea, 10);
      if (!Number.isNaN(areaNum)) {
        filtered = filtered.filter((p) => p.area >= areaNum);
      }
    }
    onApply(filtered);
  };

  return (
    <section id="home" className="relative min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-88px)] flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/herovideo.webm"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="relative text-center text-white z-20 px-4 w-full sm:max-w-2xl md:max-w-5xl">
        <h1 className="font-bold mb-6 md:mb-8 heading-raleway hero-heading-4rem">Where Modern Design <br /> Meets Comfort</h1>
        <div className="bg-white rounded-lg shadow-2xl p-3 sm:p-4 mx-auto w-[92%] sm:w-auto max-w-[700px]">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Category */}
            <select
              className="px-3 py-2 border rounded-lg text-gray-700 bg-white basis-full sm:basis-auto"
              value={filterCategory}
              onChange={(e) => {
                const value = e.target.value as 'Ready to Move' | 'Offplan';
                setFilterCategory(value);
                setFilterSubOption(value === 'Ready to Move' ? 'Rent' : 'Projects');
                setFilterLocation('');
                setFilterPrice('');
                setFilterArea('');
              }}
            >
              <option>Ready to Move</option>
              <option>Offplan</option>
            </select>

            {/* Sub-option */}
            <select
              className="px-3 py-2 border rounded-lg text-gray-700 bg-white basis-full sm:basis-auto"
              value={filterSubOption}
              onChange={(e) => setFilterSubOption(e.target.value as any)}
            >
              {filterCategory === 'Ready to Move' ? (
                <>
                  <option>Rent</option>
                  <option>Sale</option>
                </>
              ) : (
                <>
                  <option>Projects</option>
                  <option>Area</option>
                </>
              )}
            </select>

            {/* Dynamic fields */}
            {filterCategory === 'Ready to Move' ? (
              <>
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
                  <DollarSign size={18} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Price"
                    className="w-full focus:outline-none text-gray-900"
                    value={filterPrice}
                    onChange={(e) => setFilterPrice(e.target.value)}
                  />
                </div>
              </>
            ) : filterSubOption === 'Projects' ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 border rounded-lg flex-1 basis-full sm:basis-auto">
                  <Home size={18} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Area"
                    className="w-full focus:outline-none text-gray-900"
                    value={filterArea}
                    onChange={(e) => setFilterArea(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 px-3 py-2 border rounded-lg flex-1 basis-full sm:basis-auto">
                  <DollarSign size={18} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Price (Optional)"
                    className="w-full focus:outline-none text-gray-900"
                    value={filterPrice}
                    onChange={(e) => setFilterPrice(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
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
              </>
            )}

            {/* Apply button with less padding */}
            <button className="bg-[#19233e] text-white px-3 py-2 rounded-lg hover:bg-[#0f172a] transition font-medium flex items-center gap-2 w-full sm:w-auto" onClick={applyFilter}>
              <Search size={18} />
              Filter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFilter;
import React, { useEffect, useState } from 'react';
import { Home, Maximize, MapPin, ChevronRight } from 'lucide-react';

interface FeaturedItem {
  title: string;
  type: string;
  size: string;
  location: string;
  img: string;
}

const items: FeaturedItem[] = [
  {
    title: 'The Wilds Moringa Mansions',
    type: 'Mansion',
    size: '15182 - 19411 Sqft',
    location: 'Dubai Land, Dubai',
    img: '/aerial-view-city-against-sky-sunset-min.webp',
  },
  {
    title: 'Marina Skyline Residences',
    type: 'Apartment',
    size: '950 - 1750 Sqft',
    location: 'Dubai Marina, Dubai',
    img: '/view-modern-skyscrapers-shining-sunrise-lights-dubai-marina-dubai-uae-min.webp',
  },
  {
    title: 'Downtown City Apartments',
    type: 'Apartment',
    size: '820 - 1450 Sqft',
    location: 'Downtown, Dubai',
    img: '/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp',
  },
  {
    title: 'Palm Jumeirah Villas',
    type: 'Villa',
    size: '4500 - 6000 Sqft',
    location: 'Palm Jumeirah, Dubai',
    img: '/panorama-pudong-business-reflection-sky-office-min.webp',
  },
];

const FeaturedProjects: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const current = items[index];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">FEATURED PROJECTS IN UAE</h2>
        <div className="relative rounded-lg overflow-hidden">
          <div className="relative w-full h-[300px] sm:h-[420px] md:h-[520px]">
            {items.map((item, i) => (
              <img
                key={item.title}
                src={item.img}
                alt={item.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                decoding="async"
                aria-hidden={i !== index}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" aria-hidden="true" />

          <div className="absolute left-6 bottom-6 sm:left-8 sm:bottom-8 text-white">
            <div className="flex items-center gap-2 text-base sm:text-lg font-medium">
              <span>{current.title}</span>
              <ChevronRight size={18} className="opacity-90" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-white/10 border border-white/20">
                <Home size={14} /> {current.type}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-white/10 border border-white/20">
                <Maximize size={14} /> {current.size}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-white/10 border border-white/20">
                <MapPin size={14} /> {current.location}
              </span>
            </div>
          </div>

          {/* simple indicators */}
          <div className="absolute right-4 bottom-4 flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`slide ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
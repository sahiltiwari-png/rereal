import React from 'react';

const brands = [
  { src: '/logo_01_4fd8dc607d.webp', alt: 'Brand 1' },
  { src: '/logo_02_1_666ef04015.webp', alt: 'Brand 2' },
  { src: '/Damac_c63829f7d0.webp', alt: 'DAMAC' },
  { src: '/Nshama_d050bf7db0.webp', alt: 'NSHAMA' },
  { src: '/Samana_0d2d98f91c.webp', alt: 'SAMANA' }
];

const BrandSlider: React.FC = () => {
  const loop = [...brands, ...brands];
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <div className="brand-marquee flex items-center gap-6 md:gap-8 w-max">
            {loop.map((brand, idx) => (
              <div key={idx} className="flex-none bg-gray-50 rounded-lg h-24 md:h-28 w-36 md:w-40 flex items-center justify-center shadow-sm">
                <img src={brand.src} alt={brand.alt} className="h-10 md:h-12 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
import { useState, useRef } from 'react';

interface Panel {
  src: string;
  title: string;
  description: string;
}

const panels: Panel[] = [
  {
    src: '/buildings-city-against-sky-min.webp',
    title: 'Burj Khalifa',
    description: "World’s tallest tower with stunning views.",
  },
  {
    src: '/dubai-frame-zabeel-park-dubai-2.webp',
    title: 'Dubai Frame',
    description: 'Gateway between old and new Dubai.',
  },
  {
    src: '/reflection-buildings-glass-window-min.webp',
    title: 'Museum of the Future',
    description: 'Iconic futuristic landmark.',
  },
  {
    src: '/dubai-united-arab-emirates-november-11-view-dubai-marina-towers-dubai-united-arab-emirates-november-11-2014-dubai-marina-is-district-dubai-artificial-canal-city-min.webp',
    title: 'Dubai Marina',
    description: 'Waterfront living and glittering skyline.',
  },
  {
    src: '/aerial-view-city-against-sky-sunset-min.webp',
    title: 'Sunset Over Downtown',
    description: 'Golden hour across the skyline.',
  },
  {
    src: '/city-rotterdam-netherlands-min.webp',
    title: 'Coastal Cityscape',
    description: 'Modern architecture and waterways.',
  },
];

export default function LandmarkShowcase() {
  const slides = panels.slice(0, 5); // show 5 items to match 5 dots
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const startXRef = useRef<number | null>(null);
  const deltaXRef = useRef<number>(0);

  const next = () => setActiveIndex((i) => (i + 1) % slides.length);
  const prev = () => setActiveIndex((i) => (i - 1 + slides.length) % slides.length);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startXRef.current = e.touches[0].clientX;
    deltaXRef.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startXRef.current == null) return;
    deltaXRef.current = e.touches[0].clientX - startXRef.current;
  };
  const onTouchEnd = () => {
    const threshold = 50; // px to trigger slide
    if (deltaXRef.current > threshold) {
      prev();
    } else if (deltaXRef.current < -threshold) {
      next();
    }
    startXRef.current = null;
    deltaXRef.current = 0;
  };

  return (
    <section className="py-12 bg-[#19233e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-white text-center">
            Popular Properties in Dubai Communities
          </h2>
        </div>

        <div
          className="relative rounded-xl overflow-hidden shadow-xl h-64 md:h-80 lg:h-96"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex h-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((panel, idx) => (
              <div key={panel.src} className="relative min-w-full h-full">
                <img
                  src={panel.src}
                  alt={panel.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="bg-black/40 backdrop-blur-sm rounded-md p-3 sm:p-4">
                    <h3 className="!text-[20px] !font-[700] tracking-wide">{panel.title}</h3>
                    <p className="!text-[16px] !font-[400] text-gray-200 mt-1">{panel.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white px-3 py-2 rounded"
            onClick={prev}
          >
            ‹
          </button>
          <button
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white px-3 py-2 rounded"
            onClick={next}
          >
            ›
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full ${i === activeIndex ? 'bg-blue-700' : 'bg-gray-300'}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

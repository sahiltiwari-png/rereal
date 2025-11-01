import { useState } from 'react';

interface Panel {
  src: string;
  title: string;
  description: string;
}

const panels: Panel[] = [
  {
    src: '/buildings-city-against-sky.jpg',
    title: 'Burj Khalifa',
    description: "World’s tallest tower with stunning views.",
  },
  {
    src: '/dubai-frame-zabeel-park-dubai (2).jpg',
    title: 'Dubai Frame',
    description: 'Gateway between old and new Dubai.',
  },
  {
    src: '/reflection-buildings-glass-window.jpg',
    title: 'Museum of the Future',
    description: 'Iconic futuristic landmark.',
  },
  {
    src: '/dubai-united-arab-emirates-november-11-view-dubai-marina-towers-dubai-united-arab-emirates-november-11-2014-dubai-marina-is-district-dubai-artificial-canal-city.jpg',
    title: 'Dubai Marina',
    description: 'Waterfront living and glittering skyline.',
  },
  {
    src: '/aerial-view-city-against-sky-sunset.jpg',
    title: 'Sunset Over Downtown',
    description: 'Golden hour across the skyline.',
  },
  {
    src: '/city-rotterdam-netherlands.jpg',
    title: 'Coastal Cityscape',
    description: 'Modern architecture and waterways.',
  },
];

export default function LandmarkShowcase() {
  const [active, setActive] = useState<number | null>(null);
  const [parallax, setParallax] = useState<Record<number, number>>({});

  const handleMove = (idx: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const offset = ((y / rect.height) - 0.5) * 12; // subtle parallax
    setParallax((prev) => ({ ...prev, [idx]: offset }));
  };

  return (
    <section className="py-12 bg-[#19233e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-white text-center">Popular Properties in Dubai Communities</h2>
        </div>
        <div
          className="flex gap-0 rounded-xl overflow-hidden shadow-xl h-64 md:h-80 lg:h-96 items-stretch"
          onMouseLeave={() => setActive(null)}
        >
          {panels.map((panel, idx) => {
            const isActive = active === idx;
            // Use flex-grow ratios instead of fixed percentages so panels always fill 100% width
            const grow = active === null ? 1 : (isActive ? 2 : 1);
            const brightness = 'brightness-100';
            const opacity = active === null ? 'opacity-100' : isActive ? 'opacity-100' : 'opacity-80';
            return (
              <div
                key={panel.src}
                className="relative overflow-hidden cursor-pointer transition-all duration-500 ease-out h-full min-w-0"
                style={{ flex: `${grow} 1 0%` }}
                onMouseEnter={() => setActive(idx)}
                onMouseMove={(e) => handleMove(idx, e)}
              >
                <img
                  src={panel.src}
                  alt={panel.title}
                  className={`absolute inset-0 w-full h-full object-cover ${brightness} ${opacity} transition-transform duration-700 ease-out`}
                  style={{ transform: `translateY(${parallax[idx] || 0}px) scale(${isActive ? 1.08 : 1.02})` }}
                />
                {/* Soft overlay: none by default; subtle on active for text readability */}
                <div className={`absolute inset-0 ${isActive ? 'bg-black/30' : 'bg-black/0'} transition-opacity`}></div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className={`bg-black/40 backdrop-blur-sm rounded-md p-3 sm:p-4 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <h3 className="text-[30px] font-bold tracking-wide">{panel.title}</h3>
                    <p className="text-gray-200 text-base font-normal mt-1">{panel.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
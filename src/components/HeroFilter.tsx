import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Home, Search } from 'lucide-react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

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
  const [filterCategory, setFilterCategory] = useState<'Ready to Move' | 'Off Plan'>('Off Plan');
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    
    if (heroTextRef.current) {
      // Create a SplitText instance
      const split = new SplitText(heroTextRef.current, {
        type: "words",
        linesClass: "overflow-hidden"
      });

      // Set initial state
      gsap.set(split.words, { 
        y: 50,
        opacity: 0
      });

      // Animate words
      gsap.to(split.words, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
      });
    }
  }, []);
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

  // Small custom select to replace native select for consistent dropdown styling
  const CustomSelect: React.FC<{
    value: string;
    options: string[];
    onChange: (v: string) => void;
    className?: string;
  }> = ({ value, options, onChange, className = '' }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const onDoc = (e: MouseEvent) => {
        if (!ref.current) return;
        if (!ref.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener('mousedown', onDoc);
      return () => document.removeEventListener('mousedown', onDoc);
    }, []);

    return (
      <div ref={ref} className={`relative ${className}`}>
        <button
          type="button"
          className="w-full text-left flex items-center justify-between px-3 py-2 border rounded-lg bg-white"
          onClick={() => setOpen((s) => !s)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="text-gray-700">{value}</span>
          <svg className="ml-2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <ul role="listbox" className="absolute left-0 mt-1 w-full bg-white border rounded shadow-lg z-50 max-h-60 overflow-auto">
            {options.map((opt) => (
              <li
                key={opt}
                role="option"
                aria-selected={opt === value}
                className={`px-3 py-2 cursor-pointer transition-colors ${opt === value ? 'bg-[#19233e] text-white' : 'text-gray-800 hover:text-[#19233e]'}`}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
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
        <h1 ref={heroTextRef} className="font-bold mb-6 md:mb-8 heading-raleway hero-heading-4rem">Where Modern Design <br /> Meets Comfort</h1>

        {/* Top pill buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button className="px-6 py-2 bg-[#19233e] text-white rounded-full shadow-sm">Buy</button>
          <button className="px-6 py-2 bg-[#19233e] text-white rounded-full shadow-sm">Rent</button>
          <button className="px-6 py-2 bg-[#19233e] text-white rounded-full shadow-sm">New Projects</button>
        </div>

        {/* Main filter bar */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mx-auto w-[95%] sm:w-auto max-w-[1200px]">
          {/* Keep everything on one line on md+ screens to reduce height */}
          <div className="flex items-center gap-3 md:gap-4 flex-wrap md:flex-nowrap">
            {/* Availability select (Off Plan / Ready to Move) */}
            <CustomSelect
              value={filterCategory}
              options={['Off Plan', 'Ready to Move']}
              onChange={(v) => setFilterCategory(v as 'Off Plan' | 'Ready to Move')}
              className="min-w-[160px] shrink-0"
            />

            {/* Search field */}
            <div className="flex-1 min-w-[240px] md:min-w-[280px]">
              <div className="flex items-center gap-3 px-4 py-2 border rounded-lg bg-white">
                <Search className="h-5 w-5 text-[#19233e]" />
                <input
                  type="text"
                  placeholder="Search Property..."
                  className="w-full focus:outline-none text-gray-700 placeholder-gray-500"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Developer select */}
            <div className="flex items-center gap-3 min-w-[160px] px-4 py-2 border rounded-lg bg-white shrink-0">
              <div className="text-[#c1a78f]"><Home className="h-5 w-5" /></div>
              <div className="flex-1 text-left text-gray-700">Developer</div>
              <div className="text-gray-400">+</div>
            </div>

            {/* More Options */}
            <div className="flex items-center gap-3 min-w-[120px] px-4 py-2 border rounded-lg bg-white justify-between shrink-0">
              <div className="text-gray-700">More Options</div>
              <div className="text-[#19233e] font-bold">+</div>
            </div>

            {/* Search Button */}
            <button onClick={applyFilter} className="px-6 py-2 bg-[#19233e] hover:bg-[#162a3a] text-white rounded-lg min-w-[120px] shrink-0">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFilter;
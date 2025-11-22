import { useState, useEffect, useRef } from 'react';
import { MapPin, Home, Building2, Key, TrendingUp, Users, Award, Star, Phone, Mail, MessageSquare, ChevronRight, ChevronLeft, Bed, Bath, Maximize } from 'lucide-react';
import QuickConnectPanel from './components/QuickConnectPanel';
import FeaturedProjects from './components/FeaturedProjects';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroFilter from './components/HeroFilter';
import BrandSlider from './components/BrandSlider';
import Footer from './components/Footer';
import LandmarkShowcase from './components/LandmarkShowcase';
import PropertyDetails from './components/PropertyDetails';
import ContactPage from './components/ContactPage';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url: string;
  property_type: string;
  featured: boolean;
}

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  published_at: string;
}

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar_url: string;
}

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const carouselImages = [
    '/view-modern-skyscrapers-shining-sunrise-lights-dubai-marina-dubai-uae-min.webp',
    '/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp',
    '/panorama-pudong-business-reflection-sky-office-min.webp',
    '/dubai-united-arab-emirates-november-11-view-dubai-marina-towers-dubai-united-arab-emirates-november-11-2014-dubai-marina-is-district-dubai-artificial-canal-city-min.webp',
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [quickConnectOpen, setQuickConnectOpen] = useState(false);
  useEffect(() => {
    const onOpen = () => setQuickConnectOpen(true);
    window.addEventListener('open-quick-connect', onOpen);
    return () => window.removeEventListener('open-quick-connect', onOpen);
  }, []);
  const offPlanRef = useRef<HTMLDivElement>(null);

  // Auto-scroll state for Off-Plan row (pauses on hover)
  const autoScrollPaused = useRef(false);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const apiBase = "http://65.1.55.93:4000/api";
        const res = await fetch(`${apiBase}/properties`);
        if (!res.ok) return;
        const data = await res.json();
        const mapped: Property[] = (Array.isArray(data) ? data : []).map((p: any) => ({
          id: String(p._id || p.id || p.name || Math.random()),
          title: String(p.name || p.title || 'Property'),
          location: String(p.location || 'Dubai'),
          price: Number(p.originalPrice || p.price || 0),
          bedrooms: Number(p.bedrooms || 0),
          bathrooms: Number(p.bathrooms || 0),
          area: Number(p.dimensions ? String(p.dimensions).replace(/[^0-9.]/g, '') : p.area || 0),
          image_url: Array.isArray(p.images) && p.images.length ? String(p.images[0].url) : '/applog-min.webp',
          property_type: String(p.category || 'Property'),
          featured: false,
        }));
        setProperties(mapped);
      } catch {}
    };
    loadProperties();
  }, []);

  const slugify = (s: string) =>
    String(s || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  // Popular Communities carousel — restored
  const communityCards = [
    {
      src: '/living-room-with-couch-chairs-mirror.webp',
      title: 'High rise apartments',
      description:
        "Dubai's real estate market is characterized by diverse and highly sought-after communities.",
    },
    {
      src: '/luxury-living-room-interior-min.webp',
      title: 'Luxury Villas',
      description:
        'Dubai offers premium villa communities known for spacious layouts, privacy, and world-class amenities.',
    },
    {
      src: '/view-modern-skyscrapers-shining-sunrise-lights-dubai-marina-dubai-uae-min.webp',
      title: 'Waterfront Properties',
      description:
        "Exclusive homes with stunning sea views, blending premium living with direct access to Dubai's coastline.",
    },
    {
      src: '/living-room-with-couch-table-lamp.webp',
      title: 'Downtown Living',
      description:
        'Vibrant urban dining, arts, and attractions at the heart of the city.',
    },
    // Optional more cards to enable multiple pages
    {
      src: '/aerial-view-city-against-sky-sunset-min.webp',
      title: 'Sunset City Views',
      description:
        'Panoramic skylines and serene vistas across premier districts.',
    },
    {
      src: '/modern-buildings-city-against-sky.webp',
      title: 'Modern Districts',
      description:
        'Contemporary living with easy access to business and leisure hubs.',
    },
    {
      src: '/finestimage-min.webp',
      title: 'Prestige Residences',
      description:
        'Refined spaces curated for elevated lifestyles and lasting value.',
    },
    {
      src: '/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp',
      title: 'Central Communities',
      description:
        'Convenient locations with strong connectivity and urban comfort.',
    },
  ];
  // Communities row — single line, auto-scroll, dots navigation
  const communityRef = useRef<HTMLDivElement>(null);
  const communityAutoPaused = useRef(false);
  const [communityPage, setCommunityPage] = useState(0);
  const communityCardsPerPage = 3; // dots jump by 3 cards
  const communityPageCount = Math.ceil(communityCards.length / communityCardsPerPage);

  useEffect(() => {
    const el = communityRef.current;
    if (!el) return;
    let rafId = 0;
    const speed = 0.6; // pixels per frame
    const step = () => {
      if (!communityAutoPaused.current) {
        el.scrollLeft += speed;
        // loop when reaching end
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0 && el.scrollLeft >= max) {
          el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const scrollCommunity = (dir: 'prev' | 'next') => {
    const el = communityRef.current;
    if (!el) return;
    communityAutoPaused.current = true;
    const firstChild = el.children[0] as HTMLElement | undefined;
    const cardWidth = firstChild ? firstChild.getBoundingClientRect().width + parseFloat(getComputedStyle(el).gap || '0') : el.clientWidth * 0.8;
    const currentIndex = Math.round(el.scrollLeft / cardWidth);
    const targetIndex = dir === 'next' ? currentIndex + 1 : Math.max(0, currentIndex - 1);
    const target = Math.round(targetIndex * cardWidth);
    el.scrollTo({ left: target, behavior: 'smooth' });
    window.setTimeout(() => { communityAutoPaused.current = false; }, 700);
  };

  const goToCommunityPage = (index: number) => {
    const el = communityRef.current;
    if (!el) return;
    communityAutoPaused.current = true;
    const firstChild = el.children[0] as HTMLElement | undefined;
    const cardWidth = firstChild ? firstChild.getBoundingClientRect().width + parseFloat(getComputedStyle(el).gap || '0') : el.clientWidth * 0.8;
    const target = Math.round(index * communityCardsPerPage * cardWidth);
    setCommunityPage(index);
    el.scrollTo({ left: target, behavior: 'smooth' });
    window.setTimeout(() => { communityAutoPaused.current = false; }, 700);
  };

  // Highlights grid content (9 tiles) — will render with the same
  // card layout styles used in "Popular Properties in Dubai Communities"
  const highlightCards = [
    {
      src: '/aerial-view-city-against-sky-sunset-min.webp',
      title: 'Hot Property Launches',
      description:
        'Discover the newest and most sought-after projects fresh on the Dubai market.',
    },
    {
      src: '/view-modern-skyscrapers-shining-sunrise-lights-dubai-marina-dubai-uae-min.webp',
      title: 'Top Resale Deals',
      description:
        'Unlock unbeatable value with handpicked pre-owned homes across prime locations.',
    },
    {
      src: '/luxury-living-room-interior-min.webp',
      title: 'Trending Rental Homes',
      description:
        'Browse the most in-demand rental listings tailored to your lifestyle and budget.',
    },
    {
      src: '/finestimage-min.webp',
      title: 'UAE Golden Visa',
      description:
        'Explore long-term residency options through property investment and professional excellence.',
    },
    {
      src: '/assets/teamimage.webp',
      title: 'DRE Brand Video',
      description:
        'Discover what makes DRE a trusted name in Dubai real estate through our story in motion.',
    },
    {
      src: '/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp',
      title: 'Dubai Evolution',
      description:
        'Experience Dubai’s transformation from desert to global icon in one powerful visual journey.',
    },
    {
      src: '/assets/team2.webp',
      title: 'Get to Know Us',
      description:
        'Learn more about DRE — your trusted partner in Dubai’s dynamic real estate landscape.',
    },
    {
      src: '/assets/hand-holding-graph-increasing.webp',
      title: 'Property Management',
      description:
        'From tenant sourcing to maintenance, we handle your investment like it’s our own.',
    },
    {
      src: '/assets/palm-jumeirah.webp',
      title: 'Explore Dubai Communities',
      description:
        'Dive into detailed guides and listings across Dubai’s most vibrant neighborhoods.',
    },
  ];

  useEffect(() => {
    const el = offPlanRef.current;
    if (!el) return;
    let rafId = 0;
    const speed = 0.6; // pixels per frame
    const step = () => {
      if (!autoScrollPaused.current) {
        el.scrollLeft += speed;
        const loopWidth = el.scrollWidth / 2; // width of first set (we duplicate cards)
        if (loopWidth > 0 && el.scrollLeft >= loopWidth) {
          el.scrollLeft -= loopWidth; // seamless wrap
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const scrollOffPlan = (dir: 'prev' | 'next') => {
    const el = offPlanRef.current;
    if (!el) return;
    // Pause auto-scroll while user-triggered scroll is happening
    autoScrollPaused.current = true;
    // Try to compute card width from first child for precise snapping
    const firstChild = el.children[0] as HTMLElement | undefined;
    const cardWidth = firstChild ? firstChild.getBoundingClientRect().width + parseFloat(getComputedStyle(el).gap || '0') : el.clientWidth * 0.8;
    // Determine current index (approx)
    const currentIndex = Math.round(el.scrollLeft / cardWidth);
    const targetIndex = dir === 'next' ? currentIndex + 1 : Math.max(0, currentIndex - 1);
    const target = Math.round(targetIndex * cardWidth);
    el.scrollTo({ left: target, behavior: 'smooth' });
    // Resume auto-scroll shortly after smooth scroll likely finished
    window.setTimeout(() => {
      autoScrollPaused.current = false;
    }, 700);
  };

  useEffect(() => {
    fetchProperties();
    fetchNews();
    fetchTestimonials();
  }, []);

  // If a property is selected, render the details page
  if (selectedProperty) {
    return (
      <div className="bg-white">
        <Navbar />
        <PropertyDetails
          property={{
            id: selectedProperty.id,
            title: selectedProperty.title,
            location: selectedProperty.location,
            price: selectedProperty.price,
            image_url: selectedProperty.image_url,
          }}
          onClose={() => setSelectedProperty(null)}
        />
        <Footer />
      </div>
    );
  }

  const fetchProperties = async () => {
    // Mock data to display properties without Supabase
    const data: Property[] = [
      {
        id: 'prop-1',
        title: 'Luxury Downtown Apartment',
        location: 'Downtown Dubai',
        price: 4500000,
        bedrooms: 3,
        bathrooms: 3,
        area: 2200,
        image_url: '/living-room-with-couch-chairs-mirror.webp',
        property_type: 'Apartment',
        featured: true,
      },
      {
        id: 'prop-2',
        title: 'Palm Beach Villa',
        location: 'Palm Jumeirah',
        price: 8500000,
        bedrooms: 5,
        bathrooms: 4,
        area: 5000,
        image_url: '/luxury-living-room-interior-min.webp',
        property_type: 'Villa',
        featured: true,
      },
      {
        id: 'prop-3',
        title: 'Marina View Residence',
        location: 'Dubai Marina',
        price: 3200000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1500,
        image_url: '/3d-rendering-luxury-modern-living-room-with-leather-sofa-lamp-wood-decor-loft-style-min.webp',
        property_type: 'Apartment',
        featured: false,
      },
      {
        id: 'prop-4',
        title: 'Business Bay Duplex',
        location: 'Business Bay',
        price: 5200000,
        bedrooms: 4,
        bathrooms: 3,
        area: 3500,
        image_url: '/3d-rendering-modern-dining-room-living-room-with-luxury-decor-min.webp',
        property_type: 'Penthouse',
        featured: false,
      },
      {
        id: 'prop-5',
        title: 'JBR Seaside Home',
        location: 'JBR',
        price: 2800000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1400,
        image_url: '/living-room-with-couch-table-lamp.webp',
        property_type: 'Apartment',
        featured: false,
      },
      {
        id: 'prop-6',
        title: 'Dubai Hills Family Villa',
        location: 'Dubai Hills',
        price: 6000000,
        bedrooms: 4,
        bathrooms: 4,
        area: 4000,
        image_url: '/3d-rendering-contemporary-modern-dining-room-living-room-with-luxury-decor-min.webp',
        property_type: 'Villa',
        featured: true,
      },
    ];
    
    setProperties(data);
    setAllProperties(data);
  };

  const fetchNews = async () => {
    // Mock news articles
    const data: NewsArticle[] = [
      {
        id: 'news-1',
        title: "Dubai Building Sector Sets Sales Record",
        excerpt: "The Dubai real estate market continues to show remarkable growth with record-breaking sales...",
        image_url: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600',
        published_at: '2025-03-05',
      },
      {
        id: 'news-2',
        title: "New Developments Announced in Prime Locations",
        excerpt: "Major developers announce exciting new projects in prime Dubai locations...",
        image_url: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600',
        published_at: '2025-03-12',
      },
      {
        id: 'news-3',
        title: "Market Outlook: Trends for Q2 2025",
        excerpt: "Analysts forecast continued strength across residential and off-plan segments...",
        image_url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
        published_at: '2025-04-01',
      },
    ];
    setNews(data);
  };

  const fetchTestimonials = async () => {
    // Mock testimonials
    const data: Testimonial[] = [
      {
        id: 'test-1',
        name: 'Aisha Khan',
        rating: 5,
        comment: 'Outstanding service from start to finish. The team at Trivara helped us find our dream home in Dubai Marina.',
        avatar_url: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      {
        id: 'test-2',
        name: 'Michael Chen',
        rating: 5,
        comment: 'Professional and knowledgeable. Their property management services have been exceptional for my investments.',
        avatar_url: 'https://randomuser.me/api/portraits/men/12.jpg',
      },
      {
        id: 'test-3',
        name: 'Fatima Al Mansoori',
        rating: 5,
        comment: 'Exceptional guidance throughout the entire buying process. Highly recommended!',
        avatar_url: 'https://randomuser.me/api/portraits/women/43.jpg',
      },
    ];
    setTestimonials(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // No backend connected; just simulate successful submission
    setFormData({ name: '', email: '', phone: '', message: '' });
    alert('Thank you for your message! We will contact you soon.');
  };

  const nextSlide = () => setCarouselIndex((i) => (i + 1) % carouselImages.length);
  const prevSlide = () => setCarouselIndex((i) => (i - 1 + carouselImages.length) % carouselImages.length);

  // Filtering handled in HeroFilter component via onApply callback

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      <HeroFilter allProperties={allProperties} onApply={setProperties} />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
             Dubai real estate with exceptional <br /> customer focus.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div
              data-aos="fade-up"
              data-aos-duration="450"
              data-aos-delay="0"
              className="text-center p-6 border rounded-lg cursor-pointer transform-gpu will-change-[transform] transition-transform duration-200 ease-out hover:shadow-xl hover:animate-[gentle-bounce_220ms_ease-out_1]"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
            <img src="/Residential-icon.png" alt="Residential" className="w-12 h-12 object-contain" loading="lazy" decoding="async" />
                </div>
              </div>
              <h3 className="font-semibold text-base mb-2 compact-heading">Residential</h3>
              <p className="text-gray-600 text-sm">Explore our finest<br />residential offerings</p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="450"
              data-aos-delay="100"
              className="text-center p-6 border rounded-lg cursor-pointer transform-gpu will-change-[transform] transition-transform duration-200 ease-out hover:shadow-xl hover:animate-[gentle-bounce_220ms_ease-out_1]"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
            <img src="/Discover-Excellent-Developments-icons.png" alt="Off Plan" className="w-12 h-12 object-contain" loading="lazy" decoding="async" />
                </div>
              </div>
              <h3 className="font-semibold text-base mb-2 compact-heading">Off Plan Property</h3>
              <p className="text-gray-600 text-sm">Discover exclusive<br />pre-launch opportunities</p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="450"
              data-aos-delay="200"
              className="text-center p-6 border rounded-lg cursor-pointer transform-gpu will-change-[transform] transition-transform duration-200 ease-out hover:shadow-xl hover:animate-[gentle-bounce_220ms_ease-out_1]"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
            <img src="/Commercial-icon.png" alt="Commercial" className="w-12 h-12 object-contain" loading="lazy" decoding="async" />
                </div>
              </div>
              <h3 className="font-semibold text-base mb-2 compact-heading">Commercial</h3>
              <p className="text-gray-600 text-sm">Find the perfect space<br />for your business</p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="450"
              data-aos-delay="300"
              className="text-center p-6 border rounded-lg cursor-pointer transform-gpu will-change-[transform] transition-transform duration-200 ease-out hover:shadow-xl hover:animate-[gentle-bounce_220ms_ease-out_1]"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
            <img src="/Market-Insights-icons.png" alt="Market Insights" className="w-12 h-12 object-contain" loading="lazy" decoding="async" />
                </div>
              </div>
              <h3 className="font-semibold text-base mb-2 compact-heading">Market Insights</h3>
              <p className="text-gray-600 text-sm">Stay informed with<br />expert market analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Properties in Dubai Communities — single-line auto-scrolling row */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Popular Properties in Dubai Communities</h2>
          <div className="relative">
            {/* Controls */}
            <button
              aria-label="Previous"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/60 text-white rounded-full p-2 hover:bg-gray-900/80"
              onClick={() => scrollCommunity('prev')}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Next"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/60 text-white rounded-full p-2 hover:bg-gray-900/80"
              onClick={() => scrollCommunity('next')}
            >
              <ChevronRight size={18} />
            </button>

            {/* Row */}
            <div
              ref={communityRef}
              className="flex gap-6 overflow-x-auto no-scrollbar pb-2"
              style={{ scrollBehavior: 'smooth' }}
              onMouseEnter={() => { communityAutoPaused.current = true; }}
              onMouseLeave={() => { communityAutoPaused.current = false; }}
            >
              {communityCards.map((card) => (
                <div key={card.title} className="relative flex-none w-72 sm:w-80 cursor-pointer transform-gpu will-change-[transform] transition-transform duration-200 ease-out hover:scale-[1.03] hover:animate-[gentle-bounce_220ms_ease-out_1] hover:z-10">
                  <div className="rounded-xl overflow-hidden shadow-md transition-shadow hover:shadow-xl">
                    <div className="relative h-96 md:h-[440px]">
                      <img
                        src={card.src}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover transition-[transform] duration-150 ease-out hover:scale-[1.02]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                        <h3 className="!text-[20px] !font-[700] mb-3 text-white">{card.title}</h3>
                        <p className="!text-[16px] !font-[400] text-white leading-relaxed">{card.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {Array.from({ length: communityPageCount }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to group ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full ${i === communityPage ? 'bg-blue-700' : 'bg-gray-300'}`}
                  onClick={() => goToCommunityPage(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dubai's Premier Property Marketplace (moved below Popular Properties) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Dubai's Premier Property Marketplace</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
            <img src="/Trivara-Website-offplan-icons.png" alt="Discover Excellent Developments" className="w-20 h-20 object-contain" loading="lazy" decoding="async" />
              </div>
              <h3 className="font-semibold text-base mb-2 compact-heading">Discover Excellent Developments</h3>
              <p className="text-gray-600 text-sm">Access exclusive properties across Dubai</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
            <img src="/Premier-Real-Estate-Network-icon.png" alt="Premier Real Estate Network" className="w-20 h-20 object-contain" loading="lazy" decoding="async" />
              </div>
              <h3 className="font-semibold text-base mb-2 compact-heading">Premier Real Estate Network</h3>
              <p className="text-gray-600 text-sm">Connected to top agents and developers</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
            <img src="/Expert-Guidance-Always-icon.png" alt="Expert Guidance Always" className="w-20 h-20 object-contain" loading="lazy" decoding="async" />
              </div>
              <h3 className="font-semibold text-base mb-2 compact-heading">Expert Guidance Always</h3>
              <p className="text-gray-600 text-sm">Professional support at every step</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights grid (based on provided screenshot) with Communities card styling */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-8 max-w-6xl mx-auto">
            {highlightCards.map((card) => (
              <div
                key={`${card.title}-${card.src}`}
                className="relative rounded-lg overflow-hidden group cursor-pointer transform-gpu will-change-[transform] isolate contain-content"
              >
                <div className="relative h-96 md:h-[440px] transform-gpu will-change-[transform]">
                  <img
                    src={card.src}
                    alt={card.title}
                    className="w-full h-full object-cover transition-[transform] duration-150 ease-out group-hover:scale-[1.02] brightness-100 transform-gpu will-change-[transform] select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                    <h3 className="!text-[20px] !font-[700] mb-3 text-white">{card.title}</h3>
                    <p className="!text-[16px] !font-[400] text-white leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Off-Plan Properties (new section before Featured Projects) */}
      <section className="py-12 bg-[#0d1f3c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left copy block */}
            <div className="bg-transparent">
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">Off-Plan<br />Properties</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Find the UAE’s most promising off-plan projects with a team that understands your goals. From smart payment plans to early investment advantages, we
                connect you to opportunities that deliver real value.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Discover exclusive off-plan opportunities designed for long-term growth and lifestyle appeal. Whether you're seeking high ROI, flexible entry points, or premium locations, we guide you toward developments that match your investment vision. Unlock access to top-tier projects backed by reputable developers and strong market fundamentals. With clear insights, tailored guidance, and a focus on value, we help you move confidently toward the right property decisions.
              </p>
              <button className="bg-[#f6f0df] text-gray-900 px-5 py-2 rounded-md text-sm font-medium hover:bg-[#efe7d0] transition">View All</button>
            </div>
            {/* Right cards row */}
            <div>
              <div
                ref={offPlanRef}
                className="flex gap-6 overflow-x-auto no-scrollbar pb-2"
                style={{ scrollBehavior: 'smooth' }}
                onMouseEnter={() => { autoScrollPaused.current = true; }}
                onMouseLeave={() => { autoScrollPaused.current = false; }}
              >
                {/* Card 1 */}
                <div className="relative flex-none w-72 sm:w-80 snap-start cursor-pointer transform-gpu will-change-[transform] transition-transform duration-200 ease-out hover:scale-[1.03] hover:animate-[gentle-bounce_220ms_ease-out_1] hover:z-10" onClick={() => setSelectedProperty({ id: 'off-1', title: 'Nad Al Sheba Gardens Phase 7', location: 'Nad Al Sheba', price: 4430000, bedrooms: 3, bathrooms: 3, area: 2100, image_url: '/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp', property_type: 'Villa', featured: false })}>
                  <div className="rounded-xl overflow-hidden shadow-md transition-shadow hover:shadow-xl">
                    <div className="relative h-96 md:h-[440px]">
                      <img src="/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp" alt="Nad Al Sheba Gardens" className="absolute inset-0 w-full h-full object-cover transition-[transform] duration-150 ease-out hover:scale-[1.02]" loading="lazy" decoding="async" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-[#f6f0df] text-gray-900 rounded-md p-3 shadow-sm">
                          <div className="font-semibold text-sm">Nad Al Sheba Gardens Phase 7</div>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <MapPin size={14} className="text-gray-700" />
                            <span>Nad Al Sheba</span>
                          </div>
                          <div className="text-xs mt-2">AED 4,430,000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card 2 */}
                <div className="relative flex-none w-72 sm:w-80 snap-start cursor-pointer transform-gpu will-change-[transform] transition-transform duration-200 ease-out hover:scale-[1.03] hover:animate-[gentle-bounce_220ms_ease-out_1] hover:z-10" onClick={() => setSelectedProperty({ id: 'off-2', title: 'Skyvue Solair at Sobha Hartland 2', location: 'Sobha Hartland 2', price: 1280000, bedrooms: 2, bathrooms: 2, area: 1250, image_url: '/panorama-pudong-business-reflection-sky-office-min.webp', property_type: 'Apartment', featured: false })}>
                  <div className="rounded-xl overflow-hidden shadow-md transition-shadow hover:shadow-xl">
                    <div className="relative h-96 md:h-[440px]">
                      <img src="/panorama-pudong-business-reflection-sky-office-min.webp" alt="Skyvue Solair at Sobha Hartland 2" className="absolute inset-0 w-full h-full object-cover transition-[transform] duration-150 ease-out hover:scale-[1.02]" loading="lazy" decoding="async" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-[#f6f0df] text-gray-900 rounded-md p-3 shadow-sm">
                          <div className="font-semibold text-sm">Skyvue Solair at Sobha Hartland 2</div>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <MapPin size={14} className="text-gray-700" />
                            <span>Sobha Hartland 2</span>
                          </div>
                          <div className="text-xs mt-2">AED 1,280,000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card 3 */}
                <div className="relative flex-none w-72 sm:w-80 snap-start cursor-pointer transform-gpu will-change-[transform] transition-transform duration-200 ease-out hover:scale-[1.03] hover:animate-[gentle-bounce_220ms_ease-out_1] hover:z-10" onClick={() => setSelectedProperty({ id: 'off-3', title: 'La Tilia At Villanova Phase 2', location: 'Dubailand', price: 2690000, bedrooms: 3, bathrooms: 3, area: 1800, image_url: '/aerial-view-city-against-sky-sunset-min.webp', property_type: 'Townhouse', featured: false })}>
                  <div className="rounded-xl overflow-hidden shadow-md transition-shadow hover:shadow-xl">
                    <div className="relative h-96 md:h-[440px]">
                      <img src="/aerial-view-city-against-sky-sunset-min.webp" alt="La Tilia at Villanova" className="absolute inset-0 w-full h-full object-cover transition-[transform] duration-150 ease-out hover:scale-[1.02]" loading="lazy" decoding="async" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-[#f6f0df] text-gray-900 rounded-md p-3 shadow-sm">
                          <div className="font-semibold text-sm">La Tilia At Villanova Phase 2</div>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <MapPin size={14} className="text-gray-700" />
                            <span>Dubailand</span>
                          </div>
                          <div className="text-xs mt-2">AED 2,690,000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Duplicate set for seamless infinite scroll */}
                {/* Card 1 (dup) */}
                <div className="relative flex-none w-72 sm:w-80 snap-start cursor-pointer transform-gpu will-change-[transform] transition-transform duration-200 ease-out hover:scale-[1.03] hover:animate-[gentle-bounce_220ms_ease-out_1] hover:z-10" onClick={() => setSelectedProperty({ id: 'off-1b', title: 'Nad Al Sheba Gardens Phase 7', location: 'Nad Al Sheba', price: 4430000, bedrooms: 3, bathrooms: 3, area: 2100, image_url: '/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp', property_type: 'Villa', featured: false })}>
                  <div className="rounded-xl overflow-hidden shadow-md transition-shadow hover:shadow-xl">
                    <div className="relative h-96 md:h-[440px]">
                      <img src="/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp" alt="Nad Al Sheba Gardens" className="absolute inset-0 w-full h-full object-cover transition-[transform] duration-150 ease-out hover:scale-[1.02]" loading="lazy" decoding="async" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-[#f6f0df] text-gray-900 rounded-md p-3 shadow-sm">
                          <div className="font-semibold text-sm">Nad Al Sheba Gardens Phase 7</div>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <MapPin size={14} className="text-gray-700" />
                            <span>Nad Al Sheba</span>
                          </div>
                          <div className="text-xs mt-2">AED 4,430,000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card 2 (dup) */}
                <div className="relative flex-none w-72 sm:w-80 snap-start cursor-pointer transform-gpu will-change-[transform] transition-transform duration-200 ease-out hover:scale-[1.03] hover:animate-[gentle-bounce_220ms_ease-out_1] hover:z-10" onClick={() => setSelectedProperty({ id: 'off-2b', title: 'Skyvue Solair at Sobha Hartland 2', location: 'Sobha Hartland 2', price: 1280000, bedrooms: 2, bathrooms: 2, area: 1250, image_url: '/panorama-pudong-business-reflection-sky-office-min.webp', property_type: 'Apartment', featured: false })}>
                  <div className="rounded-xl overflow-hidden shadow-md transition-shadow hover:shadow-xl">
                    <div className="relative h-96 md:h-[440px]">
                      <img src="/panorama-pudong-business-reflection-sky-office-min.webp" alt="Skyvue Solair at Sobha Hartland 2" className="absolute inset-0 w-full h-full object-cover transition-[transform] duration-150 ease-out hover:scale-[1.02]" loading="lazy" decoding="async" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-[#f6f0df] text-gray-900 rounded-md p-3 shadow-sm">
                          <div className="font-semibold text-sm">Skyvue Solair at Sobha Hartland 2</div>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <MapPin size={14} className="text-gray-700" />
                            <span>Sobha Hartland 2</span>
                          </div>
                          <div className="text-xs mt-2">AED 1,280,000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card 3 (dup) */}
                <div className="relative flex-none w-72 sm:w-80 snap-start cursor-pointer transform-gpu will-change-[transform] transition-transform duration-200 ease-out hover:scale-[1.03] hover:animate-[gentle-bounce_220ms_ease-out_1] hover:z-10" onClick={() => setSelectedProperty({ id: 'off-3b', title: 'La Tilia At Villanova Phase 2', location: 'Dubailand', price: 2690000, bedrooms: 3, bathrooms: 3, area: 1800, image_url: '/aerial-view-city-against-sky-sunset-min.webp', property_type: 'Townhouse', featured: false })}>
                  <div className="rounded-xl overflow-hidden shadow-md transition-shadow hover:shadow-xl">
                    <div className="relative h-96 md:h-[440px]">
                      <img src="/aerial-view-city-against-sky-sunset-min.webp" alt="La Tilia at Villanova" className="absolute inset-0 w-full h-full object-cover transition-[transform] duration-150 ease-out hover:scale-[1.02]" loading="lazy" decoding="async" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-[#f6f0df] text-gray-900 rounded-md p-3 shadow-sm">
                          <div className="font-semibold text-sm">La Tilia At Villanova Phase 2</div>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <MapPin size={14} className="text-gray-700" />
                            <span>Dubailand</span>
                          </div>
                          <div className="text-xs mt-2">AED 2,690,000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Bottom controls */}
              <div className="flex justify-between items-center mt-4 text-xs text-gray-300">
                <button onClick={() => scrollOffPlan('prev')} className="flex items-center gap-2 hover:text-white transition">
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>
                <button onClick={() => scrollOffPlan('next')} className="flex items-center gap-2 hover:text-white transition">
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects section removed per request */}

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
              UAE’s Finest Branded Communities
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Discover Dubai's most prestigious communities through our comprehensive coffee table book. Featuring exclusive insights into luxury developments and prime locations across the UAE.
              </p>
              <button className="bg-[#19233E] text-white px-6 py-3 rounded hover:bg-[#0f766e] transition text-sm font-medium w-full sm:w-auto">
                Download Free Guide
              </button>
            </div>
            <div className="flex justify-center">
            <img src="/modern-buildings-city-against-sky.webp" alt="UAE’s Finest Branded Communities" className="rounded-lg shadow-xl w-full sm:max-w-lg lg:max-w-xl" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      <section id="properties" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">Explore Properties in Dubai</h2>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button className="px-5 py-2 text-sm border border-gray-300 rounded hover:bg-[#19233e] hover:text-white transition">All</button>
              <button className="px-5 py-2 text-sm border border-gray-300 rounded hover:bg-[#19233e] hover:text-white transition">Rent</button>
              <button className="px-5 py-2 text-sm border border-gray-300 rounded hover:bg-[#19233e] hover:text-white transition">Buy</button>
              <button className="bg-[#19233e] text-white px-5 py-2 text-sm rounded hover:bg-[#0f172a] w-full sm:w-auto sm:ml-auto">View All</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.length > 0 ? (
              properties.map((property) => (
                <Link key={property.id} to={`/property/${slugify(property.title)}`} state={{ property }} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg will-change-transform" style={{ transform: 'translateZ(0)' }}>
                  <div className="relative bg-gray-100">
                    <img 
                      src={property.image_url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400'} 
                      alt={property.title} 
                      className="w-full h-56 object-cover transition-transform duration-300 ease-out hover:scale-105"
                      loading="lazy"
                      width="400"
                      height="224"
                      decoding="async"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-1 text-[#19233e] compact-heading">AED {property.price.toLocaleString()}</h3>
                    <p className="text-gray-600 text-sm mb-3">{property.title}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Bed size={14} />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={14} />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize size={14} />
                        <span>{property.area} sqft</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin size={12} className="mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <>
                <Link to={`/property/${slugify('Luxury Marina Apartment')}`} state={{ property: {
                  id: 'static-1',
                  title: 'Luxury Marina Apartment',
                  location: 'Dubai Marina',
                  price: 2500000,
                  bedrooms: 3,
                  bathrooms: 2,
                  area: 2100,
                  image_url: '/view-modern-skyscrapers-shining-sunrise-lights-dubai-marina-dubai-uae-min.webp',
                  property_type: 'Apartment',
                  featured: false
                } }} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg will-change-transform" style={{ transform: 'translateZ(0)' }}>
                  <div className="relative bg-gray-100">
                    <img 
                      src="/view-modern-skyscrapers-shining-sunrise-lights-dubai-marina-dubai-uae-min.webp" 
                      alt="Dubai Marina Apartments" 
                      className="w-full h-56 object-cover transition-transform duration-300 ease-out hover:scale-105"
                      loading="lazy"
                      width="400"
                      height="224"
                      decoding="async"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-1 text-[#19233e] compact-heading">AED 2,500,000</h3>
                    <p className="text-gray-600 text-sm mb-3">Luxury Marina Apartment</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Bed size={14} />
                        <span>3</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={14} />
                        <span>2</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize size={14} />
                        <span>2100 sqft</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin size={12} className="mr-1" />
                      <span>Dubai Marina</span>
                    </div>
                  </div>
                </Link>
                <Link to={`/property/${slugify('Modern Downtown Villa')}`} state={{ property: {
                  id: 'static-2',
                  title: 'Modern Downtown Villa',
                  location: 'Downtown Dubai',
                  price: 4200000,
                  bedrooms: 4,
                  bathrooms: 3,
                  area: 3500,
                  image_url: '/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp',
                  property_type: 'Villa',
                  featured: false
                } }} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition">
                  <div className="relative">
            <img src="/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp" alt="Dubai Downtown Skyscrapers" className="w-full h-56 object-cover" loading="lazy" decoding="async" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-1 text-[#19233e] compact-heading">AED 4,200,000</h3>
                    <p className="text-gray-600 text-sm mb-3">Modern Downtown Villa</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Bed size={14} />
                        <span>4</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={14} />
                        <span>3</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize size={14} />
                        <span>3500 sqft</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin size={12} className="mr-1" />
                      <span>Downtown Dubai</span>
                    </div>
                  </div>
                </Link>
                <Link to={`/property/${slugify('Beachfront Palm Villa')}`} state={{ property: {
                  id: 'static-3',
                  title: 'Beachfront Palm Villa',
                  location: 'Palm Jumeirah',
                  price: 8500000,
                  bedrooms: 5,
                  bathrooms: 4,
                  area: 5000,
                  image_url: '/aerial-view-city-against-sky-sunset-min.webp',
                  property_type: 'Villa',
                  featured: false
                } }} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition">
                  <div className="relative">
            <img src="/aerial-view-city-against-sky-sunset-min.webp" alt="Palm Jumeirah Villa" className="w-full h-56 object-cover" loading="lazy" decoding="async" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-1 text-[#19233e] compact-heading">AED 8,500,000</h3>
                    <p className="text-gray-600 text-sm mb-3">Beachfront Palm Villa</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Bed size={14} />
                        <span>5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={14} />
                        <span>4</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize size={14} />
                        <span>5000 sqft</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin size={12} className="mr-1" />
                      <span>Palm Jumeirah</span>
                    </div>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <FeaturedProjects />

      <section id="services" className="py-16 bg-[#19233e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
            <img src="/dodo-min.webp" alt="Property Management" className="rounded-lg" loading="lazy" decoding="async" />
            </div>
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4">Professional Property<br />Management for Your Dubai Investment</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our comprehensive property management services ensure your investment is professionally maintained, fully tenanted, and generating optimal returns.
              </p>
              <button className="bg-white text-[#19233E] px-6 py-3 rounded hover:bg-gray-100 transition text-sm font-medium w-full sm:w-auto">
                Learn More About Services
              </button>
            </div>
          </div>
        </div>
      </section>

      <BrandSlider />
      <section className="py-16 bg-[#19233e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/dodopr-min.webp" alt="Dubai" className="rounded-lg" loading="lazy" decoding="async" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-tight">Continued Advice When it Comes to Real Estate in Dubai</h2>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                Navigating the Dubai real estate market requires expertise and local knowledge. Our team provides comprehensive support including market analysis, legal guidance, investment strategies, and post-purchase assistance.
              </p>
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span>In-depth market analysis and trends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span>Legal and regulatory guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span>Investment strategy consultation</span>
                </li>
              </ul>
              <button className="bg-white text-[#19233e] px-6 py-3 rounded hover:bg-gray-100 transition text-sm font-medium border border-white/60 w-full sm:w-auto">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>


      

      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Why Our Clients Trust Us</h2>
            <button className="bg-[#19233e] text-white px-6 py-2 rounded hover:bg-[#0f172a] transition text-sm font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current" size={14} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">"{testimonial.comment}"</p>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-sm">Sarah Johnson</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current" size={14} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">"Outstanding service from start to finish. The team at Trivara helped us find our dream home in Dubai Marina."</p>
                </div>
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-sm">Michael Chen</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current" size={14} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">"Professional and knowledgeable. Their property management services have been exceptional for my investments."</p>
                </div>
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-sm">Fatima Al Mansoori</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current" size={14} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">"The best real estate experience I've had. They truly understand the Dubai market and provided excellent guidance."</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Continued Advice section moved above 'Why Our Clients Trust Us' */}

      {/* <LandmarkShowcase /> */}

      {/** Newsletter section removed per request */}

      {/* Contact section moved to dedicated /contact page via routing */}

      {/* Quick Connect is now opened via the floating chat icon in Footer */}

      {/* Slide-out Quick Connect panel on the right */}
      <QuickConnectPanel open={quickConnectOpen} onClose={() => setQuickConnectOpen(false)} />

  <Footer />
  </div>
  );
}

export default App;

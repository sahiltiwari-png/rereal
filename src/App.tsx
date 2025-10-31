import { useState, useEffect } from 'react';
import { MapPin, Home, Building2, Key, TrendingUp, Users, Award, Star, Phone, Mail, MessageSquare, ChevronRight, Bed, Bath, Maximize, DollarSign } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroFilter from './components/HeroFilter';
import Footer from './components/Footer';
// Removed Supabase import; using local mock data instead

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
}

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    fetchProperties();
    fetchNews();
    fetchTestimonials();
  }, []);

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
        image_url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
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
        image_url: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600',
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
        image_url: 'https://images.pexels.com/photos/259600/pexels-photo-259600.jpeg?auto=compress&cs=tinysrgb&w=600',
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
        image_url: 'https://images.pexels.com/photos/534213/pexels-photo-534213.jpeg?auto=compress&cs=tinysrgb&w=600',
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
        image_url: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600',
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
        image_url: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600',
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
        published_at: '2024-03-05',
      },
      {
        id: 'news-2',
        title: "New Developments Announced in Prime Locations",
        excerpt: "Major developers announce exciting new projects in prime Dubai locations...",
        image_url: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600',
        published_at: '2024-03-12',
      },
      {
        id: 'news-3',
        title: "Market Outlook: Trends for Q2 2024",
        excerpt: "Analysts forecast continued strength across residential and off-plan segments...",
        image_url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
        published_at: '2024-04-01',
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
      },
      {
        id: 'test-2',
        name: 'Michael Chen',
        rating: 5,
        comment: 'Professional and knowledgeable. Their property management services have been exceptional for my investments.',
      },
      {
        id: 'test-3',
        name: 'Fatima Al Mansoori',
        rating: 5,
        comment: 'Exceptional guidance throughout the entire buying process. Highly recommended!',
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

  // Filtering handled in HeroFilter component via onApply callback

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      <HeroFilter allProperties={allProperties} onApply={setProperties} />

      <section className="py-6 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center flex-wrap gap-12 opacity-50">
            <div className="text-gray-500 font-semibold text-sm">PARTNERS</div>
            <div className="text-gray-500 font-semibold text-sm">BAYUT.COM</div>
            <div className="text-gray-500 font-semibold text-sm">DUBIZZLE</div>
            <div className="text-gray-500 font-semibold text-sm">PROPERTY FINDER</div>
            <div className="text-gray-500 font-semibold text-sm">GULF NEWS</div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              Dubai real estate solutions focused around excellent<br />customer service.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Home className="text-gray-400" size={40} strokeWidth={1} />
                </div>
              </div>
              <h3 className="font-semibold text-base mb-2">Residential</h3>
              <p className="text-gray-600 text-sm">Explore our finest<br />residential offerings</p>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Building2 className="text-gray-400" size={40} strokeWidth={1} />
                </div>
              </div>
              <h3 className="font-semibold text-base mb-2">Off Plan Property</h3>
              <p className="text-gray-600 text-sm">Discover exclusive<br />pre-launch opportunities</p>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Building2 className="text-gray-400" size={40} strokeWidth={1} />
                </div>
              </div>
              <h3 className="font-semibold text-base mb-2">Commercial</h3>
              <p className="text-gray-600 text-sm">Find the perfect space<br />for your business</p>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <TrendingUp className="text-gray-400" size={40} strokeWidth={1} />
                </div>
              </div>
              <h3 className="font-semibold text-base mb-2">Market Insights</h3>
              <p className="text-gray-600 text-sm">Stay informed with<br />expert market analysis</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                President's Top Branded<br />Communities to the UAE Coffee<br />Table Book
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Discover Dubai's most prestigious communities through our comprehensive coffee table book. Featuring exclusive insights into luxury developments and prime locations across the UAE.
              </p>
              <button className="bg-[#14b8a6] text-white px-6 py-3 rounded hover:bg-[#0f766e] transition text-sm font-medium w-full sm:w-auto">
                Download Free Guide
              </button>
            </div>
            <div className="flex justify-center">
              <img src="https://images.pexels.com/photos/3935320/pexels-photo-3935320.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Coffee Table Book" className="rounded-lg shadow-xl max-w-sm" />
            </div>
          </div>
        </div>
      </section>

      <section id="properties" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">Explore Properties in Dubai.</h2>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button className="px-5 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">All</button>
              <button className="px-5 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">Rent</button>
              <button className="px-5 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">Buy</button>
              <button className="bg-[#19233e] text-white px-5 py-2 text-sm rounded hover:bg-[#0f172a] w-full sm:w-auto sm:ml-auto">View All</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.length > 0 ? (
              properties.map((property) => (
                <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition">
                  <div className="relative">
                    <img src={property.image_url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600'} alt={property.title} className="w-full h-56 object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-1 text-[#19233e]">AED {property.price.toLocaleString()}</h3>
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
                </div>
              ))
            ) : (
              <>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition">
                  <div className="relative">
                    <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Property" className="w-full h-56 object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-1 text-[#19233e]">AED 2,500,000</h3>
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
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition">
                  <div className="relative">
                    <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Property" className="w-full h-56 object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-1 text-[#19233e]">AED 4,200,000</h3>
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
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition">
                  <div className="relative">
                    <img src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Property" className="w-full h-56 object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-1 text-[#19233e]">AED 8,500,000</h3>
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
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-[#19233e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Property Management" className="rounded-lg" />
            </div>
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4">Professional Property<br />Management for Your Dubai<br />Investment</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our comprehensive property management services ensure your investment is professionally maintained, fully tenanted, and generating optimal returns.
              </p>
              <button className="bg-[#14b8a6] text-white px-6 py-3 rounded hover:bg-[#0f766e] transition text-sm font-medium w-full sm:w-auto">
                Learn More About Services
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0d1f3c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4 italic font-serif">Signature</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Experience unparalleled luxury with our Signature collection. These exclusive properties represent the pinnacle of Dubai's real estate market.
              </p>
              <button className="bg-white text-[#19233e] px-6 py-3 rounded hover:bg-gray-100 transition text-sm font-medium border border-white/60 w-full sm:w-auto">
                Explore Signature
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Signature Property" className="rounded-lg w-full h-40 object-cover" />
              <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Signature Property" className="rounded-lg w-full h-40 object-cover" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-700 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">7 Bedroom Mansion in Emirates Hills</h3>
              <p className="text-gray-400 text-sm">Exclusive golf course mansion with breathtaking views</p>
            </div>
            <div className="border border-gray-700 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Penthouse Apartment Dubai Marina</h3>
              <p className="text-gray-400 text-sm">Spectacular penthouse with panoramic city views</p>
            </div>
            <div className="border border-gray-700 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Beachfront Modern Villa Dubai</h3>
              <p className="text-gray-400 text-sm">Contemporary beachfront living at its finest</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Speak with our Real Estate<br />Specialists today</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our expert team is ready to help you find your perfect property or answer any questions about Dubai's real estate market.
              </p>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f9f5ea] rounded flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#19233e]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Call us</h3>
                    <p className="text-gray-600 text-sm">+971 4 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f9f5ea] rounded flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#19233e]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Email us</h3>
                    <p className="text-gray-600 text-sm">info@trivara.ae</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f9f5ea] rounded flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="text-[#19233e]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Live chat</h3>
                    <p className="text-gray-600 text-sm">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 rounded-lg">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#19233e] text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#19233e] text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#19233e] text-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#19233e] text-sm"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-[#19233e] text-white px-6 py-3 rounded hover:bg-[#0f172a] transition text-sm font-medium">
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Dubai's Premier Property Marketplace</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Home className="text-gray-600" size={32} strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="font-semibold text-base mb-2">Discover Excellent Developments</h3>
              <p className="text-gray-600 text-sm">Access exclusive properties across Dubai</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="text-gray-600" size={32} strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="font-semibold text-base mb-2">Premier Real Estate Network</h3>
              <p className="text-gray-600 text-sm">Connected to top agents and developers</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Award className="text-gray-600" size={32} strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="font-semibold text-base mb-2">Expert Guidance Always</h3>
              <p className="text-gray-600 text-sm">Professional support at every step</p>
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">Latest News & Insights</h2>
            <button className="bg-[#19233e] text-white px-6 py-2 rounded hover:bg-[#0f172a] transition text-sm font-medium w-full sm:w-auto sm:ml-auto">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.length > 0 ? (
              news.map((article) => (
                <div key={article.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                  <img src={article.image_url || 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600'} alt={article.title} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <span className="text-xs text-gray-500">{new Date(article.published_at).toLocaleDateString()}</span>
                    <h3 className="font-semibold text-base my-2 leading-snug">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
                    <a href="#" className="text-[#19233e] text-sm font-medium hover:text-[#0f172a]">Read More →</a>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                  <img src="https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600" alt="News" className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <span className="text-xs text-gray-500">March 15, 2024</span>
                    <h3 className="font-semibold text-base my-2 leading-snug">Dubai Building Sector Group Sets Record for Sales Growth Amidst Dubai's Explosive Real Estate</h3>
                    <p className="text-gray-600 text-sm mb-3">The Dubai real estate market continues to show remarkable growth with record-breaking sales...</p>
                    <a href="#" className="text-[#19233e] text-sm font-medium hover:text-[#0f172a]">Read More →</a>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                  <img src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600" alt="News" className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <span className="text-xs text-gray-500">March 12, 2024</span>
                    <h3 className="font-semibold text-base my-2 leading-snug">New Developments Announced in Dubai's Most Sought-After Locations</h3>
                    <p className="text-gray-600 text-sm mb-3">Major developers announce exciting new projects in prime Dubai locations...</p>
                    <a href="#" className="text-[#19233e] text-sm font-medium hover:text-[#0f172a]">Read More →</a>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                  <img src="https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600" alt="News" className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <span className="text-xs text-gray-500">March 10, 2024</span>
                    <h3 className="font-semibold text-base my-2 leading-snug">Investment Guide: Why Dubai Remains a Top Choice for Global Investors</h3>
                    <p className="text-gray-600 text-sm mb-3">Expert analysis on Dubai's attractive investment opportunities and market trends...</p>
                    <a href="#" className="text-[#19233e] text-sm font-medium hover:text-[#0f172a]">Read More →</a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Sustainability" className="rounded-lg" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">A Home For You. A Tree for the<br />Planet.</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We're committed to sustainability. For every property transaction, we plant a tree in partnership with environmental organizations. Together, we're building a greener future.
              </p>
              <button className="bg-[#19233e] text-white px-6 py-3 rounded hover:bg-[#0f172a] transition text-sm font-medium">
                Learn More
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
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
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

      <section className="py-16 bg-[#19233e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.pexels.com/photos/3935320/pexels-photo-3935320.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Dubai" className="rounded-lg" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-tight">Continued Advice When it<br />Comes to Real Estate in Dubai</h2>
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12 leading-tight">Popular Properties in Dubai Communities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="font-semibold text-sm mb-1">Dubai Marina</h3>
              <p className="text-xs text-gray-500">2,547 Properties</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Downtown Dubai</h3>
              <p className="text-xs text-gray-500">1,823 Properties</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Palm Jumeirah</h3>
              <p className="text-xs text-gray-500">1,456 Properties</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Business Bay</h3>
              <p className="text-xs text-gray-500">2,189 Properties</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Jumeirah Beach</h3>
              <p className="text-xs text-gray-500">987 Properties</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Arabian Ranches</h3>
              <p className="text-xs text-gray-500">1,234 Properties</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Dubai Hills</h3>
              <p className="text-xs text-gray-500">1,567 Properties</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">JBR</h3>
              <p className="text-xs text-gray-500">1,890 Properties</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#19233e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Stay in the loop</h2>
          <p className="text-gray-300 mb-6 text-sm">Subscribe to our newsletter for the latest property listings and market insights</p>
          <div className="flex flex-col md:flex-row gap-3 justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded text-gray-900 focus:outline-none text-sm"
            />
            <button className="bg-[#14b8a6] text-white px-8 py-3 rounded hover:bg-[#0f766e] transition text-sm font-medium whitespace-nowrap w-full sm:w-auto">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;

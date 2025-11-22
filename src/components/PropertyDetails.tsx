import { MapPin, Share2, Phone, MessageSquare, ChevronRight } from 'lucide-react';
import ReactImageMagnify from 'react-image-magnify';
import React, { useEffect } from 'react';
import Footer from './Footer';
import { Card, CardContent } from '@/components/ui/card';

interface PropertyDetailsProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    image_url: string;
  };
  onClose: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onClose }) => {
  // Ensure the page starts at the top on entry
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);
  const gallery = [
    property.image_url,
    '/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp',
    '/view-modern-skyscrapers-shining-sunrise-lights-dubai-marina-dubai-uae-min.webp',
    '/panorama-pudong-business-reflection-sky-office-min.webp',
  ];

  return (
    <div className="min-h-screen bg-[#f7fbfd] text-gray-900">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button onClick={onClose} className="text-sm px-3 py-1.5 border rounded hover:bg-gray-50">Back to Listings</button>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Share2 size={16} />
            <span>Share</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold heading-raleway">{property.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <MapPin size={16} />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-gray-500">Asking Price</div>
              <div className="text-xl md:text-2xl font-bold text-[#19233e]">AED {property.price.toLocaleString()}</div>
            </div>
            <img src="/logo_01_4fd8dc607d.webp" alt="Developer" className="w-16 h-16 object-contain" loading="lazy" decoding="async" />
          </div>
        </div>

        {/* Gallery with Magnify */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="rounded-lg overflow-hidden bg-gray-100">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Property',
                    isFluidWidth: true,
                    src: gallery[0],
                  },
                  largeImage: {
                    src: gallery[0],
                    width: 1200,
                    height: 800,
                  },
                  lensStyle: { backgroundColor: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)' },
                  shouldUsePositiveSpaceLens: true,
                  enlargedImagePosition: 'over',
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 md:auto-rows-[1fr] gap-3">
            {gallery.slice(1).map((src, i) => (
              <img key={i} src={src} alt={`thumb-${i}`} className="w-full h-20 md:h-28 object-cover rounded-lg" loading="lazy" decoding="async" />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button className="px-4 py-2 bg-[#19233e] text-white rounded text-sm">Schedule Viewing</button>
          <button className="px-4 py-2 border rounded text-sm">Download Brochure</button>
          <div className="ml-auto flex items-center gap-3">
            <a href="tel:+971506040777" className="w-9 h-9 rounded-full bg-[#19233e] text-white flex items-center justify-center" aria-label="Call">
              <Phone size={18} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center" aria-label="WhatsApp">
              <MessageSquare size={18} />
            </a>
            <img src="/dodo-min.webp" alt="QR" className="w-16 h-16 rounded bg-white object-cover" loading="lazy" decoding="async" />
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 bg-white rounded-lg p-4 md:p-6 border">
          <p className="text-sm md:text-base leading-relaxed text-gray-700">
            Marina Cove is a prestigious waterfront development set within the heart of Dubai Marina. The architecture blends modern elegance with functional luxury, offering stunning city and canal views. Residences feature open-plan designs, premium finishes, and spacious balconies for al fresco living.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-gray-700 mt-3">
            Strategically located near retail promenades and gourmet dining, the community provides quick access to the beach, metro, and major highways. With flexible payment plans and an experienced developer, Marina Cove delivers exceptional value for both investors and end users.
          </p>
        </div>

        {/* Floor Plan */}
        <div className="mt-6 bg-white rounded-lg p-4 md:p-6 border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-wrap gap-2">
              {['1 BR','2 BR','3 BR','4 BR'].map((b) => (
                <span key={b} className="px-3 py-1.5 text-xs rounded-full bg-gray-100 border">{b}</span>
              ))}
            </div>
            <button className="text-xs flex items-center gap-1 text-[#19233e]">View All <ChevronRight size={14} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            <div className="sm:col-span-1">
              <div className="text-xs text-gray-500">Model</div>
              <div className="text-lg font-semibold mt-1">1 Bedroom</div>
              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <div>Area: 820 – 1450 sqft</div>
                <div>Layout: Open-plan living, balcony</div>
                <div>Finish: Premium fixtures and fittings</div>
              </div>
              <div className="mt-4 space-x-2">
                <button className="px-3 py-1.5 border rounded text-xs">Download Floor Plan</button>
                <button className="px-3 py-1.5 bg-[#19233e] text-white rounded text-xs">Book Viewing</button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded border p-2">
                  <div className="text-gray-500">Est. ROI</div>
                  <div className="font-semibold text-[#19233e]">6.5%</div>
                </div>
                <div className="rounded border p-2">
                  <div className="text-gray-500">Service Fee</div>
                  <div className="font-semibold text-[#19233e]">AED 18/sqft</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-1">Key Highlights</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Floor-to-ceiling windows</li>
                  <li>Built-in wardrobes</li>
                  <li>Smart home controls</li>
                </ul>
              </div>
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-1">Amenities</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded bg-gray-100 border">Pool</span>
                  <span className="px-2 py-1 text-xs rounded bg-gray-100 border">Gym</span>
                  <span className="px-2 py-1 text-xs rounded bg-gray-100 border">Covered Parking</span>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 rounded-lg overflow-hidden bg-gray-100">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Floor plan',
                    isFluidWidth: true,
                    src: '/luxury-living-room-interior-min.webp',
                  },
                  largeImage: {
                    src: '/luxury-living-room-interior-min.webp',
                    width: 1200,
                    height: 800,
                  },
                  lensStyle: { backgroundColor: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)' },
                  shouldUsePositiveSpaceLens: true,
                  enlargedImagePosition: 'over',
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg p-4 md:p-6 border">
          <h3 className="font-semibold mb-3">Location</h3>
          <img src="/city-rotterdam-netherlands-min.webp" alt="Map" className="w-full h-96 md:h-[28rem] object-cover rounded-lg" loading="lazy" decoding="async" />
          <div className="mt-3 text-xs text-gray-600">Nearest Metro: Dubai Marina • 5 min</div>
        </div>

        {/* About the Location */}
        <div className="mt-6 bg-white rounded-lg p-4 md:p-6 border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <img src="/reflection-buildings-glass-window-min.webp" alt="About location" className="w-full h-40 md:h-48 object-cover rounded-lg" loading="lazy" decoding="async" />
            <div className="md:col-span-2">
              <h3 className="font-semibold mb-2">Dubai Marina: The Ultimate Waterfront Lifestyle</h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Dubai Marina offers a vibrant waterfront lifestyle with iconic high-rises, boutique retail, and gourmet dining. The promenades and yacht club create a cosmopolitan atmosphere, while proximity to beaches and transport hubs ensures convenience for residents.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Plan */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'On Booking', value: '10%' },
            { label: 'During Construction', value: '70%' },
            { label: 'Upon Handover', value: '20%' },
          ].map((p) => (
            <div key={p.label} className="bg-white rounded-lg p-4 border">
              <div className="text-3xl font-bold text-[#19233e]">{p.value}</div>
              <div className="text-xs text-gray-600 mt-1">{p.label}</div>
            </div>
          ))}
        </div>

        

        {/* Related Properties */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Related Properties</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Al Habtoor City – Canal View', img: '/aerial-view-city-against-sky-sunset-min.webp', price: 2495000, location: 'Business Bay' },
              { title: 'Marina Vista – Beachfront', img: '/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp', price: 2495000, location: 'Dubai Marina' },
            ].map((item) => (
              <Card key={item.title} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border bg-white">
                <div className="relative h-44 w-full overflow-hidden">
                  <img src={item.img} alt={item.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <CardContent className="p-4">
                  <div className="text-xl font-bold mb-2 text-gray-900">AED {item.price.toLocaleString()}</div>
                  <div className="text-lg font-semibold text-gray-800 mb-1">{item.title}</div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="h-4 w-4" /> {item.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
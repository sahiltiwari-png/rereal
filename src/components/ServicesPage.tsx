import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Card, CardContent } from "./ui/card";
import {
  Building2,
  Calculator,
  Plane,
  FileSignature,
  Banknote,
  BadgeCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const brand = { primary: "#19233e" };

const services = [
  {
    icon: Building2,
    title: "Property & Investment Consultancy",
    desc: "Personalized strategies to grow and protect your portfolio.",
    img: "/aerial-view-downtown-dubai-autumn-day-united-arab-emirates-min.webp",
  },
  {
    icon: Calculator,
    title: "Mortgage Advisory",
    desc: "Compare lenders and secure the best financing tailored to you.",
    img: "/3d-rendering-modern-dining-room-living-room-with-luxury-decor-min.webp",
  },
  {
    icon: Plane,
    title: "Relocation Service",
    desc: "End-to-end relocation support for a seamless move to UAE.",
    img: "/view-modern-skyscrapers-shining-sunrise-lights-dubai-marina-dubai-uae-min.webp",
  },
  {
    icon: Banknote,
    title: "Bank Account Opening",
    desc: "Guidance and documentation to quickly open local accounts.",
    img: "/panorama-pudong-business-reflection-sky-office-min.webp",
  },
  {
    icon: FileSignature,
    title: "Business Licenses",
    desc: "Navigate licensing with clarity and get operational faster.",
    img: "/3d-rendering-luxury-modern-living-room-with-leather-sofa-lamp-wood-decor-loft-style-min.webp",
  },
  {
    icon: BadgeCheck,
    title: "Golden Visa",
    desc: "Eligibility checks and application support for long-term residence.",
    img: "/luxury-living-room-interior-min.webp",
  },
];

const ServicesPage: React.FC = () => {
  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full">
        <img
          src="/panorama-pudong-business-reflection-sky-office-min.webp"
          alt="Services"
          className="w-full h-[260px] sm:h-[340px] md:h-[420px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
            Our Services
          </h1>
          <div className="mt-4">
            <div
              className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full shadow-md"
              style={{ backgroundColor: brand.primary, color: "white" }}
            >
              <Link to="/" className="hover:underline text-sm sm:text-base">
                Home
              </Link>
              <span className="opacity-70 text-sm sm:text-base">/</span>
              <span className="font-semibold text-sm sm:text-base">Services</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Solutions for Investors
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Tailored services designed to support your real estate, business, and relocation needs across the UAE.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <Card
                key={s.title}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border bg-white group"
              >
                {/* Image */}
                <div className="h-44 w-full overflow-hidden">
                  <img
                    src={s.img}
                    alt="Service"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* CONTENT */}
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <s.icon className="h-6 w-6 text-gray-800 group-hover:text-[#19233e] transition-colors" />
                    <div className="text-lg font-semibold text-gray-900 group-hover:text-[#19233e] transition-colors">
                      {s.title}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>

                  <div className="mt-4">
                    <Link
                      to="#"
                      className="text-[#19233e] text-sm font-semibold hover:underline"
                    >
                      Learn More →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ServicesPage;
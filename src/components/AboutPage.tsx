import React from 'react';
import { ChevronDown, Plus, Quote } from 'lucide-react';

// Brand colors used across the app
const brand = {
  primary: '#19233e',
  dark: '#0a1628',
  accent: '#f6f0df',
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero: Why Choose Trivara? */}
      <section className="bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Why Choose Trivara?</h1>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                We blend market expertise with a human-first approach, ensuring every decision is informed, honest, and aligned with your goals. From buying and renting to long-term investments, our team helps you navigate Dubai’s property market with confidence.
                <br />
                With data-driven insight and a people-focused mindset, we help you make decisions that are clear, strategic, and genuinely aligned with your goals. From first steps to long-term investments, we guide you through Dubai’s real estate landscape with confidence and precision.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <img src="/assets/aboutusmain.webp" alt="About Trivara" className="w-full h-56 sm:h-72 object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart + Accordion */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#19233e]">What Sets Us Apart?</h2>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                We deliver dependable, insight-led guidance at every step. Our approach combines rigorous analysis with personalized service, focusing on long-term outcomes rather than quick wins.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200">
              {[
                'Customer Experience',
                '360° Solutions',
                'Strategic Marketing',
              ].map((label, idx) => (
                <div key={label} className="flex items-center justify-between px-4 py-3 border-b last:border-b-0">
                  <span className="text-sm font-medium text-gray-900">{label}</span>
                  <Plus size={18} className="text-gray-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey section with media left, text right */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-0">
              <img src="/assets/smilywomen.webp" alt="Team" className="w-1/2 h-56 sm:h-64 object-contain bg-white" loading="lazy" />
              <img src="/assets/smilymen.webp" alt="Discussion" className="w-1/2 h-56 sm:h-64 object-contain bg-white" loading="lazy" />
            </div>
            <div className="rounded-xl bg-[#0a1628] text-white p-5 sm:p-6">
              <h3 className="text-xs sm:text-sm font-semibold">Focused on the Journey, Driven by Purpose</h3>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                Real estate is more than transactions — it’s about clarity, trust, and results. We listen, plan, and execute with intention, so every step feels informed and effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get the Most Out of Your Property */}
      <section className="bg-[#0a1628] text-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Get the Most Out Of Your Property</h2>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                We combine data-driven insight with thoughtful execution to maximize value — whether you’re buying, renting, or investing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-sm font-semibold">Our Vision</div>
                  <p className="text-xs text-gray-300 mt-2">To elevate every client experience through smart strategy and dedicated support.</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-sm font-semibold">Our Mission</div>
                  <p className="text-xs text-gray-300 mt-2">Deliver measurable outcomes powered by research, integrity, and attention to detail.</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <img src="/assets/teamimage.webp" alt="Trivara Team" className="w-full h-60 sm:h-72 object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* A Message From Trivara with left image */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <img src="/assets/messageformtrivara.webp" alt="A Message From Trivara" className="w-full h-60 sm:h-72 object-cover" loading="lazy" />
            </div>
            <div className="rounded-xl border border-gray-200 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-[#19233e]">A Message From Trivara</h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                We’re a team that values clarity and partnership. With Trivara, you’ll find careful planning, honest advice, and a commitment to long-term success. Let’s build something great — step by step, and together.
              </p>
              <div className="mt-4 h-px w-full bg-gray-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-semibold">Our Management Team</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Brian Hansgen', role: 'CEO', img: '/assets/teamimage.webp' },
              { name: 'Jasir Bin', role: 'Sales Director', img: '/assets/team2.webp' },
              { name: 'M.S. Rizwan', role: 'Head of IT', img: '/assets/audience.webp' },
              { name: 'Rajib', role: 'Marketing Manager', img: '/assets/teamlast.webp' },
            ].map((m) => (
              <div key={m.name} className="rounded-xl p-0">
                <div className="w-full h-40 sm:h-48 rounded-md overflow-hidden mb-3">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="text-sm font-semibold">{m.name}</div>
                <div className="text-xs text-gray-300">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our People strip */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h3 className="text-lg font-semibold text-[#19233e] mb-4">Our People</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              '/3d-rendering-modern-dining-room-living-room-with-luxury-decor-min.webp',
              '/living-room-with-couch-table-lamp.webp',
              '/view-modern-skyscrapers-shining-sunrise-lights-dubai-marina-dubai-uae-min.webp',
              '/panorama-pudong-business-reflection-sky-office-min.webp',
            ].map((src) => (
              <div key={src} className="rounded-lg overflow-hidden border border-gray-200">
                <img src={src} alt="Gallery" className="w-full h-24 sm:h-28 object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
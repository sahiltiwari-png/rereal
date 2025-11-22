import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Twitter, Linkedin, MessageCircle, MessageSquare } from 'lucide-react';

const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [touched, setTouched] = useState<{ name: boolean }>({ name: false });

  const submitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterEmail('');
    alert('Subscribed! We\'ll keep you posted with market updates.');
  };

  const submitConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true });
    if (!form.name.trim()) return;
    try {
      const base = "http://65.1.55.93:4000/api";
      const res = await fetch(`${String(base).replace(/\/$/, '')}/queries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: form.message })
      })
      if (res.ok) {
        setForm({ name: '', phone: '', email: '', message: '' });
        alert('Thanks! Your message has been sent.');
      } else {
        alert('Failed to send. Please try again.')
      }
    } catch {
      alert('Network error. Please try again.')
    }
  };

  return (
    <footer className="bg-[#0a1628] text-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left side — brand, newsletter, links */}
          <div className="md:col-span-2 space-y-10">
            {/* Brand + intro */}
            <div>
              <Link to="/" aria-label="Home" className="inline-block">
                <img
                  src="/applog-min.webp"
                  alt="Trivara"
                  className="h-16 mb-4"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <p className="text-gray-300 text-sm max-w-lg">
                Trivara helps you narrow down your search and find the most suitable property that fits your budget.
              </p>
            </div>

            {/* Newsletter */}
            <div className="max-w-md">
              <h3 className="font-semibold text-sm mb-3 compact-heading">Subscribe to Our Newsletter.</h3>
              <form onSubmit={submitNewsletter} className="flex items-center gap-3">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-md bg-[#0e1b31] border border-[#18243c] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1f2b46]"
                />
                <button type="submit" className="px-4 py-2 rounded-md bg-white text-[#19233e] font-medium border border-white/60 hover:bg-gray-100 transition">
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-2 max-w-sm">
                By clicking Submit, you agree to our <Link to="/terms" className="underline hover:text-white">Terms and Conditions</Link> and <Link to="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
              </p>
            </div>

            {/* Social on first row */}
            <div className="mb-8">
              <h3 className="font-semibold text-sm mb-3 compact-heading">Follow Us</h3>
              <div className="flex items-center gap-3 text-gray-300">
                <a href="#" aria-label="Facebook" className="p-2 rounded bg-[#0e1b31] hover:bg-[#13213a] transition"><Facebook size={16} /></a>
                <a href="#" aria-label="Instagram" className="p-2 rounded bg-[#0e1b31] hover:bg-[#13213a] transition"><Instagram size={16} /></a>
                <a href="#" aria-label="Twitter" className="p-2 rounded bg-[#0e1b31] hover:bg-[#13213a] transition"><Twitter size={16} /></a>
                <a href="#" aria-label="LinkedIn" className="p-2 rounded bg-[#0e1b31] hover:bg-[#13213a] transition"><Linkedin size={16} /></a>
              </div>
            </div>

            {/* Quick Links + Contact on second row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-sm mb-3 compact-heading">Quick Link</h3>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                  <li><Link to="/offplan" className="hover:text-white">Services</Link></li>
                  <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
                </ul>
              </div>

              {/* Contact Us details */}
              <div>
                <h3 className="font-semibold text-sm mb-3 compact-heading">Contact Us</h3>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5" /> <span>Office 1203, Business Bay, Dubai, UAE</span></li>
                  <li className="flex items-start gap-2"><Mail size={14} className="mt-0.5" /> <a href="mailto:Info@trivararealestate@gmail.com" className="hover:text-white">Info@trivararealestate@gmail.com</a></li>
                  <li className="flex items-start gap-2"><Phone size={14} className="mt-0.5" /> <a href="tel:+971506040777" className="hover:text-white">+971 5060 40777</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right side — Let’s Connect form panel */}
          <div className="relative">
            <div className="relative rounded-xl bg-[#334144] border border-[#1a2944] p-6 shadow-lg">
              <h3 className="font-semibold text-base mb-4 compact-heading">Let&apos;s Connect</h3>
              <form onSubmit={submitConnect} className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onBlur={() => setTouched({ name: true })}
                  className="w-full px-3 py-2 rounded-md bg-[#0e1b31] border border-[#18243c] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1f2b46]"
                />
                {touched.name && !form.name.trim() && (
                  <p className="text-xs text-red-400">Name is Required</p>
                )}
                <div className="flex items-center gap-2">
                  <span className="px-2 py-2 rounded-md bg-[#0e1b31] border border-[#18243c] text-gray-200 inline-flex items-center gap-1 whitespace-nowrap leading-none">🇦🇪 +971</span>
                  <input
                    type="tel"
                    placeholder="Enter your phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-md bg-[#0e1b31] border border-[#18243c] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1f2b46]"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-[#0e1b31] border border-[#18243c] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1f2b46]"
                />
                <textarea
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 rounded-md bg-[#0e1b31] border border-[#18243c] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1f2b46]"
                />
                <button type="submit" className="w-full sm:w-auto px-4 py-2 rounded-md bg-white text-[#19233e] font-medium border border-white/60 hover:bg-gray-100 transition inline-flex items-center gap-2">
                  <MessageCircle size={16} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#13213a] mt-10 pt-6 text-gray-400 text-xs">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <p className="text-center sm:text-left">© 2025 Trivara. All rights reserved.</p>
            <div className="text-center sm:text-right">
              <Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
              <span className="mx-2">•</span>
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            </div>
          </div>
        </div>

        {/* Floating actions: Chat above WhatsApp phone */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-quick-connect'))}
            className="w-12 h-12 rounded-full bg-[#19233e] shadow-lg flex items-center justify-center hover:bg-[#0f172a] transition"
            aria-label="Open Quick Connect"
          >
            <MessageSquare size={20} className="text-white" />
          </button>
          <a
            href="https://wa.me/971506040777"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full bg-green-500 shadow-lg flex items-center justify-center hover:scale-105 transition"
            aria-label="Chat on WhatsApp"
          >
            <Phone size={20} className="text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
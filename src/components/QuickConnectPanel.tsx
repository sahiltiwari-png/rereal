import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface QuickConnectPanelProps {
  open: boolean;
  onClose: () => void;
}

const QuickConnectPanel: React.FC<QuickConnectPanelProps> = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [touched, setTouched] = useState<{ name: boolean }>({ name: false });

  const submitConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true });
    if (!form.name.trim()) return;
    setForm({ name: '', phone: '', email: '', message: '' });
    alert("Thanks! We'll get back to you shortly.");
    onClose();
  };

  return (
    <div className={`fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`} aria-hidden={!open}>
      {/* Panel */}
      <aside className="w-full sm:w-[380px] h-full bg-transparent flex flex-col">
        {/* Card container (ditto footer styling) */}
        <div className="m-4 relative rounded-xl bg-[#334144] border border-[#1a2944] p-6 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-base text-white compact-heading">Let&apos;s Connect</h3>
            <button onClick={onClose} className="text-gray-300 hover:text-white text-sm" aria-label="Close">×</button>
          </div>

          {/* Form (same styling as Footer) */}
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
      </aside>
    </div>
  );
};

export default QuickConnectPanel;
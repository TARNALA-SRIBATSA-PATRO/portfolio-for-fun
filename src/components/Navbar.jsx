import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';

export default function Navbar({ onNavigateHome, onSelectService, selectedServiceId }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleHomeClick = () => {
    onNavigateHome();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (id) => {
    onSelectService(id);
    setMenuOpen(false);
  };

  const handleContactClick = () => {
    setMenuOpen(false);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#111111]/95 backdrop-blur-md border-b border-white/[0.08]'
          : 'bg-[#111111] border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={handleHomeClick}
          className="text-white font-bold text-lg tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer"
        >
          <span>Bibhu</span>
          {selectedServiceId && (
            <span className="text-xs font-medium text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded-md hidden sm:inline-block">
              Newsletter Edition
            </span>
          )}
        </button>

        {/* Right Navigation */}
        <div className="flex items-center gap-3" ref={menuRef}>
          <button
            onClick={handleHomeClick}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              !selectedServiceId
                ? 'text-white bg-white/[0.08]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Home
          </button>

          {/* Menu Button Trigger */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all border cursor-pointer ${
                menuOpen
                  ? 'bg-blue-600/20 text-blue-400 border-blue-500/40 shadow-sm shadow-blue-500/20'
                  : 'bg-white/[0.04] text-slate-200 border-white/[0.1] hover:bg-white/[0.08] hover:text-white'
              }`}
              aria-expanded={menuOpen}
            >
              <span>Menu</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2.5 w-[calc(100vw-2rem)] max-w-xs sm:w-80 max-h-[75vh] overflow-y-auto rounded-2xl bg-[#141416]/98 border border-white/[0.1] backdrop-blur-2xl shadow-2xl shadow-black/80 p-2 z-50 scrollbar-thin"
                >
                  <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-white/[0.06] mb-1">
                    Select Specialization Issue
                  </div>

                  <div className="space-y-0.5">
                    {services.map((item) => {
                      const isActive = selectedServiceId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleServiceClick(item.id)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between group cursor-pointer ${
                            isActive
                              ? 'bg-blue-600/20 text-blue-400 font-semibold'
                              : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                          }`}
                        >
                          <span className="truncate">{item.label}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 mt-1 border-t border-white/[0.06]">
                    <button
                      onClick={handleContactClick}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-white/[0.06] hover:text-white transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>Contact</span>
                      <span className="text-[10px] text-slate-500">→</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleContactClick}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}

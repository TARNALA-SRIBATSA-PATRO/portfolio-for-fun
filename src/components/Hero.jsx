import { useRef } from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/services';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
});

export default function Hero({ onSelectService }) {
  const fileRef = useRef(null);
  const imgRef = useRef(null);

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file || !imgRef.current) return;
    imgRef.current.src = URL.createObjectURL(file);
    imgRef.current.style.display = 'block';
    document.getElementById('photo-placeholder')?.remove();
  };

  return (
    <section id="home" className="relative pt-24 sm:pt-32 pb-20 px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-12 left-1/4 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-28 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Header Card */}
      <div className="relative bg-gradient-to-b from-[#18181b]/80 to-[#121214]/90 border border-white/[0.08] backdrop-blur-2xl rounded-3xl p-8 sm:p-12 shadow-2xl shadow-black/60 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-10">

          {/* Profile Photo with Glow Ring */}
          <motion.div {...fadeUp(0)} className="flex-shrink-0 relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 rounded-full blur-sm opacity-50 group-hover:opacity-80 transition duration-300" />
            <div
              onClick={() => fileRef.current?.click()}
              className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden cursor-pointer bg-[#18181b] border-2 border-white/[0.15] shadow-xl group-hover:scale-[1.02] transition-transform"
              title="Click to change photo"
            >
              <img
                ref={imgRef}
                src="/image.png"
                alt="Bibhu"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const placeholder = document.getElementById('photo-placeholder');
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              <div
                id="photo-placeholder"
                className="hidden w-full h-full flex-col items-center justify-center p-2 text-center"
              >
                <span className="text-2xl mb-1 opacity-70">📷</span>
                <span className="text-slate-400 text-xs font-semibold">Upload Photo</span>
                <span className="text-[10px] text-slate-500">Tap to select</span>
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="hidden"
            />
          </motion.div>

          {/* Title, Badge & Tagline */}
          <div className="flex-1 text-center sm:text-left">
            <motion.h1
              {...fadeUp(0.1)}
              className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-none mb-4"
            >
              Bibhu
            </motion.h1>

            <motion.p
              {...fadeUp(0.15)}
              className="text-base sm:text-lg font-medium text-slate-300 leading-relaxed max-w-xl"
            >
              CSE Engineer by education, labour by profession
            </motion.p>
          </div>
        </div>

        {/* Bio / About Box inside card - Elevated Aesthetic UI */}
        <motion.div
          {...fadeUp(0.2)}
          className="mt-8 pt-8 border-t border-white/[0.06]"
        >
          <div className="relative rounded-2xl bg-black/40 border border-white/[0.06] p-6 sm:p-7 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  About & Background
                </span>
              </div>
              <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                Open to work
              </span>
            </div>

            <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
              I am <span className="text-white font-semibold">Bibhu</span>, a <span className="text-blue-300 font-medium bg-blue-500/10 px-1.5 py-0.5 rounded">Computer Science Engineer by education</span> and <span className="text-purple-300 font-medium bg-purple-500/10 px-1.5 py-0.5 rounded">labour by profession</span>. I work hands-on across various fields including Electrician, Plumber, Civil Engineer, Interior Designer, Vehicle Repairing, CC Camera Installation, Sound Designing, Network Designing, Appliances Installation and Repairing, Painting, Engineering Projects, Carpentry, Landscape Architects, Green Energy Engineering, Driver, Cleaning Specialists, Home Automation, Aluminium or UPVC Work Repairing and other available work.
            </p>

            <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="text-slate-400 italic">
                Free to work and learn, feel free to connect.
              </span>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Connect with me</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Elevated Stats Cards Grid */}
      <motion.div
        {...fadeUp(0.25)}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {[
          { value: '18+', label: 'Specializations', hint: 'Multi-trade master' },
          { value: '14+', label: 'Years Experience', hint: 'Painting perfection' },
          { value: '18+', label: 'Years Experience', hint: 'Cleaning & deep service' },
          { value: '13+', label: 'Years Experience', hint: 'Electrical engineering' },
        ].map((s) => (
          <div
            key={s.label + s.hint}
            className="p-5 rounded-2xl bg-[#141416]/90 border border-white/[0.08] backdrop-blur-xl hover:border-white/[0.18] transition-all hover:-translate-y-0.5 shadow-lg shadow-black/40"
          >
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent mb-1">
              {s.value}
            </div>
            <div className="text-xs font-semibold text-slate-300">{s.label}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{s.hint}</div>
          </div>
        ))}
      </motion.div>

    </section>
  );
}

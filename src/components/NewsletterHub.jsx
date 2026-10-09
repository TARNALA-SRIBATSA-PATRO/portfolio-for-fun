import { motion } from 'framer-motion';
import { services } from '../data/services';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

export default function NewsletterHub({ onSelectService }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* Section Header */}
      <motion.div {...fadeUp(0)} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400">
            Work Edition &amp; Directory
          </h2>
          <div className="flex-1 h-px bg-white/[0.08]" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Explore All 18 Specializations
          </p>
          <span className="text-xs sm:text-sm text-slate-400 font-medium">
            Click any section to view full dossier
          </span>
        </div>
      </motion.div>

      {/* Newsletter Magazine Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((item, idx) => (
          <motion.div
            key={item.id}
            {...fadeUp(0.04 * (idx % 6))}
            whileHover={{ y: -4, transition: { duration: 0.18 } }}
            onClick={() => onSelectService(item.id)}
            className="group relative rounded-3xl bg-[#141417]/85 hover:bg-[#18181c] border border-white/[0.08] hover:border-blue-500/40 p-6 sm:p-7 backdrop-blur-xl shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            {/* Top row: Number issue & Experience pill */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-blue-400 transition-colors">
                  #{String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
                  {item.experience}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2.5 group-hover:text-blue-300 transition-colors flex items-center justify-between">
                <span>{item.label}</span>
                <span className="text-slate-500 group-hover:text-blue-400 text-lg transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </h3>

              {/* Description Snippet */}
              <p className="text-sm sm:text-base text-slate-400 line-clamp-3 leading-relaxed mb-6 font-normal">
                {item.description}
              </p>
            </div>

            {/* Bottom metadata footer */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs sm:text-sm text-slate-400 font-medium">
              <span>
                {item.workItems.length > 0
                  ? `${item.workItems.length} work tasks documented`
                  : item.comingSoon
                  ? 'Project in development'
                  : 'Technical details'}
              </span>
              <span className="text-blue-400 group-hover:underline flex items-center gap-1 font-semibold">
                Read issue →
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

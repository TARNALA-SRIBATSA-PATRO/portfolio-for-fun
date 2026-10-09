import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function WorkCard({ item, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="group relative rounded-2xl bg-[#141417]/85 hover:bg-[#18181c] border border-white/[0.08] hover:border-white/[0.2] p-4 sm:p-5 transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-black/50 cursor-default flex items-center justify-between gap-3"
    >
      <span className="text-[15px] sm:text-base font-semibold text-slate-200 group-hover:text-white leading-snug transition-colors">
        {item.name}
      </span>
      {item.count && (
        <span className="flex-shrink-0 text-xs sm:text-[13px] font-bold px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-300">
          {item.count}
        </span>
      )}
    </motion.div>
  );
}

export default function ServiceSection({ service, onBack }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id={service.id}
      ref={ref}
      className="relative max-w-6xl mx-auto px-6 py-12 min-h-[80vh]"
    >
      {/* Top Back Navigation Bar */}
      {onBack && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] text-sm font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-md group"
          >
            <span className="text-base group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to All Issues</span>
          </button>
        </motion.div>
      )}

      {/* Section Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-blue-600/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Header Container */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45 }}
        className="mb-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#18181b]/90 to-[#121214]/90 border border-white/[0.08] backdrop-blur-2xl shadow-xl shadow-black/60"
      >
        <div className="flex flex-wrap items-center gap-3.5 mb-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {service.label}
          </h2>

          <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/15 to-indigo-500/15 border border-blue-500/25 text-blue-300 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            {service.experience}
          </span>

          {service.comingSoon && (
            <span className="text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-amber-400 tracking-wide">
              coming soon ( but soon is not coming soon)
            </span>
          )}
        </div>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl font-normal">
          {service.description}
        </p>
      </motion.div>

      {/* Solar Table (Elevated Modern Styling with Larger Typography) */}
      {service.solarTable && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-2xl bg-[#141417]/85 border border-white/[0.08] backdrop-blur-xl overflow-hidden mb-12 shadow-xl shadow-black/40"
        >
          <div className="px-6 py-4 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Technology Specifications
            </span>
            <span className="text-xs sm:text-sm text-slate-400">Photovoltaic Overview</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-base border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                  {['Panel Type', 'Efficiency Range', 'Average Lifespan', 'Primary Best Use Case'].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {service.solarTable.map((row) => (
                  <tr
                    key={row.type}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-6 py-4.5 font-bold text-white text-base sm:text-lg">
                      {row.type}
                    </td>
                    <td className="px-6 py-4.5 font-extrabold text-blue-400 text-base sm:text-lg">
                      {row.efficiency}
                    </td>
                    <td className="px-6 py-4.5 text-slate-200 font-medium text-sm sm:text-base">
                      {row.lifespan}
                    </td>
                    <td className="px-6 py-4.5 text-slate-300 text-sm sm:text-base leading-relaxed">
                      {row.useCase}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Work item cards - Aesthetic Responsive Grid */}
      {!service.comingSoon && service.workItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {service.workItems.map((item, ii) => (
            <WorkCard key={item.name} item={item} delay={ii * 0.02} />
          ))}
        </motion.div>
      )}

      {/* Bottom Back Button */}
      {onBack && (
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-start">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] text-sm font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-md group"
          >
            <span className="text-base group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to All Specializations</span>
          </button>
        </div>
      )}
    </section>
  );
}

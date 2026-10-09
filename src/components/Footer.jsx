export default function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="border-t border-white/[0.08] bg-[#0d0d0f]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <p className="text-sm sm:text-base text-slate-300 font-medium">
            © 2026 <span className="text-white font-bold">Bibhu</span>. All rights reserved.
          </p>
        </div>

        <button
          onClick={() => go('home')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.2] text-sm font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <span>Back to top</span>
          <span>↑</span>
        </button>
      </div>
    </footer>
  );
}

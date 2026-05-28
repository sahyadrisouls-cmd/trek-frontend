export default function WhyUs() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050e05] text-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE - STICKY BRIEFING BLOCK */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="space-y-3">
              <p className="text-green-400 uppercase tracking-[5px] text-xs font-bold bg-green-500/10 px-3 py-1 rounded-md border border-green-500/20 w-fit">
                Why Choose Us
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Why Trekkers Love
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
                  Sahyadri Souls
                </span>
              </h2>
            </div>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
              Experience thrilling adventures, expert technical guidance, and unforgettable summit memories with Maharashtra’s premier trusted trekking community.
            </p>

            {/* LIVE METRICS TRACKER */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl px-6 py-4 flex-1 min-w-[140px] transition-all hover:bg-zinc-900/80">
                <h4 className="text-3xl font-black text-green-400 tracking-tight">1,500+</h4>
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mt-1">Happy Trekkers</p>
              </div>

              <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl px-6 py-4 flex-1 min-w-[140px] transition-all hover:bg-zinc-900/80">
                <h4 className="text-3xl font-black text-green-400 tracking-tight">50+</h4>
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mt-1">Expedition Routes</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - PERFECTLY HORIZONTALLY ALIGNED GRID */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* ROW 1: CARD 1 */}
            <div className="group bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-5">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
                🏔️
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Expert Trek Leaders</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Our certified mountaineering expedition leads prioritize field security, route terrain context, and group moral support.
                </p>
              </div>
            </div>

            {/* ROW 1: CARD 2 */}
            <div className="group bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-5">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
                🌄
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Scenic Hotspots</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Uncover legendary historic ramparts, hidden waterfalls, mystical monsoonal passes, and pristine valleys.
                </p>
              </div>
            </div>

            {/* ROW 2: CARD 3 */}
            <div className="group bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-5">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
                🔥
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Amazing Community</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Connect with vibrant corporate and standalone explorers, forging lifecycle relationships around the campfire.
                </p>
              </div>
            </div>

            {/* ROW 2: CARD 4 (FIXED OUTLINE TO MATCH THE REST) */}
            <div className="group bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-5">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
                🛡️
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Safety Protocol First</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Strict logistical protocols, extensive field dynamic checks, and standardized medical kits secure your path.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
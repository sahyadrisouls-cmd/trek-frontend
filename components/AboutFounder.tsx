
export default function AboutFounder() {
  return (
    <section id="about" className="bg-black py-24 px-4 sm:px-6 lg:px-8">

      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* IMAGE */}
          <div className="relative">

            <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>

            <img
              src="https://res.cloudinary.com/durkslrlb/image/upload/v1779121388/WhatsApp_Image_2026-05-18_at_21.01.53_gdvyvp.jpg"
              alt="Pratik Solunke"
              className="relative z-10 w-full max-w-md mx-auto rounded-[32px] object-cover border border-white/10 shadow-2xl"
            />

          </div>

          {/* CONTENT */}
          <div>

            <p className="text-green-400 uppercase tracking-[5px] text-sm font-bold mb-4">
              About Founder
            </p>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">

              Hi, I'm <br />

              <span className="text-green-500">
                Pratik Solunke
              </span>

            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mt-8">

              I am a BTech engineering student and a passionate trekking enthusiast
              who loves exploring mountains, forts, waterfalls and hidden trails
              of Maharashtra.

            </p>

            <p className="text-gray-400 text-lg leading-relaxed mt-6">

              Sahyadri Souls was started with a vision to connect adventure lovers,
              create unforgettable trekking experiences and build a strong trekking
              community for people who love nature and exploration.

            </p>

            {/* SMALL STATS */}
            <div className="flex flex-wrap gap-5 mt-10">

              <div className="bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4">
                <h3 className="text-2xl font-black text-green-400">
                  50+
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Trek Routes
                </p>
              </div>

              <div className="bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4">
                <h3 className="text-2xl font-black text-green-400">
                  1500+
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Happy Trekkers
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


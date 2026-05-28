"use client";
export default function Hero() {
return ( <section className="relative min-h-screen flex items-center overflow-hidden">


  {/* BACKGROUND IMAGE */}

  <div
    className="absolute inset-0 bg-cover bg-center scale-110"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070')",
    }}
  />

  {/* OVERLAY */}

  <div className="absolute inset-0 bg-black/60" />

  {/* CONTENT */}

  <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <p className="text-green-400 uppercase tracking-[6px] text-xs sm:text-sm mb-6">

      Sahyadri Adventures

    </p>

    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight max-w-5xl">

      Discover The <br />

      <span className="text-green-500">
        Soul Of Mountains
      </span>

    </h1>

    <p className="text-gray-300 text-sm sm:text-base md:text-xl mt-6 md:mt-8 max-w-2xl leading-7 md:leading-9">

      Experience breathtaking treks, ancient forts,
      hidden waterfalls, sunrise summits and unforgettable
      adventures across the Sahyadri mountain range.

    </p>

    {/* BUTTONS */}

    <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10">

    
<button
  onClick={() => {
    document
      .getElementById("treks")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="bg-green-600 hover:bg-green-700 px-6 md:px-8 py-3 md:py-4 rounded-2xl text-base md:text-lg font-semibold transition w-full sm:w-auto"
>
  Explore Treks
</button>



     
<button
  onClick={() => {
    document
      .getElementById("stories")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="border border-white/30 hover:border-green-500 hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 rounded-2xl text-base md:text-lg transition w-full sm:w-auto"
>
  Watch Stories
</button>


    </div>

  </div>

</section>


);
}

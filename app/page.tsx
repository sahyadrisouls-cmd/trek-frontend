
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrekSlider from "../components/TrekSlider";
import WhyUs from "../components/WhyUs";
import WatchStories from "../components/WatchStories";
import AboutFounder from "../components/AboutFounder";

import ContactForm from "../components/ContactForm";
import WhatsAppButton from "../components/WhatsAppButton";

import Footer from "../components/Footer";



async function getTreks() {
  const res = await fetch("https://trek-backend-ohi5.onrender.com/api/treks", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {

  const treks = await getTreks();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <Hero />

      {/* STATS */}
      <section className="bg-zinc-950 border-y border-white/10 py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          {/* STAT 1 */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-green-500">
              50+
            </h2>

            <p className="text-gray-400 mt-2 uppercase tracking-widest text-xs md:text-sm">
              Trek Routes
            </p>
          </div>

          {/* STAT 2 */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-green-500">
              1500+
            </h2>

            <p className="text-gray-400 mt-2 uppercase tracking-widest text-xs md:text-sm">
              Happy Trekkers
            </p>
          </div>

          {/* STAT 3 */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-green-500">
              5
            </h2>

            <p className="text-gray-400 mt-2 uppercase tracking-widest text-xs md:text-sm">
              Expert Guides
            </p>
          </div>

          {/* STAT 4 */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-green-500">
              1+
            </h2>

            <p className="text-gray-400 mt-2 uppercase tracking-widest text-xs md:text-sm">
              Years Experience
            </p>
          </div>

        </div>

      </section>

      {/* TREKS */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">

        <div className="max-w-7xl mx-auto">

          {/* SECTION HEADING */}
          <div className="mb-14 md:mb-20">

            <p className="text-green-400 uppercase tracking-[6px] mb-4 text-xs md:text-sm">
              Upcoming Treks
            </p>

            <h2 className="text-4xl md:text-6xl font-black leading-tight">

              Choose Your <br />

              <span className="text-green-500">
                Adventure
              </span>

            </h2>

          </div>

          {/* TREK SLIDER */}
          <TrekSlider treks={treks} />

        </div>

      </section>

      {/* WHY US */}
      <WhyUs />

      {/* WATCH STORIES */}
      <WatchStories />
 
<AboutFounder />


<ContactForm />

<Footer />


<WhatsAppButton />


    </div>
  );
}


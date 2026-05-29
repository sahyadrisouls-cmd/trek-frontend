"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import WhatsAppButton from "../../../components/WhatsAppButton";

/* ── Types ────────────────────────────────────────────────────────────── */
interface TrekImage {
  url: string;
  public_id: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  distance: string;
  elevation: string;
}

interface Trek {
  _id: string;
  name: string;
  heroImage: TrekImage;
  trekImages: TrekImage[];
  galleryImages: TrekImage[];
  location: string;
  difficulty: string;
  rating: number;
  description: string;
  shortDescription: string;
  duration: string;
  distance: string;
  altitude: string;
  ageLimit: string;
  groupSize: string;
  bestSeason: string;
  trekType: string;
  price: number;
  seats: number;
  highlights: string[];
  included: string[];
  excluded: string[];
  importantInfo: string[];
  availableDates: string[];
  itinerary: ItineraryDay[];
  mapLocation: string;
  coordinates: { lat: number; lng: number };
}

interface Review {
  _id: string;
  trekName: string;
  name: string;
  rating: number;
  message: string;
  profileImage: string;
  createdAt: string;
}

/* ── Helpers ──────────────────────────────────────────────────────────── */
function getUrl(img: TrekImage | undefined | null, fallback = "/placeholder.jpg"): string {
  return img?.url || fallback;
}

async function getTrek(id: string): Promise<Trek> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "https://trek-backend-ohi5.onrender.com"}/api/treks/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch trek");
  return res.json();
}

const difficultyColor: Record<string, string> = {
  Easy: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  Moderate: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  Hard: "bg-red-500/20 text-red-300 border-red-500/40",
  Difficult: "bg-red-500/20 text-red-300 border-red-500/40",
};

/* ════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT – FULLY RESPONSIVE DARK THEME (GALLERY AS SWIPER CAROUSEL)
═══════════════════════════════════════════════════════════════════════════ */
export default function TrekDetails() {
  const params = useParams();
  const id = params.id as string;

  const [trek, setTrek] = useState<Trek | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [aboutImgIdx, setAboutImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState<{ open: boolean; idx: number }>({ open: false, idx: 0 });
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const formRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState({
    name: "", mobile: "", email: "", persons: 1, selectedDate: "", message: "",
  });

  // Update total amount when persons or price changes
  useEffect(() => {
    if (trek) {
      setTotalAmount(trek.price * formData.persons);
    }
  }, [formData.persons, trek]);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const newValue = e.target.value;
    setFormData({ ...formData, [e.target.name]: newValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trek) return;
    
    const msg = 
      `🏔️ TREK BOOKING REQUEST 🏔️\n\n` +
      `Name: ${formData.name}\n` +
      `Mobile: ${formData.mobile}\n` +
      `Email: ${formData.email}\n` +
      `Persons: ${formData.persons}\n` +
      `Total Amount: ₹${totalAmount.toLocaleString("en-IN")} (₹${trek.price}/person)\n` +
      `Preferred Date: ${formData.selectedDate}\n` +
      `Message: ${formData.message || "—"}\n\n` +
      `Trek: ${trek.name} (${trek.location})`;
    window.open(`https://wa.me/917588917768?text=${encodeURIComponent(msg)}`, "_blank");
  };

  /* fetch trek */
  useEffect(() => {
    async function load() {
      try {
        const data = await getTrek(id);
        setTrek({
          ...data,
          rating: data.rating || 4.8,
          altitude: data.altitude || "N/A",
          trekType: data.trekType || "Adventure",
          seats: data.seats || 12,
          highlights: data.highlights || [],
          included: data.included || [],
          excluded: data.excluded || [],
          importantInfo: data.importantInfo || [],
          availableDates: data.availableDates || [],
          itinerary: data.itinerary || [],
          trekImages: data.trekImages || [],
          galleryImages: data.galleryImages || [],
        });
      } catch (err) { console.error(err); }
    }
    if (id) load();
  }, [id]);

  /* fetch reviews */
  useEffect(() => {
    async function loadReviews() {
      if (!trek?.name) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://trek-backend-ohi5.onrender.com"}/api/reviews`);
        const data: Review[] = await res.json();
        setReviews(data.filter((r) => r.trekName?.toLowerCase() === trek.name?.toLowerCase()));
      } catch (err) { console.error(err); }
    }
    loadReviews();
  }, [trek?.name]);

  /* auto-cycle trekImages (About section) */
  useEffect(() => {
    if (!trek?.trekImages?.length) return;
    const t = setInterval(() => setAboutImgIdx((p) => (p + 1) % trek.trekImages.length), 5000);
    return () => clearInterval(t);
  }, [trek?.trekImages?.length]);

  /* lightbox keyboard nav */
  useEffect(() => {
    if (!lightbox.open || !trek) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox({ open: false, idx: 0 });
      if (e.key === "ArrowRight") setLightbox((p) => ({ ...p, idx: (p.idx + 1) % trek.galleryImages.length }));
      if (e.key === "ArrowLeft") setLightbox((p) => ({ ...p, idx: (p.idx - 1 + trek.galleryImages.length) % trek.galleryImages.length }));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox.open, trek]);

  if (!trek) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  const heroUrl = getUrl(trek.heroImage);
  const diffClass = difficultyColor[trek.difficulty] || "bg-gray-500/20 text-gray-300 border-gray-500/40";

  const renderStars = (r: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < r ? "text-amber-400" : "text-white/20"}>★</span>
    ));

  const fmtDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    } catch { return d; }
  };

  const stats = [
    { label: "Duration", value: trek.duration, icon: "⏱️" },
    { label: "Distance", value: trek.distance, icon: "📏" },
    { label: "Altitude", value: trek.altitude, icon: "🏔️" },
    { label: "Trek Type", value: trek.trekType, icon: "🧭" },
  ];

  return (
    <>
      <style jsx global>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f0f0f; }
        ::-webkit-scrollbar-thumb { background: #2e7d32; border-radius: 3px; }
        body, html { 
          background: #0a0c0a; 
          overflow-x: hidden; 
          margin: 0; 
          padding: 0;
        }
        * {
          max-width: 100%;
          box-sizing: border-box;
        }
        img, video, iframe, svg {
          max-width: 100%;
          height: auto;
        }
        .break-word {
          word-break: break-word;
          overflow-wrap: break-word;
        }
        /* Responsive font sizes */
        @media (max-width: 640px) {
          h1 { font-size: 2.5rem !important; }
          h2 { font-size: 1.875rem !important; }
        }
        /* Gallery swiper custom styling */
        .gallery-swiper .swiper-button-next,
        .gallery-swiper .swiper-button-prev {
          color: #10b981;
          background: rgba(0,0,0,0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .gallery-swiper .swiper-button-next:after,
        .gallery-swiper .swiper-button-prev:after {
          font-size: 1.2rem;
        }
        .gallery-swiper .swiper-pagination-bullet {
          background: #fff;
          opacity: 0.5;
        }
        .gallery-swiper .swiper-pagination-bullet-active {
          background: #10b981;
          opacity: 1;
        }
        @media (max-width: 640px) {
          .gallery-swiper .swiper-button-next,
          .gallery-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>

      <Navbar />

      <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white font-sans overflow-x-hidden">
        {/* ════════════════════════════════════════════════════════════════════
             HERO SECTION – DRAMATIC & IMMERSIVE (RESPONSIVE)
        ════════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroUrl} alt={trek.name} className="w-full h-full object-cover brightness-50 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-32 w-full z-10">
            <div className="max-w-3xl">
             <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full border border-emerald-500/30 mb-4 sm:mb-6 mt-8 lg:mt-0">
  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
  <span className="text-emerald-300 text-xs font-semibold tracking-wider">
    SAHYADRI SOULS
  </span>
</div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white drop-shadow-2xl mb-4 sm:mb-6 break-word">
                {trek.name}
              </h1>
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm">
                  📍 {trek.location}
                </span>
                <span className={`flex items-center px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-sm ${diffClass}`}>
                  {trek.difficulty}
                </span>
                <span className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm bg-amber-500/20 border border-amber-500/30">
                  ★ {trek.rating}
                </span>
                {trek.bestSeason && (
                  <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm">
                    🌤️ {trek.bestSeason}
                  </span>
                )}
              </div>
              <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-6 sm:mb-10 font-light break-word">
                {trek.shortDescription || trek.description}
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border border-white/10">
                    <span className="text-xl sm:text-2xl">{s.icon}</span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-emerald-400">{s.label}</p>
                      <p className="font-semibold text-white text-sm sm:text-base">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* floating price badge (mobile) */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 lg:hidden bg-black/80 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/20 w-auto text-center whitespace-nowrap">
            <span className="text-emerald-400 font-bold text-lg sm:text-xl">₹{trek.price.toLocaleString("en-IN")}</span>
            <span className="text-white/70 text-xs sm:text-sm ml-2">/ person</span>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
             WHY CHOOSE / ABOUT – RESPONSIVE GRID
        ════════════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left image rotator */}
            <div className="order-2 lg:order-1">
              {trek.trekImages.length > 0 ? (
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <img
                      src={trek.trekImages[aboutImgIdx]?.url || heroUrl}
                      alt={trek.name}
                      className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  {trek.trekImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                      {trek.trekImages.map((img, i) => (
                        <button
                          key={img.public_id || i}
                          onClick={() => setAboutImgIdx(i)}
                          className={`w-16 sm:w-20 h-12 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                            i === aboutImgIdx ? "ring-2 ring-emerald-500" : "opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={img.url} className="w-full h-full object-cover" alt="" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src={heroUrl} alt={trek.name} className="w-full h-auto object-cover" />
                </div>
              )}
            </div>

            {/* Right content */}
            <div className="order-1 lg:order-2">
              <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wider mb-4 border border-emerald-500/30">
                ABOUT THIS TREK
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight break-word">
                Why Choose <span className="text-emerald-400">{trek.name}</span>?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg break-word">
                {trek.description}
              </p>
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-emerald-500 rounded-full" /> Expedition Highlights
                </h3>
                <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                  {trek.highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 p-2 sm:p-3 rounded-xl break-word">
                      <span className="text-emerald-400 text-lg sm:text-xl flex-shrink-0">✓</span>
                      <span className="text-gray-200 text-sm sm:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
             INCLUDED / EXCLUDED – GLASS CARDS (RESPONSIVE)
        ════════════════════════════════════════════════════════════════════ */}
        {(trek.included.length > 0 || trek.excluded.length > 0) && (
          <section className="bg-black/40 py-16 sm:py-24 border-y border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8 sm:mb-12">
                <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wider mb-3">
                  WHAT'S COVERED
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Inclusions & Exclusions</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {trek.included.length > 0 && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-emerald-500/30 transition">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 flex items-center gap-3">
                      <span className="text-emerald-400 text-2xl sm:text-3xl">✓</span> Included
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {trek.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300 text-sm sm:text-base break-word">
                          <span className="text-emerald-400 mt-1">▹</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {trek.excluded.length > 0 && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-red-500/30 transition">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 flex items-center gap-3">
                      <span className="text-red-400 text-2xl sm:text-3xl">✗</span> Excluded
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {trek.excluded.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300 text-sm sm:text-base break-word">
                          <span className="text-red-400 mt-1">▹</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════════════
             ITINERARY – ACCORDION (RESPONSIVE)
        ════════════════════════════════════════════════════════════════════ */}
        {trek.itinerary.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="text-center mb-10 sm:mb-14">
              <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wider mb-3">
                DAY BY DAY
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Trek Itinerary</h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {trek.itinerary.map((day) => {
                const open = expandedDay === day.day;
                return (
                  <div
                    key={day.day}
                    className={`rounded-xl overflow-hidden transition-all duration-300 ${
                      open ? "bg-white/10 border border-emerald-500/30" : "bg-white/5 border border-white/10"
                    }`}
                  >
                    <button
                      onClick={() => setExpandedDay(open ? null : day.day)}
                      className="w-full flex justify-between items-center p-4 sm:p-5 text-left hover:bg-white/5 transition"
                    >
                      <div className="flex items-center gap-3 sm:gap-5 flex-wrap sm:flex-nowrap">
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg sm:text-xl border border-emerald-500/30 flex-shrink-0">
                          {day.day}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-base sm:text-lg text-white break-words">{day.title}</p>
                          {(day.distance || day.elevation) && (
                            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 mt-1">
                              {day.distance && <span>📏 {day.distance}</span>}
                              {day.elevation && <span>🏔️ {day.elevation}</span>}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-xl sm:text-2xl text-gray-400 ml-3 sm:ml-4 flex-shrink-0">{open ? "−" : "+"}</span>
                    </button>
                    {open && (
                      <div className="px-4 sm:px-5 pb-4 sm:pb-6 pl-14 sm:pl-[76px] border-t border-white/10">
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base break-word">{day.description}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════════════
             IMPORTANT INFO – WARNING CARD (RESPONSIVE)
        ════════════════════════════════════════════════════════════════════ */}
        {trek.importantInfo.length > 0 && (
          <section className="bg-amber-500/5 py-16 sm:py-20 border-y border-amber-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                <span className="text-2xl sm:text-3xl">⚠️</span>
                <span className="text-amber-400 font-bold uppercase tracking-wider text-sm sm:text-base">Important Information</span>
              </div>
              <ul className="grid md:grid-cols-2 gap-3 sm:gap-4">
                {trek.importantInfo.map((info, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3 text-gray-300 bg-black/20 p-2 sm:p-3 rounded-lg text-sm sm:text-base break-word">
                    <span className="text-amber-400 text-base sm:text-lg flex-shrink-0">•</span> {info}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════════════
             GALLERY – SWIPER CAROUSEL (3 IMAGES PER VIEW, AUTOPLAY 10s)
        ════════════════════════════════════════════════════════════════════ */}
        {trek.galleryImages.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="text-center mb-10 sm:mb-14">
              <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wider mb-3">
                MEMORIES
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Trek Gallery</h2>
            </div>

            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 16 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              autoplay={{ delay: 10000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              className="gallery-swiper pb-12"
            >
              {trek.galleryImages.map((img, i) => (
                <SwiperSlide key={img.public_id || i}>
                  <div
                    onClick={() => setLightbox({ open: true, idx: i })}
                    className="cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <img 
                      src={img.url} 
                      alt={`Gallery ${i + 1}`} 
                      className="w-full h-auto object-cover aspect-[4/3]" 
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* Lightbox - Responsive */}
        {lightbox.open && trek.galleryImages.length > 0 && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-md"
            onClick={() => setLightbox({ open: false, idx: 0 })}
          >
            <button className="absolute top-4 sm:top-5 right-4 sm:right-5 text-white text-2xl sm:text-3xl hover:text-emerald-400 transition z-10">✕</button>
            <button
              className="absolute left-2 sm:left-5 text-white text-2xl sm:text-4xl hover:text-emerald-400 transition z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((p) => ({ ...p, idx: (p.idx - 1 + trek.galleryImages.length) % trek.galleryImages.length }));
              }}
            >
              ←
            </button>
            <img
              src={trek.galleryImages[lightbox.idx]?.url}
              alt=""
              className="max-w-[95vw] sm:max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-2 sm:right-5 text-white text-2xl sm:text-4xl hover:text-emerald-400 transition z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((p) => ({ ...p, idx: (p.idx + 1) % trek.galleryImages.length }));
              }}
            >
              →
            </button>
            <div className="absolute bottom-4 sm:bottom-6 text-white/70 text-xs sm:text-sm">
              {lightbox.idx + 1} / {trek.galleryImages.length}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
             BOOKING FORM – FULLY RESPONSIVE SPLIT LAYOUT
        ════════════════════════════════════════════════════════════════════ */}
        <section ref={formRef} className="py-16 sm:py-24 bg-gradient-to-r from-black to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wider mb-3">
                RESERVE YOUR SPOT
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Book Your Trek</h2>
              <p className="text-gray-400 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4">
                Fill in your details — our team will confirm your slot within 24 hours.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* LEFT SIDE – HERO IMAGE & TREK HIGHLIGHTS (RESPONSIVE) */}
              <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-full overflow-hidden">
                <img
                  src={heroUrl}
                  alt={trek.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="w-1 h-5 sm:h-6 bg-emerald-500 rounded-full" />
                    <span className="text-emerald-300 font-semibold text-sm sm:text-base">Trek Highlights</span>
                  </div>
                  <ul className="space-y-1 text-xs sm:text-sm text-gray-200">
                    <li className="flex items-center gap-1">✓ Expert local guides</li>
                    <li className="flex items-center gap-1">✓ Safety & first-aid certified</li>
                    <li className="flex items-center gap-1">✓ Eco-friendly camping</li>
                    <li className="flex items-center gap-1">✓ 24/7 support</li>
                  </ul>
                  <div className="mt-3 sm:mt-5 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold text-emerald-400">₹{trek.price.toLocaleString("en-IN")}</span>
                    <span className="text-white/70 text-xs sm:text-sm">/ person</span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE – BOOKING FORM (RESPONSIVE) */}
              <div className="p-5 sm:p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm sm:text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm sm:text-base focus:ring-2 focus:ring-emerald-500"
                        placeholder="10-digit mobile"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm sm:text-base focus:ring-2 focus:ring-emerald-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Persons *</label>
                      <input
                        type="number"
                        name="persons"
                        value={formData.persons}
                        onChange={handleChange}
                        required
                        min={1}
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm sm:text-base focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Preferred Trek Date *</label>
                    <select
                      name="selectedDate"
                      value={formData.selectedDate}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm sm:text-base focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="" disabled>Select a batch date</option>
                      {trek.availableDates.length > 0 ? (
                        trek.availableDates.map((d, i) => (
                          <option key={i} value={d}>{d}</option>
                        ))
                      ) : (
                        <option disabled>No dates available</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Additional Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm sm:text-base focus:ring-2 focus:ring-emerald-500"
                      placeholder="Any special requests or queries..."
                    />
                  </div>
                  <div className="bg-emerald-500/10 p-3 sm:p-4 rounded-lg border border-emerald-500/30 flex justify-between items-center">
                    <span className="text-white font-semibold text-sm sm:text-base">Total Amount:</span>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-400">₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 sm:py-3 rounded-lg transition-all shadow-lg shadow-emerald-500/20 text-sm sm:text-base"
                  >
                    Confirm Booking →
                  </button>
                  <p className="text-center text-gray-500 text-xs mt-3">You'll be redirected to WhatsApp to complete your booking.</p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
             REVIEWS – SWIPER CAROUSEL (RESPONSIVE)
        ════════════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wider mb-3">
              TREKKER STORIES
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">What Adventurers Say</h2>
          </div>
          {reviews.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-white/5 rounded-xl border border-white/10">
              <p className="text-gray-400 text-sm sm:text-base px-4">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                480: { slidesPerView: 1 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              className="pb-12"
            >
              {reviews.map((rev) => (
                <SwiperSlide key={rev._id}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 h-full flex flex-col hover:border-emerald-500/30 transition">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={rev.profileImage || "https://randomuser.me/api/portraits/men/32.jpg"}
                        alt={rev.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-emerald-500"
                      />
                      <div>
                        <p className="font-bold text-white text-sm sm:text-base break-word">{rev.name}</p>
                        <div className="flex gap-0.5 text-xs sm:text-sm">{renderStars(rev.rating)}</div>
                      </div>
                    </div>
                    <p className="text-gray-300 italic flex-1 text-sm sm:text-base break-word">"{rev.message}"</p>
                    <p className="text-gray-500 text-xs mt-3 sm:mt-4">{fmtDate(rev.createdAt)}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </section>

        {/* ════════════════════════════════════════════════════════════════════
             FOOTER – RESPONSIVE GRID
        ════════════════════════════════════════════════════════════════════ */}
        <footer className="bg-black/80 border-t border-white/10 py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-3">Sahyadri Souls</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Explore the beauty of Sahyadri mountains with unforgettable trekking experiences.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
  <li>
    <a
      href="/"
      className="hover:text-emerald-400 transition"
    >
      Home
    </a>
  </li>

 
</ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                <li className="break-word">📍 Chhatrapati Sambhajinagar, Maharashtra</li>
                <li>📞 +91 75889 17768</li>
                <li className="break-word">✉️ sahyadri.souls@gmail.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
             <div className="flex gap-2 sm:gap-3">
  {/* Facebook */}
  <a
    href="https://www.facebook.com/share/1FnAVuT4Du/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white/10 rounded-full text-sm hover:bg-emerald-500 hover:text-black transition"
  >
    <i className="fab fa-facebook-f"></i>
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/sahyadri_souls_trek?igsh=MW9zZ3Z3djkwYnV0Nw=="
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white/10 rounded-full text-sm hover:bg-emerald-500 hover:text-black transition"
  >
    <i className="fab fa-instagram"></i>
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/917588917768"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white/10 rounded-full text-sm hover:bg-emerald-500 hover:text-black transition"
  >
    <i className="fab fa-whatsapp"></i>
  </a>
</div>
            </div>
          </div>
          <div className="text-center text-gray-500 text-xs mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/10 px-4">
            © 2026 Sahyadri Souls. All rights reserved.
          </div>
        </footer>

        {/* Mobile sticky CTA - Responsive */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-black/90 backdrop-blur-xl border-t border-white/20 z-40">
          <button
            onClick={scrollToForm}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 sm:py-3 rounded-xl shadow-lg text-sm sm:text-base"
          >
            Book Now · ₹{trek.price.toLocaleString("en-IN")}
          </button>
        </div>
      </div>

      <WhatsAppButton />
    </>
  );
}
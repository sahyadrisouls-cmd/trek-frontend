
"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import { useRef } from "react";

import "swiper/css";

import TrekCard from "./TrekCard";

export default function TrekSlider({
  treks,
}: any) {

  const swiperRef = useRef<any>(null);

  return (

    <div>

      <Swiper

        modules={[Autoplay]}

        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}

        spaceBetween={25}

        slidesPerView={1}

        loop={true}

        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}

        breakpoints={{

          768: {
            slidesPerView: 2,
          },

          1200: {
            slidesPerView: 3,
          },

        }}

      >

        {treks.map((trek: any) => (

          <SwiperSlide key={trek._id}>

            <TrekCard

              id={trek._id}

              heroImage={trek.heroImage}

              name={trek.name}

              location={trek.location}

              price={trek.price}

            />

          </SwiperSlide>

        ))}

      </Swiper>

      {/* ARROWS */}
      <div className="flex justify-center gap-4 mt-10">

        <button
          onClick={() =>
            swiperRef.current?.slidePrev()
          }
          className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-green-600 transition flex items-center justify-center text-2xl border border-white/10"
        >

          ←

        </button>

        <button
          onClick={() =>
            swiperRef.current?.slideNext()
          }
          className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-green-600 transition flex items-center justify-center text-2xl border border-white/10"
        >

          →

        </button>

      </div>

    </div>

  );

}


"use client";

import { useState } from "react";

const videos = [
  "https://res.cloudinary.com/durkslrlb/video/upload/q_auto,f_auto/v1779120394/WhatsApp_Video_2026-05-18_at_21.19.19_x1hgnu.mp4",

  "https://res.cloudinary.com/durkslrlb/video/upload/q_auto,f_auto/v1779120391/WhatsApp_Video_2026-05-18_at_21.19.37_wgvzez.mp4",

  "https://res.cloudinary.com/durkslrlb/video/upload/q_auto,f_auto/v1779120377/WhatsApp_Video_2026-05-18_at_21.19.38_rdph8x.mp4",

  "https://res.cloudinary.com/durkslrlb/video/upload/q_auto,f_auto/v1779120374/WhatsApp_Video_2026-05-18_at_21.19.28_halc90.mp4",

  "https://res.cloudinary.com/durkslrlb/video/upload/q_auto,f_auto/v1779120412/WhatsApp_Video_2026-05-18_at_21.19.31_qsyo88.mp4",

  "https://res.cloudinary.com/durkslrlb/video/upload/q_auto,f_auto/v1779120411/WhatsApp_Video_2026-05-18_at_21.19.33_buhofv.mp4",
];

export default function WatchStories() {

  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <section id="stories" className="bg-black py-20 px-4 sm:px-6 lg:px-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-10">

          <p className="text-green-400 uppercase tracking-[5px] text-xs font-bold">
            Watch Stories
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-white mt-4">
            Moments From The Mountains
          </h2>

        </div>

        {/* MAIN VIDEO */}
        <div className="bg-zinc-950 border border-white/10 rounded-[30px] overflow-hidden">

          <video
            key={activeVideo}
            src={activeVideo}
            controls
            autoPlay
            muted
            playsInline
            className="w-full h-[250px] sm:h-[400px] md:h-[500px] bg-black object-contain"
          />

        </div>

        {/* SMALL STORIES */}
        <div className="flex gap-4 overflow-x-auto mt-6 pb-2 scrollbar-hide">

          {videos.map((video, index) => (

            <button
              key={index}
              onClick={() => setActiveVideo(video)}
              className={`relative flex-shrink-0 w-[90px] sm:w-[110px]
              h-[160px] sm:h-[190px]
              overflow-hidden rounded-[22px]
              border-2 transition-all duration-300
              ${
                activeVideo === video
                  ? "border-green-400 scale-105"
                  : "border-white/10"
              }`}
            >

              <video
                src={video}
                muted
                playsInline
                className="w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/20"></div>

            </button>

          ))}

        </div>

      </div>

    </section>
  );
}


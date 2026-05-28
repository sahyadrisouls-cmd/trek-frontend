
"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917588917768?text=Hello%20I%20want%20to%20join%20the%20trek"
      target="_blank"
      rel="noopener noreferrer"
      className="
      fixed
      bottom-5
      left-5
      z-50

      w-12
      h-12

      sm:w-14
      sm:h-14

      rounded-full
      bg-green-500
      hover:bg-green-600

      flex
      items-center
      justify-center

      shadow-xl
      transition-all
      duration-300
      hover:scale-110
      "
    >

      <FaWhatsapp className="text-white text-2xl sm:text-3xl" />

    </a>
  );
}


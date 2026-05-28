
"use client";

import { useState } from "react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-5">

        {/* LOGO */}
        <a
          href="/"
          className="text-2xl sm:text-3xl font-black tracking-wide"
        >

          <span className="text-white">
            Sahyadri
          </span>

          {" "}

          <span className="text-green-500">
            Souls
          </span>

        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-[3px]">

          <a
            href="/"
            className="hover:text-green-500 transition"
          >
            Home
          </a>

          <a
            href="/#treks"
            className="hover:text-green-500 transition"
          >
            Treks
          </a>

          <a
            href="/#about"
            className="hover:text-green-500 transition"
          >
            About
          </a>

          <a
            href="/#contact"
            className="hover:text-green-500 transition"
          >
            Contact
          </a>

        </div>

        {/* EXPLORE BUTTON */}
        <a
          href="/#treks"
          className="hidden md:block bg-green-600 hover:bg-green-700 px-5 py-3 rounded-2xl text-sm font-semibold transition"
        >
          Explore
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          <span className="w-7 h-[3px] bg-white rounded-full"></span>

          <span className="w-7 h-[3px] bg-white rounded-full"></span>

          <span className="w-7 h-[3px] bg-white rounded-full"></span>

        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-6 flex flex-col gap-6 text-lg">

          <a
            href="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-green-500 transition"
          >
            Home
          </a>

          <a
            href="/#treks"
            onClick={() => setMenuOpen(false)}
            className="hover:text-green-500 transition"
          >
            Treks
          </a>

          <a
            href="/#about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-green-500 transition"
          >
            About
          </a>

          <a
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="hover:text-green-500 transition"
          >
            Contact
          </a>

          <a
            href="/#treks"
            onClick={() => setMenuOpen(false)}
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-2xl text-sm font-semibold transition w-full text-center"
          >
            Explore
          </a>

        </div>

      )}

    </nav>

  );
}


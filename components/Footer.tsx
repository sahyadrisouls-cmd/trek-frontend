
export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 pt-20 pb-10 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* LOGO + ABOUT */}
          <div>

            <h2 className="text-3xl font-black text-green-500">
              Sahyadri Souls
            </h2>

            <p className="text-gray-400 mt-6 leading-relaxed">
              Experience breathtaking treks, waterfalls, forts,
              mountain trails and unforgettable adventures across
              the Sahyadri mountains.
            </p>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-white text-xl font-bold mb-6">
              Quick Links
            </h3>
<div className="space-y-4">

  <a
    href="/"
    className="block text-gray-400 hover:text-green-400 transition"
  >
    Home
  </a>

  <a
    href="#treks"
    className="block text-gray-400 hover:text-green-400 transition"
  >
    Upcoming Treks
  </a>

  <a
    href="#about"
    className="block text-gray-400 hover:text-green-400 transition"
  >
    About Us
  </a>

  <a
    href="#contact"
    className="block text-gray-400 hover:text-green-400 transition"
  >
    Contact
  </a>

</div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-white text-xl font-bold mb-6">
              Contact
            </h3>

            <div className="space-y-5">

              <a
                href="tel:7588917768"
                className="block text-gray-400 hover:text-green-400 transition"
              >
                📞 +91 7588917768
              </a>

              <a
                href="mailto:sahyadri.souls@gmail.com"
                className="block text-gray-400 hover:text-green-400 transition"
              >
                ✉️ sahyadri.souls@gmail.com
              </a>

              <p className="text-gray-400 leading-relaxed">
                Let us know whenever you want to join the adventure.
              </p>

            </div>

          </div>

          {/* COMMUNITY */}
          <div>

            <h3 className="text-white text-xl font-bold mb-6">
              Community
            </h3>

            <div className="space-y-5">

              <a
                href="https://chat.whatsapp.com/B9loAbbWP2KEGJj9nSyxDk"
                target="_blank"
                className="block text-gray-400 hover:text-green-400 transition"
              >
                💬 Join WhatsApp Community
              </a>

              <a
                href="https://www.instagram.com/sahyadri_souls_trek?igsh=MW9zZ3Z3djkwYnV0Nw=="
                target="_blank"
                className="block text-gray-400 hover:text-green-400 transition"
              >
                📸 Instagram
              </a>

              <a
                href="#"
                className="block text-gray-400 hover:text-green-400 transition"
              >
                👍 Facebook
              </a>

              <p className="text-gray-400 leading-relaxed">
                For future updates join our WhatsApp group!
              </p>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 Sahyadri Souls. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Built with ❤️ for adventure lovers.
          </p>

        </div>

      </div>

    </footer>
  );
}


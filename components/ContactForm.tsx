
export default function ContactForm() {
  return (
    <section id="contact" className="bg-black py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">

      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT SIDE */}
          <div>

            <p className="text-green-400 uppercase tracking-[5px] text-sm font-bold mb-4">
              Contact Us
            </p>

            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Let’s Plan Your <br />

              <span className="text-green-500">
                Next Adventure
              </span>
            </h2>

            <p className="text-gray-400 text-lg mt-8 leading-relaxed">
              Have questions about trekking, bookings, upcoming adventures
              or private groups? Feel free to contact us and our team will
              connect with you soon.
            </p>

            {/* INFO CARDS */}
            <div className="space-y-5 mt-10">

              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-bold text-lg">
                  📍 Location
                </h3>

                <p className="text-gray-400 mt-2">
                  Maharashtra, India
                </p>
              </div>

              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-bold text-lg">
                  ⛰️ Trek Support
                </h3>

                <p className="text-gray-400 mt-2">
                  Available for trek guidance and booking support.
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE FORM */}
          <div className="relative">

            {/* GLOW */}
            <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full"></div>

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="relative z-10 bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-8 space-y-6"
            >

              {/* ACCESS KEY */}
              <input
                type="hidden"
                name="access_key"
                value="e7eef131-4aeb-4b36-9940-c1353afa48d6"
              />

              {/* NAME + PHONE */}
              <div className="grid sm:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-500"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-500"
                />

              </div>

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-500"
              />

              {/* TREK TYPE */}
              <select
                name="trek_type"
                required
                defaultValue=""
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-500"
              >

                <option
                  value=""
                  disabled
                  className="bg-zinc-900 text-white"
                >
                  Select Trek Type
                </option>

                <option
                  value="Beginner Trek"
                  className="bg-zinc-900 text-white"
                >
                  Beginner Trek
                </option>

                <option
                  value="Night Trek"
                  className="bg-zinc-900 text-white"
                >
                  Night Trek
                </option>

                <option
                  value="Monsoon Trek"
                  className="bg-zinc-900 text-white"
                >
                  Monsoon Trek
                </option>

                <option
                  value="Camping Trek"
                  className="bg-zinc-900 text-white"
                >
                  Camping Trek
                </option>

                <option
                  value="Private Group Trek"
                  className="bg-zinc-900 text-white"
                >
                  Private Group Trek
                </option>

              </select>

              {/* NUMBER OF PEOPLE */}
              <input
                type="number"
                name="people"
                placeholder="Number Of People"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-500"
              />

              {/* MESSAGE */}
              <textarea
                name="message"
                placeholder="Tell us about your adventure plans..."
                rows={6}
                required
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-500 resize-none"
              ></textarea>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 text-black font-black py-4 rounded-2xl text-lg"
              >
                Send Inquiry
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}


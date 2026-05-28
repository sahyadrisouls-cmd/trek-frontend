
export default function StatsCards() {

  return (

    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-zinc-900 border border-white/10 p-6 rounded-3xl">
        <h2 className="text-4xl font-bold text-white">
          24
        </h2>

        <p className="text-zinc-400 mt-2">
          Total Treks
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/10 p-6 rounded-3xl">
        <h2 className="text-4xl font-bold text-white">
          120
        </h2>

        <p className="text-zinc-400 mt-2">
          Total Bookings
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/10 p-6 rounded-3xl">
        <h2 className="text-4xl font-bold text-white">
          ₹45K
        </h2>

        <p className="text-zinc-400 mt-2">
          Revenue
        </p>
      </div>

    </div>

  );

}

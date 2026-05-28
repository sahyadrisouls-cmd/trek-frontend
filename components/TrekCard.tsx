
import Link from "next/link";

type Props = {
  id: string;
  name: string;
  location: string;
  price: number;

  heroImage?: {
    url: string;
    public_id: string;
  };
};

export default function TrekCard({
  id,
  name,
  location,
  price,
  heroImage,
}: Props) {

  return (

    <div
      id="treks"
      className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 hover:border-green-500/30 transition duration-300 p-6"
    >

      {/* IMAGE */}
      <div className="overflow-hidden rounded-2xl">

        <img
          src={
            heroImage?.url ||
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
          }
          alt={name}
          className="w-full h-64 object-cover rounded-2xl hover:scale-110 transition duration-500"
        />

      </div>

      {/* NAME */}
      <h2 className="text-2xl font-bold mt-6 text-white">

        {name}

      </h2>

      {/* LOCATION */}
      <p className="text-gray-400 mt-2">

        📍 {location}

      </p>

      {/* PRICE */}
      <p className="text-green-500 text-3xl font-black mt-6">

        ₹{price}

      </p>

      {/* BUTTON */}
      <Link href={`/treks/${id}`}>

        <button className="w-full mt-6 bg-green-600 hover:bg-green-700 py-4 rounded-2xl font-semibold transition">

          View Trek

        </button>

      </Link>

    </div>

  );

}

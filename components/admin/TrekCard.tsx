
"use client";

import { useState } from "react";
import EditTrekModal from "./EditTrekModal";

type TrekCardProps = {
  trek: {
    _id: string;
    name: string;
    location: string;

    heroImage: {
      url: string;
      public_id: string;
    };

    price: number;
    difficulty: string;
    duration: string;
  };
};

export default function TrekCard({
  trek,
}: TrekCardProps) {

  // EDIT MODAL STATE
  const [isEditOpen, setIsEditOpen] =
    useState(false);

  // DELETE TREK
  const handleDelete = async () => {

    const confirmDelete = confirm(
      "Are you sure you want to delete this trek?"
    );

    if (!confirmDelete) return;

    try {

      await fetch(
        `http://localhost:5000/api/treks/${trek._id}`,
        {
          method: "DELETE",
        }
      );

      alert("Trek Deleted Successfully");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Error deleting trek");

    }

  };

  return (

    <>

      <div className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden hover:border-green-500/30 transition duration-300">

        {/* IMAGE */}
        <div className="relative overflow-hidden">

          <img
            src={
              trek.heroImage?.url ||
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
            }
            alt={trek.name}
            className="h-64 w-full object-cover transition duration-500 hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-4 left-4">

            <div className="bg-green-600 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-lg">
              {trek.difficulty}
            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-6">

          <h2 className="text-2xl font-black text-white">
            {trek.name}
          </h2>

          <p className="text-zinc-400 mt-2">
            📍 {trek.location}
          </p>

          <div className="flex items-center justify-between mt-6">

            <div>

              <p className="text-green-500 font-black text-2xl">
                ₹{trek.price}
              </p>

              <p className="text-sm text-zinc-400 mt-1">
                ⏱ {trek.duration}
              </p>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-7">

            <button
              onClick={() =>
                setIsEditOpen(true)
              }
              className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-2xl font-semibold transition"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-500 py-3 rounded-2xl font-semibold transition"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

      {/* EDIT MODAL */}
      <EditTrekModal
        trek={trek}
        isOpen={isEditOpen}
        onClose={() =>
          setIsEditOpen(false)
        }
      />

    </>

  );

}

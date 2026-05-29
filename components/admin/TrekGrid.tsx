"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Trek = {
  _id: string;
  name: string;
  location: string;
  price: number;
  heroImage?: { url: string };
};

type TrekGridProps = {
  treks: Trek[];
  onDelete?: () => void;
  onEdit?: (trek: Trek) => void;  // new prop to open edit modal
};

export default function TrekGrid({ treks, onDelete, onEdit }: TrekGridProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this trek?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please login again.");
      router.push("/admin/login");
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`https://trek-backend-ohi5.onrender.com/api/treks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        alert("Session expired. Please login again.");
        router.push("/admin/login");
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed to delete trek");
        return;
      }

      alert("Trek deleted successfully");
      if (onDelete) onDelete();
      else window.location.reload();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (treks.length === 0) {
    return (
      <div className="text-center text-zinc-500 py-20">
        No treks found. Create your first trek!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {treks.map((trek) => (
        <div
          key={trek._id}
          className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition"
        >
          <div className="relative h-48 bg-zinc-800">
            {trek.heroImage?.url ? (
              <img
                src={trek.heroImage.url}
                alt={trek.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600">
                No image
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-1">{trek.name}</h3>
            <p className="text-zinc-400 text-sm mb-2">{trek.location}</p>
            <p className="text-green-500 font-semibold">₹{trek.price}</p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => onEdit && onEdit(trek)}  // open edit modal
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(trek._id)}
                disabled={deletingId === trek._id}
                className="flex-1 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {deletingId === trek._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
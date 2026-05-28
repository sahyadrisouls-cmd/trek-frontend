"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  trek: any;
  isOpen: boolean;
  onClose: () => void;
};

export default function EditTrekModal({ trek, isOpen, onClose }: Props) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: trek.name || "",
    location: trek.location || "",
    description: trek.description || "",
    shortDescription: trek.shortDescription || "",
    heroImage: trek.heroImage || { url: "", public_id: "" },
    trekImages: trek.trekImages || [],
    galleryImages: trek.galleryImages || [],
    price: trek.price || "",
    rating: trek.rating || "",
    difficulty: trek.difficulty || "",
    duration: trek.duration || "",
    distance: trek.distance || "",
    altitude: trek.altitude || "",
    ageLimit: trek.ageLimit || "",
    groupSize: trek.groupSize || "",
    bestSeason: trek.bestSeason || "",
    trekType: trek.trekType || "",
    seats: trek.seats || "",
    highlights: trek.highlights || [],
    included: trek.included || [],
    excluded: trek.excluded || [],
    importantInfo: trek.importantInfo || [],
    mapLocation: trek.mapLocation || "",
    coordinates: {
      lat: trek.coordinates?.lat || "",
      lng: trek.coordinates?.lng || "",
    },
    availableDates: trek.availableDates || [],
  });

  // ✅ CHECK AUTH ON MOUNT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login as admin to access this feature.");
      router.push("/admin/login");
      onClose(); // close modal if open
    }
  }, [router, onClose]);

  // Helper: handle auth errors
  const handleAuthError = () => {
    localStorage.removeItem("token");
    alert("Session expired or insufficient privileges. Please login as admin.");
    router.push("/admin/login");
    onClose();
  };

  // NORMAL INPUT
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ARRAY INPUT
  const handleArrayChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value.split(",") });
  };

  // HERO IMAGE UPLOAD
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    if (!token) {
      handleAuthError();
      return;
    }

    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload/image", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFormData({
        ...formData,
        heroImage: {
          url: res.data.imageUrl,
          public_id: res.data.public_id,
        },
      });
      alert("Hero Image Uploaded");
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleAuthError();
      } else {
        alert("Upload Error");
      }
    }
  };

  // TREK IMAGES UPLOAD
  const handleTrekImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const token = localStorage.getItem("token");
    if (!token) {
      handleAuthError();
      return;
    }

    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("image", files[i]);
      try {
        const res = await axios.post("http://localhost:5000/api/upload/image", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        uploadedImages.push({
          url: res.data.imageUrl,
          public_id: res.data.public_id,
        });
      } catch (error: any) {
        console.log(error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          handleAuthError();
          return;
        }
      }
    }

    setFormData({
      ...formData,
      trekImages: [...formData.trekImages, ...uploadedImages],
    });
  };

  // REMOVE TREK IMAGE
  const removeTrekImage = (index: number) => {
    const updatedImages = formData.trekImages.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, trekImages: updatedImages });
  };

  // GALLERY IMAGE UPLOAD
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const token = localStorage.getItem("token");
    if (!token) {
      handleAuthError();
      return;
    }

    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("image", files[i]);
      try {
        const res = await axios.post("http://localhost:5000/api/upload/image", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        uploadedImages.push({
          url: res.data.imageUrl,
          public_id: res.data.public_id,
        });
      } catch (error: any) {
        console.log(error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          handleAuthError();
          return;
        }
      }
    }

    setFormData({
      ...formData,
      galleryImages: [...formData.galleryImages, ...uploadedImages],
    });
  };

  // REMOVE GALLERY IMAGE
  const removeGalleryImage = (index: number) => {
    const updatedGallery = formData.galleryImages.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, galleryImages: updatedGallery });
  };

  // UPDATE TREK
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      handleAuthError();
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/treks/${trek._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 401 || res.status === 403) {
        handleAuthError();
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Error Updating Trek");
        return;
      }

      alert("Trek Updated Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error Updating Trek");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto p-10">
      <div className="max-w-6xl mx-auto bg-zinc-900 rounded-3xl p-8 border border-white/10">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold text-white">Edit Trek</h2>
          <button onClick={onClose} className="text-3xl text-zinc-400">×</button>
        </div>

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* NAME */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Trek Name"
            className="h-12 px-4 rounded-xl bg-black border border-white/10 text-white"
          />
          {/* LOCATION */}
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="h-12 px-4 rounded-xl bg-black border border-white/10 text-white"
          />
          {/* HERO IMAGE */}
          <div className="md:col-span-2">
            <label className="block mb-3 text-zinc-400">Hero Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full bg-black border border-white/10 rounded-xl p-3 text-white"
            />
            {formData.heroImage?.url && (
              <img src={formData.heroImage.url} className="mt-4 h-72 w-full object-cover rounded-2xl" />
            )}
          </div>

          {/* TREK IMAGES */}
          <div className="md:col-span-2">
            <label className="block mb-3 text-zinc-400">Trek Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleTrekImagesUpload}
              className="w-full bg-black border border-white/10 rounded-xl p-3 text-white"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
              {formData.trekImages.map((img: any, index: number) => (
                <div key={index} className="relative">
                  <img src={img.url} className="h-40 w-full object-cover rounded-2xl" />
                  <button
                    type="button"
                    onClick={() => removeTrekImage(index)}
                    className="absolute top-2 right-2 bg-red-600 h-8 w-8 rounded-full text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* GALLERY IMAGES */}
          <div className="md:col-span-2">
            <label className="block mb-3 text-zinc-400">Gallery Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleGalleryUpload}
              className="w-full bg-black border border-white/10 rounded-xl p-3 text-white"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
              {formData.galleryImages.map((img: any, index: number) => (
                <div key={index} className="relative">
                  <img src={img.url} className="h-40 w-full object-cover rounded-2xl" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-2 right-2 bg-red-600 h-8 w-8 rounded-full text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="h-40 p-4 rounded-xl bg-black border border-white/10 text-white md:col-span-2"
          />
          {/* SHORT DESCRIPTION */}
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Short Description"
            className="h-24 p-4 rounded-xl bg-black border border-white/10 text-white md:col-span-2"
          />
          {/* PRICE */}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="h-12 px-4 rounded-xl bg-black border border-white/10 text-white"
          />
          {/* RATING */}
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            className="h-12 px-4 rounded-xl bg-black border border-white/10 text-white"
          />
          {/* DIFFICULTY */}
          <input
            type="text"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            placeholder="Difficulty"
            className="h-12 px-4 rounded-xl bg-black border border-white/10 text-white"
          />
          {/* DURATION */}
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="h-12 px-4 rounded-xl bg-black border border-white/10 text-white"
          />
          {/* DISTANCE */}
          <input
            type="text"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            placeholder="Distance"
            className="h-12 px-4 rounded-xl bg-black border border-white/10 text-white"
          />
          {/* ALTITUDE */}
          <input
            type="text"
            name="altitude"
            value={formData.altitude}
            onChange={handleChange}
            placeholder="Altitude"
            className="h-12 px-4 rounded-xl bg-black border border-white/10 text-white"
          />
          {/* AGE LIMIT */}
          <input
            type="text"
            name="ageLimit"
            value={formData.ageLimit}
            onChange={handleChange}
            placeholder="Age Limit"
            className="h-12 px-4 rounded-xl bg-black border border-white/10 text-white"
          />
          {/* GROUP SIZE */}
          <input
            type="text"
            name="groupSize"
            value={formData.groupSize}
            onChange={handleChange}
            placeholder="Group Size"
            className="h-12 px-4 rounded-xl bg-black border border-white/10 text-white"
          />
          {/* BEST SEASON */}
          <input
            type="text"
            name="bestSeason"
            value={formData.bestSeason}
            onChange={handleChange}
            placeholder="Best Season"
            className="h-12 px-4 rounded-xl bg-black border border-white/10 text-white"
          />
          {/* TREK TYPE */}
          <input
            type="text"
            name="trekType"
            value={formData.trekType}
            onChange={handleChange}
            placeholder="Trek Type"
            className="h-12 px-4 rounded-xl bg-black border border-white/10 text-white"
          />
          {/* SEATS */}
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            placeholder="Seats"
            className="h-12 px-4 rounded-xl bg-black border border-white/10 text-white"
          />
          {/* HIGHLIGHTS */}
          <textarea
            placeholder="Highlights (comma separated)"
            value={formData.highlights.join(",")}
            onChange={(e) => handleArrayChange("highlights", e.target.value)}
            className="h-32 p-4 rounded-xl bg-black border border-white/10 text-white md:col-span-2"
          />
          {/* INCLUDED */}
          <textarea
            placeholder="Included (comma separated)"
            value={formData.included.join(",")}
            onChange={(e) => handleArrayChange("included", e.target.value)}
            className="h-32 p-4 rounded-xl bg-black border border-white/10 text-white md:col-span-2"
          />
          {/* EXCLUDED */}
          <textarea
            placeholder="Excluded (comma separated)"
            value={formData.excluded.join(",")}
            onChange={(e) => handleArrayChange("excluded", e.target.value)}
            className="h-32 p-4 rounded-xl bg-black border border-white/10 text-white md:col-span-2"
          />
          {/* IMPORTANT INFO */}
          <textarea
            placeholder="Important Info (comma separated)"
            value={formData.importantInfo.join(",")}
            onChange={(e) => handleArrayChange("importantInfo", e.target.value)}
            className="h-32 p-4 rounded-xl bg-black border border-white/10 text-white md:col-span-2"
          />
          {/* AVAILABLE DATES */}
          <textarea
            placeholder="Available Dates (comma separated)"
            value={formData.availableDates.join(",")}
            onChange={(e) => handleArrayChange("availableDates", e.target.value)}
            className="h-32 p-4 rounded-xl bg-black border border-white/10 text-white md:col-span-2"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleUpdate}
          className="mt-10 w-full h-14 bg-green-600 hover:bg-green-500 rounded-2xl font-bold text-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import BasicInfo from "./create-trek/BasicInfo";
import TrekImages from "./create-trek/TrekImages";
import TrekDetails from "./create-trek/TrekDetails";
import HighlightsSection from "./create-trek/HighlightsSection";
import IncludedExcluded from "./create-trek/IncludedExcluded";
import ImportantInfo from "./create-trek/ImportantInfo";
import DatesSection from "./create-trek/DatesSection";
import ItinerarySection from "./create-trek/ItinerarySection";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateTrekModal({ isOpen, onClose }: Props) {
  const router = useRouter();

  // UPLOAD STATES
  const [heroUploading, setHeroUploading] = useState(false);
  const [trekUploading, setTrekUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  const [heroProgress, setHeroProgress] = useState(0);
  const [trekProgress, setTrekProgress] = useState(0);
  const [galleryProgress, setGalleryProgress] = useState(0);

  // FORM DATA
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    shortDescription: "",
    heroImage: { url: "", public_id: "" },
    trekImages: [],
    galleryImages: [],
    price: "",
    rating: 4.8,
    difficulty: "",
    duration: "",
    distance: "",
    altitude: "",
    ageLimit: "",
    groupSize: "",
    bestSeason: "",
    trekType: "",
    seats: "",
    highlights: [],
    included: [],
    excluded: [],
    importantInfo: [],
    mapLocation: "",
    coordinates: { lat: "", lng: "" },
    availableDates: [],
    itinerary: [],
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper: handle auth errors (401/403)
  const handleAuthError = () => {
    localStorage.removeItem("token");
    alert("Session expired or insufficient privileges. Please login as admin.");
    router.push("/admin/login");
    onClose();
  };

  // HERO IMAGE UPLOAD
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setHeroUploading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("https://trek-backend-ohi5.onrender.com/api/upload/image", data, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setHeroProgress(percent);
        },
      });
      const result = res.data;
      setFormData((prev: any) => ({
        ...prev,
        [field]: { url: result.imageUrl, public_id: result.public_id },
      }));
      alert("Hero Image Uploaded");
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleAuthError();
      } else {
        alert("Upload Error");
      }
    } finally {
      setHeroUploading(false);
    }
  };

  // TREK IMAGES
  const handleTrekImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setTrekUploading(true);
    try {
      const token = localStorage.getItem("token");
      const uploadPromises = Array.from(files).map(async (file) => {
        const data = new FormData();
        data.append("image", file);
        const res = await axios.post("https://trek-backend-ohi5.onrender.com/api/upload/image", data, {
          headers: { Authorization: `Bearer ${token}` },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
            setTrekProgress(percent);
          },
        });
        return { url: res.data.imageUrl, public_id: res.data.public_id };
      });
      const uploadedImages = await Promise.all(uploadPromises);
      setFormData((prev: any) => ({
        ...prev,
        trekImages: [...prev.trekImages, ...uploadedImages],
      }));
      alert("Trek Images Uploaded");
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleAuthError();
      } else {
        alert("Upload Error");
      }
    } finally {
      setTrekUploading(false);
    }
  };

  const removeTrekImage = (index: number) => {
    const updatedImages = formData.trekImages.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, trekImages: updatedImages });
  };

  // GALLERY IMAGES
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setGalleryUploading(true);
   const uploadedImages: any[] = [];
    const token = localStorage.getItem("token");

    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("image", files[i]);
      try {
        const res = await axios.post("https://trek-backend-ohi5.onrender.com/api/upload/image", data, {
          headers: { Authorization: `Bearer ${token}` },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
            setGalleryProgress(percent);
          },
        });
        uploadedImages.push({ url: res.data.imageUrl, public_id: res.data.public_id });
      } catch (error: any) {
        console.log(error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          handleAuthError();
          setGalleryUploading(false);
          return;
        }
      }
    }
    setFormData((prev: any) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...uploadedImages],
    }));
    setGalleryUploading(false);
    alert("Gallery Images Uploaded");
  };

  const removeGalleryImage = (index: number) => {
    const updatedGallery = formData.galleryImages.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, galleryImages: updatedGallery });
  };

  // CREATE TREK
  const handleCreateTrek = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please login as admin.");
      router.push("/admin/login");
      onClose();
      return;
    }

    try {
      const res = await fetch("https://trek-backend-ohi5.onrender.com/api/treks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 401 || res.status === 403) {
        handleAuthError();
        return;
      }

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Trek Created Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-5xl font-bold text-white">Create Trek</h2>
          <button onClick={onClose} className="text-4xl text-zinc-400">×</button>
        </div>

        <BasicInfo formData={formData} handleChange={handleChange} />
        <TrekImages
          formData={formData}
          handleImageUpload={handleImageUpload}
          handleTrekImagesUpload={handleTrekImagesUpload}
          removeTrekImage={removeTrekImage}
          handleGalleryUpload={handleGalleryUpload}
          removeGalleryImage={removeGalleryImage}
          heroUploading={heroUploading}
          trekUploading={trekUploading}
          galleryUploading={galleryUploading}
          heroProgress={heroProgress}
          trekProgress={trekProgress}
          galleryProgress={galleryProgress}
        />
        <TrekDetails formData={formData} handleChange={handleChange} />
        <HighlightsSection formData={formData} setFormData={setFormData} />
        <IncludedExcluded title="Included" field="included" formData={formData} setFormData={setFormData} />
        <IncludedExcluded title="Excluded" field="excluded" formData={formData} setFormData={setFormData} />
        <ImportantInfo formData={formData} setFormData={setFormData} />
        <DatesSection formData={formData} setFormData={setFormData} />
        <ItinerarySection formData={formData} setFormData={setFormData} />

        <button
          onClick={handleCreateTrek}
          className="mt-10 w-full h-16 bg-green-600 hover:bg-green-500 rounded-3xl text-xl font-bold"
        >
          Create Trek
        </button>
      </div>
    </div>
  );
}
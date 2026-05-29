"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";
import StatsCards from "@/components/admin/StatsCards";
import TrekGrid from "@/components/admin/TrekGrid";
import CreateTrekModal from "@/components/admin/CreateTrekModal";
import EditTrekModal from "@/components/admin/EditTrekModal";  // import edit modal

const checkAdminAuth = (token: string): boolean => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    if (payload.exp && payload.exp * 1000 < Date.now()) return false;
    if (payload.role !== "admin") return false;
    return true;
  } catch {
    return false;
  }
};

async function getTreks() {
  try {
    const res = await fetch("https://trek-backend-ohi5.onrender.com/api/treks", { cache: "no-store" });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default function AdminPage() {
  const router = useRouter();
 const [treks, setTreks] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
 const [editingTrek, setEditingTrek] = useState<any>(null);  // trek to edit

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  const refreshTreks = async () => {
    const data = await getTreks();
    setTreks(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    const isValid = checkAdminAuth(token);
    if (!isValid) {
      localStorage.removeItem("token");
      alert("Session expired. Please login again.");
      router.push("/admin/login");
      return;
    }
    refreshTreks();
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hamburger menu button - mobile only */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-5 left-5 z-50 md:hidden bg-zinc-800 p-2 rounded-lg shadow-lg"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Main content */}
      <main className="md:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold break-words">
                Dashboard
              </h1>
              <p className="text-zinc-400 mt-1 break-words">
                Manage all treks
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-5 py-2 bg-green-600 hover:bg-green-500 rounded-xl font-semibold transition text-sm sm:text-base whitespace-nowrap"
              >
                + Create Trek
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 rounded-xl font-semibold transition text-sm sm:text-base whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Treks Grid */}
          <div className="mt-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 break-words">
              All Treks
            </h2>
            <TrekGrid
              treks={treks}
              onDelete={refreshTreks}
              onEdit={(trek) => setEditingTrek(trek)}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateTrekModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      {editingTrek && (
        <EditTrekModal
          trek={editingTrek}
          isOpen={!!editingTrek}
          onClose={() => {
            setEditingTrek(null);
            refreshTreks(); // refresh after editing
          }}
        />
      )}
    </div>
  );
}
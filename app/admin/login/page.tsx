"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper to check if token is valid (not expired + admin role)
  const isTokenValid = (token: string): boolean => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      // Check expiration
      if (payload.exp && payload.exp * 1000 < Date.now()) return false;
      // Check admin role
      if (payload.role !== "admin") return false;
      return true;
    } catch {
      return false;
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Validate token again (optional, but ensures admin role)
      if (!isTokenValid(data.token)) {
        localStorage.removeItem("token");
        alert("Invalid admin permissions. Please contact support.");
        setLoading(false);
        return;
      }

      alert("Login Successful");
      router.push("/admin");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-3xl w-[400px]">
        <h1 className="text-4xl text-white font-bold mb-8">Admin Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full h-14 rounded-2xl px-4 bg-zinc-800 text-white mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full h-14 rounded-2xl px-4 bg-zinc-800 text-white mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full h-14 rounded-2xl font-bold transition ${
            loading
              ? "bg-green-700 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500"
          } text-white`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
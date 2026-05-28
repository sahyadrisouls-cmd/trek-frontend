
"use client";

import { useState } from "react";
import CreateTrekModal from "./CreateTrekModal";

export default function Topbar() {

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (

    <>

      <div className="h-20 border-b border-white/10 flex items-center justify-between px-8">

        <div>

          <h1 className="text-2xl font-bold text-white">
            Trek Dashboard
          </h1>

          <p className="text-zinc-400 text-sm">
            Manage all treks
          </p>

        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-2xl font-semibold transition"
        >
          + Create Trek
        </button>

      </div>

      <CreateTrekModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

    </>

  );

}

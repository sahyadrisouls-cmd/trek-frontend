"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenCreateModal: () => void;
};

export default function Sidebar({ isOpen, onClose, onOpenCreateModal }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: "🏠" },
    { name: "Create Trek", action: onOpenCreateModal, icon: "➕" },
    { name: "All Treks", href: "/admin", icon: "⛰️" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-zinc-900 border-r border-white/10 z-50
          transition-transform duration-300 ease-in-out w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close button (mobile) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-zinc-400 md:hidden hover:text-white"
        >
          ✕
        </button>

        <div className="flex flex-col h-full pt-6">
          <div className="px-6 pb-6 border-b border-white/10">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <p className="text-sm text-zinc-500 mt-1">Sahyadri Souls</p>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item, idx) => (
              <div key={idx}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                      ${isActive(item.href)
                        ? "bg-green-600 text-white"
                        : "text-zinc-300 hover:bg-white/10"
                      }
                    `}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      item.action?.();
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-zinc-300 hover:bg-white/10"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                )}
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10 text-xs text-zinc-500 text-center">
            © 2026 Sahyadri Souls
          </div>
        </div>
      </aside>
    </>
  );
}
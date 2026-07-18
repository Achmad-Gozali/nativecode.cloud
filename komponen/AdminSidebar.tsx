'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, FolderKanban, LogOut, Menu, X } from 'lucide-react';

const menuItems = [
  { href: '/admin/artikel', label: 'Artikel', icon: FileText },
  { href: '/admin/portofolio', label: 'Portofolio', icon: FolderKanban },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const activeLabel = menuItems.find((item) => pathname?.startsWith(item.href))?.label ?? 'Admin';

  return (
    <>
      {/* Top bar mobile - hanya tampil di bawah md */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14 bg-white border-b border-gray-200">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Buka menu"
          className="p-2 -ml-2 text-gray-600"
        >
          <Menu className="w-5 h-5" />
        </button>
        <p className="text-sm font-semibold text-gray-900">{activeLabel}</p>
        <div className="w-9" />
      </div>

      {/* Overlay saat mobile menu terbuka */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar: fixed drawer di mobile, static di desktop */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 md:z-auto
          w-64 md:w-60 shrink-0 h-full md:min-h-screen
          bg-white border-r border-gray-200 flex flex-col
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b border-gray-100">
          <div>
            <p className="font-bold text-gray-900">nativecode<span className="text-[#c96a1a]">.cloud</span></p>
            <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Tutup menu"
            className="md:hidden p-1 text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const active = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? 'bg-[#f1f5f9] text-[#3d8b5e] font-semibold' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
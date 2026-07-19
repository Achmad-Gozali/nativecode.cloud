'use client';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigasi() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isLayanan = pathname.startsWith('/layanan');

  const navLinkClass = (active: boolean) =>
    `relative flex items-center gap-1 font-semibold text-xs xl:text-sm transition-all duration-200 py-1 whitespace-nowrap
     ${active ? 'text-[#D17B36]' : 'text-gray-700 hover:text-[#5D9C76]'}
     after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:transition-all after:duration-200
     ${active ? 'after:bg-[#D17B36]' : 'after:bg-transparent hover:after:bg-[#5D9C76]'}`;

  const layananLinks = [
    { href: '/layanan/pembuatan-website', label: 'Pembuatan Website', desc: 'Landing page, company profile, toko online' },
    { href: '/layanan/pembuatan-aplikasi', label: 'Pembuatan Aplikasi', desc: 'iOS, Android & web app' },
    { href: '/layanan/seo', label: 'SEO Bergaransi', desc: 'Ranking Google, trafik organik naik' },
  ];

  const dropdownBase = `absolute left-1/2 -translate-x-1/2 top-full opacity-0 invisible
    group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0
    transition-all duration-200 z-50`;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 lg:hidden
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      />

      <div className="fixed top-0 left-0 right-0 z-40">
        <nav className={`bg-white border-b-2 border-[#5D9C76] transition-shadow duration-300
          ${scrolled ? 'shadow-md' : 'shadow-none'}`}>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[minmax(180px,auto)_1fr_minmax(180px,auto)] items-center h-20 lg:h-24 gap-4">

              {/* Logo - kolom kiri */}
              <Link href="/" className="flex-shrink-0 relative z-10 justify-self-start">
                <img src="/images/logo/logo-navbar.png" alt="nativecode.cloud" className="h-16 sm:h-20 lg:h-24 w-auto" />
              </Link>

              {/* Desktop Nav - kolom tengah, benar-benar center karena kolom kiri-kanan lebar minimum sama */}
              <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-7 min-w-0">
                <Link href="/" className={navLinkClass(pathname === '/')}>BERANDA</Link>
                <Link href="/tentang-kami" className={navLinkClass(pathname === '/tentang-kami')}>TENTANG KAMI</Link>

                {/* LAYANAN */}
                <div className="relative group">
                  <button className={navLinkClass(isLayanan)}>
                    LAYANAN <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className={`${dropdownBase} w-[320px]`}>
                    <div className="rounded-xl shadow-xl bg-white border border-gray-200 overflow-hidden">
                      <div className="p-3 space-y-1">
                        {layananLinks.map((l) => (
                          <Link key={l.href} href={l.href}
                            className={`flex flex-col px-4 py-3 rounded-lg transition-all group/item
                              ${pathname === l.href ? 'bg-[#fff3e8]' : 'hover:bg-gray-50'}`}>
                            <p className={`text-sm font-semibold ${pathname === l.href ? 'text-[#D17B36]' : 'text-gray-800 group-hover/item:text-[#5D9C76]'}`}>
                              {l.label}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{l.desc}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/template" className={navLinkClass(pathname === '/template')}>TEMPLATE</Link>
                <Link href="/portofolio" className={navLinkClass(pathname === '/portofolio')}>PORTOFOLIO</Link>
                <Link href="/artikel" className={navLinkClass(pathname === '/artikel')}>ARTIKEL</Link>
              </div>

              {/* Kanan - kolom kanan */}
              <div className="flex items-center gap-2 relative z-10 justify-self-end">
                <Link
                  href="/kontak"
                  className="hidden lg:inline-flex items-center gap-2 text-white px-4 xl:px-5 py-2.5 rounded-full font-semibold text-xs xl:text-sm transition-opacity hover:opacity-90 whitespace-nowrap"
                  style={{ background: '#3d8b5e' }}
                >
                  Hubungi Kami
                </Link>

                <button
                  className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile/Tablet Drawer */}
        <div className={`lg:hidden fixed top-0 right-0 h-full w-[82%] max-w-sm z-50
          bg-white shadow-2xl transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>

          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <img src="/images/logo/logo-navbar.png" alt="nativecode.cloud" className="h-14 w-auto" />
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100%-70px)] px-4 py-3 space-y-1">
            <Link href="/" className={`block px-4 py-3 font-semibold text-sm rounded-xl transition-colors
              ${pathname === '/' ? 'bg-[#fff3e8] text-[#D17B36]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#5D9C76]'}`}>
              HOME
            </Link>
            <Link href="/tentang-kami" className={`block px-4 py-3 font-semibold text-sm rounded-xl transition-colors
              ${pathname === '/tentang-kami' ? 'bg-[#fff3e8] text-[#D17B36]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#5D9C76]'}`}>
              TENTANG KAMI
            </Link>

            {/* Layanan */}
            <div>
              <button onClick={() => setLayananOpen(!layananOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 font-semibold text-sm rounded-xl transition-colors
                  ${isLayanan ? 'bg-[#fff3e8] text-[#D17B36]' : 'text-gray-700 hover:bg-gray-50'}`}>
                LAYANAN
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${layananOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${layananOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-[#5D9C76]/20 pl-3">
                  {layananLinks.map((l) => (
                    <Link key={l.href} href={l.href}
                      className={`block px-3 py-2.5 rounded-xl transition-colors
                        ${pathname === l.href ? 'text-[#D17B36] bg-[#fff3e8]' : 'text-gray-600 hover:text-[#5D9C76] hover:bg-gray-50'}`}>
                      <p className="text-sm font-medium">{l.label}</p>
                      <p className="text-xs text-gray-400">{l.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/template" className={`block px-4 py-3 font-semibold text-sm rounded-xl transition-colors
              ${pathname === '/template' ? 'bg-[#fff3e8] text-[#D17B36]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#5D9C76]'}`}>
              TEMPLATE
            </Link>
            <Link href="/portofolio" className={`block px-4 py-3 font-semibold text-sm rounded-xl transition-colors
              ${pathname === '/portofolio' ? 'bg-[#fff3e8] text-[#D17B36]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#5D9C76]'}`}>
              PORTOFOLIO
            </Link>
            <Link href="/artikel" className={`block px-4 py-3 font-semibold text-sm rounded-xl transition-colors
              ${pathname === '/artikel' ? 'bg-[#fff3e8] text-[#c96a1a]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#3d8b5e]'}`}>
              ARTIKEL
            </Link>

            <Link
              href="/kontak"
              className={`block text-center px-4 py-3 rounded-xl font-semibold text-sm mt-3 transition-colors text-white
                ${pathname === '/kontak' ? 'opacity-90' : 'hover:opacity-90'}`}
              style={{ background: '#3d8b5e' }}
            >
              Kontak
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
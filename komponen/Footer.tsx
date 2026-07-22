'use client';
import Link from 'next/link';

function FooterCurve() {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className="absolute top-0 left-0 w-full h-8 sm:h-14 block pointer-events-none"
      style={{ transform: 'translateY(-99%)' }}
    >
      <path d="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" fill="#1a2e22" />
    </svg>
  );
}

const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
);

const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconMapPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const socialLinks = [
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@alieee27_',
    icon: (
      <svg className="w-3.5 h-3.5 fill-gray-300" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-.88-.64-1.61-1.47-2.12-2.44v10.12c-.03 2.13-.8 4.29-2.39 5.73-1.61 1.48-3.9 2.15-6.04 1.83-2.34-.35-4.52-2.11-5.32-4.34-.84-2.34-.14-5.1 1.74-6.72 1.51-1.32 3.65-1.78 5.61-1.3v4.11c-1.2-.34-2.58-.1-3.52.74-.83.74-1.12 1.99-.75 3.03.34 1.02 1.42 1.73 2.49 1.71 1.17-.03 2.22-.92 2.45-2.07.03-.17.04-.34.04-.51V.02z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/achmadgozali27_/',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="#d1d5db" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ali.gntng201',
    icon: (
      <svg className="w-3.5 h-3.5 fill-gray-300" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative text-white pt-16 pb-10" style={{ background: '#1a2e22' }}>
      <FooterCurve />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src="/images/logo/logo-navbar.webp"
              alt="nativecode.cloud"
              className="h-20 w-auto mb-4 -mt-7 brightness-0 invert"
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              Solusi jasa pembuatan website profesional di Indonesia. Kami menghadirkan website dengan desain menarik, mudah diakses, dan responsif.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Layanan</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/layanan/pembuatan-website" className="hover:text-[#c96a1a] transition-colors">Jasa Pembuatan Website</Link></li>
              <li><Link href="/layanan/pembuatan-aplikasi" className="hover:text-[#c96a1a] transition-colors">Pembuatan Aplikasi</Link></li>
              <li><Link href="/layanan/seo" className="hover:text-[#c96a1a] transition-colors">SEO Bergaransi</Link></li>
              <li><Link href="/template" className="hover:text-[#c96a1a] transition-colors">Template Website</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Perusahaan</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/tentang-kami" className="hover:text-[#c96a1a] transition-colors">Tentang Kami</Link></li>
              <li><Link href="/portofolio" className="hover:text-[#c96a1a] transition-colors">Portofolio</Link></li>
              <li><Link href="/artikel" className="hover:text-[#c96a1a] transition-colors">Artikel</Link></li>
              <li><Link href="/kontak" className="hover:text-[#c96a1a] transition-colors">Kontak</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Kontak</h4>
            <ul className="space-y-3 text-sm text-gray-300 mb-6">
              <li className="flex items-center gap-2.5">
                <span className="text-[#5D9C76] flex-shrink-0"><IconPhone /></span>
                082249244647
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#5D9C76] flex-shrink-0"><IconMail /></span>
                cs@nativecode.cloud
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#5D9C76] flex-shrink-0"><IconMapPin /></span>
                Jakarta, Indonesia
              </li>
            </ul>

            <h4 className="font-bold text-sm mb-3 text-white">Ikuti Kami</h4>
            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 border border-gray-600 rounded-lg flex items-center justify-center hover:border-[#c96a1a] transition-colors flex-shrink-0"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} nativecode.cloud. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
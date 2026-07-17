'use client';

import Navigasi from '@/komponen/Navigasi';
import Footer from '@/komponen/Footer';
import { useEffect, useRef, useState } from 'react';
import { useScrollAnim } from '@/hooks/use-scroll-anim';

function SectionCurve({ fill, path }: { fill: string; path: string }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-8 sm:h-14 block pointer-events-none"
    >
      <path d={path} fill={fill} />
    </svg>
  );
}

function Ticker() {
  const items = ['WEBSITE DESIGN', 'COMPANY PROFILE', 'LANDING PAGE', 'WEBSITE SEKOLAH', 'SEO OPTIMIZATION', 'MOBILE APPS'];
  const repeated = [...items, ...items, ...items];
  return (
    <div className="bg-[#4a9a66] py-4 overflow-hidden w-full">
      <div className="ticker-inner flex gap-16 whitespace-nowrap w-max">
        {repeated.map((t, i) => (
          <span key={i} className="text-white font-bold text-xl tracking-widest opacity-60">{t}</span>
        ))}
      </div>
    </div>
  );
}

function Counter({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = target / 60;
      const t = setInterval(() => {
        start += step;
        if (start >= target) { setVal(target); clearInterval(t); }
        else setVal(Math.floor(start));
      }, 16);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <div ref={ref} className="text-4xl sm:text-5xl font-bold text-gray-900">{val.toLocaleString()}</div>;
}

const IconLogoDesign = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
);

const IconArticle = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const IconSupport = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 0-7 7v3a2 2 0 0 0 2 2h1v-6a4 4 0 0 1 8 0v6h1a2 2 0 0 0 2-2v-3a7 7 0 0 0-7-7z"/>
    <path d="M5 21a2 2 0 0 1-2-2v-3h3v3a2 2 0 0 1-1 2z"/>
    <path d="M19 21a2 2 0 0 0 2-2v-3h-3v3a2 2 0 0 0 1 2z"/>
  </svg>
);

function FeatureCard({ title, desc, icon }: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="feature-card bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-shrink-0" style={{ background: '#c96a1a' }}>
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-2 text-base">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-1">{desc}</p>
    </div>
  );
}

const paketDetail: Record<string, { deskDetail: string; fiturDetail: string[] }> = {
  Silver: {
    deskDetail: 'Paket ini cocok untuk Anda yang baru memulai dan membutuhkan website sederhana, praktis, dan mudah diakses — landing page atau profil singkat.',
    fiturDetail: ['3 Menu Halaman', 'Domain .com 1 Tahun', 'Hosting 1 Tahun', 'Template Disesuaikan', 'Integrasi Sosial Media', 'Website SSL', 'Tombol WhatsApp', 'Responsive di Semua Perangkat', 'Free Support Pengerjaan'],
  },
  Gold: {
    deskDetail: 'Paket ini cocok untuk company profile dengan kebutuhan halaman lebih lengkap dan desain yang lebih disesuaikan dengan identitas bisnis Anda.',
    fiturDetail: ['5-6 Menu Halaman', 'Domain .com 1 Tahun', 'Hosting 1 Tahun', 'Desain Semi Custom', 'Free Logo dan Banner', 'Integrasi Sosial Media', 'Website SSL', 'Pemasangan Google Maps', 'Statistik Kunjungan Website', 'Free Support Pengerjaan'],
  },
  Diamond: {
    deskDetail: 'Paket desain website ini cocok bagi Anda yang membutuhkan company profile lengkap sebagai representasi profesional bisnis, dengan desain full custom.',
    fiturDetail: ['7-8 Menu Halaman', 'Domain .com / .co.id 1 Tahun', 'Hosting 1 Tahun', 'Full Custom Design', 'Free Logo dan Banner', 'Free 3 Artikel SEO Friendly', 'Integrasi Sosial Media', 'Website SSL', 'Pemasangan Google Maps', 'Statistik Kunjungan Website', 'Free Support Pengerjaan'],
  },
  Platinum: {
    deskDetail: 'Paket desain website ini cocok untuk institusi atau bisnis yang membutuhkan website dengan halaman terlengkap, desain khusus, dan fitur tambahan sesuai kebutuhan — termasuk website sekolah.',
    fiturDetail: ['10-12 Menu Halaman', 'Domain .com / .id / .co.id / .sch.id', 'Hosting 1 Tahun', 'Full Custom Design', 'Free Logo dan Banner', 'Free 3 Artikel SEO Friendly', 'Free 1 Email Bisnis', 'Integrasi Sosial Media', 'Website SSL', 'Pemasangan Google Maps', 'Statistik Kunjungan Website', 'Free Support Pengerjaan'],
  },
};

const paketList = [
  { nama: 'Silver', medal: '/images/paket/silver.png', harga: '700K', perp: '450ribu/tahun', best: false, fitur: ['3 Menu', 'Domain .com', 'Hosting 1 Tahun', 'Template Disesuaikan'] },
  { nama: 'Gold', medal: '/images/paket/gold.png', harga: '1,8 Jt', perp: '550ribu/tahun', best: false, fitur: ['5-6 Menu', 'Domain .com', 'Hosting 1 Tahun', 'Desain Semi Custom'] },
  { nama: 'Diamond', medal: '/images/paket/diamond.png', harga: '3 Jt', perp: '700ribu/tahun', best: true, fitur: ['7-8 Menu', 'Domain .com / .co.id', 'Hosting 1 Tahun', 'Full Custom Design'] },
  { nama: 'Platinum', medal: '/images/paket/platinum.png', harga: '4,5 Jt', perp: '900ribu/tahun', best: false, fitur: ['10-12 Menu', 'Domain .com/.id/.co.id/.sch.id', 'Hosting 1 Tahun', 'Full Custom Design'] },
];

const featureList = [
  { title: 'Free Logo & Banner', desc: 'Desain logo dan banner kreatif yang memperkuat identitas bisnis Anda. Termasuk revisi hingga puas.', icon: <IconLogoDesign /> },
  { title: 'Free 3 Artikel', desc: 'Konten original & SEO-friendly oleh tim ahli untuk mendukung peringkat website Anda. 3 artikel 500-700 kata siap publish.', icon: <IconArticle /> },
  { title: 'Free Support Pengerjaan', desc: 'Pendampingan penuh selama proses pembuatan website hingga selesai dan siap digunakan.', icon: <IconSupport /> },
];

export default function Home() {
  const [openPaket, setOpenPaket] = useState<string | null>(null);
  const togglePaket = (nama: string) => setOpenPaket(prev => prev === nama ? null : nama);

  useScrollAnim();

  return (
    <>
      <Navigasi />
      <main className="flex flex-col min-h-screen font-sans bg-white text-gray-900">

        {/* ===================== HERO ===================== */}
        <section className="relative bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
            <div className="flex-1 max-w-xl">
              <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ color: '#1a2e22' }}>
                Jasa Pembuatan<br />
                <span style={{ color: '#3d8b5e' }}>Website Profesional</span>{' '}&amp;<br />
                <span style={{ color: '#c96a1a' }}>SEO Bergaransi</span>
              </h1>
              <p className="hero-desc text-gray-500 leading-relaxed mb-8 text-sm sm:text-base max-w-lg">
                Kami hadir untuk membantu bisnis, sekolah, dan instansi Anda tampil lebih profesional, meningkatkan visibilitas di Google, dan meraih lebih banyak audiens.
              </p>
              <div className="hero-btns flex flex-wrap gap-3">
                <a
                  href="https://wa.me/6282249244647?text=Halo+nativecode.id%2C+saya+ingin+konsultasi+mengenai+layanan+nativecode.id.+Mohon+bantuannya+%F0%9F%99%8F"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm"
                  style={{ background: '#3d8b5e' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                  </svg>
                  Konsultasi Gratis
                </a>

                <a
                  href="/layanan/pembuatan-website"
                  className="inline-flex items-center px-7 py-3 rounded-full font-semibold text-sm border-2 border-[#3d8b5e] text-[#3d8b5e] transition-colors hover:bg-[#3d8b5e] hover:text-white"
                >
                  Lihat Layanan
                </a>
              </div>
            </div>
            <div className="hero-img flex-1 flex items-center justify-center lg:justify-end">
              <img
                src="/images/beranda/hero-utama.png"
                alt="nativecode.id tampil di berbagai device"
                className="w-full max-w-sm sm:max-w-md lg:max-w-xl object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>
          <SectionCurve fill="#f1f5f9" path="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" />
        </section>

        {/* Hero Stats + About, satu blok slate-100 */}
        <section className="relative bg-[#f1f5f9] pt-12 pb-12 sm:pt-20 sm:pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="fade-up text-center text-gray-500 text-sm mb-2">Selamat Datang di nativecode.id</p>
            <h2 className="fade-up stagger-1 text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-10 sm:mb-14 px-2">
              Jasa Pembuatan <span style={{ color: '#3d8b5e' }}>Website Profesional</span> &amp; <span style={{ color: '#c96a1a' }}>SEO Bergaransi</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center mb-16 sm:mb-24">
              <div className="fade-up stagger-2 stat-card bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 text-center">
                <Counter target={20} />
                <p className="text-gray-500 text-sm mt-2">Website yang telah kami bangun</p>
              </div>
              <div className="fade-in stagger-3 hidden lg:flex relative items-center justify-center" style={{ minHeight: '420px' }}>
                <div className="absolute w-72 h-72 rounded-full z-0" style={{ background: 'radial-gradient(circle, #c8e6c9 0%, #e8f5e9 55%, transparent 75%)' }} />
                <img
                  src="/images/beranda/hero-statistik.png"
                  alt="nativecode.id developer"
                  className="relative z-10 w-60 sm:w-64 object-contain"
                  style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.10))' }}
                />
                <div className="float1 absolute left-0 top-1/3 z-20 w-14 h-14 rounded-full shadow-lg flex items-center justify-center" style={{ background: '#3d8b5e' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div className="float2 absolute right-0 top-1/2 z-20 w-14 h-14 rounded-full shadow-lg flex items-center justify-center" style={{ background: '#3d8b5e' }}>
                  <img src="https://cdn.simpleicons.org/wordpress/white" alt="WordPress" width="26" height="26" />
                </div>
                <div className="float1 absolute bottom-16 left-4 z-20 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg" style={{ background: '#c96a1a' }}>Website Design</div>
                <div className="float2 absolute bottom-24 right-4 z-20 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg" style={{ background: '#c96a1a' }}>SEO Optimization</div>
                <div className="float3 absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap" style={{ background: '#3d8b5e' }}>Website Sekolah</div>
              </div>
              <div className="fade-up stagger-4 stat-card bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 text-center">
                <Counter target={20} />
                <p className="text-gray-500 text-sm mt-2">Klien menggunakan layanan nativecode.id</p>
              </div>
            </div>

            {/* About nativecode.id */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
              <div className="fade-left">
                <h3 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: '#c96a1a' }}>nativecode.id</h3>
                <p className="font-bold text-gray-800 mb-4 sm:mb-6">Experience by the Best</p>
                <div className="flex items-center gap-2 mb-6 sm:mb-8">
                  <div className="w-8 h-0.5 rounded" style={{ background: '#c96a1a' }} />
                  <div className="w-4 h-0.5 rounded" style={{ background: '#3d8b5e' }} />
                </div>
                <div className="flex items-center justify-center">
                  <img src="/images/beranda/about-laptop.png" alt="nativecode.id" className="w-full max-w-sm object-contain" style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.10))' }} />
                </div>
              </div>
              <div className="fade-right space-y-4 sm:space-y-5">
                <p className="text-gray-600 leading-relaxed text-justify text-sm sm:text-base">
                  <strong className="text-gray-900">nativecode.id</strong> adalah jasa pembuatan website yang berfokus membantu bisnis, sekolah, dan instansi membangun identitas digital yang profesional. Kami hadir sebagai mitra untuk kebutuhan website Anda — dari landing page, company profile, hingga website sekolah, lengkap dengan optimasi SEO.
                </p>
                <p className="text-gray-600 leading-relaxed text-justify text-sm sm:text-base">
                  Dengan tim yang berpengalaman dan pendekatan berbasis data, kami memastikan setiap website yang kami hadirkan benar-benar memberikan dampak nyata bagi kehadiran digital Anda. Lebih dari <strong>20 website</strong> telah kami bangun dan <strong>20+ klien</strong> telah mempercayakan kebutuhan digital mereka kepada kami.
                </p>
                <p className="text-gray-600 leading-relaxed text-justify text-sm sm:text-base">
                  Kami tidak sekadar membuat website — kami memastikan desain yang menarik, performa yang cepat, hingga struktur konten yang ramah mesin pencari.
                </p>
                <a href="/tentang-kami" className="inline-flex items-center gap-2 text-white px-7 py-3 rounded-full font-semibold transition-opacity hover:opacity-90 text-sm sm:text-base" style={{ background: '#3d8b5e' }}>
                  Selengkapnya
                </a>
              </div>
            </div>
          </div>
          <SectionCurve fill="#ffffff" path="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" />
        </section>

        <Ticker />

        {/* Website section */}
        <section className="relative bg-white py-12 sm:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="fade-left hidden lg:flex items-center justify-center">
                <img src="/images/beranda/promo-web-desain.png" alt="Web Design nativecode.id" className="w-full max-w-lg object-contain" style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.08))' }} />
              </div>
              <div className="fade-right">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Mau Buat Website?</h2>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">nativecode.id – Solusi jasa pembuatan website profesional di Indonesia</h3>
                <p className="text-gray-600 leading-relaxed mb-3 text-sm sm:text-base">Kami menghadirkan website dengan desain menarik, mudah diakses, dan responsif di semua perangkat.</p>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">Dari landing page, company profile, hingga website sekolah — semua kami kerjakan dengan standar profesional dan proses yang transparan.</p>

                <a
                  href="https://wa.me/6282249244647?text=Halo+nativecode.id%2C+saya+ingin+konsultasi+mengenai+layanan+nativecode.id.+Mohon+bantuannya+%F0%9F%99%8F"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
                  style={{ background: '#c96a1a' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                  </svg>
                  Konsultasi
                </a>
              </div>
            </div>
          </div>
          <SectionCurve fill="#f1f5f9" path="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" />
        </section>

        {/* Paket Website */}
        <section className="relative bg-[#f1f5f9] pt-12 pb-12 sm:pt-20 sm:pb-20 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Paket Website</h2>
            <p className="fade-up stagger-1 text-center text-gray-500 mb-8 sm:mb-12 text-sm sm:text-base">Konsultasikan dan pilih paket website Anda sekarang juga!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-start">
              {paketList.map((p, idx) => {
                const isOpen = openPaket === p.nama;
                return (
                  <div key={p.nama} className={`fade-up stagger-${idx + 1} paket-card relative rounded-2xl border flex flex-col overflow-hidden bg-white ${p.best ? 'border-[#3d8b5e] shadow-2xl lg:scale-105' : 'border-gray-200 shadow-sm'}`}>
                    {p.best && <div className="text-white text-xs font-bold text-center py-1.5 tracking-wide" style={{ background: '#3d8b5e' }}>BEST SELLER !</div>}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="flex justify-center mb-3">
                        <img src={p.medal} alt={`${p.nama} package`} className="w-20 h-20 sm:w-24 sm:h-24 object-contain" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }} />
                      </div>
                      <p className="text-center font-bold text-gray-700 text-base sm:text-lg mb-3">{p.nama}</p>
                      <p className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: '#3d8b5e' }}>{p.harga}</p>
                      <p className="text-xs text-gray-400 mb-4">Perpanjangan {p.perp}</p>

                      <a
                        href="https://wa.me/6282249244647?text=Halo+nativecode.id%2C+saya+ingin+konsultasi+mengenai+layanan+nativecode.id.+Mohon+bantuannya+%F0%9F%99%8F"
                        target="_blank" rel="noopener noreferrer"
                        className={`w-full py-2.5 rounded-full border text-sm font-semibold flex items-center justify-center gap-2 mb-4 transition-colors ${p.best ? 'border-[#3d8b5e] text-[#3d8b5e] hover:bg-[#3d8b5e] hover:text-white' : 'border-[#c96a1a] text-[#c96a1a] hover:bg-[#c96a1a] hover:text-white'}`}
                      >
                        Pesan Sekarang
                      </a>
                      <div className="text-white text-center text-sm font-semibold py-2 rounded-lg mb-4" style={{ background: '#3d8b5e' }}>Fitur Paket</div>
                      <ul className="space-y-2 mb-4">
                        {p.fitur.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="mt-0.5 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3d8b5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => togglePaket(p.nama)}
                        className="w-full py-2 text-sm border rounded-full transition-colors flex items-center justify-center gap-2 hover:border-[#3d8b5e] hover:text-[#3d8b5e] border-gray-200 text-gray-400"
                      >
                        {isOpen ? 'Sembunyikan' : 'Lihat Detail'}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
                      </button>
                      {isOpen && (
                        <div className="pt-4 border-t border-gray-100 mt-4 pb-2">
                          <p className="text-sm text-gray-500 leading-relaxed mb-3">{paketDetail[p.nama].deskDetail}</p>
                          <ul className="space-y-1.5">
                            {paketDetail[p.nama].fiturDetail.map((f, fi) => (
                              <li key={fi} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#3d8b5e' }}>
                                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </span>
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <SectionCurve fill="#ffffff" path="M0,20 C360,60 1080,0 1440,50 L1440,60 L0,60 Z" />
        </section>

        {/* Fitur Unggulan */}
        <section className="bg-white py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Fitur Unggulan</h2>
            <p className="fade-up stagger-1 text-center font-semibold text-gray-700 mb-2 text-sm sm:text-base">Dapatkan Semua Fitur Ini Secara Gratis!</p>
            <p className="fade-up stagger-2 text-center text-gray-500 mb-8 sm:mb-12 text-sm sm:text-base">Inilah yang Anda dapatkan dari Jasa Pembuatan Website nativecode.id</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-24" style={{ alignItems: 'stretch' }}>
              {featureList.map((f, i) => (
                <div key={i} className={`fade-up stagger-${i + 1} flex`}>
                  <FeatureCard {...f} />
                </div>
              ))}
            </div>

            {/* Server stats banner */}
            <div className="fade-up relative">
              <div className="absolute left-1/2 -translate-x-1/2 -top-20 z-10 float-rocket hidden sm:block">
                <img
                  src="/images/beranda/roket-server.png"
                  alt="Roket"
                  className="w-32 object-contain"
                  style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' }}
                />
              </div>
              <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8" style={{ background: '#3d8b5e' }}>
                <div className="text-white">
                  <p className="text-xl sm:text-2xl font-bold">Server Hosting Terbaik —</p>
                  <p className="text-white opacity-80 text-base sm:text-lg mt-1">Kecepatan Maksimal, Performa Stabil!</p>
                </div>
                <div className="flex gap-8 sm:gap-12 text-white">
                  <div className="text-center border-r border-white border-opacity-30 pr-8 sm:pr-12">
                    <p className="text-4xl sm:text-5xl font-bold">99,9%</p>
                    <p className="text-sm opacity-80 mt-1">Uptime</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl sm:text-5xl font-bold">4,9</p>
                    <p className="text-sm opacity-80 mt-1">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="bg-white pb-12 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="fade-left hidden lg:flex items-center justify-center">
                <img src="/images/beranda/layanan-lainnya.png" alt="Tim nativecode.id" className="w-80 sm:w-96 object-contain" style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.08))' }} />
              </div>
              <div className="fade-right">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Layanan Lainnya</h2>
                <div className="space-y-3">
                  {[
                    { title: 'Jasa SEO Optimization', desc: 'Naikkan peringkat website Anda di Google dengan strategi SEO aman, terukur, dan bergaransi hasil.', href: '/layanan/seo' },
                    { title: 'Jasa Pembuatan Aplikasi', desc: 'Wujudkan ide digital Anda menjadi aplikasi berbasis web atau mobile yang fungsional.', href: '/layanan/pembuatan-aplikasi' },
                  ].map((s, i) => (
                    <a key={i} href={s.href} className="service-link flex items-center justify-between text-white rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4" style={{ background: '#3d8b5e' }}>
                      <div className="flex-1 pr-4">
                        <p className="font-bold text-sm sm:text-base">{s.title}</p>
                        <p className="text-xs sm:text-sm opacity-80 mt-0.5">{s.desc}</p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3d8b5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M7 7h10v10"/>
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Bottom */}
        <section className="bg-white pb-12 sm:pb-20">
          <div className="fade-up max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white border border-gray-100 rounded-2xl shadow-sm px-6 py-4">
              <span className="flex-1 text-sm text-gray-400">Dapatkan Harga Spesial Sekarang</span>

              <a
                href="https://wa.me/6282249244647?text=Halo+nativecode.id%2C+saya+ingin+konsultasi+mengenai+layanan+nativecode.id.+Mohon+bantuannya+%F0%9F%99%8F"
                target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto text-center text-white px-8 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ background: '#3d8b5e' }}
              >
                Klik Disini !!!
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
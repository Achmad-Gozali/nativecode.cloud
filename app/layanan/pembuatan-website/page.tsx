'use client';
import { useState } from 'react';
import Navigasi from '@/komponen/Navigasi';
import Footer from '@/komponen/Footer';
import { useScrollAnim } from '@/hooks/use-scroll-anim';

const IconPhone = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
);

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

const fiturUnggulan = [
  {
    title: 'Domain & Hosting Termasuk',
    desc: 'Setiap paket sudah termasuk domain dan hosting 1 tahun pertama, langsung online tanpa biaya tambahan di awal.',
  },
  {
    title: 'Sertifikat SSL Gratis',
    desc: 'Website aman dan terpercaya dengan SSL (https) gratis untuk semua paket.',
  },
  {
    title: 'Responsif di Semua Perangkat',
    desc: 'Website tampil sempurna di desktop, tablet, hingga smartphone.',
  },
  {
    title: 'SEO Friendly',
    desc: 'Struktur dan konten website dirancang agar mudah ditemukan di Google.',
  },
  {
    title: 'Desain Modern & Kekinian',
    desc: 'Kami selalu mengikuti tren desain terbaru agar tampilan website Anda terlihat profesional.',
  },
  {
    title: 'Ide Konten & Copywriting',
    desc: 'Tim kami siap bantu buatkan konten yang persuasif dan menarik untuk bisnis Anda.',
  },
];

export default function PembuatanWebsite() {
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());
  useScrollAnim();

  const toggleDetail = (key: string) => {
    setOpenSet(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <>
      <Navigasi />
      <main className="min-h-screen bg-white pt-16">

        {/* Hero */}
        <section className="relative bg-white pt-14 pb-16 sm:pt-24 sm:pb-24 px-4 text-center overflow-hidden">
          <h1 className="fade-up text-2xl sm:text-5xl font-bold text-gray-900 mb-3">Jasa Pembuatan Website</h1>
          <p className="fade-up stagger-1 text-gray-500 mb-3 text-sm">www.nativecode.cloud</p>
          <p className="fade-up stagger-2 text-sm sm:text-lg text-gray-600 mb-8 px-2 max-w-lg mx-auto">
            Jasa Pembuatan <span className="text-[#c96a1a] font-semibold">Website Profesional</span> dan{' '}
            <span className="text-[#3d8b5e] font-semibold">SEO Bergaransi</span>
          </p>
          <div className="fade-up stagger-3">
            <a
              href="https://wa.me/6282249244647?text=Halo+nativecode.cloud%2C+saya+ingin+konsultasi+mengenai+layanan+Pembuatan+Website.+Mohon+bantuannya+%F0%9F%99%8F"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md text-sm sm:text-base"
              style={{ background: '#c96a1a' }}
            >
              <IconPhone size={16} />Konsultasi
            </a>
          </div>
          <SectionCurve fill="#f1f5f9" path="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" />
        </section>

        {/* Intro */}
        <section className="relative bg-[#f1f5f9] pt-12 pb-12 sm:pt-20 sm:pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="fade-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-1">
                  <span className="text-[#c96a1a]">nativecode</span><span className="text-[#3d8b5e]">.id</span>
                </h2>
                <p className="font-semibold text-gray-800 text-base sm:text-lg mb-4">
                  Tampil lebih profesional. Ditemukan lebih cepat. Dikenal lebih luas
                </p>
                <p className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base">
                  Kami menghadirkan website yang menarik, responsif, dan fungsional, dirancang khusus untuk mencerminkan identitas brand Anda.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="https://wa.me/6282249244647?text=Halo+nativecode.cloud%2C+saya+ingin+konsultasi+mengenai+layanan+Pembuatan+Website.+Mohon+bantuannya+%F0%9F%99%8F"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm"
                    style={{ background: '#c96a1a' }}
                  >
                    <IconPhone size={15} />Konsultasi
                  </a>
                  <a
                    href="#paket"
                    className="inline-flex items-center gap-2 border border-[#3d8b5e] text-[#3d8b5e] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-[#3d8b5e] hover:text-white transition-colors text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    Lihat Paket
                  </a>
                </div>
              </div>
              <div className="fade-right hidden lg:flex items-center justify-center">
                <img
                  src="/images/layanan-website/pembuatan-website-hero.png"
                  alt="Web Design nativecode.cloud"
                  className="w-full max-w-md object-contain"
                  style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.08))' }}
                />
              </div>
            </div>
          </div>
          <SectionCurve fill="#ffffff" path="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" />
        </section>

        {/* Paket */}
        <section id="paket" className="relative bg-white pt-12 pb-12 sm:pt-20 sm:pb-20 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Paket Website</h2>
            <p className="fade-up stagger-1 text-center text-gray-500 mb-8 sm:mb-12 text-sm sm:text-base">Konsultasikan dan pilih paket website Anda sekarang juga!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-start">
              {paketList.map((p, idx) => {
                const isOpen = openSet.has(p.nama);
                return (
                  <div
                    key={p.nama}
                    className={`fade-up stagger-${idx + 1} relative rounded-2xl bg-white border flex flex-col overflow-hidden ${p.best ? 'border-[#3d8b5e] shadow-xl lg:scale-105' : 'border-gray-200 shadow-sm'}`}
                  >
                    {p.best && (
                      <div className="text-white text-xs font-bold text-center py-1.5 tracking-wide" style={{ background: '#3d8b5e' }}>BEST SELLER !</div>
                    )}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="flex justify-center mb-3">
                        <img src={p.medal} alt={`${p.nama} package`} className="w-20 h-20 sm:w-24 sm:h-24 object-contain" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }} />
                      </div>
                      <p className="text-center font-bold text-gray-700 text-base sm:text-lg mb-3">{p.nama}</p>
                      <p className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: '#3d8b5e' }}>{p.harga}</p>
                      <p className="text-xs text-gray-400 mb-4">Perpanjangan {p.perp}</p>
                      <a
                        href="https://wa.me/6282249244647?text=Halo+nativecode.cloud%2C+saya+ingin+konsultasi+mengenai+layanan+Pembuatan+Website.+Mohon+bantuannya+%F0%9F%99%8F"
                        target="_blank" rel="noopener noreferrer"
                        className={`w-full py-2.5 rounded-full border font-semibold text-sm mb-4 flex items-center justify-center gap-2 transition-colors ${p.best ? 'border-[#3d8b5e] text-[#3d8b5e] hover:bg-[#3d8b5e] hover:text-white' : 'border-[#c96a1a] text-[#c96a1a] hover:bg-[#c96a1a] hover:text-white'}`}
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
                        onClick={() => toggleDetail(p.nama)}
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
          <SectionCurve fill="#f1f5f9" path="M0,20 C360,60 1080,0 1440,50 L1440,60 L0,60 Z" />
        </section>

        {/* Fitur Unggulan - plain, tanpa card/icon/nomor */}
        <section className="bg-[#f1f5f9] py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Fitur Unggulan</h2>
            <p className="fade-up stagger-1 text-center font-semibold text-gray-700 mb-2 text-sm sm:text-base">Dapatkan Semua Fitur Ini Secara Gratis!</p>
            <p className="fade-up stagger-2 text-center text-gray-500 mb-10 sm:mb-16 text-sm sm:text-base">Inilah yang Anda dapatkan dari Jasa Pembuatan Website nativecode.cloud</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {fiturUnggulan.map((f, i) => (
                <div key={i} className={`fade-up stagger-${(i % 4) + 1}`}>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
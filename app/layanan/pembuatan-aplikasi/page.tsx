'use client';
import { useState } from 'react';
import Image from 'next/image';
import Navigasi from '@/komponen/Navigasi';
import Footer from '@/komponen/Footer';
import { useScrollAnim } from '@/hooks/use-scroll-anim';

const HeadphonesIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
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

const WA_LINK = 'https://wa.me/6282249244647?text=Halo+nativecode.cloud%2C+saya+ingin+konsultasi+mengenai+layanan+Pembuatan+Aplikasi.+Mohon+bantuannya+%F0%9F%99%8F';

const fitur = [
  {
    title: 'Pengembangan Aplikasi Android dan iOS',
    desc: 'Kami menawarkan layanan pengembangan aplikasi mobile untuk platform Android dan iOS, yang dirancang untuk memberikan pengalaman pengguna yang mulus dan intuitif. Tim kami menguasai teknologi terkini dalam pengembangan aplikasi yang fungsional dan andal.',
  },
  {
    title: 'Publikasi di Play Store dan App Store',
    desc: 'Kami tidak hanya mengembangkan aplikasi Anda, tetapi juga memastikan aplikasi tersebut siap untuk diluncurkan di Play Store dan App Store. Kami menangani seluruh proses pengiriman dan persetujuan, sehingga Anda dapat fokus pada aspek lain dari bisnis Anda.',
  },
  {
    title: 'Tampilan Antarmuka yang Rapi dan Fungsional',
    desc: 'Setiap aplikasi yang kami bangun dirancang dengan struktur yang jelas dan mudah digunakan. Kami mengutamakan kenyamanan navigasi dan fungsi yang bekerja dengan baik, memastikan aplikasi Anda memberikan pengalaman yang lancar bagi pengguna.',
  },
  {
    title: 'Integrasi Fitur Khusus',
    desc: 'Apakah bisnis Anda memerlukan integrasi pembayaran, notifikasi push, geolokasi, atau fitur khusus lainnya? Kami dapat menyesuaikan aplikasi Anda dengan fitur yang relevan dan fungsional, membantu Anda memenuhi kebutuhan spesifik pelanggan Anda.',
  },
];

const prosesPengembangan = [
  {
    step: '01',
    title: 'Konsultasi & Requirement',
    desc: 'Diskusikan kebutuhan aplikasi Anda melalui WhatsApp, mulai dari platform yang dituju, fitur utama, hingga target pengguna aplikasi.',
  },
  {
    step: '02',
    title: 'Rancangan Tampilan',
    desc: 'Kami menyusun tampilan antarmuka aplikasi yang rapi dan mudah digunakan, disesuaikan dengan identitas brand dan alur penggunaan yang Anda inginkan.',
  },
  {
    step: '03',
    title: 'Development & Testing',
    desc: 'Aplikasi dibangun langsung melalui coding, dilengkapi fitur sesuai paket yang dipilih, dan diuji secara menyeluruh sebelum tahap publikasi.',
  },
  {
    step: '04',
    title: 'Publikasi ke Store',
    desc: 'Kami menangani proses pengiriman dan persetujuan aplikasi ke Play Store dan/atau App Store, hingga aplikasi Anda siap diunduh publik.',
  },
];

const faqList = [
  {
    q: 'Apakah saya perlu akun Google Play Console atau Apple Developer sendiri?',
    a: 'Ya, publikasi aplikasi memerlukan akun developer resmi atas nama Anda atau perusahaan Anda (Google Play Console untuk Android, Apple Developer Program untuk iOS). Akun ini memiliki biaya pendaftaran dari pihak Google/Apple, di luar biaya jasa pembuatan aplikasi. Tim kami akan membantu proses pendaftaran dan publikasinya.',
  },
  {
    q: 'Berapa lama proses review di Play Store atau App Store?',
    a: 'Play Store umumnya memproses review dalam beberapa jam hingga 1-2 hari, sementara App Store bisa memakan waktu 1-3 hari kerja. Proses ini di luar kendali kami karena merupakan kebijakan masing-masing platform, namun kami akan memastikan aplikasi memenuhi seluruh ketentuan agar proses review berjalan lancar.',
  },
  {
    q: 'Apakah saya mendapatkan source code aplikasi?',
    a: 'Source code tidak termasuk pada paket Starter, Pro, dan Business. Source code hanya disertakan pada paket Enterprise sesuai kesepakatan kontrak. Anda tetap mendapatkan akses penuh terhadap aplikasi yang sudah dipublikasikan di store.',
  },
  {
    q: 'Apakah aplikasi bisa diupdate setelah publish?',
    a: 'Bisa. Setiap paket sudah termasuk garansi bug fix pasca peluncuran sesuai durasi masing-masing paket. Untuk penambahan fitur baru di luar cakupan awal, akan dikenakan biaya tambahan sesuai kompleksitas pengembangan yang dibutuhkan.',
  },
  {
    q: 'Berapa lama waktu pengerjaan aplikasi?',
    a: 'Durasi pengerjaan bergantung pada paket dan kompleksitas fitur. Paket Starter umumnya selesai dalam 2-3 minggu, sementara paket Pro dan Business dapat memakan waktu 1-2 bulan tergantung jumlah fitur dan integrasi yang dibutuhkan.',
  },
];

const paket = [
  {
    nama: 'Starter', medal: '/images/paket/silver.webp', harga: '750K', bestSeller: false,
    deskripsi: 'Cocok untuk UMKM atau individu yang baru ingin memiliki aplikasi mobile sederhana dan fungsional.',
    fitur: ['1 Platform (Android atau iOS)', 'Tampilan Antarmuka Standar', 'Fitur Login & Register', 'Maksimal 5 Halaman/Screen', 'Free Revisi 1x', 'Publikasi ke Play Store / App Store'],
    detail: ['Konsultasi kebutuhan aplikasi', 'Tampilan antarmuka berbasis template standar', 'Integrasi database dasar', 'Testing sebelum publish', 'Garansi bug fix 1 bulan setelah launch', 'Source code tidak termasuk'],
  },
  {
    nama: 'Pro', medal: '/images/paket/gold.webp', harga: '2 Jt', bestSeller: true,
    deskripsi: 'Cocok untuk bisnis yang sudah berjalan dan ingin hadir di dua platform sekaligus dengan tampilan yang lebih profesional.',
    fitur: ['2 Platform (Android + iOS)', 'Tampilan Antarmuka Disesuaikan', 'Fitur Login, Register & Profil', 'Maksimal 10 Halaman/Screen', 'Push Notification', 'Free Revisi 2x', 'Publikasi ke Play Store & App Store'],
    detail: ['Konsultasi mendalam kebutuhan bisnis', 'Tampilan antarmuka disesuaikan dengan identitas brand', 'Integrasi API pihak ketiga (max 2)', 'Integrasi media sosial (login with Google/FB)', 'Testing menyeluruh sebelum publish', 'Garansi bug fix 2 bulan setelah launch', 'Source code tidak termasuk'],
  },
  {
    nama: 'Business', medal: '/images/paket/diamond.webp', harga: '5 Jt', bestSeller: false,
    deskripsi: 'Cocok untuk bisnis skala menengah yang butuh fitur lebih kompleks termasuk payment gateway dan dashboard admin.',
    fitur: ['2 Platform (Android + iOS)', 'Tampilan Antarmuka Disesuaikan Penuh', 'Fitur Lengkap + Payment Gateway', 'Admin Dashboard Web', 'Push Notification & Analytics', 'Maksimal 20 Halaman/Screen', 'Free Revisi 3x', 'Publikasi ke Play Store & App Store'],
    detail: ['Konsultasi mendalam + wireframe', 'Tampilan antarmuka disesuaikan penuh dengan branding', 'Integrasi payment gateway (Midtrans/Xendit)', 'Admin dashboard berbasis web', 'Integrasi API pihak ketiga (max 5)', 'Push notification & in-app analytics', 'Testing QA menyeluruh', 'Garansi bug fix 3 bulan setelah launch', 'Source code tidak termasuk'],
  },
  {
    nama: 'Enterprise', medal: '/images/paket/platinum.webp', harga: 'Custom', bestSeller: false,
    deskripsi: 'Solusi aplikasi skala enterprise dengan fitur kompleks, integrasi sistem penuh, dan maintenance berkelanjutan.',
    fitur: ['Multi Platform (Android, iOS, Web)', 'Tampilan Antarmuka Disesuaikan Sepenuhnya', 'Fitur Kompleks & Integrasi Penuh', 'Admin Dashboard + CMS', 'API Development Custom', 'Halaman/Screen Tidak Terbatas', 'Revisi Tidak Terbatas', 'Maintenance & Support Ongoing'],
    detail: ['Konsultasi mendalam + business analysis', 'Wireframe & prototype interaktif', 'Tampilan antarmuka disesuaikan sepenuhnya', 'Pengembangan API backend custom', 'Integrasi sistem internal perusahaan', 'Admin dashboard + CMS lengkap', 'Multi bahasa (opsional)', 'Security audit & penetration testing', 'Training penggunaan sistem', 'Maintenance & support ongoing (kontrak)', 'Source code included'],
  },
];

export default function PembuatanAplikasi() {
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useScrollAnim();

  const toggleDetail = (nama: string) => {
    setOpenSet(prev => {
      const next = new Set(prev);
      next.has(nama) ? next.delete(nama) : next.add(nama);
      return next;
    });
  };

  return (
    <>
      <Navigasi />
      <main className="min-h-screen bg-white pt-16">

        {/* HERO */}
        <section className="relative bg-white pt-14 pb-16 sm:pt-24 sm:pb-24 px-4 text-center overflow-hidden">
          <h1 className="fade-up text-2xl sm:text-5xl font-bold text-gray-900 mb-3">Jasa Pembuatan Aplikasi</h1>
          <p className="fade-up stagger-1 text-gray-500 mb-3 text-sm sm:text-base">www.nativecode.cloud</p>
          <p className="fade-up stagger-2 text-sm sm:text-lg text-gray-600 mb-8 px-2 max-w-lg mx-auto">
            Wujudkan{' '}
            <span className="text-[#c96a1a] font-semibold">Aplikasi Mobile</span>{' '}
            yang{' '}
            <span className="text-[#3d8b5e] font-semibold">Fungsional dan Profesional</span>
          </p>
          <div className="fade-up stagger-3">
            <a
              href={WA_LINK}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md text-sm sm:text-base"
              style={{ background: '#c96a1a' }}
            >
              <HeadphonesIcon size={18} />Konsultasi
            </a>
          </div>
          <SectionCurve fill="#f1f5f9" path="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" />
        </section>

        {/* ABOUT */}
        <section className="relative bg-[#f1f5f9] pt-12 pb-12 sm:pt-20 sm:pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="fade-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-1">
                  <span className="text-[#c96a1a]">nativecode</span>
                  <span className="text-[#3d8b5e]">.id</span>
                </h2>
                <p className="font-semibold text-gray-800 text-base sm:text-lg mb-4">
                  Aplikasi Mobile Custom, Siap Publikasi ke Play Store dan App Store
                </p>
                <p className="text-gray-600 leading-relaxed mb-3 text-sm sm:text-base">
                  Paket jasa pembuatan aplikasi mobile, dibangun langsung melalui coding, siap publikasi ke Play Store dan App Store, untuk berbagai kebutuhan bisnis Anda.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base">
                  Jika Anda memiliki preferensi khusus atau ingin menambahkan detail tertentu, silakan beri tahu kami.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={WA_LINK}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
                    style={{ background: '#c96a1a' }}
                  >
                    <HeadphonesIcon size={16} />Konsultasi
                  </a>
                  <a
                    href="#paket"
                    className="inline-flex items-center gap-2 border border-[#3d8b5e] text-[#3d8b5e] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-[#3d8b5e] hover:text-white transition-colors text-sm sm:text-base"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    Lihat Paket
                  </a>
                </div>
              </div>
              <div className="fade-right flex items-center justify-center">
                <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg" style={{ aspectRatio: '1/1' }}>
                  <Image src="/images/layanan-aplikasi/pembuatan-apk.webp" alt="Pembuatan Aplikasi Illustration" fill className="object-contain" priority />
                </div>
              </div>
            </div>
          </div>
          <SectionCurve fill="#ffffff" path="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" />
        </section>

        {/* APA YANG KAMI TAWARKAN - plain, tanpa card/icon */}
        <section className="relative bg-white py-12 sm:py-20 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10 sm:mb-16">Apa yang kami tawarkan?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {fitur.map((f, i) => (
                <div key={i} className={`fade-up stagger-${(i % 2) + 1}`}>
                  <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <SectionCurve fill="#f1f5f9" path="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" />
        </section>

        {/* PROSES PENGEMBANGAN */}
        <section className="relative bg-[#f1f5f9] py-12 sm:py-20 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Bagaimana Prosesnya?</h2>
            <p className="fade-up stagger-1 text-center text-gray-500 mb-10 sm:mb-16 text-sm sm:text-base px-2 max-w-2xl mx-auto">
              Alur pengembangan aplikasi yang jelas dan transparan, dari konsultasi awal hingga aplikasi Anda siap diunduh publik.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
              {prosesPengembangan.map((p, i) => (
                <div key={p.step} className={`fade-up stagger-${i + 1} relative`}>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg mb-4"
                    style={{ background: i % 2 === 0 ? '#3d8b5e' : '#c96a1a' }}
                  >
                    {p.step}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <SectionCurve fill="#ffffff" path="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" />
        </section>

        {/* PAKET */}
        <section id="paket" className="bg-white py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Paket Pembuatan Aplikasi</h2>
            <p className="fade-up stagger-1 text-center text-gray-500 mb-8 sm:mb-12 text-sm sm:text-base px-2">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Mulai dari aplikasi sederhana hingga solusi enterprise lengkap.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-start">
              {paket.map((p, idx) => {
                const isOpen = openSet.has(p.nama);
                return (
                  <div
                    key={p.nama}
                    className={`fade-up stagger-${idx + 1} relative rounded-2xl bg-white border ${p.bestSeller ? 'border-[#3d8b5e] shadow-xl sm:scale-105' : 'border-gray-200 shadow-sm'} overflow-hidden flex flex-col`}
                  >
                    {p.bestSeller && (
                      <div className="text-white text-xs font-bold text-center py-1.5 tracking-wide" style={{ background: '#3d8b5e' }}>BEST SELLER !</div>
                    )}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="flex justify-center mb-3">
                        <img src={p.medal} alt={`${p.nama} package`} className="w-20 h-20 sm:w-24 sm:h-24 object-contain" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }} />
                      </div>
                      <p className="text-center font-bold text-gray-700 text-base sm:text-lg mb-1">{p.nama}</p>
                      <p className="text-center text-xs sm:text-sm text-gray-400 mb-3 leading-relaxed">{p.deskripsi}</p>
                      <p className="text-xs sm:text-sm text-gray-400 text-center">Start From</p>
                      <p className="text-3xl sm:text-4xl font-bold mb-4 text-center" style={{ color: '#3d8b5e' }}>
                        {p.harga}
                        {p.nama === 'Enterprise' && <span className="text-base font-normal text-gray-500 block mt-1">Hubungi Kami</span>}
                      </p>
                      <a
                        href={WA_LINK}
                        target="_blank" rel="noopener noreferrer"
                        className={`w-full py-2 sm:py-2.5 rounded-full border font-semibold text-sm mb-4 flex items-center justify-center gap-2 transition-colors ${p.bestSeller ? 'border-[#3d8b5e] text-[#3d8b5e] hover:bg-[#3d8b5e] hover:text-white' : 'border-[#c96a1a] text-[#c96a1a] hover:bg-[#c96a1a] hover:text-white'}`}
                      >
                        {p.nama === 'Enterprise' ? 'Konsultasi Gratis' : 'Pesan Sekarang'}
                      </a>
                      <div className="text-white text-center text-sm font-semibold py-2 rounded-lg mb-4" style={{ background: '#3d8b5e' }}>Fitur Paket</div>
                      <ul className="space-y-2 mb-4">
                        {p.fitur.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-0.5 flex-shrink-0" style={{ color: '#3d8b5e' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => toggleDetail(p.nama)}
                        className="w-full py-2 text-sm border rounded-full transition-colors flex items-center justify-center gap-2 hover:border-[#3d8b5e] hover:text-[#3d8b5e] border-gray-200 text-gray-500"
                      >
                        {isOpen ? 'Sembunyikan' : 'Lihat Detail'}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
                      </button>
                      {isOpen && (
                        <div className="pt-4 border-t border-gray-100 mt-4 pb-2">
                          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Yang termasuk:</p>
                          <ul className="space-y-1.5">
                            {p.detail.map((d, di) => (
                              <li key={di} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#3d8b5e' }}>
                                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </span>
                                {d}
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

            {/* CTA */}
            <div className="fade-up mt-10 sm:mt-14 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center" style={{ background: '#3d8b5e' }}>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Tidak yakin paket mana yang cocok?</h3>
                <p className="text-white opacity-90 text-sm sm:text-base leading-relaxed mb-6">
                  Konsultasikan kebutuhan aplikasi Anda secara gratis bersama tim nativecode.cloud. Kami akan membantu memilihkan solusi terbaik sesuai dengan budget dan target bisnis Anda.
                </p>
                <a
                  href={WA_LINK}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
                  style={{ background: '#c96a1a' }}
                >
                  <HeadphonesIcon size={18} />Konsultasi Gratis
                </a>
              </div>
              <div className="flex justify-center lg:justify-end">
                <img
                  src="/images/shared/konsultasi-tim.webp"
                  alt="Tim nativecode.cloud siap membantu konsultasi"
                  className="w-full max-w-xs sm:max-w-sm h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative bg-[#f1f5f9] py-12 sm:py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Pertanyaan yang Sering Ditanyakan</h2>
            <p className="fade-up stagger-1 text-center text-gray-500 mb-10 sm:mb-14 text-sm sm:text-base px-2">
              Masih ada yang ingin ditanyakan? Hubungi kami langsung melalui WhatsApp.
            </p>
            <div className="space-y-3">
              {faqList.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className={`fade-up stagger-${(i % 4) + 1} bg-white rounded-2xl border border-gray-200 overflow-hidden`}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 text-left p-5 sm:p-6"
                    >
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">{f.q}</span>
                      <svg
                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d8b5e" strokeWidth="2.5"
                        className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{f.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
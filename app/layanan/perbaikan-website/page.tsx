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

const WA_LINK = 'https://wa.me/6282249244647?text=Halo+nativecode.cloud%2C+saya+ingin+konsultasi+mengenai+layanan+Perbaikan+%26+Perbaruan+Tampilan+Website.+Mohon+bantuannya+%F0%9F%99%8F';

// Masalah yang sering dialami klien - sesuaikan dengan kasus nyata
const masalah = [
  {
    title: 'Website Sering Error / Bug',
    desc: 'Tombol tidak berfungsi, form tidak terkirim, atau tampilan berantakan di beberapa halaman? Error kecil bisa membuat pengunjung kehilangan kepercayaan terhadap bisnis Anda.',
  },
  {
    title: 'Tampilan Ketinggalan Zaman',
    desc: 'Website yang dibuat bertahun-tahun lalu sering terasa kaku dan kurang menarik. Tampilan yang segar membantu membangun kesan profesional sejak pandangan pertama.',
  },
  {
    title: 'Tidak Responsif di HP',
    desc: 'Lebih dari separuh pengunjung mengakses lewat smartphone. Jika tampilan berantakan di layar kecil, calon pelanggan bisa langsung pergi ke kompetitor.',
  },
  {
    title: 'Sulit Dikelola Sendiri',
    desc: 'Ingin update konten atau harga tapi harus mengubah kode manual? Kami bisa bantu sederhanakan pengelolaan website Anda agar tidak selalu bergantung pada developer.',
  },
];

const paketDetail: Record<string, { deskDetail: string; fiturDetail: string[] }> = {
  'Quick Fix': {
    deskDetail: 'Untuk perbaikan bug atau error spesifik pada website yang sudah ada, tanpa mengubah tampilan secara keseluruhan.',
    fiturDetail: ['Analisa & identifikasi penyebab bug', 'Perbaikan kode / logic yang error', 'Testing setelah perbaikan', 'Garansi 2 minggu setelah selesai', 'Tidak termasuk perubahan tampilan'],
  },
  'Perbarui Tampilan Statis': {
    deskDetail: 'Untuk website satu halaman (landing page) yang ingin tampil lebih modern, profesional, dan cepat diakses, tanpa sistem pengelolaan konten.',
    fiturDetail: ['Perbarui tampilan sepenuhnya', 'Responsif di semua perangkat', 'Optimasi kecepatan akses', 'SEO dasar', 'Tanpa CMS (konten statis)', 'Garansi 1 bulan', 'Penambahan halaman: mulai Rp200.000/halaman'],
  },
  'Perbarui Tampilan Dinamis': {
    deskDetail: 'Untuk website company profile dengan banyak halaman yang butuh tampilan diperbarui lengkap dengan sistem pengelolaan konten (CMS), agar Anda bisa update sendiri.',
    fiturDetail: ['Perbarui tampilan sepenuhnya', 'Content Management System (CMS)', 'Responsif di semua perangkat', 'SEO friendly', 'Struktur kode rapi & scalable', 'Garansi 1 bulan', 'Penambahan halaman: mulai Rp400.000/halaman'],
  },
  'Full Rebuild': {
    deskDetail: 'Untuk website dengan kebutuhan fitur khusus, sistem custom, atau rombak total dari struktur lama ke teknologi yang lebih modern dan andal.',
    fiturDetail: ['Konsultasi mendalam kebutuhan bisnis', 'Perbarui tampilan sepenuhnya + fitur custom', 'CMS / admin dashboard', 'Migrasi data dari website lama (jika ada)', 'SEO friendly & optimasi performa', 'Garansi 3 bulan', 'Penambahan modul/fitur: mulai Rp500.000/modul'],
  },
};

const paketList = [
  {
    nama: 'Quick Fix', medal: '/images/paket/silver.webp', harga: '150K', perp: 'Per masalah', best: false,
    fitur: ['Perbaikan Bug Spesifik', 'Tanpa Ubah Tampilan', 'Testing Menyeluruh', 'Garansi 2 Minggu'],
  },
  {
    nama: 'Perbarui Tampilan Statis', medal: '/images/paket/gold.webp', harga: '250K', perp: 'Per halaman', best: false,
    fitur: ['Tampilan Lebih Modern', 'Tanpa CMS', 'Responsif Semua Perangkat', 'Garansi 1 Bulan'],
  },
  {
    nama: 'Perbarui Tampilan Dinamis', medal: '/images/paket/diamond.webp', harga: '2 Jt', perp: 'Start From', best: true,
    fitur: ['Perbarui Tampilan Penuh + CMS', 'Bisa Update Konten Sendiri', 'SEO Friendly', 'Garansi 1 Bulan'],
  },
  {
    nama: 'Full Rebuild', medal: '/images/paket/platinum.webp', harga: '3 Jt', perp: 'Start From', best: false,
    fitur: ['Rombak Total + Fitur Custom', 'Migrasi Data Website Lama', 'Admin Dashboard', 'Garansi 3 Bulan'],
  },
];

// Screenshot before-after project asli - ganti path & isi sesuai project yang sudah dikerjakan.
// Tambahkan item baru ke array ini kalau ada studi kasus lain di kemudian hari.
const sebelumSesudah = [
  {
    nama: 'Brew & Bean',
    kategori: 'Perbarui Tampilan Statis',
    before: '/images/layanan-perbaikan/before-1.webp',
    after: '/images/layanan-perbaikan/after-1.webp',
  },
];

const prosesPengerjaan = [
  {
    step: '01',
    title: 'Konsultasi & Diagnosa',
    desc: 'Kirimkan link atau ceritakan kendala website Anda melalui WhatsApp. Tim kami akan meninjau kondisi website dan mendiagnosa akar masalahnya secara gratis.',
  },
  {
    step: '02',
    title: 'Rekomendasi & Estimasi',
    desc: 'Berdasarkan hasil diagnosa, kami akan merekomendasikan paket yang paling sesuai beserta estimasi biaya dan waktu pengerjaan, sebelum Anda memutuskan untuk lanjut.',
  },
  {
    step: '03',
    title: 'Proses Pengerjaan',
    desc: 'Tim kami mulai memperbaiki atau memperbarui tampilan website Anda sesuai kesepakatan, dengan update progres berkala agar Anda tetap mengetahui perkembangannya.',
  },
  {
    step: '04',
    title: 'Testing & Serah Terima',
    desc: 'Website diuji secara menyeluruh sebelum diserahkan kembali kepada Anda, lengkap dengan masa garansi sesuai paket yang dipilih.',
  },
];

const faqList = [
  {
    q: 'Apakah data dan konten website lama saya aman?',
    a: 'Aman. Sebelum memulai pengerjaan, kami akan melakukan backup terhadap data dan konten website Anda yang sudah ada, sehingga tidak ada risiko kehilangan informasi selama proses berlangsung.',
  },
  {
    q: 'Berapa lama proses pengerjaannya?',
    a: 'Durasi pengerjaan bergantung pada skala masalah dan paket yang dipilih. Perbaikan bug (Quick Fix) umumnya selesai dalam 1-3 hari kerja, sementara perbaruan tampilan penuh dapat memakan waktu 1-3 minggu tergantung kompleksitasnya.',
  },
  {
    q: 'Bagaimana jika masalah website saya tidak sesuai dengan 4 paket yang ada?',
    a: 'Tidak masalah. Anda dapat berkonsultasi langsung dengan tim kami melalui WhatsApp untuk mendapatkan penawaran yang disesuaikan dengan kebutuhan spesifik Anda.',
  },
  {
    q: 'Apakah saya perlu menyediakan akses hosting atau source code?',
    a: 'Ya, kami akan meminta akses hosting, domain, atau source code website Anda (jika ada) agar tim dapat langsung menganalisa dan mengerjakan perbaikan atau pembaruan tampilan secara efektif.',
  },
  {
    q: 'Apakah ada garansi setelah pengerjaan selesai?',
    a: 'Ada. Setiap paket sudah termasuk masa garansi, mulai dari 2 minggu hingga 3 bulan tergantung paket yang dipilih, untuk perbaikan apabila ditemukan kendala terkait pengerjaan kami.',
  },
];

export default function PerbaikanWebsite() {
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

        {/* HERO */}
        <section className="relative bg-white pt-14 pb-16 sm:pt-24 sm:pb-24 px-4 text-center overflow-hidden">
          <h1 className="fade-up text-2xl sm:text-5xl font-bold text-gray-900 mb-3">Perbaikan &amp; Pembaruan Website</h1>
          <p className="fade-up stagger-1 text-gray-500 mb-3 text-sm sm:text-base">www.nativecode.cloud</p>
          <p className="fade-up stagger-2 text-base sm:text-lg text-gray-600 mb-8 px-2 max-w-lg mx-auto">
            <span className="text-[#c96a1a] font-semibold">Perbaiki Kendala Teknis</span> atau{' '}
            <span className="text-[#3d8b5e] font-semibold">Perbarui Tampilan</span> Website Anda
          </p>
          <div className="fade-up stagger-3">
            <a
              href={WA_LINK}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md text-sm sm:text-base"
              style={{ background: '#c96a1a' }}
            >
              <IconPhone size={16} />Konsultasi
            </a>
          </div>
          <SectionCurve fill="#f1f5f9" path="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" />
        </section>

        {/* INTRO */}
        <section className="relative bg-[#f1f5f9] pt-12 pb-12 sm:pt-20 sm:pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="fade-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-1">
                  <span className="text-[#c96a1a]">nativecode</span><span className="text-[#3d8b5e]">.cloud</span>
                </h2>
                <p className="font-semibold text-gray-800 text-base sm:text-lg mb-4">
                  Website lama bermasalah? Kami bantu benahi tanpa mulai dari nol.
                </p>
                <p className="text-gray-600 leading-relaxed mb-3 text-sm sm:text-base">
                  Apakah website Anda sudah ada tapi ada bug yang mengganggu, tampilan sudah ketinggalan zaman, atau tidak nyaman diakses lewat HP? Anda tidak perlu membangun ulang dari awal.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base">
                  Tim kami siap membantu memperbaiki, merapikan, hingga memperbarui tampilan website Anda sesuai kebutuhan dan skala masalahnya.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={WA_LINK}
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
              <div className="fade-right flex items-center justify-center">
                <img
                  src="/images/layanan-perbaikan/perbaikan-website-hero.webp"
                  alt="Jasa perbaikan dan perbaruan tampilan website nativecode.cloud"
                  className="w-full max-w-xs sm:max-w-sm lg:max-w-md rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
          <SectionCurve fill="#ffffff" path="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" />
        </section>

        {/* MASALAH YANG DIATASI - plain, tanpa card/icon */}
        <section className="relative bg-white py-12 sm:py-20 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Masalah Apa yang Kami Bantu Atasi?</h2>
            <p className="fade-up stagger-1 text-center text-gray-500 mb-10 sm:mb-16 text-sm sm:text-base px-2">
              Jika website Anda mengalami salah satu (atau lebih) dari masalah berikut, mungkin ini saatnya untuk diperbaiki.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {masalah.map((m, i) => (
                <div key={i} className={`fade-up stagger-${(i % 2) + 1}`}>
                  <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2">{m.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <SectionCurve fill="#f1f5f9" path="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" />
        </section>

        {/* PROSES PENGERJAAN */}
        <section className="relative bg-[#f1f5f9] py-12 sm:py-20 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Bagaimana Prosesnya?</h2>
            <p className="fade-up stagger-1 text-center text-gray-500 mb-10 sm:mb-16 text-sm sm:text-base px-2 max-w-2xl mx-auto">
              Alur pengerjaan yang jelas dan transparan, dari konsultasi awal hingga website Anda siap digunakan kembali.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
              {prosesPengerjaan.map((p, i) => (
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
            <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Paket Perbaikan &amp; Pembaruan Website</h2>
            <p className="fade-up stagger-1 text-center text-gray-500 mb-8 sm:mb-12 text-sm sm:text-base px-2">
              Pilih sesuai skala masalah website Anda. Belum yakin paket mana yang cocok? Konsultasikan dulu, gratis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-start">
              {paketList.map((p, idx) => {
                const isOpen = openSet.has(p.nama);
                return (
                  <div
                    key={p.nama}
                    className={`fade-up stagger-${idx + 1} relative rounded-2xl bg-white border flex flex-col overflow-hidden ${p.best ? 'border-[#3d8b5e] shadow-xl lg:scale-105' : 'border-gray-200 shadow-sm'}`}
                  >
                    {p.best && (
                      <div className="text-white text-xs font-bold text-center py-1.5 tracking-wide" style={{ background: '#3d8b5e' }}>PALING SERING DIPILIH</div>
                    )}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="flex justify-center mb-3">
                        <img src={p.medal} alt={`${p.nama} package`} className="w-20 h-20 sm:w-24 sm:h-24 object-contain" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }} />
                      </div>
                      <p className="text-center font-bold text-gray-700 text-base sm:text-lg mb-3">{p.nama}</p>
                      <p className="text-xs sm:text-sm text-gray-400 text-center">{p.perp}</p>
                      <p className="text-3xl sm:text-4xl font-bold mb-4 text-center" style={{ color: '#3d8b5e' }}>{p.harga}</p>
                      <a
                        href={WA_LINK}
                        target="_blank" rel="noopener noreferrer"
                        className={`w-full py-2.5 rounded-full border font-semibold text-sm mb-4 flex items-center justify-center gap-2 transition-colors ${p.best ? 'border-[#3d8b5e] text-[#3d8b5e] hover:bg-[#3d8b5e] hover:text-white' : 'border-[#c96a1a] text-[#c96a1a] hover:bg-[#c96a1a] hover:text-white'}`}
                      >
                        Konsultasi Sekarang
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

            {/* CTA */}
            <div className="fade-up mt-10 sm:mt-14 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center" style={{ background: '#3d8b5e' }}>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Tidak yakin skala masalah website Anda?</h3>
                <p className="text-white opacity-90 text-sm sm:text-base leading-relaxed mb-6">
                  Kirimkan link atau screenshot website Anda, tim kami akan bantu diagnosa masalahnya dan rekomendasikan paket yang paling sesuai, gratis tanpa biaya.
                </p>
                <a
                  href={WA_LINK}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
                  style={{ background: '#c96a1a' }}
                >
                  <IconPhone size={18} />Konsultasi Gratis
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
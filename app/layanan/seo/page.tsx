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

const paketSEO = [
  {
    nama: 'SEO Bergaransi', sub: 'Untuk Website dari nativecode.cloud', harga: '600K', satuan: '/Bulan',
    fitur: ['SEO website bahasa Indonesia Rp600.000/bulan (kontrak minimal 1 tahun)', 'SEO website bahasa Inggris Rp1.200.000/bulan (kontrak minimal 1 tahun)'],
    detail: {
      deskripsi: 'SEO nativecode.cloud membantu kata kunci pencarian bisnis Anda tampil di Google dan terbukti efektif mendukung kesuksesan bisnis klien.',
      poin: [
        'Optimasi untuk 5 kata kunci sesuai target pasar Anda, ditambah kata kunci bonus.',
        'Biaya SEO Bergaransi Rp600.000/bulan, ditagih sesuai jadwal yang disepakati.',
        'Jika pembayaran tertunggak, layanan optimasi akan dihentikan sementara hingga pembayaran diselesaikan. Website tetap aktif namun performa pencarian tidak dijamin selama periode tersebut.',
        'Mendapatkan laporan resmi menggunakan tool premium Rank Tracker untuk memantau posisi kata kunci secara akurat.',
      ],
      isFitur: false,
    },
  },
  {
    nama: 'SEO Reguler', sub: 'Untuk Website di Luar nativecode.cloud', harga: '950K', satuan: '/Bulan',
    fitur: ['SEO website bahasa Indonesia Rp950.000/bulan', 'SEO website bahasa Inggris Rp2.200.000/bulan'],
    detail: {
      deskripsi: 'Layanan optimasi SEO untuk website yang tidak dibangun oleh nativecode.cloud, dengan kualitas dan proses yang sama seperti paket SEO Bergaransi.',
      poin: [
        'Optimasi untuk 5 kata kunci sesuai target pasar Anda, ditambah kata kunci bonus.',
        'Biaya SEO Reguler Rp950.000/bulan, ditagih sesuai jadwal yang disepakati.',
        'Jika pembayaran tertunggak, layanan optimasi akan dihentikan sementara hingga pembayaran diselesaikan. Website tetap aktif namun performa pencarian tidak dijamin selama periode tersebut.',
        'Mendapatkan laporan resmi menggunakan tool premium Rank Tracker untuk memantau posisi kata kunci secara akurat.',
      ],
      isFitur: false,
    },
  },
  {
    nama: 'Beli Artikel', sub: 'Original, SEO Friendly', harga: '300K', satuan: '',
    fitur: ['Tingkatkan traffic website Anda', 'Rp300.000 untuk 2 artikel bahasa Indonesia', 'Rp600.000 untuk 2 artikel bahasa Inggris'],
    detail: {
      deskripsi: null,
      poin: ['Konsultasi konten dan target pasar', 'Analisis target SEO dan kata kunci', 'Setiap artikel original berisi 500-700 kata', 'Termasuk 1 gambar per artikel', 'Cocok untuk kebutuhan konten tanpa berlangganan SEO bulanan'],
      isFitur: true,
    },
  },
];

const faq = [
  { q: 'Apa itu SEO dan kenapa penting untuk bisnis saya?', a: 'SEO (Search Engine Optimization) adalah proses mengoptimalkan website agar muncul di posisi teratas hasil pencarian Google secara organik, tanpa perlu membayar per klik. Dengan SEO, bisnis Anda bisa ditemukan oleh calon pelanggan yang sedang aktif mencari produk atau jasa Anda, sehingga menghasilkan traffic berkualitas tinggi secara konsisten dan jangka panjang.' },
  { q: 'Berapa lama hasil SEO mulai terlihat?', a: 'SEO adalah investasi jangka panjang. Umumnya hasil awal mulai terlihat dalam 1-3 bulan, tergantung tingkat persaingan kata kunci dan kondisi website. Itulah kenapa kami menetapkan kontrak minimal 1 tahun, agar optimasi bisa dilakukan secara menyeluruh dan hasilnya stabil di pencarian Google.' },
  { q: 'Apa bedanya paket SEO Bergaransi dengan SEO Reguler?', a: 'Paket SEO Bergaransi khusus untuk website yang dibuat melalui nativecode.cloud, dengan harga lebih terjangkau karena kami sudah familiar dengan struktur websitenya. Paket SEO Reguler berlaku untuk website luar atau website yang tidak dibuat oleh nativecode.cloud. Keduanya mendapatkan layanan optimasi yang sama kualitasnya.' },
  { q: 'Apa yang terjadi jika saya berhenti membayar di tengah kontrak?', a: 'Jika pembayaran tidak dilanjutkan, layanan optimasi (SEO) akan kami hentikan sementara. Website akan tetap aktif, namun kami tidak bertanggung jawab atas penurunan peringkat atau traffic karena tidak adanya pemeliharaan rutin selama periode tersebut.' },
  { q: 'Berapa banyak kata kunci yang dioptimasi?', a: 'Setiap paket SEO mencakup optimasi untuk 5 kata kunci utama sesuai target pasar bisnis Anda, ditambah kata kunci bonus. Pemilihan kata kunci dilakukan melalui riset mendalam untuk memastikan kata kunci yang dipilih memiliki volume pencarian tinggi dan relevan dengan bisnis Anda.' },
  { q: 'Apakah saya mendapatkan laporan perkembangan SEO?', a: 'Ya. Setiap klien mendapatkan laporan resmi menggunakan tool premium Rank Tracker, yaitu tool SEO berbayar yang melacak peringkat website, traffic, dan performa kata kunci secara akurat. Laporan ini diberikan secara berkala agar Anda bisa memantau perkembangan SEO website Anda secara transparan.' },
];

export default function SEOBergaransi() {
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set());
  useScrollAnim();

  const toggleDetail = (key: string) => {
    setOpenSet(prev => { const next = new Set(prev); next.has(key) ? next.delete(key) : next.add(key); return next; });
  };
  const toggleFaq = (i: number) => {
    setOpenFaq(prev => { const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next; });
  };

  return (
    <>
      <Navigasi />
      <main className="min-h-screen bg-white pt-16">

        {/* HERO */}
        <section className="relative bg-white pt-14 pb-16 sm:pt-24 sm:pb-24 px-4 text-center overflow-hidden">
          <h1 className="fade-up text-2xl sm:text-5xl font-bold text-gray-900 mb-3">Optimasi SEO Bergaransi</h1>
          <p className="fade-up stagger-1 text-gray-500 mb-3 text-sm sm:text-base">www.nativecode.cloud</p>
          <p className="fade-up stagger-2 text-sm sm:text-lg text-gray-600 mb-8 px-2 max-w-lg mx-auto">
            Jasa Pembuatan <span className="text-[#c96a1a] font-semibold">Website Profesional</span> dan <span className="text-[#3d8b5e] font-semibold">SEO Bergaransi</span>
          </p>
          <div className="fade-up stagger-3">
            <a
              href="https://wa.me/6282249244647?text=Halo+nativecode.cloud%2C+saya+ingin+konsultasi+mengenai+layanan+SEO+Bergaransi.+Mohon+bantuannya+%F0%9F%99%8F"
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
                  <span className="text-[#c96a1a]">nativecode</span><span className="text-[#3d8b5e]">.id</span>
                </h2>
                <p className="font-semibold text-gray-800 text-base sm:text-lg mb-4">Tingkatkan Peringkat Website Anda dan Raih Lebih Banyak Pelanggan</p>
                <p className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base">
                  Di nativecode.cloud, kami membantu bisnis Anda tampil di halaman teratas Google dengan strategi SEO yang terbukti efektif. Dengan teknik terbaru dan optimasi menyeluruh, website Anda akan lebih mudah ditemukan, dikunjungi, dan menghasilkan konversi nyata.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="https://wa.me/6282249244647?text=Halo+nativecode.cloud%2C+saya+ingin+konsultasi+mengenai+layanan+SEO+Bergaransi.+Mohon+bantuannya+%F0%9F%99%8F"
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    Lihat Paket
                  </a>
                </div>
              </div>
              <div className="fade-right hidden lg:flex items-center justify-center">
                <Image
                  src="/images/layanan-seo/ilustrasi-ranking-seo.webp"
                  alt="SEO Bergaransi nativecode.cloud"
                  width={512}
                  height={384}
                  className="w-full max-w-sm lg:max-w-lg h-auto object-contain"
                />
              </div>
            </div>
          </div>
          <SectionCurve fill="#ffffff" path="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" />
        </section>

        {/* PAKET SEO */}
        <section id="paket" className="relative bg-white pt-12 pb-12 sm:pt-20 sm:pb-20 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Paket SEO Bergaransi</h2>
            <p className="fade-up stagger-1 text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base px-2">
              Tingkatkan peringkat bisnis Anda dan <strong>muncul di halaman pertama Google</strong> bersama nativecode.cloud.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
              {paketSEO.map((p, i) => {
                const key = `${i}`;
                const isOpen = openSet.has(key);
                return (
                  <div key={key} className="fade-up bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-center mb-1" style={{ color: '#3d8b5e' }}>{p.nama}</h3>
                      <p className="text-xs sm:text-sm text-gray-400 text-center mb-4">{p.sub}</p>
                      <p className="text-xs sm:text-sm text-gray-400 text-center">Start From</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-1">
                        {p.harga}{p.satuan && <span className="text-base font-normal text-gray-500"> {p.satuan}</span>}
                      </p>
                      <div className="text-white text-center text-sm font-semibold py-2 rounded-lg my-4" style={{ background: '#3d8b5e' }}>Fitur Paket</div>
                      <ul className="space-y-2 mb-4">
                        {p.fitur.map((f, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-0.5 flex-shrink-0" style={{ color: '#3d8b5e' }}>•</span>{f}
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => toggleDetail(key)} className="w-full py-2 text-sm text-gray-400 border border-gray-200 rounded-full hover:border-[#3d8b5e] hover:text-[#3d8b5e] transition-colors flex items-center justify-center gap-1">
                        {isOpen ? 'Sembunyikan' : 'Lihat Detail'}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
                      </button>
                      {isOpen && (
                        <div className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-600 leading-relaxed">
                          {p.detail.deskripsi && <p className="mb-3 text-gray-500">{p.detail.deskripsi}</p>}
                          {p.detail.isFitur ? (
                            <ul className="space-y-2">
                              {p.detail.poin.map((poin, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />{poin}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <ol className="space-y-2 list-decimal list-inside">
                              {p.detail.poin.map((poin, idx) => (
                                <li key={idx}>{poin}</li>
                              ))}
                            </ol>
                          )}
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

        {/* FAQ */}
        <section className="bg-[#f1f5f9] py-12 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Pertanyaan yang Sering Diajukan</h2>
            <p className="fade-up stagger-1 text-center text-gray-500 mb-8 sm:mb-10 text-sm sm:text-base">Semua yang perlu Anda tahu tentang layanan SEO kami</p>
            <div className="space-y-3">
              {faq.map((item, i) => {
                const isOpen = openFaq.has(i);
                return (
                  <div key={i} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <button onClick={() => toggleFaq(i)} className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors">
                      <span className="font-semibold text-gray-800 text-sm sm:text-base leading-snug">{item.q}</span>
                      <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ background: isOpen ? '#3d8b5e' : '#f3f4f6', color: isOpen ? '#ffffff' : '#6b7280' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5">
                        <div className="w-full h-px bg-gray-100 mb-4" />
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 bg-white border border-gray-200 rounded-2xl shadow-sm px-5 sm:px-6 py-4">
              <p className="flex-1 text-sm sm:text-base text-gray-500 text-center sm:text-left">Masih ada pertanyaan tentang SEO? Konsultasikan langsung dengan tim kami.</p>
              <a
                href="https://wa.me/6282249244647?text=Halo+nativecode.cloud%2C+saya+ingin+konsultasi+mengenai+layanan+SEO+Bergaransi.+Mohon+bantuannya+%F0%9F%99%8F"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
                style={{ background: '#c96a1a' }}
              >
                <HeadphonesIcon size={14} />Tanya Sekarang
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
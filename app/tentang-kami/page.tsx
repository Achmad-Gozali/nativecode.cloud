'use client';
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

const alasan = [
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="14" r="7" fill="#D17B36" opacity="0.8"/>
        <path d="M4 34c0-6.627 5.373-10 12-10s12 3.373 12 10" stroke="#D17B36" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="30" cy="12" r="5" fill="#D17B36" opacity="0.4"/>
        <path d="M26 30c0-4 2.686-7 6-7" stroke="#D17B36" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        <path d="M20 22l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Pengalaman & Kredibilitas',
    desc: 'Dengan pengalaman yang terus berkembang dan lebih dari 300 website yang telah kami bangun, nativecode.cloud menjadi mitra terpercaya bagi banyak bisnis dari berbagai sektor. Kami selalu fokus memberikan hasil terbaik yang mampu menjawab kebutuhan digital klien secara nyata.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="12" stroke="#D17B36" strokeWidth="2.5" opacity="0.4"/>
        <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#D17B36" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
        <circle cx="20" cy="20" r="5" fill="#D17B36" opacity="0.8"/>
      </svg>
    ),
    title: 'Layanan Terintegrasi',
    desc: 'Kami menyediakan solusi digital yang lengkap, mulai dari jasa pembuatan website hingga optimasi SEO. Seluruh proses kami tangani secara terintegrasi agar kehadiran online Anda dapat berjalan optimal tanpa perlu melibatkan banyak vendor berbeda.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4 L24 14 L36 14 L26 21 L30 32 L20 25 L10 32 L14 21 L4 14 L16 14 Z" fill="#D17B36" opacity="0.15" stroke="#D17B36" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M20 10 L22.5 17 L30 17 L24 21.5 L26.5 29 L20 24.5 L13.5 29 L16 21.5 L10 17 L17.5 17 Z" fill="#D17B36" opacity="0.5"/>
      </svg>
    ),
    title: 'Garansi Kualitas',
    desc: 'Setiap layanan SEO kami dilengkapi dengan garansi hasil. Kepuasan Anda adalah prioritas utama bagi kami, sehingga investasi digital yang Anda tanamkan bersama kami senantiasa aman, efektif, dan memberikan hasil yang terukur.',
  },
];

export default function TentangKami() {
  useScrollAnim();

  return (
    <>
      <Navigasi />
      <main className="min-h-screen bg-white pt-16">

        {/* HERO */}
        <section className="relative bg-white pt-16 pb-16 sm:pt-24 sm:pb-24 px-4 text-center overflow-hidden">
          <p className="fade-up text-sm text-gray-500 mb-2">www.nativecode.cloud</p>
          <h1 className="fade-up stagger-1 text-2xl sm:text-5xl font-bold text-gray-900 mb-4">Tentang Kami</h1>
          <p className="fade-up stagger-2 text-sm sm:text-lg text-gray-600 mb-8 px-2">
            Jasa Pembuatan{' '}
            <span className="text-[#D17B36] font-semibold">Website Profesional</span>{' '}
            dan{' '}
            <span className="text-[#5D9C76] font-semibold">SEO Bergaransi</span>
          </p>
          <div className="fade-up stagger-3">
            <a
              href="https://wa.me/6282249244647?text=Halo+nativecode.cloud%2C+saya+ingin+konsultasi+mengenai+layanan+nativecode.cloud.+Mohon+bantuannya+%F0%9F%99%8F" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D17B36] text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-[#c26f2f] transition-colors shadow-md text-sm sm:text-base"
            >
              <HeadphonesIcon size={18} />
              Konsultasi
            </a>
          </div>
          <SectionCurve fill="#f1f5f9" path="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" />
        </section>

        {/* ABOUT SECTION */}
        <section className="relative bg-[#f1f5f9] pt-12 pb-12 sm:pt-20 sm:pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

              <div className="fade-left">
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                  About <span className="text-[#D17B36]">native</span><span className="text-[#5D9C76]">code.cloud</span>
                </h2>
                <p className="text-gray-500 font-medium mb-6">Experience by the Best</p>
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-0.5 bg-[#D17B36] rounded" />
                  <div className="w-4 h-0.5 bg-[#5D9C76] rounded" />
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/beranda/about-laptop.webp"
                    alt="Tim developer nativecode.cloud"
                    width={384}
                    height={384}
                    className="w-full max-w-xs sm:max-w-sm h-auto object-contain"
                    style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.10))' }}
                  />
                </div>
              </div>

              <div className="fade-right flex flex-col justify-center space-y-6 text-gray-600 leading-relaxed">
                <p className="text-justify text-base sm:text-lg">
                  <strong className="text-gray-900">nativecode.cloud</strong> adalah jasa pembuatan website yang berfokus membantu bisnis, sekolah, dan instansi membangun identitas digital yang profesional. Kami hadir sebagai mitra yang membantu Anda tampil lebih profesional dan menjangkau audiens yang lebih luas melalui website yang tepat guna. Dengan pengalaman dalam pembuatan website dan SEO bergaransi, kami menghadirkan layanan yang terintegrasi untuk memperkuat kehadiran online setiap klien.
                </p>
                <p className="text-justify text-base sm:text-lg">
                  Kami percaya bahwa setiap bisnis memiliki cerita dan kebutuhan unik yang perlu ditampilkan dengan cara yang menarik dan relevan. Karena itu, setiap proyek di <strong className="text-gray-900">nativecode.cloud</strong> dikerjakan dengan pendekatan yang cermat, agar hasilnya tidak hanya terlihat menarik, tetapi juga memberikan dampak nyata terhadap kehadiran digital bisnis Anda.
                </p>
                <p className="text-justify text-base sm:text-lg">
                  Setiap proses kerja kami dilandasi oleh komunikasi yang terbuka dengan klien, sehingga setiap kebutuhan dan masukan dapat kami akomodasi dengan baik sejak tahap perencanaan hingga peluncuran website.
                </p>
              </div>

            </div>
          </div>
          <SectionCurve fill="#ffffff" path="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" />
        </section>

        {/* FOUNDER */}
        <section className="relative bg-white py-12 sm:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="fade-up text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3">Kenalan dengan Founder Kami</h2>
              <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
                Sosok di balik pengembangan nativecode.cloud, yang bertanggung jawab langsung atas setiap proses teknis dan kualitas layanan yang Anda terima.
              </p>
            </div>

            <div className="fade-up stagger-1 relative rounded-3xl bg-[#f1f5f9] overflow-hidden p-8 sm:p-16">

              {/* Blob dekoratif */}
              <div
                className="blob-pulse absolute -right-16 -top-16 w-56 h-56 rounded-full pointer-events-none opacity-40"
                style={{ background: 'radial-gradient(circle, #3d8b5e 0%, #c96a1a 70%, transparent 80%)' }}
              />
              <div
                className="blob-pulse-2 absolute -left-10 -bottom-10 w-40 h-40 rounded-full pointer-events-none opacity-25"
                style={{ background: 'radial-gradient(circle, #c96a1a 0%, #3d8b5e 70%, transparent 80%)' }}
              />

              <div className="relative grid grid-cols-1 sm:grid-cols-[360px_1fr] gap-10 sm:gap-14 items-center">
                <div className="fade-left flex justify-center sm:justify-start">
                  <div className="relative w-72 h-96 sm:w-full sm:h-[26rem] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/tentang-kami/founder.webp"
                      alt="Achmad Gozali, Founder & Developer nativecode.cloud"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                <div className="fade-right stagger-1 text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-semibold text-gray-800 leading-snug mb-8">
                    Setiap website yang kami bangun bukan sekadar produk jadi, tapi fondasi digital yang harus benar-benar mendukung pertumbuhan bisnis klien kami.
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Achmad Gozali</h3>
                      <p className="text-base font-semibold" style={{ color: '#c96a1a' }}>Founder &amp; Developer</p>
                    </div>
                    <a
                      href="https://wa.me/6282249244647?text=Halo+nativecode.cloud%2C+saya+ingin+konsultasi+mengenai+layanan+nativecode.cloud.+Mohon+bantuannya+%F0%9F%99%8F"
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold px-5 py-2.5 rounded-full border transition-colors flex-shrink-0 self-center sm:self-auto"
                      style={{ borderColor: '#3d8b5e', color: '#3d8b5e' }}
                    >
                      Hubungi Kami
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                    </a>
                  </div>

                  <p className="mt-8 text-gray-600 text-base sm:text-lg leading-relaxed text-justify">
                    Berangkat dari ketertarikan mendalam terhadap pengembangan website dan optimasi digital, Achmad mendirikan nativecode.cloud dengan tujuan menghadirkan solusi teknologi yang tidak hanya fungsional, tetapi juga relevan dengan kebutuhan bisnis di era digital.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <SectionCurve fill="#f1f5f9" path="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" />
        </section>

        {/* KOMITMEN SECTION - teks kiri, gambar kanan */}
        <section className="relative bg-[#f1f5f9] py-12 sm:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="fade-up grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg text-justify">
                  Dengan tim profesional yang berpengalaman dan responsif, kami berkomitmen memberikan pelayanan terbaik, mulai dari perencanaan, pengerjaan, hingga evaluasi hasil. nativecode.cloud bukan sekadar penyedia jasa digital, melainkan mitra yang tumbuh bersama klien menuju kehadiran online yang lebih kuat dan berkelanjutan.
                </p>
              </div>
              <div className="order-1 lg:order-2 flex items-center justify-center">
                <Image
                  src="/images/tentang-kami/ilustrasi-komitmen.webp"
                  alt="Komitmen nativecode.cloud"
                  width={384}
                  height={384}
                  className="w-full max-w-xs sm:max-w-sm h-auto object-contain"
                  style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.10))' }}
                />
              </div>
            </div>
          </div>
          <SectionCurve fill="#ffffff" path="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" />
        </section>

        {/* MENGAPA MEMILIH KAMI */}
        <section className="relative bg-white py-12 sm:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="fade-up text-2xl sm:text-4xl font-bold mb-1">
              <span className="text-[#D17B36]">nativecode</span>
              <span className="text-[#5D9C76]">.cloud</span>
            </h2>
            <p className="fade-up stagger-1 text-gray-700 font-semibold mb-8 sm:mb-12 text-base sm:text-lg">
              Jasa Pembuatan Website Profesional &amp; SEO Bergaransi
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {alasan.map((item, i) => (
                <div key={i} className={`fade-up stagger-${i + 1} bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:shadow-md transition-shadow`}>
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <SectionCurve fill="#ffffff" path="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" />
        </section>

      </main>
      <Footer />
    </>
  );
}
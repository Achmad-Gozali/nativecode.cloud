'use client';
import { useState } from 'react';
import Navigasi from '@/komponen/Navigasi';
import Footer from '@/komponen/Footer';

const IconPhone = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
);

const IconMail = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconMapPin = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
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

const layananOptions = [
  'Pembuatan Website',
  'Pembuatan Aplikasi',
  'SEO Bergaransi',
  'Lainnya',
];

export default function KontakPage() {
  const [nama, setNama] = useState('');
  const [noWa, setNoWa] = useState('');
  const [layanan, setLayanan] = useState(layananOptions[0]);
  const [pesan, setPesan] = useState('');

  const isFormValid = nama.trim() && noWa.trim() && pesan.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const teksPesan = `Halo nativecode.cloud, perkenalkan saya ${nama}.\n\nSaya tertarik dengan layanan *${layanan}*.\n\n${pesan}\n\nNo. WhatsApp saya: ${noWa}`;
    const waUrl = `https://wa.me/6282249244647?text=${encodeURIComponent(teksPesan)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Navigasi />
      <main className="min-h-screen bg-white pt-16">

        {/* HERO */}
        <section className="relative bg-white pt-16 pb-16 sm:pt-24 sm:pb-24 px-4 text-center overflow-hidden">
          <p className="text-sm sm:text-base text-gray-500 mb-2">www.nativecode.cloud</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
          <p className="text-base sm:text-lg text-gray-600 mb-2 px-2 max-w-lg mx-auto">
            Ceritakan kebutuhan Anda, tim kami akan segera menghubungi melalui{' '}
            <span className="text-[#3d8b5e] font-semibold">WhatsApp</span>
          </p>
          <SectionCurve fill="#f1f5f9" path="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" />
        </section>

        {/* FORM + INFO */}
        <section className="relative bg-[#f1f5f9] pt-12 pb-12 sm:pt-20 sm:pb-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">

              {/* Info kontak */}
              <div className="lg:col-span-2 space-y-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-7">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">nativecode.cloud</h2>
                  <p className="text-sm text-gray-500 mb-6">Jasa Pembuatan Website Profesional dan SEO Bergaransi</p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eaf3ee', color: '#3d8b5e' }}>
                        <IconPhone size={17} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">WhatsApp</p>
                        <p className="text-sm text-gray-500">0822-4924-4647</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#fdf1e7', color: '#c96a1a' }}>
                        <IconMail size={17} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Email</p>
                        <p className="text-sm text-gray-500">cs@nativecode.cloud</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eaf3ee', color: '#3d8b5e' }}>
                        <IconMapPin size={17} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Lokasi</p>
                        <p className="text-sm text-gray-500">Jakarta Utara, Indonesia</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-6 sm:p-7 text-white" style={{ background: '#3d8b5e' }}>
                  <p className="font-bold text-base sm:text-lg mb-2">Respon cepat, tanpa ribet</p>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Setelah Anda mengirim formulir ini, pesan akan otomatis tersusun dan siap dikirim ke WhatsApp kami. Tim akan merespons dalam waktu singkat pada jam operasional.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      required
                      placeholder="Nama Anda"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3d8b5e]/30 focus:border-[#3d8b5e] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomor WhatsApp</label>
                    <input
                      type="tel"
                      value={noWa}
                      onChange={(e) => setNoWa(e.target.value)}
                      required
                      placeholder="08xxxxxxxxxx"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3d8b5e]/30 focus:border-[#3d8b5e] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Layanan yang Diminati</label>
                    <select
                      value={layanan}
                      onChange={(e) => setLayanan(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3d8b5e]/30 focus:border-[#3d8b5e] transition-colors bg-white"
                    >
                      {layananOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ceritakan Kebutuhan Anda</label>
                    <textarea
                      value={pesan}
                      onChange={(e) => setPesan(e.target.value)}
                      required
                      rows={5}
                      placeholder="Contoh: Saya ingin membuat website company profile untuk bisnis kuliner, dengan 5 halaman dan fitur galeri produk."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3d8b5e]/30 focus:border-[#3d8b5e] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full flex items-center justify-center gap-2 text-white py-3 rounded-xl font-semibold text-sm sm:text-base transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: '#25D366' }}
                  >
                    <IconPhone size={18} />
                    Kirim ke WhatsApp
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    Anda akan diarahkan ke WhatsApp dengan pesan yang sudah terisi otomatis.
                  </p>
                </form>
              </div>

            </div>
          </div>
          <SectionCurve fill="#ffffff" path="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" />
        </section>

      </main>
      <Footer />
    </>
  );
}
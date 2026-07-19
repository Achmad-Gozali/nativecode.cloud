'use client';

import { useEffect, useState } from 'react';
import Navigasi from '@/komponen/Navigasi';
import Footer from '@/komponen/Footer';

interface TemplateItem {
  id: string;
  namaTemplate: string;
  kategori: string;
  gambarUrl: string;
  deskripsi: string;
  linkDemo: string;
  urutan: number;
}

function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.8a8.08 8.08 0 0 1 8.1 8.1c0 4.47-3.63 8.1-8.1 8.1a8.05 8.05 0 0 1-4.12-1.13l-.3-.17-3.12.82.83-3.04-.19-.31a8.03 8.03 0 0 1-1.24-4.31c0-4.47 3.64-8.1 8.14-8.1M8.5 6.8c-.17 0-.44.06-.67.31s-.88.86-.88 2.1.9 2.44 1.02 2.6c.13.18 1.79 2.86 4.42 3.9 2.18.86 2.62.7 3.1.65s1.53-.62 1.75-1.22.22-1.11.15-1.22-.24-.17-.5-.3-1.53-.76-1.77-.84c-.24-.09-.41-.13-.59.13s-.68.85-.84 1.02c-.15.18-.31.2-.57.07-.27-.13-1.12-.41-2.14-1.32-.79-.7-1.32-1.57-1.48-1.84-.15-.26-.02-.4.11-.53.12-.12.27-.31.4-.47.13-.15.17-.26.26-.44s.04-.33-.02-.46c-.06-.13-.59-1.45-.82-1.98-.2-.5-.42-.44-.59-.44z"/>
    </svg>
  );
}

const buildWaLink = (nama: string) => {
  const pesan = `Halo nativecode.cloud, saya tertarik dengan template ${nama} dan ingin konsultasi lebih lanjut. Mohon bantuannya 🙏`;
  return `https://wa.me/6282249244647?text=${encodeURIComponent(pesan)}`;
};

export default function TemplatePublikPage() {
  const [items, setItems] = useState<TemplateItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [kategoriAktif, setKategoriAktif] = useState<string>('Semua');

  useEffect(() => {
    fetch('/api/template/publik')
      .then(res => res.json())
      .then(data => setItems(data.data ?? []))
      .finally(() => setLoaded(true));
  }, []);

  const kategoriList = ['Semua', ...Array.from(new Set(items.map(i => i.kategori)))];
  const filtered = kategoriAktif === 'Semua' ? items : items.filter(i => i.kategori === kategoriAktif);

  return (
    <>
      <Navigasi />
      <main className="flex flex-col min-h-screen font-sans bg-white text-gray-900">
        <section className="relative bg-white pt-24 pb-12 sm:pt-32 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a2e22' }}>
              Koleksi <span style={{ color: '#3d8b5e' }}>Template Website</span> Siap Pakai
            </h1>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mb-5">
              Pilih desain yang paling merepresentasikan bisnis Anda. Setiap template telah dirancang secara profesional dan siap disesuaikan dengan kebutuhan Anda, dengan investasi yang jauh lebih terjangkau dibandingkan pembuatan desain custom dari nol.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{ background: '#fff3e8', color: '#c96a1a' }}>
              Lebih hemat waktu dan biaya dibanding desain full custom
            </div>
          </div>
        </section>

        <section className="bg-white pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {kategoriList.length > 1 && (
              <div className="flex flex-wrap gap-2 justify-center mb-10">
                {kategoriList.map(k => (
                  <button
                    key={k}
                    onClick={() => setKategoriAktif(k)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                      kategoriAktif === k
                        ? 'text-white border-transparent'
                        : 'text-gray-500 border-gray-200 hover:border-[#3d8b5e] hover:text-[#3d8b5e]'
                    }`}
                    style={kategoriAktif === k ? { background: '#3d8b5e' } : undefined}
                  >
                    {k}
                  </button>
                ))}
              </div>
            )}

            {!loaded ? (
              <div className="py-20 text-center text-gray-400 text-sm">Memuat koleksi template...</div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-gray-400 text-sm">Belum ada template untuk kategori ini.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(item => (
                  <div key={item.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                    <div className="relative w-full h-44 bg-gray-50">
                      <img src={item.gambarUrl} alt={item.namaTemplate} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: '#3d8b5e' }}>
                        {item.kategori}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="font-bold text-gray-900 text-base mb-1">{item.namaTemplate}</p>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{item.deskripsi}</p>
                      <div className="flex gap-2">
                        <a
                          href={item.linkDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border-2 text-sm font-semibold transition-colors"
                          style={{ borderColor: '#3d8b5e', color: '#3d8b5e' }}
                        >
                          Lihat Demo
                        </a>
                        <a
                          href={buildWaLink(item.namaTemplate)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-90"
                          style={{ background: '#25D366' }}
                        >
                          <IconWhatsApp />
                          Konsultasi
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA penutup */}
        <section className="bg-white pb-16 sm:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6" style={{ background: '#f1f5f9' }}>
              <div>
                <p className="font-bold text-gray-900 text-base sm:text-lg mb-1">Belum menemukan desain yang sesuai?</p>
                <p className="text-sm text-gray-500">Tim kami siap membantu Anda memilih template terbaik sesuai kebutuhan bisnis, atau membuatkan desain custom bila diperlukan.</p>
              </div>
              <a
                href="https://wa.me/6282249244647?text=Halo+nativecode.cloud%2C+saya+ingin+konsultasi+mengenai+pilihan+template+website+yang+sesuai+dengan+kebutuhan+saya.+Mohon+bantuannya+%F0%9F%99%8F"
                target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto text-center text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
                style={{ background: '#3d8b5e' }}
              >
                Konsultasi Gratis
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
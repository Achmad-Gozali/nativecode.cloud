import Navigasi from '@/komponen/Navigasi';
import Footer from '@/komponen/Footer';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Portofolio — nativecode.id',
  description: 'Kumpulan website yang telah kami bangun untuk berbagai klien.',
};

async function getPortofolio() {
  return prisma.portofolio.findMany({
    orderBy: [{ urutan: 'asc' }, { createdAt: 'desc' }],
  });
}

export default async function PortofolioPage() {
  const portofolioList = await getPortofolio();

  const whatsappLink = `https://wa.me/6282249244647?text=Halo%20nativecode.id%2C%20saya%20tertarik%20dengan%20layanan%20pembuatan%20website%20profesional%20dan%20SEO%20bergaransi.%20Mohon%20informasi%20lebih%20lanjut.`;

  return (
    <>
      <Navigasi />
      <main className="flex flex-col min-h-screen pt-14 sm:pt-16">

        {/* HERO */}
        <section className="relative bg-white pt-16 pb-16 sm:pt-24 sm:pb-24 px-4 text-center overflow-hidden">
          <h1 className="text-2xl sm:text-5xl font-bold text-gray-900 mb-3">Portofolio</h1>
          <p className="text-gray-500 mb-3 text-sm">www.nativecode.id</p>
          <p className="text-sm sm:text-lg text-gray-600 mb-8">
            Jasa Pembuatan <span className="text-[#c96a1a] font-semibold">Website Profesional</span> dan{' '}
            <span className="text-[#3d8b5e] font-semibold">SEO Bergaransi</span>
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md text-sm sm:text-base"
            style={{ background: '#c96a1a' }}
          >
            Konsultasi
          </a>
        </section>

        {/* PORTOFOLIO GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          {portofolioList.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl font-semibold text-gray-400 mb-2">Segera Hadir</p>
              <p className="text-sm text-gray-400">Portofolio kami sedang dalam proses pembaruan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {portofolioList.map((item) => (
                <a
                  key={item.id}
                  href={item.linkWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 block"
                >
                  <div className="relative overflow-hidden bg-gray-100" style={{ height: '190px' }}>
                    <img
                      src={item.gambarUrl}
                      alt={item.namaProyek}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="px-4 py-3">
                    <p className="font-bold text-gray-900 text-sm truncate">{item.namaProyek}</p>
                    {item.deskripsi && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.deskripsi}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

      </main>
      <Footer />
    </>
  );
}
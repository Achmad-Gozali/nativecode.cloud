import Link from 'next/link';
import Navigasi from '@/komponen/Navigasi';
import Footer from '@/komponen/Footer';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Artikel — nativecode.cloud',
  description: 'Tips seputar website, SEO, dan pengembangan aplikasi dari nativecode.cloud.',
};

function formatDateID(d: Date | string) {
  try {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return String(d);
  }
}

function readingTime(content: string) {
  const words = content.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} menit baca`;
}

async function getArtikelPublished() {
  return prisma.artikel.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
  });
}

export default async function ArtikelPage() {
  const artikelList = await getArtikelPublished();

  return (
    <>
      <Navigasi />
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Artikel</h1>
            <p className="text-gray-500 text-sm">Tips seputar website, SEO, dan pengembangan aplikasi.</p>
          </div>

          {artikelList.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-sm">Belum ada artikel.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artikelList.map((a) => (
                <Link
                  key={a.id}
                  href={`/artikel/${a.slug}`}
                  className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  {a.gambarUrl ? (
                    <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={a.gambarUrl}
                        alt={a.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                  <div className="flex flex-col flex-1 p-4">
                    <h2 className="text-base font-bold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-[#3d8b5e] transition-colors">
                      {a.judul}
                    </h2>
                    {a.ringkasan && (
                      <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4 flex-1">{a.ringkasan}</p>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-auto pt-2">
                      <span>{formatDateID(a.publishedAt ?? a.createdAt)}</span>
                      <span>·</span>
                      <span>{readingTime(a.konten)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
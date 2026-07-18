import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navigasi from '@/komponen/Navigasi';
import Footer from '@/komponen/Footer';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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

async function getArtikel(slug: string) {
  return prisma.artikel.findUnique({ where: { slug, status: 'PUBLISHED' } });
}

async function getArtikelLain(excludeSlug: string) {
  return prisma.artikel.findMany({
    where: { status: 'PUBLISHED', slug: { not: excludeSlug } },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artikel = await getArtikel(slug);
  if (!artikel) return { title: 'Artikel tidak ditemukan' };

  return {
    title: `${artikel.judul} — nativecode.cloud`,
    description: artikel.ringkasan || undefined,
    openGraph: { images: artikel.gambarUrl ? [artikel.gambarUrl] : [] },
  };
}

export default async function ArtikelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = await getArtikel(slug);
  if (!artikel) notFound();

  const artikelLain = await getArtikelLain(slug);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: artikel.judul,
    description: artikel.ringkasan || undefined,
    image: artikel.gambarUrl ? [artikel.gambarUrl] : undefined,
    datePublished: artikel.publishedAt ?? undefined,
    dateModified: artikel.updatedAt,
    publisher: {
      '@type': 'Organization',
      name: 'nativecode.cloud',
    },
  };

  return (
    <>
      <Navigasi />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <article>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-4">{artikel.judul}</h1>

            <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
              <span>{formatDateID(artikel.publishedAt ?? artikel.createdAt)}</span>
              <span>·</span>
              <span>{readingTime(artikel.konten)}</span>
            </div>

            {artikel.gambarUrl && (
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-gray-100">
                <img src={artikel.gambarUrl} alt={artikel.judul} className="w-full h-full object-cover" />
              </div>
            )}

            {artikel.ringkasan && (
              <p className="text-base text-gray-600 leading-relaxed mb-8">{artikel.ringkasan}</p>
            )}

            <div
              className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#3d8b5e] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: artikel.konten }}
            />
          </article>

          {artikelLain.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Artikel Lainnya</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {artikelLain.map((a) => (
                  <Link
                    key={a.id}
                    href={`/artikel/${a.slug}`}
                    className="group flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    {a.gambarUrl ? (
                      <div className="relative w-full h-32 bg-gray-100 overflow-hidden">
                        <img
                          src={a.gambarUrl}
                          alt={a.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                        <span className="text-2xl">📝</span>
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-[#3d8b5e] transition-colors">
                        {a.judul}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
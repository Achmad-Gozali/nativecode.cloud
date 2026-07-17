import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifikasiTokenSesi } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { buatSlugUnik } from '@/lib/slug';

async function cekSesiAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sesi_admin')?.value;
  return token ? await verifikasiTokenSesi(token) : null;
}

export async function GET() {
  const sesi = await cekSesiAdmin();
  if (!sesi) {
    return NextResponse.json({ error: 'Tidak diizinkan' }, { status: 401 });
  }

  const artikel = await prisma.artikel.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      judul: true,
      slug: true,
      ringkasan: true,
      gambarUrl: true,
      status: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ data: artikel });
}

export async function POST(request: NextRequest) {
  const sesi = await cekSesiAdmin();
  if (!sesi) {
    return NextResponse.json({ error: 'Tidak diizinkan' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { judul, ringkasan, konten, gambarUrl, status } = body;

    if (!judul || !judul.trim()) {
      return NextResponse.json({ error: 'Judul wajib diisi' }, { status: 400 });
    }

    const slug = await buatSlugUnik(judul, async (slugCoba) => {
      const ada = await prisma.artikel.findUnique({ where: { slug: slugCoba } });
      return !!ada;
    });

    const statusArtikel = status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';

    const artikelBaru = await prisma.artikel.create({
      data: {
        judul: judul.trim(),
        slug,
        ringkasan: ringkasan?.trim() || '',
        konten: konten || '',
        gambarUrl: gambarUrl || null,
        status: statusArtikel,
        publishedAt: statusArtikel === 'PUBLISHED' ? new Date() : null,
      },
    });

    return NextResponse.json({ data: artikelBaru }, { status: 201 });
  } catch (error) {
    console.error('Error membuat artikel:', error);
    return NextResponse.json({ error: 'Gagal membuat artikel' }, { status: 500 });
  }
}
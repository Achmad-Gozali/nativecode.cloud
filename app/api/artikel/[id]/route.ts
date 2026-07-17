import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifikasiTokenSesi } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { hapusDariR2 } from '@/lib/r2';

async function cekSesiAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sesi_admin')?.value;
  return token ? await verifikasiTokenSesi(token) : null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sesi = await cekSesiAdmin();
  if (!sesi) {
    return NextResponse.json({ error: 'Tidak diizinkan' }, { status: 401 });
  }

  const { id } = await params;
  const artikel = await prisma.artikel.findUnique({ where: { id } });

  if (!artikel) {
    return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
  }

  return NextResponse.json({ data: artikel });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sesi = await cekSesiAdmin();
  if (!sesi) {
    return NextResponse.json({ error: 'Tidak diizinkan' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { judul, ringkasan, konten, gambarUrl, status } = body;

    const artikelLama = await prisma.artikel.findUnique({ where: { id } });
    if (!artikelLama) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
    }

    const statusArtikel = status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';
    const baruDipublish = statusArtikel === 'PUBLISHED' && artikelLama.status !== 'PUBLISHED';

    const artikelUpdate = await prisma.artikel.update({
      where: { id },
      data: {
        ...(judul && { judul: judul.trim() }),
        ...(ringkasan !== undefined && { ringkasan: ringkasan.trim() }),
        ...(konten !== undefined && { konten }),
        ...(gambarUrl !== undefined && { gambarUrl: gambarUrl || null }),
        status: statusArtikel,
        ...(baruDipublish && { publishedAt: new Date() }),
      },
    });

    return NextResponse.json({ data: artikelUpdate });
  } catch (error) {
    console.error('Error memperbarui artikel:', error);
    return NextResponse.json({ error: 'Gagal memperbarui artikel' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sesi = await cekSesiAdmin();
  if (!sesi) {
    return NextResponse.json({ error: 'Tidak diizinkan' }, { status: 401 });
  }

  const { id } = await params;

  const artikel = await prisma.artikel.findUnique({ where: { id } });
  if (!artikel) {
    return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
  }

  if (artikel.gambarUrl) {
    try {
      await hapusDariR2(artikel.gambarUrl);
    } catch (error) {
      console.error('Gagal menghapus gambar dari R2:', error);
    }
  }

  await prisma.artikel.delete({ where: { id } });

  return NextResponse.json({ message: 'Artikel berhasil dihapus' });
}
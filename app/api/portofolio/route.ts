import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifikasiTokenSesi } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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

  const portofolio = await prisma.portofolio.findMany({
    orderBy: [{ urutan: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json({ data: portofolio });
}

export async function POST(request: NextRequest) {
  const sesi = await cekSesiAdmin();
  if (!sesi) {
    return NextResponse.json({ error: 'Tidak diizinkan' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { namaProyek, gambarUrl, deskripsi, linkWebsite } = body;

    if (!namaProyek?.trim()) {
      return NextResponse.json({ error: 'Nama proyek wajib diisi' }, { status: 400 });
    }
    if (!gambarUrl) {
      return NextResponse.json({ error: 'Gambar wajib diunggah' }, { status: 400 });
    }
    if (!linkWebsite?.trim()) {
      return NextResponse.json({ error: 'Link website wajib diisi' }, { status: 400 });
    }

    const item = await prisma.portofolio.create({
      data: {
        namaProyek: namaProyek.trim(),
        gambarUrl,
        deskripsi: deskripsi?.trim() || '',
        linkWebsite: linkWebsite.trim(),
      },
    });

    return NextResponse.json({ data: item }, { status: 201 });
  } catch (error) {
    console.error('Error membuat portofolio:', error);
    return NextResponse.json({ error: 'Gagal membuat portofolio' }, { status: 500 });
  }
}
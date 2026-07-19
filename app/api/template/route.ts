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

  const template = await prisma.template.findMany({
    orderBy: [{ urutan: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json({ data: template });
}

export async function POST(request: NextRequest) {
  const sesi = await cekSesiAdmin();
  if (!sesi) {
    return NextResponse.json({ error: 'Tidak diizinkan' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { namaTemplate, kategori, gambarUrl, deskripsi, linkDemo } = body;

    if (!namaTemplate?.trim()) {
      return NextResponse.json({ error: 'Nama template wajib diisi' }, { status: 400 });
    }
    if (!kategori?.trim()) {
      return NextResponse.json({ error: 'Kategori wajib diisi' }, { status: 400 });
    }
    if (!gambarUrl) {
      return NextResponse.json({ error: 'Gambar wajib diunggah' }, { status: 400 });
    }
    if (!linkDemo?.trim()) {
      return NextResponse.json({ error: 'Link demo wajib diisi' }, { status: 400 });
    }

    const item = await prisma.template.create({
      data: {
        namaTemplate: namaTemplate.trim(),
        kategori: kategori.trim(),
        gambarUrl,
        deskripsi: deskripsi?.trim() || '',
        linkDemo: linkDemo.trim(),
      },
    });

    return NextResponse.json({ data: item }, { status: 201 });
  } catch (error) {
    console.error('Error membuat template:', error);
    return NextResponse.json({ error: 'Gagal membuat template' }, { status: 500 });
  }
}
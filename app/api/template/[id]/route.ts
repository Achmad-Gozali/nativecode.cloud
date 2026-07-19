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
  const item = await prisma.template.findUnique({ where: { id } });

  if (!item) {
    return NextResponse.json({ error: 'Template tidak ditemukan' }, { status: 404 });
  }

  return NextResponse.json({ data: item });
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
    const { namaTemplate, kategori, gambarUrl, deskripsi, linkDemo, urutan } = body;

    const itemLama = await prisma.template.findUnique({ where: { id } });
    if (!itemLama) {
      return NextResponse.json({ error: 'Template tidak ditemukan' }, { status: 404 });
    }

    const itemUpdate = await prisma.template.update({
      where: { id },
      data: {
        ...(namaTemplate && { namaTemplate: namaTemplate.trim() }),
        ...(kategori && { kategori: kategori.trim() }),
        ...(gambarUrl && { gambarUrl }),
        ...(deskripsi !== undefined && { deskripsi: deskripsi.trim() }),
        ...(linkDemo && { linkDemo: linkDemo.trim() }),
        ...(urutan !== undefined && { urutan }),
      },
    });

    return NextResponse.json({ data: itemUpdate });
  } catch (error) {
    console.error('Error memperbarui template:', error);
    return NextResponse.json({ error: 'Gagal memperbarui template' }, { status: 500 });
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

  const item = await prisma.template.findUnique({ where: { id } });
  if (!item) {
    return NextResponse.json({ error: 'Template tidak ditemukan' }, { status: 404 });
  }

  if (item.gambarUrl) {
    try {
      await hapusDariR2(item.gambarUrl);
    } catch (error) {
      console.error('Gagal menghapus gambar dari R2:', error);
    }
  }

  await prisma.template.delete({ where: { id } });

  return NextResponse.json({ message: 'Template berhasil dihapus' });
}
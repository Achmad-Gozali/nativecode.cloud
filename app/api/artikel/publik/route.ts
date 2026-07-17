import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const artikel = await prisma.artikel.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      judul: true,
      slug: true,
      ringkasan: true,
      gambarUrl: true,
      penulis: true,
      publishedAt: true,
    },
  });

  return NextResponse.json({ data: artikel });
}
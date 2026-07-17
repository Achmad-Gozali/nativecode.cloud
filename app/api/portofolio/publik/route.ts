import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const portofolio = await prisma.portofolio.findMany({
    orderBy: [{ urutan: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json({ data: portofolio });
}
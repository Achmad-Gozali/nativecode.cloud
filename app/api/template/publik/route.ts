import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const template = await prisma.template.findMany({
    orderBy: [{ urutan: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json({ data: template });
}
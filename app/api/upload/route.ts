import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifikasiTokenSesi } from '@/lib/auth';
import { uploadKeR2 } from '@/lib/r2';

const TIPE_DIIZINKAN = ['image/jpeg', 'image/png', 'image/webp'];
const UKURAN_MAKS = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('sesi_admin')?.value;
  const sesi = token ? await verifikasiTokenSesi(token) : null;

  if (!sesi) {
    return NextResponse.json({ error: 'Tidak diizinkan' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'artikel';

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 });
    }

    if (!TIPE_DIIZINKAN.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipe file tidak didukung. Gunakan JPEG, PNG, atau WebP' },
        { status: 400 }
      );
    }

    if (file.size > UKURAN_MAKS) {
      return NextResponse.json(
        { error: 'Ukuran file maksimal 5MB' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadKeR2(buffer, file.name, file.type, folder);

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error upload file:', error);
    return NextResponse.json(
      { error: 'Gagal mengunggah file' },
      { status: 500 }
    );
  }
}
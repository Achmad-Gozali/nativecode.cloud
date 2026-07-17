import { NextRequest, NextResponse } from 'next/server';
import { verifikasiTokenSesi } from '@/lib/auth';

// Catatan: proxy ini hanya lapisan redirect cepat untuk UX.
// Pengecekan sesi yang sesungguhnya (sumber kebenaran) tetap dilakukan
// di app/admin/layout.tsx lewat Server Component, sesuai rekomendasi
// Next.js 16 agar autentikasi tidak hanya bergantung pada proxy layer.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('sesi_admin')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const sesi = await verifikasiTokenSesi(token);

    if (!sesi) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.set('sesi_admin', '', { maxAge: 0, path: '/' });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
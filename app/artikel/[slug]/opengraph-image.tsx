import { ImageResponse } from 'next/og';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const alt = 'nativecode.cloud Artikel';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const artikel = await prisma.artikel.findUnique({
    where: { slug: params.slug },
    select: { judul: true, kategori: true },
  });

  const judul = artikel?.judul ?? 'nativecode.cloud';
  const kategori = artikel?.kategori ?? 'Artikel';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#1a2e22',
          padding: '72px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '12px',
            background: 'linear-gradient(90deg, #3d8b5e 0%, #c96a1a 100%)',
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ fontSize: '34px', fontWeight: 700, color: '#ffffff' }}>native</span>
          <span style={{ fontSize: '34px', fontWeight: 700, color: '#3d8b5e' }}>code</span>
          <span style={{ fontSize: '34px', fontWeight: 700, color: '#c96a1a' }}>.cloud</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '20px',
              color: '#3d8b5e',
              border: '2px solid #3d8b5e',
              borderRadius: '999px',
              padding: '6px 22px',
              width: 'fit-content',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {kategori}
          </div>
          <div
            style={{
              fontSize: judul.length > 60 ? '46px' : '58px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.25,
              display: 'flex',
              maxWidth: '1000px',
            }}
          >
            {judul}
          </div>
        </div>

        <div style={{ fontSize: '22px', color: '#9ca3af', display: 'flex' }}>
          nativecode.cloud/artikel
        </div>
      </div>
    ),
    { ...size }
  );
}
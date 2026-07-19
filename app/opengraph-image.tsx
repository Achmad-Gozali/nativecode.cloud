import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'nativecode.cloud - Jasa Pembuatan Website Profesional dan SEO Bergaransi';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a2e22',
          padding: '80px',
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
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '28px' }}>
          <span style={{ fontSize: '64px', fontWeight: 700, color: '#ffffff' }}>native</span>
          <span style={{ fontSize: '64px', fontWeight: 700, color: '#3d8b5e' }}>code</span>
          <span style={{ fontSize: '64px', fontWeight: 700, color: '#c96a1a' }}>.cloud</span>
        </div>
        <div
          style={{
            fontSize: '30px',
            color: '#d1d5db',
            textAlign: 'center',
            maxWidth: '820px',
            lineHeight: 1.5,
            display: 'flex',
          }}
        >
          Jasa Pembuatan Website Profesional dan SEO Bergaransi
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
          {['Website Design', 'SEO Optimization', 'Mobile Apps'].map((t) => (
            <div
              key={t}
              style={{
                display: 'flex',
                fontSize: '18px',
                color: '#3d8b5e',
                border: '2px solid #3d8b5e',
                borderRadius: '999px',
                padding: '8px 24px',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
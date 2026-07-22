import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
// @ts-ignore
import './globals.css';
import FloatingButtons from '../komponen/FloatingButtons';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'nativecode - Jasa Website Profesional Jakarta Utara',
  description: 'Solusi digital lengkap untuk wujudkan bisnismu lebih cepat.',
  verification: {
    google: '0Dnp4kNVr6B5se14JaK1H36HyMeG5M28vP0H15Gy8HE',
  },
  icons: {
    icon: [
      { url: '/favicon-16.webp', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.webp', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-64.webp', sizes: '64x64', type: 'image/png' },
      { url: '/icon-192.webp', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.webp',
  },
  metadataBase: new URL('https://nativecode.cloud'),
  openGraph: {
    title: 'nativecode - Jasa Website Profesional Jakarta Utara',
    description: 'Solusi digital lengkap untuk wujudkan bisnismu lebih cepat.',
    url: 'https://nativecode.cloud',
    siteName: 'nativecode.cloud',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nativecode - Jasa Website Profesional Jakarta Utara',
    description: 'Solusi digital lengkap untuk wujudkan bisnismu lebih cepat.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} font-sans antialiased text-gray-900 bg-[#FAFAFA] flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        {children}
        <FloatingButtons />
        <GoogleAnalytics gaId="G-3PKLNMQHPH" />
      </body>
    </html>
  );
}
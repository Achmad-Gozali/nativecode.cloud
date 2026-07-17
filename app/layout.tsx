import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
// @ts-ignore
import './globals.css';
import ScrollToTop from '../komponen/ScrollToTop';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'nativecode - Jasa Website Profesional Jakarta Utara',
  description: 'Solusi digital lengkap untuk wujudkan bisnismu lebih cepat.',
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '64x64', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/icon.png',
  },
  metadataBase: new URL('https://nativecode.vercel.app'),
  openGraph: {
    title: 'nativecode - Jasa Website Profesional Jakarta Utara',
    description: 'Solusi digital lengkap untuk wujudkan bisnismu lebih cepat.',
    url: 'https://nativecode.vercel.app',
    siteName: 'nativecode.id',
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

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/6282249244647?text=Halo+nativecode.id%2C+saya+ingin+konsultasi+mengenai+layanan+nativecode"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center justify-center cursor-pointer"
          aria-label="Chat WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
          </svg>
        </a>

        <ScrollToTop />
      </body>
    </html>
  );
}
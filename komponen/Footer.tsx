'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex-shrink-0 flex items-center mb-4">
              <span className="font-bold text-3xl text-white">nativecode<span className="text-[#D17B36]">.id</span></span>
            </div>
            <p className="text-gray-400 text-sm pr-4 leading-relaxed">
              Solusi jasa pembuatan website profesional di Indonesia. Kami menghadirkan website dengan desain menarik, mudah diakses, dan responsif.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Layanan</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/layanan/pembuatan-website" className="hover:text-white transition-colors">Jasa Pembuatan Website</Link></li>
              <li><Link href="/layanan/pembuatan-aplikasi" className="hover:text-white transition-colors">Pembuatan Aplikasi</Link></li>
              <li><Link href="/layanan/seo" className="hover:text-white transition-colors">SEO Bergaransi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Kontak</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>082249244647</li>
              <li>cs@nativecode.id</li>
              <li>Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} nativecode. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
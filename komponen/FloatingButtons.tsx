'use client';
import { usePathname } from 'next/navigation';

export default function FloatingButtons() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6282249244647?text=Halo+nativecode.cloud%2C+saya+ingin+konsultasi+mengenai+layanan+nativecode"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 inline-flex items-center gap-2 bg-green-500 text-white pl-4 pr-5 py-3.5 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 cursor-pointer"
        aria-label="Chat via WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
        </svg>
        <span className="text-sm font-semibold whitespace-nowrap">Chat via WhatsApp</span>
      </a>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-[#D17B36] text-white p-3 rounded-full shadow-lg hover:bg-[#c26f2f] transition-colors z-50 flex items-center justify-center cursor-pointer"
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>
    </>
  );
}
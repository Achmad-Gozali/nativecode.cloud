import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifikasiTokenSesi } from '@/lib/auth';
import AdminSidebar from '@/komponen/AdminSidebar';

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('sesi_admin')?.value;

  const sesi = token ? await verifikasiTokenSesi(token) : null;

  if (!sesi) {
    redirect('/admin/login');
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f1f5f9]">
      <AdminSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
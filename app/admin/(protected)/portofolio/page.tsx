'use client';

import { useState, useEffect, useCallback } from 'react';

interface Portofolio {
  id: string;
  namaProyek: string;
  gambarUrl: string;
  deskripsi: string;
  linkWebsite: string;
  createdAt: string;
}

const emptyForm = { namaProyek: '', gambarUrl: '', deskripsi: '', linkWebsite: '' };

export default function AdminPortofolio() {
  const [list, setList] = useState<Portofolio[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchPortofolio = useCallback(async () => {
    try {
      const res = await fetch('/api/portofolio');
      const data = await res.json();
      setList(data.data ?? []);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchPortofolio();
  }, [fetchPortofolio]);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setView('editor');
  };

  const openEdit = (item: Portofolio) => {
    setEditingId(item.id);
    setForm({
      namaProyek: item.namaProyek,
      gambarUrl: item.gambarUrl,
      deskripsi: item.deskripsi,
      linkWebsite: item.linkWebsite,
    });
    setView('editor');
  };

  const handleGambarUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('folder', 'portofolio');
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        setForm((f) => ({ ...f, gambarUrl: data.url }));
      } else {
        alert(data.error || 'Gagal mengunggah gambar');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.namaProyek.trim() || !form.gambarUrl || !form.linkWebsite.trim()) {
      alert('Nama proyek, gambar, dan link website wajib diisi');
      return;
    }
    setLoading(true);
    try {
      const url = editingId ? `/api/portofolio/${editingId}` : '/api/portofolio';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        await fetchPortofolio();
        setView('list');
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menyimpan portofolio');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus item portofolio ini?')) return;
    const res = await fetch(`/api/portofolio/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  if (view === 'editor') {
    return (
      <div className="py-8 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-bold text-gray-900">{editingId ? 'Edit Portofolio' : 'Portofolio Baru'}</p>
            <div className="flex gap-2">
              <button onClick={() => setView('list')} className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm font-semibold rounded-xl transition-colors">
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 text-white text-sm font-semibold rounded-xl transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: '#3d8b5e' }}
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1.5">Nama Proyek</label>
              <input
                value={form.namaProyek}
                onChange={(e) => setForm((f) => ({ ...f, namaProyek: e.target.value }))}
                placeholder="Contoh: Toko Online Batik Nusantara"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#3d8b5e] focus:ring-2 focus:ring-[#3d8b5e]/10"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1.5">Gambar</label>
              {form.gambarUrl ? (
                <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  <img src={form.gambarUrl} alt="preview" className="w-full h-40 object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, gambarUrl: '' }))}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-500 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <label className={`flex items-center justify-center gap-2 px-3.5 py-6 border border-dashed border-gray-300 rounded-xl text-sm cursor-pointer ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
                  <span className="text-gray-400">{uploading ? 'Mengunggah...' : 'Pilih gambar screenshot website...'}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleGambarUpload(f); }}
                  />
                </label>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1.5">Deskripsi Singkat</label>
              <textarea
                value={form.deskripsi}
                onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))}
                placeholder="Deskripsi singkat proyek ini..."
                rows={3}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#3d8b5e] focus:ring-2 focus:ring-[#3d8b5e]/10 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1.5">Link Website</label>
              <input
                value={form.linkWebsite}
                onChange={(e) => setForm((f) => ({ ...f, linkWebsite: e.target.value }))}
                placeholder="https://contohwebsite.com"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#3d8b5e] focus:ring-2 focus:ring-[#3d8b5e]/10"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Kelola Portofolio</h1>
            <p className="text-sm text-gray-500 mt-0.5">{list.length} proyek</p>
          </div>
          <button onClick={openNew} className="px-4 py-2.5 text-white text-sm font-semibold rounded-xl transition-opacity hover:opacity-90" style={{ background: '#3d8b5e' }}>
            + Portofolio Baru
          </button>
        </div>

        {!loaded ? (
          <div className="py-16 text-center text-sm text-gray-400">Memuat...</div>
        ) : list.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl py-16 text-center">
            <p className="text-sm text-gray-400 mb-3">Belum ada portofolio.</p>
            <button onClick={openNew} className="text-sm font-semibold text-[#3d8b5e] hover:opacity-80 transition-opacity">
              Tambah portofolio pertama →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <img src={item.gambarUrl} alt={item.namaProyek} className="w-full h-36 object-cover bg-gray-100" />
                <div className="p-4">
                  <p className="font-semibold text-gray-900 text-sm line-clamp-1">{item.namaProyek}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.deskripsi}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <button onClick={() => openEdit(item)} className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors">
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
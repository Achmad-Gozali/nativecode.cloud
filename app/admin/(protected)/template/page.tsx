'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  Plus, Pencil, Trash2, ExternalLink, Upload, X,
  Search, ImageIcon,
} from 'lucide-react';

interface TemplateItem {
  id: string;
  namaTemplate: string;
  kategori: string;
  gambarUrl: string;
  deskripsi: string;
  linkDemo: string;
  urutan: number;
  createdAt: string;
}

const inputCls = "w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 outline-none transition-all";

const emptyForm = { namaTemplate: '', kategori: '', gambarUrl: '', deskripsi: '', linkDemo: '', urutan: 0 };

export default function TemplatePage() {
  const [items, setItems] = useState<TemplateItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editing, setEditing] = useState<TemplateItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [form, setForm] = useState(emptyForm);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/template');
      const data = await res.json();
      setItems(data.data ?? []);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const filtered = items.filter(i =>
    i.namaTemplate.toLowerCase().includes(search.toLowerCase()) ||
    i.kategori.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => { setEditing(null); setForm(emptyForm); setImagePreview(null); setView('editor'); };

  const openEdit = (item: TemplateItem) => {
    setEditing(item);
    setForm({
      namaTemplate: item.namaTemplate,
      kategori: item.kategori,
      gambarUrl: item.gambarUrl,
      deskripsi: item.deskripsi,
      linkDemo: item.linkDemo,
      urutan: item.urutan,
    });
    setImagePreview(item.gambarUrl);
    setView('editor');
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('folder', 'template');
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      const url = data.url ?? data.data?.url;
      if (url) { setForm(f => ({ ...f, gambarUrl: url })); setImagePreview(url); }
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.namaTemplate.trim() || !form.kategori.trim() || !form.gambarUrl || !form.linkDemo.trim()) return;
    setLoading(true);
    try {
      const url = editing ? `/api/template/${editing.id}` : '/api/template';
      const res = await fetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { await fetchItems(); setView('list'); }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus template ini?')) return;
    setDeleting(id);
    try {
      await fetch(`/api/template/${id}`, { method: 'DELETE' });
      setItems(prev => prev.filter(i => i.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  const isFormValid = form.namaTemplate.trim() && form.kategori.trim() && form.gambarUrl && form.linkDemo.trim();

  if (view === 'editor') {
    return (
      <div className="p-3 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm font-bold text-slate-800">{editing ? 'Edit Template' : 'Template Baru'}</p>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setView('list')} className="px-3 sm:px-4 py-2 text-slate-500 hover:text-slate-700 text-sm font-semibold rounded-xl transition-all">Batal</button>
            <button onClick={handleSave} disabled={loading || !isFormValid} className="px-3 sm:px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-40">
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Nama Template</label>
            <input value={form.namaTemplate} onChange={e => setForm(f => ({ ...f, namaTemplate: e.target.value }))} placeholder="Contoh: Toko Batik Nusantara" className={inputCls} />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Kategori</label>
            <input value={form.kategori} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))} placeholder="Contoh: Toko Online, Company Profile, Website Sekolah" className={inputCls} />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Gambar Preview Template</label>
            {imagePreview ? (
              <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <img src={imagePreview} alt="preview" className="w-full h-40 sm:h-48 object-cover" />
                <button type="button" onClick={() => { setImagePreview(null); setForm(f => ({ ...f, gambarUrl: '' })); }}
                  className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-white/90 rounded-full text-slate-500 hover:text-red-500 transition-colors shadow-sm">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label className={`flex flex-col items-center justify-center gap-2 w-full h-32 sm:h-40 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/30 transition-all ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
                {uploading ? (
                  <span className="text-sm text-slate-400">Mengupload...</span>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-slate-300" />
                    <span className="text-sm text-slate-400">Pilih gambar preview template...</span>
                  </>
                )}
                <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }} />
              </label>
            )}
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Deskripsi Singkat</label>
            <textarea value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} placeholder="Deskripsi singkat template ini..." rows={3} className={`${inputCls} resize-none`} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Link Demo</label>
              <input value={form.linkDemo} onChange={e => setForm(f => ({ ...f, linkDemo: e.target.value }))} placeholder="https://demo-template.com" className={inputCls} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Urutan Tampil</label>
              <input type="number" value={form.urutan} onChange={e => setForm(f => ({ ...f, urutan: parseInt(e.target.value) || 0 }))} placeholder="0" className={inputCls} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Manajemen Template</h1>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{items.length} template</span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">Kelola daftar template yang ditampilkan di halaman Template</p>
        </div>
        <button onClick={openNew} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all shrink-0">
          <Plus className="w-4 h-4" /> Template Baru
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama template atau kategori..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 transition-colors" />
      </div>

      {!loaded ? (
        <div className="py-16 text-center text-sm text-slate-400 bg-white border border-slate-200 rounded-2xl">Memuat...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-white border border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-400 mb-3">{items.length === 0 ? 'Belum ada template.' : 'Tidak ada template ditemukan.'}</p>
          {items.length === 0 && (
            <button onClick={openNew} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">Tambah template pertama →</button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="relative w-full h-40 bg-slate-50">
                {item.gambarUrl ? (
                  <img src={item.gambarUrl} alt={item.namaTemplate} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-6 h-6 text-slate-300" /></div>
                )}
                <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded-full bg-white/90 text-emerald-700 shadow-sm">{item.kategori}</span>
                <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-1 rounded-full bg-white/90 text-slate-500 shadow-sm">Urutan {item.urutan}</span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-sm font-semibold text-slate-900 line-clamp-1">{item.namaTemplate}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 flex-1">{item.deskripsi || 'Tidak ada deskripsi.'}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <a href={item.linkDemo} target="_blank" rel="noopener noreferrer" title="Lihat demo"
                    className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-emerald-600 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> Demo
                  </a>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(item)} title="Edit" className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id} title="Hapus" className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-40"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
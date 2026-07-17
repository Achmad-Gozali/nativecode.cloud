'use client';

import { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

interface Artikel {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  konten: string;
  gambarUrl: string | null;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
}

const emptyForm = { judul: '', ringkasan: '', konten: '', gambarUrl: '', status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' };

function fmtDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return d;
  }
}

function ToolbarButton({ onClick, active, children, title }: { onClick: () => void; active?: boolean; children: React.ReactNode; title?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-[#3d8b5e] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      {children}
    </button>
  );
}

function TiptapEditor({ content, onChange }: { content: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: 'Tulis konten artikel di sini...' })],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex flex-wrap gap-0.5 px-3 py-2 bg-gray-50 border-b border-gray-200">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">B</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><em>I</em></ToolbarButton>
        <div className="w-px bg-gray-200 mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">H2</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">H3</ToolbarButton>
        <div className="w-px bg-gray-200 mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">•</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">1.</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">&quot;</ToolbarButton>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none px-4 py-3 min-h-[280px] text-gray-800 focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400 [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
      />
    </div>
  );
}

export default function AdminArtikel() {
  const [artikelList, setArtikelList] = useState<Artikel[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchArtikel = useCallback(async () => {
    try {
      const res = await fetch('/api/artikel');
      const data = await res.json();
      setArtikelList(data.data ?? []);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchArtikel();
  }, [fetchArtikel]);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setThumbnailPreview(null);
    setView('editor');
  };

  const openEdit = async (id: string) => {
    const res = await fetch(`/api/artikel/${id}`);
    const data = await res.json();
    const a: Artikel = data.data;
    setEditingId(a.id);
    setForm({ judul: a.judul, ringkasan: a.ringkasan, konten: a.konten, gambarUrl: a.gambarUrl ?? '', status: a.status });
    setThumbnailPreview(a.gambarUrl);
    setView('editor');
  };

  const handleThumbnailUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('folder', 'artikel');
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        setForm((f) => ({ ...f, gambarUrl: data.url }));
        setThumbnailPreview(data.url);
      } else {
        alert(data.error || 'Gagal mengunggah gambar');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (statusSimpan: 'DRAFT' | 'PUBLISHED') => {
    if (!form.judul.trim()) return;
    setLoading(true);
    try {
      const url = editingId ? `/api/artikel/${editingId}` : '/api/artikel';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, status: statusSimpan }),
      });
      if (res.ok) {
        await fetchArtikel();
        setView('list');
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menyimpan artikel');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus artikel ini?')) return;
    const res = await fetch(`/api/artikel/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setArtikelList((prev) => prev.filter((a) => a.id !== id));
    }
  };

  if (view === 'editor') {
    return (
      <div className="py-8 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-bold text-gray-900">{editingId ? 'Edit Artikel' : 'Artikel Baru'}</p>
            <div className="flex gap-2">
              <button onClick={() => setView('list')} className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm font-semibold rounded-xl transition-colors">
                Batal
              </button>
              <button
                onClick={() => handleSave('DRAFT')}
                disabled={loading || !form.judul.trim()}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors disabled:opacity-40"
              >
                Simpan Draft
              </button>
              <button
                onClick={() => handleSave('PUBLISHED')}
                disabled={loading || !form.judul.trim()}
                className="px-4 py-2 text-white text-sm font-semibold rounded-xl transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: '#3d8b5e' }}
              >
                {loading ? 'Menyimpan...' : 'Publish'}
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1.5">Judul</label>
              <input
                value={form.judul}
                onChange={(e) => setForm((f) => ({ ...f, judul: e.target.value }))}
                placeholder="Judul artikel..."
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#3d8b5e] focus:ring-2 focus:ring-[#3d8b5e]/10"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1.5">Thumbnail</label>
              {thumbnailPreview ? (
                <div className="relative w-full h-10 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center px-3 gap-3">
                  <img src={thumbnailPreview} alt="preview" className="h-7 w-12 object-cover rounded-lg shrink-0" />
                  <span className="text-xs text-gray-500 truncate flex-1">Thumbnail terpilih</span>
                  <button
                    type="button"
                    onClick={() => { setThumbnailPreview(null); setForm((f) => ({ ...f, gambarUrl: '' })); }}
                    className="shrink-0 text-gray-400 hover:text-red-500 transition-colors text-sm"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <label className={`flex items-center gap-2 px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm cursor-pointer ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
                  <span className="text-gray-400">{uploading ? 'Mengunggah...' : 'Pilih gambar thumbnail...'}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleThumbnailUpload(f); }}
                  />
                </label>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1.5">Ringkasan</label>
              <textarea
                value={form.ringkasan}
                onChange={(e) => setForm((f) => ({ ...f, ringkasan: e.target.value }))}
                placeholder="Ringkasan singkat artikel..."
                rows={2}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#3d8b5e] focus:ring-2 focus:ring-[#3d8b5e]/10 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1.5">Konten</label>
              <TiptapEditor content={form.konten} onChange={(konten) => setForm((f) => ({ ...f, konten }))} />
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
            <h1 className="text-xl font-bold text-gray-900">Kelola Artikel</h1>
            <p className="text-sm text-gray-500 mt-0.5">{artikelList.length} artikel</p>
          </div>
          <button onClick={openNew} className="px-4 py-2.5 text-white text-sm font-semibold rounded-xl transition-opacity hover:opacity-90" style={{ background: '#3d8b5e' }}>
            + Artikel Baru
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {!loaded ? (
            <div className="py-16 text-center text-sm text-gray-400">Memuat...</div>
          ) : artikelList.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-gray-400 mb-3">Belum ada artikel.</p>
              <button onClick={openNew} className="text-sm font-semibold text-[#3d8b5e] hover:opacity-80 transition-opacity">
                Buat artikel pertama →
              </button>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-bold text-gray-600 text-xs">Artikel</th>
                  <th className="px-4 py-3 font-bold text-gray-600 text-xs hidden sm:table-cell">Tanggal</th>
                  <th className="px-4 py-3 font-bold text-gray-600 text-xs">Status</th>
                  <th className="px-4 py-3 font-bold text-gray-600 text-xs text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {artikelList.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {a.gambarUrl ? (
                          <img src={a.gambarUrl} alt={a.judul} className="w-12 h-12 rounded-lg object-cover shrink-0 bg-gray-100" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 shrink-0" />
                        )}
                        <p className="font-semibold text-gray-900 line-clamp-2">{a.judul}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-500 text-xs">{fmtDate(a.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border ${a.status === 'PUBLISHED' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}
                      >
                        {a.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(a.id)} className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(a.id)} className="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors">
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
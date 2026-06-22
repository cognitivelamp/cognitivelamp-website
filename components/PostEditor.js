// components/PostEditor.js
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import slugify from 'slugify'

export default function PostEditor({ initial = {} }) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: initial.TITLE || '',
    slug: initial.SLUG || '',
    excerpt: initial.EXCERPT || '',
    cover_url: initial.COVER_URL || '',
    category: initial.CATEGORY || '',
    tags: initial.TAGS || '',
    status: initial.STATUS || 'draft',
    meta_title: initial.META_TITLE || '',
    meta_desc: initial.META_DESC || '',
  })
  const [saving, setSaving] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: initial.CONTENT || '',
  })

  function handleTitleChange(e) {
    const title = e.target.value
    setForm(p => ({
      ...p,
      title,
      slug: slugify(title, { lower: true, strict: true }),
    }))
  }

  async function handleSave(status) {
    setSaving(true)
    const content = editor.getHTML()
    const payload = { ...form, status: status || form.status, content }

    const isEdit = !!initial.ID
    const url = isEdit ? `/api/blog/${initial.ID}` : '/api/blog'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      alert('Save failed. Please try again.')
    }
    setSaving(false)
  }

  const fields = [
    { name: 'title', label: 'Title', type: 'text', onChange: handleTitleChange },
    { name: 'slug', label: 'Slug (auto-generated)', type: 'text' },
    { name: 'excerpt', label: 'Excerpt', type: 'text' },
    { name: 'cover_url', label: 'Cover Image URL', type: 'url' },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'tags', label: 'Tags (comma separated)', type: 'text' },
    { name: 'meta_title', label: 'SEO Title', type: 'text' },
    { name: 'meta_desc', label: 'SEO Description', type: 'text' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-900 text-white px-6 py-4 flex justify-between items-center">
        <span className="font-bold font-heading text-lg">
          {initial.ID ? 'Edit Post' : 'New Post'}
        </span>
        <div className="flex gap-3">
          <button onClick={() => router.push('/admin/dashboard')} className="text-sm text-gray-300 hover:text-white">← Back</button>
          <button onClick={() => handleSave('draft')} disabled={saving} className="px-4 py-2 bg-gray-600 text-white text-sm font-semibold rounded-lg hover:bg-gray-500 disabled:opacity-50">
            Save Draft
          </button>
          <button onClick={() => handleSave('published')} disabled={saving} className="px-4 py-2 bg-accent-500 text-white text-sm font-semibold rounded-lg hover:bg-accent-400 disabled:opacity-50">
            {saving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        {fields.map(f => (
          <div key={f.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
            <input
              type={f.type}
              value={form[f.name]}
              onChange={f.onChange || (e => setForm(p => ({ ...p, [f.name]: e.target.value })))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          {/* Toolbar */}
          <div className="border border-b-0 border-gray-200 rounded-t-xl bg-gray-50 px-3 py-2 flex gap-2 flex-wrap">
            {[
              { label: 'B', action: () => editor.chain().focus().toggleBold().run(), active: editor?.isActive('bold') },
              { label: 'I', action: () => editor.chain().focus().toggleItalic().run(), active: editor?.isActive('italic') },
              { label: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive('heading', { level: 2 }) },
              { label: 'H3', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor?.isActive('heading', { level: 3 }) },
              { label: '• List', action: () => editor.chain().focus().toggleBulletList().run(), active: editor?.isActive('bulletList') },
              { label: '1. List', action: () => editor.chain().focus().toggleOrderedList().run(), active: editor?.isActive('orderedList') },
              { label: 'Quote', action: () => editor.chain().focus().toggleBlockquote().run(), active: editor?.isActive('blockquote') },
            ].map(btn => (
              <button
                key={btn.label}
                type="button"
                onClick={btn.action}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  btn.active ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
          <div className="border border-gray-200 rounded-b-xl bg-white min-h-[400px] px-5 py-4">
            <EditorContent editor={editor} className="prose prose-lg max-w-none focus:outline-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { format } from 'date-fns'

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/blog')
      .then(r => { if (r.status === 401) router.push('/admin/login'); return r.json() })
      .then(d => { setPosts(d.posts || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function toggleStatus(id, current) {
    const newStatus = current === 'published' ? 'draft' : 'published'
    await fetch(`/api/blog/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    setPosts(p => p.map(post => post.ID === id ? { ...post, STATUS: newStatus } : post))
  }

  async function deletePost(id) {
    if (!confirm('Delete this post permanently?')) return
    await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    setPosts(p => p.filter(post => post.ID !== id))
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <header className="bg-brand-900 text-white px-6 py-4 flex justify-between items-center">
        <span className="font-bold font-heading text-lg">CognitiveLamp Admin</span>
        <div className="flex gap-4 items-center">
          <Link href="/admin/posts/new" className="px-4 py-2 bg-accent-500 text-white text-sm font-semibold rounded-lg hover:bg-accent-400 transition-colors">
            + New Post
          </Link>
          <button onClick={logout} className="text-sm text-gray-300 hover:text-white">Log Out</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold font-heading text-gray-900 mb-8">Blog Posts</h1>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-400 mb-4">No posts yet.</p>
            <Link href="/admin/posts/new" className="px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors">
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Title', 'Category', 'Status', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.map(post => (
                  <tr key={post.ID} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-800 max-w-xs truncate">{post.TITLE}</td>
                    <td className="px-5 py-4 text-gray-400">{post.CATEGORY || '—'}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleStatus(post.ID, post.STATUS)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          post.STATUS === 'published'
                            ? 'bg-accent-500/10 text-accent-600'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {post.STATUS}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-gray-400">
                      {post.CREATED_AT ? format(new Date(post.CREATED_AT), 'dd MMM yyyy') : '—'}
                    </td>
                    <td className="px-5 py-4 flex gap-3">
                      <Link href={`/admin/posts/${post.ID}`} className="text-brand-600 hover:underline font-medium">Edit</Link>
                      <button onClick={() => deletePost(post.ID)} className="text-red-400 hover:text-red-600 font-medium">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
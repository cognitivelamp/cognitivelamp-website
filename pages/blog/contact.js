import { useState } from 'react'
import Layout from '../components/Layout'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSent(true)
    } catch {
      alert('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <Layout title="Contact" description="Get in touch with the Cognitive Lamp team.">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-extrabold font-heading text-gray-900 mb-4">Get In Touch</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          Have a question about Cognotential, a partnership enquiry, or just want to learn more?
          We would love to hear from you.
        </p>

        {sent ? (
          <div className="bg-accent-500/10 border border-accent-400 rounded-2xl p-8 text-center">
            <p className="text-xl font-semibold text-accent-600">Message received. ✓</p>
            <p className="text-gray-500 mt-2">We will get back to you within 2 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: 'name', label: 'Full Name', type: 'text', required: true },
              { name: 'email', label: 'Email Address', type: 'email', required: true },
              { name: 'subject', label: 'Subject', type: 'text', required: false },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  required={f.required}
                  value={form[f.name]}
                  onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-800"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-800 resize-y"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}

        <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400 space-y-1">
          <p>Cognitive Lamp Private Limited</p>
          <p>2nd Floor, Kalpana Market, GNB Road, Guwahati, Assam 781003</p>
        </div>
      </div>
    </Layout>
  )
}
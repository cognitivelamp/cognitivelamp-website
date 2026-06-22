import { useState } from 'react'
import Layout from '../components/Layout'

const stats = [
  { value: '85M+', label: 'Jobs at high risk from AI by 2030' },
  { value: '40%', label: 'Of current skills will be obsolete in 5 years' },
  { value: '1 in 3', label: 'Mid-career professionals lack an AI readiness plan' },
]

const constructs = [
  { symbol: 'AQ', name: 'Adaptability Intelligence', desc: 'Your capacity to thrive during disruption and reinvent yourself.' },
  { symbol: 'XQ', name: 'Execution Intelligence', desc: 'Your ability to convert intention into consistent results.' },
  { symbol: 'LQ', name: 'Learning Intelligence', desc: 'How fast you acquire and apply new knowledge.' },
  { symbol: 'OQ', name: 'Opportunity Intelligence', desc: 'Your ability to identify and pursue high-value paths.' },
  { symbol: 'SQ', name: 'Social Intelligence', desc: 'Creating value through collaboration and trust.' },
  { symbol: 'IQ²', name: 'Innovation Intelligence', desc: 'Generating novel, useful solutions to new problems.' },
  { symbol: 'LeQ', name: 'Leadership Intelligence', desc: 'Amplifying value through others and inspiring action.' },
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleWaitlist(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-400 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-6 tracking-wide">
            Human Potential Intelligence · Cognotential
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading leading-tight mb-6">
            Are You <span className="text-accent-400">AI-Proof?</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-10">
            AI is not coming for jobs. It is coming for <em>skills</em>. The question is not whether your industry will change —
            it is whether <strong>you</strong> have the human intelligence that AI cannot replace.
            Cognotential measures exactly that.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#waitlist"
              className="px-8 py-4 bg-accent-500 text-white font-bold rounded-full hover:bg-accent-400 transition-colors text-base shadow-lg"
            >
              Discover Your Potential Score
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors text-base border border-white/20"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map(s => (
            <div key={s.value}>
              <div className="text-4xl font-extrabold text-brand-600 font-heading">{s.value}</div>
              <div className="mt-2 text-sm text-gray-500 leading-relaxed">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem Section ───────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mb-6">
          The World Changed. The Playbook Did Not.
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          You have spent years building a career. You have the experience, the titles, the track record.
          But the skills that got you here may not take you where you need to go next.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          AI is not a distant threat. It is actively replacing tasks in law, finance, marketing, operations,
          and management today. The professionals who thrive will not be those who know the most —
          they will be those who can <strong>learn, adapt, and create value</strong> in ways AI cannot.
        </p>
        <p className="text-xl font-semibold text-brand-700">
          Human Potential Intelligence (HPI) is the new measure of professional worth.
        </p>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mb-4">
              What Is Human Potential Intelligence?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              HPI measures not what you have done, but what you are capable of becoming.
              It is built on seven scientifically grounded intelligence constructs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {constructs.map(c => (
              <div key={c.symbol} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-brand-700 font-bold text-sm font-heading">{c.symbol}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 font-heading">{c.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Equation ─────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">The HPI Equation</h2>
        <div className="bg-brand-900 text-white rounded-2xl px-8 py-10 inline-block shadow-xl">
          <p className="text-sm text-gray-300 uppercase tracking-widest mb-4">Future Value Creation</p>
          <p className="text-2xl sm:text-3xl font-bold font-heading">
            Potential × Opportunity × Effort × Strategic Alignment
          </p>
        </div>
        <p className="mt-8 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          If any one of these is zero, your future value creation is zero — regardless of how talented you are.
          Cognotential measures all four, and shows you exactly where to focus.
        </p>
      </section>

      {/* ── Waitlist ─────────────────────────────────────── */}
      <section id="waitlist" className="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Find Out How AI-Proof You Really Are
          </h2>
          <p className="text-gray-300 mb-10 text-lg leading-relaxed">
            Cognotential is launching soon. Join the waitlist and be the first to access your
            Human Potential Intelligence score — before AI makes the decision for you.
          </p>
          {submitted ? (
            <div className="bg-accent-500/20 border border-accent-400 rounded-2xl px-8 py-8">
              <p className="text-2xl font-bold text-accent-400 mb-2">You're on the list. ✓</p>
              <p className="text-gray-300">We'll be in touch when early access opens. Watch your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-400"
              />
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-400 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-gray-400">No spam. No selling your data. Unsubscribe any time.</p>
        </div>
      </section>
    </Layout>
  )
}
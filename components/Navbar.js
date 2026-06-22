import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-brand-700 font-heading tracking-tight">
              Cognitive<span className="text-accent-500">Lamp</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  router.pathname === l.href
                    ? 'text-brand-600 border-b-2 border-brand-500 pb-0.5'
                    : 'text-gray-600 hover:text-brand-600'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#waitlist"
              className="ml-4 px-5 py-2 bg-brand-600 text-white text-sm font-semibold rounded-full hover:bg-brand-700 transition-colors"
            >
              Join Waitlist
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-3">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-2 py-2 text-gray-700 font-medium hover:text-brand-600"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#waitlist"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-5 py-2.5 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700"
            >
              Join Waitlist
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
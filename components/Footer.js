import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <span className="text-xl font-bold text-white font-heading">
              Cognitive<span className="text-accent-400">Lamp</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Switch On Your Brilliance.<br />
              Human Potential Intelligence for the AI era.
            </p>
            <p className="mt-4 text-xs text-gray-500">
              Cognitive Lamp Private Limited<br />
              CIN: U62099AS2025PTC029318<br />
              Guwahati, Assam, India
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigate</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/blog', label: 'Insights' },
                { href: '/contact', label: 'Contact' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Waitlist */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Stay Ahead</h3>
            <p className="text-sm text-gray-400 mb-4">
              Get early access to Cognotential — the AI-era potential intelligence platform.
            </p>
            <Link
              href="/#waitlist"
              className="inline-block px-5 py-2.5 bg-accent-500 text-white text-sm font-semibold rounded-full hover:bg-accent-400 transition-colors"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Cognitive Lamp Private Limited. All rights reserved.</p>
          <p>GSTIN: 18AANCC2950P1Z0</p>
        </div>
      </div>
    </footer>
  )
}
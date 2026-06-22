import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, title, description, ogImage }) {
  const siteName = 'Cognitive Lamp'
  const defaultDesc = 'Discover your Human Potential Intelligence. Find out how AI-proof you really are — and what to do about it.'

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteName}` : `${siteName} — Switch On Your Brilliance`}</title>
        <meta name="description" content={description || defaultDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={title || siteName} />
        <meta property="og:description" content={description || defaultDesc} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
      </Head>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  )
}
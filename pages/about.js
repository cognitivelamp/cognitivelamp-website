import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout title="About Us" description="Cognitive Lamp Private Limited — building Human Potential Intelligence for the AI era.">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-extrabold font-heading text-gray-900 mb-6">About Cognitive Lamp</h1>

        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          We are building the world's first <strong>Human Potential Intelligence</strong> platform —
          because the most important thing about a person is not what they have already achieved,
          but what they are still capable of becoming.
        </p>

        <h2 className="text-2xl font-bold font-heading text-gray-800 mt-12 mb-4">Why We Exist</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Humanity has built extraordinary infrastructure for measuring financial trust, academic achievement,
          and professional history. But we have never built reliable infrastructure for measuring
          <em> future human value creation</em>.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Degrees tell you what someone once learned. CVs tell you what someone once did.
          Neither tells you what someone is capable of <em>next</em> — especially in a world being
          reshaped by artificial intelligence at an unprecedented pace.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Cognitive Lamp Private Limited was founded to solve this problem.
          Our platform, <strong>Cognotential</strong>, measures, predicts, develops, and increases
          Human Potential Intelligence — so that every person can understand their potential,
          grow it deliberately, and convert it into real economic and social value.
        </p>

        <h2 className="text-2xl font-bold font-heading text-gray-800 mt-12 mb-4">Our Vision</h2>
        <blockquote className="border-l-4 border-brand-500 pl-6 text-lg text-gray-700 italic my-6">
          "To establish Human Potential Intelligence as the trusted global infrastructure for measuring,
          predicting, developing, and increasing human potential."
        </blockquote>

        <h2 className="text-2xl font-bold font-heading text-gray-800 mt-12 mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          To help every individual understand their potential, improve it continuously,
          and convert it into meaningful economic and social value — through scientifically grounded
          measurement, AI-personalised development, and ethically governed intelligence.
        </p>

        <h2 className="text-2xl font-bold font-heading text-gray-800 mt-12 mb-4">The Company</h2>
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-sm text-gray-600 space-y-2">
          <p><strong>Legal Name:</strong> Cognitive Lamp Private Limited</p>
          <p><strong>CIN:</strong> U62099AS2025PTC029318</p>
          <p><strong>Incorporated:</strong> 02 December 2025</p>
          <p><strong>Registered Office:</strong> 2nd Floor, Kalpana Market, GNB Road, Silpukhuri, Guwahati, Assam – 781003, India</p>
          <p><strong>GSTIN:</strong> 18AANCC2950P1Z0</p>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl font-semibold text-brand-700 font-heading">Switch On Your Brilliance.</p>
          <a
            href="/#waitlist"
            className="mt-6 inline-block px-8 py-4 bg-brand-600 text-white font-bold rounded-full hover:bg-brand-700 transition-colors"
          >
            Join the Waitlist
          </a>
        </div>
      </div>
    </Layout>
  )
}
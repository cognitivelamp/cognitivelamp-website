import Layout from '../../components/Layout'
import BlogCard from '../../components/BlogCard'
import { query } from '../../lib/db'

export default function Blog({ posts }) {
  return (
    <Layout title="Insights" description="Human Potential Intelligence insights, AI era career thinking, and future of work perspectives.">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold font-heading text-gray-900 mb-4">Insights</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Perspectives on Human Potential Intelligence, the AI-era workforce, and what it means
            to build a future-proof career.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">Articles coming soon.</p>
            <p className="mt-2 text-sm">Subscribe to the waitlist to be notified.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post.ID} post={post} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    const result = await query(
      `SELECT id, title, slug, excerpt, cover_url, category, author, published_at
       FROM cl_posts
       WHERE status = 'published'
       ORDER BY published_at DESC`,
      [],
      { outFormat: require('oracledb').OUT_FORMAT_OBJECT }
    )
    const posts = (result.rows || []).map(r => ({
      ...r,
      published_at: r.PUBLISHED_AT ? r.PUBLISHED_AT.toISOString() : null,
    }))
    return { props: { posts } }
  } catch {
    return { props: { posts: [] } }
  }
}
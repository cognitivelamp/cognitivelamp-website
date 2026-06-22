import Link from 'next/link'
import { format } from 'date-fns'

export default function BlogCard({ post }) {
  return (
    <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {post.cover_url && (
        <div className="h-48 overflow-hidden bg-gray-100">
          <img
            src={post.cover_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        {post.category && (
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">
            {post.category}
          </span>
        )}
        <h2 className="text-lg font-semibold text-gray-900 font-heading leading-snug mb-2 group-hover:text-brand-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        {post.excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed flex-grow">{post.excerpt}</p>
        )}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <span>{post.author || 'Cognitive Lamp'}</span>
          {post.published_at && (
            <time dateTime={post.published_at}>
              {format(new Date(post.published_at), 'dd MMM yyyy')}
            </time>
          )}
        </div>
      </div>
    </article>
  )
}
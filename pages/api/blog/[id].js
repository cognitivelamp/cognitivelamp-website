import { query } from '../../../lib/db'
import { getAdminFromRequest } from '../../../lib/auth'

export default async function handler(req, res) {
  const admin = getAdminFromRequest(req)
  if (!admin) return res.status(401).json({ message: 'Unauthorised.' })
  const id = Number(req.query.id)

  if (req.method === 'PUT') {
    const { title, slug, excerpt, content, cover_url, category, tags, status, meta_title, meta_desc } = req.body
    await query(
      `UPDATE cl_posts SET title=:title, slug=:slug, excerpt=:excerpt, content=:content,
       cover_url=:cover_url, category=:category, tags=:tags, status=:status,
       meta_title=:meta_title, meta_desc=:meta_desc, updated_at=CURRENT_TIMESTAMP,
       published_at = CASE WHEN :status2 = 'published' AND published_at IS NULL THEN CURRENT_TIMESTAMP ELSE published_at END
       WHERE id=:id`,
      { title, slug, excerpt, content, cover_url, category, tags, status, meta_title, meta_desc, status2: status, id }
    )
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'PATCH') {
    const { status } = req.body
    await query(
      `UPDATE cl_posts SET status=:status, updated_at=CURRENT_TIMESTAMP,
       published_at = CASE WHEN :status2='published' AND published_at IS NULL THEN CURRENT_TIMESTAMP ELSE published_at END
       WHERE id=:id`,
      { status, status2: status, id }
    )
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'DELETE') {
    await query('DELETE FROM cl_posts WHERE id=:id', [id])
    return res.status(200).json({ ok: true })
  }

  res.status(405).end()
}
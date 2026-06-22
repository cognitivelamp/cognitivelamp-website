import { query } from '../../../lib/db'
import { getAdminFromRequest } from '../../../lib/auth'

export default async function handler(req, res) {
  const oracledb = require('oracledb')

  if (req.method === 'GET') {
    // Admin: all posts. Public: only published
    const admin = getAdminFromRequest(req)
    const sql = admin
      ? `SELECT id, title, slug, excerpt, cover_url, category, status, author, created_at FROM cl_posts ORDER BY created_at DESC`
      : `SELECT id, title, slug, excerpt, cover_url, category, author, published_at FROM cl_posts WHERE status='published' ORDER BY published_at DESC`
    const result = await query(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT })
    const posts = (result.rows || []).map(r => {
      for (const k of ['CREATED_AT', 'UPDATED_AT', 'PUBLISHED_AT']) {
        if (r[k]) r[k] = r[k].toISOString()
      }
      return r
    })
    return res.status(200).json({ posts })
  }

  if (req.method === 'POST') {
    const admin = getAdminFromRequest(req)
    if (!admin) return res.status(401).json({ message: 'Unauthorised.' })
    const { title, slug, excerpt, content, cover_url, category, tags, status, meta_title, meta_desc } = req.body
    await query(
      `INSERT INTO cl_posts (title, slug, excerpt, content, cover_url, category, tags, status, meta_title, meta_desc, published_at)
       VALUES (:title, :slug, :excerpt, :content, :cover_url, :category, :tags, :status, :meta_title, :meta_desc,
       CASE WHEN :status2 = 'published' THEN CURRENT_TIMESTAMP ELSE NULL END)`,
      { title, slug, excerpt, content, cover_url, category, tags, status, meta_title, meta_desc, status2: status }
    )
    return res.status(201).json({ ok: true })
  }

  res.status(405).end()
}
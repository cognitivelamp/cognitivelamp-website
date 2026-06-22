import { query } from '../../lib/db'
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, name } = req.body
  try {
    await query(
      'INSERT INTO cl_subscribers (email, name) VALUES (:email, :name)',
      [email, name || null]
    )
    return res.status(200).json({ ok: true })
  } catch (e) {
    if (e.message?.includes('unique')) return res.status(200).json({ ok: true }) // already subscribed
    return res.status(500).json({ message: 'Error.' })
  }
}
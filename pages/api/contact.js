import { query } from '../../lib/db'
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, email, subject, message } = req.body
  await query(
    'INSERT INTO cl_contacts (name, email, subject, message) VALUES (:name, :email, :subject, :message)',
    [name, email, subject, message]
  )
  return res.status(200).json({ ok: true })
}
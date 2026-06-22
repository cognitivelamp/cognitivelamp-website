import { serialize } from 'cookie'
export default function handler(req, res) {
  res.setHeader('Set-Cookie', serialize('cl_admin_token', '', { maxAge: 0, path: '/' }))
  res.status(200).json({ ok: true })
}
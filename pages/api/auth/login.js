import bcrypt from 'bcryptjs'
import { signToken } from '../../../lib/auth'
import { serialize } from 'cookie'
import { query } from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  try {
    const result = await query(
      'SELECT * FROM cl_admins WHERE email = :email',
      [email],
      { outFormat: require('oracledb').OUT_FORMAT_OBJECT }
    )
    const admin = result.rows?.[0]
    if (!admin) return res.status(401).json({ message: 'Invalid credentials.' })
    const valid = await bcrypt.compare(password, admin.PASSWORD_HASH)
    if (!valid) return res.status(401).json({ message: 'Invalid credentials.' })
    const token = signToken({ id: admin.ID, email: admin.EMAIL })
    res.setHeader('Set-Cookie', serialize('cl_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8,
      path: '/',
    }))
    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(500).json({ message: 'Server error.' })
  }
}
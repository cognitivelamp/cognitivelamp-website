import jwt from 'jsonwebtoken'
import { parse } from 'cookie'

export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}

export function getAdminFromRequest(req) {
  const cookies = parse(req.headers.cookie || '')
  const token = cookies['cl_admin_token']
  if (!token) return null
  return verifyToken(token)
}
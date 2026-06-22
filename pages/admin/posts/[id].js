import PostEditor from '../../../components/PostEditor'
import { query } from '../../../lib/db'
import { getAdminFromRequest } from '../../../lib/auth'

export default function EditPost({ post }) {
  return <PostEditor initial={post} />
}

export async function getServerSideProps({ req, params }) {
  const admin = getAdminFromRequest(req)
  if (!admin) return { redirect: { destination: '/admin/login', permanent: false } }
  const result = await query(
    'SELECT * FROM cl_posts WHERE id = :id',
    [Number(params.id)],
    { outFormat: require('oracledb').OUT_FORMAT_OBJECT }
  )
  if (!result.rows?.length) return { notFound: true }
  const post = result.rows[0]
  for (const key of ['CREATED_AT', 'UPDATED_AT', 'PUBLISHED_AT']) {
    if (post[key]) post[key] = post[key].toISOString()
  }
  return { props: { post } }
}
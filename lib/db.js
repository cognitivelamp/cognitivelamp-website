import oracledb from 'oracledb'

// Use Thick mode for Oracle Wallet (required for Autonomous DB)
try {
  oracledb.initOracleClient({ libDir: process.env.ORACLE_LIB_DIR || undefined })
} catch (err) {
  // Already initialised or thin mode — continue
}

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
oracledb.autoCommit = true

let pool

async function getPool() {
  if (pool) return pool
  pool = await oracledb.createPool({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectionString: process.env.ORACLE_CONNECTION_STRING,
    walletLocation: process.env.ORACLE_WALLET_LOCATION,
    walletPassword: process.env.ORACLE_WALLET_PASSWORD,
    poolMin: 2,
    poolMax: 10,
    poolIncrement: 1,
  })
  return pool
}

export async function query(sql, binds = [], opts = {}) {
  const p = await getPool()
  const conn = await p.getConnection()
  try {
    const result = await conn.execute(sql, binds, opts)
    return result
  } finally {
    await conn.close()
  }
}

export default { query }
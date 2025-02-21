const { Pool } = require('pg');

// PostgreSQL connection settings 
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.POSTGRES_DB || 'myappdb',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  port: 5432,
});

async function doWork() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('Worker - Database time:', result.rows[0].now);
    client.release();
  } catch (err) {
    console.error('Worker error:', err);
  }
}
setInterval(doWork, 10000);

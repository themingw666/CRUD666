require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
      rejectUnauthorized: false
  },
  connectionTimeoutMillis: 10000 // Timeout 10 seconds
});

pool.on('error', (err, client) => {
  console.error('Database connection error on idle client:', err.message);
});

const keepAliveAndRetry = () => {
  if (pool.ending) return;
  pool.query('SELECT 1', (err, res) => {
    if (err) {
      console.error('Database is down/unreachable. Retrying...', err.message);
    }
  });
};

const retryInterval = setInterval(keepAliveAndRetry, 15000);
retryInterval.unref();

module.exports = pool;

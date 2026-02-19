const { Pool } = require('pg');

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
const isRailwayInternal = (process.env.DATABASE_URL || '').includes('railway.internal');
const useSsl =
  process.env.DB_SSL === 'true' ||
  (process.env.NODE_ENV === 'production' && !isRailwayInternal);

const pool = hasDatabaseUrl
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: useSsl ? { rejectUnauthorized: false } : false,
    })
  : new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'car_rental',
      password: process.env.DB_PASSWORD || 'postgres',
      port: Number(process.env.DB_PORT || 5432),
    });

module.exports = pool;

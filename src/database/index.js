import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const client = new Pool({
  user: process.env.DATABASE_USER,
  host: 'localhost',
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432
});

client.on('connect', () => console.log('Database connected successfully'));

client.on('error', (err) => console.log(`Error: ${err}`));

export default client;

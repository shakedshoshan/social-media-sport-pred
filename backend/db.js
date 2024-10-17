import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "35043504",
  host: "localhost",
  port: 5432,
  database: "socialmediasports"
});

export default pool;
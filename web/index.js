const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 8081; // internal container port


const NAME = process.env.NAME || 'Aditi Rawat';
const ROLL_NUMBER = process.env.ROLL_NUMBER || '2022BCD0050';
const BIO = process.env.BIO || 'Hello! My name is Aditi Rawat. I am an AI & DS student of Batch 2. This is my first time learning DevOps.';

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.POSTGRES_DB || 'myappdb',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();

    res.send(`
      <html>
        <head><title>Index Page</title></head>
        <body>
          <h1>Welcome to My Microservice App</h1>
          <p><strong>Name:</strong> ${NAME}</p>
          <p><strong>Roll Number:</strong> ${ROLL_NUMBER}</p>
          <p><strong>Bio:</strong> ${BIO}</p>
          <p>Database Time: ${result.rows[0].now}</p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.listen(8081, '0.0.0.0', () => {
    console.log('Web Service is running on port 8081');
  });
  

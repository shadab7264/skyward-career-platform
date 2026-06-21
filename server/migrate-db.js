const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const { URL } = require('url');
require('dotenv').config();

async function run() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const dbPassword = process.env.DB_PASSWORD || process.env.SUPABASE_DB_PASSWORD || process.argv[2];

  if (!supabaseUrl) {
    console.error('Error: SUPABASE_URL is missing in server/.env');
    process.exit(1);
  }

  if (!dbPassword) {
    console.error('Error: Database password is required.');
    console.error('Please provide it as a command-line argument:');
    console.error('  node migrate-db.js <your_database_password>');
    console.error('Or set DB_PASSWORD=<your_database_password> in server/.env');
    process.exit(1);
  }

  let projectRef;
  try {
    projectRef = new URL(supabaseUrl).hostname.split('.')[0];
  } catch (err) {
    console.error('Error parsing SUPABASE_URL:', err.message);
    process.exit(1);
  }

  const dbHost = `db.${projectRef}.supabase.co`;
  const connectionString = `postgresql://postgres:${encodeURIComponent(dbPassword)}@${dbHost}:5432/postgres`;

  console.log(`Connecting to database host: ${dbHost}...`);

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected successfully!');

    const schemaPath = require('path').join(__dirname, '..', 'supabase', 'schema.sql');
    console.log(`Reading schema from: ${schemaPath}`);
    const schemaSql = await fsPromises.readFile(schemaPath, 'utf8');

    console.log('Applying database schema.sql...');
    await client.query(schemaSql);
    console.log('Database schema applied successfully!');

    // Optionally apply seed data if present
    const seedPath = require('path').join(__dirname, '..', 'supabase', 'seed.sql');
    if (fs.existsSync(seedPath)) {
      console.log('Seed file found. Checking for commented mock data reference...');
    }

  } catch (error) {
    console.error('Migration failed with error:');
    console.error(error.message);
    if (error.detail) console.error('Detail:', error.detail);
    if (error.hint) console.error('Hint:', error.hint);
  } finally {
    await client.end();
  }
}

run();

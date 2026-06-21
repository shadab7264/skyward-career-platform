const { spawn } = require('child_process');
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const envs = [
  { name: 'SUPABASE_URL', value: process.env.SUPABASE_URL },
  { name: 'SUPABASE_SERVICE_ROLE_KEY', value: process.env.SUPABASE_SERVICE_ROLE_KEY },
  { name: 'GEMINI_API_KEY', value: process.env.GEMINI_API_KEY },
  { name: 'GEMINI_MODEL', value: process.env.GEMINI_MODEL || 'gemini-3.5-flash' },
  { name: 'DB_PASSWORD', value: process.env.DB_PASSWORD }
];

function addEnv(name, value) {
  return new Promise((resolve) => {
    console.log(`Setting Vercel environment variable: ${name}...`);
    
    // Command: npx vercel env add <name> production
    const child = spawn('npx', ['vercel', 'env', 'add', name, 'production'], {
      shell: true
    });

    child.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`[stdout] ${output.trim()}`);
    });

    child.stderr.on('data', (data) => {
      const output = data.toString();
      console.log(`[stderr] ${output.trim()}`);
    });

    // Write value when prompted
    child.stdin.write(value + '\n');
    child.stdin.end();

    child.on('close', (code) => {
      console.log(`Finished setting ${name} with code ${code}\n`);
      resolve();
    });
  });
}

async function run() {
  for (const env of envs) {
    if (env.value) {
      await addEnv(env.name, env.value);
    } else {
      console.warn(`Warning: Value for ${env.name} is missing in .env, skipping.`);
    }
  }
  console.log('All environment variables set successfully!');
}

run();

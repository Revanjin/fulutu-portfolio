import SftpClient from 'ssh2-sftp-client';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';

// Load environment variables from .env (simple parser, no extra deps).
const envFile = resolve('.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

const config = {
  host: process.env.SFTP_HOST || 'ssh.strato.de',
  port: Number(process.env.SFTP_PORT) || 22,
  username: process.env.SFTP_USER || 'sftp_Fulutu@fulutu.art',
  password: process.env.SFTP_PASSWORD,
  // Target directory on the server (web root). Override via .env if needed.
  remotePath: process.env.SFTP_REMOTE_PATH || '/',
};

async function deploy() {
  if (!config.password) {
    console.error('❌ SFTP_PASSWORD is not set.');
    console.error('   Add it to your .env file: SFTP_PASSWORD=your-password');
    process.exit(1);
  }

  const distPath = resolve('dist');
  if (!existsSync(distPath)) {
    console.error('❌ dist/ folder not found. Run "npm run build" first.');
    process.exit(1);
  }

  console.log('\n🚀 Deploying to Strato via SFTP...');
  console.log(`   Host:   ${config.host}:${config.port}`);
  console.log(`   User:   ${config.username}`);
  console.log(`   Remote: ${config.remotePath}\n`);

  const client = new SftpClient();
  let uploaded = 0;

  client.on('upload', (info) => {
    uploaded++;
    console.log(`  upload  ${info.source}`);
  });

  try {
    await client.connect({
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
    });

    // Ensure the target directory exists, then mirror the dist folder into it.
    await client.mkdir(config.remotePath, true);
    await client.uploadDir(distPath, config.remotePath);

    console.log(`\n✅ Deploy complete! (${uploaded} files uploaded)`);
  } catch (err) {
    console.error('\n❌ Deploy failed:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

deploy();

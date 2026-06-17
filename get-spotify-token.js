// Run with: node --env-file=.env.local get-spotify-token.js
// It will open your browser, catch the OAuth redirect, and save the refresh token to .env.local

import http from 'http';
import { exec } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:3000';
const SCOPE = 'user-read-currently-playing';

const authUrl =
  `https://accounts.spotify.com/authorize` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(SCOPE)}`;

console.log('\n🎵 Opening Spotify login in your browser...\n');
exec(`open "${authUrl}"`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h2>❌ Spotify error: ${error}</h2><p>Close this tab.</p>`);
    server.close();
    return;
  }

  if (!code) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h2>Waiting for Spotify...</h2>');
    return;
  }

  // Exchange code for tokens
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await tokenRes.json();

  if (!data.refresh_token) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h2>❌ Failed to get token</h2><pre>${JSON.stringify(data, null, 2)}</pre>`);
    server.close();
    return;
  }

  // Write refresh token to .env.local
  const envPath = '.env.local';
  let envContent = readFileSync(envPath, 'utf8');
  envContent = envContent.replace(
    /SPOTIFY_REFRESH_TOKEN=.*/,
    `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`
  );
  writeFileSync(envPath, envContent);

  console.log('✅ Refresh token saved to .env.local!');
  console.log('   Restart api-dev.js: node --env-file=.env.local api-dev.js\n');

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html><body style="font-family:monospace;padding:2rem;background:#0a0f1e;color:#2DD4BF">
      <h2>✅ Spotify connected!</h2>
      <p>Refresh token saved to <code>.env.local</code>.</p>
      <p>Close this tab and restart <code>api-dev.js</code>.</p>
    </body></html>
  `);

  server.close();
});

server.listen(3000, () => {
  console.log('Waiting for Spotify redirect on http://localhost:3000 ...');
  console.log('(If browser did not open, visit this URL manually:)');
  console.log(authUrl + '\n');
});

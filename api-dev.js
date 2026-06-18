// Local dev server — mimics the Vercel /api/spotify function
// Run with: node --env-file=.env.local api-dev.js
// Then start your app normally: npm run dev
// Vite proxies /api/spotify → this server automatically.

import http from 'http';

const PORT = 3001;
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

const getAccessToken = async () => {
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });
  return res.json();
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.url !== '/api/spotify') {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'not found' }));
    return;
  }

  if (!SPOTIFY_CLIENT_ID || SPOTIFY_CLIENT_ID === 'your_client_id_here') {
    res.writeHead(200);
    res.end(JSON.stringify({ isPlaying: false, error: 'not_configured' }));
    return;
  }

  try {
    const { access_token } = await getAccessToken();
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (response.status === 204) {
      res.writeHead(200);
      res.end(JSON.stringify({ isPlaying: false }));
      return;
    }

    const text = await response.text();
    console.log(`[Spotify] status=${response.status} body=${text.slice(0, 300)}`);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      res.writeHead(200);
      res.end(JSON.stringify({ isPlaying: false, error: `Spotify returned: ${text.slice(0, 100)}` }));
      return;
    }

    if (data.error) {
      res.writeHead(200);
      res.end(JSON.stringify({ isPlaying: false, error: `${data.error.status}: ${data.error.message}` }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify({
      isPlaying: data.is_playing,
      title: data.item?.name ?? null,
      artist: data.item?.artists?.map((a) => a.name).join(', ') ?? null,
      albumArt: data.item?.album?.images?.[0]?.url ?? null,
      url: data.item?.external_urls?.spotify ?? null,
    }));
  } catch (e) {
    res.writeHead(200);
    res.end(JSON.stringify({ isPlaying: false, error: e.message }));
  }
});

server.listen(PORT, () => {
  console.log(`Spotify dev server running at http://localhost:${PORT}/api/spotify`);
});

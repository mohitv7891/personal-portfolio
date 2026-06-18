// Vercel Serverless Function — Spotify Now Playing
// ─────────────────────────────────────────────────
// Setup (one-time):
//   1. Go to https://developer.spotify.com/dashboard → Create an app
//   2. Add http://localhost:3000 as a Redirect URI
//   3. Run the auth flow once to get a refresh token (see README or use
//      https://accounts.spotify.com/authorize?... with scope=user-read-currently-playing)
//   4. In Vercel project settings → Environment Variables, add:
//        SPOTIFY_CLIENT_ID      = <your client id>
//        SPOTIFY_CLIENT_SECRET  = <your client secret>
//        SPOTIFY_REFRESH_TOKEN  = <your refresh token>

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const getAccessToken = async () => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const { access_token } = await getAccessToken();
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (response.status === 204) {
      return res.status(200).json({ isPlaying: false });
    }

    if (response.status > 400) {
      return res.status(200).json({ isPlaying: false, error: 'spotify_error' });
    }

    const data = await response.json();
    return res.status(200).json({
      isPlaying: data.is_playing,
      title: data.item?.name ?? null,
      artist: data.item?.artists?.map((a) => a.name).join(', ') ?? null,
      albumArt: data.item?.album?.images?.[0]?.url ?? null,
      url: data.item?.external_urls?.spotify ?? null,
    });
  } catch {
    return res.status(200).json({ isPlaying: false, error: 'not_configured' });
  }
}

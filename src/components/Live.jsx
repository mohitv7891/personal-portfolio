import React, { useState, useEffect } from 'react';
import { FaSpotify, FaGithub, FaCode, FaBook } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import now from '../data/now';

// ── helpers ──────────────────────────────────────────────────────────────────

const timeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - new Date(timestamp)) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

const CardShell = ({ label, icon, accent = 'text-slate-500', children, href }) => {
  const Wrapper = href ? 'a' : 'div';
  return (
    <Wrapper
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="bg-custom-light-dark border border-custom-border rounded-xl p-5 flex flex-col gap-3 hover:border-teal-400/25 transition-colors duration-300 group"
    >
      <div className="flex items-center justify-between">
        <span className={`flex items-center gap-1.5 text-[10px] uppercase tracking-widest ${accent}`}>
          {icon}
          {label}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>
      {children}
    </Wrapper>
  );
};

// ── 1. Local Clock ────────────────────────────────────────────────────────────

const LocalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (opts) => time.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', ...opts });

  return (
    <CardShell label="Local Time" icon={<span>🕐</span>} accent="text-slate-500">
      <div>
        <p className="text-3xl font-bold text-slate-100 tabular-nums tracking-tight">
          {fmt({ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {fmt({ weekday: 'long', day: 'numeric', month: 'long' })} · IST
        </p>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-green-400">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        Online · Bengaluru, India
      </div>
    </CardShell>
  );
};

// ── 2. GitHub Last Push ───────────────────────────────────────────────────────

const GitHubActivity = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/mohitv7891/events?per_page=30')
      .then((r) => r.json())
      .then((data) => {
        const push = Array.isArray(data) ? data.find((e) => e.type === 'PushEvent') : null;
        setEvent(push ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const commit = event?.payload?.commits?.at(-1);
  const repo = event?.repo?.name?.replace('mohitv7891/', '');

  return (
    <CardShell
      label="GitHub"
      icon={<FaGithub size={10} />}
      accent="text-slate-500"
      href={event ? `https://github.com/${event.repo?.name}` : undefined}
    >
      {loading ? (
        <div className="h-10 bg-custom-border rounded animate-pulse" />
      ) : event ? (
        <div>
          <p className="text-teal-300 text-sm font-semibold truncate">{repo}</p>
          <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
            {commit?.message ?? 'pushed a commit'}
          </p>
          <p className="text-slate-600 text-[11px] mt-2">{timeAgo(event.created_at)}</p>
        </div>
      ) : (
        <p className="text-slate-500 text-xs">No recent push events</p>
      )}
    </CardShell>
  );
};

// ── 3. LeetCode Recent AC Submission ─────────────────────────────────────────

const LeetCodeActivity = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://alfa-leetcode-api.onrender.com/mohitv7891/submission?limit=3')
      .then((r) => r.json())
      .then((data) => {
        setSubmissions(data?.submission ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const latest = submissions[0];

  return (
    <CardShell
      label="LeetCode"
      icon={<SiLeetcode size={10} />}
      accent="text-amber-600"
      href={latest ? `https://leetcode.com/problems/${latest.titleSlug}/` : 'https://leetcode.com/u/mohitv7891/'}
    >
      {loading ? (
        <div className="space-y-2">
          <div className="h-4 bg-custom-border rounded animate-pulse w-3/4" />
          <div className="h-3 bg-custom-border rounded animate-pulse w-1/2" />
        </div>
      ) : latest ? (
        <div>
          <p className="text-xs text-slate-500 mb-1">Last solved</p>
          <p className="text-slate-200 text-sm font-semibold line-clamp-1">{latest.title}</p>
          <p className="text-slate-600 text-[11px] mt-1.5">
            {timeAgo(new Date(Number(latest.timestamp) * 1000))}
          </p>
          {submissions.length > 1 && (
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {submissions.slice(1).map((s) => (
                <span key={s.id} className="text-[10px] text-slate-600 bg-custom-border px-2 py-0.5 rounded truncate max-w-[120px]">
                  {s.title}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-slate-200 text-sm font-semibold">600+ solved</p>
          <p className="text-slate-500 text-xs mt-1">Rating: 1613 · 4★ CodeChef</p>
        </div>
      )}
    </CardShell>
  );
};

// ── 4. Currently Reading ──────────────────────────────────────────────────────

const NowReading = () => (
  <CardShell
    label="Currently Reading"
    icon={<FaBook size={10} />}
    accent="text-violet-400"
    href={now.reading.url ?? undefined}
  >
    <div>
      <p className="text-slate-100 text-sm font-semibold leading-snug">{now.reading.title}</p>
      <p className="text-slate-500 text-xs mt-1">{now.reading.author}</p>
    </div>
  </CardShell>
);

// ── 5. Currently Learning ─────────────────────────────────────────────────────

const NowLearning = () => (
  <CardShell label="Currently Learning" icon={<FaCode size={10} />} accent="text-blue-400">
    <div>
      <p className="text-slate-100 text-sm font-semibold leading-snug">{now.learning.topic}</p>
      <p className="text-slate-500 text-xs mt-1">{now.learning.resource}</p>
    </div>
  </CardShell>
);

// ── 6. Spotify Now Playing ────────────────────────────────────────────────────

const SpotifyCard = () => {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/spotify')
      .then((r) => r.json())
      .then((data) => { setTrack(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const isConfigured = track && !track.error;

  return (
    <CardShell
      label="Spotify"
      icon={<FaSpotify size={10} />}
      accent="text-green-500"
      href={track?.url ?? undefined}
    >
      {loading ? (
        <div className="h-10 bg-custom-border rounded animate-pulse" />
      ) : isConfigured && track?.isPlaying ? (
        <div className="flex gap-3 items-center">
          {track.albumArt && (
            <img src={track.albumArt} alt="album" className="w-10 h-10 rounded shrink-0" />
          )}
          <div className="overflow-hidden">
            <p className="text-green-400 text-[10px] uppercase tracking-widest mb-0.5">Now Playing</p>
            <p className="text-slate-200 text-sm font-semibold truncate">{track.title}</p>
            <p className="text-slate-500 text-xs truncate">{track.artist}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <FaSpotify size={20} className="text-slate-700 shrink-0" />
          <div>
            <p className="text-slate-400 text-sm">Not playing</p>
            <p className="text-slate-600 text-[11px] mt-0.5">
              {!isConfigured ? 'Connect Spotify in Vercel env vars' : 'Offline'}
            </p>
          </div>
        </div>
      )}
    </CardShell>
  );
};

// ── Main Live section ─────────────────────────────────────────────────────────

const Live = () => (
  <section id="now" className="py-20">
    <div className="flex items-center gap-4 mb-10">
      <span className="text-teal-400 text-sm font-mono shrink-0">~</span>
      <h2 className="text-xl font-bold text-slate-100 shrink-0">Now</h2>
      <div className="flex-1 h-px bg-custom-border" />
      <span className="flex items-center gap-1.5 text-[10px] text-slate-600 uppercase tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        live
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <LocalClock />
      <GitHubActivity />
      <LeetCodeActivity />
      <NowReading />
      <NowLearning />
      <SpotifyCard />
    </div>
  </section>
);

export default Live;

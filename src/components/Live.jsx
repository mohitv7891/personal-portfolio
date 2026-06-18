import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

// ── Edit your reading/learning here (no code needed):
// https://gist.github.com/mohitv7891/042550b5b0ee7534e699ae76773db385
const GIST_URL = 'https://gist.githubusercontent.com/mohitv7891/042550b5b0ee7534e699ae76773db385/raw';

// ── Heartbeat Gist — fill in after creating the status.json gist:
// https://gist.github.com/mohitv7891/<GIST_ID>/raw/status.json
// Leave empty string to always show offline until configured.
const HEARTBEAT_GIST_URL = 'https://gist.githubusercontent.com/mohitv7891/a6964334ecdffc19dc8adbf0b13cfaa0/raw/status.json';

const timeAgo = (ts) => {
  const s = Math.floor((Date.now() - new Date(ts)) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

const ActivityRow = ({ label, primary, secondary, href }) => (
  <div className="group flex flex-col gap-0.5">
    <span className="text-[10px] uppercase tracking-widest text-slate-600">{label}</span>
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-slate-300 text-sm hover:text-teal-300 transition-colors"
      >
        {primary}
        <FaExternalLinkAlt size={9} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    ) : (
      <p className="text-slate-300 text-sm">{primary}</p>
    )}
    {secondary && <p className="text-slate-600 text-xs">{secondary}</p>}
  </div>
);

const Live = () => {
  const [time, setTime] = useState(new Date());
  const [nowData, setNowData] = useState(null);
  const [spotify, setSpotify] = useState(null);
  const [github, setGithub] = useState(null);
  const [leetcode, setLeetcode] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch(`${GIST_URL}?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data) => setNowData(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const fetchSpotify = () => {
      fetch('/api/spotify')
        .then((r) => r.json())
        .then((data) => setSpotify(data))
        .catch(() => {});
    };
    fetchSpotify();
    const id = setInterval(fetchSpotify, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/users/mohitv7891/events?per_page=30')
      .then((r) => r.json())
      .then((data) => {
        const push = Array.isArray(data) ? data.find((e) => e.type === 'PushEvent') : null;
        if (push) setGithub(push);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!HEARTBEAT_GIST_URL) return;
    const check = () => {
      fetch(`${HEARTBEAT_GIST_URL}?t=${Date.now()}`)
        .then((r) => r.json())
        .then((data) => {
          const lastSeen = new Date(data.lastSeen);
          const minutesAgo = (Date.now() - lastSeen) / 60_000;
          setIsOnline(minutesAgo < 10);
        })
        .catch(() => setIsOnline(false));
    };
    check();
    const id = setInterval(check, 2 * 60_000); // re-check every 2 min
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Render free tier sleeps — retry up to 3 times with 10s gaps
    const fetchLeetcode = (attempt = 1) => {
      fetch('https://alfa-leetcode-api.onrender.com/mohitv7891_/submission?limit=1')
        .then((r) => r.json())
        .then((data) => {
          const latest = data?.submission?.[0];
          if (latest) setLeetcode(latest);
          else if (attempt < 3) setTimeout(() => fetchLeetcode(attempt + 1), 10_000);
        })
        .catch(() => {
          if (attempt < 3) setTimeout(() => fetchLeetcode(attempt + 1), 10_000);
        });
    };
    fetchLeetcode();
  }, []);


  const clockDisplay = time.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const dateDisplay = time.toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });

  const githubRepo = github?.repo?.name?.replace('mohitv7891/', '');

  return (
    <section id="now" className="py-20">
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-12">
        <span className="text-teal-400 text-sm font-mono shrink-0">~</span>
        <h2 className="text-xl font-bold text-slate-100 shrink-0">Now</h2>
        <div className="flex-1 h-px bg-custom-border" />
        <span className={`flex items-center gap-1.5 text-[10px] uppercase tracking-widest ${isOnline ? 'text-slate-600' : 'text-slate-700'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`} />
          {isOnline ? 'live' : 'offline'}
        </span>
      </div>

      {/* Two-column typographic layout */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-0">

        {/* Left — Clock */}
        <div className="md:w-52 shrink-0 flex flex-col justify-center">
          <p className="text-5xl md:text-7xl font-bold text-slate-100 tabular-nums leading-none tracking-tighter">
            {clockDisplay}
          </p>
          <p className="text-slate-500 text-xs mt-3 tracking-wide">{dateDisplay} · IST</p>
          <div className={`flex items-center gap-1.5 mt-4 text-xs ${isOnline ? 'text-green-400' : 'text-slate-600'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`} />
            {isOnline ? 'online · Bengaluru' : 'offline'}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-custom-border mx-12 self-stretch" />
        <div className="block md:hidden h-px bg-custom-border" />

        {/* Right — Activities */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ActivityRow
            label="reading"
            primary={nowData?.reading?.title ?? '…'}
            secondary={nowData?.reading?.author}
            href={nowData?.reading?.url}
          />

          <ActivityRow
            label="learning"
            primary={nowData?.learning?.topic ?? '…'}
            secondary={nowData?.learning?.resource}
          />

          {github && (
            <ActivityRow
              label="last pushed"
              primary={githubRepo}
              secondary={timeAgo(github.created_at)}
              href={`https://github.com/mohitv7891/${githubRepo}`}
            />
          )}

          {leetcode && (
            <ActivityRow
              label="last solved"
              primary={leetcode.title}
              secondary={timeAgo(new Date(Number(leetcode.timestamp) * 1000))}
              href={`https://leetcode.com/problems/${leetcode.titleSlug}/`}
            />
          )}

          {/* Spotify — live widget */}
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-600">
              listening
              {spotify?.isPlaying && (
                <span className="flex items-end gap-[3px] h-3">
                  <span className="eq-bar" />
                  <span className="eq-bar" />
                  <span className="eq-bar" />
                  <span className="eq-bar" />
                </span>
              )}
            </span>

            {spotify?.isPlaying ? (
              <a
                href={spotify.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group mt-0.5"
              >
                {spotify.albumArt && (
                  <div className="relative shrink-0">
                    <img
                      src={spotify.albumArt}
                      alt="album art"
                      className="w-10 h-10 rounded object-cover shadow-lg shadow-black/40"
                    />
                    {/* rotating vinyl ring overlay */}
                    <span className="absolute inset-0 rounded border border-teal-400/30 animate-spin [animation-duration:8s]" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-teal-300 text-sm font-medium truncate group-hover:text-teal-200 transition-colors">
                    {spotify.title}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5 truncate">{spotify.artist}</p>
                </div>
              </a>
            ) : (
              <p className="text-slate-600 text-sm mt-0.5">Not playing</p>
            )}
          </div>
        </div>

      </div>

    </section>
  );
};

export default Live;

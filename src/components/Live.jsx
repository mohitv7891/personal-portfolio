import React, { useState, useEffect } from 'react';
import now from '../data/now';
import { FaExternalLinkAlt } from 'react-icons/fa';

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
  const [spotify, setSpotify] = useState(null);
  const [github, setGithub] = useState(null);
  const [leetcode, setLeetcode] = useState(null);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch('/api/spotify')
      .then((r) => r.json())
      .then((data) => setSpotify(data))
      .catch(() => {});
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
    fetch('https://alfa-leetcode-api.onrender.com/mohitv7891/submission?limit=1')
      .then((r) => r.json())
      .then((data) => {
        const latest = data?.submission?.[0];
        if (latest) setLeetcode(latest);
      })
      .catch(() => {});
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
        <span className="flex items-center gap-1.5 text-[10px] text-slate-600 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          live
        </span>
      </div>

      {/* Two-column typographic layout */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-0">

        {/* Left — Clock */}
        <div className="md:w-52 shrink-0 flex flex-col justify-center">
          <p className="text-7xl font-bold text-slate-100 tabular-nums leading-none tracking-tighter">
            {clockDisplay}
          </p>
          <p className="text-slate-500 text-xs mt-3 tracking-wide">{dateDisplay} · IST</p>
          <div className="flex items-center gap-1.5 mt-4 text-xs text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            online · Bengaluru
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-custom-border mx-12 self-stretch" />
        <div className="block md:hidden h-px bg-custom-border" />

        {/* Right — Activities */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ActivityRow
            label="reading"
            primary={now.reading.title}
            secondary={now.reading.author}
            href={now.reading.url}
          />

          <ActivityRow
            label="learning"
            primary={now.learning.topic}
            secondary={now.learning.resource}
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

          <ActivityRow
            label="listening"
            primary={spotify?.isPlaying ? spotify.title : 'Not playing'}
            secondary={spotify?.isPlaying ? spotify.artist : 'Set up Spotify in Vercel env vars'}
            href={spotify?.isPlaying ? spotify.url : undefined}
          />
        </div>

      </div>

    </section>
  );
};

export default Live;

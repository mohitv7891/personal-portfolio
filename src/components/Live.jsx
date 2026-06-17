import React, { useState, useEffect } from 'react';
import now from '../data/now';

const timeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - new Date(timestamp)) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

const Row = ({ label, value, href, muted = false }) => {
  const content = (
    <div className={`flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4 py-3 border-b border-custom-border last:border-0 group/row ${href ? 'cursor-pointer' : ''}`}>
      <span className="text-[11px] uppercase tracking-widest text-slate-600 shrink-0 w-24">{label}</span>
      <span className={`text-sm leading-snug transition-colors ${muted ? 'text-slate-500' : 'text-slate-300 group-hover/row:text-teal-300'}`}>
        {value}
      </span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
};

const Live = () => {
  const [time, setTime] = useState(new Date());
  const [github, setGithub] = useState(null);
  const [leetcode, setLeetcode] = useState(null);
  const [spotify, setSpotify] = useState(null);

  // Clock
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // GitHub
  useEffect(() => {
    fetch('https://api.github.com/users/mohitv7891/events?per_page=30')
      .then((r) => r.json())
      .then((data) => {
        const push = Array.isArray(data) ? data.find((e) => e.type === 'PushEvent') : null;
        if (push) setGithub(push);
      })
      .catch(() => {});
  }, []);

  // LeetCode
  useEffect(() => {
    fetch('https://alfa-leetcode-api.onrender.com/mohitv7891/submission?limit=1')
      .then((r) => r.json())
      .then((data) => {
        const latest = data?.submission?.[0];
        if (latest) setLeetcode(latest);
      })
      .catch(() => {});
  }, []);

  // Spotify
  useEffect(() => {
    fetch('/api/spotify')
      .then((r) => r.json())
      .then((data) => { if (data?.isPlaying) setSpotify(data); })
      .catch(() => {});
  }, []);

  const istTime = time.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const githubRepo = github?.repo?.name?.replace('mohitv7891/', '');
  const githubCommit = github?.payload?.commits?.at(-1)?.message?.split('\n')[0];

  return (
    <section id="now" className="py-20">
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-teal-400 text-sm font-mono shrink-0">~</span>
        <h2 className="text-xl font-bold text-slate-100 shrink-0">Now</h2>
        <div className="flex-1 h-px bg-custom-border" />
        <span className="flex items-center gap-1.5 text-[10px] text-slate-600 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          live
        </span>
      </div>

      {/* Single focused card */}
      <div className="bg-custom-light-dark border border-custom-border rounded-xl px-6 py-2">

        {/* Clock row — always visible, special treatment */}
        <div className="flex items-center justify-between py-3 border-b border-custom-border">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4">
            <span className="text-[11px] uppercase tracking-widest text-slate-600 w-24 shrink-0">local time</span>
            <span className="text-slate-100 text-sm font-semibold tabular-nums">
              {istTime} <span className="text-slate-500 font-normal text-xs">IST · Bengaluru</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-green-400 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            online
          </div>
        </div>

        {/* Reading */}
        <Row
          label="reading"
          value={`${now.reading.title} — ${now.reading.author}`}
          href={now.reading.url}
        />

        {/* Learning */}
        <Row
          label="learning"
          value={now.learning.topic}
        />

        {/* GitHub */}
        {github && (
          <Row
            label="github"
            value={`${githubRepo}${githubCommit ? ` · "${githubCommit}"` : ''} · ${timeAgo(github.created_at)}`}
            href={`https://github.com/mohitv7891/${githubRepo}`}
          />
        )}

        {/* LeetCode */}
        {leetcode && (
          <Row
            label="leetcode"
            value={`solved "${leetcode.title}" · ${timeAgo(new Date(Number(leetcode.timestamp) * 1000))}`}
            href={`https://leetcode.com/problems/${leetcode.titleSlug}/`}
          />
        )}

        {/* Spotify — only shown when actually playing */}
        {spotify?.isPlaying && (
          <Row
            label="listening"
            value={`${spotify.title} — ${spotify.artist}`}
            href={spotify.url}
          />
        )}

      </div>
    </section>
  );
};

export default Live;

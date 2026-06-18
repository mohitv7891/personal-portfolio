import React, { useState } from 'react';

/**
 * Collapses content to `collapsedClass` height on mobile.
 * On md+ screens content is always fully visible.
 * Pass `fromColor` (a hex string) matching the surrounding bg for the fade gradient.
 */
const ReadMore = ({ children, collapsedClass = 'max-h-24', fromColor = '#060D18' }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Content wrapper */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:max-h-[9999px] ${
          expanded ? 'max-h-[9999px]' : collapsedClass
        }`}
      >
        {children}
      </div>

      {/* Bottom fade — only on mobile, only when collapsed */}
      {!expanded && (
        <div
          className="md:hidden absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${fromColor}, transparent)`,
          }}
        />
      )}

      {/* Toggle button — mobile only */}
      <button
        className="md:hidden mt-3 text-xs font-mono text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? (
          <>
            <span className="inline-block rotate-180">↓</span> read less
          </>
        ) : (
          <>
            ↓ read more
          </>
        )}
      </button>
    </div>
  );
};

export default ReadMore;

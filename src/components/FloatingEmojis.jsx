import React, { useMemo } from 'react';

const ALL_EMOJIS = [
  '🧸', '🎂', '💗', '🎀', '🌷', '🦋', '🎁', '✨', '💌', '🍓', '🌸', '🎈',
  '🌙', '⭐️', '💖', '🌹', '💐', '🤍', '🍰', '🧸', '🌷', '🎀', '✨', '🌸'
];

export default function FloatingEmojis() {
  // Generate 36 vivid, high-visibility floating emoji particles
  const particles = useMemo(() => {
    const list = [];
    const count = 38;
    for (let i = 0; i < count; i++) {
      const emoji = ALL_EMOJIS[i % ALL_EMOJIS.length];
      const left = (i * (100 / count) + (Math.sin(i * 47) * 4 + 4)) % 96; // spread across 0-96%
      const size = 26 + ((i * 7) % 20); // 26px to 46px (large & clearly visible)
      const duration = 10 + ((i * 3.3) % 10); // 10s to 20s
      const delay = -((i * 1.5) % 14); // Negative delay so screen is already full of emojis immediately
      const rotationDir = i % 2 === 0 ? 1 : -1;
      const opacity = 0.85 + ((i % 3) * 0.07); // 0.85 to 1.0 (vivid & bright)
      const swayOffset = ((i % 5) - 2) * 35; // horizontal sway

      list.push({
        id: i,
        emoji,
        left: `${left}%`,
        size: `${size}px`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        rotationDir,
        opacity,
        swayOffset: `${swayOffset}px`
      });
    }
    return list;
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1, // Visible above background, behind interactive cards (which have z-index: 5+)
        userSelect: 'none',
      }}
    >
      <style>{`
        @keyframes floatVividEmojiUp {
          0% {
            transform: translate3d(0, 108vh, 0) rotate(0deg) scale(0.9);
            opacity: 0;
          }
          10% {
            opacity: var(--vivid-opacity, 0.9);
          }
          90% {
            opacity: var(--vivid-opacity, 0.9);
          }
          100% {
            transform: translate3d(var(--vivid-sway, 20px), -12vh, 0) rotate(calc(var(--vivid-rot, 1) * 30deg)) scale(1.05);
            opacity: 0;
          }
        }
        .vivid-floating-emoji {
          position: absolute;
          bottom: 0;
          will-change: transform, opacity;
          animation-name: floatVividEmojiUp;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-iteration-count: infinite;
          filter: drop-shadow(0 4px 10px rgba(153, 27, 27, 0.22));
        }
      `}</style>
      {particles.map((p) => (
        <span
          key={p.id}
          className="vivid-floating-emoji"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            '--vivid-opacity': p.opacity,
            '--vivid-rot': p.rotationDir,
            '--vivid-sway': p.swayOffset,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

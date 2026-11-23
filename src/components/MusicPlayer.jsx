import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio play prevented:', err);
          // Auto-resume on user click
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '16px',
        zIndex: 50,
      }}
    >
      <audio
        ref={audioRef}
        src={siteConfig.music.src}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <style>{`
        @keyframes spinDisk {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes waveBar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .spinning-record {
          animation: spinDisk 4s linear infinite;
        }
      `}</style>

      {/* Main Music Floating Pill */}
      <div
        className="glass-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 14px',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.94)',
          border: '1.5px solid rgba(212, 175, 55, 0.4)',
          boxShadow: '0 8px 24px -4px rgba(153, 27, 27, 0.25), 0 0 12px rgba(212, 175, 55, 0.25)',
          cursor: 'pointer',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Spinning Vinyl Disc / Icon */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #7F1D1D 20%, #1E0A0E 100%)',
            border: '2px solid #D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: isPlaying ? '0 0 12px rgba(212, 175, 55, 0.5)' : 'none',
            cursor: 'pointer',
          }}
          className={isPlaying ? 'spinning-record' : ''}
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? (
            <Pause size={16} color="#FFFDF9" />
          ) : (
            <Play size={16} color="#FFFDF9" style={{ marginLeft: 2 }} />
          )}
        </div>

        {/* Info & Soundwave Bars */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-cherry)' }}>
              {isPlaying ? 'Playing Melody' : 'Play Music'}
            </span>
            {isPlaying && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: '16px' }}>
                <span style={{ width: 2.5, background: '#B91C1C', borderRadius: 2, animation: 'waveBar 0.8s ease-in-out infinite' }} />
                <span style={{ width: 2.5, background: '#D4AF37', borderRadius: 2, animation: 'waveBar 0.6s ease-in-out infinite 0.2s' }} />
                <span style={{ width: 2.5, background: '#E11D48', borderRadius: 2, animation: 'waveBar 0.9s ease-in-out infinite 0.4s' }} />
              </div>
            )}
          </div>
          <span style={{ fontSize: '0.68rem', color: '#78716C', maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {siteConfig.music.title}
          </span>
        </div>

        {/* Mute button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#6B7280',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
            alignItems: 'center',
          }}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
}


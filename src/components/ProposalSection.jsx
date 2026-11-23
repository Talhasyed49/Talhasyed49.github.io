import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCircle2, ArrowLeft, RotateCcw } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function ProposalSection({ onOpenQRModal, onPrev, onRestart }) {
  const proposal = siteConfig.proposal;
  const [hasSaidYes, setHasSaidYes] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [currentNoMessage, setCurrentNoMessage] = useState(proposal.playfulNoMessages[0]);
  const [showCuteNoModal, setShowCuteNoModal] = useState(false);

  // Trigger rich multi-stage confetti
  const triggerCelebration = () => {
    setHasSaidYes(true);

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 999
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#991B1B', '#E11D48', '#F472B6']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#D4AF37', '#FDE68A', '#BE123C']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 1.2,
      colors: ['#B91C1C', '#FFFFFF', '#D4AF37']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.5,
      shapes: ['star']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 140,
        origin: { x: 0.2, y: 0.6 },
        colors: ['#991B1B', '#D4AF37']
      });
      confetti({
        particleCount: 90,
        spread: 140,
        origin: { x: 0.8, y: 0.6 },
        colors: ['#E11D48', '#FDE68A']
      });
    }, 1200);
  };

  const handlePlayfulDodge = () => {
    const nextIdx = (noCount + 1) % proposal.playfulNoMessages.length;
    setNoCount((prev) => prev + 1);
    setCurrentNoMessage(proposal.playfulNoMessages[nextIdx]);

    const randomX = (Math.random() - 0.5) * 80;
    const randomY = (Math.random() - 0.5) * 50;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleNoClick = () => {
    setShowCuteNoModal(true);
  };

  return (
    <div style={{ width: '100%', position: 'relative', zIndex: 6, animation: 'stepFadeIn 0.5s ease-out' }}>
      <div
        className="glass-card-gold"
        style={{
          padding: '36px 20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(175deg, #FFFDF9 0%, #FFF3F5 50%, #FAF0EE 100%)'
        }}
      >
        {/* Soft Sparkle Background Accents */}
        <div style={{ position: 'absolute', top: 15, left: 15, opacity: 0.7, fontSize: '1.2rem' }}>✨</div>
        <div style={{ position: 'absolute', top: 15, right: 15, opacity: 0.7, fontSize: '1.2rem' }}>🌹</div>
        <div style={{ position: 'absolute', bottom: 15, left: 20, opacity: 0.7, fontSize: '1.2rem' }}>🌹</div>
        <div style={{ position: 'absolute', bottom: 15, right: 20, opacity: 0.7, fontSize: '1.2rem' }}>✨</div>

        {!hasSaidYes ? (
          <div>
            {/* Elegant Sparkling Ring Illustration */}
            <div style={{ margin: '0 auto 16px auto', position: 'relative', width: '120px', height: '120px' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
                  animation: 'pulseGlow 2.5s ease-in-out infinite'
                }}
              />
              <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ filter: 'drop-shadow(0 4px 12px rgba(212, 175, 55, 0.45))' }}>
                <defs>
                  <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#996515" />
                  </linearGradient>
                  <linearGradient id="diamondGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#E0F2FE" />
                    <stop offset="100%" stopColor="#BAE6FD" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="58" r="30" fill="none" stroke="url(#goldGrad2)" strokeWidth="6" />
                <circle cx="50" cy="58" r="27" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
                <polygon points="42,32 58,32 54,24 46,24" fill="url(#goldGrad2)" />
                <polygon points="50,14 62,24 50,34 38,24" fill="url(#diamondGrad2)" stroke="#FFFFFF" strokeWidth="1" />
                <line x1="50" y1="14" x2="50" y2="34" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
                <line x1="38" y1="24" x2="62" y2="24" stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
                <circle cx="48" cy="18" r="2" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Surrounding Roses Row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, fontSize: '1.35rem', marginBottom: '12px' }}>
              <span>🌹</span>
              <span>✨</span>
              <span>🌹</span>
              <span>✨</span>
              <span>🌹</span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.1rem',
              fontWeight: 800,
              lineHeight: 1.25,
              color: 'var(--color-cherry)',
              marginBottom: '10px',
              textShadow: '0 2px 8px rgba(153, 27, 27, 0.15)'
            }}>
              {proposal.heading}
            </h2>

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              color: '#4A0E17',
              fontStyle: 'italic',
              maxWidth: '360px',
              margin: '0 auto 20px auto',
              lineHeight: 1.55
            }}>
              "{proposal.quote}"
            </p>

            {noCount > 0 && (
              <div style={{
                background: 'rgba(254, 205, 211, 0.6)',
                border: '1px solid rgba(244, 114, 182, 0.5)',
                borderRadius: '999px',
                padding: '6px 16px',
                display: 'inline-block',
                marginBottom: '18px',
                animation: 'pulseGlow 1.5s infinite'
              }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-cherry)' }}>
                  {currentNoMessage}
                </span>
              </div>
            )}

            {/* YES and NO Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              marginTop: '10px',
              position: 'relative',
              minHeight: '70px'
            }}>
              <button
                onClick={triggerCelebration}
                className="btn-primary"
                style={{
                  padding: '16px 36px',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  transform: 'scale(1.06)',
                  boxShadow: '0 12px 30px -4px rgba(153, 27, 27, 0.5), 0 0 20px rgba(212, 175, 55, 0.5)',
                  cursor: 'pointer'
                }}
              >
                <span>YES ❤️</span>
              </button>

              <button
                onMouseEnter={handlePlayfulDodge}
                onTouchStart={handlePlayfulDodge}
                onClick={handleNoClick}
                className="btn-secondary"
                style={{
                  padding: '12px 24px',
                  fontSize: '1rem',
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                  transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: 'pointer'
                }}
              >
                <span>NO</span>
              </button>
            </div>
          </div>
        ) : (
          /* CELEBRATION CARD */
          <div style={{ animation: 'gentleFloat 3s ease-in-out infinite' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>💍 💖 🎉</div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--color-cherry)',
              lineHeight: 1.25,
              marginBottom: '10px'
            }}>
              {proposal.yesResponse.title}
            </h2>

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.15rem',
              fontWeight: 600,
              color: 'var(--color-gold-dark)',
              marginBottom: '16px'
            }}>
              {proposal.yesResponse.subtitle}
            </p>

            <div style={{
              background: 'rgba(255, 245, 247, 0.95)',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'left',
              marginBottom: '24px',
              boxShadow: '0 10px 25px -5px rgba(153, 27, 27, 0.15)'
            }}>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#3F1E24', marginBottom: '14px', fontWeight: 450 }}>
                {proposal.yesResponse.message}
              </p>
              <div style={{ borderTop: '1px dashed rgba(212, 175, 55, 0.4)', paddingTop: '12px' }}>
                <p style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--color-cherry)', fontStyle: 'italic' }}>
                  {proposal.yesResponse.dua}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
              <button
                onClick={triggerCelebration}
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: '1.05rem' }}
              >
                <span>Celebrate Again! 🎊</span>
              </button>

              {onRestart && (
                <button
                  onClick={onRestart}
                  style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}
                >
                  <RotateCcw size={14} />
                  <span>Start from beginning 🔄</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Cute Gentle Modal if NO is clicked */}
        {showCuteNoModal && (
          <div
            onClick={() => setShowCuteNoModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="glass-card-gold"
              style={{ padding: '28px 22px', maxWidth: '360px', width: '100%', textAlign: 'center', background: '#FFFFFF' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🥺👉👈</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-cherry)', fontSize: '1.35rem', marginBottom: '8px' }}>
                Sach me? Ek baar aur socho na!
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#5B3A40', lineHeight: 1.5, marginBottom: '20px' }}>
                Main intezar kar sakta hoon, lekin mera dil sirf tumhare liye dhadakta hai... Chalo ab pyari si haan keh do! 💖
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    setShowCuteNoModal(false);
                    triggerCelebration();
                  }}
                  className="btn-primary"
                  style={{ padding: '12px 24px', fontSize: '1rem' }}
                >
                  Say YES ❤️
                </button>
                <button
                  onClick={() => setShowCuteNoModal(false)}
                  className="btn-secondary"
                  style={{ padding: '12px 18px', fontSize: '0.9rem' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back button if not yet said yes */}
      {!hasSaidYes && onPrev && (
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={onPrev}
            className="btn-secondary"
            style={{ padding: '10px 18px', fontSize: '0.9rem' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Letter</span>
          </button>
        </div>
      )}
    </div>
  );
}

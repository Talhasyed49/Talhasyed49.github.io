import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Edit3, Check, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function LoveLetter({ onNext, onPrev }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [petals, setPetals] = useState([]);
  
  // Load saved letter from localStorage if edited, else default config
  const [letterData, setLetterData] = useState(() => {
    try {
      const saved = localStorage.getItem('birthday_love_letter_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return siteConfig.letter;
  });

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    // Generate gentle floating petals and sparkling hearts
    const newPetals = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.6) % 96}%`,
      delay: `${(i * 0.1)}s`,
      duration: `${3.2 + (i % 3)}s`,
      char: i % 4 === 0 ? '🌸' : i % 4 === 1 ? '✨' : i % 4 === 2 ? '💖' : '🌷',
      size: `${20 + (i % 12)}px`
    }));
    setPetals(newPetals);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    try {
      localStorage.setItem('birthday_love_letter_v2', JSON.stringify(letterData));
    } catch (e) {}
  };

  const handleResetLetter = () => {
    setLetterData(siteConfig.letter);
    try {
      localStorage.removeItem('birthday_love_letter_v2');
    } catch (e) {}
    setIsEditing(false);
  };

  return (
    <div style={{ width: '100%', position: 'relative', zIndex: 6, animation: 'stepFadeIn 0.5s ease-out' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(254, 205, 211, 0.5)', padding: '5px 14px', borderRadius: '999px', marginBottom: '8px' }}>
          <Mail size={14} color="var(--color-cherry)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-cherry)' }}>
            Straight From My Heart
          </span>
          <Mail size={14} color="var(--color-cherry)" />
        </div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#4A0E17',
          margin: '0 0 4px 0'
        }}>
          A Sealed Letter For You
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#6B4A50' }}>
          Written with love, sincerity, and everlasting respect.
        </p>
      </div>

      {/* Floating Petals */}
      {isOpen && petals.length > 0 && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 12 }}>
          <style>{`
            @keyframes petalFall {
              0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
              15% { opacity: 0.95; }
              85% { opacity: 0.95; }
              100% { transform: translateY(500px) rotate(220deg); opacity: 0; }
            }
          `}</style>
          {petals.map((p) => (
            <span
              key={p.id}
              style={{
                position: 'absolute',
                top: 0,
                left: p.left,
                fontSize: p.size,
                animation: `petalFall ${p.duration} ease-in forwards`,
                animationDelay: p.delay,
              }}
            >
              {p.char}
            </span>
          ))}
        </div>
      )}

      {/* Interactive Envelope Container */}
      <div style={{ width: '100%', maxWidth: '460px', margin: '0 auto', position: 'relative' }}>
        {!isOpen ? (
          /* CLOSED ENVELOPE */
          <div
            onClick={handleOpenEnvelope}
            className="animate-pulse-glow"
            style={{
              width: '100%',
              minHeight: '270px',
              background: 'linear-gradient(145deg, #FFFDF9 0%, #FCE7F3 100%)',
              border: '2px solid rgba(212, 175, 55, 0.45)',
              borderRadius: '20px',
              boxShadow: '0 20px 40px -10px rgba(153, 27, 27, 0.25), 0 0 20px rgba(212, 175, 55, 0.2)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '30px 20px',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
          >
            {/* Envelope Flap Triangle */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '115px',
                background: 'linear-gradient(180deg, #FDE8ED 0%, #FFFDF9 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                borderBottom: '1px solid rgba(212, 175, 55, 0.35)',
                boxShadow: '0 4px 12px rgba(153, 27, 27, 0.08)'
              }}
            />

            {/* Wax Seal */}
            <div
              style={{
                position: 'relative',
                zIndex: 3,
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #B91C1C 35%, #7F1D1D 100%)',
                border: '3px solid #D4AF37',
                boxShadow: '0 6px 18px rgba(153, 27, 27, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '10px',
                marginBottom: '16px'
              }}
            >
              <Heart size={32} fill="#FFFDF9" color="#D4AF37" />
            </div>

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--color-cherry)',
              marginBottom: '14px',
              position: 'relative',
              zIndex: 3
            }}>
              For Your Eyes Only 💌
            </p>

            <button
              onClick={handleOpenEnvelope}
              className="btn-primary"
              style={{
                fontSize: '1.08rem',
                padding: '12px 28px',
                position: 'relative',
                zIndex: 3
              }}
            >
              <span>Open My Letter 💌</span>
            </button>

            <span style={{ fontSize: '0.78rem', color: '#885560', marginTop: '12px', position: 'relative', zIndex: 3 }}>
              Tap anywhere to break the seal & unfold
            </span>
          </div>
        ) : (
          /* OPEN LETTER (RICH HEARTFELT PARCHMENT) */
          <div
            className="glass-card-gold"
            style={{
              padding: '28px 20px',
              background: 'linear-gradient(180deg, #FFFCF7 0%, #FFF8FA 100%)',
              border: '2px solid rgba(212, 175, 55, 0.45)',
              boxShadow: '0 25px 50px -12px rgba(153, 27, 27, 0.25)',
              position: 'relative'
            }}
          >
            {/* Top Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px dashed rgba(212, 175, 55, 0.4)', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '0.78rem',
                    color: 'var(--color-cherry)',
                    background: 'rgba(254, 205, 211, 0.45)',
                    border: '1px solid rgba(244, 114, 182, 0.4)',
                    borderRadius: '999px',
                    padding: '4px 10px',
                    cursor: 'pointer'
                  }}
                >
                  <Edit3 size={12} />
                  <span>{isEditing ? 'Cancel' : 'Edit Letter ✏️'}</span>
                </button>
                {isEditing && (
                  <button
                    onClick={handleResetLetter}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: '0.78rem',
                      color: '#4B5563',
                      background: '#F3F4F6',
                      border: 'none',
                      borderRadius: '999px',
                      padding: '4px 10px',
                      cursor: 'pointer'
                    }}
                  >
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  fontSize: '0.78rem',
                  color: '#6B7280',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Fold Back ✉️
              </button>
            </div>

            {/* Letter Content: Handwritten Font */}
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input
                  type="text"
                  value={letterData.greeting}
                  onChange={(e) => setLetterData({ ...letterData, greeting: e.target.value })}
                  style={{
                    fontFamily: 'var(--font-hand)',
                    fontSize: '1.4rem',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid #D4AF37'
                  }}
                />
                {letterData.paragraphs.map((para, i) => (
                  <textarea
                    key={i}
                    rows={4}
                    value={para}
                    onChange={(e) => {
                      const updated = [...letterData.paragraphs];
                      updated[i] = e.target.value;
                      setLetterData({ ...letterData, paragraphs: updated });
                    }}
                    style={{
                      fontFamily: 'var(--font-hand)',
                      fontSize: '1.25rem',
                      lineHeight: 1.45,
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      width: '100%'
                    }}
                  />
                ))}
                <button
                  onClick={handleSaveEdit}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.9rem', alignSelf: 'flex-start' }}
                >
                  <Check size={14} />
                  <span>Save Changes</span>
                </button>
              </div>
            ) : (
              <div>
                <p style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--color-cherry)',
                  marginBottom: '16px',
                  lineHeight: 1.2
                }}>
                  {letterData.greeting}
                </p>

                {letterData.paragraphs.map((p, idx) => {
                  const isAliFatimaQuote = p.includes('Hazrat Ali') || p.includes('Fatima Zahra');

                  return (
                    <div
                      key={idx}
                      style={{
                        marginBottom: '16px',
                        ...(isAliFatimaQuote
                          ? {
                              background: 'rgba(254, 242, 242, 0.7)',
                              borderLeft: '3px solid var(--color-gold)',
                              padding: '12px 14px',
                              borderRadius: '10px',
                              boxShadow: '0 2px 8px rgba(153, 27, 27, 0.05)',
                            }
                          : {}),
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-hand)',
                          fontSize: isAliFatimaQuote ? '1.45rem' : '1.38rem',
                          lineHeight: 1.55,
                          color: isAliFatimaQuote ? '#4A0E17' : '#3B1A20',
                          textAlign: 'left',
                          margin: 0,
                          fontWeight: isAliFatimaQuote ? 600 : 450,
                        }}
                      >
                        {p}
                      </p>
                    </div>
                  );
                })}

                <div style={{ marginTop: '24px', textAlign: 'right', borderTop: '1px dashed rgba(212, 175, 55, 0.35)', paddingTop: '14px' }}>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.35rem', color: '#6B4A50', margin: 0 }}>
                    {letterData.closing}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-hand)',
                    fontSize: '1.65rem',
                    fontWeight: 700,
                    color: 'var(--color-cherry)',
                    marginTop: '4px'
                  }}>
                    {letterData.signature}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Step Navigation Bar: Back and Next Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', gap: 12 }}>
        {onPrev && (
          <button
            onClick={onPrev}
            className="btn-secondary"
            style={{ padding: '12px 20px', fontSize: '0.95rem' }}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            className="btn-primary"
            style={{ flex: 1, padding: '14px 22px', fontSize: '1.02rem' }}
          >
            <span>Next: The Big Question 💍</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

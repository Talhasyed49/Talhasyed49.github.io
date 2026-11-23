import React, { useState } from 'react';
import { Moon, Sparkles, HeartHandshake, Shield, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function IslamicWishes({ onNext, onPrev }) {
  const wishes = siteConfig.islamicWishes;
  const [ameenCount, setAmeenCount] = useState(0);
  const [showAmeenSparkle, setShowAmeenSparkle] = useState(false);

  const handleSayAmeen = () => {
    setAmeenCount((prev) => prev + 1);
    setShowAmeenSparkle(true);
    setTimeout(() => setShowAmeenSparkle(false), 2500);
  };

  return (
    <div style={{ width: '100%', position: 'relative', zIndex: 5, animation: 'stepFadeIn 0.5s ease-out' }}>
      <div
        className="glass-card-gold"
        style={{
          padding: '32px 18px',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(160deg, #FFFDF9 0%, #FFF5F7 60%, #FAF0EE 100%)'
        }}
      >
        {/* Subtle geometric pattern watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l7.5 22.5H60l-18 13.5 7.5 22.5L30 45l-19.5 13.5 7.5-22.5L0 22.5h22.5z' fill='%23B91C1C' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '48px 48px',
            pointerEvents: 'none'
          }}
        />

        {/* Crescent Moon & Stars Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--color-gold)', fontSize: '1.4rem', marginBottom: '6px' }}>
            <span>⭐️</span>
            <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.6))' }}>🌙</span>
            <span>⭐️</span>
          </div>

          <p style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--color-cherry)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '4px'
          }}>
            Bismillah-ir-Rahman-ir-Rahim
          </p>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.75rem',
            color: '#4A0E17',
            lineHeight: 1.3,
            fontWeight: 700
          }}>
            Duaon Ka Tohfa ✨
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '10px auto', maxWidth: '200px' }}>
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, var(--color-gold))' }} />
            <span style={{ color: 'var(--color-gold)', fontSize: '0.85rem' }}>🕌</span>
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(270deg, transparent, var(--color-gold))' }} />
          </div>

          <p style={{ fontSize: '0.9rem', color: '#5C3840', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto', fontStyle: 'italic' }}>
            "Birthday gifts to dunya me bahut milte hain, lekin sabse keemti tohfa wo hota hai jo dil ki gehraiyon se nikli hui duaon me shamil ho."
          </p>
        </div>

        {/* Dua Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', zIndex: 2 }}>
          {wishes.map((item, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(212, 175, 55, 0.28)',
                borderRadius: '16px',
                padding: '16px 16px',
                boxShadow: '0 8px 20px -6px rgba(153, 27, 27, 0.08)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '8px' }}>
                <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>{item.icon}</span>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  color: 'var(--color-cherry)',
                  margin: 0
                }}>
                  {item.title}
                </h3>
              </div>

              <p style={{
                fontSize: '0.9rem',
                lineHeight: 1.65,
                color: '#3F252B',
                fontFamily: 'var(--font-sans)',
                fontWeight: 450,
                margin: 0
              }}>
                {item.dua}
              </p>
            </div>
          ))}
        </div>

        {/* Say Ameen Interactive Button */}
        <div style={{ marginTop: '24px', textAlign: 'center', position: 'relative' }}>
          <button
            onClick={handleSayAmeen}
            className="btn-primary"
            style={{
              padding: '14px 26px',
              fontSize: '0.98rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 50%, #B45309 100%)',
              border: '1px solid rgba(253, 230, 138, 0.6)'
            }}
          >
            <span>🤲 Say Ameen Ya Rabbal Alameen</span>
            {ameenCount > 0 && (
              <span style={{
                background: '#FFFFFF',
                color: 'var(--color-cherry)',
                borderRadius: '999px',
                padding: '2px 8px',
                fontSize: '0.8rem',
                fontWeight: 700
              }}>
                +{ameenCount}
              </span>
            )}
          </button>

          {showAmeenSparkle && (
            <p style={{
              marginTop: '10px',
              fontSize: '0.86rem',
              color: 'var(--color-cherry)',
              fontWeight: 600,
              animation: 'gentleFloat 1.5s ease'
            }}>
              ✨ JazakAllah Khair! May Allah accept all our duas! Ameen! 💖
            </p>
          )}
        </div>
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
            <span>Next: Open My Letter 💌</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

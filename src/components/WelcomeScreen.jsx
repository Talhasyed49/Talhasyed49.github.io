import React from 'react';
import { Heart, Sparkles, Moon } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function WelcomeScreen({ onStart }) {
  const { birthdayPerson } = siteConfig;

  return (
    <section className="welcome-screen-wrapper" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 2 }}>
      <div className="glass-card-gold" style={{ padding: '32px 24px', width: '100%', maxWidth: '440px', margin: 'auto', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        
        {/* Decorative Golden Corner Accents */}
        <div style={{ position: 'absolute', top: 12, left: 14, opacity: 0.7, fontSize: '1.1rem', color: 'var(--color-gold)' }}>✨</div>
        <div style={{ position: 'absolute', top: 12, right: 14, opacity: 0.7, fontSize: '1.1rem', color: 'var(--color-gold)' }}>🌙</div>
        
        {/* Soft Glowing Heart Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(254, 205, 211, 0.45)', border: '1px solid rgba(244, 114, 182, 0.4)', padding: '6px 16px', borderRadius: '999px', marginBottom: '20px' }}>
          <Heart size={14} fill="#B91C1C" color="#B91C1C" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-cherry)', letterSpacing: '0.04em' }}>
            A Special Day for a Special Soul
          </span>
          <Heart size={14} fill="#B91C1C" color="#B91C1C" />
        </div>

        {/* 1. Assalamu Alaikum */}
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.45rem',
          fontWeight: 700,
          color: 'var(--color-cherry)',
          letterSpacing: '0.02em',
          marginBottom: '8px'
        }}>
          {birthdayPerson.greeting}
        </p>

        {/* 2. Beautiful Heading about Love & Respect */}
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.65rem',
          lineHeight: 1.35,
          fontWeight: 700,
          color: '#4A0E17',
          marginBottom: '20px'
        }}>
          {birthdayPerson.title}
        </h1>

        {/* Golden Ornamental Divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '14px 0 20px 0' }}>
          <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, var(--color-gold))' }} />
          <span style={{ color: 'var(--color-gold)', fontSize: '0.9rem' }}>✦ 💖 ✦</span>
          <div style={{ height: '1px', width: '50px', background: 'linear-gradient(270deg, transparent, var(--color-gold))' }} />
        </div>

        {/* 3. Hazrat Ali & Sayyida Fatima Paragraph */}
        <div style={{
          background: 'rgba(255, 245, 247, 0.75)',
          borderLeft: '3px solid var(--color-gold)',
          padding: '16px 18px',
          borderRadius: '12px',
          marginBottom: '20px',
          textAlign: 'left'
        }}>
          <p style={{
            fontSize: '0.96rem',
            lineHeight: 1.68,
            color: '#4B1E25',
            fontStyle: 'normal',
            fontFamily: 'var(--font-sans)',
            fontWeight: 450
          }}>
            "{birthdayPerson.hadithQuote}"
          </p>
        </div>

        {/* 4. Short Birthday Wish */}
        <div style={{
          padding: '14px 16px',
          background: 'linear-gradient(135deg, rgba(254, 226, 226, 0.4) 0%, rgba(254, 240, 138, 0.25) 100%)',
          borderRadius: '14px',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          marginBottom: '28px'
        }}>
          <p style={{
            fontSize: '1.02rem',
            lineHeight: 1.55,
            fontWeight: 600,
            color: 'var(--color-cherry)',
            fontFamily: 'var(--font-serif)'
          }}>
            {birthdayPerson.birthdayWish}
          </p>
        </div>

        {/* 5. Button: Let's Go → */}
        <button
          onClick={onStart}
          className="btn-primary"
          style={{
            width: '100%',
            maxWidth: '280px',
            fontSize: '1.12rem',
            padding: '16px 28px',
            boxShadow: '0 10px 28px -4px rgba(153, 27, 27, 0.45), 0 0 15px rgba(212, 175, 55, 0.4)'
          }}
        >
          <span>Let's Go →</span>
        </button>

        <p style={{ marginTop: '16px', fontSize: '0.78rem', color: '#9CA3AF', letterSpacing: '0.02em' }}>
          Tap to unveil your memories & surprise 🎁
        </p>

      </div>
    </section>
  );
}


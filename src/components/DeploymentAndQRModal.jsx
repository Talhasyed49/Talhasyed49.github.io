import React, { useState, useEffect } from 'react';
import { QrCode, Download, ExternalLink, ShieldCheck, AlertCircle, Copy, Check, Printer, GitBranch, Sparkles, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function DeploymentAndQRModal({ isOpen, onClose }) {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('gh_username') || siteConfig.githubUsername;
  });
  const [copied, setCopied] = useState(false);
  const [qrConfig, setQrConfig] = useState(null);
  const [activeTab, setActiveTab] = useState('heart'); // 'heart' | 'hd' | 'standard'

  const permanentUrl = `https://${username.toLowerCase()}.github.io/`;
  const repoName = `${username}.github.io`;

  useEffect(() => {
    fetch('./qr-config.json')
      .then((res) => res.json())
      .then((data) => setQrConfig(data))
      .catch((e) => console.log('qr-config fetch note:', e));
  }, []);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(permanentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveUsername = (newUsername) => {
    const clean = newUsername.trim();
    setUsername(clean);
    localStorage.setItem('gh_username', clean);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(20, 8, 10, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card-gold"
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px 20px',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(153, 27, 27, 0.35)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: '#F3F4F6',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#4B5563',
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(254, 205, 211, 0.45)', padding: '4px 14px', borderRadius: '999px', marginBottom: '8px' }}>
            <Sparkles size={14} color="var(--color-cherry)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-cherry)' }}>
              Deployment & Heart QR Center
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.55rem', color: '#4A0E17', margin: 0 }}>
            Permanent Gift Address & QR
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', marginTop: '4px' }}>
            Your permanent URL & artistic printable heart QR code.
          </p>
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 14px',
            borderRadius: '12px',
            background: qrConfig?.isLocked ? '#ECFDF5' : '#FFFBEB',
            border: `1px solid ${qrConfig?.isLocked ? '#A7F3D0' : '#FDE68A'}`,
            marginBottom: '18px',
          }}
        >
          {qrConfig?.isLocked ? (
            <ShieldCheck size={20} color="#059669" />
          ) : (
            <AlertCircle size={20} color="#D97706" />
          )}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: qrConfig?.isLocked ? '#065F46' : '#92400E', margin: 0 }}>
              {qrConfig?.isLocked ? 'Status: Permanently Deployed & Locked' : 'Status: Ready for First Deployment'}
            </p>
            <p style={{ fontSize: '0.74rem', color: qrConfig?.isLocked ? '#047857' : '#B45309', margin: '2px 0 0 0' }}>
              {qrConfig?.isLocked
                ? 'QR is locked to verified permanent URL and protected against accidental overwrites.'
                : 'QR is prepared for your permanent GitHub Pages domain below.'}
            </p>
          </div>
        </div>

        {/* GitHub Username & Permanent URL Config Box */}
        <div style={{ background: '#FFFDF9', border: '1px solid rgba(212, 175, 55, 0.35)', borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>
            GitHub Username (Owner of Website)
          </label>
          <div style={{ display: 'flex', gap: 8, marginBottom: '12px' }}>
            <input
              type="text"
              value={username}
              onChange={(e) => handleSaveUsername(e.target.value)}
              placeholder="e.g. TALHASYED"
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--color-cherry)'
              }}
            />
          </div>

          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '4px' }}>
            Permanent Website URL:
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
          >
            <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-cherry)', fontFamily: 'monospace' }}>
              {permanentUrl}
            </span>
            <button
              onClick={handleCopyUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: copied ? '#ECFDF5' : '#F9FAFB',
                border: '1px solid #D1D5DB',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                color: copied ? '#059669' : '#374151'
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <p style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: '8px' }}>
            Matching Repository Name: <strong>{repoName}</strong>
          </p>
        </div>

        {/* QR Preview Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: '14px', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px' }}>
          <button
            onClick={() => setActiveTab('heart')}
            style={{
              flex: 1,
              padding: '8px 6px',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'heart' ? 'var(--color-cherry)' : 'transparent',
              color: activeTab === 'heart' ? '#FFFFFF' : '#4B5563',
              cursor: 'pointer'
            }}
          >
            Artistic Heart QR
          </button>
          <button
            onClick={() => setActiveTab('hd')}
            style={{
              flex: 1,
              padding: '8px 6px',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'hd' ? 'var(--color-cherry)' : 'transparent',
              color: activeTab === 'hd' ? '#FFFFFF' : '#4B5563',
              cursor: 'pointer'
            }}
          >
            Print Card (300 DPI)
          </button>
          <button
            onClick={() => setActiveTab('standard')}
            style={{
              flex: 1,
              padding: '8px 6px',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'standard' ? 'var(--color-cherry)' : 'transparent',
              color: activeTab === 'standard' ? '#FFFFFF' : '#4B5563',
              cursor: 'pointer'
            }}
          >
            Standard Fallback
          </button>
        </div>

        {/* QR Image Display */}
        <div
          style={{
            background: '#FFFDF9',
            border: '2px dashed rgba(212, 175, 55, 0.4)',
            borderRadius: '16px',
            padding: '16px',
            textAlign: 'center',
            marginBottom: '18px'
          }}
        >
          {activeTab === 'heart' && (
            <div>
              <img
                src="./birthday-heart-qr.png"
                alt="Birthday Heart QR Code"
                style={{ width: '220px', height: '220px', objectFit: 'contain', margin: '0 auto', display: 'block', borderRadius: '12px', boxShadow: '0 8px 20px rgba(153, 27, 27, 0.12)' }}
              />
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-cherry)', marginTop: '10px', marginBottom: '2px' }}>
                Artistic Heart Silhouette QR
              </p>
              <p style={{ fontSize: '0.74rem', color: '#6B7280' }}>
                Deep cherry red modules, compliant finder patterns, 100% scan-tested.
              </p>
              <a
                href="./birthday-heart-qr.png"
                download="birthday-heart-qr.png"
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.82rem', marginTop: '10px' }}
              >
                <Download size={14} />
                <span>Download Heart QR</span>
              </a>
            </div>
          )}

          {activeTab === 'hd' && (
            <div>
              <img
                src="./birthday-heart-qr-hd.png"
                alt="Print-Ready HD Card"
                style={{ width: '220px', height: '220px', objectFit: 'contain', margin: '0 auto', display: 'block', borderRadius: '8px', border: '1px solid #E5E7EB' }}
              />
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-cherry)', marginTop: '10px', marginBottom: '2px' }}>
                2048x2048 HD Print-Ready Card (300 DPI)
              </p>
              <p style={{ fontSize: '0.74rem', color: '#6B7280' }}>
                Perfect for physical greeting cards, gifts, photo frames, and envelopes.
              </p>
              <a
                href="./birthday-heart-qr-hd.png"
                download="birthday-heart-qr-hd.png"
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.85rem', marginTop: '10px' }}
              >
                <Printer size={14} />
                <span>Download Print-Ready PNG (HD)</span>
              </a>
            </div>
          )}

          {activeTab === 'standard' && (
            <div>
              <img
                src="./birthday-qr-standard.png"
                alt="Standard QR Fallback"
                style={{ width: '200px', height: '200px', objectFit: 'contain', margin: '0 auto', display: 'block', borderRadius: '8px' }}
              />
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-cherry)', marginTop: '10px', marginBottom: '2px' }}>
                High-Contrast Standard Fallback QR
              </p>
              <p style={{ fontSize: '0.74rem', color: '#6B7280' }}>
                Standard Level-H error-corrected fallback code.
              </p>
              <a
                href="./birthday-qr-standard.png"
                download="birthday-qr-standard.png"
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.82rem', marginTop: '10px' }}
              >
                <Download size={14} />
                <span>Download Standard QR</span>
              </a>
            </div>
          )}
        </div>

        {/* First-Time GitHub Setup Guide */}
        <div style={{ background: '#F9FAFB', borderRadius: '14px', padding: '14px 16px', border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '6px' }}>
            <GitBranch size={16} color="var(--color-cherry)" />
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1F2937', margin: 0 }}>
              Deployment Instructions (Main Branch)
            </h4>
          </div>
          <ol style={{ paddingLeft: '18px', fontSize: '0.78rem', color: '#4B5563', lineHeight: 1.6 }}>
            <li>Create a new repository on your GitHub account named: <code style={{ color: 'var(--color-cherry)', fontWeight: 700 }}>{repoName}</code></li>
            <li>In your project folder, link and push to your repository:
              <pre style={{ background: '#1E293B', color: '#F1F5F9', padding: '6px 8px', borderRadius: '6px', fontSize: '0.72rem', marginTop: '4px', overflowX: 'auto' }}>
git remote add origin https://github.com/{username}/{repoName}.git{"\n"}
git branch -M main{"\n"}
git push -u origin main
              </pre>
            </li>
            <li>In repository <strong>Settings → Pages</strong>, ensure Build and deployment source is set to <strong>GitHub Actions</strong> (already preconfigured).</li>
            <li>Within 60-90 seconds, your site will be live at: <strong>{permanentUrl}</strong>!</li>
          </ol>
        </div>

      </div>
    </div>
  );
}


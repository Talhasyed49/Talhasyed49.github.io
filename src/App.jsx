import React, { useState } from 'react';
import FloatingEmojis from './components/FloatingEmojis';
import WelcomeScreen from './components/WelcomeScreen';
import PhotoGallery from './components/PhotoGallery';
import IslamicWishes from './components/IslamicWishes';
import LoveLetter from './components/LoveLetter';
import ProposalSection from './components/ProposalSection';
import MusicPlayer from './components/MusicPlayer';
import DeploymentAndQRModal from './components/DeploymentAndQRModal';
import { QrCode, Heart, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import './styles/theme.css';
import './App.css';

const STEPS = [
  { id: 0, title: 'Welcome', icon: '💌' },
  { id: 1, title: 'Memories', icon: '📸' },
  { id: 2, title: 'Duas', icon: '🌙' },
  { id: 3, title: 'Letter', icon: '✉️' },
  { id: 4, title: 'Surprise', icon: '💍' },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const goToNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="birthday-app">
      {/* 1. Continuous Vivid Floating Emojis Background */}
      <FloatingEmojis />

      {/* Top Header Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: 'rgba(255, 253, 249, 0.88)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          padding: '10px 16px',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Permanent Gift QR Button */}
          <button
            onClick={() => setIsQRModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1.5px solid rgba(212, 175, 55, 0.45)',
              background: '#FFFFFF',
              color: 'var(--color-cherry)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(153, 27, 27, 0.08)',
            }}
          >
            <QrCode size={15} color="var(--color-cherry)" />
            <span>Gift QR 💌</span>
          </button>

          {/* Stepper Progress Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {STEPS.map((step, idx) => {
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(idx)}
                  title={step.title}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    padding: isActive ? '4px 10px' : '4px 6px',
                    borderRadius: '999px',
                    border: 'none',
                    background: isActive
                      ? 'var(--color-cherry)'
                      : isPast
                      ? 'rgba(244, 114, 182, 0.35)'
                      : 'rgba(0, 0, 0, 0.06)',
                    color: isActive ? '#FFFFFF' : '#6B4A50',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <span>{step.icon}</span>
                  {isActive && <span>{step.title}</span>}
                </button>
              );
            })}
          </div>

          {/* Special Love Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: '0.74rem',
              fontWeight: 700,
              color: 'var(--color-cherry)',
            }}
          >
            <Sparkles size={12} color="#D4AF37" />
            <span>{currentStep + 1}/{STEPS.length}</span>
          </div>
        </div>
      </header>

      {/* Main Container: Step-by-Step Interactive Experience */}
      <main className="app-container" style={{ paddingTop: '20px', minHeight: 'calc(100vh - 70px)' }}>
        <div key={currentStep} className="step-content-container">
          {/* Step 0: Welcome Screen */}
          {currentStep === 0 && (
            <WelcomeScreen onStart={goToNext} />
          )}

          {/* Step 1: Photo Gallery */}
          {currentStep === 1 && (
            <PhotoGallery onNext={goToNext} onPrev={goToPrev} />
          )}

          {/* Step 2: Islamic Wishes & Duas */}
          {currentStep === 2 && (
            <IslamicWishes onNext={goToNext} onPrev={goToPrev} />
          )}

          {/* Step 3: Personal Love Letter */}
          {currentStep === 3 && (
            <LoveLetter onNext={goToNext} onPrev={goToPrev} />
          )}

          {/* Step 4: Final Proposal ("Will You Marry Me?") */}
          {currentStep === 4 && (
            <ProposalSection
              onOpenQRModal={() => setIsQRModalOpen(true)}
              onPrev={goToPrev}
              onRestart={() => goToStep(0)}
            />
          )}
        </div>

        {/* Subtle Footer */}
        <footer
          style={{
            textAlign: 'center',
            padding: '30px 16px 16px 16px',
            color: '#8E6870',
            fontSize: '0.8rem',
          }}
        >
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, margin: 0 }}>
            <span>Dedicated forever to the purest soul</span>
            <Heart size={13} fill="#B91C1C" color="#B91C1C" />
          </p>
        </footer>
      </main>

      {/* Floating Music Player */}
      <MusicPlayer />

      {/* Deployment & Permanent QR Modal */}
      <DeploymentAndQRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </div>
  );
}

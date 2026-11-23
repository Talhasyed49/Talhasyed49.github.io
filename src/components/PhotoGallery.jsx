import React, { useState, useRef } from 'react';
import { Heart, Maximize2, X, ChevronLeft, ChevronRight, RotateCw, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function PhotoGallery({ onNext, onPrev }) {
  const photos = siteConfig.photos;
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [photoRotations, setPhotoRotations] = useState({});
  const [lovedPhotos, setLovedPhotos] = useState({});
  const [activeCarouselIdx, setActiveCarouselIdx] = useState(0);

  // Swipe gesture handling for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      setActiveCarouselIdx((prev) => (prev + 1) % photos.length);
    } else if (diff < -45) {
      setActiveCarouselIdx((prev) => (prev - 1 + photos.length) % photos.length);
    }
  };

  const rotateCurrentPhoto = (idx, e) => {
    e?.stopPropagation();
    setPhotoRotations((prev) => ({
      ...prev,
      [idx]: ((prev[idx] || 0) + 90) % 360,
    }));
  };

  const toggleLove = (idx, e) => {
    e?.stopPropagation();
    setLovedPhotos((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const currentPhoto = photos[activeCarouselIdx];
  const currentRotation = photoRotations[activeCarouselIdx] || 0;
  const isLoved = lovedPhotos[activeCarouselIdx];

  return (
    <div style={{ width: '100%', position: 'relative', zIndex: 5, animation: 'stepFadeIn 0.5s ease-out' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(254, 205, 211, 0.5)', padding: '5px 14px', borderRadius: '999px', marginBottom: '8px' }}>
          <Sparkles size={14} color="#D4AF37" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-cherry)' }}>
            Photo {activeCarouselIdx + 1} of {photos.length}
          </span>
          <Sparkles size={14} color="#D4AF37" />
        </div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#4A0E17',
          marginBottom: '4px'
        }}>
          Memories of Grace & Beauty
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#6B4A50', maxWidth: '380px', margin: '0 auto' }}>
          Every photograph tells a story of innocence, gentleness, and the pure light you bring into my world.
        </p>
      </div>

      {/* Polaroid Container with Touch Swiping */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
      >
        <div
          onClick={() => setSelectedIdx(activeCarouselIdx)}
          style={{
            width: '100%',
            maxWidth: '330px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Polaroid Card Frame */}
          <div
            style={{
              background: '#FFFFFF',
              padding: '12px 12px 20px 12px',
              borderRadius: '12px',
              boxShadow: '0 20px 35px -10px rgba(153, 27, 27, 0.22), 0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(212, 175, 55, 0.25)',
              transform: `rotate(${currentPhoto.rotation}deg)`,
              position: 'relative'
            }}
          >
            {/* Washi Tape Accent */}
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%) rotate(-1.5deg)',
                width: '85px',
                height: '24px',
                background: 'rgba(253, 230, 138, 0.85)',
                border: '1px dashed rgba(212, 175, 55, 0.6)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
                zIndex: 3
              }}
            />

            {/* Photo Image Display */}
            <div
              style={{
                width: '100%',
                height: '380px',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                background: '#FAF0F2'
              }}
            >
              <img
                src={currentPhoto.src}
                alt={currentPhoto.caption}
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  transform: `rotate(${currentRotation}deg)`,
                  transition: 'transform 0.3s ease',
                  display: 'block'
                }}
              />

              {/* Tag Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '999px',
                }}
              >
                {currentPhoto.tag}
              </div>

              {/* Floating Action Buttons on Photo */}
              <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 8 }}>
                <button
                  onClick={(e) => rotateCurrentPhoto(activeCarouselIdx, e)}
                  title="Rotate Photo 90°"
                  style={{
                    background: 'rgba(255, 255, 255, 0.92)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 3px 8px rgba(0,0,0,0.18)'
                  }}
                >
                  <RotateCw size={17} color="var(--color-cherry)" />
                </button>

                <button
                  onClick={(e) => toggleLove(activeCarouselIdx, e)}
                  title="Love this photo"
                  style={{
                    background: 'rgba(255, 255, 255, 0.92)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 3px 8px rgba(0,0,0,0.18)'
                  }}
                >
                  <Heart size={18} fill={isLoved ? '#E11D48' : 'none'} color={isLoved ? '#E11D48' : '#6B4A50'} />
                </button>
              </div>

              {/* Zoom hint badge at bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  background: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(6px)',
                  color: '#FFFFFF',
                  fontSize: '0.7rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <Maximize2 size={11} />
                <span>Tap to Zoom</span>
              </div>
            </div>

            {/* Polaroid Handwritten Caption */}
            <div style={{ marginTop: '14px', textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: '1.45rem',
                  color: 'var(--color-cherry)',
                  lineHeight: 1.25,
                  margin: '0 0 4px 0'
                }}
              >
                {currentPhoto.caption}
              </p>
              <p style={{ fontSize: '0.82rem', color: '#78716C', fontStyle: 'italic', margin: 0 }}>
                {currentPhoto.subCaption}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Controls & Indicator Dots */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: '16px' }}>
          <button
            onClick={() => setActiveCarouselIdx((prev) => (prev - 1 + photos.length) % photos.length)}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(153, 27, 27, 0.12)',
              cursor: 'pointer'
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} color="var(--color-cherry)" />
          </button>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', gap: 8 }}>
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveCarouselIdx(i)}
                style={{
                  width: i === activeCarouselIdx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: i === activeCarouselIdx ? 'var(--color-cherry)' : 'rgba(153, 27, 27, 0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveCarouselIdx((prev) => (prev + 1) % photos.length)}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(153, 27, 27, 0.12)',
              cursor: 'pointer'
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={22} color="var(--color-cherry)" />
          </button>
        </div>
      </div>

      {/* Step Navigation Bar: Back and Next Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', gap: 12 }}>
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
            <span>Next: Duaon Ka Tohfa 🌙</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          onClick={() => setSelectedIdx(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 6, 8, 0.94)',
            backdropFilter: 'blur(12px)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px'
          }}
        >
          <button
            onClick={() => setSelectedIdx(null)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '420px',
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '16px 16px 20px 16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <div style={{ width: '100%', maxHeight: '66vh', overflow: 'hidden', borderRadius: '10px', background: '#000000' }}>
              <img
                src={photos[selectedIdx].src}
                alt={photos[selectedIdx].caption}
                style={{
                  width: '100%',
                  maxHeight: '66vh',
                  objectFit: 'contain',
                  transform: `rotate(${photoRotations[selectedIdx] || 0}deg)`,
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>

            <div style={{ marginTop: '14px' }}>
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.5rem', color: 'var(--color-cherry)', margin: 0 }}>
                {photos[selectedIdx].caption}
              </p>
              <p style={{ fontSize: '0.84rem', color: '#6B7280', marginTop: '4px' }}>
                {photos[selectedIdx].subCaption}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: '14px' }}>
              <button
                onClick={() => setSelectedIdx((prev) => (prev - 1 + photos.length) % photos.length)}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              >
                ← Prev
              </button>
              <button
                onClick={(e) => rotateCurrentPhoto(selectedIdx, e)}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              >
                Rotate ⟳
              </button>
              <button
                onClick={() => setSelectedIdx((prev) => (prev + 1) % photos.length)}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

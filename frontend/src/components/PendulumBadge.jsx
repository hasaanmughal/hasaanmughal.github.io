import React, { useEffect, useRef, useState } from 'react';
import { createPendulumEngine } from '../physics/pendulumEngine';
import './PendulumBadge.css';

const PendulumBadge = () => {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const [state, setState] = useState(null);
  const [staticMode, setStaticMode] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => setTheme(root.getAttribute('data-theme') || 'dark');

    updateTheme();
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          updateTheme();
        }
      }
    });

    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setStaticMode(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !engineRef.current) {
          engineRef.current = createPendulumEngine(container, setState);
        } else if (!entry.isIntersecting && engineRef.current) {
          engineRef.current.destroy();
          engineRef.current = null;
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    let activePointerId = null;

    const releaseDrag = () => {
      if (activePointerId === null) return;
      activePointerId = null;
      engineRef.current?.endDrag();
    };

    const handlePointerDown = (event) => {
      if (!engineRef.current) return;
      const target = event.target;
      if (!target.closest('.pendulum-card') && !target.closest('.pendulum-rope') && !target.closest('.pendulum-rope-line')) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      engineRef.current.startDrag(x, y);
      activePointerId = event.pointerId;
      event.preventDefault();
    };

    const handlePointerMove = (event) => {
      if (!engineRef.current || activePointerId !== event.pointerId) return;
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      engineRef.current.moveDrag(x, y);
    };

    const handlePointerUp = (event) => {
      if (activePointerId !== event.pointerId) return;
      releaseDrag();
    };

    const handleWindowBlur = () => {
      releaseDrag();
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerUp);
    document.addEventListener('mouseup', handlePointerUp);

    return () => {
      observer.disconnect();
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerUp);
      document.removeEventListener('mouseup', handlePointerUp);
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, []);

  const badgeImage = theme === 'light' ? '/chainlocket-lightmodeimg.jpeg' : '/chainlocket.jpg.jpeg';

  if (staticMode) {
    return (
      <div className="pendulum-badge pendulum-badge--static" ref={containerRef}>
        <div className="pendulum-strap pendulum-strap--static" />
        <div className="pendulum-clip" />
        <div className="pendulum-card">
          <img className="pendulum-photo" src={badgeImage} alt="Chain locket" loading="lazy" />
        </div>
      </div>
    );
  }

  const ropePoints = state?.ropePoints;
  const badge = state?.badge;

  const badgeTop = badge
    ? {
        x: badge.x + Math.sin(badge.angle) * (190 / 2),
        y: badge.y - Math.cos(badge.angle) * (190 / 2),
      }
    : null;

  const strapPath =
    ropePoints && ropePoints.length > 1
      ? `M ${ropePoints.map((p) => `${p.x},${p.y}`).join(' L ')}`
      : '';

  return (
    <div className="pendulum-badge" ref={containerRef}>
      {strapPath && (
        <svg className="pendulum-rope" aria-hidden="true">
          <path d={strapPath} className="pendulum-rope-line" />
        </svg>
      )}
      {badge && badgeTop && (
        <>
          <div
            className="pendulum-clip"
            style={{
              left: badgeTop.x,
              top: badgeTop.y,
              transform: `translate(-50%, -100%) rotate(${badge.angle}rad)`,
            }}
          />
          <div
            className="pendulum-card"
            style={{
              left: badgeTop.x,
              top: badgeTop.y,
              transform: `translate(-50%, 0) rotate(${badge.angle}rad)`,
            }}
          >
            <img className="pendulum-photo" src={badgeImage} alt="Chain locket" loading="lazy" />
          </div>
        </>
      )}
    </div>
  );
};

export default PendulumBadge;

import React, { useEffect, useState } from 'react';
import './IntroOverlay.css';

const greetings = [
  { label: 'Marhaba', native: 'مرحبًا' },
  { label: 'Nǐ hǎo', native: '你好' },
  { label: 'Hello', native: '' },
  { label: 'Bonjour', native: '' },
  { label: 'Ciao', native: '' },
  { label: 'Konnichiwa', native: 'こんにちは' },
  { label: 'Hola', native: '' },
  { label: 'Assalāmu Alaykum', native: 'السلام عليكم' },
];

const IntroOverlay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const currentGreeting = greetings[currentIndex];

  useEffect(() => {
    const displayDuration = 160;
    const cycleLength = greetings.length;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= cycleLength) {
          clearInterval(interval);
          setIsExiting(true);
          return prev;
        }
        return nextIndex;
      });
    }, displayDuration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!isExiting) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, [isExiting]);

  if (isReady) {
    return null;
  }

  return (
    <div className={`intro-overlay${isExiting ? ' intro-overlay--exit' : ''}`}>
      <div className="intro-overlay__content">
        <p key={currentIndex} className="intro-overlay__greeting">
          {currentGreeting.label}.
        </p>
        {currentGreeting.native ? (
          <p className="intro-overlay__native">{currentGreeting.native}</p>
        ) : null}
      </div>
    </div>
  );
};

export default IntroOverlay;

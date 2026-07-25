import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import { useNavTheme } from './hooks/useNavTheme';
import './index.css';

function App() {
  const heroRef = useRef(null);
  const stage6Ref = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { mode, theme } = useNavTheme({ hero: heroRef, stage6: stage6Ref });
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollProgress(nextProgress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleNavigation = (path, hash) => {
    if (path) {
      navigate(path);
    }

    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const cloudState = scrollProgress < 0.3 ? 'hero' : scrollProgress < 0.7 ? 'canvas' : 'contact';

  return (
    <>
      <Navigation
        navMode={mode}
        theme={theme}
        route="/"
        onNavigate={handleNavigation}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage heroRef={heroRef} stage6Ref={stage6Ref} cloudState={cloudState} />
          }
        />
        <Route
          path="/about"
          element={<AboutPage stage6Ref={stage6Ref} />}
        />
      </Routes>
    </>
  );
}

export default App;

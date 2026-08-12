import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import IntroOverlay from './components/IntroOverlay';
import { useNavTheme } from './hooks/useNavTheme';
import './index.css';

const routeMeta = {
  '/': {
    title: 'Hassaan Mughal | AI Engineer & Full-Stack Developer',
    description: 'Portfolio of Hassaan Mughal, an AI engineer and full-stack developer specializing in optimized MERN backends and high-impact web experiences.',
  },
  '/about': {
    title: 'About Hassaan Mughal | AI Engineer & Full-Stack Developer',
    description: 'Learn more about Hassaan Mughal, his education, skills, capabilities, and professional background.',
  },
};

function App() {
  const heroRef = useRef(null);
  const stage2Ref = useRef(null);
  const stage6Ref = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroReveal, setHeroReveal] = useState(0);
  const { mode } = useNavTheme({ hero: heroRef, stage6: stage6Ref });
  const navigate = useNavigate();
  const location = useLocation();
  const normalizedPath = useMemo(
    () => location.pathname.replace(/\/+$|^$/, '/') || '/',
    [location.pathname],
  );

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollProgress(nextProgress);

      const hero = heroRef.current;
      const stage2 = stage2Ref.current;
      if (!hero || !stage2) {
        setHeroReveal(0);
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const stage2Rect = stage2.getBoundingClientRect();
      const stage2Starts = stage2Rect.top <= window.innerHeight * 0.95;

      setHeroReveal(stage2Starts ? 1 : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const route = routeMeta[normalizedPath] || routeMeta['/'];
    const canonicalUrl = `${window.location.origin}${normalizedPath}${location.hash || ''}`;

    document.title = route.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', route.description);
    }

    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', canonicalUrl);
    }

    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', route.title);
    }

    const ogDescriptionTag = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionTag) {
      ogDescriptionTag.setAttribute('content', route.description);
    }

    const ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (ogUrlTag) {
      ogUrlTag.setAttribute('content', canonicalUrl);
    }

    const twitterTitleTag = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleTag) {
      twitterTitleTag.setAttribute('content', route.title);
    }

    const twitterDescriptionTag = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescriptionTag) {
      twitterDescriptionTag.setAttribute('content', route.description);
    }

    const structuredDataTag = document.getElementById('structured-data');
    if (structuredDataTag) {
      structuredDataTag.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            name: 'Hassaan Mughal',
            jobTitle: 'AI Engineer & Full-Stack Developer',
            url: canonicalUrl,
            sameAs: [
              'https://github.com/cookhassaanmughal',
              'https://www.linkedin.com/in/hassaan-mughal-605603249/',
              'https://www.instagram.com/hasaannmughal/',
              'https://x.com/hassaanmughal_',
            ],
            description: route.description,
          },
          {
            '@type': 'WebSite',
            name: 'Hassaan Mughal Portfolio',
            url: canonicalUrl,
            about: {
              '@type': 'Person',
              name: 'Hassaan Mughal',
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: `${window.location.origin}/?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          },
        ],
      });
    }
  }, [location.pathname, location.hash, routeMeta]);

  const handleNavigation = (path, hash) => {
    if (path) {
      navigate(path);
    }

    setTimeout(() => {
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (path) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const cloudState = scrollProgress < 0.3 ? 'hero' : scrollProgress < 0.7 ? 'canvas' : 'contact';

  return (
    <>
      <IntroOverlay />
      <Navigation
        navMode={mode}
        route="/"
        heroReveal={heroReveal}
        onNavigate={handleNavigation}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage heroRef={heroRef} stage2Ref={stage2Ref} stage6Ref={stage6Ref} cloudState={cloudState} heroReveal={heroReveal} onNavigate={handleNavigation} />
          }
        />
        <Route
          path="/about/*"
          element={<AboutPage stage6Ref={stage6Ref} onNavigate={handleNavigation} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

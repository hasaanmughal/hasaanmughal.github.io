import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { applySlashRule, applyGlyphInversion } from '../utils/textUtils';
import './Navigation.css';

const NavLink = ({ href, label, onClick }) => (
  <Link
    to={href}
    className="nav-link"
    onClick={(event) => {
      if (onClick) {
        event.preventDefault();
        onClick();
      }
    }}
  >
    {applySlashRule(label)}
  </Link>
);

const Navigation = ({ navMode = 'spread', route = '/', heroReveal = 0, onNavigate = () => {} }) => {
  const location = useLocation();
  const isAbout = location.pathname === '/about';
  const isHome = route === '/';
  const isHeroCollapsed = isHome && heroReveal > 0.05;
  const handleNavigate = (path, hash) => () => onNavigate(path, hash);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const themeToggleButton = (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        /* Sun Icon for switching to light mode */
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon Icon for switching to dark mode */
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );

  if (isAbout) {
    return (
      <nav className="navigation navigation--about navigation--branded" style={{ backgroundColor: theme === 'light' ? 'rgba(224,224,224,0.85)' : 'rgba(0,0,0,0.75)' }}>
        <div className="navigation__inner navigation__inner--branded about-nav-inner">
          <div className="nav-slot nav-slot--start about-nav-group">
            <NavLink href="/" label="HASSAAN" onClick={handleNavigate('/', '#hero')} />
          </div>
          <div className="nav-slot nav-slot--end about-nav-group">
            <NavLink href="/" label="PROJECTS" onClick={handleNavigate('/', '#projects')} />
            <NavLink href="/about" label="CONTACT" onClick={handleNavigate('/about', '#about-hero')} />
            {themeToggleButton}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`navigation navigation--spread${isAbout ? ' navigation--about' : ''}${isHeroCollapsed ? ' navigation--hero-collapsed' : ''}`}>
      <div className="navigation__inner navigation__inner--spread">
        <div className="nav-slot nav-slot--start">
          <NavLink href="/about" label="ABOUT ME" onClick={handleNavigate('/about')} />
        </div>
        <div className="nav-slot nav-slot--center">
          <NavLink href="/" label="ALL PROJECTS" onClick={handleNavigate('/', '#projects')} />
        </div>
        <div className="nav-slot nav-slot--end">
          <NavLink href="/about" label="CONTACT" onClick={handleNavigate('/about', '#about-hero')} />
          {themeToggleButton}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

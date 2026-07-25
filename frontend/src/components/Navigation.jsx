import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { applySlashRule, applyGlyphInversion } from '../utils/textUtils';
import { getNavColors } from '../hooks/useNavTheme';
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

const Navigation = ({ navMode = 'spread', theme = 'dark', route = '/', onNavigate = () => {} }) => {
  const location = useLocation();
  const isAbout = location.pathname === '/about';
  const handleNavigate = (path, hash) => () => onNavigate(path, hash);

  if (isAbout) {
    const { bg } = getNavColors(theme);
    return (
      <nav className="navigation navigation--about navigation--branded" style={{ backgroundColor: bg }}>
        <div className="navigation__inner navigation__inner--branded about-nav-inner">
          <div className="nav-slot nav-slot--start about-nav-group">
            <NavLink href="/" label="HASSAAN" onClick={handleNavigate('/', '#hero')} />
          </div>
          <div className="nav-slot nav-slot--end about-nav-group">
            <NavLink href="/" label="PROJECTS" onClick={handleNavigate('/', '#projects')} />
            <NavLink href="/" label="CONTACT" onClick={handleNavigate('/', '#contact')} />
          </div>
        </div>
      </nav>
    );
  }

  if (navMode === 'spread') {
    return (
      <nav className={`navigation navigation--spread${isAbout ? ' navigation--about' : ''}`}>
        <div className="navigation__inner navigation__inner--spread">
          <div className="nav-slot nav-slot--start">
            <NavLink href="/about" label="ABOUT ME" onClick={handleNavigate('/about')} />
          </div>
          <div className="nav-slot nav-slot--center">
            <NavLink href="/" label="ALL PROJECTS" onClick={handleNavigate('/', '#projects')} />
          </div>
          <div className="nav-slot nav-slot--end">
            <NavLink href="/" label="CONTACT" onClick={handleNavigate('/', '#contact')} />
          </div>
        </div>
      </nav>
    );
  }

  const { color, bg } = getNavColors(theme);

  return (
    <nav
      className={`navigation navigation--branded${isAbout ? ' navigation--about' : ''}`}
      style={{ color, backgroundColor: bg }}
    >
      <div className="navigation__inner navigation__inner--branded">
        <Link
          to="/"
          className="nav-logo display-text"
          onClick={(event) => {
            event.preventDefault();
            onNavigate('/', '#hero');
          }}
        >
          {applyGlyphInversion('HASSAAN')}
        </Link>
        <div className="nav-group">
          <NavLink href="/about" label="ABOUT ME" onClick={handleNavigate('/about')} />
          <NavLink href="/" label="ALL PROJECTS" onClick={handleNavigate('/', '#projects')} />
          <NavLink href="/" label="CONTACT" onClick={handleNavigate('/', '#contact')} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

import { useEffect, useState, useRef } from 'react';

export function useNavTheme(sections) {
  const [state, setState] = useState({ mode: 'spread', theme: 'dark' });
  const stateRef = useRef({ mode: 'spread', theme: 'dark' });
  const frameRef = useRef(null);

  useEffect(() => {
    const compute = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const prev = stateRef.current.theme;

      const heroEnd =
        (sections.hero?.current?.offsetTop ?? 0) +
        (sections.hero?.current?.offsetHeight ?? vh);
      const stage6Top = sections.stage6?.current?.offsetTop ?? Infinity;

      const enterLight = heroEnd - vh * 0.35;
      const exitLight = heroEnd - vh * 0.55;
      const enterDark = stage6Top - vh * 0.25;
      const exitDark = stage6Top - vh * 0.45;

      let next;

      if (prev === 'dark') {
        if (scrollY >= enterLight) {
          next = scrollY >= enterDark
            ? { mode: 'branded', theme: 'inverted' }
            : { mode: 'branded', theme: 'light' };
        } else {
          next = { mode: 'spread', theme: 'dark' };
        }
      } else if (prev === 'light') {
        if (scrollY < exitLight) {
          next = { mode: 'spread', theme: 'dark' };
        } else if (scrollY >= enterDark) {
          next = { mode: 'branded', theme: 'inverted' };
        } else {
          next = { mode: 'branded', theme: 'light' };
        }
      } else {
        if (scrollY < exitDark) {
          next =
            scrollY < exitLight
              ? { mode: 'spread', theme: 'dark' }
              : { mode: 'branded', theme: 'light' };
        } else {
          next = { mode: 'branded', theme: 'inverted' };
        }
      }

      if (
        next.theme !== stateRef.current.theme ||
        next.mode !== stateRef.current.mode
      ) {
        stateRef.current = next;
        setState(next);
      }
    };

    const schedule = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        compute();
      });
    };

    compute();
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [sections.hero, sections.stage6]);

  return state;
}

export function getNavColors(theme) {
  switch (theme) {
    case 'light':
      return { color: '#000000', bg: 'rgba(255,255,255,0.85)' };
    case 'inverted':
      return { color: '#FFFFFF', bg: 'rgba(0,0,0,0.55)' };
    default:
      return { color: '#FFFFFF', bg: 'rgba(0,0,0,0)' };
  }
}

/**
 * Shared state/helpers for the page-load intro, kept out of the component file
 * so both IntroSequence and the hero (HomeSection) can import them without
 * breaking React Fast Refresh.
 */

export const INTRO_SESSION_KEY = 'intro-played';

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const forceReplay = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    new URLSearchParams(window.location.search).get('intro') === '1' ||
    localStorage.getItem('force-intro') === '1'
  );
};

/** Whether the intro will actually animate on this load (vs. skip to the hero). */
export const willIntroPlay = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (forceReplay()) return true;
  if (sessionStorage.getItem(INTRO_SESSION_KEY) === '1') return false;
  return !prefersReducedMotion();
};

let handoffFired = false;

/** Fire the global hero-handoff signal exactly once per load. */
export const fireHandoff = (): void => {
  if (handoffFired) return;
  handoffFired = true;
  window.dispatchEvent(new CustomEvent('intro:complete'));
};

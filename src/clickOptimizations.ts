// Global click optimizations: prevent accidental double-clicks and improve touch responsiveness
// This file is imported once from `index.tsx` and sets up delegated handlers.

type AnyElement = Element | null;

const DOUBLE_CLICK_BLOCK_MS = 450;

function isClickable(el: AnyElement) {
  if (!el) return false;
  const tag = (el as HTMLElement).tagName?.toLowerCase();
  if (!tag) return false;
  if (tag === 'button' || tag === 'a' || el?.getAttribute?.('role') === 'button') return true;
  // elements with data-clickable attribute are considered clickable
  if ((el as HTMLElement).hasAttribute && (el as HTMLElement).hasAttribute('data-clickable')) return true;
  return false;
}

function findClickableAncestor(target: AnyElement): AnyElement {
  let el = target as Element | null;
  while (el && el !== document.documentElement) {
    if (isClickable(el)) return el;
    el = el.parentElement;
  }
  return null;
}

export function installClickOptimizations() {
  try {
    // Set global hint for touch-action to reduce click delay on some browsers
    try { document.documentElement.style.touchAction = 'manipulation'; } catch (e) {}

    // Delegated click handler to prevent accidental/double clicks
    document.addEventListener('click', (ev) => {
      const target = ev.target as Element | null;
      const clickable = findClickableAncestor(target);
      if (!clickable) return;

      // Respect explicit opt-out
      if (clickable.hasAttribute('data-allow-double')) return;

      // If already temporarily disabled, block the click
      if (clickable.getAttribute('data-temp-disabled') === '1') {
        ev.stopImmediatePropagation();
        ev.preventDefault();
        return;
      }

      // Temporarily mark as disabled to block rapid repeated clicks
      clickable.setAttribute('data-temp-disabled', '1');
      clickable.setAttribute('aria-disabled', 'true');
      setTimeout(() => {
        clickable.removeAttribute('data-temp-disabled');
        clickable.removeAttribute('aria-disabled');
      }, DOUBLE_CLICK_BLOCK_MS);
    }, true);

    // Improve touch responsiveness on some older browsers by adding passive touchstart
    // (modern browsers support passive by default). We add a noop listener to ensure
    // the browser treats touchstart as passive where appropriate.
    try {
      const noop = () => {};
      window.addEventListener('touchstart', noop, { passive: true });
    } catch (e) {
      // ignore
    }
  } catch (err) {
    // Defensive: do not let errors break the app
    // eslint-disable-next-line no-console
    console.error('Failed to install click optimizations', err);
  }
}

export default installClickOptimizations;

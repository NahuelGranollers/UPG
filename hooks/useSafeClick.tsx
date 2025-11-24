import { useCallback, useRef } from 'react';

/**
 * Hook que envuelve un handler para prevenir clicks rápidos/dobles.
 * Uso: const onClick = useSafeClick(async () => { ... });
 */
export default function useSafeClick<T extends (...args: any[]) => any>(
  fn: T,
  ms = 450
) {
  const lockRef = useRef(false);

  const cb = useCallback((...args: any[]) => {
    if (lockRef.current) return;
    lockRef.current = true;
    try {
      const res = (fn as any)(...args);
      // If handler returns a promise, wait for it before unlocking (but enforce timeout)
      if (res && typeof res.then === 'function') {
        Promise.race([res, new Promise((r) => setTimeout(r, ms))]).finally(() => {
          lockRef.current = false;
        });
      } else {
        setTimeout(() => (lockRef.current = false), ms);
      }
    } catch (e) {
      setTimeout(() => (lockRef.current = false), ms);
      throw e;
    }
  }, [fn, ms]);

  return cb as unknown as T;
}

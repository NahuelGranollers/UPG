import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';
import { getBackendUrl } from '../utils/config';

export default function CookieClicker() {
  const { currentUser, isAuthenticated, loginWithDiscord } = useAuth();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoClicker, setAutoClicker] = useState(0); // number of auto-clickers
  const [upgradeCost, setUpgradeCost] = useState(50);
  const [cookieAnim, setCookieAnim] = useState(false);
  const autoClickerInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchProgress() {
      if (!isAuthenticated || !currentUser?.id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${getBackendUrl()}/api/cookie-clicker/progress?discordId=${currentUser.id}`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setCount(data.count || 0);
      } catch (e: any) {
        setError(e.message || 'Error al cargar progreso');
        setCount(0);
      }
      setLoading(false);
    }
    fetchProgress();
    // Cleanup auto-clicker on unmount
    return () => {
      if (autoClickerInterval.current) clearInterval(autoClickerInterval.current);
    };
  }, [isAuthenticated, currentUser?.id]);

  useEffect(() => {
    // Start auto-clicker if purchased
    if (autoClicker > 0) {
      if (autoClickerInterval.current) clearInterval(autoClickerInterval.current);
      autoClickerInterval.current = setInterval(() => {
        setCount(prev => {
          const newCount = prev + autoClicker;
          saveProgress(newCount);
          return newCount;
        });
      }, 1000);
    } else {
      if (autoClickerInterval.current) clearInterval(autoClickerInterval.current);
    }
    return () => {
      if (autoClickerInterval.current) clearInterval(autoClickerInterval.current);
    };
    // eslint-disable-next-line
  }, [autoClicker]);

  async function saveProgress(newCount: number) {
    if (!isAuthenticated || !currentUser?.id) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${getBackendUrl()}/api/cookie-clicker/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discordId: currentUser.id, count: newCount }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Error al guardar progreso');
    } catch (e: any) {
      setError(e.message || 'Error al guardar progreso');
    }
    setSaving(false);
  }

  function handleClick() {
    const newCount = count + 1;
    setCount(newCount);
    saveProgress(newCount);
    setCookieAnim(true);
    setTimeout(() => setCookieAnim(false), 250);
  }

  function handleBuyAutoClicker() {
    if (count < upgradeCost) return;
    setCount(count - upgradeCost);
    setAutoClicker(autoClicker + 1);
    setUpgradeCost(Math.floor(upgradeCost * 1.5));
    saveProgress(count - upgradeCost);
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center">
        <button
          className="bg-discord-blurple text-white font-bold rounded-full p-4 mb-4"
          onClick={loginWithDiscord}
        >Iniciar sesión con Discord</button>
        <div className="text-gray-500">Debes iniciar sesión para jugar y guardar tu progreso.</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className={clsx(
          "bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-full p-8 shadow-lg text-4xl mb-4 transition-transform duration-200",
          cookieAnim && "animate-bounce scale-110"
        )}
        onClick={handleClick}
        disabled={loading || saving}
        aria-label="Click the cookie"
        style={{ boxShadow: '0 0 24px 4px #facc15' }}
      >🍪</button>
      <div className="text-xl font-bold mb-2 text-yellow-900">+1</div>
      <div className="text-xl font-bold mb-2 text-yellow-900">Cookies: {count}</div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}

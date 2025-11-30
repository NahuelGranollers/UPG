import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';
import { getBackendUrl } from '../utils/config';

export default function CookieClicker() {
  const { currentUser } = useAuth();
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
      if (!currentUser?.id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${getBackendUrl()}/api/cookie-clicker/progress?discordId=${currentUser.id}`);
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
  }, [currentUser?.id]);

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
    if (!currentUser?.id) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${getBackendUrl()}/api/cookie-clicker/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discordId: currentUser.id, count: newCount })
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

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-4 text-yellow-700 drop-shadow">Cookie Clicker</h2>
      {currentUser && (
        <div className="flex items-center mb-2">
          {currentUser.avatar && (
            <img src={currentUser.avatar} alt="avatar" className="w-8 h-8 rounded-full mr-2 border-2 border-yellow-400" />
          )}
          <span className="font-semibold text-lg text-yellow-800">{currentUser.username}</span>
        </div>
      )}
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
      <div className="text-xl font-bold mb-2 text-yellow-900">Cookies: {count}</div>
      <div className="w-full max-w-xs mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-yellow-800">Auto-Clicker</span>
          <span className="text-sm text-yellow-800">{upgradeCost} cookies</span>
        </div>
        <div className="w-full h-3 bg-yellow-300 rounded-full overflow-hidden">
          <div
            className="h-3 bg-blue-400 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (count / upgradeCost) * 100)}%` }}
          />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded px-4 py-2 mb-2 shadow"
        onClick={handleBuyAutoClicker}
        disabled={count < upgradeCost || loading || saving}
        aria-label="Buy auto-clicker"
      >Comprar Auto-Clicker</button>
      <div className="text-sm text-blue-700 mb-2">Auto-Clickers: {autoClicker}</div>
      {loading && <div className="text-sm text-gray-400">Cargando progreso...</div>}
      {saving && <div className="text-sm text-gray-400">Guardando...</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
}

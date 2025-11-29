export const getBackendUrl = () => {
  // If a specific URL is defined in env (e.g. production build), use it
  if (import.meta.env.VITE_API_URL && !import.meta.env.DEV) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In development, or if no env var, construct from window location
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  
  // If we are on localhost, assume backend is on 5000
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000';
  }
  
  // Production domain check
  if (hostname.includes('unaspartidillas.online')) {
      return 'https://api.unaspartidillas.online';
  }

  // LAN / Network access / Public IP
  // Assume backend is on the same host, port 5000
  return `${protocol}//${hostname}:5000`;
};

export const getSocketUrl = () => {
    return getBackendUrl();
};

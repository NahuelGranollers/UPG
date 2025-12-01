export const getBackendUrl = () => {
  let url;
  // If a specific URL is defined in env (e.g. production build), use it
  if (import.meta.env.VITE_API_URL && !import.meta.env.DEV) {
    url = import.meta.env.VITE_API_URL;
  } else {
    // In development, or if no env var, construct from window location
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    
    // If we are on localhost, assume backend is on 5000
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        url = 'http://localhost:5000';
    }
    // Production domain check
    else if (hostname.includes('unaspartidillas.online')) {
        url = 'https://api.unaspartidillas.online';
    }
    // LAN / Network access / Public IP
    else {
        // Assume backend is on the same host, port 5000
        url = `${protocol}//${hostname}:5000`;
    }
  }
  
  console.log(`[Config] Backend URL resolved to: ${url}`);
  return url;
};

export const getSocketUrl = () => {
    return getBackendUrl();
};

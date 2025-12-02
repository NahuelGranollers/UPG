export const getBackendUrl = () => {
  let url;
  // If a specific URL is defined in env (e.g. production build), use it
  if (import.meta.env.VITE_API_URL && !import.meta.env.DEV) {
    url = import.meta.env.VITE_API_URL;
  } else {
    // Always use the remote API for now
    url = 'https://api.unaspartidillas.online';
  }
  
  console.log(`[Config] Backend URL resolved to: ${url}`);
  return url;
};

export const getSocketUrl = () => {
    return getBackendUrl();
};

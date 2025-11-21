import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  // Para GitHub Pages con dominio personalizado, base debe ser '/'
  // Si usas un subdirectorio en GitHub Pages, cambia a '/nombre-repo/'
  const base = process.env.GITHUB_PAGES_BASE || '/';

  // En GitHub Actions, las variables de entorno pueden venir con prefijo VITE_
  const geminiApiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || '';

  // Firebase config (las variables VITE_ se exponen automáticamente al cliente)
  // No necesitamos definirlas aquí, Vite las expone automáticamente con import.meta.env

  return {
    base,
    server: {
      port: 5173,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(geminiApiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(geminiApiKey)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      // Asegurar que las rutas funcionen correctamente en GitHub Pages
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  };
});

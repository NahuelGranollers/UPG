<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# UPG Community Hub

Aplicación de chat estilo Discord para la comunidad UPG (United Player Group).

## 🚀 Desarrollo Local

**Prerrequisitos:** Node.js 20 o superior

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar la API Key de Gemini:
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega: `GEMINI_API_KEY=tu_api_key_aqui`

3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador: `http://localhost:3000`

## 📦 Build para Producción

```bash
npm run build
```

El build se generará en la carpeta `dist/`.

## 🌐 Despliegue en GitHub Pages

1. **Configurar GitHub Pages:**
   - Ve a Settings > Pages en tu repositorio
   - Selecciona la rama `main` (o `gh-pages` si prefieres)
   - Selecciona la carpeta `/ (root)` o `/docs` si usas docs
   - Si usas dominio personalizado, configura el CNAME

2. **Configurar el base path (si es necesario):**
   - Si tu repositorio NO está en la raíz de GitHub Pages, edita `vite.config.ts`
   - Cambia `base: '/'` a `base: '/nombre-repo/'`

3. **Build y deploy:**
   ```bash
   npm run build
   ```
   
   Luego:
   - Si usas GitHub Actions: configura un workflow para hacer build automático
   - Si usas manual: copia el contenido de `dist/` a la rama `gh-pages` o carpeta `docs/`

4. **Variables de entorno en GitHub Pages:**
   - GitHub Pages no soporta variables de entorno del lado del servidor
   - Para la API Key de Gemini, necesitarás usar GitHub Secrets si usas Actions
   - O configurar la API Key en el código (no recomendado para producción)

## 📝 Notas

- La aplicación usa `BroadcastChannel` para sincronización entre pestañas (no requiere servidor)
- Los mensajes se guardan en `localStorage`
- La API de Gemini se ejecuta desde el cliente (requiere API Key configurada)

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera el build de producción
- `npm run preview` - Previsualiza el build de producción localmente

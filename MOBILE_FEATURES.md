# Funcionalidades Móviles - UPG Community

## 🎨 Interfaz Móvil Adaptativa

### Navegación por Pestañas
La aplicación ahora cuenta con un sistema de pestañas optimizado para dispositivos móviles:

#### **3 Pestañas Principales:**
1. **Canales** 📋 - Lista de canales y sidebar
2. **Chat** 💬 - Conversación principal
3. **Usuarios** 👥 - Lista de usuarios online/offline

### 📱 Controles Táctiles

#### **Cambio por Gestos de Deslizamiento:**
- **Deslizar hacia la izquierda**: Avanza a la siguiente pestaña
  - Canales → Chat → Usuarios
- **Deslizar hacia la derecha**: Retrocede a la pestaña anterior
  - Usuarios → Chat → Canales

#### **Cambio por Toque:**
- Toca cualquier icono en la barra inferior para cambiar directamente a esa pestaña

### 🎯 Características Destacadas

#### **Animaciones Suaves**
- Transiciones fluidas entre pestañas (300ms)
- Efectos de escala en iconos activos
- Indicador visual superior en pestaña activa

#### **Feedback Visual**
- Icono activo más grande (scale-110)
- Barra blanca superior en pestaña seleccionada
- Cambio de color de texto (blanco/gris)

#### **Optimización de Espacio**
- Barra de pestañas fija en la parte inferior (64px)
- Contenido ocupa toda la altura de pantalla
- Safe-area support para dispositivos con notch

#### **Lista de Usuarios Móvil**
- Vista completa en pestaña dedicada
- Usuarios offline mostrados en blanco y negro
- Secciones colapsables: Disponible, Bots, Desconectados

### 🔧 Optimizaciones Técnicas

#### **Viewport Dinámico**
```css
height: 100dvh; /* Se adapta a barras del navegador móvil */
```

#### **Prevención de Comportamientos No Deseados**
- Deshabilitado pull-to-refresh
- Prevención de selección de texto al deslizar
- Eliminado highlight al tocar elementos

#### **Safe Area Support**
Compatible con dispositivos iPhone X+ y Android con notch:
```css
--safe-area-inset-top
--safe-area-inset-bottom
--safe-area-inset-left
--safe-area-inset-right
```

### 📐 Breakpoints Responsive

- **Móvil**: < 768px (md)
  - Layout de pestañas
  - Controles táctiles habilitados
  - Barra de navegación inferior
  
- **Desktop**: ≥ 768px (md)
  - Layout tradicional con sidebar
  - Todas las secciones visibles simultáneamente
  - Sin barra de pestañas

### 🎨 Componentes Nuevos

#### `MobileTabBar.tsx`
Barra de navegación inferior con 3 pestañas:
- Iconos animados
- Contador de mensajes no leídos (futuro)
- Indicador visual de pestaña activa

#### `hooks/useSwipe.ts`
Hook personalizado para detectar gestos de deslizamiento:
- Threshold configurable (50px por defecto)
- Detección de dirección (horizontal/vertical)
- Soporte para 4 direcciones: left, right, up, down

### 🚀 Uso

La interfaz móvil se activa automáticamente en pantallas menores a 768px de ancho. No requiere configuración adicional.

**Para probar:**
1. Abre DevTools (F12)
2. Activa modo responsive (Ctrl+Shift+M)
3. Selecciona un dispositivo móvil
4. Desliza o toca para navegar entre pestañas

### ⚡ Performance

- Transiciones CSS con GPU acceleration
- Lazy rendering: solo la pestaña activa está visible
- Pointer-events: none en pestañas inactivas
- Sin re-renders innecesarios (useCallback, useMemo)

---

**Versión**: 2.0  
**Fecha**: Noviembre 2025  
**Optimizado para**: iOS Safari, Chrome Mobile, Firefox Mobile

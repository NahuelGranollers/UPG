# 🎯 Sistema de Menciones y Resaltado

## ✅ Funcionalidades Implementadas

### **1. Autocompletado de Menciones (@)**

#### **Activación:**

- Escribe `@` en cualquier parte del mensaje
- Aparece un panel desplegable automáticamente

#### **Listado de Usuarios:**

- ✅ **Bot UPG** (siempre disponible)
- ✅ **Usuarios en línea** (con indicador verde 🟢)
- ✅ **Usuarios desconectados** (con indicador gris ⚫)
- ✅ **Usuario actual** (marcado como "Tú")
- ✅ Todos los usuarios registrados

#### **Filtrado:**

- Escribe después del `@` para filtrar usuarios
- Ejemplo: `@na` → filtra usuarios que contengan "na"
- Case-insensitive (no distingue mayúsculas/minúsculas)

#### **Navegación:**

- **Flechas ↑↓** - Navegar por la lista
- **Tab** - Autocompletar selección
- **Enter** - Autocompletar selección (si el panel está abierto)
- **Click** - Autocompletar usuario clickeado
- **Escape** - Cerrar panel

#### **Indicadores Visuales:**

- 🟢 Usuario en línea
- ⚫ Usuario desconectado
- Badge "BOT" para el bot
- Badge "Tú" para el usuario actual
- Badge "Tab" en la opción seleccionada

---

### **2. Resaltado de Mensajes con Menciones**

#### **Detección:**

- Detecta automáticamente `@username` en los mensajes
- Compara con el username del usuario actual

#### **Resaltado de Mensaje Completo:**

Cuando te mencionan:

- 🟡 **Fondo amarillo translúcido** (`bg-yellow-500/10`)
- 📍 **Borde izquierdo amarillo** de 4px
- 🏷️ **Badge "MENCIÓN"** amarillo en el header del mensaje
- ✨ **Hover mejorado** (`bg-yellow-500/15`)

#### **Resaltado de @Menciones en el Texto:**

- **Tu propio nombre** cuando te mencionan:
  - Color azul claro (`text-blue-400`)
  - Fondo azul translúcido (`bg-blue-500/20`)
  - Redondeado con padding
- **Otras menciones:**
  - Color azul (`text-blue-300`)
  - Hover con subrayado
  - Cursor pointer

---

### **3. Feedback Visual del Bot**

#### **Indicador "Escribiendo...":**

Cuando mencionas `@UPG`:

- Avatar del bot
- 3 puntos animados (bounce effect)
- Texto "escribiendo..."
- Badge "BOT"
- Desaparece cuando llega la respuesta

#### **Glow en Input:**

- Ring azul brillante alrededor del input cuando escribes `@`
- Sombra animada mientras el panel está abierto

---

## 🎨 Estilos Aplicados

### **Panel de Menciones:**

```css
- Fondo: #2f3136
- Borde: border-gray-800
- Sombra: shadow-2xl
- Altura máxima: 64 (con scroll)
- Animación: fade-in + slide-in-from-bottom
- Z-index: 50
```

### **Mensaje con Mención:**

```css
- Fondo: bg-yellow-500/10
- Borde izquierdo: border-l-4 border-yellow-500
- Hover: bg-yellow-500/15
- Transición: transition-all
```

### **@Mención en Texto:**

```css
Tu nombre:
- text-blue-400
- bg-blue-500/20
- px-1 rounded

Otros:
- text-blue-300
- hover:underline
- cursor-pointer
```

---

## 🔧 Uso Técnico

### **Funciones Principales:**

#### `isMentioned(messageContent: string): boolean`

Detecta si un mensaje menciona al usuario actual.

```typescript
const mentioned = isMentioned(msg.content);
```

#### `highlightMentions(text: string): ReactNode`

Convierte menciones en elementos JSX resaltados.

```typescript
<p>{highlightMentions(msg.content)}</p>
```

#### `mentionableUsers`

Lista memoizada de todos los usuarios mencionables:

- Bot UPG (id: 'bot')
- Todos los usuarios del servidor (online + offline)
- Incluye el usuario actual

#### `mentionSuggestions`

Lista filtrada basada en lo que escribes después del `@`.

---

## 📝 Ejemplos de Uso

### **Mencionar al Bot:**

```
@UPG hola
@upg como estas
@UpG ayuda
```

### **Mencionar Usuarios:**

```
Hola @NahuelGranollers ¿qué tal?
@Usuario1 y @Usuario2 vengan al canal
```

### **Resultado:**

- Panel aparece al escribir `@`
- Filtra mientras escribes
- Autocompleta con Tab/Enter/Click
- Mensaje enviado con mención
- Destinatario ve el mensaje resaltado
- Su nombre aparece en azul con fondo

---

## 🚀 Mejoras Futuras Posibles

- [ ] Notificación sonora al ser mencionado
- [ ] Contador de menciones no leídas
- [ ] Scroll automático a mensajes con mención
- [ ] Menciones múltiples con sugerencias contextuales
- [ ] @everyone / @here para mencionar a todos
- [ ] Historial de menciones
- [ ] Búsqueda de menciones

---

## 🐛 Troubleshooting

### **Panel no aparece:**

- Verifica que escribiste `@`
- Comprueba que hay usuarios disponibles
- Revisa la consola del navegador (F12)

### **Menciones no se resaltan:**

- Asegúrate que el username es exacto
- Verifica que el mensaje contiene `@username`
- El espacio después de `@username` ayuda

### **Bot no responde:**

- Menciona: `@UPG` o `@upg`
- Revisa que el servidor está corriendo
- Verifica logs del servidor

---

**Última actualización:** 21 de noviembre de 2025

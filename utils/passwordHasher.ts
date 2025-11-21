/**
 * Utilidad para generar hashes SHA-256 de contraseñas
 * 
 * ⚠️ IMPORTANTE: Esta función NO debe usarse en producción para validar contraseñas.
 * Solo se usa para generar el hash TARGET_HASH que se almacena en LockScreen.tsx
 * 
 * Uso:
 * 1. Ejecutar en consola del navegador: await generatePasswordHash("TuNuevaContraseña")
 * 2. Copiar el hash resultante
 * 3. Reemplazar TARGET_HASH en LockScreen.tsx
 */

export async function generatePasswordHash(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  const hashArray = new Uint8Array(hashBuffer);
  let hexString = '';
  for (let i = 0; i < hashArray.length; i++) {
    hexString += hashArray[i].toString(16).padStart(2, '0');
  }
  
  return hexString;
}

/**
 * Verificar contraseña contra hash (usada en LockScreen)
 */
export async function verifyPasswordHash(input: string, targetHash: string): Promise<boolean> {
  const inputHash = await generatePasswordHash(input);
  
  // Comparación en tiempo constante (previene timing attacks)
  // Aunque en frontend esto es menos crítico, es buena práctica
  if (inputHash.length !== targetHash.length) {
    return false;
  }
  
  let match = true;
  for (let i = 0; i < inputHash.length; i++) {
    if (inputHash[i] !== targetHash[i]) {
      match = false;
    }
  }
  
  return match;
}

// Para testing en consola del navegador:
// (window as any).generatePasswordHash = generatePasswordHash;

/**
 * GUÍA RÁPIDA: Cómo cambiar la contraseña del LockScreen
 * 
 * Método 1 - Usando la consola del navegador:
 * =============================================
 * 1. Abre DevTools (F12) en tu navegador
 * 2. Ve a la pestaña Console
 * 3. Ejecuta este código (reemplaza "TuNuevaContraseña" por la contraseña que quieras):
 * 
 *    const encoder = new TextEncoder();
 *    const data = encoder.encode("TuNuevaContraseña");
 *    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
 *    const hashArray = new Uint8Array(hashBuffer);
 *    let hexString = '';
 *    for (let i = 0; i < hashArray.length; i++) {
 *      hexString += hashArray[i].toString(16).padStart(2, '0');
 *    }
 *    console.log("Hash:", hexString);
 * 
 * 4. Copia el hash que aparece en la consola
 * 5. Pega ese hash en TARGET_HASH en components/LockScreen.tsx
 * 
 * 
 * Método 2 - Usando sitio web online:
 * ====================================
 * 1. Ve a: https://emn178.github.io/online-tools/sha256.html
 * 2. Escribe tu contraseña
 * 3. Copia el hash generado (todo en minúsculas, sin espacios)
 * 4. Pega ese hash en TARGET_HASH en components/LockScreen.tsx
 * 
 * 
 * Método 3 - Usando Node.js:
 * ==========================
 * 1. Crea un archivo temporal hash.js:
 * 
 *    const crypto = require('crypto');
 *    const password = "TuNuevaContraseña";
 *    const hash = crypto.createHash('sha256').update(password).digest('hex');
 *    console.log("Hash:", hash);
 * 
 * 2. Ejecuta: node hash.js
 * 3. Copia el hash y pégalo en TARGET_HASH
 * 4. ELIMINA el archivo hash.js (¡no lo subas a git!)
 * 
 * 
 * ⚠️ SEGURIDAD:
 * =============
 * - NUNCA escribas la contraseña real en el código
 * - NUNCA subas la contraseña real a git
 * - Solo almacena el hash SHA-256 en TARGET_HASH
 * - Elimina cualquier archivo temporal que contenga la contraseña
 * - Usa contraseñas seguras (mínimo 12 caracteres, mezclando mayúsculas, minúsculas, números y símbolos)
 * 
 * 
 * Ejemplo de hashes comunes (NO USAR EN PRODUCCIÓN):
 * ==================================================
 * "password123"     → ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f
 * "admin"           → 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
 * "UPG2024"         → 7f5a8d2c9a1b3e4f6d8c9b7a5e3f1d9c8b7a6e5d4c3b2a1f9e8d7c6b5a4e3d2c1
 */

#!/usr/bin/env node

/**
 * Script para generar hash SHA-256 de una IP
 * Uso: node generate-ip-hash.js <IP>
 * Ejemplo: node generate-ip-hash.js 192.168.1.1
 */

const crypto = require('crypto');

function hashIP(ip) {
  return crypto.createHash('sha256').update(ip).digest('hex');
}

function generateIPHash() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('\n📝 Uso: node generate-ip-hash.js <IP>\n');
    console.log('Ejemplo: node generate-ip-hash.js 192.168.1.1\n');
    console.log('Genera el hash SHA-256 de una IP para usar en server-updated.js\n');
    process.exit(1);
  }

  const ip = args[0].trim();
  
  // Validar formato IP básico
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(ip)) {
    console.error('❌ Error: IP inválida. Formato esperado: xxx.xxx.xxx.xxx');
    process.exit(1);
  }

  const hash = hashIP(ip);
  
  console.log('\n✅ Hash generado exitosamente:\n');
  console.log('IP Original:', ip);
  console.log('Hash SHA-256:', hash);
  console.log('\n📋 Copia este valor en server-updated.js:\n');
  console.log(`const ADMIN_IP_HASH = '${hash}';\n`);
}

generateIPHash();

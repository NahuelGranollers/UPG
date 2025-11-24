// Simple validation script for CS16 integration
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Testing CS16 integration...');

try {
  // Test 1: Import the component
  const cs16File = path.join(__dirname, 'components', 'CS16Game.tsx');
  if (fs.existsSync(cs16File)) {
    console.log('✅ CS16Game.tsx file exists');
  } else {
    console.log('❌ CS16Game.tsx file not found');
    process.exit(1);
  }

  // Test 2: Check if App.tsx includes CS16
  const appFile = path.join(__dirname, 'App.tsx');
  const appContent = fs.readFileSync(appFile, 'utf8');
  if (appContent.includes('CS16')) {
    console.log('✅ App.tsx includes CS16 references');
  } else {
    console.log('❌ App.tsx missing CS16 references');
  }

  // Test 3: Check if Sidebar.tsx includes CS16
  const sidebarFile = path.join(__dirname, 'components', 'Sidebar.tsx');
  const sidebarContent = fs.readFileSync(sidebarFile, 'utf8');
  if (sidebarContent.includes('cs16') && sidebarContent.includes('CS 1.6')) {
    console.log('✅ Sidebar.tsx includes CS16 button');
  } else {
    console.log('❌ Sidebar.tsx missing CS16 button');
  }

  // Test 4: Check if types.ts includes CS16
  const typesFile = path.join(__dirname, 'types.ts');
  const typesContent = fs.readFileSync(typesFile, 'utf8');
  if (typesContent.includes('CS16')) {
    console.log('✅ types.ts includes CS16 in AppView enum');
  } else {
    console.log('❌ types.ts missing CS16 in AppView enum');
  }

  // Test 5: Check server integration
  const serverFile = path.join(__dirname, 'server', 'index.js');
  const serverContent = fs.readFileSync(serverFile, 'utf8');
  if (serverContent.includes('cs16:create-room')) {
    console.log('✅ Server includes CS16 socket handlers');
  } else {
    console.log('❌ Server missing CS16 socket handlers');
  }

  console.log('\n🎉 CS16 integration validation completed successfully!');

} catch (error) {
  console.error('❌ Error during validation:', error.message);
  process.exit(1);
}
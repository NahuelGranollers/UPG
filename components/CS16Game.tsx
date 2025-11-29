import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Menu, Upload, Play, AlertTriangle, Info } from 'lucide-react';

declare global {
  interface Window {
    Module: any;
    FS: any;
  }
}

export default function CS16Game({ 
  onClose,
  onOpenSidebar
}: { 
  onClose?: () => void;
  onOpenSidebar?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<string>('Esperando archivos del juego...');
  const [progress, setProgress] = useState<number>(0);
  const [engineReady, setEngineReady] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const [missingEngine, setMissingEngine] = useState(false);

  // Check if engine files exist (simple check by fetching head)
  useEffect(() => {
    Promise.all([
      fetch('/xash/xash3d.js', { method: 'HEAD' }),
      // Correct engine WASM filename
      fetch('/xash/xash3d.wasm', { method: 'HEAD' }),
      // Check dynamic library required by Xash
      fetch('/xash/filesystem_stdio.wasm', { method: 'HEAD' })
    ])
      .then(responses => {
        if (responses.some(res => !res.ok)) setMissingEngine(true);
      })
      .catch(() => setMissingEngine(true));
  }, []);

  const handleDirectorySelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setStatus('Cargando archivos al sistema de archivos virtual...');
    setEngineReady(false);
    
    const files = Array.from(e.target.files);
    let loadedCount = 0;
    const totalFiles = files.length;

    // Initialize Module (Always fresh to avoid stale state)
    window.Module = {
      preRun: [],
      postRun: [],
      print: (text: string) => console.log('[Xash3D]', text),
      printErr: (text: string) => console.error('[Xash3D Error]', text),
      canvas: canvasRef.current,
      setStatus: (text: string) => setStatus(text),
      totalDependencies: 0,
      monitorRunDependencies: (left: number) => {
        // console.log('Dependencies left:', left);
      },
      // Ensure all engine assets (wasm, data, side modules) are served from /xash/
      locateFile: (path: string, prefix: string) => {
        if (path.endsWith('.wasm') || path.endsWith('.data') || path.endsWith('.mem')) {
          return '/xash/' + path;
        }
        return prefix + path;
      },
      // Predeclare dynamic side modules so the runtime fetches them asynchronously
      dynamicLibraries: ['/xash/filesystem_stdio.wasm']
    };

    const fileData: { path: string, data: ArrayBuffer }[] = [];
    
    for (const file of files) {
        const path = file.webkitRelativePath;
        // Check if relevant
        if (!path.includes('valve') && !path.includes('cstrike')) continue;
        
        try {
            const buffer = await file.arrayBuffer();
            fileData.push({ path, data: buffer });
            loadedCount++;
            setProgress(Math.round((loadedCount / totalFiles) * 100));
        } catch (e) {
            console.error('Error reading file', file.name);
        }
    }

    setStatus(`Archivos cargados (${fileData.length}). Listo para iniciar.`);
    setEngineReady(true);

    // Setup the preRun to write these files
    window.Module.preRun = []; // Reset
    window.Module.preRun.push(() => {
        const FS = window.Module.FS;
        for (const item of fileData) {
            const parts = item.path.split('/');
            let startIndex = -1;
            if (parts.includes('valve')) startIndex = parts.indexOf('valve');
            else if (parts.includes('cstrike')) startIndex = parts.indexOf('cstrike');
            
            if (startIndex === -1) continue;

            const relativePath = parts.slice(startIndex).join('/');
            const dirPath = parts.slice(startIndex, -1).join('/');
            const fileName = parts[parts.length - 1];

            // Create dirs
            const dirs = dirPath.split('/');
            let currentDir = '';
            for (const dir of dirs) {
                currentDir += (currentDir ? '/' : '') + dir;
                try {
                    FS.mkdir(currentDir);
                } catch (e: any) {
                    if (e.code !== 'EEXIST' && e.code !== 17) console.warn('mkdir error', e);
                }
            }

            // Write file
            try {
                FS.writeFile(relativePath, new Uint8Array(item.data));
            } catch (e) {
                console.error('Error writing file', relativePath, e);
            }
        }
    });
  };

  const launchEngine = () => {
    if (!engineReady) return;
    setGameRunning(true);
    
    // Load the script
    const script = document.createElement('script');
    script.src = '/xash/xash3d.js?v=' + Date.now();
    script.async = true;
    script.onload = () => {
      // Initialize the engine using the factory function
      // @ts-ignore
      if (typeof window.Xash3D === 'function') {
        // @ts-ignore
        window.Xash3D(window.Module).then((instance: any) => {
          console.log('Xash3D Engine Initialized');
        }).catch((err: any) => {
          console.error('Failed to initialize Xash3D:', err);
          toast.error('Error al iniciar el motor del juego');
          setGameRunning(false);
        });
      } else {
        console.error('Xash3D global not found');
        toast.error('Error: No se pudo cargar el script del motor');
        setGameRunning(false);
      }
    };
    document.body.appendChild(script);
  };

  return (
    <div className="flex flex-col h-full w-full bg-black overflow-hidden relative">
      {/* Header / Overlay */}
      {!gameRunning && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-discord-chat/90 backdrop-blur-sm p-4">
          <div className="bg-discord-surface p-6 rounded-lg max-w-2xl w-full border border-discord-hover shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Play className="text-green-500" />
                CS 1.6 Web Engine (Xash3D)
              </h1>
              <button onClick={onClose} className="text-discord-text-muted hover:text-white">
                <Menu size={24} />
              </button>
            </div>

            {missingEngine ? (
              <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-lg mb-6">
                <h3 className="text-red-400 font-bold flex items-center gap-2 mb-2">
                  <AlertTriangle size={20} />
                  Motor no encontrado
                </h3>
                <p className="text-sm text-discord-text-normal mb-2">
                  No se encontraron los archivos del motor Xash3D en <code>/public/xash/</code>.
                </p>
                <p className="text-sm text-discord-text-muted">
                  Por favor, descarga los binarios de Xash3D FWGS (WebAssembly) y colócalos en la carpeta <code>public/xash</code> de tu proyecto.
                  Necesitas: <code>xash3d.js</code>, <code>xash3d.wasm</code>, etc.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-discord-chat p-4 rounded-lg border border-discord-blurple/30">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Info size={18} className="text-blue-400" />
                    Instrucciones
                  </h3>
                  <ol className="list-decimal list-inside text-sm text-discord-text-normal space-y-2">
                    <li>Necesitas una copia legal de Counter-Strike 1.6.</li>
                    <li>Localiza la carpeta donde está instalado (ej: Steam/steamapps/common/Half-Life).</li>
                    <li>Haz clic en el botón de abajo y selecciona esa carpeta completa.</li>
                    <li>El navegador cargará los archivos necesarios (valve y cstrike) en la memoria.</li>
                    <li>¡Juega!</li>
                  </ol>
                </div>

                <div className="flex flex-col gap-4">
                  {!engineReady ? (
                    <div className="relative">
                      <input
                        type="file"
                        {...({ webkitdirectory: "", directory: "" } as any)}
                        onChange={handleDirectorySelect}
                        className="hidden"
                        id="folder-upload"
                      />
                      <label
                        htmlFor="folder-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-discord-text-muted rounded-lg cursor-pointer hover:border-discord-blurple hover:bg-discord-blurple/10 transition-all"
                      >
                        <Upload size={32} className="text-discord-text-muted mb-2" />
                        <span className="text-discord-text-normal font-semibold">
                          Seleccionar carpeta del juego (Half-Life)
                        </span>
                        <span className="text-xs text-discord-text-muted mt-1">
                          Debe contener las carpetas 'valve' y 'cstrike'
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="text-green-400 font-semibold text-lg">
                        ✅ Archivos listos para iniciar
                      </div>
                      <button
                        onClick={launchEngine}
                        className="discord-button success w-full py-4 text-xl font-bold shadow-lg hover:scale-[1.02] transition-transform"
                      >
                        INICIAR JUEGO
                      </button>
                    </div>
                  )}

                  {status && (
                    <div className="text-center">
                      <div className="text-xs text-discord-text-muted mb-1">{status}</div>
                      {progress > 0 && progress < 100 && (
                        <div className="w-full bg-discord-dark h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-discord-blurple h-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block outline-none cursor-none"
        id="canvas"
        onContextMenu={(e) => e.preventDefault()}
        tabIndex={-1}
      />
      
      {/* Mobile Menu Toggle (Always visible if needed) */}
      {onOpenSidebar && (
        <button
          onClick={onOpenSidebar}
          className="md:hidden absolute top-4 left-4 p-2 bg-discord-surface/50 rounded-full text-white z-20 hover:bg-discord-surface"
        >
          <Menu size={24} />
        </button>
      )}
    </div>
  );
}
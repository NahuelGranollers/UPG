// CS 1.6 Game Global Configuration
// Shared variables and utilities for the game

export const GameGlobals = {
  // Game state
  gameStarted: false,
  paused: false,
  infiniteMode: false,
  audioEnabled: false,
  fullScreen: false,
  isLocked: false,

  // Player state
  kills: 0,
  playerDied: false,

  // Game settings
  mouseSensitivity: 2000,
  difficulty: 1,
  unit: 100,
  grounSideLength: 3200,

  // Game data
  cells: [],
  graph: null,
  collisionMatrix: [],
  randomAmmoLocations: [],
  cellEnemy: {},

  // UI elements
  killsCount: null,
  healthText: null,

  // Audio
  enemyShooting: null,
  playerShooting: null,
  enemyMissing: null,
  enemyDeath: null,
  whizz: null,

  // Assets
  guerilla: null,
  guerillaSkeleton: null,
  deagle: null,
  deagleSkeleton: null,

  // Babylon.js objects
  canvas: null,
  engine: null,
  camera: null,
  player: null,
  enemies: [],
  obstacles: [],

  // Game counters
  lastEnemyId: 0,

  // Multiplayer
  socket: null,
  roomId: null,
  userId: null,
  currentUser: null,
  isHost: false,
  multiplayerPlayers: new Map(),

  // Initialize default values
  init() {
    this.randomAmmoLocations = [
      { x: 28, y: 13 }, { x: 21, y: 4 }, { x: 16, y: 5 }, { x: 6, y: 4 }, { x: 9, y: 10 },
      { x: 6, y: 6 }, { x: 10, y: 21 }, { x: 6, y: 29 }, { x: 13, y: 27 }, { x: 22, y: 27 },
      { x: 25, y: 24 }, { x: 23, y: 21 }, { x: 20, y: 17 }
    ];

    this.cellEnemy = {};
    this.enemies = [];
    this.obstacles = [];
  },

  // Reset game state
  reset() {
    this.gameStarted = false;
    this.paused = false;
    this.kills = 0;
    this.playerDied = false;
    this.enemies = [];
    this.cellEnemy = {};
  }
};

// Make it available globally for backward compatibility
window.GameGlobals = GameGlobals;
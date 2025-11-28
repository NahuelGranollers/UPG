// CS 1.6 Game Engine - Adapted for React/Socket.IO multiplayer
// Based on https://github.com/akhawatrahTW/cs1.6.git

import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { SkyMaterial } from 'babylonjs-materials';

// Patch BABYLON namespace for extensions
BABYLON.SkyMaterial = SkyMaterial;

import { Player } from './Player.js';
import { Enemy } from './Enemy.js';
import { AStar, Graph } from './astar.js';
import { GameGlobals } from './game-globals.js';

// Create AStar instance
const astar = new AStar();

// Local variables
let globalScene = null;
let playerBeforeRenderFunction = null;
let divFps = null;
let isLocked = false;

// Initialize the CS 1.6 game
export function initCS16Game(canvasElement, socketInstance, room, user, isGameHost, botCount, onLoadError) {
  GameGlobals.init();
  GameGlobals.socket = socketInstance;
  GameGlobals.roomId = room;
  GameGlobals.userId = user.id;
  GameGlobals.currentUser = user;
  GameGlobals.isHost = isGameHost;
  GameGlobals.botCount = botCount || 0;
  GameGlobals.canvas = canvasElement;
  GameGlobals.onLoadError = onLoadError;

  // Initialize Babylon.js
  GameGlobals.engine = new BABYLON.Engine(GameGlobals.canvas, true);
  const divFps = document.createElement('div');
  divFps.id = 'fps';
  divFps.style.cssText = `
    position: absolute;
    right: 220px;
    top: 20px;
    color: #999;
    cursor: default;
    z-index: 1000;
  `;
  document.body.appendChild(divFps);

  loadGame();
}

function loadGame() {
  GameGlobals.kills = 0;
  const scene = createScene();
  GameGlobals.camera = createPlayerCamera(scene);
  createSkybox(scene);
  createGround(scene);
  createGrid(scene);
  registerEvents(scene, GameGlobals.camera, GameGlobals.canvas);

  const assetsManager = new BABYLON.AssetsManager(scene);

  assetsManager.onTaskError = function (task) {
    console.error("Error loading asset task:", task.name, task.errorObject);
    if (GameGlobals.onLoadError) {
      GameGlobals.onLoadError(`Error cargando asset: ${task.name}. Verifica que los archivos existan en /public/cs16-assets/`);
    }
  };

  // Load player model
  const playerTask = assetsManager.addMeshTask("player task", "", "/cs16-assets/obj/player/", "me.babylon");
  playerTask.onSuccess = function (task) {
    const ak = task.loadedMeshes[0];
    const leftArm = task.loadedMeshes[1];
    const rightArm = task.loadedMeshes[2];
    const playerSkeleton = task.loadedSkeletons[0];
    GameGlobals.player = new Player(leftArm, rightArm, playerSkeleton, ak, scene, GameGlobals.camera);
  };

  // Load enemy model
  const guerillaTask = assetsManager.addMeshTask("guerilla task", "", "/cs16-assets/obj/guerilla/", "guerilla_trimmed2.babylon");
  guerillaTask.onSuccess = function (task) {
    GameGlobals.guerilla = task.loadedMeshes[0];
    GameGlobals.guerillaSkeleton = task.loadedSkeletons[0];
    task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
  };

  // Load weapon model
  const deagleTask = assetsManager.addMeshTask("deagle task", "", "/cs16-assets/obj/ak/", "ak74.babylon");
  deagleTask.onSuccess = function (task) {
    GameGlobals.deagle = task.loadedMeshes[0];
    GameGlobals.deagleSkeleton = task.loadedSkeletons[0];
    task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
  };

  // Load environment assets
  loadEnvironmentAssets(assetsManager, scene);

  assetsManager.onFinish = function (tasks) {
    scene.render();
    createMainMenu();

    GameGlobals.guerilla.rotation.y = 0;
    GameGlobals.guerilla.position.y = GameGlobals.guerilla.getBoundingInfo().boundingBox.maximum.y + 11;
    createAnimation(GameGlobals.guerillaSkeleton);
    GameGlobals.guerilla.setEnabled(false);
    GameGlobals.deagle.setEnabled(false);

    createCollisionMatrix(4);
    const wall = createWalls(scene);
    createInnerWalls(scene);
    setNotWalledBlocks(scene);
    fillRandomAmmoLocationsArray();

    if (GameGlobals.isHost) {
      createFirstRoundEnemies(scene);
    }

    globalScene = scene;
    GameGlobals.engine.runRenderLoop(function () {
      scene.render();
      divFps.innerHTML = GameGlobals.engine.getFps().toFixed() + " fps";
    });

    playerBeforeRenderFunction = function () {
      GameGlobals.player.runBeforeRender();
    };
    scene.registerBeforeRender(playerBeforeRenderFunction);
  };

  assetsManager.load();
}

function loadEnvironmentAssets(assetsManager, scene) {
  // Load cars
  const carTask = assetsManager.addMeshTask("car task", "", "/cs16-assets/obj/car/", "untitled.babylon");
  carTask.onSuccess = function (task) {
    const car = task.loadedMeshes[0];
    car.checkCollisions = true;
    const car2 = car.clone();
    car2.position = new BABYLON.Vector3(120, car.position.y, 100);
    car2.rotation.y += .6;
    const car3 = car.clone();
    car3.position = new BABYLON.Vector3(40, car.position.y, 210);
    car3.rotation.y += Math.PI;
    car3.rotation.y += .5;

    const boundingBox = BABYLON.MeshBuilder.CreateBox("car bounding box", { width: 90, height: 50, depth: 250 }, scene);
    boundingBox.material = new BABYLON.StandardMaterial("cbb material", scene);
    boundingBox.material.wireframe = true;
    boundingBox.parent = car;
    boundingBox.position.y += 50 / 2;
    boundingBox.checkCollisions = true;

    const boundingBox2 = boundingBox.clone();
    boundingBox2.parent = car2;
    const boundingBox3 = boundingBox.clone();
    boundingBox3.parent = car3;

    boundingBox.visibility = false;
    boundingBox2.visibility = false;
    boundingBox3.visibility = false;
  };

  // Load dumpsters
  const dumpsterTask = assetsManager.addMeshTask("dumpster task", "", "/cs16-assets/obj/dumpster/", "dumpster.babylon");
  dumpsterTask.onSuccess = function (task) {
    const dumpster = task.loadedMeshes[0];
    dumpster.position = new BABYLON.Vector3(GameGlobals.grounSideLength / 4 + 250, dumpster.position.y, GameGlobals.grounSideLength / 2 - 150);
    dumpster.checkCollisions = true;
    const dumpster2 = dumpster.clone();
    dumpster2.position = new BABYLON.Vector3(GameGlobals.grounSideLength / 4 - 250, dumpster.position.y, GameGlobals.grounSideLength / 2 - 150);
    const dumpster3 = dumpster.clone();
    const dumpster5 = dumpster.clone();
    dumpster3.position = new BABYLON.Vector3(GameGlobals.grounSideLength / 4 - 250, dumpster.position.y, -GameGlobals.grounSideLength / 2 + 150);
    dumpster5.position = new BABYLON.Vector3(GameGlobals.grounSideLength / 4 + 250, dumpster.position.y, -GameGlobals.grounSideLength / 2 + 150);
  };

  // Load trucks
  const truckTask = assetsManager.addMeshTask("truck task", "", "/cs16-assets/obj/truck/", "truck.babylon");
  truckTask.onSuccess = function (task) {
    const truck = task.loadedMeshes[0];
    truck.checkCollisions = true;
    truck.position = new BABYLON.Vector3(-300, 0, -300);
    truck.rotation.y -= Math.PI / 2;
    truck.position.x = -GameGlobals.grounSideLength / 2 + 300;
    truck.position.z = -GameGlobals.grounSideLength / 2 + 350;
    const truck2 = truck.clone();
    truck2.position.z += 300;
    const truck4 = truck2.clone();
    truck4.position.z += 500;
  };

  // Load rubble
  const rubbleTask = assetsManager.addMeshTask("rubble task", "", "/cs16-assets/obj/rubble/", "rubble.babylon");
  rubbleTask.onSuccess = function (task) {
    const rubble = task.loadedMeshes[0];
    rubble.position = new BABYLON.Vector3(GameGlobals.grounSideLength / 2 - 160, rubble.position.y, GameGlobals.grounSideLength / 4);
    rubble.checkCollisions = true;
    rubble.rotation.y = Math.PI / 2;
    const boundingBox = BABYLON.MeshBuilder.CreateBox("car bounding box", { width: 250, height: 50, depth: 90 }, scene);
    boundingBox.material = new BABYLON.StandardMaterial("cbb material", scene);
    boundingBox.material.wireframe = true;
    boundingBox.parent = rubble;
    boundingBox.position.y += 50 / 2;
    boundingBox.checkCollisions = true;
    boundingBox.visibility = false;
  };

  // Load trash
  const trashTask = assetsManager.addMeshTask("trash task", "", "/cs16-assets/obj/trash/", "trash.babylon");
  trashTask.onSuccess = function (task) {
    const trash = task.loadedMeshes[0];
    trash.position = new BABYLON.Vector3(360, 0, 340);
    const boundingBox = BABYLON.MeshBuilder.CreateBox("trash bounding box", { width: 60, height: 40, depth: 60 }, scene);
    boundingBox.parent = trash;
    boundingBox.position.y += 40 / 2;
    boundingBox.checkCollisions = true;
    boundingBox.visibility = false;
  };
}

// Scene creation functions
function createScene() {
  const scene = new BABYLON.Scene(GameGlobals.engine);
  scene.collisionsEnabled = true;
  const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 611, 0), scene);
  light.intensity = 2;
  return scene;
}

function createPlayerCamera(scene) {
  const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(-1000, 54, 1200), scene);
  camera.keysUp = [87]; // W
  camera.keysDown = [83]; // S
  camera.keysLeft = [65]; // A
  camera.keysRight = [68]; // D
  camera.setTarget(new BABYLON.Vector3(0, 27, 0));
  camera.attachControl(GameGlobals.canvas);
  camera.angularSensibility = GameGlobals.mouseSensitivity;
  camera.speed = 7.0;
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.ellipsoid = new BABYLON.Vector3(30, 27, 30);
  return camera;
}

function createSkybox(scene) {
  const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: GameGlobals.grounSideLength + 200 }, scene);
  const skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
  skyMaterial.backFaceCulling = false;
  skyMaterial.inclination = -.4;
  skybox.material = skyMaterial;
  return skybox;
}

function createGround(scene) {
  const myGround = BABYLON.MeshBuilder.CreateGround("myGround", { width: GameGlobals.grounSideLength, height: GameGlobals.grounSideLength, subdivsions: 4 }, scene);
  myGround.checkCollisions = true;
  const customMaterial = new BABYLON.StandardMaterial("custommat", scene);
  const customProcText = new BABYLON.CustomProceduralTexture("customtext", "/cs16-assets/textures/ground", 1024, scene);
  customMaterial.ambientTexture = customProcText;
  customMaterial.ambientTexture.vScale = 10;
  customMaterial.ambientTexture.uScale = 10;
  customMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
  customMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  myGround.material = customMaterial;
}

function createGrid(scene) {
  GameGlobals.cells = [];
  for (let i = 0; i < GameGlobals.grounSideLength / GameGlobals.unit; i++) {
    GameGlobals.cells[i] = [];
    for (let j = 0; j < GameGlobals.grounSideLength / GameGlobals.unit; j++) {
      if (i === 0 || i === GameGlobals.grounSideLength / GameGlobals.unit - 1 || j === 0 || j === GameGlobals.grounSideLength / GameGlobals.unit - 1) {
        GameGlobals.cells[i][j] = 0;
      } else {
        GameGlobals.cells[i][j] = 1;
      }
    }
  }

  // Set up walls and obstacles
  const wallCells = [
    [1,13], [2,13], [3,13], [4,13], [5,13], [6,13], [7,13], [8,13], [9,13], [10,13], [11,13],
    [16,23], [16,24], [16,25], [16,26], [16,27], [16,28], [16,29], [16,30],
    [12,1], [12,2], [12,3], [12,4], [12,5], [12,6], [12,7], [12,8], [12,9], [12,10], [12,11], [12,12], [12,13],
    [23,8], [24,8], [25,8], [26,8], [27,8], [28,8], [29,8], [30,8],
    [23,9], [23,10], [23,11], [23,12], [23,13], [23,14], [23,15], [23,16],
    [24,16], [25,16], [26,16], [27,16], [28,16], [29,16], [30,16],
    [8,23], [8,24], [8,25], [8,26], [8,27], [8,28], [8,29], [8,30],
    [1,23], [2,23], [3,23], [4,23], [5,23], [6,23], [7,23]
  ];

  wallCells.forEach(([i, j]) => {
    if (GameGlobals.cells[i] && GameGlobals.cells[i][j] !== undefined) {
      GameGlobals.cells[i][j] = 0;
    }
  });

  GameGlobals.graph = new Graph(GameGlobals.cells, { diagonal: true });
}

function createWalls(scene) {
  const size = { width: GameGlobals.grounSideLength, height: 320, depth: 5 };
  const wall1 = createWall("wall 1", scene, size, 0, 1);
  GameGlobals.obstacles.push(wall1);
  const wall2 = createWall("wall 2", scene, size, 1, 1);
  GameGlobals.obstacles.push(wall2);
  const wall3 = createWall("wall 3", scene, size, 0, -1);
  GameGlobals.obstacles.push(wall3);
  const wall4 = createWall("wall 4", scene, size, 1, -1);
  GameGlobals.obstacles.push(wall4);
  return wall4;
}

function createWall(name, scene, size, rotation, dir) {
  const wall = BABYLON.MeshBuilder.CreateBox(name, size, scene);
  const customMaterial = new BABYLON.StandardMaterial("custommat", scene);
  const customProcText = new BABYLON.CustomProceduralTexture("customtext", "/cs16-assets/textures/wall", 1024, scene);
  customMaterial.ambientTexture = customProcText;
  customMaterial.ambientTexture.vScale = 1;
  customMaterial.ambientTexture.uScale = 8;
  customMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
  customMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  wall.material = customMaterial;

  if (rotation === 0) {
    wall.position.z = dir * size.width / 2 - dir * 100;
  } else {
    wall.position.x = dir * size.width / 2 - dir * 100;
  }
  wall.position.y = size.height / 2;
  wall.rotation.y = rotation * Math.PI / 2;

  const ghostWall = wall.clone();
  ghostWall.name = "ghost " + name;
  if (rotation === 0) {
    ghostWall.position.z = wall.position.z - dir * 10;
  } else {
    ghostWall.position.x = wall.position.x - dir * 10;
  }
  ghostWall.checkCollisions = true;
  ghostWall.visibility = false;
  wall.visibility = false;
  return ghostWall;
}

function createInnerWalls(scene) {
  const size = { width: GameGlobals.unit, height: 320, depth: .5 };
  const wall = createWallBlock(size, scene);
  const doorWall = createWallWithDoorBlock(size, scene);

  for (let i = 0; i < GameGlobals.grounSideLength / GameGlobals.unit; i++) {
    for (let j = 0; j < GameGlobals.grounSideLength / GameGlobals.unit; j++) {
      if (i > 0 && j > 0 && i < GameGlobals.grounSideLength / GameGlobals.unit - 1 && j < GameGlobals.grounSideLength / GameGlobals.unit - 1) {
        if (GameGlobals.cells[i][j] === 0) {
          const wall2 = wall.clone();
          wall2.position = new BABYLON.Vector3((GameGlobals.unit * i) + (GameGlobals.unit / 2) - (GameGlobals.grounSideLength / 2), size.height / 2, (GameGlobals.unit * j) + (GameGlobals.unit / 2) - (GameGlobals.grounSideLength / 2));
        } else if (GameGlobals.cells[i][j] === 100) {
          const wall2 = doorWall.clone();
          wall2.position = new BABYLON.Vector3((GameGlobals.unit * i) + (GameGlobals.unit / 2) - (GameGlobals.grounSideLength / 2), size.height / 2, (GameGlobals.unit * j) + (GameGlobals.unit / 2) - (GameGlobals.grounSideLength / 2));
          GameGlobals.cells[i][j] = 1;
        }
      }
    }
  }
  wall.visibility = false;
  doorWall.visibility = false;
}

function createWallBlock(size, scene) {
  const customMaterial = new BABYLON.StandardMaterial("custommat", scene);
  const customProcText = new BABYLON.CustomProceduralTexture("customtext", "/cs16-assets/textures/wall", 264, scene);
  customMaterial.ambientTexture = customProcText;
  customMaterial.ambientTexture.vScale = 1;
  customMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
  customMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

  const wall1 = BABYLON.MeshBuilder.CreateBox("wall1", size, scene);
  wall1.material = customMaterial;
  wall1.checkCollisions = true;
  wall1.rotation.y = Math.PI / 2;
  wall1.position.x += size.width / 2;
  wall1.position.y += size.height / 4;

  const wall2 = wall1.clone();
  wall2.rotation.y += Math.PI / 2;
  wall2.position.z += size.width / 2;
  wall2.position.x -= size.width / 2;

  const wall3 = wall1.clone();
  wall3.rotation.y += Math.PI / 2;
  wall3.position.z -= size.width / 2;
  wall3.position.x -= size.width / 2;

  const wall4 = wall1.clone();
  wall4.rotation.y = Math.PI / 2;
  wall4.position.x -= size.width;

  return BABYLON.Mesh.MergeMeshes([wall1, wall2, wall3, wall4]);
}

function createWallWithDoorBlock(size, scene) {
  const customMaterial = new BABYLON.StandardMaterial("custommat", scene);
  const customProcText = new BABYLON.CustomProceduralTexture("customtext", "/cs16-assets/textures/wall", 264, scene);
  customMaterial.ambientTexture = customProcText;
  customMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
  customMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

  size.height = size.height / 2;
  const wall1 = BABYLON.MeshBuilder.CreateBox("wall1", size, scene);
  wall1.material = customMaterial;
  wall1.checkCollisions = true;
  wall1.rotation.y = Math.PI / 2;
  wall1.position.x += size.width / 2;
  wall1.position.y += size.height;

  const wall2 = wall1.clone();
  wall2.rotation.y += Math.PI / 2;
  wall2.position.z += size.width / 2;
  wall2.position.x -= size.width / 2;

  const wall3 = wall1.clone();
  wall3.rotation.y += Math.PI / 2;
  wall3.position.z -= size.width / 2;
  wall3.position.x -= size.width / 2;

  const wall4 = wall1.clone();
  wall4.rotation.y = Math.PI / 2;
  wall4.position.x -= size.width;

  const wall5 = wall1.clone();
  wall5.rotation.x -= Math.PI / 2;
  wall5.position.y -= size.height / 2 + .5;
  wall5.position.x -= size.width / 2;
  wall5.scaling.y = 0.629;

  return BABYLON.Mesh.MergeMeshes([wall1, wall2, wall3, wall4, wall5]);
}

function setNotWalledBlocks(scene) {
  const openCells = [
    [15,15], [15,16], [15,17], [16,15], [16,16], [16,17], [16,18], [17,16], [17,17],
    [2,11], [3,11], [2,6], [3,6], [2,3], [3,3], [26,30], [21,30], [21,1], [26,1], [30,23], [30,24], [19,19]
  ];

  openCells.forEach(([i, j]) => {
    if (GameGlobals.cells[i] && GameGlobals.cells[i][j] !== undefined) {
      GameGlobals.cells[i][j] = 0;
    }
  });
}

function fillRandomAmmoLocationsArray() {
  GameGlobals.randomAmmoLocations = [
    { x: 28, y: 13 }, { x: 21, y: 4 }, { x: 16, y: 5 }, { x: 6, y: 4 }, { x: 9, y: 10 },
    { x: 6, y: 6 }, { x: 10, y: 21 }, { x: 6, y: 29 }, { x: 13, y: 27 }, { x: 22, y: 27 },
    { x: 25, y: 24 }, { x: 23, y: 21 }, { x: 20, y: 17 }
  ];
}

function createFirstRoundEnemies(scene) {
  const enemyPositions = [
    [GameGlobals.grounSideLength / 6 - GameGlobals.unit * 3, GameGlobals.guerilla.position.y + 3, GameGlobals.grounSideLength / 6 - GameGlobals.unit * 3],
    [GameGlobals.grounSideLength / 6 - GameGlobals.unit * 3, GameGlobals.guerilla.position.y + 3, -GameGlobals.grounSideLength / 6 + GameGlobals.unit * 3],
    [-GameGlobals.grounSideLength / 6 + GameGlobals.unit * 3, GameGlobals.guerilla.position.y + 3, GameGlobals.grounSideLength / 6 - GameGlobals.unit * 3],
    [-GameGlobals.grounSideLength / 6 + GameGlobals.unit * 3, GameGlobals.guerilla.position.y + 3, -GameGlobals.grounSideLength / 6 + GameGlobals.unit * 3],
    [GameGlobals.grounSideLength / 4 - GameGlobals.unit * 3, GameGlobals.guerilla.position.y + 3, GameGlobals.grounSideLength / 4 - GameGlobals.unit * 3],
    [GameGlobals.grounSideLength / 4 - GameGlobals.unit * 3, GameGlobals.guerilla.position.y + 3, -GameGlobals.grounSideLength / 4 + GameGlobals.unit * 3]
  ];

  // Use configured bot count, limited by available positions (or loop/randomize if we wanted more)
  const count = Math.min(GameGlobals.botCount, enemyPositions.length);

  for (let i = 0; i < count; i++) {
    const pos = enemyPositions[i];
    cloneGuerilla("enemy", GameGlobals.guerilla, GameGlobals.guerillaSkeleton, GameGlobals.deagle, scene,
      new BABYLON.Vector3(pos[0], pos[1], pos[2]), 2, 2);
  }
}

function cloneGuerilla(name, guerilla, guerillaSkeleton, deagle, scene, position, shootingRangeUnits, accuracy) {
  GameGlobals.lastEnemyId++;
  const tempEnemy = guerilla.clone("guerilla2");
  tempEnemy.name = name + " " + GameGlobals.lastEnemyId;
  tempEnemy.position = position;
  tempEnemy.skeleton = guerillaSkeleton.clone("clonedSkeleton");
  const weapon = deagle.clone();
  const enemy = createEnemy(GameGlobals.lastEnemyId, tempEnemy, tempEnemy.skeleton, weapon, shootingRangeUnits, accuracy, scene, astar);
  GameGlobals.enemies.push(enemy);
  scene.registerBeforeRender(function () {
    enemy.runBeforeRender();
  });
}

function createEnemy(id, mesh, skeleton, weapon, shootingRangeUnits, accuracy, scene, astar) {
  return new Enemy(id, mesh, skeleton, weapon, shootingRangeUnits, accuracy, scene, astar);
}

function createCollisionMatrix(numberOfEnemies) {
  for (let i = 0; i < numberOfEnemies; i++) {
    GameGlobals.collisionMatrix[i] = [];
    for (let j = 0; j < numberOfEnemies; j++) {
      GameGlobals.collisionMatrix[i][j] = null;
    }
  }
}

function registerEvents(scene, camera, canvas) {
  scene.onPointerDown = function (evt) {
    if (!GameGlobals.gameStarted) return;
    if ((evt.x < 80 && evt.y < 150) || (evt.x > canvas.width - 80 && evt.y < 150)) return;

    if (!isLocked) {
      canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false;
      if (canvas.requestPointerLock) {
        canvas.requestPointerLock();
      }
    } else {
      // Handle shooting
      if (GameGlobals.player && !GameGlobals.playerDied) {
        GameGlobals.player.shoot();
        // Send shoot event to server
        GameGlobals.socket.emit('cs16:player-action', { roomId: GameGlobals.roomId, userId: GameGlobals.userId, action: 'shoot' });
      }
    }
  };

  // Pointer lock change event
  const pointerlockchange = function () {
    const controlEnabled = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || false;
    if (!controlEnabled) {
      GameGlobals.camera.detachControl(GameGlobals.canvas);
      isLocked = false;
    } else {
      GameGlobals.camera.attachControl(GameGlobals.canvas);
      isLocked = true;
    }
  };

  document.addEventListener("pointerlockchange", pointerlockchange, false);
  document.addEventListener("mspointerlockchange", pointerlockchange, false);
  document.addEventListener("mozpointerlockchange", pointerlockchange, false);
  document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

  // Keyboard events
  document.addEventListener('keydown', function (event) {
    if (event.shiftKey && GameGlobals.gameStarted) {
      if (GameGlobals.player) GameGlobals.player.shouldJump = true;
    }
    if (event.ctrlKey && GameGlobals.gameStarted) {
      if (GameGlobals.player) {
        GameGlobals.player.shouldDuck = true;
        GameGlobals.player.toggleDuck();
      }
    }
    if (event.code === 'KeyR' && GameGlobals.gameStarted) {
      if (GameGlobals.player) GameGlobals.player.reload();
    }
  });

  document.addEventListener('keyup', function (event) {
    if (event.code === 'Shift' && GameGlobals.gameStarted) {
      if (GameGlobals.player) GameGlobals.player.shouldJump = false;
    }
    if (event.code === 'Control' && GameGlobals.gameStarted) {
      if (GameGlobals.player) GameGlobals.player.shouldDuck = false;
      if (GameGlobals.player) GameGlobals.player.toggleDuck();
    }
  });

  // Window resize
  window.addEventListener("resize", function () {
    GameGlobals.engine.resize();
  });
}

function createMainMenu() {
  // Create a simple HUD for the game
  const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  const killsCount = new BABYLON.GUI.TextBlock();
  killsCount.text = "Kills: " + GameGlobals.kills;
  killsCount.color = "orange";
  killsCount.fontSize = 24;
  killsCount.top = "-40%";
  killsCount.left = "40%";
  advancedTexture.addControl(killsCount);

  const healthText = new BABYLON.GUI.TextBlock();
  healthText.text = "Health: 100";
  healthText.color = "green";
  healthText.fontSize = 24;
  healthText.top = "-40%";
  healthText.left = "-40%";
  advancedTexture.addControl(healthText);

  // Store references for updates
  GameGlobals.killsCount = killsCount;
  GameGlobals.healthText = healthText;
}

function createAnimation(skeleton) {
  const bones = skeleton.bones;
  const upperBodyBones = ['Spine', 'Neck', 'Head', 'Clavicle', 'UpperArm', 'Forearm', 'Hand', 'Finger', 'Elbow', 'Bomb'];
  const upperBodyBone = false;
  const sourceFrom = 0;
  const sourceTo = 64;
  const targetFrom = 96;
  const targetTo = 128;

  for (let i = 0; i < bones.length; i++) {
    const boneName = bones[i].name;
    let isUpperBodyBone = false;
    for (let j = 0; j < upperBodyBones.length; j++) {
      if (boneName.includes(upperBodyBones[j])) {
        isUpperBodyBone = true;
        break;
      }
    }

    if (isUpperBodyBone) {
      const sourceLenght = sourceTo - sourceFrom;
      const sourceFromArrayEntry = findAnimationArrayEntryByFrame(bones[i], sourceFrom, sourceTo);
      const targetLenght = targetTo - targetFrom;
      const targetFromArrayEntry = findAnimationArrayEntryByFrame(bones[i], targetFrom, targetTo);

      if (sourceFromArrayEntry !== -1 && targetFromArrayEntry !== -1) {
        for (let x = 0; x < targetLenght; x++) {
          bones[i].animations[0]._keys[targetFromArrayEntry + x] = bones[i].animations[0]._keys[sourceFromArrayEntry + x];
        }
      }
    }
  }
}

function findAnimationArrayEntryByFrame(bone, from, to) {
  const animation = bone.animations[0];
  const keys = animation._keys;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].frame >= from && keys[i].frame <= to) {
      return i;
    }
  }
  return -1;
}

// Multiplayer synchronization
function syncPlayerMovement() {
  if (!GameGlobals.socket || !GameGlobals.userId || !GameGlobals.camera) return;

  const position = GameGlobals.camera.position;
  const rotation = GameGlobals.camera.rotation;

  GameGlobals.socket.emit('cs16:player-move', {
    roomId: GameGlobals.roomId,
    userId: GameGlobals.userId,
    position: { x: position.x, y: position.y, z: position.z },
    rotation: { x: rotation.x, y: rotation.y, z: rotation.z }
  });
}

// Socket event handlers
export function setupMultiplayerEvents() {
  if (!GameGlobals.socket) return;

  GameGlobals.socket.on('cs16:player-update', (data) => {
    // Update other players' and bots' positions
    if (data.userId !== GameGlobals.userId) {
      if (GameGlobals.multiplayerPlayers.has(data.userId)) {
        const playerMesh = GameGlobals.multiplayerPlayers.get(data.userId);
        if (playerMesh) {
          playerMesh.position.x = data.position.x;
          playerMesh.position.y = data.position.y;
          playerMesh.position.z = data.position.z;
          playerMesh.rotation.x = data.rotation.x;
          playerMesh.rotation.y = data.rotation.y;
          playerMesh.rotation.z = data.rotation.z;
        }
      } else {
        // Create mesh for new player/bot
        const playerMesh = GameGlobals.guerilla.clone("player_" + data.userId);
        playerMesh.position.x = data.position.x;
        playerMesh.position.y = data.position.y;
        playerMesh.position.z = data.position.z;
        playerMesh.rotation.x = data.rotation.x;
        playerMesh.rotation.y = data.rotation.y;
        playerMesh.rotation.z = data.rotation.z;
        GameGlobals.multiplayerPlayers.set(data.userId, playerMesh);
      }
    }
  });

  GameGlobals.socket.on('cs16:player-hit', (data) => {
    // Handle player hit effects
    if (data.targetId === GameGlobals.userId) {
      // Player was hit
      if (GameGlobals.healthText) {
        GameGlobals.healthText.text = "Health: " + data.newHealth;
      }
    }
  });

  GameGlobals.socket.on('cs16:player-joined', (data) => {
    // Create mesh for new player
    if (data.userId !== GameGlobals.userId) {
      const playerMesh = GameGlobals.guerilla.clone("player_" + data.userId);
      playerMesh.position.x = data.position.x;
      playerMesh.position.y = data.position.y;
      playerMesh.position.z = data.position.z;
      GameGlobals.multiplayerPlayers.set(data.userId, playerMesh);
    }
  });

  GameGlobals.socket.on('cs16:player-left', (data) => {
    // Remove player mesh
    if (GameGlobals.multiplayerPlayers.has(data.userId)) {
      const playerMesh = GameGlobals.multiplayerPlayers.get(data.userId);
      playerMesh.dispose();
      GameGlobals.multiplayerPlayers.delete(data.userId);
    }
  });

  GameGlobals.socket.on('cs16:room-state', (data) => {
    // Initialize all players and bots in the room
    data.players.forEach(player => {
      if (player.id !== GameGlobals.userId) {
        if (!GameGlobals.multiplayerPlayers.has(player.id)) {
          const playerMesh = GameGlobals.guerilla.clone("player_" + player.id);
          playerMesh.position.x = player.position.x;
          playerMesh.position.y = player.position.y;
          playerMesh.position.z = player.position.z;
          playerMesh.rotation.x = player.rotation.x;
          playerMesh.rotation.y = player.rotation.y;
          playerMesh.rotation.z = player.rotation.z;
          GameGlobals.multiplayerPlayers.set(player.id, playerMesh);
        }
      }
    });
  });
}

// Start game function
export function startCS16Game() {
  GameGlobals.gameStarted = true;
  if (GameGlobals.killsCount) {
    GameGlobals.killsCount.text = "Kills: " + GameGlobals.kills;
  }
}

// Cleanup function
export function cleanupCS16Game() {
  if (GameGlobals.engine) {
    GameGlobals.engine.dispose();
  }
  if (divFps) {
    document.body.removeChild(divFps);
  }
  GameGlobals.enemies = [];
  GameGlobals.obstacles = [];
  GameGlobals.multiplayerPlayers.clear();
  GameGlobals.reset();
}
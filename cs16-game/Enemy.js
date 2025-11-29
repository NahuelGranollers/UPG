// CS 1.6 Enemy Class - Adapted for React + Socket.IO Multiplayer
// Based on https://github.com/akhawatrahTW/cs1.6

import * as BABYLON from 'babylonjs';
import { GameGlobals } from './game-globals.js';
import { AStar } from './astar.js';

const animations = ['idle', 'crouch', 'walk', 'run', 'crouchWalk', 'die'];

export class Enemy {
  constructor(id, mesh, skeleton, weapon, shootingRangeUnits, accuracy, scene, astarInstance) {
    this.id = id;
    this.shootingRangeUnits = shootingRangeUnits;
    this.accuracy = accuracy;
    this.mesh = mesh;
    this.mesh.position.y -= 10;
    this.skeleton = skeleton;
    this.skeleton.enableBlending(0.075);
    this.scene = scene;
    this.activeAnim = null;
    this.activeAnimName = '';
    this.weapon = weapon;
    this.weapon.scaling = new BABYLON.Vector3(.8, .8, .8);
    this.weapon.rotation.y += Math.PI / 2;
    this.weapon.rotation.y -= .01;
    this.weapon.rotation.z += Math.PI / 2;
    this.weapon.rotation.x += Math.PI;
    this.weapon.rotation.x += .1;
    this.weapon.attachToBone(this.skeleton.bones[20], this.mesh);
    this.weapon.position.x += 5.0;
    this.weapon.position.z += 1.0;
    this.weapon.position.y -= .1;

    this.times = 1;
    this.frontVector = new BABYLON.Vector3(1, 0, 0);
    this.speed = 0;
    this.mesh.checkCollisions = true;
    this.mesh.actionManager = new BABYLON.ActionManager(scene);
    this.nearObstacle = false;
    this.originalRotation = this.mesh.rotation.y;
    this.animationSwitchAfter = 400;
    this.distance = 300;
    this.reactToShotDistance = 1500;

    this.ray = new BABYLON.Ray();
    this.rayHelper = new BABYLON.RayHelper(this.ray);
    this.rayHelper.attachToMesh(this.mesh, this.frontVector, new BABYLON.Vector3(33.6, 0, 0), this.reactToShotDistance);

    this.timer = 5001;
    this.enemyResult;
    this.enemy3PathBlockIndex;
    this.findPlayer;

    // Head hitbox
    this.headBox = BABYLON.MeshBuilder.CreateBox("head", { width: 10, height: 10, depth: 7 }, this.scene);
    this.headBox.parent = this.mesh;
    this.headBox.position.y += 0;
    this.headBox.position.x += 5;
    this.headBox.position.z -= 0;
    this.headBox.visibility = false;
    this.headBox.enemy = this;
    this.mesh.enemy = this;
    this.headBox.attachToBone(this.skeleton.bones[7], this.mesh);

    this.dead = false;
    this.deathSound = null;
    this.lastPlayerPosition = null;
    this.enemyPathBlockIndex = 0;
    this.findPlayer = true;
    this.previousBlock = null;
    this.currentBlock = null;
    this.mesh.ellipsoid = new BABYLON.Vector3(15.0, 30, 15.0);
    this.waitBeforeNextShot = 100;
    this.loopsFromLastShot = 0;
    this.health = 100;

    const enemy = this;
    this.isAvoidingCollision = false;
    this.mesh.computeWorldMatrix(true);
    this.idle();
    this.currentX = -10000;
    this.currentY = -10000;
    this.isShot = false;
    this.spine = this.skeleton.bones[2];
    this.initMat = skeleton.bones[2].getLocalMatrix().clone();
    this.spineRotationAngle = 0;

    this.cells = [];
    this.graph = null;
    this.astar = astarInstance;
    this.generateMyGraph();

    this.dummBox = BABYLON.MeshBuilder.CreateBox("dummy", { height: 20, width: .1, depth: .1 }, this.scene);
    this.dummBox.position.y = 50;
    this.dummBox.isVisible = false;
    this.dray = new BABYLON.Ray();
    this.drayHelper = new BABYLON.RayHelper(this.dray);
    this.drayHelper.attachToMesh(this.dummBox, new BABYLON.Vector3(1, 0, 0), new BABYLON.Vector3(33.6, 0, 0), this.reactToShotDistance);
  }

  generateMyGraph() {
    for (let i = 0; i < GameGlobals.cells.length; i++) {
      this.cells[i] = GameGlobals.cells[i].slice();
    }
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells.length; j++) {
        if (this.cells[i][j] == 1) {
          this.cells[i][j] = Math.floor((Math.random() * 20) + 1);
        }
      }
    }
    this.graph = new Graph(this.cells);
  }

  getDeltaDegressToTarget(rotatingObject, pointToRotateTo) {
    const direction = pointToRotateTo.subtract(rotatingObject.position);
    const v1 = this.frontVector.normalize();
    const v2 = direction;
    let angle = Math.acos(BABYLON.Vector3.Dot(v1, v2.normalize()));

    if (direction.z > 0) angle = angle * -1;

    const angleDegrees = Math.floor(angle * 180 / Math.PI);
    const playerRotationDegress = Math.floor(rotatingObject.rotation.y * 180 / Math.PI);
    let deltaDegrees = playerRotationDegress - angleDegrees;

    if (deltaDegrees > 180) {
      deltaDegrees = deltaDegrees - 360;
    } else if (deltaDegrees < -180) {
      deltaDegrees = deltaDegrees + 360;
    }
    return deltaDegrees;
  }

  animate(animation) {
    if (this.activeAnim != null) {
      this.activeAnim.stop();
    }

    switch (animation) {
      case 'idle':
        this.speed = 0;
        this.activeAnim = this.animateIdle(true);
        break;
      case 'crouch':
        this.speed = 0;
        this.activeAnim = this.crouch();
        break;
      case 'walk':
        this.speed = 0.9;
        this.activeAnim = this.animateWalk(true);
        break;
      case 'run':
        this.speed = 1.7;
        this.activeAnim = this.animateRun(true);
        break;
      case 'crouchWalk':
        this.speed = 0.6;
        this.activeAnim = this.animateCrouchWalk(true);
        break;
      case 'jump':
        this.speed = 1.1;
        this.activeAnim = this.jump();
        break;
      case 'die':
        this.speed = 0;
        this.activeAnim = this.animateDie(false);
        break;
    }
  }

  animateIdle(loop) {
    const idleAnim = this.scene.beginAnimation(this.skeleton, 0, 64, loop);
    return idleAnim;
  }

  crouch(loop) {
    const crouchAnim = this.scene.beginAnimation(this.skeleton, 66, 95, loop);
    return crouchAnim;
  }

  animateWalk(loop) {
    const walkAnim = this.scene.beginAnimation(this.skeleton, 96, 128, loop);
    return walkAnim;
  }

  animateRun(loop) {
    const runAnim = this.scene.beginAnimation(this.skeleton, 130, 165, loop, 2);
    return runAnim;
  }

  animateCrouchWalk(loop) {
    const crouchWalkAnim = this.scene.beginAnimation(this.skeleton, 167, 196, loop, 1.5);
    return crouchWalkAnim;
  }

  jump(loop) {
    const jumpAnim = this.scene.beginAnimation(this.skeleton, 197, 256, loop);
    return jumpAnim;
  }

  animateDie(loop) {
    const enemy = this;
    if (GameGlobals.killsCount) {
      GameGlobals.killsCount.text = "Kills " + (++GameGlobals.kills);
    }
    
    // Add to kill feed
    if (window.addToKillFeed) {
      window.addToKillFeed(GameGlobals.currentUser?.username || "Player", "Bot " + this.id, "deagle", false);
    }

    if (this.currentX != -10000 && this.currentY != -10000) {
      this.populateCellValueChange(1, this.currentX, this.currentY);
      GameGlobals.cellEnemy[this.currentX + "_" + this.currentY] = null;
    }

    enemy.mesh.checkCollisions = false;
    enemy.headBox.checkCollisions = false;

    const dieAnim = this.scene.beginAnimation(this.skeleton, 695, 749, loop, 1, function () {
      if (GameGlobals.infiniteMode) {
        const findingValidRandomLocationAttempts = 5;
        let attemptsCount = 0;
        while (attemptsCount < findingValidRandomLocationAttempts) {
          const cellIndex = Math.floor((Math.random() * GameGlobals.randomAmmoLocations.length));
          const cell = GameGlobals.randomAmmoLocations[cellIndex];
          let enemyPos = new BABYLON.Vector3(cell.x * GameGlobals.unit - 1650, enemy.mesh.position.y, cell.y * GameGlobals.unit - 1650);

          if (GameGlobals.cells[cell.x][cell.y] != 0) {
            enemy.remove();
            enemyPos = new BABYLON.Vector3(3 * GameGlobals.unit - 1650, 160, 4 * GameGlobals.unit - 1650);
            // Note: cloneGuerilla function would need to be implemented
            break;
          }
          attemptsCount++;
        }
      } else {
        enemy.remove();
      }
    });
    return dieAnim;
  }

  remove(checkIfAllEnmiesAreDead = true) {
    if (this.currentX != -10000 && this.currentY != -10000) {
      this.populateCellValueChange(1, this.currentX, this.currentY);
      GameGlobals.cellEnemy[this.currentX + "_" + this.currentY] = null;
    }

    this.mesh.dispose();
    this.headBox.dispose();
    this.weapon.dispose();
    this.dead = true;

    const enemyIndex = GameGlobals.enemies.indexOf(this);
    if (enemyIndex > -1) {
      GameGlobals.enemies.splice(enemyIndex, 1);
    }

    if (checkIfAllEnmiesAreDead && GameGlobals.enemies.length < 1) {
      GameGlobals.gameStarted = false;
      if (GameGlobals.killsCount) {
        GameGlobals.killsCount.text = "Round Won!";
      }
      GameGlobals.newEnemiesRound = true;
      // Camera and pointer lock handling would go here
    }
  }

  gotHit(shotImpact) {
    this.health -= shotImpact;
    const distance = Math.floor(BABYLON.Vector3.Distance(this.mesh.position, GameGlobals.player.position));

    if (distance <= this.reactToShotDistance) {
      this.isShot = true;
    }

    if (this.health < 0) {
      this.die();
    }
  }

  die() {
    if (this.dead) return;

    if (GameGlobals.audioEnabled && GameGlobals.enemyDeath) {
      if (this.deathSound == null) {
        this.deathSound = GameGlobals.enemyDeath.clone();
      }
      this.deathSound.setPosition(this.mesh.position);
      this.deathSound.play();
    }

    this.dead = true;
    this.animate('die');
  }

  idle() {
    if (this.activeAnimName == 'idle') return;
    this.activeAnimName = 'idle';
    this.animate('idle');
  }

  run() {
    if (this.activeAnimName == 'run') return;
    this.activeAnimName = 'run';
    this.animate('run');
  }

  walk() {
    this.animate('walk');
  }

  crouchWalk() {
    if (this.activeAnimName == 'crouchWalk') return;
    this.activeAnimName = 'crouchWalk';
    this.animate('crouchWalk');
  }

  predicate(mesh) {
    if (mesh.name.startsWith("wall") || (this.mesh.name != mesh.name && mesh.name.startsWith("enemy"))) {
      return true;
    }
    return false;
  }

  castRay(ray) {
    const hit = this.scene.pickWithRay(ray, (mesh) => {
      if (mesh.name == "player box") {
        return true;
      }
      return true;
    });

    if (hit.pickedMesh && hit.pickedMesh.name == "player box") {
      this.destination = 600;
      return hit.pickedMesh;
    }
    return null;
  }

  lookAtPlayer() {
    const deltaDegrees = this.getDeltaDegressToTarget(this.mesh, GameGlobals.player.position);
    const mat = this.skeleton.bones[2].getLocalMatrix().copyFrom(this.initMat);
    this.spineRotationAngle = deltaDegrees * Math.PI / 180;
    this.dummBox.rotation.y = this.spineRotationAngle;
    mat.multiplyToRef(BABYLON.Matrix.RotationX(this.spineRotationAngle), mat);
    this.skeleton.bones[2].markAsDirty();
    this.pointDummyBoxToPlayer();
  }

  populateCellValueChange(value, x, y) {
    for (let i = 0; i < GameGlobals.enemies.length; i++) {
      GameGlobals.enemies[i].cells[x][y] = value;
    }
    GameGlobals.cells[x][y] = value;
  }

  pointDummyBoxToPlayer() {
    const deltaDegrees = this.getDeltaDegressToTarget(this.dummBox, GameGlobals.player.position);
    if (Math.abs(deltaDegrees) > 1) {
      this.facePoint(this.dummBox, GameGlobals.player.position, deltaDegrees, 1);
    }
    const hitMesh = this.castRay(this.dray);
    if (hitMesh != null) {
      this.fireShot(0);
    }
  }

  runBeforeRender() {
    if (!GameGlobals.gameStarted) {
      this.idle();
      return;
    }
    if (this.dead) return;

    this.dummBox.position = this.mesh.position;
    const currentX = Math.floor(this.mesh.position.x / GameGlobals.unit) + GameGlobals.cells.length / 2;
    const currentY = Math.floor(this.mesh.position.z / GameGlobals.unit) + GameGlobals.cells.length / 2;

    if (this.currentX == -10000) {
      this.currentX = currentX;
    }
    if (this.currentY == -10000) {
      this.currentY = currentY;
    }

    if (this.currentX != currentX || this.currentY != currentY) {
      this.populateCellValueChange(Math.floor((Math.random() * 8) + 2), this.currentX, this.currentY);
      GameGlobals.cellEnemy[currentX + "_" + currentY] = null;
    } else {
      this.populateCellValueChange(0, currentX, currentY);
      GameGlobals.cellEnemy[currentX + "_" + currentY] = this.id;
    }

    this.currentX = currentX;
    this.currentY = currentY;

    const target = GameGlobals.player.position.clone();
    const distance = Math.floor(BABYLON.Vector3.Distance(this.mesh.position, target));

    if (this.playerMoved() && !this.findPlayer) {
      this.findPath();
    }

    if (!this.isShot && this.findPlayer && distance > this.distance) {
      if (this.enemyResult && this.enemyPathBlockIndex < this.enemyResult.length && this.findPlayer) {
        const cell = this.cells[this.enemyResult[this.enemyPathBlockIndex].x][this.enemyResult[this.enemyPathBlockIndex].y];
        if (cell == 0 && GameGlobals.cellEnemy[this.enemyResult[this.enemyPathBlockIndex].x + "_" + this.enemyResult[this.enemyPathBlockIndex].y] != this.id) {
          this.lookAtPlayer();
          this.idle();
          this.findPath();
          return;
        }

        const newPos = new BABYLON.Vector3(
          (this.enemyResult[this.enemyPathBlockIndex].x) * GameGlobals.unit - 1650,
          this.mesh.position.y,
          (this.enemyResult[this.enemyPathBlockIndex].y) * GameGlobals.unit - 1650
        );

        newPos.x += GameGlobals.unit;
        newPos.z += GameGlobals.unit;

        const deltaDegrees = this.getDeltaDegressToTarget(this.mesh, newPos);
        if (Math.abs(deltaDegrees) > 1) {
          this.facePoint(this.mesh, newPos, deltaDegrees, 8);
        }
        this.lookAtPlayer();
        this.moveToTarget(this.mesh, newPos, this.speed);

        if (BABYLON.Vector3.Distance(this.mesh.position, newPos) < 20) {
          this.enemyPathBlockIndex++;
        }
      }

      if (distance > this.distance + (this.distance / 4)) {
        this.run();
      } else if (distance > this.distance + 20) {
        this.walk();
      }
    } else {
      this.findPlayer = false;
      this.idle();
      const deltaDegrees = this.getDeltaDegressToTarget(this.mesh, target);
      this.lookAtPlayer();
      if (Math.abs(deltaDegrees) > 0.5) {
        this.facePoint(this.mesh, target, deltaDegrees, 8);
      }
      const hitMesh = this.castRay(this.ray);
      if (hitMesh != null) {
        this.fireShot(distance);
      }
    }
  }

  fireShot(distance) {
    if (GameGlobals.playerDied) return;
    if (this.dead) return;

    if (this.loopsFromLastShot >= this.waitBeforeNextShot) {
      if (GameGlobals.audioEnabled) {
        const soundTurn = Math.floor((Math.random() * 3) + 1);
        if (soundTurn % 2 == 0 && GameGlobals.whizz) {
          GameGlobals.whizz.play();
        } else if (GameGlobals.enemyShooting) {
          GameGlobals.enemyShooting.play();
        }
      }

      if (distance != 0) {
        GameGlobals.player.hit(Math.floor((Math.random() * ((GameGlobals.difficulty / 4) * 3000)) + ((GameGlobals.difficulty / 4) * 1000)) / distance);
      } else {
        GameGlobals.player.hit(Math.floor((Math.random() * ((GameGlobals.difficulty / 4) * 10)) + ((GameGlobals.difficulty / 4) * 3)));
      }

      this.loopsFromLastShot = 0;
    } else {
      this.loopsFromLastShot++;
    }
  }

  findPath() {
    const start = this.graph.grid[Math.floor((this.mesh.position.x + (GameGlobals.grounSideLength / 2)) / GameGlobals.unit)][Math.floor((this.mesh.position.z + (GameGlobals.grounSideLength / 2)) / GameGlobals.unit)];
    const end = this.graph.grid[Math.floor((GameGlobals.player.position.x + (GameGlobals.grounSideLength / 2)) / GameGlobals.unit)][Math.floor((GameGlobals.player.position.z + (GameGlobals.grounSideLength / 2)) / GameGlobals.unit)];

    this.enemyResult = this.astar.search(this.graph, start, end, { heuristic: this.astar.heuristics.diagonal });

    if (this.enemyResult.length > 2) {
      this.enemyPathBlockIndex = 0;
      this.findPlayer = true;
      this.isShot = false;
    }
  }

  playerMoved() {
    if (this.lastPlayerPosition == null) {
      this.lastPlayerPosition = GameGlobals.player.position.clone();
      this.findPlayer = false;
      return true;
    }

    const playerMovement = Math.floor(BABYLON.Vector3.Distance(this.lastPlayerPosition, GameGlobals.player.position));
    if (playerMovement / GameGlobals.unit > 1) {
      this.lastPlayerPosition = GameGlobals.player.position.clone();
      this.findPlayer = false;
      return true;
    }
    return false;
  }

  facePoint(rotatingObject, pointToRotateTo, deltaDegrees, factor) {
    const rotationSpeed = Math.abs(deltaDegrees) / factor;
    if (deltaDegrees > 0) {
      rotatingObject.rotation.y -= rotationSpeed * Math.PI / 180;
      if (rotatingObject.rotation.y < -Math.PI) {
        rotatingObject.rotation.y = Math.PI;
      }
    }
    if (deltaDegrees < 0) {
      rotatingObject.rotation.y += rotationSpeed * Math.PI / 180;
      if (rotatingObject.rotation.y > Math.PI) {
        rotatingObject.rotation.y = -Math.PI;
      }
    }
  }

  moveToTarget(objectToMove, pointToMoveTo, speed, slowDown) {
    const moveVector = pointToMoveTo.subtract(objectToMove.position);
    moveVector.y = 0;
    if (moveVector.length() > speed) {
      moveVector = moveVector.normalize();
      moveVector = moveVector.scale(speed);
      moveVector.y = -9.8;
      objectToMove.moveWithCollisions(moveVector);
    }
  }
}

// Global variables for enemies are now managed by GameGlobals
// The enemies array and cellEnemy object are accessible via GameGlobals.enemies and GameGlobals.cellEnemy
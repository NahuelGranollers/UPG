// CS 1.6 Player Class - Adapted for React + Socket.IO Multiplayer
// Based on https://github.com/akhawatrahTW/cs1.6

import * as BABYLON from 'babylonjs';
import { GameGlobals } from './game-globals.js';

export class Player {
  constructor(leftArm, rightArm, skeleton, weapon, scene, camera) {
    this.leftArm = leftArm;
    this.rightArm = rightArm;
    this.skeleton = skeleton;
    this.weapon = weapon;
    this.scene = scene;
    this.camera = camera;

    // Position and attach weapon and arms to camera
    this.weapon.position.y = 10;
    this.weapon.position = new BABYLON.Vector3(4, 1, -7.5);
    this.weapon.rotation.y = Math.PI - .1;
    this.weapon.parent = this.camera;

    this.leftArm.position.y = 10;
    this.leftArm.position = new BABYLON.Vector3(4, 1, -7.5);
    this.leftArm.rotation.y = Math.PI - .1;
    this.leftArm.parent = this.camera;

    this.rightArm.position.y = 10;
    this.rightArm.position = new BABYLON.Vector3(4, 1, -7.5);
    this.rightArm.rotation.y = Math.PI - .1;
    this.rightArm.parent = this.camera;

    this.activeAnimation = null;
    this.magCapacity = 30;
    this.ammo = this.magCapacity;
    this.bullets = 100;
    this.health = 100;
    this.speed = 0;
    this.isReloading = false;
    this.position = this.camera.position;
    this.fireButtonOn = false;
    this.shotCount = 0;

    // Muzzle flash effect
    this.spriteManager = new BABYLON.SpriteManager("spriteManager", "/cs16-assets/images/muzzleFlash.jpg", 2, { width: 200, height: 150 }, scene);
    this.muzzleFlash = new BABYLON.Sprite("muzzleFlash", this.spriteManager);
    this.muzzleFlash.parent = this.weapon;
    this.muzzleFlash.size = 0;
    this.muzzleFlash.playAnimation(0, 1, true, 100);
    this.muzzleFlash.position.y = 20;
    this.muzzleFlash.position.x = 20;
    this.muzzleFlash.position.z = 20;

    // Muzzle flash plane
    this.muzzleFlashPlane = BABYLON.MeshBuilder.CreatePlane("bloodSplatter", { height: .1, width: .1 }, this.scene);
    this.muzzleFlashPlane.rotation.z += Math.PI / 2;
    this.muzzleFlashPlane.parent = this.camera;
    this.muzzleFlashPlane.position.z += 60;
    this.muzzleFlashPlane.position.y -= 6;
    this.muzzleFlashPlane.position.x -= 13;
    this.muzzleFlashPlane.visibility = false;

    this.shotSoundReady = false;

    // Player collision box
    this.dummyBox = BABYLON.MeshBuilder.CreateBox("player box", { height: 70, width: 40, depth: 40 }, this.scene);
    this.dummyBox.position = new BABYLON.Vector3(600, 15, 0);
    this.dummyBox.visibility = false;

    // Crosshair
    var crosshairMat = new BABYLON.StandardMaterial("crosshairMat", this.scene);
    crosshairMat.diffuseColor = new BABYLON.Color3.Yellow();

    this.crosshairTop = BABYLON.MeshBuilder.CreateBox("crosshairTop", { height: .4, width: .04, depth: .04 }, this.scene);
    this.crosshairTop.position = new BABYLON.Vector3(0, -10, 0);
    this.crosshairTop.position.z += 20;
    this.crosshairTop.position.y += 10.3;
    this.crosshairTop.position.x -= 0;
    this.crosshairTop.isPickable = false;
    this.crosshairTop.parent = this.camera;
    this.crosshairTop.material = crosshairMat;

    this.crosshairBottom = BABYLON.MeshBuilder.CreateBox("crosshairBottom", { height: .4, width: .04, depth: .04 }, this.scene);
    this.crosshairBottom.position = new BABYLON.Vector3(0, -10, 0);
    this.crosshairBottom.position.z += 20;
    this.crosshairBottom.position.y += 9.7;
    this.crosshairBottom.position.x -= 0;
    this.crosshairBottom.isPickable = false;
    this.crosshairBottom.parent = this.camera;
    this.crosshairBottom.material = crosshairMat;

    this.crosshairRight = BABYLON.MeshBuilder.CreateBox("crosshairRight", { height: .4, width: .04, depth: .04 }, this.scene);
    this.crosshairRight.position = new BABYLON.Vector3(0, -10, 0);
    this.crosshairRight.position.z += 20;
    this.crosshairRight.position.y += 10;
    this.crosshairRight.position.x += .3;
    this.crosshairRight.rotation.z = Math.PI / 2;
    this.crosshairRight.isPickable = false;
    this.crosshairRight.parent = this.camera;
    this.crosshairRight.material = crosshairMat;

    this.crosshairLeft = BABYLON.MeshBuilder.CreateBox("crosshairLeft", { height: .4, width: .04, depth: .04 }, this.scene);
    this.crosshairLeft.position = new BABYLON.Vector3(0, -10, 0);
    this.crosshairLeft.position.z += 20;
    this.crosshairLeft.position.y += 10;
    this.crosshairLeft.position.x -= .3;
    this.crosshairLeft.rotation.z -= Math.PI / 2;
    this.crosshairLeft.isPickable = false;
    this.crosshairLeft.parent = this.camera;
    this.crosshairLeft.material = crosshairMat;

    // Collision detection for ammo pickup
    this.camera.onCollide = (mesh) => {
      if (mesh.name === "ammo box") {
        if (this.bullets < 71) {
          this.bullets += 30;
          mesh.dispose();
          setTimeout(() => { this.createAmmo(); }, 3000);
        } else if (this.bullets < 100) {
          this.bullets = 100;
          mesh.dispose();
          setTimeout(() => { this.createAmmo(); }, 3000);
        }
      }
    };

    this.isRandomAmmoCreationEnabled = false;

    // Jump animation
    this.camera.animations = [];
    this.jumpAnimation = new BABYLON.Animation(
      "jump",
      "position.y",
      10,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var keys = [];
    keys.push({ frame: 0, value: this.camera.position.y });
    keys.push({ frame: 5, value: this.camera.position.y + 45 });
    keys.push({ frame: 10, value: this.camera.position.y });
    this.jumpAnimation.setKeys(keys);

    var easingFunction = new BABYLON.CircleEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    this.jumpAnimation.setEasingFunction(easingFunction);

    this.camera.animations.push(this.jumpAnimation);
    this.jumpping = false;
    this.shouldJump = false;
    this.shouldDuck = false;

    // --- CS 1.6 MECHANICS ---
    this.recoil = { x: 0, y: 0 };
    this.recoilRecovery = 0.1;
    this.currentSpread = 0;
    this.baseSpread = 0.02;
    this.maxSpread = 0.15;
    this.walkSpread = 0.05;
    this.runSpread = 0.1;
    
    // Dynamic Crosshair State
    this.crosshairGap = 0;
    this.baseCrosshairGap = 0;
  }

  jump() {
    if (this.jumpping) return;
    this.jumpping = true;
    this.scene.beginAnimation(this.camera, 0, 10, false, 1, () => {
      this.jumpping = false;
    });
  }

  toggleDuck() {
    if (this.shouldDuck) {
      this.camera.position.y = 30;
      this.camera.ellipsoid.y = 15;
      this.camera.speed = 2;
      this.dummyBox.scaling.y = .6;
    } else {
      this.camera.position.y = 54;
      this.camera.ellipsoid.y = 27;
      this.camera.speed = 7;
      this.dummyBox.scaling.y = 1;
    }

    this.camera.animations = [];
    var keys = [];
    keys.push({ frame: 0, value: this.camera.position.y });
    keys.push({ frame: 5, value: this.camera.position.y + 45 });
    keys.push({ frame: 10, value: this.camera.position.y });
    this.camera.animations.push(this.jumpAnimation);
    this.jumpAnimation.setKeys(keys);
  }

  animate(animation) {
    if (this.activeAnim != null) {
      this.activeAnim.stop();
    }

    switch (animation) {
      case 'shoot':
        this.speed = 0;
        this.activeAnim = this.startShootAnimation();
        break;
      case 'reload':
        this.speed = 0;
        this.activeAnim = this.startReloadAnimation();
        break;
    }
  }

  startShootAnimation() {
    const shootAnim = this.scene.beginAnimation(this.skeleton, 170, 186, false, 2, () => {}, false); // Faster animation
    return shootAnim;
  }

  reload() {
    if (this.bullets === 0) return;
    if (this.ammo === this.magCapacity) return;

    if (this.bullets < this.magCapacity - this.ammo) {
      this.ammo += this.bullets;
      this.bullets = 0;
      this.isReloading = true;
    } else if (this.bullets < this.magCapacity) {
      this.bullets = this.bullets - (this.magCapacity - this.ammo);
      this.ammo = this.magCapacity;
      this.isReloading = true;
    } else {
      this.bullets = this.bullets - (this.magCapacity - this.ammo);
      this.ammo = this.magCapacity;
      this.isReloading = true;
    }

    this.animate('reload');
    if (!this.isRandomAmmoCreationEnabled) {
      this.isRandomAmmoCreationEnabled = true;
      this.createAmmo();
    }
  }

  startReloadAnimation() {
    const player = this;
    const reloadAnim = this.scene.beginAnimation(this.skeleton, 70, 170, false, 1.5, function () { // Faster reload
      player.isReloading = false;
    });
    return reloadAnim;
  }

  shoot() {
    if (this.isReloading) return;

    // Play shooting sound if enabled
    if (GameGlobals.playerShooting) {
      GameGlobals.playerShooting.play();
    }

    this.ammo--;
    this.animate('shoot');
    this.muzzleFlash.size = 20;

    // --- RECOIL & SPREAD ---
    // Add recoil
    this.recoil.x += (Math.random() - 0.5) * 0.02; // Horizontal shake
    this.recoil.y += 0.02; // Vertical kick
    
    // Cap recoil
    if (this.recoil.y > 0.1) this.recoil.y = 0.1;
    if (Math.abs(this.recoil.x) > 0.05) this.recoil.x = (this.recoil.x > 0 ? 0.05 : -0.05);

    // Calculate spread based on movement and recoil
    const isMoving = this.camera.speed > 0 && (this.camera.keysUp.some(k => this.scene.actionManager?.hasSpecificTrigger(k)) || /* check movement keys */ false); // Simplified check
    let currentSpread = this.baseSpread + (this.recoil.y * 2);
    if (this.shouldJump) currentSpread += 0.1; // Jumping accuracy penalty
    
    // Ray casting with spread
    const width = this.scene.getEngine().getRenderWidth();
    const height = this.scene.getEngine().getRenderHeight();
    
    // Apply spread to ray direction
    const origin = this.camera.position;
    const forward = this.camera.getForwardRay().direction;
    
    // Random spread vector
    const spreadX = (Math.random() - 0.5) * currentSpread;
    const spreadY = (Math.random() - 0.5) * currentSpread;
    
    const direction = new BABYLON.Vector3(
      forward.x + spreadX,
      forward.y + spreadY,
      forward.z
    ).normalize();

    const ray = new BABYLON.Ray(origin, direction, 10000);

    const predicate = function (mesh) {
      if (mesh.name === 'player box') return false;
      return true;
    };

    const pickInfo = this.scene.pickWithRay(ray, predicate);

    if (pickInfo.pickedMesh) {
      // Create bullet hole/impact effect
      this.createBulletHole(pickInfo);

      if (pickInfo.pickedMesh.name === 'head') {
        const enemy = pickInfo.pickedMesh.enemy;
        if (enemy) {
          enemy.gotHit(101); // Headshot damage
          this.showHitmarker(true); // Headshot hitmarker
        }
      } else if (pickInfo.pickedMesh.name.startsWith('enemy')) {
        const enemy = pickInfo.pickedMesh.enemy;
        if (enemy) {
          enemy.gotHit(30); // Body shot damage
          this.showHitmarker(false); // Normal hitmarker
        }
      }
    }

    if (this.ammo <= 0) {
      this.reload();
      this.muzzleFlash.size = 0;
      return;
    }
  }

  createBulletHole(pickInfo) {
    // Simple visual feedback for bullet impact
    const impact = BABYLON.MeshBuilder.CreatePlane("impact", { size: 2 }, this.scene);
    impact.position = pickInfo.pickedPoint;
    impact.lookAt(pickInfo.pickedPoint.add(pickInfo.getNormal(true)));
    impact.position.addInPlace(pickInfo.getNormal(true).scale(0.1)); // Offset slightly
    
    const material = new BABYLON.StandardMaterial("impactMat", this.scene);
    material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    material.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    impact.material = material;
    
    // Fade out and dispose
    let alpha = 1;
    const fadeOut = () => {
      alpha -= 0.05;
      if (alpha <= 0) {
        impact.dispose();
      } else {
        material.alpha = alpha;
        requestAnimationFrame(fadeOut);
      }
    };
    setTimeout(fadeOut, 5000);
  }

  showHitmarker(isHeadshot) {
    // This should be handled by the UI layer, but we can trigger it here
    if (window.showHitmarkerUI) {
      window.showHitmarkerUI(isHeadshot);
    }
  }

  hit(shotImpact) {
    this.health -= shotImpact;
    // Screen shake on hit
    this.camera.rotation.z += (Math.random() - 0.5) * 0.1;
    
    if (this.health <= 1) {
      this.health = 0;
      this.die();
    }
  }

  die() {
    // Handle player death
    this.leftArm.isVisible = false;
    this.rightArm.isVisible = false;
    this.weapon.isVisible = false;
    this.crosshairTop.isVisible = false;
    this.crosshairBottom.isVisible = false;
    this.crosshairLeft.isVisible = false;
    this.crosshairRight.isVisible = false;
    this.muzzleFlash.isVisible = false;
    this.fireButtonOn = false;

    // Exit pointer lock
    document.exitPointerLock();
  }

  createAmmo() {
    const ammoBox = BABYLON.MeshBuilder.CreateBox("ammo box", { width: 20, height: 1, depth: 20 }, this.scene);
    const cellIndex = Math.floor((Math.random() * GameGlobals.randomAmmoLocations.length));
    const cell = GameGlobals.randomAmmoLocations[cellIndex];
    const ammoPos = new BABYLON.Vector3(cell.x * GameGlobals.unit - 1650, 1, cell.y * GameGlobals.unit - 1650);
    ammoBox.position = ammoPos;

    const weapon = GameGlobals.deagle.clone();
    weapon.position = new BABYLON.Vector3(0, 0, 0);
    weapon.rotation.z += Math.PI / 2;
    weapon.parent = ammoBox;
    weapon.checkCollisions = false;
    ammoBox.checkCollisions = true;
    ammoBox.isVisible = false;
  }

  runBeforeRender() {
    if (this.health <= 0) return;

    if (this.shouldJump) {
      this.jump();
    }

    // --- RECOIL RECOVERY ---
    if (this.recoil.y > 0) {
      this.camera.rotation.x -= this.recoil.y * 0.1; // Apply recoil to camera
      this.recoil.y -= this.recoilRecovery * 0.1; // Recover
      if (this.recoil.y < 0) this.recoil.y = 0;
    }
    if (Math.abs(this.recoil.x) > 0) {
      this.camera.rotation.y += this.recoil.x * 0.1;
      this.recoil.x *= 0.9; // Decay horizontal recoil
    }

    // --- DYNAMIC CROSSHAIR ---
    // Expand crosshair based on movement and shooting
    let targetGap = this.baseCrosshairGap;
    if (this.recoil.y > 0) targetGap += this.recoil.y * 200; // Expand on shoot
    
    // Lerp crosshair gap
    this.crosshairGap = this.crosshairGap + (targetGap - this.crosshairGap) * 0.2;
    
    // Apply to crosshair meshes
    this.crosshairTop.position.y = 10.3 + (this.crosshairGap * 0.01);
    this.crosshairBottom.position.y = 9.7 - (this.crosshairGap * 0.01);
    this.crosshairRight.position.x = 0.3 + (this.crosshairGap * 0.01);
    this.crosshairLeft.position.x = -0.3 - (this.crosshairGap * 0.01);


    this.dummyBox.position = this.camera.position.clone();
    this.dummyBox.position.y -= 10;

    this.muzzleFlash.angle += 0.01;
    this.muzzleFlash.position = this.muzzleFlashPlane.getAbsolutePosition();
    this.position = this.camera.position;

    if (this.fireButtonOn) {
      if (this.shotCount < 8) { // Increased fire rate slightly (was 12)
        this.shotCount++;
      } else {
        this.shoot();
        this.shotCount = 0;
      }
    } else {
      this.shotCount = 0;
      this.muzzleFlash.size = 0;
    }
  }
}
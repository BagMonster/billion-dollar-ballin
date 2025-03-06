// Main game file—sets up "Billion Dollar Ballin" with Phaser scenes and logic
// Wrapped in webpack to bundle modules—simplified for readability
(function(modules) {
    // Module cache and loader—runs all game code
    const loadedModules = {};
    const moduleStatus = { 0: 0 }; // Tracks loaded modules
    const moduleQueue = [];

    // Loads a module by ID—runs its code and caches it
    function loadModule(moduleId) {
        if (loadedModules[moduleId]) return loadedModules[moduleId].exports;
        const module = loadedModules[moduleId] = {
            id: moduleId,
            loaded: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, loadModule);
        module.loaded = true;
        return module.exports;
    }

    // Adds basic module utilities—don’t worry about these, they’re boilerplate
    loadModule.modules = modules;
    loadModule.cache = loadedModules;
    loadModule.define = function(obj, key, getter) {
        if (!loadModule.hasProperty(obj, key)) {
            Object.defineProperty(obj, key, { enumerable: true, get: getter });
        }
    };
    loadModule.markAsModule = function(obj) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(obj, Symbol.toStringTag, { value: "Module" });
        }
        Object.defineProperty(obj, "__esModule", { value: true });
    };
    loadModule.hasProperty = function(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    };

    // Starts the game—loads entry module (311)
    moduleQueue.push([122, 1]); // Entry point: module 122
    while (moduleQueue.length) {
        const [id] = moduleQueue.shift();
        loadModule(id);
    }
})({
    // Entry point—kicks off the game
    122: function(module, exports, require) {
        require(123); // Some setup (likely Phaser imports)
        module.exports = require(311); // Loads main game module
    },

    // Main game module—defines game state, helpers, and scenes
    311: function(module, exports, require) {
    "use strict";
    require(309);

    // Game state—tracks score, level, and player info
    const gameState = {
        levelNumber: 1,
        score: 0,
        userName: "",
        isMobileView: false
    };

    // Helper functions—used across scenes for positioning and timing
    function centerX(scene) {
        return scene.sys.canvas.width / 2;
    }
    function centerY(scene) {
        return scene.sys.canvas.height / 2;
    }
    function canvasWidth(scene) {
        return scene.sys.canvas.width;
    }
    function canvasHeight(scene) {
        return scene.sys.canvas.height;
    }
    function formatTime(milliseconds) {
        const seconds = milliseconds / 1000;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds - 60 * minutes);
        return `${minutes < 10 ? "0" + minutes : minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
    }

    // BootScene: Loads game assets (images, sounds) and picks the menu
    class BootScene extends Phaser.Scene {
        constructor() {
            super({ key: "BootScene" });
        }
        preload() {
            const assetPath = gameState.isMobileView ? "./assets/" : "./assets/desktop/";
            this.load.spritesheet("player-dribble", `${assetPath}sprites/player-dribble.png`, {
                frameWidth: 190,
                frameHeight: 190
            });
            this.load.spritesheet("player-shot", `${assetPath}sprites/player-shot.png`, {
                frameWidth: 190,
                frameHeight: 190
            });
            this.load.spritesheet("hoop", `${assetPath}sprites/hoop.png`, {
                frameWidth: 166,
                frameHeight: 208
            });
            this.load.image("bg-1", `${assetPath}sprites/bg-1.png`);
            this.load.image("bg-2", `${assetPath}sprites/bg-2.png`);
            this.load.image("bg-3", `${assetPath}sprites/bg-3.png`);
            this.load.image("border", `${assetPath}sprites/border.png`);
            this.load.image("board", `${assetPath}sprites/board.png`);
            this.load.image("menu-bg", `${assetPath}sprites/menu-bg.png`);
            this.load.image("btn-home", `${assetPath}sprites/btn-home.png`);
            this.load.image("btn-replay", `${assetPath}sprites/btn-replay.png`);
            this.load.image("popup", `${assetPath}sprites/popup.png`);
            this.load.image("score-fill", `${assetPath}sprites/score-fill.png`);
            this.load.image("slash", `${assetPath}sprites/slash.png`);
            this.load.image("backBtn", `${assetPath}sprites/backBtn.png`);
            this.load.spritesheet("ball", "./assets/sprites/ball-sheet.png", {
                frameWidth: 230,
                frameHeight: 230
            });
            this.load.audio("dribble-sound", ["./assets/audio/dribble-sound.mp3", "./assets/audio/dribble-sound.ogg"]);
            this.load.audio("score-sound", ["./assets/audio/dribble-sound.mp3", "./assets/audio/score-sound.ogg"]);
            this.load.audio("applause-sound", ["./assets/audio/applause.mp3", "./assets/audio/applause.ogg"]);
            this.load.audio("whistle-blows", ["./assets/audio/whistle-blows.mp3", "./assets/audio/whistle-blows.ogg"]);
            this.add.text(centerX(this), centerY(this), "Loading....", {
                fontSize: "70px",
                fontFamily: "font",
                color: "#ffcd00"
            }).setOrigin(0.5);
        }
        create() {
            if (gameState.isMobileView) {
                this.scene.start("MenuSceneMobile");
            } else {
                this.scene.start("MenuScene");
            }
        }
        update() {}
    }

    // setupAnimations: Creates animations for player dribbling, shooting, and hoop movement
    function setupAnimations(animationManager) {
        animationManager.create({
            key: "player-dribble",
            frames: animationManager.generateFrameNumbers("player-dribble", { start: 0, end: 15 }),
            frameRate: 30,
            repeat: -1
        });
        animationManager.create({
            key: "player-shot",
            frames: animationManager.generateFrameNumbers("player-shot", { start: 0, end: 9 }),
            frameRate: 30
        });
        animationManager.create({
            key: "hoopAnim",
            frames: animationManager.generateFrameNumbers("hoop", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0] }),
            frameRate: 30
        });
    }

    // GameScene: Controls the desktop gameplay—shooting the ball, moving the hoop, scoring points
    class GameScene extends Phaser.Scene {
        constructor() {
            super({ key: "GameScene" });
            this.ballSpeed = 1000;
            this.gravity = 2300;
            this.ball = null;
            this.pathDots = [];
            this.player = null;
            this.hoop = null;
            this.hoopNet = null;
            this.isShooting = false;
            this.hasShot = false;
            this.hasScored = false;
            this.isPlaying = false;
            this.isGameOver = false;
            this.timerText = null;
            this.livesLeft = 3;
            this.lifeIcons = [];
            this.scoreboard = null;
            this.leaderboardData = null;
            this.dotRange = 0.8;
        }
        init() {
            this.fetchLeaderboard();
        }
        create() {
            this.lifeIcons = [];
            this.livesLeft = 3;
            this.isPlaying = false;
            this.isShooting = false;
            this.hasShot = false;
            this.isGameOver = false;
            setupAnimations(this.anims);
            this.add.image(centerX(this), centerY(this), `bg-${gameState.levelNumber}`);
            const levelText = this.add.text(centerX(this), centerY(this), `LEVEL ${gameState.levelNumber}`, {
                fontSize: "100px",
                fontFamily: "font"
            }).setOrigin(0.5).setScale(0).setDepth(5);
            let timeLeft = 45000;
            if (gameState.levelNumber === 3) {
                timeLeft = 20000;
                this.dotRange = 0.6;
            } else if (gameState.levelNumber === 2) {
                this.dotRange = 0.7;
            }
            this.timerText = this.add.text(80, 50, formatTime(timeLeft), {
                fontSize: "50px",
                fontFamily: "font"
            }).setOrigin(0.5).setDepth(5);
            this.tweens.add({
                delay: 1000,
                targets: levelText,
                scale: 1.1,
                duration: 500,
                onComplete: () => {
                    this.tweens.add({
                        targets: levelText,
                        scale: 0.6,
                        duration: 500,
                        yoyo: true,
                        onComplete: () => {
                            levelText.visible = false;
                            this.isPlaying = true;
                            this.sound.play("whistle-blows");
                        }
                    });
                }
            });
            for (let i = 0; i < 3; i++) {
                const lifeIcon = this.add.image(canvasWidth(this) - 30 - 50 * i, 50, "ball").setScale(0.2);
                this.lifeIcons.push(lifeIcon);
            }
            this.pathDots = [];
            this.ball = this.physics.add.sprite(290, canvasHeight(this) - 420, "ball")
                .setDepth(3)
                .setScale(0.2)
                .setVisible(false);
            this.ball.body.setCircle(this.ball.width * 0.5);
            this.ball.setBounceY(0.4);
            this.input.activePointer.x = canvasWidth(this) / 2;
            this.input.activePointer.y = canvasHeight(this) / 2 - 100;
            this.drawShotPath();
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    if (this.isPlaying) {
                        timeLeft -= 1000;
                        this.timerText.text = formatTime(timeLeft);
                        if (timeLeft === 0) {
                            if (gameState.levelNumber < 3) {
                                gameState.levelNumber++;
                                this.ball.visible = false;
                                this.time.addEvent({
                                    delay: 1000,
                                    callback: () => this.scene.start("GameScene")
                                });
                            } else {
                                this.isPlaying = false;
                                this.showGameOver();
                            }
                        }
                    }
                },
                repeat: -1
            });
            this.input.on("pointerdown", () => {
                if (!this.isGameOver && !this.hasShot) {
                    this.isShooting = true;
                    this.player.stop();
                    this.player.setTexture("player-shot", 0);
                    this.ball.setVisible(true);
                }
            });
            this.ball.angle = 0;
            this.input.on("pointerup", () => {
                if (!this.isGameOver && !this.hasShot && this.ballSpeed !== 2250) {
                    this.ball.setGravityY(this.gravity);
                    this.ball.body.velocity.x = Math.cos(this.ball.rotation) * this.ballSpeed;
                    this.ball.body.velocity.y = Math.sin(this.ball.rotation) * this.ballSpeed;
                    this.isShooting = false;
                    this.updateShotPath(false);
                    this.player.play("player-shot", true);
                    this.hasShot = true;
                }
            });
            this.input.on("pointermove", () => {
                if (this.isShooting && !this.hasShot) {
                    const aimPower = -(this.input.activePointer.y - this.ball.y) * 10;
                    this.ballSpeed = aimPower;
                    this.updateShotPath(true);
                }
            });
            this.lastMouseX = this.input.activePointer.x;
            this.player = this.add.sprite(250, 600, "player-dribble").setScale(1.5).setFlipX(true);
            this.player.play("player-dribble", true);
            this.time.addEvent({
                delay: 500,
                callback: () => {
                    if (!this.isShooting && !this.hasShot) this.sound.play("dribble-sound");
                },
                repeat: -1
            });
            this.hoop = this.add.container(centerX(this), 200).setScale(0.8, 0.5);
            const hoopBoard = this.add.image(0, -150, "board").setScale(0.6, 1);
            this.hoopNet = this.add.sprite(0, 40, "hoop").setScale(0.8, 1);
            const hoopSensor = this.physics.add.sprite(0, 80, "ball").setScale(0.1).setAlpha(0);
            const leftRim = this.physics.add.image(-61, 23, "border").setAlpha(0).setScale(0.02, 0.2).setImmovable(true);
            leftRim.angle = -10;
            const rightRim = this.physics.add.image(57, 23, "border").setAlpha(0).setScale(0.02, 0.22).setAngle(10).setImmovable(true);
            this.scoreboard = this.add.text(0, -252, `${gameState.score}`, {
                fontFamily: "font",
                fontSize: "45px",
                color: "red"
            }).setOrigin(0.5);
            this.hoop.add([hoopBoard, this.hoopNet, hoopSensor, leftRim, rightRim, this.scoreboard]);
            this.hasScored = false;
            const ground = this.physics.add.image(centerX(this), canvasHeight(this) - 40, "border")
                .setAlpha(0)
                .setScale(10, 0.5)
                .setImmovable(true);
            this.physics.add.overlap(this.ball, hoopSensor, () => {
                if (!this.hasScored) {
                    this.sound.play("score-sound");
                    this.hasScored = true;
                    this.hoopNet.play("hoopAnim", true);
                    gameState.score++;
                    this.scoreboard.setText(`${gameState.score}`);
                    this.sound.play("applause-sound");
                }
            });
            const bounceSound = this.sound.add("dribble-sound", { volume: 0.4 });
            this.physics.add.collider(this.ball, leftRim, () => {
                if (!bounceSound.isPlaying) bounceSound.play();
            });
            this.physics.add.collider(this.ball, rightRim, () => {
                if (!bounceSound.isPlaying) bounceSound.play();
            });
            let hasHitGround = false;
            this.physics.add.collider(this.ball, ground, () => {
                if (!hasHitGround) {
                    if (!this.hasScored) {
                        this.livesLeft--;
                        this.lifeIcons[this.livesLeft].visible = false;
                        if (this.livesLeft === 0) {
                            this.isPlaying = false;
                            this.isGameOver = true;
                            this.showGameOver();
                        }
                    }
                    this.sound.play("dribble-sound");
                    hasHitGround = true;
                    this.time.addEvent({
                        delay: 1200,
                        callback: () => {
                            if (this.livesLeft > 0) {
                                console.log("reset");
                                this.resetBall();
                                hasHitGround = false;
                            }
                        }
                    });
                }
            });
            if (gameState.levelNumber !== 1) this.addSlashEffect();
        }
        update() {
            if (!this.hasShot && this.isShooting) {
                this.ball.rotation = Phaser.Math.Angle.Between(
                    -this.input.activePointer.x,
                    -this.input.activePointer.y,
                    -this.ball.x,
                    -this.ball.y
                );
            }
            if (this.ball.y > canvasHeight(this)) this.resetBall();
        }
        resetBall() {
            if (this.hasShot) {
                console.log("Ball reset");
                this.hasShot = false;
                this.isShooting = false;
                this.ball.setGravityY(0);
                this.ball.body.velocity.x = 0;
                this.ball.body.velocity.y = 0;
                this.ball.setPosition(290, canvasHeight(this) - 420);
                this.player.play("player-dribble", true);
                this.ball.setVisible(false);
                this.hasScored = false;
                this.moveHoopRandomly();
            }
        }
        drawShotPath() {
            const angle = -this.ball.rotation;
            for (let t = 0; t < this.dotRange; t += 0.03) {
                const x = this.ballSpeed * t * Math.cos(angle) * 0.99;
                const y = this.ballSpeed * t * Math.sin(angle) * 0.99 - 0.5 * this.gravity * t * t;
                const dot = this.add.image(x + this.ball.x, this.ball.y - y, "ball")
                    .setDepth(3)
                    .setScale(0.04)
                    .setVisible(false);
                this.pathDots.push(dot);
            }
        }
        updateShotPath(show) {
            const angle = -this.ball.rotation;
            let index = 0;
            for (let t = 0; t < this.dotRange; t += 0.03) {
                const x = this.ballSpeed * t * Math.cos(angle) * 0.99;
                const y = this.ballSpeed * t * Math.sin(angle) * 0.99 - 0.5 * this.gravity * t * t;
                this.pathDots[index].x = x + this.ball.x;
                this.pathDots[index].y = this.ball.y - y;
                this.pathDots[index].visible = show;
                index++;
            }
        }
        moveHoopRandomly() {
            const x = Phaser.Math.FloatBetween(centerX(this), canvasWidth(this) - 250);
            const y = Phaser.Math.FloatBetween(210, canvasHeight(this) - 500);
            this.hoop.setPosition(x, y);
        }
        showGameOver() {
            this.sendLeaderboardData();
            const gameOverBox = this.add.container(centerX(this), centerY(this)).setDepth(10);
            const popup = this.add.image(0, 0, "popup");
            const title = this.add.text(0, -300, "GAME OVER", {
                fontSize: "60px",
                fontFamily: "font",
                color: "red"
            }).setOrigin(0.5);
            const scoreFill = this.add.image(0, -7, "score-fill").setScale(1.3);
            const scoreText = this.add.text(0, -50, `SCORE\n${gameState.score}`, {
                fontSize: "90px",
                fontFamily: "font",
                color: "black",
                align: "center"
            }).setOrigin(0.5);
            const homeButton = this.add.image(-130, 160, "btn-home").setInteractive({ cursor: "pointer" })
                .on("pointerup", () => {
                    gameState.score = 0;
                    gameState.levelNumber = 1;
                    this.scene.start("MenuScene");
                });
            const replayButton = this.add.image(130, 160, "btn-replay").setInteractive({ cursor: "pointer" })
                .on("pointerup", () => {
                    gameState.score = 0;
                    gameState.levelNumber = 1;
                    this.scene.start("GameScene");
                });
            gameOverBox.add([popup, title, scoreFill, scoreText, homeButton, replayButton]);
        }
        addSlashEffect() {
            const slash = this.add.image(centerX(this), centerY(this), "slash").setDepth(10);
            slash.visible = true;
            this.tweens.add({
                targets: slash,
                delay: 500,
                alpha: 0,
                onComplete: () => {
                    slash.visible = false;
                    slash.alpha = 1;
                }
            });
        }
        sendLeaderboardData() {
            const newEntry = { name: gameState.userName, score: gameState.score };
            this.leaderboardData.user.push(newEntry);
            console.log(this.leaderboardData);
            $.ajax({
                type: "POST",
                url: "https://toolkitweb.xyz/toolkit/basket_leader.php",
                data: { data: this.leaderboardData },
                beforeSend: () => console.log("sending"),
                success: (response) => console.log(response),
                error: () => console.log("error")
            });
        }
        fetchLeaderboard() {
            fetch("https://toolkitweb.xyz/toolkit/basket-leaderboard.json")
                .then(response => {
                    if (!response.ok) throw new Error("Network error: " + response.statusText);
                    return response.json();
                })
                .then(data => this.leaderboardData = data)
                .catch(error => console.error("Fetch error:", error));
        }
    }

    // GameSceneMobile: Controls mobile gameplay—shooting the ball, moving the hoop, scoring points
    class GameSceneMobile extends Phaser.Scene {
        constructor() {
            super({ key: "GameSceneMobile" });
            this.ballSpeed = 1000;
            this.gravity = 2300;
            this.ball = null;
            this.pathDots = [];
            this.player = null;
            this.hoop = null;
            this.hoopNet = null;
            this.isShooting = false;
            this.hasShot = false;
            this.hasScored = false;
            this.isPlaying = false;
            this.isGameOver = false;
            this.timerText = null;
            this.livesLeft = 3;
            this.lifeIcons = [];
            this.scoreboard = null;
            this.leaderboardData = null;
            this.dotRange = 0.8;
        }
        init() {
            this.fetchLeaderboard();
        }
        create() {
            this.lifeIcons = [];
            this.livesLeft = 3;
            this.isPlaying = false;
            this.isShooting = false;
            this.hasShot = false;
            this.isGameOver = false;
            setupAnimations(this.anims);
            this.add.image(centerX(this), centerY(this), `bg-${gameState.levelNumber}`);
            const levelText = this.add.text(centerX(this), centerY(this), `LEVEL ${gameState.levelNumber}`, {
                fontSize: "100px",
                fontFamily: "font"
            }).setOrigin(0.5).setScale(0).setDepth(5);
            let timeLeft = 45000;
            if (gameState.levelNumber === 3) {
                timeLeft = 20000;
                this.dotRange = 0.6;
            } else if (gameState.levelNumber === 2) {
                this.dotRange = 0.7;
            }
            this.timerText = this.add.text(80, 50, formatTime(timeLeft), {
                fontSize: "50px",
                fontFamily: "font"
            }).setOrigin(0.5).setDepth(5);
            this.tweens.add({
                delay: 1000,
                targets: levelText,
                scale: 1.1,
                duration: 500,
                onComplete: () => {
                    this.tweens.add({
                        targets: levelText,
                        scale: 0.6,
                        duration: 500,
                        yoyo: true,
                        onComplete: () => {
                            levelText.visible = false;
                            this.isPlaying = true;
                            this.sound.play("whistle-blows");
                        }
                    });
                }
            });
            for (let i = 0; i < 3; i++) {
                const lifeIcon = this.add.image(canvasWidth(this) - 30 - 50 * i, 50, "ball").setScale(0.2);
                this.lifeIcons.push(lifeIcon);
            }
            this.pathDots = [];
            this.ball = this.physics.add.sprite(140, canvasHeight(this) - 430, "ball")
                .setDepth(3)
                .setScale(0.2)
                .setVisible(false);
            this.ball.body.setCircle(this.ball.width * 0.5);
            this.ball.setBounceY(0.4);
            this.input.activePointer.x = canvasWidth(this) / 2;
            this.input.activePointer.y = canvasHeight(this) / 2 - 100;
            this.drawShotPath();
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    if (this.isPlaying) {
                        timeLeft -= 1000;
                        this.timerText.text = formatTime(timeLeft);
                        if (timeLeft === 0) {
                            if (gameState.levelNumber < 3) {
                                gameState.levelNumber++;
                                this.ball.visible = false;
                                this.time.addEvent({
                                    delay: 1000,
                                    callback: () => this.scene.start("GameSceneMobile")
                                });
                            } else {
                                this.isPlaying = false;
                                this.showGameOver();
                            }
                        }
                    }
                },
                repeat: -1
            });
            this.input.on("pointerdown", () => {
                if (!this.isGameOver && !this.hasShot) {
                    this.isShooting = true;
                    this.player.stop();
                    this.player.setTexture("player-shot", 0);
                    this.ball.setVisible(true);
                }
            });
            this.ball.angle = 0;
            this.input.on("pointerup", () => {
                if (!this.isGameOver && !this.hasShot && this.ballSpeed !== 2250) {
                    this.ball.setGravityY(this.gravity);
                    this.ball.body.velocity.x = Math.cos(this.ball.rotation) * this.ballSpeed;
                    this.ball.body.velocity.y = Math.sin(this.ball.rotation) * this.ballSpeed;
                    this.isShooting = false;
                    this.updateShotPath(false);
                    this.player.play("player-shot", true);
                    this.hasShot = true;
                }
            });
            this.input.on("pointermove", () => {
                if (this.isShooting && !this.hasShot) {
                    const aimPower = -(this.input.activePointer.y - this.ball.y) * 10;
                    this.ballSpeed = aimPower;
                    this.updateShotPath(true);
                }
            });
            this.lastMouseX = this.input.activePointer.x;
            this.player = this.add.sprite(100, 900, "player-dribble").setScale(1.5).setFlipX(true);
            this.player.play("player-dribble", true);
            this.time.addEvent({
                delay: 500,
                callback: () => {
                    if (!this.isShooting && !this.hasShot) this.sound.play("dribble-sound");
                },
                repeat: -1
            });
            this.hoop = this.add.container(centerX(this), 200).setScale(0.8, 0.5);
            const hoopBoard = this.add.image(0, -150, "board").setScale(0.6, 1);
            this.hoopNet = this.add.sprite(0, 40, "hoop").setScale(0.8, 1);
            const hoopSensor = this.physics.add.sprite(0, 80, "ball").setScale(0.1).setAlpha(0);
            const leftRim = this.physics.add.image(-61, 23, "border").setAlpha(0).setScale(0.02, 0.2).setImmovable(true);
            leftRim.angle = -10;
            const rightRim = this.physics.add.image(57, 23, "border").setAlpha(0).setScale(0.02, 0.22).setAngle(10).setImmovable(true);
            this.scoreboard = this.add.text(0, -252, `${gameState.score}`, {
                fontFamily: "font",
                fontSize: "45px",
                color: "red"
            }).setOrigin(0.5);
            this.hoop.add([hoopBoard, this.hoopNet, hoopSensor, leftRim, rightRim, this.scoreboard]);
            this.hasScored = false;
            const ground = this.physics.add.image(centerX(this), canvasHeight(this) - 40, "border")
                .setAlpha(0)
                .setScale(10, 0.5)
                .setImmovable(true);
            this.physics.add.overlap(this.ball, hoopSensor, () => {
                if (!this.hasScored) {
                    this.sound.play("score-sound");
                    this.hasScored = true;
                    this.hoopNet.play("hoopAnim", true);
                    gameState.score++;
                    this.scoreboard.setText(`${gameState.score}`);
                    this.sound.play("applause-sound");
                }
            });
            const bounceSound = this.sound.add("dribble-sound", { volume: 0.4 });
            this.physics.add.collider(this.ball, leftRim, () => {
                if (!bounceSound.isPlaying) bounceSound.play();
            });
            this.physics.add.collider(this.ball, rightRim, () => {
                if (!bounceSound.isPlaying) bounceSound.play();
            });
            let hasHitGround = false;
            this.physics.add.collider(this.ball, ground, () => {
                if (!hasHitGround) {
                    if (!this.hasScored) {
                        this.livesLeft--;
                        this.lifeIcons[this.livesLeft].visible = false;
                        if (this.livesLeft === 0) {
                            this.isPlaying = false;
                            this.isGameOver = true;
                            this.showGameOver();
                        }
                    }
                    this.sound.play("dribble-sound");
                    hasHitGround = true;
                    this.time.addEvent({
                        delay: 1200,
                        callback: () => {
                            if (this.livesLeft > 0) {
                                console.log("reset");
                                this.resetBall();
                                hasHitGround = false;
                            }
                        }
                    });
                }
            });
            if (gameState.levelNumber !== 1) this.addSlashEffect();
        }
        update() {
            if (!this.hasShot && this.isShooting) {
                this.ball.rotation = Phaser.Math.Angle.Between(
                    -this.input.activePointer.x,
                    -this.input.activePointer.y,
                    -this.ball.x,
                    -this.ball.y
                );
            }
            if (this.ball.y > canvasHeight(this)) this.resetBall();
        }
        resetBall() {
            if (this.hasShot) {
                console.log("Ball reset");
                this.hasShot = false;
                this.isShooting = false;
                this.ball.setGravityY(0);
                this.ball.body.velocity.x = 0;
                this.ball.body.velocity.y = 0;
                this.ball.setPosition(140, canvasHeight(this) - 430);
                this.player.play("player-dribble", true);
                this.ball.setVisible(false);
                this.hasScored = false;
                this.moveHoopRandomly();
            }
        }
        drawShotPath() {
            const angle = -this.ball.rotation;
            for (let t = 0; t < this.dotRange; t += 0.03) {
                const x = this.ballSpeed * t * Math.cos(angle) * 0.99;
                const y = this.ballSpeed * t * Math.sin(angle) * 0.99 - 0.5 * this.gravity * t * t;
                const dot = this.add.image(x + this.ball.x, this.ball.y - y, "ball")
                    .setDepth(3)
                    .setScale(0.04)
                    .setVisible(false);
                this.pathDots.push(dot);
            }
        }
        updateShotPath(show) {
            const angle = -this.ball.rotation;
            let index = 0;
            for (let t = 0; t < this.dotRange; t += 0.03) {
                const x = this.ballSpeed * t * Math.cos(angle) * 0.99;
                const y = this.ballSpeed * t * Math.sin(angle) * 0.99 - 0.5 * this.gravity * t * t;
                this.pathDots[index].x = x + this.ball.x;
                this.pathDots[index].y = this.ball.y - y;
                this.pathDots[index].visible = show;
                index++;
            }
        }
        moveHoopRandomly() {
            const x = Phaser.Math.FloatBetween(centerX(this), canvasWidth(this) - 250);
            const y = Phaser.Math.FloatBetween(210, canvasHeight(this) - 500);
            this.hoop.setPosition(x, y);
        }
        showGameOver() {
            this.sendLeaderboardData();
            const gameOverBox = this.add.container(centerX(this), centerY(this)).setDepth(10);
            const popup = this.add.image(0, 0, "popup");
            const title = this.add.text(0, -300, "GAME OVER", {
                fontSize: "60px",
                fontFamily: "font",
                color: "red"
            }).setOrigin(0.5);
            const scoreFill = this.add.image(0, -7, "score-fill").setScale(1.3);
            const scoreText = this.add.text(0, -50, `SCORE\n${gameState.score}`, {
                fontSize: "90px",
                fontFamily: "font",
                color: "black",
                align: "center"
            }).setOrigin(0.5);
            const homeButton = this.add.image(-130, 160, "btn-home").setInteractive({ cursor: "pointer" })
                .on("pointerup", () => {
                    gameState.score = 0;
                    gameState.levelNumber = 1;
                    this.scene.start("MenuSceneMobile");
                });
            const replayButton = this.add.image(130, 160, "btn-replay").setInteractive({ cursor: "pointer" })
                .on("pointerup", () => {
                    gameState.score = 0;
                    gameState.levelNumber = 1;
                    this.scene.start("GameSceneMobile");
                });
            gameOverBox.add([popup, title, scoreFill, scoreText, homeButton, replayButton]);
        }
        addSlashEffect() {
            const slash = this.add.image(centerX(this), centerY(this), "slash").setDepth(10);
            slash.visible = true;
            this.tweens.add({
                targets: slash,
                delay: 500,
                alpha: 0,
                onComplete: () => {
                    slash.visible = false;
                    slash.alpha = 1;
                }
            });
        }
        sendLeaderboardData() {
            const newEntry = { name: gameState.userName, score: gameState.score };
            this.leaderboardData.user.push(newEntry);
            console.log(this.leaderboardData);
            $.ajax({
                type: "POST",
                url: "https://toolkitweb.xyz/toolkit/basket_leader.php",
                data: { data: this.leaderboardData },
                beforeSend: () => console.log("sending"),
                success: (response) => console.log(response),
                error: () => console.log("error")
            });
        }
        fetchLeaderboard() {
            fetch("https://toolkitweb.xyz/toolkit/basket-leaderboard.json")
                .then(response => {
                    if (!response.ok) throw new Error("Network error: " + response.statusText);
                    return response.json();
                })
                .then(data => this.leaderboardData = data)
                .catch(error => console.error("Fetch error:", error));
        }
    }

    // LeaderboardScene: Shows the top scores from the leaderboard
    class LeaderboardScene extends Phaser.Scene {
        constructor() {
            super("LeaderboardScene");
            this.leaderboardData = null;
        }
        create() {
            this.add.image(centerX(this), centerY(this), "bg-1");
            this.getLeaderboardData();
            this.add.text(centerX(this), 80, "LEADER BOARD", {
                fontSize: "40px",
                fontFamily: "ARIAL"
            }).setOrigin(0.5);
            this.add.image(70, 80, "backBtn").setScale(0.1).setInteractive({ cursor: "pointer" })
                .on("pointerup", () => this.scene.start("MenuScene"));
            this.add.rectangle(centerX(this), 167, 950, 80, 0x999999);
            this.add.text(centerX(this), 155, "NAME", {
                fontSize: "30px",
                fontFamily: "optima"
            }).setOrigin(0.5);
            this.add.text(centerX(this) - 280, 155, "R A N K", {
                fontSize: "30px",
                fontFamily: "optima"
            }).setOrigin(0.5);
            this.add.text(centerX(this) + 280, 155, "S C O R E", {
                fontSize: "30px",
                fontFamily: "optima"
            }).setOrigin(0.5);
        }
        getLeaderboardData() {
            fetch("https://toolkitweb.xyz/toolkit/basket-leaderboard.json")
                .then(response => {
                    if (!response.ok) throw new Error("Network error: " + response.statusText);
                    return response.json();
                })
                .then(data => {
                    this.leaderboardData = data;
                    console.log(data);
                    const topScores = data.user.sort((a, b) => b.score - a.score).slice(0, 11);
                    topScores.forEach((entry, index) => {
                        console.log(`Name: ${entry.name}, Score: ${entry.score}`);
                        this.add.rectangle(centerX(this), 160 + 90 * (index + 1), 950, 80, 0xffffff);
                        this.add.text(centerX(this) - 280, 160 + 90 * (index + 1), `${index + 1}`, {
                            fontSize: "30px",
                            fontFamily: "optima",
                            color: "black"
                        }).setOrigin(0.5);
                        this.add.text(centerX(this), 160 + 90 * (index + 1), `${entry.name}`, {
                            fontSize: "30px",
                            fontFamily: "optima",
                            color: "black"
                        }).setOrigin(0.5);
                        this.add.text(centerX(this) + 280, 160 + 90 * (index + 1), `${entry.score}`, {
                            fontSize: "30px",
                            fontFamily: "optima",
                            color: "black"
                        }).setOrigin(0.5);
                    });
                })
                .catch(error => console.error("Fetch error:", error));
        }
    }

    // MenuScene: Desktop main menu—lets players enter their name and start or view leaderboard
    class MenuScene extends Phaser.Scene {
        constructor() {
            super("MenuScene");
        }

        // Sets up the menu—background, title, name input, buttons
        create() {
            // Add background
            this.add.image(centerX(this), centerY(this), "menu-bg");

            // Title text
            this.add.text(centerX(this), 100, "Billion Dollar Ballin", {
                fontSize: "70px",
                fontFamily: "font",
                color: "#ffcd00"
            }).setOrigin(0.5);

            // Name input field—uses HTML DOM element
            const nameInput = this.add.dom(centerX(this), centerY(this) - 100, "input", {
                type: "text",
                id: "nameField",
                fontSize: "32px",
                fontFamily: "font",
                width: "300px",
                height: "40px",
                background: "#fff",
                color: "#000",
                border: "none",
                outline: "none",
                textAlign: "center"
            }).setOrigin(0.5);
            nameInput.node.placeholder = "Enter Your Name";

            // Play button—starts the game
            const playButton = this.add.rectangle(centerX(this), centerY(this) + 100, 300, 80, 0xffcd00)
                .setInteractive({ cursor: "pointer" })
                .on("pointerup", () => {
                    gameState.userName = nameInput.node.value || "Player"; // Default to "Player" if empty
                    console.log("Starting game with name:", gameState.userName);
                    this.scene.start("GameScene");
                });
            this.add.text(centerX(this), centerY(this) + 100, "PLAY", {
                fontSize: "40px",
                fontFamily: "font",
                color: "#000"
            }).setOrigin(0.5);

            // Leaderboard button—shows top scores
            const leaderboardButton = this.add.rectangle(centerX(this), centerY(this) + 200, 300, 80, 0xffcd00)
                .setInteractive({ cursor: "pointer" })
                .on("pointerup", () => this.scene.start("LeaderboardScene"));
            this.add.text(centerX(this), centerY(this) + 200, "LEADERBOARD", {
                fontSize: "40px",
                fontFamily: "font",
                color: "#000"
            }).setOrigin(0.5);
        }
    }

    // MenuSceneMobile: Mobile main menu—lets players enter their name and start or view leaderboard
    class MenuSceneMobile extends Phaser.Scene {
        constructor() {
            super("MenuSceneMobile");
        }

        // Sets up the mobile menu—background, title, name input, buttons
        create() {
            // Add background
            this.add.image(centerX(this), centerY(this), "menu-bg");

            // Title text—adjusted for mobile
            this.add.text(centerX(this), 150, "Billion Dollar Ballin", {
                fontSize: "50px", // Smaller for mobile
                fontFamily: "font",
                color: "#ffcd00"
            }).setOrigin(0.5);

            // Name input field—HTML DOM element, repositioned
            const nameInput = this.add.dom(centerX(this), centerY(this) - 50, "input", {
                type: "text",
                id: "nameField",
                fontSize: "24px", // Smaller text
                fontFamily: "font",
                width: "200px",   // Narrower for mobile
                height: "30px",
                background: "#fff",
                color: "#000",
                border: "none",
                outline: "none",
                textAlign: "center"
            }).setOrigin(0.5);
            nameInput.node.placeholder = "Enter Your Name";

            // Play button—starts the game, moved up
            const playButton = this.add.rectangle(centerX(this), centerY(this) + 50, 200, 60, 0xffcd00)
                .setInteractive({ cursor: "pointer" })
                .on("pointerup", () => {
                    gameState.userName = nameInput.node.value || "Player"; // Default to "Player" if empty
                    console.log("Starting game with name:", gameState.userName);
                    this.scene.start("GameSceneMobile");
                });
            this.add.text(centerX(this), centerY(this) + 50, "PLAY", {
                fontSize: "30px", // Smaller text
                fontFamily: "font",
                color: "#000"
            }).setOrigin(0.5);

            // Leaderboard button—shows top scores, moved up
            const leaderboardButton = this.add.rectangle(centerX(this), centerY(this) + 150, 200, 60, 0xffcd00)
                .setInteractive({ cursor: "pointer" })
                .on("pointerup", () => this.scene.start("LeaderboardScene"));
            this.add.text(centerX(this), centerY(this) + 150, "LEADERBOARD", {
                fontSize: "30px", // Smaller text
                fontFamily: "font",
                color: "#000"
            }).setOrigin(0.5);
        }
    }

    // Export all scenes and helpers—webpack needs this
    module.exports = {
    BootScene,
    GameScene,
    setupAnimations,
    GameSceneMobile,
    LeaderboardScene,
    MenuScene,
    MenuSceneMobile,
    gameState,
    centerX,
    centerY,
    canvasWidth,
    canvasHeight,
    formatTime
    
    };

});


// Detect mobile view—sets gameState.isMobileView based on screen size
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
gameState.isMobileView = screenWidth < screenHeight;

// Game configuration—defines canvas size, scenes, and physics
const gameConfig = {
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [
        BootScene,
        GameScene,
        GameSceneMobile,
        LeaderboardScene,
        MenuScene,
        MenuSceneMobile
    ],
    physics: {
        default: "arcade",
        arcade: { debug: false }
    },
    dom: { createContainer: true }
};

// Start the game with the config
new Phaser.Game(gameConfig);



/*! For license information please see main.ab86658d639dc7e586ec.js.LICENSE.txt */

/* Webpack IIFE Wrapper—Bundles and Executes Game Modules */
!function(t) { // `t` is the module map passed at the end
    // Manages module loading and execution queue
    function e(e) { // `e` is an array: [moduleIds, moduleDefs, dependencies]
        for (var o, a, s = e[0], l = e[1], c = e[2], h = 0, f = []; h < s.length; h++) 
            a = s[h], Object.prototype.hasOwnProperty.call(n, a) && n[a] && f.push(n[a][0]), n[a] = 0; // Marks modules as loaded
        for (o in l) Object.prototype.hasOwnProperty.call(l, o) && (t[o] = l[o]); // Adds module definitions
        for (u && u(e); f.length;) f.shift()(); // Executes queued callbacks
        return r.push.apply(r, c || []), i() // Queues dependencies and runs entry point
    }

    // Executes queued modules—ensures all dependencies are loaded
    function i() {
        for (var t, e = 0; e < r.length; e++) {
            for (var i = r[e], o = !0, s = 1; s < i.length; s++) {
                var l = i[s];
                0 !== n[l] && (o = !1) // Checks if dependencies are unresolved
            }
            o && (r.splice(e--, 1), t = a(a.s = i[0])) // Runs module if ready
        }
        return t // Returns entry module’s exports
    }

    var o = {}, // Module cache
        n = { 0: 0 }, // Module status (0 = not loaded)
        r = []; // Module execution queue

    // Loads a module by ID—core Webpack require function
    function a(e) { // `e` is module ID
        if (o[e]) return o[e].exports; // Returns cached exports
        var i = o[e] = { i: e, l: !1, exports: {} }; // Creates module object
        return t[e].call(i.exports, i, i.exports, a), i.l = !0, i.exports // Executes and caches
    }

    // Webpack utilities—module definitions and exports
    a.m = t; // Module map
    a.c = o; // Cache
    a.d = function(t, e, i) { // Defines property on exports
        a.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i })
    };
    a.r = function(t) { // Marks as ES module
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" });
        Object.defineProperty(t, "__esModule", { value: !0 })
    };
    a.t = function(t, e) { // Handles module types (e.g., ES, CommonJS)
        if (1 & e && (t = a(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (a.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t)
            for (var o in t) a.d(i, o, function(e) { return t[e] }.bind(null, o));
        return i
    };
    a.n = function(t) { // Normalizes exports (default vs. full)
        var e = t && t.__esModule ? function() { return t.default } : function() { return t };
        return a.d(e, "a", e), e
    };
    a.o = function(t, e) { // Checks property ownership
        return Object.prototype.hasOwnProperty.call(t, e)
    };
    a.p = ""; // Public path (empty here)

    // Webpack runtime—handles chunk loading and execution
    var s = window.webpackJsonp = window.webpackJsonp || [],
        l = s.push.bind(s);
    s.push = e, s = s.slice();
    for (var c = 0; c < s.length; c++) e(s[c]);
    var u = l;
    r.push([122, 1]), i() // Starts at module 122
}({
    // Entry Point—Loads dependencies and kicks off game
    122: function(t, e, i) { // `t` = module, `e` = exports, `i` = require
        i(123), // Loads vendors~main (Phaser, jQuery, etc.)
        t.exports = i(311) // Exports main game module
    },

    // Main Game Module—Defines game logic, scenes, and initialization
    311: function(t, e, i) { // `t` = module, `e` = exports, `i` = require
        "use strict";
        i.r(e); // Marks as ES module
        i(309); // Additional dependency (likely empty or config)

        // Game State—Tracks core variables
        var o = {
            levelNumber: 1, // Current game level
            score: 0, // Player’s score
            userName: "", // Player’s name
            isMobileView: !1, // Mobile vs. desktop mode
            canPlay: false
        };

        // Helper Functions—Canvas positioning and formatting
        function n(t) { return t.sys.canvas.width / 2 } // Center X of canvas
        function r(t) { return t.sys.canvas.height / 2 } // Center Y of canvas
        function a(t) { return t.sys.canvas.width } // Canvas width
        function s(t) { return t.sys.canvas.height } // Canvas height
        function l(t) { // Formats milliseconds to MM:SS
            t /= 1e3;
            var e = Math.floor(t / 60),
                i = Math.floor(t - 60 * e),
                o = "";
            return o += e < 10 ? "0" + e + ":" : e + ":", o += i < 10 ? "0" + i : i
        }

        // Formats wallet address for display (e.g., "abcd...wxyz")
        function formatWalletAddress(address) {
            return address && address.length >= 9 ? `${address.slice(0, 4)}...${address.slice(-5)}` : "Player";
        }

        /* Utility Functions—Class inheritance and type checking (Webpack boilerplate) */
        function c(t) { // Type checker for Symbol support
            return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t })(t)
        }
        function u(t, e) { // Applies method descriptors to class prototype
            for (var i = 0; i < e.length; i++) {
                var o = e[i];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
            }
        }
        function h(t, e) { // Sets up class inheritance
            return (h = Object.setPrototypeOf || function(t, e) { return t.__proto__ = e, t })(t, e)
        }
        function f(t) { // Constructor helper for ES6 classes
            var e = function() { /* Reflect/Proxy checks */ return "function" == typeof Proxy }();
            return function() {
                var i, o = d(t);
                if (e) { var n = d(this).constructor; i = Reflect.construct(o, arguments, n) } else i = o.apply(this, arguments);
                return p(this, i)
            }
        }
        function p(t, e) { // Returns instance or throws if uninitialized
            return !e || "object" !== c(e) && "function" != typeof e ? function(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t }(t) : e
        }
        function d(t) { return (d = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) { return t.__proto__ || Object.getPrototypeOf(t) })(t) }

        // BootScene—Loads assets and starts menu
        var b = function(t) {
            !function(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), e && h(t, e) }(l, Phaser.Scene);
            var e, i, a, s = f(l);
            function l() { // Constructor—initializes BootScene
                return function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, l), s.call(this, { key: "BootScene" })
            }
            return e = l, (i = [{
                key: "preload", // Loads all game assets (images, audio)
                value: function() {
                    var t = "./assets/"; // Asset path based on device
                    o.isMobileView || (t = "./assets/desktop");
                    this.load.spritesheet("player-dribble", "".concat(t, "/sprites/player-dribble.png"), { frameWidth: 190, frameHeight: 190 }); // Player dribble animation
                    this.load.spritesheet("player-shot", "".concat(t, "/sprites/player-shot.png"), { frameWidth: 190, frameHeight: 190 }); // Player shot animation
                    this.load.spritesheet("hoop", "".concat(t, "/sprites/hoop.png"), { frameWidth: 166, frameHeight: 208 }); // Hoop animation
                    this.load.image("bg-1", "".concat(t, "/sprites/bg-1.png")); // Background level 1
                    this.load.image("bg-2", "".concat(t, "/sprites/bg-2.png")); // Background level 2
                    this.load.image("bg-3", "".concat(t, "/sprites/bg-3.png")); // Background level 3
                    this.load.image("border", "".concat(t, "/sprites/border.png")); // Invisible borders (e.g., ground, rims)
                    this.load.image("board", "".concat(t, "/sprites/board.png")); // Hoop backboard
                    this.load.image("menu-bg", "".concat(t, "/sprites/menu-bg.png")); // Menu background
                    this.load.image("btn-home", "".concat(t, "/sprites/btn-home.png")); // Home button
                    this.load.image("btn-replay", "".concat(t, "/sprites/btn-replay.png")); // Replay button
                    this.load.image("popup", "".concat(t, "/sprites/popup.png")); // Game over popup
                    this.load.image("score-fill", "".concat(t, "/sprites/score-fill.png")); // Score background
                    this.load.image("slash", "".concat(t, "/sprites/slash.png")); // Level transition effect
                    this.load.image("backBtn", "".concat(t, "/sprites/backBtn.png")); // Leaderboard back button
                    this.load.spritesheet("ball", "./assets/sprites/ball-sheet.png", { frameWidth: 230, frameHeight: 230 }); // Ball sprite
                    this.load.audio("dribble-sound", ["./assets/audio/dribble-sound.mp3", "./assets/audio/dribble-sound.ogg"]); // Dribble sound
                    this.load.audio("score-sound", ["./assets/audio/dribble-sound.mp3", "./assets/audio/score-sound.ogg"]); // Score sound
                    this.load.audio("applause-sound", ["./assets/audio/applause.mp3", "./assets/audio/applause.ogg"]); // Applause sound
                    this.load.audio("whistle-blows", ["./assets/audio/whistle-blows.mp3", "./assets/audio/whistle-blows.ogg"]); // Whistle sound
                    this.add.text(n(this), r(this), "Loading....", { fontSize: "70px", fontFamily: "font", color: "#ffcd00" }).setOrigin(.5); // Loading text
                }
            }, {
                key: "create", // Starts appropriate menu based on device
                value: function() {
                    o.isMobileView ? this.scene.start("MenuSceneMobile") : this.scene.start("MenuScene")
                }
            }, {
                key: "update", // Empty—BootScene doesn’t need continuous updates
                value: function() {}
            }]) && u(e.prototype, i), a && u(e, a), l
        }(),

        // Animation Setup—Defines player and hoop animations
        y = function(t) { // `t` = animation manager (this.anims)
            t.create({ key: "player-dribble", frames: t.generateFrameNumbers("player-dribble", { start: 0, end: 15 }), frameRate: 30, repeat: -1 }); // Dribbling animation
            t.create({ key: "player-shot", frames: t.generateFrameNumbers("player-shot", { start: 0, end: 9 }), frameRate: 30 }); // Shooting animation
            t.create({ key: "hoopAnim", frames: t.generateFrameNumbers("hoop", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0] }), frameRate: 30 }); // Hoop score animation
        },

        m = i(60), // jQuery module ID
        v = i.n(m); // Normalized jQuery export

        /* More Utility Functions—Class setup for GameScene */
        function g(t) { return (g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t })(t) }
        function S(t, e) { for (var i = 0; i < e.length; i++) { var o = e[i]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o) } }
        function x(t, e) { return (x = Object.setPrototypeOf || function(t, e) { return t.__proto__ = e, t })(t, e) }
        function w(t) { var e = function() { return "function" == typeof Proxy }(); return function() { var i, o = E(t); if (e) { var n = E(this).constructor; i = Reflect.construct(o, arguments, n) } else i = o.apply(this, arguments); return O(this, i) } }
        function O(t, e) { return !e || "object" !== g(e) && "function" != typeof e ? P(t) : e }
        function P(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t }
        function E(t) { return (E = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) { return t.__proto__ || Object.getPrototypeOf(t) })(t) }
        function k(t, e, i) { return e in t ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = i, t }

        // GameScene—Handles desktop gameplay (shooting, scoring, levels)
        var T = function(t) {
            !function(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), e && x(t, e) }(h, Phaser.Scene);
            var e, i, c, u = w(h);
            function h() { // Constructor—sets up game properties
                var t;
                return function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, h),
                    k(P(t = u.call(this, { key: "GameScene" })), "BULLET_SPEED", 1e3), // Ball launch speed
                    k(P(t), "GRAVITY", 2300), // Ball gravity
                    k(P(t), "ball", void 0), // Ball sprite
                    k(P(t), "trajectories", void 0), // Shot path dots
                    k(P(t), "lastMouseCoordinate", void 0), // Last mouse X position
                    k(P(t), "isShotStart", void 0), // Shooting started?
                    k(P(t), "isShoted", void 0), // Shot completed?
                    k(P(t), "player", void 0), // Player sprite
                    k(P(t), "dot_amount", void 0), // Shot path length
                    k(P(t), "hoop", void 0), // Hoop container
                    k(P(t), "hoopNet", void 0), // Hoop net sprite
                    k(P(t), "isScored", void 0), // Score made?
                    k(P(t), "isGameStart", void 0), // Game active?
                    k(P(t), "timerText", void 0), // Timer display
                    k(P(t), "maxLife", void 0), // Lives remaining
                    k(P(t), "exitingData", void 0), // Leaderboard data
                    k(P(t), "isGameOver", void 0), // Game over?
                    k(P(t), "lifeArr", void 0), t // Life icons array
            }
            return e = h, (i = [{
                key: "init", // Fetches leaderboard data on start
                value: function() { this.getData() }
            }, {
                key: "create", // Sets up gameplay UI and mechanics
                value: function() {
                    var t = this;
                    this.lifeArr = [], this.maxLife = 3, this.isGameStart = !1, this.isShotStart = !1, this.isShoted = !1, this.isGameOver = !1;
                    y(this.anims); // Loads animations
                    this.add.image(n(this), r(this), "bg-".concat(o.levelNumber)); // Sets level background
                    var e = this.add.text(n(this), r(this), "LEVEL ".concat(o.levelNumber), { fontSize: "100px", fontFamily: "font" }).setOrigin(.5).setScale(0).setDepth(5), // Level intro text
                        i = 45e3; // Timer (45s)
                    3 == o.levelNumber && (i = 2e4, this.dot_amount = .6), 2 == o.levelNumber && (this.dot_amount = .7), 1 == o.levelNumber && (this.dot_amount = .8); // Adjusts timer and shot path per level
                    this.timerText = this.add.text(80, 50, "".concat(l(i)), { fontSize: "50px", fontFamily: "font" }).setOrigin(.5).setDepth(5); // Timer display
                    this.tweens.add({ // Level intro animation
                        delay: 1e3, targets: e, scale: 1.1, duration: 500,
                        onComplete: function() {
                            t.tweens.add({ targets: e, scale: .6, duration: 500, yoyo: !0,
                                onComplete: function() { e.visible = !1, t.isGameStart = !0, t.sound.play("whistle-blows") } // Starts game
                            })
                        }
                    });
                    for (var c = 0; c < 3; c++) { // Adds life icons
                        var u = this.add.image(a(this) - 30 - 50 * c, 50, "ball").setScale(.2);
                        this.lifeArr.push(u)
                    }
                    this.trajectories = [], this.ball = this.physics.add.sprite(290, s(this) - 420, "ball").setDepth(3).setScale(.2); // Creates ball
                    this.ball.body.setCircle(.5 * this.ball.width), this.ball.setVisible(!1), this.ball.setBounceY(.4); // Ball physics
                    this.input.activePointer.x = this.sys.canvas.width / 2, this.input.activePointer.y = this.sys.canvas.height / 2 - 100; // Sets initial pointer
                    this.drawTrajectories(); // Draws shot path
                    this.time.addEvent({ // Timer countdown
                        delay: 1e3, callback: function() {
                            t.isGameStart && (i -= 1e3, t.timerText.text = "".concat(l(i)),
                                0 == i && (o.levelNumber < 3 ? (o.levelNumber++, t.ball.visible = !1, t.time.addEvent({ delay: 1e3, callback: function() { t.scene.start("GameScene") } })) : (t.isGameStart = !1, t.addGameOver())))
                        }, repeat: -1
                    });
                    this.isShotStart = !1;
                    this.input.on("pointerdown", (function() { // Starts shooting
                        t.isGameOver || t.isShoted || (t.isShotStart = !0, t.player.stop(), t.player.setTexture("player-shot", 0), t.ball.setVisible(!0))
                    }));
                    this.ball.angle = 0;
                    this.input.on("pointerup", (function() { // Launches ball
                        t.isGameOver || t.isShoted || 2250 != t.BULLET_SPEED && (t.ball.setGravityY(t.GRAVITY), t.ball.body.velocity.x = Math.cos(t.ball.rotation) * t.BULLET_SPEED, t.ball.body.velocity.y = Math.sin(t.ball.rotation) * t.BULLET_SPEED, t.isShotStart = !1, t.updateTrajectories(!1), t.player.play("player-shot", !0), t.isShoted = !0)
                    }));
                    this.input.on("pointermove", (function() { // Adjusts shot power and angle
                        if (t.isShotStart && !t.isShoted) { var e = 10 * -(t.input.activePointer.y - t.ball.y); t.BULLET_SPEED = e, t.updateTrajectories(!0) }
                    }));
                    this.lastMouseCoordinate = this.input.activePointer.x, this.player = this.add.sprite(250, 600, "player-dribble").setScale(1.5).setFlipX(!0), this.player.play("player-dribble", !0); // Player setup
                    this.time.addEvent({ delay: 500, callback: function() { t.isShotStart || t.isShoted || t.sound.play("dribble-sound") }, repeat: -1 }); // Dribble sound loop
                    this.hoop = this.add.container(n(this), 200).setScale(.8, .5); // Hoop container
                    var h = this.add.image(0, -150, "board").setScale(.6, 1); // Backboard
                    this.hoopNet = this.add.sprite(0, 40, "hoop").setScale(.8, 1); // Net
                    var f = this.physics.add.sprite(0, 80, "ball").setScale(.1).setAlpha(0), // Score sensor
                        p = this.physics.add.image(-61, 23, "border").setAlpha(0).setScale(.02, .2).setImmovable(!0); p.angle = -10; // Left rim
                    var d = this.physics.add.image(57, 23, "border").setAlpha(0).setScale(.02, .22).setAngle(10).setImmovable(!0); d.angle = 10; // Right rim
                    var b = this.add.text(0, -252, "".concat(o.score), { fontFamily: "font", fontSize: "45px", color: "red" }).setOrigin(.5); // Score display
                    this.hoop.add([h, this.hoopNet, f, p, d, b]), this.isScored = !1;
                    var m = this.physics.add.image(n(this), s(this) - 40, "border").setAlpha(0).setScale(10, .5); m.setImmovable(!0); // Ground
                    this.physics.add.overlap(this.ball, f, (function(e, i) { // Detects score
                        t.isScored || (t.sound.play("score-sound"), t.isScored = !0, t.hoopNet.play("hoopAnim", !0), o.score++, b.setText("".concat(o.score)), t.sound.play("applause-sound"))
                    }));
                    var v = this.sound.add("dribble-sound", { volume: .4 }); // Bounce sound
                    this.physics.add.collider(this.ball, p, (function(t, e) { v.isPlaying || v.play() })); // Left rim collision
                    this.physics.add.collider(this.ball, d, (function(t, e) { v.isPlaying || v.play() })); // Right rim collision
                    var g = !1;
                    this.physics.add.collider(this.ball, m, (function(e, i) { // Ground collision—handles misses
                        g || (t.isScored || (t.maxLife--, t.lifeArr[t.maxLife].visible = !1, 0 == t.maxLife && (t.isGameStart = !1, t.isGameOver = !0, t.addGameOver())), t.sound.play("dribble-sound"), g = !0, t.time.addEvent({ delay: 1200, callback: function() { 0 != t.maxLife && (console.log("reset"), t.resetBall(), g = !1) } }))
                    }));
                    1 != o.levelNumber && this.addSlash() // Level transition effect
                }
            }, {
                key: "update", // Updates ball rotation and resets if off-screen
                value: function(t, e) {
                    !this.isShoted && this.isShotStart && (this.ball.rotation = Phaser.Math.Angle.Between(-this.input.activePointer.x, -this.input.activePointer.y, -this.ball.x, -this.ball.y)), this.ball.y > s(this) && this.resetBall()
                }
            }, {
                key: "resetBall", // Resets ball after shot
                value: function() {
                    this.isShoted && (console.log("adas"), this.isShoted = !1, this.isShotStart = !1, this.ball.setGravityY(0), this.ball.body.velocity.x = 0, this.ball.body.velocity.y = 0, this.ball.setPosition(290, s(this) - 420), this.player.play("player-dribble", !0), this.ball.setVisible(!1), this.isScored = !1, this.setHoopPosition())
                }
            }, {
                key: "drawTrajectories", // Draws shot prediction path
                value: function() {
                    for (var t = -this.ball.rotation, e = 0, i = 0, o = 0; o < this.dot_amount; o += .03) {
                        e = this.BULLET_SPEED * o * Math.cos(t) * .99, i = this.BULLET_SPEED * o * Math.sin(t) * .99 - .5 * this.GRAVITY * o * o;
                        var n = this.add.image(e + this.ball.x, this.ball.y - i, "ball").setDepth(3).setScale(.04).setVisible(!1);
                        this.trajectories.push(n)
                    }
                }
            }, {
                key: "updateTrajectories", // Updates shot path visibility
                value: function(t) {
                    for (var e = -this.ball.rotation, i = 0, o = 0, n = 0, r = 0; r < this.dot_amount; r += .03) i = this.BULLET_SPEED * r * Math.cos(e) * .99, o = this.BULLET_SPEED * r * Math.sin(e) * .99 - .5 * this.GRAVITY * r * r, this.trajectories[n].x = i + this.ball.x, this.trajectories[n].y = this.ball.y - o, this.trajectories[n].visible = t, n += 1
                }
            }, {
                key: "setHoopPosition", // Randomizes hoop position after reset
                value: function() {
                    var t = Phaser.Math.FloatBetween(n(this), a(this) - 250),
                        e = Phaser.Math.FloatBetween(210, s(this) - 500);
                    this.hoop.setPosition(t, e)
                }
            }, {
                key: "addGameOver", // Displays game over screen
                value: function() {
                    var t = this;
                    this.dataPost(); // Sends score to leaderboard
                    var e = this.add.container(n(this), r(this)).setDepth(10), // Container for game over UI
                        i = this.add.image(0, 0, "popup"), // Popup background
                        a = this.add.text(0, -300, "GAME OVER", { fontSize: "60px", fontFamily: "font", color: "red" }).setOrigin(.5), // Title
                        s = this.add.text(0, -50, "SCORE\n".concat(o.score), { fontSize: "90px", fontFamily: "font", color: "black", align: "center" }).setOrigin(.5), // Score
                        l = this.add.image(0, -7, "score-fill").setScale(1.3), // Score background
                        c = this.add.image(-130, 160, "btn-home").setInteractive({ cursor: "pointer" }).on("pointerup", (function() { o.score = 0, o.levelNumber = 1, t.scene.start("MenuScene") })), // Home button
                        u = this.add.image(130, 160, "btn-replay").setInteractive({ cursor: "pointer" }).on("pointerup", (function() { 
                            o.score = 0, o.levelNumber = 1, t.maxLife = 3, t.lifeArr.forEach(ball => ball.setVisible(true)), t.scene.start("GameScene") // Resets lives
                        })); // Replay button
                    e.add([i, a, l, s, c, u])
                }
            }, {
                key: "addSlash", // Adds level transition effect
                value: function() {
                    var t = this.add.image(n(this), r(this), "slash").setDepth(10);
                    t.visible = !0, this.tweens.add({ targets: t, delay: 500, alpha: 0, onComplete: function() { t.visible = !1, t.alpha = 1 } })
                }
            }, {
                key: "dataPost", // Sends score to leaderboard server
                value: function() {
                    var t = { name: o.userName, score: o.score };
                    this.exitingData.user.push(t), console.log(this.exitingData),
                        v.a.ajax({ type: "POST", url: "https://toolkitweb.xyz/toolkit/basket_leader.php", data: { data: this.exitingData }, beforeSend: function() { console.log("sending") }, success: function(t) { console.log(t) }, error: function(t, e, i) { console.log("error") } })
                }
            }, {
                key: "getData", // Fetches leaderboard data
                value: function() {
                    var t = this;
                    fetch("https://toolkitweb.xyz/toolkit/basket-leaderboard.json").then((function(t) { if (!t.ok) throw new Error("Network response was not ok " + t.statusText); return t.json() })).then((function(e) { t.exitingData = e })).catch((function(t) { console.error("There was a problem with the fetch operation:", t) }))
                }
            }]) && S(e.prototype, i), c && S(e, c), h
        }();

        /* Utility Functions—Class setup for GameSceneMobile (similar to GameScene) */
        function j(t) { return (j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t })(t) }
        function _(t, e) { for (var i = 0; i < e.length; i++) { var o = e[i]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o) } }
        function R(t, e) { return (R = Object.setPrototypeOf || function(t, e) { return t.__proto__ = e, t })(t, e) }
        function L(t) { var e = function() { return "function" == typeof Proxy }(); return function() { var i, o = G(t); if (e) { var n = G(this).constructor; i = Reflect.construct(o, arguments, n) } else i = o.apply(this, arguments); return M(this, i) } }
        function M(t, e) { return !e || "object" !== j(e) && "function" != typeof e ? A(t) : e }
        function A(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t }
        function G(t) { return (G = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) { return t.__proto__ || Object.getPrototypeOf(t) })(t) }
        function N(t, e, i) { return e in t ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = i, t }

        // GameSceneMobile—Handles mobile gameplay (similar to GameScene, adjusted positions)
        var B = function(t) {
            !function(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), e && R(t, e) }(h, Phaser.Scene);
            var e, i, c, u = L(h);
            function h() {
                var t;
                return function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, h),
                    N(A(t = u.call(this, { key: "GameSceneMobile" })), "BULLET_SPEED", 1e3), N(A(t), "GRAVITY", 2300), N(A(t), "ball", void 0), N(A(t), "trajectories", void 0), N(A(t), "lastMouseCoordinate", void 0), N(A(t), "isShotStart", void 0), N(A(t), "isShoted", void 0), N(A(t), "player", void 0), N(A(t), "dot_amount", void 0), N(A(t), "hoop", void 0), N(A(t), "hoopNet", void 0), N(A(t), "isScored", void 0), N(A(t), "isGameStart", void 0), N(A(t), "timerText", void 0), N(A(t), "maxLife", void 0), N(A(t), "exitingData", void 0), N(A(t), "isGameOver", void 0), N(A(t), "lifeArr", void 0), t
            }
            return e = h, (i = [{
                key: "init", value: function() { this.getData() }
            }, {
                key: "create", value: function() {
                    var t = this;
                    this.lifeArr = [], this.maxLife = 3, this.isGameStart = !1, this.isShotStart = !1, this.isShoted = !1, this.isGameOver = !1, y(this.anims);
                    this.add.image(n(this), r(this), "bg-".concat(o.levelNumber));
                    var e = this.add.text(n(this), r(this), "LEVEL ".concat(o.levelNumber), { fontSize: "100px", fontFamily: "font" }).setOrigin(.5).setScale(0).setDepth(5),
                        i = 45e3;
                    3 == o.levelNumber && (i = 2e4, this.dot_amount = .6), 2 == o.levelNumber && (this.dot_amount = .7), 1 == o.levelNumber && (this.dot_amount = .8);
                    this.timerText = this.add.text(80, 50, "".concat(l(i)), { fontSize: "50px", fontFamily: "font" }).setOrigin(.5).setDepth(5);
                    this.tweens.add({ delay: 1e3, targets: e, scale: 1.1, duration: 500, onComplete: function() { t.tweens.add({ targets: e, scale: .6, duration: 500, yoyo: !0, onComplete: function() { e.visible = !1, t.isGameStart = !0, t.sound.play("whistle-blows") } }) } });
                    for (var c = 0; c < 3; c++) { var u = this.add.image(a(this) - 30 - 50 * c, 50, "ball").setScale(.2); this.lifeArr.push(u) }
                    this.trajectories = [], this.ball = this.physics.add.sprite(140, s(this) - 430, "ball").setDepth(3).setScale(.2); // Adjusted ball position
                    this.ball.body.setCircle(.5 * this.ball.width), this.ball.setVisible(!1), this.ball.setBounceY(.4);
                    this.input.activePointer.x = this.sys.canvas.width / 2, this.input.activePointer.y = this.sys.canvas.height / 2 - 100;
                    this.drawTrajectories();
                    this.time.addEvent({ delay: 1e3, callback: function() { t.isGameStart && (i -= 1e3, t.timerText.text = "".concat(l(i)), 0 == i && (o.levelNumber < 3 ? (o.levelNumber++, t.ball.visible = !1, t.time.addEvent({ delay: 1e3, callback: function() { t.scene.start("GameSceneMobile") } })) : (t.isGameStart = !1, t.addGameOver()))) }, repeat: -1 });
                    this.isShotStart = !1;
                    this.input.on("pointerdown", (function() { t.isGameOver || t.isShoted || (t.isShotStart = !0, t.player.stop(), t.player.setTexture("player-shot", 0), t.ball.setVisible(!0)) }));
                    this.ball.angle = 0;
                    this.input.on("pointerup", (function() { t.isGameOver || t.isShoted || 2250 != t.BULLET_SPEED && (t.ball.setGravityY(t.GRAVITY), t.ball.body.velocity.x = Math.cos(t.ball.rotation) * t.BULLET_SPEED, t.ball.body.velocity.y = Math.sin(t.ball.rotation) * t.BULLET_SPEED, t.isShotStart = !1, t.updateTrajectories(!1), t.player.play("player-shot", !0), t.isShoted = !0) }));
                    this.input.on("pointermove", (function() { if (t.isShotStart && !t.isShoted) { var e = 10 * -(t.input.activePointer.y - t.ball.y); t.BULLET_SPEED = e, t.updateTrajectories(!0) } }));
                    this.lastMouseCoordinate = this.input.activePointer.x, this.player = this.add.sprite(100, 900, "player-dribble").setScale(1.5).setFlipX(!0), this.player.play("player-dribble", !0); // Adjusted player position
                    this.time.addEvent({ delay: 500, callback: function() { t.isShotStart || t.isShoted || t.sound.play("dribble-sound") }, repeat: -1 });
                    this.hoop = this.add.container(n(this), 200).setScale(.8, .5);
                    var h = this.add.image(0, -150, "board").setScale(.6, 1);
                    this.hoopNet = this.add.sprite(0, 40, "hoop").setScale(.8, 1);
                    var f = this.physics.add.sprite(0, 80, "ball").setScale(.1).setAlpha(0),
                        p = this.physics.add.image(-61, 23, "border").setAlpha(0).setScale(.02, .2).setImmovable(!0); p.angle = -10;
                    var d = this.physics.add.image(57, 23, "border").setAlpha(0).setScale(.02, .22).setAngle(10).setImmovable(!0); d.angle = 10;
                    var b = this.add.text(0, -252, "".concat(o.score), { fontFamily: "font", fontSize: "45px", color: "red" }).setOrigin(.5);
                    this.hoop.add([h, this.hoopNet, f, p, d, b]), this.isScored = !1;
                    var m = this.physics.add.image(n(this), s(this) - 40, "border").setAlpha(0).setScale(10, .5); m.setImmovable(!0);
                    this.physics.add.overlap(this.ball, f, (function(e, i) { t.isScored || (t.sound.play("score-sound"), t.isScored = !0, t.hoopNet.play("hoopAnim", !0), o.score++, b.setText("".concat(o.score)), t.sound.play("applause-sound")) }));
                    var v = this.sound.add("dribble-sound", { volume: .4 });
                    this.physics.add.collider(this.ball, p, (function(t, e) { v.isPlaying || v.play() }));
                    this.physics.add.collider(this.ball, d, (function(t, e) { v.isPlaying || v.play() }));
                    var g = !1;
                    this.physics.add.collider(this.ball, m, (function(e, i) { g || (t.isScored || (t.maxLife--, t.lifeArr[t.maxLife].visible = !1, 0 == t.maxLife && (t.isGameStart = !1, t.isGameOver = !0, t.addGameOver())), t.sound.play("dribble-sound"), g = !0, t.time.addEvent({ delay: 1200, callback: function() { 0 != t.maxLife && (console.log("reset"), t.resetBall(), g = !1) } })) }));
                    1 != o.levelNumber && this.addSlash()
                }
            }, {
                key: "update", value: function(t, e) { !this.isShoted && this.isShotStart && (this.ball.rotation = Phaser.Math.Angle.Between(-this.input.activePointer.x, -this.input.activePointer.y, -this.ball.x, -this.ball.y)), this.ball.y > s(this) && this.resetBall() }
            }, {
                key: "resetBall", value: function() { this.isShoted && (console.log("adas"), this.isShoted = !1, this.isShotStart = !1, this.ball.setGravityY(0), this.ball.body.velocity.x = 0, this.ball.body.velocity.y = 0, this.ball.setPosition(140, s(this) - 430), this.player.play("player-dribble", !0), this.ball.setVisible(!1), this.isScored = !1, this.setHoopPosition()) }
            }, {
                key: "drawTrajectories", value: function() { for (var t = -this.ball.rotation, e = 0, i = 0, o = 0; o < this.dot_amount; o += .03) { e = this.BULLET_SPEED * o * Math.cos(t) * .99, i = this.BULLET_SPEED * o * Math.sin(t) * .99 - .5 * this.GRAVITY * o * o; var n = this.add.image(e + this.ball.x, this.ball.y - i, "ball").setDepth(3).setScale(.04).setVisible(!1); this.trajectories.push(n) } }
            }, {
                key: "updateTrajectories", value: function(t) { for (var e = -this.ball.rotation, i = 0, o = 0, n = 0, r = 0; r < this.dot_amount; r += .03) i = this.BULLET_SPEED * r * Math.cos(e) * .99, o = this.BULLET_SPEED * r * Math.sin(e) * .99 - .5 * this.GRAVITY * r * r, this.trajectories[n].x = i + this.ball.x, this.trajectories[n].y = this.ball.y - o, this.trajectories[n].visible = t, n += 1 }
            }, {
                key: "setHoopPosition", value: function() { var t = Phaser.Math.FloatBetween(n(this), a(this) - 250), e = Phaser.Math.FloatBetween(210, s(this) - 500); this.hoop.setPosition(t, e) }
            }, {
                key: "addGameOver",
                value: function() {
                    var t = this;
                    this.dataPost();
                    var e = this.add.container(n(this), r(this)).setDepth(10),
                        i = this.add.image(0, 0, "popup"),
                        a = this.add.text(0, -300, "GAME OVER", { fontSize: "60px", fontFamily: "font", color: "red" }).setOrigin(.5),
                        s = this.add.text(0, -50, "SCORE\n".concat(o.score), { fontSize: "90px", fontFamily: "font", color: "black", align: "center" }).setOrigin(.5),
                        l = this.add.image(0, -7, "score-fill").setScale(1.3),
                        c = this.add.image(-130, 160, "btn-home").setInteractive({ cursor: "pointer" }).on("pointerup", (function() { o.score = 0, o.levelNumber = 1, t.scene.start("MenuSceneMobile") })),
                        u = this.add.image(130, 160, "btn-replay").setInteractive({ cursor: "pointer" }).on("pointerup", (function() { 
                            o.score = 0, o.levelNumber = 1, t.maxLife = 3, t.lifeArr.forEach(ball => ball.setVisible(true)), t.scene.start("GameSceneMobile") // Resets lives
                        }));
                    e.add([i, a, l, s, c, u])
                }
            }, {
                key: "addSlash", value: function() { var t = this.add.image(n(this), r(this), "slash").setDepth(10); t.visible = !0, this.tweens.add({ targets: t, delay: 500, alpha: 0, onComplete: function() { t.visible = !1, t.alpha = 1 } }) }
            }, {
                key: "dataPost", value: function() { var t = { name: o.userName, score: o.score }; this.exitingData.user.push(t), console.log(this.exitingData), v.a.ajax({ type: "POST", url: "https://toolkitweb.xyz/toolkit/basket_leader.php", data: { data: this.exitingData }, beforeSend: function() { console.log("sending") }, success: function(t) { console.log(t) }, error: function(t, e, i) { console.log("error") } }) }
            }, {
                key: "getData", value: function() { var t = this; fetch("https://toolkitweb.xyz/toolkit/basket-leaderboard.json").then((function(t) { if (!t.ok) throw new Error("Network response was not ok " + t.statusText); return t.json() })).then((function(e) { t.exitingData = e })).catch((function(t) { console.error("There was a problem with the fetch operation:", t) })) }
            }]) && _(e.prototype, i), c && _(e, c), h
        }();

        /* Utility Functions—Class setup for LeaderboardScene */
        function D(t) { return (D = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t })(t) }
        function I(t, e) { for (var i = 0; i < e.length; i++) { var o = e[i]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o) } }
        function F(t, e) { return (F = Object.setPrototypeOf || function(t, e) { return t.__proto__ = e, t })(t, e) }
        function V(t) { var e = function() { return "function" == typeof Proxy }(); return function() { var i, o = U(t); if (e) { var n = U(this).constructor; i = Reflect.construct(o, arguments, n) } else i = o.apply(this, arguments); return z(this, i) } }
        function z(t, e) { return !e || "object" !== D(e) && "function" != typeof e ? C(t) : e }
        function C(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t }
        function U(t) { return (U = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) { return t.__proto__ || Object.getPrototypeOf(t) })(t) }

        // LeaderboardScene—Displays top scores
        var H = function(t) {
    !function(t, e) { 
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); 
        t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), 
        e && F(t, e) 
    }(s, Phaser.Scene);
    var e, i, o, a = V(s);
    function s() { // Constructor—sets up leaderboard
        var t, e, i, o;
        return function(t, e) { 
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") 
        }(this, s),
            t = a.call(this, "LeaderboardScene"), 
            e = C(t), 
            o = void 0, 
            (i = "exitingData") in e ? Object.defineProperty(e, i, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : e[i] = o, 
            t
    }
    return e = s, (i = [{
        key: "create",
        value: function() {
            var t = this;
            this.add.image(n(this), r(this), "bg-1"); // Background
            this.add.text(n(this), 100, "🏆 Top Players", { fontSize: "40px", fontFamily: "Original Surfer", color: "#FB25F4", textShadow: "2px 2px 3px #000" }).setOrigin(0.5); // Title
            this.add.image(70, 100, "backBtn").setScale(0.1).setInteractive({ cursor: "pointer" }).on("pointerup", () => {
                console.log("Back button clicked, isMobileView:", o?.isMobileView); // Debug with safe access
                const targetScene = (typeof o?.isMobileView !== "undefined" && o.isMobileView) ? "MenuSceneMobile" : "MenuScene";
                t.scene.start(targetScene);
            }); // Back button with fallback

            // Mock data—4 players, mix of wallets and practice
            const mockData = {
                user: [
                    { name: "4e3f9k2m7p8q1r5t2u9v", score: 20 }, // Wallet player
                    { name: "x7k9p2m4q8r1t5u9v3e6", score: 15 }, // Wallet player
                    { name: "Player1", score: 10 }, // Practice player
                    { name: "Player2", score: 5 }  // Practice player
                ]
            };
            const sortedData = mockData.user.sort((a, b) => b.score - a.score).slice(0, 11);

            this.add.rectangle(n(this), 187, 950, 60, 0x3B599880); // Header bar, transparent dark blue
            this.add.text(n(this) - 280, 175, "R A N K", { fontSize: "26px", fontFamily: "Original Surfer", color: "#FFFFFF" }).setOrigin(0.5); // Rank header
            this.add.text(n(this), 175, "NAME", { fontSize: "26px", fontFamily: "Original Surfer", color: "#FFFFFF" }).setOrigin(0.5); // Name header
            this.add.text(n(this) + 280, 175, "S C O R E", { fontSize: "26px", fontFamily: "Original Surfer", color: "#FFFFFF" }).setOrigin(0.5); // Score header

            sortedData.forEach((player, index) => {
                const yPos = 220 + 60 * (index + 1); // Tighter spacing
                const isTop3 = index < 3;
                const style = isTop3 
                    ? { fontSize: "30px", fontFamily: "Original Surfer", color: "#3EDCD7", textShadow: "1px 1px 3px #FFD700" } // Top 3 flair
                    : { fontSize: "26px", fontFamily: "Original Surfer", color: "#FFFFFF" }; // Rest in white
                const formattedName = formatWalletAddress(player.name);

                this.add.rectangle(n(this), yPos, 950, 60, isTop3 ? 0xFFD70080 : 0x9C80E580); // Gold for top 3, gradient avg for rest
                this.add.text(n(this) - 280, yPos, `${index + 1}`, style).setOrigin(0.5); // Rank
                this.add.text(n(this), yPos, formattedName, style).setOrigin(0.5); // Formatted name
                this.add.text(n(this) + 280, yPos, `${player.score}`, style).setOrigin(0.5); // Score
            });

            this.add.text(n(this), 220 + 60 * 5, "Payout Split: 70% / 20% / 10%", { fontSize: "20px", fontFamily: "Original Surfer", color: "#FFD700" }).setOrigin(0.5); // Payout tease
        }
    }, {
        key: "getData",
        value: function() {
            var t = this;
            fetch("https://toolkitweb.xyz/toolkit/basket-leaderboard.json").then(res => res.json()).then(data => {
                t.exitingData = data;
                var i = data.user.sort((a, b) => b.score - a.score).slice(0, 11);
                i.forEach((player, index) => {
                    const yPos = 220 + 60 * (index + 1);
                    const isTop3 = index < 3;
                    const style = isTop3 
                        ? { fontSize: "30px", fontFamily: "Original Surfer", color: "#3EDCD7", textShadow: "1px 1px 3px #FFD700" }
                        : { fontSize: "26px", fontFamily: "Original Surfer", color: "#FFFFFF" };
                    const formattedName = formatWalletAddress(player.name);

                    t.add.rectangle(n(t), yPos, 950, 60, isTop3 ? 0xFFD70080 : 0x9C80E580);
                    t.add.text(n(t) - 280, yPos, `${index + 1}`, style).setOrigin(0.5);
                    t.add.text(n(t), yPos, formattedName, style).setOrigin(0.5);
                    t.add.text(n(t) + 280, yPos, `${player.score}`, style).setOrigin(0.5);
                });
            }).catch(err => console.log("Leaderboard fetch failed:", err));
        }
    }]) && I(e.prototype, i), o && I(e, o), s
}();

        /* Utility Functions—Class setup for MenuScene */
        function Y(t) { return (Y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t })(t) }
        function W(t, e) { for (var i = 0; i < e.length; i++) { var o = e[i]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o) } }
        function K(t, e) { return (K = Object.setPrototypeOf || function(t, e) { return t.__proto__ = e, t })(t, e) }
        function J(t) { var e = function() { return "function" == typeof Proxy }(); return function() { var i, o = Q(t); if (e) { var n = Q(this).constructor; i = Reflect.construct(o, arguments, n) } else i = o.apply(this, arguments); return X(this, i) } }
        function X(t, e) { return !e || "object" !== Y(e) && "function" != typeof e ? q(t) : e }
        function q(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t }
        function Q(t) { return (Q = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) { return t.__proto__ || Object.getPrototypeOf(t) })(t) }

        // MenuScene—Desktop main menu with wallet ID
        var Z = function(t) {
            !function(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), e && K(t, e) }(u, Phaser.Scene);
            var e, i, l, c = J(u);
            function u() {
                return function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, u),
                    c.call(this, "MenuScene")
            }
            return e = u, (i = [{
                key: "preload",
                value: function() {}
            }, {
                key: "init",
                value: function() {}
            }, {
                key: "create",
                value: function() {
                    var t = this;
                    this.playButtonEnabled = false; // Tracks button state (for reference)
                    var e = this.add.image(n(this), r(this), "menu-bg").setInteractive();
                    e.displayWidth = a(this), e.displayHeight = s(this);
                    window.menuWidth = e.displayWidth;
                    window.menuHeight = e.displayHeight;
                    console.log("Menu image dimensions:", window.menuWidth, window.menuHeight);
                }
            }, {
                key: "update",
                value: function(t, e) {
                    // No button enabling needed here—handled by index.html
                }
            }]) && W(e.prototype, i), l && W(e, l), u
        }();

        /* Utility Functions—Class setup for MenuSceneMobile */
        function $(t) { return ($ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t })(t) }
        function tt(t, e) { for (var i = 0; i < e.length; i++) { var o = e[i]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o) } }
        function et(t, e) { return (et = Object.setPrototypeOf || function(t, e) { return t.__proto__ = e, t })(t, e) }
        function it(t) { var e = function() { return "function" == typeof Proxy }(); return function() { var i, o = rt(t); if (e) { var n = rt(this).constructor; i = Reflect.construct(o, arguments, n) } else i = o.apply(this, arguments); return ot(this, i) } }
        function ot(t, e) { return !e || "object" !== $(e) && "function" != typeof e ? nt(t) : e }
        function nt(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t }
        function rt(t) { return (rt = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) { return t.__proto__ || Object.getPrototypeOf(t) })(t) }

        // MenuSceneMobile—Mobile main menu with wallet ID
        var at = function(t) {
            !function(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), e && et(t, e) }(u, Phaser.Scene);
            var e, i, l, c = it(u);
            function u() {
                return function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, u),
                    c.call(this, "MenuSceneMobile")
            }
            return e = u, (i = [{
                key: "preload",
                value: function() {}
            }, {
                key: "init",
                value: function() {}
            }, {
                key: "create",
                value: function() {
                    var t = this;
                    this.playButtonEnabled = false; // Tracks button state (for reference)
                    var e = this.add.image(n(this), r(this), "menu-bg").setInteractive();
                    e.displayWidth = a(this), e.displayHeight = s(this);
                }
            }, {
                key: "update",
                value: function(t, e) {
                    // No button enabling needed here—handled by index.html
                }
            }]) && tt(e.prototype, i), l && tt(e, l), u
        }(),

        // Game Initialization—Sets up canvas and starts game
        st = window.innerWidth,
        lt = window.innerHeight;
        console.log("Screen dimensions:", st, lt);
        o.isMobileView = st < lt;
        console.log("isMobileView:", o.isMobileView);
        var ct = {
            type: Phaser.AUTO,
            backgroundColor: "#08233e",
            parent: "game",
            width: o.isMobileView ? 720 : 1280,
            height: o.isMobileView ? 1280 : 961,
            scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
            dom: { createContainer: !0 },
            physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: !1 } },
            scene: [b, T, Z, at, H, B]
        };

        o.userName = "Player";
        o.canPlay = false; // Ensure this starts as false
        console.log("Game starting with default name:", o.userName, "canPlay:", o.canPlay);
        var game = new Phaser.Game(ct);

        window.addEventListener('startGame', function(event) {
            console.log("startGame event received from index.html");
            var wallet = event.detail && event.detail.wallet ? event.detail.wallet : null;
            o.userName = wallet ? formatWalletAddress(wallet) : "Player";
            o.canPlay = true;
            console.log("Wallet updated:", o.userName, "canPlay:", o.canPlay);

            // Stop the current menu scene
            if (game.scene.isActive("MenuScene")) {
                console.log("Stopping MenuScene");
                game.scene.stop("MenuScene");
            } else if (game.scene.isActive("MenuSceneMobile")) {
                console.log("Stopping MenuSceneMobile");
                game.scene.stop("MenuSceneMobile");
            }

            // Hide wallet UI
            document.getElementById('walletUI').style.display = 'none';

            // Sync wallet text in active menu scene
            if (game.scene.isActive("MenuScene") || game.scene.isActive("MenuSceneMobile")) {
                var scene = game.scene.getScene(o.isMobileView ? "MenuSceneMobile" : "MenuScene");
                scene.children.list.forEach(child => {
                    if (child.text && child.text.startsWith("Wallet: ")) {
                        child.setText("Wallet: " + o.userName);
                    }
                });
            }

            // Start the appropriate game scene
            var targetScene = o.isMobileView ? "GameSceneMobile" : "GameScene";
            console.log("Starting scene:", targetScene);
            game.scene.start(targetScene);
            console.log("Scene start command issued, current scenes:", game.scene.getScenes().map(s => s.scene.key));
        });

        window.addEventListener('startLeaderboard', function() {
            console.log("startLeaderboard event received from index.html");
            // Stop the current menu scene
            if (game.scene.isActive("MenuScene")) {
                console.log("Stopping MenuScene");
                game.scene.stop("MenuScene");
            } else if (game.scene.isActive("MenuSceneMobile")) {
                console.log("Stopping MenuSceneMobile");
                game.scene.stop("MenuSceneMobile");
            }
            // Start LeaderboardScene without canPlay condition
            console.log("Attempting to start LeaderboardScene");
            game.scene.start("LeaderboardScene");
            console.log("LeaderboardScene start command issued, current scenes:", game.scene.getScenes().map(s => s.scene.key));
        });
    } // Close 311: function(t, e, i)
}); // Close !function(t) and pass module map


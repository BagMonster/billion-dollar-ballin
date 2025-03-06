/*! For license information please see main.ab86658d639dc7e586ec.js.LICENSE.txt */ ! function(t) {
    function e(e) {
        for (var o, a, s = e[0], l = e[1], c = e[2], h = 0, f = []; h < s.length; h++) a = s[h], Object.prototype.hasOwnProperty.call(n, a) && n[a] && f.push(n[a][0]), n[a] = 0;
        for (o in l) Object.prototype.hasOwnProperty.call(l, o) && (t[o] = l[o]);
        for (u && u(e); f.length;) f.shift()();
        return r.push.apply(r, c || []), i()
    }

    function i() {
        for (var t, e = 0; e < r.length; e++) {
            for (var i = r[e], o = !0, s = 1; s < i.length; s++) {
                var l = i[s];
                0 !== n[l] && (o = !1)
            }
            o && (r.splice(e--, 1), t = a(a.s = i[0]))
        }
        return t
    }
    var o = {},
        n = {
            0: 0
        },
        r = [];

    function a(e) {
        if (o[e]) return o[e].exports;
        var i = o[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, a), i.l = !0, i.exports
    }
    a.m = t, a.c = o, a.d = function(t, e, i) {
        a.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
        })
    }, a.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, a.t = function(t, e) {
        if (1 & e && (t = a(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (a.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var o in t) a.d(i, o, function(e) {
                return t[e]
            }.bind(null, o));
        return i
    }, a.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return a.d(e, "a", e), e
    }, a.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, a.p = "";
    var s = window.webpackJsonp = window.webpackJsonp || [],
        l = s.push.bind(s);
    s.push = e, s = s.slice();
    for (var c = 0; c < s.length; c++) e(s[c]);
    var u = l;
    r.push([122, 1]), i()
}({
    122: function(t, e, i) {
        i(123), t.exports = i(311)
    },
    311: function(t, e, i) {
        "use strict";
        i.r(e);
        i(309);
        var o = {
            levelNumber: 1,
            score: 0,
            userName: "",
            isMobileView: !1
        };

        function n(t) {
            return t.sys.canvas.width / 2
        }

        function r(t) {
            return t.sys.canvas.height / 2
        }

        function a(t) {
            return t.sys.canvas.width
        }

        function s(t) {
            return t.sys.canvas.height
        }

        function l(t) {
            t /= 1e3;
            var e = Math.floor(t / 60),
                i = Math.floor(t - 60 * e),
                o = "";
            return o += e < 10 ? "0" + e + ":" : e + ":", o += i < 10 ? "0" + i : i
        }

        function c(t) {
            return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function u(t, e) {
            for (var i = 0; i < e.length; i++) {
                var o = e[i];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
            }
        }

        function h(t, e) {
            return (h = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function f(t) {
            var e = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var i, o = d(t);
                if (e) {
                    var n = d(this).constructor;
                    i = Reflect.construct(o, arguments, n)
                } else i = o.apply(this, arguments);
                return p(this, i)
            }
        }

        function p(t, e) {
            return !e || "object" !== c(e) && "function" != typeof e ? function(t) {
                if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }(t) : e
        }

        function d(t) {
            return (d = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var b = function(t) {
                ! function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && h(t, e)
                }(l, Phaser.Scene);
                var e, i, a, s = f(l);

                function l() {
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, l), s.call(this, {
                        key: "BootScene"
                    })
                }
                return e = l, (i = [{
                    key: "preload",
                    value: function() {
                        var t = "./assets/";
                        o.isMobileView || (t = "./assets/desktop"), this.load.spritesheet("player-dribble", "".concat(t, "/sprites/player-dribble.png"), {
                            frameWidth: 190,
                            frameHeight: 190
                        }), this.load.spritesheet("player-shot", "".concat(t, "/sprites/player-shot.png"), {
                            frameWidth: 190,
                            frameHeight: 190
                        }), this.load.spritesheet("hoop", "".concat(t, "/sprites/hoop.png"), {
                            frameWidth: 166,
                            frameHeight: 208
                        }), this.load.image("bg-1", "".concat(t, "/sprites/bg-1.png")), this.load.image("bg-2", "".concat(t, "/sprites/bg-2.png")), this.load.image("bg-3", "".concat(t, "/sprites/bg-3.png")), this.load.image("border", "".concat(t, "/sprites/border.png")), this.load.image("board", "".concat(t, "/sprites/board.png")), this.load.image("menu-bg", "".concat(t, "/sprites/menu-bg.png")), this.load.image("btn-home", "".concat(t, "/sprites/btn-home.png")), this.load.image("btn-replay", "".concat(t, "/sprites/btn-replay.png")), this.load.image("popup", "".concat(t, "/sprites/popup.png")), this.load.image("score-fill", "".concat(t, "/sprites/score-fill.png")), this.load.image("slash", "".concat(t, "/sprites/slash.png")), this.load.image("backBtn", "".concat(t, "/sprites/backBtn.png")), this.load.spritesheet("ball", "./assets/sprites/ball-sheet.png", {
                            frameWidth: 230,
                            frameHeight: 230
                        }), this.load.audio("dribble-sound", ["./assets/audio/dribble-sound.mp3", "./assets/audio/dribble-sound.ogg"]), this.load.audio("score-sound", ["./assets/audio/dribble-sound.mp3", "./assets/audio/score-sound.ogg"]), this.load.audio("applause-sound", ["./assets/audio/applause.mp3", "./assets/audio/applause.ogg"]), this.load.audio("whistle-blows", ["./assets/audio/whistle-blows.mp3", "./assets/audio/whistle-blows.ogg"]), this.add.text(n(this), r(this), "Loading....", {
                            fontSize: "70px",
                            fontFamily: "font",
                            color: "#ffcd00"
                        }).setOrigin(.5)
                    }
                }, {
                    key: "create",
                    value: function() {
                        o.isMobileView ? this.scene.start("MenuSceneMobile") : this.scene.start("MenuScene")
                    }
                }, {
                    key: "update",
                    value: function() {}
                }]) && u(e.prototype, i), a && u(e, a), l
            }(),
            y = function(t) {
                t.create({
                    key: "player-dribble",
                    frames: t.generateFrameNumbers("player-dribble", {
                        start: 0,
                        end: 15
                    }),
                    frameRate: 30,
                    repeat: -1
                }), t.create({
                    key: "player-shot",
                    frames: t.generateFrameNumbers("player-shot", {
                        start: 0,
                        end: 9
                    }),
                    frameRate: 30
                }), t.create({
                    key: "hoopAnim",
                    frames: t.generateFrameNumbers("hoop", {
                        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
                    }),
                    frameRate: 30
                })
            },
            m = i(60),
            v = i.n(m);

        function g(t) {
            return (g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function S(t, e) {
            for (var i = 0; i < e.length; i++) {
                var o = e[i];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
            }
        }

        function x(t, e) {
            return (x = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function w(t) {
            var e = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var i, o = E(t);
                if (e) {
                    var n = E(this).constructor;
                    i = Reflect.construct(o, arguments, n)
                } else i = o.apply(this, arguments);
                return O(this, i)
            }
        }

        function O(t, e) {
            return !e || "object" !== g(e) && "function" != typeof e ? P(t) : e
        }

        function P(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function E(t) {
            return (E = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }

        function k(t, e, i) {
            return e in t ? Object.defineProperty(t, e, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = i, t
        }
        var T = function(t) {
            ! function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && x(t, e)
            }(h, Phaser.Scene);
            var e, i, c, u = w(h);

            function h() {
                var t;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, h), k(P(t = u.call(this, {
                    key: "GameScene"
                })), "BULLET_SPEED", 1e3), k(P(t), "GRAVITY", 2300), k(P(t), "ball", void 0), k(P(t), "trajectories", void 0), k(P(t), "lastMouseCoordinate", void 0), k(P(t), "isShotStart", void 0), k(P(t), "isShoted", void 0), k(P(t), "player", void 0), k(P(t), "dot_amount", void 0), k(P(t), "hoop", void 0), k(P(t), "hoopNet", void 0), k(P(t), "isScored", void 0), k(P(t), "isGameStart", void 0), k(P(t), "timerText", void 0), k(P(t), "maxLife", void 0), k(P(t), "exitingData", void 0), k(P(t), "isGameOver", void 0), k(P(t), "lifeArr", void 0), t
            }
            return e = h, (i = [{
                key: "init",
                value: function() {
                    this.getData()
                }
            }, {
                key: "create",
                value: function() {
                    var t = this;
                    this.lifeArr = [], this.maxLife = 3, this.isGameStart = !1, this.isShotStart = !1, this.isShoted = !1, this.isGameOver = !1, y(this.anims), this.add.image(n(this), r(this), "bg-".concat(o.levelNumber));
                    var e = this.add.text(n(this), r(this), "LEVEL ".concat(o.levelNumber), {
                            fontSize: "100px",
                            fontFamily: "font"
                        }).setOrigin(.5).setScale(0).setDepth(5),
                        i = 45e3;
                    3 == o.levelNumber && (i = 2e4, this.dot_amount = .6), 2 == o.levelNumber && (this.dot_amount = .7), 1 == o.levelNumber && (this.dot_amount = .8), this.timerText = this.add.text(80, 50, "".concat(l(i)), {
                        fontSize: "50px",
                        fontFamily: "font"
                    }).setOrigin(.5).setDepth(5), this.tweens.add({
                        delay: 1e3,
                        targets: e,
                        scale: 1.1,
                        duration: 500,
                        onComplete: function() {
                            t.tweens.add({
                                targets: e,
                                scale: .6,
                                duration: 500,
                                yoyo: !0,
                                onComplete: function() {
                                    e.visible = !1, t.isGameStart = !0, t.sound.play("whistle-blows")
                                }
                            })
                        }
                    });
                    for (var c = 0; c < 3; c++) {
                        var u = this.add.image(a(this) - 30 - 50 * c, 50, "ball").setScale(.2);
                        this.lifeArr.push(u)
                    }
                    this.trajectories = [], this.ball = this.physics.add.sprite(290, s(this) - 420, "ball").setDepth(3).setScale(.2), this.ball.body.setCircle(.5 * this.ball.width), this.ball.setVisible(!1), this.ball.setBounceY(.4), this.input.activePointer.x = this.sys.canvas.width / 2, this.input.activePointer.y = this.sys.canvas.height / 2 - 100, this.drawTrajectories(), this.time.addEvent({
                        delay: 1e3,
                        callback: function() {
                            t.isGameStart && (i -= 1e3, t.timerText.text = "".concat(l(i)), 0 == i && (o.levelNumber < 3 ? (o.levelNumber++, t.ball.visible = !1, t.time.addEvent({
                                delay: 1e3,
                                callback: function() {
                                    t.scene.start("GameScene")
                                }
                            })) : (t.isGameStart = !1, t.addGameOver())))
                        },
                        repeat: -1
                    }), this.isShotStart = !1, this.input.on("pointerdown", (function() {
                        t.isGameOver || t.isShoted || (t.isShotStart = !0, t.player.stop(), t.player.setTexture("player-shot", 0), t.ball.setVisible(!0))
                    })), this.ball.angle = 0, this.input.on("pointerup", (function() {
                        t.isGameOver || t.isShoted || 2250 != t.BULLET_SPEED && (t.ball.setGravityY(t.GRAVITY), t.ball.body.velocity.x = Math.cos(t.ball.rotation) * t.BULLET_SPEED, t.ball.body.velocity.y = Math.sin(t.ball.rotation) * t.BULLET_SPEED, t.isShotStart = !1, t.updateTrajectories(!1), t.player.play("player-shot", !0), t.isShoted = !0)
                    })), this.input.on("pointermove", (function() {
                        if (t.isShotStart && !t.isShoted) {
                            var e = 10 * -(t.input.activePointer.y - t.ball.y);
                            t.BULLET_SPEED = e, t.updateTrajectories(!0)
                        }
                    })), this.lastMouseCoordinate = this.input.activePointer.x, this.player = this.add.sprite(250, 600, "player-dribble").setScale(1.5).setFlipX(!0), this.player.play("player-dribble", !0), this.time.addEvent({
                        delay: 500,
                        callback: function() {
                            t.isShotStart || t.isShoted || t.sound.play("dribble-sound")
                        },
                        repeat: -1
                    }), this.hoop = this.add.container(n(this), 200).setScale(.8, .5);
                    var h = this.add.image(0, -150, "board").setScale(.6, 1);
                    this.hoopNet = this.add.sprite(0, 40, "hoop").setScale(.8, 1);
                    var f = this.physics.add.sprite(0, 80, "ball").setScale(.1).setAlpha(0),
                        p = this.physics.add.image(-61, 23, "border").setAlpha(0).setScale(.02, .2).setImmovable(!0);
                    p.angle = -10;
                    var d = this.physics.add.image(57, 23, "border").setAlpha(0).setScale(.02, .22).setAngle(10).setImmovable(!0);
                    d.angle = 10;
                    var b = this.add.text(0, -252, "".concat(o.score), {
                        fontFamily: "font",
                        fontSize: "45px",
                        color: "red"
                    }).setOrigin(.5);
                    this.hoop.add([h, this.hoopNet, f, p, d, b]), this.isScored = !1;
                    var m = this.physics.add.image(n(this), s(this) - 40, "border").setAlpha(0).setScale(10, .5);
                    m.setImmovable(!0), this.physics.add.overlap(this.ball, f, (function(e, i) {
                        t.isScored || (t.sound.play("score-sound"), t.isScored = !0, t.hoopNet.play("hoopAnim", !0), o.score++, b.setText("".concat(o.score)), t.sound.play("applause-sound"))
                    }));
                    var v = this.sound.add("dribble-sound", {
                        volume: .4
                    });
                    this.physics.add.collider(this.ball, p, (function(t, e) {
                        v.isPlaying || v.play()
                    })), this.physics.add.collider(this.ball, d, (function(t, e) {
                        v.isPlaying || v.play()
                    }));
                    var g = !1;
                    this.physics.add.collider(this.ball, m, (function(e, i) {
                        g || (t.isScored || (t.maxLife--, t.lifeArr[t.maxLife].visible = !1, 0 == t.maxLife && (t.isGameStart = !1, t.isGameOver = !0, t.addGameOver())), t.sound.play("dribble-sound"), g = !0, t.time.addEvent({
                            delay: 1200,
                            callback: function() {
                                0 != t.maxLife && (console.log("reset"), t.resetBall(), g = !1)
                            }
                        }))
                    })), 1 != o.levelNumber && this.addSlash()
                }
            }, {
                key: "update",
                value: function(t, e) {
                    !this.isShoted && this.isShotStart && (this.ball.rotation = Phaser.Math.Angle.Between(-this.input.activePointer.x, -this.input.activePointer.y, -this.ball.x, -this.ball.y)), this.ball.y > s(this) && this.resetBall()
                }
            }, {
                key: "resetBall",
                value: function() {
                    this.isShoted && (console.log("adas"), this.isShoted = !1, this.isShotStart = !1, this.ball.setGravityY(0), this.ball.body.velocity.x = 0, this.ball.body.velocity.y = 0, this.ball.setPosition(290, s(this) - 420), this.player.play("player-dribble", !0), this.ball.setVisible(!1), this.isScored = !1, this.setHoopPosition())
                }
            }, {
                key: "drawTrajectories",
                value: function() {
                    for (var t = -this.ball.rotation, e = 0, i = 0, o = 0; o < this.dot_amount; o += .03) {
                        e = this.BULLET_SPEED * o * Math.cos(t) * .99, i = this.BULLET_SPEED * o * Math.sin(t) * .99 - .5 * this.GRAVITY * o * o;
                        var n = this.add.image(e + this.ball.x, this.ball.y - i, "ball").setDepth(3).setScale(.04).setVisible(!1);
                        this.trajectories.push(n)
                    }
                }
            }, {
                key: "updateTrajectories",
                value: function(t) {
                    for (var e = -this.ball.rotation, i = 0, o = 0, n = 0, r = 0; r < this.dot_amount; r += .03) i = this.BULLET_SPEED * r * Math.cos(e) * .99, o = this.BULLET_SPEED * r * Math.sin(e) * .99 - .5 * this.GRAVITY * r * r, this.trajectories[n].x = i + this.ball.x, this.trajectories[n].y = this.ball.y - o, this.trajectories[n].visible = t, n += 1
                }
            }, {
                key: "setHoopPosition",
                value: function() {
                    var t = Phaser.Math.FloatBetween(n(this), a(this) - 250),
                        e = Phaser.Math.FloatBetween(210, s(this) - 500);
                    this.hoop.setPosition(t, e)
                }
            }, {
                key: "addGameOver",
                value: function() {
                    var t = this;
                    this.dataPost();
                    var e = this.add.container(n(this), r(this)).setDepth(10),
                        i = this.add.image(0, 0, "popup"),
                        a = this.add.text(0, -300, "GAME OVER", {
                            fontSize: "60px",
                            fontFamily: "font",
                            color: "red"
                        }).setOrigin(.5),
                        s = this.add.text(0, -50, "SCORE\n".concat(o.score), {
                            fontSize: "90px",
                            fontFamily: "font",
                            color: "back",
                            align: "center"
                        }).setOrigin(.5),
                        l = this.add.image(0, -7, "score-fill").setScale(1.3),
                        c = this.add.image(-130, 160, "btn-home").setInteractive({
                            cursor: "pointer"
                        }).on("pointerup", (function() {
                            o.score = 0, o.levelNumber = 1, t.scene.start("MenuScene")
                        })),
                        u = this.add.image(130, 160, "btn-replay").setInteractive({
                            cursor: "pointer"
                        }).on("pointerup", (function() {
                            o.score = 0, o.levelNumber = 1, t.scene.start("GameScene")
                        }));
                    e.add([i, a, l, s, c, u])
                }
            }, {
                key: "addSlash",
                value: function() {
                    var t = this.add.image(n(this), r(this), "slash").setDepth(10);
                    t.visible = !0, this.tweens.add({
                        targets: t,
                        delay: 500,
                        alpha: 0,
                        onComplete: function() {
                            t.visible = !1, t.alpha = 1
                        }
                    })
                }
            }, {
                key: "dataPost",
                value: function() {
                    var t = {
                        name: o.userName,
                        score: o.score
                    };
                    this.exitingData.user.push(t), console.log(this.exitingData), v.a.ajax({
                        type: "POST",
                        url: "https://toolkitweb.xyz/toolkit/basket_leader.php",
                        data: {
                            data: this.exitingData
                        },
                        beforeSend: function() {
                            console.log("sending")
                        },
                        success: function(t) {
                            console.log(t)
                        },
                        error: function(t, e, i) {
                            console.log("error")
                        }
                    })
                }
            }, {
                key: "getData",
                value: function() {
                    var t = this;
                    fetch("https://toolkitweb.xyz/toolkit/basket-leaderboard.json").then((function(t) {
                        if (!t.ok) throw new Error("Network response was not ok " + t.statusText);
                        return t.json()
                    })).then((function(e) {
                        t.exitingData = e
                    })).catch((function(t) {
                        console.error("There was a problem with the fetch operation:", t)
                    }))
                }
            }]) && S(e.prototype, i), c && S(e, c), h
        }();

        function j(t) {
            return (j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function _(t, e) {
            for (var i = 0; i < e.length; i++) {
                var o = e[i];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
            }
        }

        function R(t, e) {
            return (R = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function L(t) {
            var e = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var i, o = G(t);
                if (e) {
                    var n = G(this).constructor;
                    i = Reflect.construct(o, arguments, n)
                } else i = o.apply(this, arguments);
                return M(this, i)
            }
        }

        function M(t, e) {
            return !e || "object" !== j(e) && "function" != typeof e ? A(t) : e
        }

        function A(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function G(t) {
            return (G = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }

        function N(t, e, i) {
            return e in t ? Object.defineProperty(t, e, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = i, t
        }
        var B = function(t) {
            ! function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && R(t, e)
            }(h, Phaser.Scene);
            var e, i, c, u = L(h);

            function h() {
                var t;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, h), N(A(t = u.call(this, {
                    key: "GameSceneMobile"
                })), "BULLET_SPEED", 1e3), N(A(t), "GRAVITY", 2300), N(A(t), "ball", void 0), N(A(t), "trajectories", void 0), N(A(t), "lastMouseCoordinate", void 0), N(A(t), "isShotStart", void 0), N(A(t), "isShoted", void 0), N(A(t), "player", void 0), N(A(t), "dot_amount", void 0), N(A(t), "hoop", void 0), N(A(t), "hoopNet", void 0), N(A(t), "isScored", void 0), N(A(t), "isGameStart", void 0), N(A(t), "timerText", void 0), N(A(t), "maxLife", void 0), N(A(t), "exitingData", void 0), N(A(t), "isGameOver", void 0), N(A(t), "lifeArr", void 0), t
            }
            return e = h, (i = [{
                key: "init",
                value: function() {
                    this.getData()
                }
            }, {
                key: "create",
                value: function() {
                    var t = this;
                    this.lifeArr = [], this.maxLife = 3, this.isGameStart = !1, this.isShotStart = !1, this.isShoted = !1, this.isGameOver = !1, y(this.anims), this.add.image(n(this), r(this), "bg-".concat(o.levelNumber));
                    var e = this.add.text(n(this), r(this), "LEVEL ".concat(o.levelNumber), {
                            fontSize: "100px",
                            fontFamily: "font"
                        }).setOrigin(.5).setScale(0).setDepth(5),
                        i = 45e3;
                    3 == o.levelNumber && (i = 2e4, this.dot_amount = .6), 2 == o.levelNumber && (this.dot_amount = .7), 1 == o.levelNumber && (this.dot_amount = .8), this.timerText = this.add.text(80, 50, "".concat(l(i)), {
                        fontSize: "50px",
                        fontFamily: "font"
                    }).setOrigin(.5).setDepth(5), this.tweens.add({
                        delay: 1e3,
                        targets: e,
                        scale: 1.1,
                        duration: 500,
                        onComplete: function() {
                            t.tweens.add({
                                targets: e,
                                scale: .6,
                                duration: 500,
                                yoyo: !0,
                                onComplete: function() {
                                    e.visible = !1, t.isGameStart = !0, t.sound.play("whistle-blows")
                                }
                            })
                        }
                    });
                    for (var c = 0; c < 3; c++) {
                        var u = this.add.image(a(this) - 30 - 50 * c, 50, "ball").setScale(.2);
                        this.lifeArr.push(u)
                    }
                    this.trajectories = [], this.ball = this.physics.add.sprite(140, s(this) - 430, "ball").setDepth(3).setScale(.2), this.ball.body.setCircle(.5 * this.ball.width), this.ball.setVisible(!1), this.ball.setBounceY(.4), this.input.activePointer.x = this.sys.canvas.width / 2, this.input.activePointer.y = this.sys.canvas.height / 2 - 100, this.drawTrajectories(), this.time.addEvent({
                        delay: 1e3,
                        callback: function() {
                            t.isGameStart && (i -= 1e3, t.timerText.text = "".concat(l(i)), 0 == i && (o.levelNumber < 3 ? (o.levelNumber++, t.ball.visible = !1, t.time.addEvent({
                                delay: 1e3,
                                callback: function() {
                                    t.scene.start("GameSceneMobile")
                                }
                            })) : (t.isGameStart = !1, t.addGameOver())))
                        },
                        repeat: -1
                    }), this.isShotStart = !1, this.input.on("pointerdown", (function() {
                        t.isGameOver || t.isShoted || (t.isShotStart = !0, t.player.stop(), t.player.setTexture("player-shot", 0), t.ball.setVisible(!0))
                    })), this.ball.angle = 0, this.input.on("pointerup", (function() {
                        t.isGameOver || t.isShoted || 2250 != t.BULLET_SPEED && (t.ball.setGravityY(t.GRAVITY), t.ball.body.velocity.x = Math.cos(t.ball.rotation) * t.BULLET_SPEED, t.ball.body.velocity.y = Math.sin(t.ball.rotation) * t.BULLET_SPEED, t.isShotStart = !1, t.updateTrajectories(!1), t.player.play("player-shot", !0), t.isShoted = !0)
                    })), this.input.on("pointermove", (function() {
                        if (t.isShotStart && !t.isShoted) {
                            var e = 10 * -(t.input.activePointer.y - t.ball.y);
                            t.BULLET_SPEED = e, t.updateTrajectories(!0)
                        }
                    })), this.lastMouseCoordinate = this.input.activePointer.x, this.player = this.add.sprite(100, 900, "player-dribble").setScale(1.5).setFlipX(!0), this.player.play("player-dribble", !0), this.time.addEvent({
                        delay: 500,
                        callback: function() {
                            t.isShotStart || t.isShoted || t.sound.play("dribble-sound")
                        },
                        repeat: -1
                    }), this.hoop = this.add.container(n(this), 200).setScale(.8, .5);
                    var h = this.add.image(0, -150, "board").setScale(.6, 1);
                    this.hoopNet = this.add.sprite(0, 40, "hoop").setScale(.8, 1);
                    var f = this.physics.add.sprite(0, 80, "ball").setScale(.1).setAlpha(0),
                        p = this.physics.add.image(-61, 23, "border").setAlpha(0).setScale(.02, .2).setImmovable(!0);
                    p.angle = -10;
                    var d = this.physics.add.image(57, 23, "border").setAlpha(0).setScale(.02, .22).setAngle(10).setImmovable(!0);
                    d.angle = 10;
                    var b = this.add.text(0, -252, "".concat(o.score), {
                        fontFamily: "font",
                        fontSize: "45px",
                        color: "red"
                    }).setOrigin(.5);
                    this.hoop.add([h, this.hoopNet, f, p, d, b]), this.isScored = !1;
                    var m = this.physics.add.image(n(this), s(this) - 40, "border").setAlpha(0).setScale(10, .5);
                    m.setImmovable(!0), this.physics.add.overlap(this.ball, f, (function(e, i) {
                        t.isScored || (t.sound.play("score-sound"), t.isScored = !0, t.hoopNet.play("hoopAnim", !0), o.score++, b.setText("".concat(o.score)), t.sound.play("applause-sound"))
                    }));
                    var v = this.sound.add("dribble-sound", {
                        volume: .4
                    });
                    this.physics.add.collider(this.ball, p, (function(t, e) {
                        v.isPlaying || v.play()
                    })), this.physics.add.collider(this.ball, d, (function(t, e) {
                        v.isPlaying || v.play()
                    }));
                    var g = !1;
                    this.physics.add.collider(this.ball, m, (function(e, i) {
                        g || (t.isScored || (t.maxLife--, t.lifeArr[t.maxLife].visible = !1, 0 == t.maxLife && (t.isGameStart = !1, t.isGameOver = !0, t.addGameOver())), t.sound.play("dribble-sound"), g = !0, t.time.addEvent({
                            delay: 1200,
                            callback: function() {
                                0 != t.maxLife && (console.log("reset"), t.resetBall(), g = !1)
                            }
                        }))
                    })), 1 != o.levelNumber && this.addSlash()
                }
            }, {
                key: "update",
                value: function(t, e) {
                    !this.isShoted && this.isShotStart && (this.ball.rotation = Phaser.Math.Angle.Between(-this.input.activePointer.x, -this.input.activePointer.y, -this.ball.x, -this.ball.y)), this.ball.y > s(this) && this.resetBall()
                }
            }, {
                key: "resetBall",
                value: function() {
                    this.isShoted && (console.log("adas"), this.isShoted = !1, this.isShotStart = !1, this.ball.setGravityY(0), this.ball.body.velocity.x = 0, this.ball.body.velocity.y = 0, this.ball.setPosition(140, s(this) - 430), this.player.play("player-dribble", !0), this.ball.setVisible(!1), this.isScored = !1, this.setHoopPosition())
                }
            }, {
                key: "drawTrajectories",
                value: function() {
                    for (var t = -this.ball.rotation, e = 0, i = 0, o = 0; o < this.dot_amount; o += .03) {
                        e = this.BULLET_SPEED * o * Math.cos(t) * .99, i = this.BULLET_SPEED * o * Math.sin(t) * .99 - .5 * this.GRAVITY * o * o;
                        var n = this.add.image(e + this.ball.x, this.ball.y - i, "ball").setDepth(3).setScale(.04).setVisible(!1);
                        this.trajectories.push(n)
                    }
                }
            }, {
                key: "updateTrajectories",
                value: function(t) {
                    for (var e = -this.ball.rotation, i = 0, o = 0, n = 0, r = 0; r < this.dot_amount; r += .03) i = this.BULLET_SPEED * r * Math.cos(e) * .99, o = this.BULLET_SPEED * r * Math.sin(e) * .99 - .5 * this.GRAVITY * r * r, this.trajectories[n].x = i + this.ball.x, this.trajectories[n].y = this.ball.y - o, this.trajectories[n].visible = t, n += 1
                }
            }, {
                key: "setHoopPosition",
                value: function() {
                    var t = Phaser.Math.FloatBetween(n(this), a(this) - 250),
                        e = Phaser.Math.FloatBetween(210, s(this) - 500);
                    this.hoop.setPosition(t, e)
                }
            }, {
                key: "addGameOver",
                value: function() {
                    var t = this;
                    this.dataPost();
                    var e = this.add.container(n(this), r(this)).setDepth(10),
                        i = this.add.image(0, 0, "popup"),
                        a = this.add.text(0, -300, "GAME OVER", {
                            fontSize: "60px",
                            fontFamily: "font",
                            color: "red"
                        }).setOrigin(.5),
                        s = this.add.text(0, -50, "SCORE\n".concat(o.score), {
                            fontSize: "90px",
                            fontFamily: "font",
                            color: "back",
                            align: "center"
                        }).setOrigin(.5),
                        l = this.add.image(0, -7, "score-fill").setScale(1.3),
                        c = this.add.image(-130, 160, "btn-home").setInteractive({
                            cursor: "pointer"
                        }).on("pointerup", (function() {
                            o.score = 0, o.levelNumber = 1, t.scene.start("MenuSceneMobile")
                        })),
                        u = this.add.image(130, 160, "btn-replay").setInteractive({
                            cursor: "pointer"
                        }).on("pointerup", (function() {
                            o.score = 0, o.levelNumber = 1, t.scene.start("GameSceneMobile")
                        }));
                    e.add([i, a, l, s, c, u])
                }
            }, {
                key: "addSlash",
                value: function() {
                    var t = this.add.image(n(this), r(this), "slash").setDepth(10);
                    t.visible = !0, this.tweens.add({
                        targets: t,
                        delay: 500,
                        alpha: 0,
                        onComplete: function() {
                            t.visible = !1, t.alpha = 1
                        }
                    })
                }
            }, {
                key: "dataPost",
                value: function() {
                    var t = {
                        name: o.userName,
                        score: o.score
                    };
                    this.exitingData.user.push(t), console.log(this.exitingData), v.a.ajax({
                        type: "POST",
                        url: "https://toolkitweb.xyz/toolkit/basket_leader.php",
                        data: {
                            data: this.exitingData
                        },
                        beforeSend: function() {
                            console.log("sending")
                        },
                        success: function(t) {
                            console.log(t)
                        },
                        error: function(t, e, i) {
                            console.log("error")
                        }
                    })
                }
            }, {
                key: "getData",
                value: function() {
                    var t = this;
                    fetch("https://toolkitweb.xyz/toolkit/basket-leaderboard.json").then((function(t) {
                        if (!t.ok) throw new Error("Network response was not ok " + t.statusText);
                        return t.json()
                    })).then((function(e) {
                        t.exitingData = e
                    })).catch((function(t) {
                        console.error("There was a problem with the fetch operation:", t)
                    }))
                }
            }]) && _(e.prototype, i), c && _(e, c), h
        }();

        function D(t) {
            return (D = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function I(t, e) {
            for (var i = 0; i < e.length; i++) {
                var o = e[i];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
            }
        }

        function F(t, e) {
            return (F = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function V(t) {
            var e = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var i, o = U(t);
                if (e) {
                    var n = U(this).constructor;
                    i = Reflect.construct(o, arguments, n)
                } else i = o.apply(this, arguments);
                return z(this, i)
            }
        }

        function z(t, e) {
            return !e || "object" !== D(e) && "function" != typeof e ? C(t) : e
        }

        function C(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function U(t) {
            return (U = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var H = function(t) {
            ! function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && F(t, e)
            }(s, Phaser.Scene);
            var e, i, o, a = V(s);

            function s() {
                var t, e, i, o;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, s), t = a.call(this, "LeaderboardScene"), e = C(t), o = void 0, (i = "exitingData") in e ? Object.defineProperty(e, i, {
                    value: o,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[i] = o, t
            }
            return e = s, (i = [{
                key: "create",
                value: function() {
                    var t = this;
                    this.add.image(n(this), r(this), "bg-".concat(1)), this.getData(), this.add.text(n(this), 80, "LEADER BOARD", {
                        fontSize: "40px",
                        fontFamily: "ARIAL"
                    }).setOrigin(.5), this.add.image(70, 80, "backBtn").setScale(.1).setInteractive({
                        cursor: "pointer"
                    }).on("pointerup", (function() {
                        t.scene.start("MenuScene")
                    })), this.add.rectangle(n(this), 167, 950, 80, 608897), this.add.text(n(this), 155, "NAME", {
                        fontSize: "30px",
                        fontFamily: "optima"
                    }).setOrigin(.5), this.add.text(n(this) - 280, 155, "R A N K", {
                        fontSize: "30px",
                        fontFamily: "optima"
                    }).setOrigin(.5), this.add.text(n(this) + 280, 155, "S C O R E", {
                        fontSize: "30px",
                        fontFamily: "optima"
                    }).setOrigin(.5)
                }
            }, {
                key: "getData",
                value: function() {
                    var t = this;
                    fetch("https://toolkitweb.xyz/toolkit/basket-leaderboard.json").then((function(t) {
                        if (!t.ok) throw new Error("Network response was not ok " + t.statusText);
                        return t.json()
                    })).then((function(e) {
                        t.exitingData = e, console.log(e);
                        var i = e.user.sort((function(t, e) {
                            return e.score - t.score
                        })).slice(0, 11);
                        i.forEach((function(t) {
                            console.log("Name: ".concat(t.name, ", Score: ").concat(t.score))
                        }));
                        for (var o = 1; o <= i.length; o++) t.add.rectangle(n(t), 160 + 90 * o, 950, 80, 16777215), t.add.text(n(t) - 280, 160 + 90 * o, "".concat(o), {
                            fontSize: "30px",
                            fontFamily: "optima",
                            color: "black"
                        }).setOrigin(.5), t.add.text(n(t), 160 + 90 * o, "".concat(i[o - 1].name), {
                            fontSize: "30px",
                            fontFamily: "optima",
                            color: "black"
                        }).setOrigin(.5), t.add.text(n(t) + 280, 160 + 90 * o, "".concat(i[o - 1].score), {
                            fontSize: "30px",
                            fontFamily: "optima",
                            color: "black"
                        }).setOrigin(.5)
                    }))
                }
            }]) && I(e.prototype, i), o && I(e, o), s
        }();

        function Y(t) {
            return (Y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function W(t, e) {
            for (var i = 0; i < e.length; i++) {
                var o = e[i];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
            }
        }

        function K(t, e) {
            return (K = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function J(t) {
            var e = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var i, o = Q(t);
                if (e) {
                    var n = Q(this).constructor;
                    i = Reflect.construct(o, arguments, n)
                } else i = o.apply(this, arguments);
                return X(this, i)
            }
        }

        function X(t, e) {
            return !e || "object" !== Y(e) && "function" != typeof e ? q(t) : e
        }

        function q(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function Q(t) {
            return (Q = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var Z = function(t) {
            ! function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && K(t, e)
            }(u, Phaser.Scene);
            var e, i, l, c = J(u);

            function u() {
                var t, e, i, o;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, u), t = c.call(this, "MenuScene"), e = q(t), o = void 0, (i = "nameText") in e ? Object.defineProperty(e, i, {
                    value: o,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[i] = o, t
            }
            return e = u, (i = [{
                key: "preload",
                value: function() {
                    this.load.scenePlugin({
                        key: "rexuiplugin",
                        url: "assets/rexuiplugin.min.js",
                        sceneKey: "rexUI"
                    }), this.load.plugin("rexcheckboxplugin", "assets/rexcheckboxplugin.min.js", !0)
                }
            }, {
                key: "init",
                value: function() {}
            }, {
                key: "create",
                value: function() {
                    var t = this,
                        e = this.add.image(n(this), r(this), "menu-bg").setInteractive();
                    e.displayWidth = a(this), e.displayHeight = s(this), this.nameText = this.add.text(a(this) - 270, 120, "ENTER NAME", {
                        fontSize: "20px",
                        fontFamily: "optima",
                        fixedWidth: 800,
                        fixedHeight: 70,
                        color: "#000000",
                        align: "center"
                    }), this.nameText.setOrigin(.5, 0);
                    var i = !1;
                    this.nameText.setInteractive().on("pointerdown", (function() {
                        i || (i = !0, t.nameText.text = ""), t.nameText.y = 95, t.rexUI.edit(t.nameText)
                    })), e.on("pointerdown", (function() {
                        t.nameText.y = 120
                    })), this.add.image(a(this) - 270, 230, "border").setAngle(-90).setAlpha(.01).setScale(.3).setInteractive({
                        cursor: "pointer"
                    }).on("pointerup", (function() {
                        t.scene.start("LeaderboardScene")
                    })), this.add.image(a(this) - 270, 330, "border").setAngle(-90).setScale(.3).setAlpha(.01).setInteractive({
                        cursor: "pointer"
                    }).on("pointerup", (function() {
                        t.nameText.text.length > 2 && "ENTER NAME" != t.nameText.text && (o.userName = t.nameText.text, t.scene.start("GameScene"))
                    }))
                }
            }, {
                key: "update",
                value: function(t, e) {}
            }]) && W(e.prototype, i), l && W(e, l), u
        }();

        function $(t) {
            return ($ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function tt(t, e) {
            for (var i = 0; i < e.length; i++) {
                var o = e[i];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
            }
        }

        function et(t, e) {
            return (et = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function it(t) {
            var e = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var i, o = rt(t);
                if (e) {
                    var n = rt(this).constructor;
                    i = Reflect.construct(o, arguments, n)
                } else i = o.apply(this, arguments);
                return ot(this, i)
            }
        }

        function ot(t, e) {
            return !e || "object" !== $(e) && "function" != typeof e ? nt(t) : e
        }

        function nt(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function rt(t) {
            return (rt = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var at = function(t) {
                ! function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && et(t, e)
                }(u, Phaser.Scene);
                var e, i, l, c = it(u);

                function u() {
                    var t, e, i, o;
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, u), t = c.call(this, "MenuSceneMobile"), e = nt(t), o = void 0, (i = "nameText") in e ? Object.defineProperty(e, i, {
                        value: o,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[i] = o, t
                }
                return e = u, (i = [{
                    key: "preload",
                    value: function() {
                        this.load.scenePlugin({
                            key: "rexuiplugin",
                            url: "assets/rexuiplugin.min.js",
                            sceneKey: "rexUI"
                        }), this.load.plugin("rexcheckboxplugin", "assets/rexcheckboxplugin.min.js", !0)
                    }
                }, {
                    key: "init",
                    value: function() {}
                }, {
                    key: "create",
                    value: function() {
                        var t = this,
                            e = this.add.image(n(this), r(this), "menu-bg").setInteractive();
                        e.displayWidth = a(this), e.displayHeight = s(this), this.nameText = this.add.text(130, 390, "ENTER NAME", {
                            fontSize: "25px",
                            fontFamily: "optima",
                            fixedWidth: 800,
                            fixedHeight: 70,
                            color: "#000000",
                            align: "center"
                        }), this.nameText.setOrigin(.5, 0);
                        var i = !1;
                        this.nameText.setInteractive().on("pointerdown", (function() {
                            i || (i = !0, t.nameText.text = ""), t.nameText.y = 370, t.rexUI.edit(t.nameText)
                        })), e.on("pointerdown", (function() {
                            t.nameText.y = 390
                        })), this.add.image(170, 520, "border").setAngle(-90).setAlpha(.001).setScale(.3, .31).setInteractive({
                            cursor: "pointer"
                        }).on("pointerup", (function() {
                            t.scene.start("LeaderboardScene")
                        })), this.add.image(170, 640, "border").setAngle(-90).setScale(.3, .31).setAlpha(.001).setInteractive({
                            cursor: "pointer"
                        }).on("pointerup", (function() {
                            t.nameText.text.length > 2 && "ENTER NAME" != t.nameText.text && (o.userName = t.nameText.text, o.isMobileView ? t.scene.start("GameSceneMobile") : t.scene.start("GameScene"))
                        }))
                    }
                }, {
                    key: "update",
                    value: function(t, e) {}
                }]) && tt(e.prototype, i), l && tt(e, l), u
            }(),
            st = window.innerWidth,
            lt = window.innerHeight;
        console.log(lt), o.isMobileView = st < lt;
        var ct = {
            type: Phaser.AUTO,
            backgroundColor: "#001625",
            parent: "game",
            width: o.isMobileView ? 720 : 1280,
            height: o.isMobileView ? 1280 : 961,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            dom: {
                createContainer: !0
            },
            physics: {
                default: "arcade",
                arcade: {
                    gravity: {
                        y: 0
                    },
                    debug: !1
                }
            },
            scene: [b, T, Z, at, H, B]
        };
        new Phaser.Game(ct)
    }
});

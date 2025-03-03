export let PlayerAnim = (anims: Phaser.Animations.AnimationManager) =>{
    anims.create({
        key: "player-dribble",
        frames: anims.generateFrameNumbers("player-dribble", {start: 0, end: 15}),
        frameRate: 30,
        repeat: -1
    })

    anims.create({
        key: "player-shot",
        frames: anims.generateFrameNumbers("player-shot", {start: 0, end: 9}),
        frameRate: 30,
    })

    anims.create({
        key: "hoopAnim",
        frames: anims.generateFrameNumbers("hoop", {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}),
        frameRate: 30,
    })
}

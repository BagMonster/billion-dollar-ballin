import { getCenterX, getCenterY, option } from "../utils/utils";

export class BootScene extends Phaser.Scene {
  
    constructor() {
      super({
        key: "BootScene"
      });
    }
  
    preload(): void {

      let path = "./assets/";

      if(!option.isMobileView){
        path = "./assets/desktop"
      }

      this.load.spritesheet("player-dribble", `${path}/sprites/player-dribble.png`, {
        frameWidth: 190,
        frameHeight: 190
      })

      this.load.spritesheet("player-shot", `${path}/sprites/player-shot.png`, {
        frameWidth: 190,
        frameHeight: 190
      })

      this.load.spritesheet("hoop", `${path}/sprites/hoop.png`, {
        frameWidth: 166,
        frameHeight: 208
      })
      

      this.load.image("bg-1", `${path}/sprites/bg-1.png`);
      this.load.image("bg-2", `${path}/sprites/bg-2.png`);
      this.load.image("bg-3", `${path}/sprites/bg-3.png`);
      this.load.image("border", `${path}/sprites/border.png`);     
      this.load.image("board", `${path}/sprites/board.png`);
      this.load.image("menu-bg", `${path}/sprites/menu-bg.png`);

      this.load.image("btn-home", `${path}/sprites/btn-home.png`);      
      this.load.image("btn-replay", `${path}/sprites/btn-replay.png`);
      this.load.image("popup", `${path}/sprites/popup.png`);
      this.load.image("score-fill", `${path}/sprites/score-fill.png`);
      this.load.image("slash", `${path}/sprites/slash.png`);
      this.load.image("backBtn", `${path}/sprites/backBtn.png`);

      



      this.load.spritesheet("ball", "./assets/sprites/ball-sheet.png", {
        frameWidth: 230,
        frameHeight: 230,
      });


      this.load.audio("dribble-sound", ["./assets/audio/dribble-sound.mp3", "./assets/audio/dribble-sound.ogg"]);
      this.load.audio("score-sound", ["./assets/audio/dribble-sound.mp3", "./assets/audio/score-sound.ogg"]);
      this.load.audio("applause-sound", ["./assets/audio/applause.mp3", "./assets/audio/applause.ogg"]);
      this.load.audio("whistle-blows", ["./assets/audio/whistle-blows.mp3", "./assets/audio/whistle-blows.ogg"]);

      
      this.add.text(getCenterX(this), getCenterY(this), 'Loading....', {
        fontSize: "70px",
        fontFamily: "font",
        color: "#ffcd00"
      }).setOrigin(0.5);


    }

    create(){


      if(!option.isMobileView){
        this.scene.start("MenuScene");
      }else{
        this.scene.start("MenuSceneMobile");
      }

    // this.scene.start("GameScene");
    // this.scene.start("LeaderboardScene");



    }
  
    update(): void {


    }
  
  
  }
import { PlayerAnim } from "../anims/anims";
import { formatTime, getCenterX, getCenterY, getHeight, getWidth, option } from "../utils/utils";
import $ from 'jquery'

export class GameSceneMobile extends Phaser.Scene {

  private BULLET_SPEED = 1000;
  private GRAVITY = 2300;
  private ball: Phaser.Physics.Arcade.Sprite;
  private trajectories: Phaser.GameObjects.Image[];
  private lastMouseCoordinate: number;
  private isShotStart: boolean;
  private isShoted: boolean;
  private player: Phaser.GameObjects.Sprite;
  private dot_amount: number;

  private hoop: Phaser.GameObjects.Container;
  private hoopNet: Phaser.GameObjects.Sprite;
  private isScored: boolean;

  private isGameStart: boolean;

  private timerText: Phaser.GameObjects.Text;

  private maxLife: number;

  private exitingData: any;

  private isGameOver: boolean;

  private lifeArr: Phaser.GameObjects.Image[];

    
    constructor(){
      super({
        key: "GameSceneMobile",
      });
    }

    init(){

      this.getData();

    }

  
    create(){
      this.lifeArr = [];
      this.maxLife = 3;
      this.isGameStart = false;
      this.isShotStart = false;
      this.isShoted = false;
      this.isGameOver = false;

      PlayerAnim(this.anims);
      
      this.add.image(getCenterX(this), getCenterY(this), `bg-${option.levelNumber}`);

      let levelTextMsg = this.add.text(getCenterX(this), getCenterY(this), `LEVEL ${option.levelNumber}`, {
        fontSize: "100px",
        fontFamily: "font"
      }).setOrigin(0.5).setScale(0).setDepth(5);

      let maxTime =  45000;
      if(option.levelNumber == 3){
        maxTime = 20000;
        this.dot_amount = 0.6;
      }

      if(option.levelNumber == 2){
        this.dot_amount = 0.7;
      }

      if(option.levelNumber == 1){
        this.dot_amount = 0.8;
      }

      this.timerText = this.add.text(80, 50, `${formatTime(maxTime)}`, {
        fontSize: "50px",
        fontFamily: "font"
      }).setOrigin(0.5).setDepth(5);


      this.tweens.add({
        delay: 1000,
        targets: levelTextMsg,
        scale: 1.1,
        duration: 500,
        onComplete: ()=>{
          this.tweens.add({
            targets: levelTextMsg,
            scale: .6,
            duration: 500,
            yoyo: true,
            onComplete: ()=>{
              levelTextMsg.visible = false;
              this.isGameStart = true;
              this.sound.play("whistle-blows");
            }
          })
        }
      })

      for(let i = 0; i < 3; i++){
        let life = this.add.image((getWidth(this) - 30) - (50 * i), 50, "ball").setScale(0.2);
        this.lifeArr.push(life);
      }

      this.trajectories = [];

        // gun
        this.ball = this.physics.add.sprite(140, getHeight(this) - 430, 'ball').setDepth(3).setScale(0.2);
        this.ball.body.setCircle(this.ball.width * 0.5);
        this.ball.setVisible(false);
        this.ball.setBounceY(0.4);
        //this.ball.setGravityY(200);

        // when the example begins running
        this.input.activePointer.x = this.sys.canvas.width / 2;
        this.input.activePointer.y = this.sys.canvas.height / 2 - 100;

        this.drawTrajectories();

        this.time.addEvent({
          delay: 1000,
          callback: ()=>{
            if(this.isGameStart){
              maxTime -= 1000;
              this.timerText.text = `${formatTime(maxTime)}`;
              if(maxTime == 0){
                if(option.levelNumber < 3){
                  option.levelNumber++;
                  this.ball.visible = false;
                  this.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                      this.scene.start("GameSceneMobile");
                    }
                  })
                }else{
                  this.isGameStart = false;
                  // over
                  this.addGameOver();
                }
              }
            }
          },
          repeat: -1
        })
  

        this.isShotStart = false;


        this.input.on("pointerdown", ()=>{
          //if(this.isGameStart){
            if(!this.isGameOver){
              if(!this.isShoted){
                this.isShotStart = true;
                this.player.stop();
                this.player.setTexture("player-shot", 0);
                this.ball.setVisible(true);
              }
            }
         // }

        });


        this.ball.angle = 0;

        this.input.on("pointerup", ()=>{
          //if(this.isGameStart){
            if(!this.isGameOver){
              if(!this.isShoted){
                if(this.BULLET_SPEED != 2250){
                  this.ball.setGravityY(this.GRAVITY);
                  this.ball.body.velocity.x =  Math.cos(this.ball.rotation) * this.BULLET_SPEED;
                  this.ball.body.velocity.y = Math.sin(this.ball.rotation) * this.BULLET_SPEED;
                  this.isShotStart = false;
                  this.updateTrajectories(false);
       
                  this.player.play("player-shot", true);
                  this.isShoted = true;
                }
              }
            }
          //}
        })

        this.input.on("pointermove", ()=>{

            if(this.isShotStart && !this.isShoted){

              let dragEndY = this.input.activePointer.y;

              let new_ball_speed = -(dragEndY - this.ball.y) * 10;
              this.BULLET_SPEED = new_ball_speed;
              this.updateTrajectories(true);
            }
        })

        this.lastMouseCoordinate = this.input.activePointer.x;;


        this.player = this.add.sprite(100, 900, "player-dribble").setScale(1.5).setFlipX(true);
        this.player.play("player-dribble", true);

        this.time.addEvent({
          delay: 500,
          callback: ()=>{
            if(!this.isShotStart && !this.isShoted){
              this.sound.play("dribble-sound");
            }
          },
          repeat: -1
        })


        this.hoop = this.add.container(getCenterX(this), 200).setScale(0.8, 0.5);
        let board = this.add.image(0, -150, "board").setScale(0.6, 1);
        this.hoopNet = this.add.sprite(0, 40, "hoop").setScale(0.8, 1);
        let scoreCollider = this.physics.add.sprite(0, 80, 'ball').setScale(0.1).setAlpha(0);

        let borderLeft = this.physics.add.image(-61, 23, "border").setAlpha(0).setScale(0.02, 0.2).setImmovable(true);
        borderLeft.angle = -10;
        let borderRight = this.physics.add.image(57, 23, "border").setAlpha(0).setScale(0.02, 0.22).setAngle(10).setImmovable(true);
        borderRight.angle = 10;
        let scoreText = this.add.text(0, -252, `${option.score}`, {
          fontFamily: "font",
          fontSize: "45px",
          color: "red"
        }).setOrigin(0.5);


        this.hoop.add([board, this.hoopNet, scoreCollider, borderLeft, borderRight, scoreText]);


        this.isScored = false;

        let border_bottom = this.physics.add.image(getCenterX(this), getHeight(this) - 40, "border").setAlpha(0).setScale(10, 0.5);
        border_bottom.setImmovable(true);

        this.physics.add.overlap(this.ball, scoreCollider, (ball, scoreCollider)=>{
          if(!this.isScored){
            this.sound.play("score-sound");
            this.isScored = true;
            this.hoopNet.play("hoopAnim", true);
            option.score++;
            scoreText.setText(`${option.score}`);
            this.sound.play("applause-sound");
          }
        })  

        let dribbleSound = this.sound.add("dribble-sound", {
          volume: 0.4
        });

        this.physics.add.collider(this.ball, borderLeft, (ball, border)=>{
          if(!dribbleSound.isPlaying){
            dribbleSound.play();
          }

        })  

        this.physics.add.collider(this.ball, borderRight, (ball, border)=>{
          if(!dribbleSound.isPlaying){
            dribbleSound.play();
          }
        })  

        let isColliderWithBottom = false;

        let isBallCanReset = false;

        this.physics.add.collider(this.ball, border_bottom, (ball, border_bottom)=>{
          if(!isBallCanReset){
            if(!this.isScored){
              this.maxLife--;
              this.lifeArr[this.maxLife].visible = false;
              if(this.maxLife == 0){
                this.isGameStart = false;
                this.isGameOver = true;
                this.addGameOver();
              }
            }
            this.sound.play("dribble-sound");
            isBallCanReset = true;
            this.time.addEvent({
              delay: 1200,
              callback: ()=>{
                if(this.maxLife != 0){
                  console.log("reset");
                  this.resetBall();
                  isBallCanReset = false;
                }
              }
            })
          }

        })  

        if(option.levelNumber != 1){
          this.addSlash();
        }
    }

    update(time: number, delta: number): void {

      if(!this.isShoted && this.isShotStart){
        this.ball.rotation = Phaser.Math.Angle.Between(-this.input.activePointer.x, -this.input.activePointer.y, -this.ball.x, -this.ball.y);
      }


      if(this.ball.y > getHeight(this)){
          this.resetBall();
      }       
    }

    private resetBall(){
      if(this.isShoted){
        console.log("adas")
        //if(this.ball.y > getHeight(this)){
          this.isShoted = false;
          this.isShotStart = false;
          this.ball.setGravityY(0);
          this.ball.body.velocity.x =  0;
          this.ball.body.velocity.y = 0;
          this.ball.setPosition(140, getHeight(this) - 430);
          this.player.play("player-dribble", true);
          this.ball.setVisible(false);
          this.isScored = false;
          this.setHoopPosition();
        //}
      }

    }

    private drawTrajectories(): void {
        let correctionalFactor = 0.99;

        let theta = -this.ball.rotation;
        let x = 0; 
        let y = 0;

        let index = 0;
        for(let t = 0; t < this.dot_amount; t += 0.03){
            index += 1;
            x = this.BULLET_SPEED * t * Math.cos(theta) * correctionalFactor;
            y = this.BULLET_SPEED * t * Math.sin(theta) * correctionalFactor - 0.5 * this.GRAVITY * t * t;
            let bullet = this.add.image(x + this.ball.x, this.ball.y - y, "ball").setDepth(3).setScale(0.04).setVisible(false);
            this.trajectories.push(bullet);

          // console.log( `i = ${index} x: ${x + this.ball.x} y: ${this.ball.y - y}`);

           // console.log(t)
        }
    }

    private updateTrajectories(isVisible): void {
        let correctionalFactor = 0.99;

        let theta = -this.ball.rotation;
        let x = 0; 
        let y = 0;

        let index = 0;
        for(let t = 0; t < this.dot_amount; t += 0.03){
            x = this.BULLET_SPEED * t * Math.cos(theta) * correctionalFactor;
            y = this.BULLET_SPEED * t * Math.sin(theta) * correctionalFactor - 0.5 * this.GRAVITY * t * t;
            this.trajectories[index].x = x + this.ball.x;
            this.trajectories[index].y = this.ball.y - y;
            this.trajectories[index].visible = isVisible;
            index += 1;

          // console.log( `i = ${index} x: ${x + this.ball.x} y: ${this.ball.y - y}`);

           // console.log(t)
        }
    }


    private setHoopPosition(){
      let randomX = Phaser.Math.FloatBetween(getCenterX(this), getWidth(this) - 250);
      let randomY = Phaser.Math.FloatBetween(210, getHeight(this) - 500);
      this.hoop.setPosition(randomX, randomY);
    }

    private addGameOver(){

        this.dataPost();

        let container = this.add.container(getCenterX(this), getCenterY(this)).setDepth(10);
        let popup = this.add.image(0, 0, "popup");
        let title = this.add.text(0, -300, "GAME OVER", {
          fontSize: "60px",
          fontFamily: "font",
          color: "red"
        }).setOrigin(0.5);

        let score = this.add.text(0, -50, `SCORE\n${option.score}`, {
          fontSize: "90px",
          fontFamily: "font",
          color: "back",
          align: "center"
        }).setOrigin(0.5);

        let scoreFill = this.add.image(0, -7, "score-fill").setScale(1.3);

        let homebtn = this.add.image(-130, 160, "btn-home").setInteractive({cursor: "pointer"})
        .on("pointerup", ()=>{
          option.score = 0;
          option.levelNumber = 1;
          this.scene.start("MenuSceneMobile");
        })
        let replaybtn = this.add.image(130, 160, "btn-replay").setInteractive({cursor: "pointer"})
        .on("pointerup", ()=>{
          option.score = 0;
          option.levelNumber = 1;
          this.scene.start("GameSceneMobile");
        })


        container.add([popup, title, scoreFill, score, homebtn, replaybtn]);
    }

    private addSlash(){
      let slash = this.add.image(getCenterX(this), getCenterY(this), "slash").setDepth(10);
      slash.visible = true;
      this.tweens.add({
        targets: slash,
        delay: 500,
        alpha: 0,
        onComplete: ()=>{
          slash.visible = false;
          slash.alpha = 1;
        }
      })
    }


    private dataPost() {
      let newUser =
      {
          "name": option.userName,
          "score": option.score
      }


      this.exitingData.user.push(newUser);


      console.log(this.exitingData);

      $.ajax({
          type: "POST",
          url: "https://toolkitweb.xyz/toolkit/basket_leader.php",
          data: {
              data:  this.exitingData,
          },
          beforeSend: function () {
              console.log("sending");
          },
          success: function (response) {
               
              console.log(response);
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
              // You can put something here if there is an error from submitted request
              console.log("error");
          }
      });

  }


  private getData(){
      fetch('https://toolkitweb.xyz/toolkit/basket-leaderboard.json')
      .then(response => {
          if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(data => {
          // Use the JSON data here
          this.exitingData = data;
          // console.log(this.exitingData);
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
  }
}
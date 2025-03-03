import 'phaser';
import { BootScene } from './scene/boot-scene';
import { GameScene } from './scene/game-scene';
import {GameSceneMobile } from './scene/game-scene-mobile';
import { LeaderboardScene } from './scene/leaderboard';
import { MenuScene } from './scene/menu-scene';
import { MenuSceneMobile } from './scene/menu-scene-mobile';
import { option } from './utils/utils';

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

console.log(windowHeight);

if(windowWidth < windowHeight){
  option.isMobileView = true
}else{
  option.isMobileView = false
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#001625',
    parent: "game",
    width:  option.isMobileView ? 720 : 1280,
    height: option.isMobileView ? 1280 : 961,
    scale: {
      mode: Phaser.Scale.FIT,
		  autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
      createContainer: true
    },
    physics:{
      default:'arcade',
      arcade:{
          gravity:{ y: 0},
          debug: false
      }
    },  
    scene: [BootScene, GameScene, MenuScene, MenuSceneMobile, LeaderboardScene, GameSceneMobile]
};




var game = new Phaser.Game(config);

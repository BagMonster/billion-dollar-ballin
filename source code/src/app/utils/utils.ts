export let option = {
    levelNumber: 1,
    score: 0,
    userName: "",
    isMobileView: false
}


export function getCenterX(scene: Phaser.Scene): number{
    return scene.sys.canvas.width / 2;
}

export function getCenterY(scene: Phaser.Scene): number{
    return scene.sys.canvas.height / 2;
}

export function getWidth(scene: Phaser.Scene): number{
    return scene.sys.canvas.width;
}

export function getHeight(scene: Phaser.Scene): number{
    return scene.sys.canvas.height;
}

export function randomObs(){
    return `obs-${Phaser.Math.Between(1, 8)}`;
}

// export function playPopUpSound(scene: Phaser.Scene){
//     if(option.isSoundOn){
//         scene.sound.play("popup");
//     }
// }

let bgMusic;

export function addBgm(scene: Phaser.Scene){
    bgMusic = scene.sound.add("bgm", {
        loop: true,
        volume: 0.3
    });
}

export function StopBgm(){
    bgMusic.stop();
}

export function PlayBgm(){
    bgMusic.play();
}

export function formatTime(iTime){	
  iTime/=1000;
  var iMins = Math.floor(iTime/60);
  var iSecs = Math.floor(iTime-(iMins*60));
  //iSecs = parseFloat(iSecs).toFixed(1)
  
  var szRet = "";

  if ( iMins < 10 ){
          szRet += "0" + iMins + ":";
  }else{
          szRet += iMins + ":";
  }

  if ( iSecs < 10 ){
          szRet += "0" + iSecs;
  }else{
          szRet += iSecs;
  }	

  return szRet;
}

    

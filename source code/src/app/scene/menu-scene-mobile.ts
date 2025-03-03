import { getCenterX, getCenterY, getHeight, getWidth, option } from "../utils/utils";

export class MenuSceneMobile extends Phaser.Scene {

    private nameText: Phaser.GameObjects.Text;


    constructor(){
        super("MenuSceneMobile");
    }

    preload(){
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'assets/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });


        this.load.plugin('rexcheckboxplugin', 'assets/rexcheckboxplugin.min.js', true);
    }

    init(){

    }

    create(){

        let bg =this.add.image(getCenterX(this), getCenterY(this), "menu-bg").setInteractive()
        bg.displayWidth = getWidth(this);
        bg.displayHeight = getHeight(this);

        this.nameText = this.add.text(130, 390, "ENTER NAME", 
        { fontSize: "25px", fontFamily:"optima", fixedWidth: 800, fixedHeight: 70, color: "#000000", align: "center" })
        this.nameText.setOrigin(0.5, 0)

        let isFocused = false;

       // this.rexUI.edit(nameText);
    
       this.nameText.setInteractive().on('pointerdown', () => {
            if(!isFocused){
                isFocused = true;
                this.nameText.text = "";
            }
            this.nameText.y = 370;
            this.rexUI.edit(this.nameText)
        })

        bg.on("pointerdown", ()=>{
            this.nameText.y = 390;
        })
    


        this.add.image(170, 520, "border").setAngle(-90).setAlpha(0.001).setScale(0.3, 0.31).setInteractive({cursor: "pointer"})
        .on("pointerup", ()=>{  
            this.scene.start("LeaderboardScene");
        })

        this.add.image(170, 640, "border").setAngle(-90).setScale(0.3, 0.31).setAlpha(0.001).setInteractive({cursor: "pointer"})
        .on("pointerup", ()=>{
            if(this.nameText.text.length > 2 && this.nameText.text != "ENTER NAME"){
                option.userName = this.nameText.text;
                if(option.isMobileView){
                    this.scene.start("GameSceneMobile");
                }else{
                    this.scene.start("GameScene");
                }
            }
        })
        


    
        // this.input.on("pointerup", ()=>{
        //     this.scene.start("GameScene");
        // })
        

    }

    update(time: number, delta: number): void {

    }
}
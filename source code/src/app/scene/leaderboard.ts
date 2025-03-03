import { getCenterX, getCenterY } from "../utils/utils";

export class LeaderboardScene extends Phaser.Scene {

    private exitingData;

    constructor(){
        super("LeaderboardScene");
    }

    create() {

        this.add.image(getCenterX(this), getCenterY(this), `bg-${1}`); 

        this.getData();

        this.add.text(getCenterX(this), 80, "LEADER BOARD", {
            fontSize: "40px",
            fontFamily: "ARIAL"
        }).setOrigin(0.5);

        this.add.image(70, 80, "backBtn").setScale(0.1).setInteractive({cursor: "pointer"})
        .on("pointerup", ()=>{
            this.scene.start("MenuScene");
        })

        //  header
        this.add.rectangle(getCenterX(this), 167, 950, 80, 0x094a81);

      //  this.add.rectangle(getCenterX(this), 750 , 950, 850, 0xeeeeee);


        this.add.text(getCenterX(this), 155, "NAME", {
            fontSize: "30px",
            fontFamily: "optima"
        }).setOrigin(0.5);


        this.add.text(getCenterX(this) - 280, 155, "R A N K", {
            fontSize: "30px",
            fontFamily: "optima"
        }).setOrigin(0.5);

        this.add.text(getCenterX(this) + 280, 155, "S C O R E", {
            fontSize: "30px",
            fontFamily: "optima"
        }).setOrigin(0.5);



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
             console.log(data);

            // Sort the users by score in descending order
            const sortedUsers = data.user.sort((a, b) => b.score - a.score);
                    
            // Retrieve the top 2 users
            const topUsers = sortedUsers.slice(0, 11);
            
            // Output the results
            topUsers.forEach(user => {
                console.log(`Name: ${user.name}, Score: ${user.score}`);
            });

            let bgColor = 0xffffff;

            for(let i = 1 ; i <= topUsers.length; i++){
    
                this.add.rectangle(getCenterX(this), 160 + (90 * i), 950, 80, bgColor);
                // rank number
               this.add.text(getCenterX(this) - 280, 160 + (90 * i), `${i}`, {
                   fontSize: "30px",
                   fontFamily: "optima",
                   color: "black"
               }).setOrigin(0.5);
    
               // name
               this.add.text(getCenterX(this), 160 + (90 * i), `${topUsers[i - 1].name}`, {
                fontSize: "30px",
                fontFamily: "optima",
                color: "black"
                }).setOrigin(0.5);
    
                // score
               this.add.text(getCenterX(this) + 280, 160 + (90 * i), `${topUsers[i - 1].score}`, {
                fontSize: "30px",
                fontFamily: "optima",
                color: "black"
                }).setOrigin(0.5);
            }

        });
    }

    

}
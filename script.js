const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const ballImg = new Image(); ballImg.src = 'assets/sprites/ball.png';
const hoopTopImg = new Image(); hoopTopImg.src = 'assets/sprites/hoop-top.png';
const hoopBotImg = new Image(); hoopBotImg.src = 'assets/sprites/hoop-bot.png';
const bgImg = new Image(); bgImg.src = 'assets/background.png';

let ball = { x: 50, y: 300, velocity: 0, gravity: 0.5, jump: -10 };
let hoop = null;
let score = 0;
let gameRunning = false;
let walletPublicKey = null;
let timeLeft = 60;
let timerInterval = null;
let dailyHighScore = 0;
let pot = 0;

const connectButton = document.getElementById('connectWallet');
const walletStatus = document.getElementById('walletStatus');
const playButton = document.getElementById('playButton');
const restartButton = document.getElementById('restartButton');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const potDisplay = document.getElementById('pot');

// Log errors if images fail to load
ballImg.onerror = () => console.error('Failed to load assets/sprites/ball.png');
hoopTopImg.onerror = () => console.error('Failed to load assets/sprites/hoop-top.png');
hoopBotImg.onerror = () => console.error('Failed to load assets/sprites/hoop-bot.png');
bgImg.onerror = () => console.error('Failed to load assets/background.png');

connectButton.addEventListener('click', async () => {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            walletPublicKey = response.publicKey.toString();
            walletStatus.textContent = `Connected: ${walletPublicKey.slice(0, 6)}...`;
        } catch (err) {
            walletStatus.textContent = 'Connection failed!';
            console.error(err);
        }
    } else {
        walletStatus.textContent = 'Install Phantom Wallet!';
    }
});

playButton.addEventListener('click', async () => {
    if (!walletPublicKey) {
        alert('Connect your wallet first!');
        return;
    }
    await chargeFee();
});

restartButton.addEventListener('click', startGame);

async function chargeFee() {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
    const ownerPublicKey = new solanaWeb3.PublicKey('YOUR_OWNER_WALLET_PUBLIC_KEY');
    const potPublicKey = new solanaWeb3.PublicKey('YOUR_POT_WALLET_PUBLIC_KEY');

    const ownerCut = 0.00025 * solanaWeb3.LAMPORTS_PER_SOL;
    const potAmount = 0.00225 * solanaWeb3.LAMPORTS_PER_SOL;

    const ownerTx = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: new solanaWeb3.PublicKey(walletPublicKey),
            toPubkey: ownerPublicKey,
            lamports: ownerCut,
        })
    );

    const potTx = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: new solanaWeb3.PublicKey(walletPublicKey),
            toPubkey: potPublicKey,
            lamports: potAmount,
        })
    );

    try {
        const { blockhash } = await connection.getLatestBlockhash();
        ownerTx.recentBlockhash = blockhash;
        ownerTx.feePayer = new solanaWeb3.PublicKey(walletPublicKey);
        potTx.recentBlockhash = blockhash;
        potTx.feePayer = new solanaWeb3.PublicKey(walletPublicKey);

        const signedOwner = await window.solana.signTransaction(ownerTx);
        const signedPot = await window.solana.signTransaction(potTx);

        await connection.sendRawTransaction(signedOwner.serialize());
        const potSignature = await connection.sendRawTransaction(signedPot.serialize());
        await connection.confirmTransaction(potSignature);

        pot += 0.00225;
        potDisplay.textContent = `Pot: ${pot.toFixed(5)} SOL`;
        alert('Fee paid! Start ballin\'...');
        startGame();
    } catch (err) {
        console.error('Fee payment failed:', err);
        alert('Fee payment failed!');
    }
}

function startGame() {
    // Wait for all images to load
    if (!ballImg.complete || !hoopTopImg.complete || !hoopBotImg.complete || !bgImg.complete) {
        console.log('Waiting for images to load');
        setTimeout(startGame, 100);
        return;
    }

    // Reset game state
    ball.y = 300;
    ball.velocity = 0;
    hoop = { x: 400, height: 200, passed: false };
    score = 0;
    timeLeft = 60;
    gameRunning = true;
    restartButton.style.display = 'none';
    playButton.style.display = 'none';
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timeLeft}s`;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) gameOver();
    }, 1000);

    console.log('Starting game loop');
    gameLoop();
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.drawImage(bgImg, 0, 0, 400, 600);
    ball.velocity += ball.gravity;
    ball.y += ball.velocity;
    ctx.drawImage(ballImg, ball.x, ball.y, 30, 30);

    hoop.x -= 2;
    ctx.drawImage(hoopTopImg, hoop.x, 0, 50, hoop.height);
    ctx.drawImage(hoopBotImg, hoop.x, hoop.height + 150, 50, 600 - hoop.height - 150);

    if (hoop.x + 50 < ball.x && !hoop.passed) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        hoop = { x: 400, height: Math.random() * 300 + 50, passed: false };
    }

    if (ball.x + 30 > hoop.x && ball.x < hoop.x + 50 &&
        (ball.y < hoop.height || ball.y + 30 > hoop.height + 150)) {
        gameOver();
        return;
    }

    if (hoop.x < -50) hoop = { x: 400, height: Math.random() * 300 + 50, passed: false };

    if (ball.y > 600 || ball.y < 0) gameOver();

    requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameRunning = false;
    clearInterval(timerInterval);
    alert(`Game Over! Score: ${score}`);
    if (score > dailyHighScore) {
        dailyHighScore = score;
        highScoreDisplay.textContent = `Daily High: ${dailyHighScore}`;
    }
    restartButton.style.display = 'block';
    playButton.style.display = 'block';
}

document.addEventListener('keydown', () => {
    if (gameRunning) ball.velocity = ball.jump;
});

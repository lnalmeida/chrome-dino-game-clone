document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const body = document.querySelector('body');
    const gameOver = document.getElementById('game-over');
    let isJumping = false;
    let gravity = 0.9;
    let isGameOver = false;

    function moveDino(e) {
        const key = e.keyCode;
        if (key === 32) {
            if (!isJumping) {
                isJumping = true;
                jump();
            }
        }
    } 

    document.addEventListener('keyup', moveDino);

    let position = 0;
    
    function jump() {
        let count = 0;
        let upTimer = setInterval(() => {
            
            
            if (count === 10) {
                clearInterval(upTimer);
                
                let downTimer = setInterval(() => {
                    if (count === 0) {
                        clearInterval(downTimer);
                        isJumping = false;
                    }

                    position -= 7.9;
                    count --;
                    position *= gravity;
                    dino.style.bottom = position + 'px';

                },20);
        
            }

            position += 30;
            count++;
            position *= gravity;
            dino.style.bottom = position + 'px';  
            console.log(dino.style.bottom);
        }, 20); 
    }

    function createObstacles() {
        let randomTime = Math.floor(Math.random() * 4000);
        let obstaclePosition = 1000;
        const obstacle = document.createElement('div');
        if (!isGameOver) obstacle.classList.add('obstacle');
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + 'px';


        let moveObstacle = setInterval(() => {
            
            if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                clearInterval(moveObstacle);
                grid.removeChild(obstacle);
                body.removeChild(body.firstChild)
                isGameOver = true;
                
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild);
                }
                gameOver.style.display = 'block';
                gameOver.style.top = '250%';
                gameOver.style.left = '250%';
                gameOver.style.fontSize = '80px';
                gameOver.style.color = 'white';
                gameOver.style.textAlign = 'center';
                gameOver.style.fontFamily = '"Press Start 2P", cursive';
                gameOver.style.fontWeight = 'bold';
                gameOver.style.textShadow = '2px 2px black';

                gameOver.innerHTML = 'Game Over';
            }
            
            
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }, 20);

        if (!isGameOver) setTimeout(createObstacles, randomTime);

    }

    createObstacles();




});

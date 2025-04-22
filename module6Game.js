//Created by Emma Lancaster
//import all files
import * as THREE from 'three';
import PlayerSpinningTop from "./module6PlayerSpinningTop";
import SpinPad from "./module6PlayerSpinPad";
import Goal from "./module6Goal";
import Wall from "./module6Wall";
import Ball from "./module6Ball";

//Create a Three.js scene object
const scene = new THREE.Scene();

//load an external image and apply it as a texture to MeshBasicMaterial
const roomWall = new THREE.TextureLoader().load("module6Images\\BedroomWall.png");
scene.background = roomWall;

//Setup a PerspectiveCamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 15, 0);
camera.rotateX(Math.PI*(3/2));

//Create a WebGLRenderer with antialiasing enabled and canvas size: window's inner width and height
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Create a DirectionalLight and set values
const dirLight = new THREE.DirectionalLight(0xaaaaaa);
dirLight.position.set(5, 12, 8);
dirLight.castShadow = true;
dirLight.intensity = 1;
scene.add(dirLight);
//create a slight AmbientLight
scene.add(new THREE.AmbientLight(0xffffff));

//Create resize function to update the camera's aspect ratio and renderer's canvas size
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//Link resize function to window resizing
window.addEventListener('resize', onWindowResize, false);

//create the ground plane
const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x22ffff });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.position.set(0, -1, 0);
groundMesh.rotation.set(Math.PI / -2, 0, 0);
scene.add(groundMesh);

//create top with the PlayerSpinningTop class and add it to the scene
var top = new PlayerSpinningTop(new THREE.Vector3(0, -0.5, 4));
scene.add(top.cylinder);

//create start spin pad with the SpinPad class and add it to the scene
var startPad = new SpinPad(new THREE.Vector3(0, -1, 4));
scene.add(startPad.spinPad);

//create the maze goal with the Goal class and add all pieces to the scene
var goal = new Goal(new THREE.Vector3(0, 0, -4));
scene.add(goal.goalPost1);
scene.add(goal.goalPost2);
scene.add(goal.goalTop);

//create the materials for the walls and the array to hold them
const material1 = new THREE.MeshStandardMaterial({ color: 0xffff22 });
const material2 = new THREE.MeshStandardMaterial({ color: 0x00cc00 });
const material3 = new THREE.MeshStandardMaterial({ color: 0xffa522 });
var walls = [];
//create the walls of the Easy maze using the Wall class and add them to the array
walls[0] = new Wall(new THREE.Vector3(0, -0.5, 5), false, 1, material1, "");
walls[1] = new Wall(new THREE.Vector3(-1, -0.5, 4.5), true, 2, material2, "");
walls[2] = new Wall(new THREE.Vector3(-2, -0.5, 4), true, 3, material3, "Up");
walls[3] = new Wall(new THREE.Vector3(-3, -0.5, 4), false, 1, material1, "");
walls[4] = new Wall(new THREE.Vector3(-4, -0.5, 3.5), true, 2, material2, "");
walls[5] = new Wall(new THREE.Vector3(-4, -0.5, 2), true, 3, material3, "Right");
walls[6] = new Wall(new THREE.Vector3(-4, -0.5, 1), false, 1, material1, "");
walls[7] = new Wall(new THREE.Vector3(-4, -0.5, -0.5), true, 2, material2, "");
walls[8] = new Wall(new THREE.Vector3(-4, -0.5, -2), true, 3, material3, "Right");
walls[9] = new Wall(new THREE.Vector3(-4, -0.5, -3), false, 1, material1, "");
walls[10] = new Wall(new THREE.Vector3(-3, -0.5, -4), false, 2, material2, "");
walls[11] = new Wall(new THREE.Vector3(2.5, -0.5, -4), false, 3, material3, "");
walls[12] = new Wall(new THREE.Vector3(3.5, -0.5, -4), false, 1, material1, "");
walls[13] = new Wall(new THREE.Vector3(4, -0.5, -2.5), true, 2, material2, "");
walls[14] = new Wall(new THREE.Vector3(4, -0.5, -1), true, 3, material3, "Left");
walls[15] = new Wall(new THREE.Vector3(4, -0.5, 0), false, 1, material1, "");
walls[16] = new Wall(new THREE.Vector3(4, -0.5, 1.5), true, 2, material2, "");
walls[17] = new Wall(new THREE.Vector3(4, -0.5, 3), true, 3, material3, "Left");
walls[18] = new Wall(new THREE.Vector3(4, -0.5, 4), false, 1, material1, "");
walls[19] = new Wall(new THREE.Vector3(2.5, -0.5, 4), false, 2, material2, "");
walls[20] = new Wall(new THREE.Vector3(1, -0.5, 4), true, 3, material3, "Up");
walls[21] = new Wall(new THREE.Vector3(1, -0.5, 5), false, 1, material1, "");
walls[22] = new Wall(new THREE.Vector3(-1, -0.5, 2.5), true, 2, material2, "");
walls[23] = new Wall(new THREE.Vector3(0.5, -0.5, 1), false, 2, material2, "");
walls[24] = new Wall(new THREE.Vector3(1, -0.5, -2), true, 2, material2, "");
//add the walls to the scene
for (let i = 0; i < walls.length; i++) {
    scene.add(walls[i].wall);
}

//create the ball for the Easy maze and add it to the balls array and the scene
var balls = [];
balls[0] = new Ball(new THREE.Vector3(2.5, -0.5, 0));
for (let i = 0; i < balls.length; i++) {
    scene.add(balls[i].sphere);
}

//create variables to save whether the game is running, whether the game is over, whether the game was won, the best score, the start time of the game, and the maze type
var gameGoing = false;
var gameOver = true;
var gameWon = false;
var maxScore = 1000000000000000;
var startTime = new Date();
var mazeId = 1;

//add onclick events to the start and reset buttons
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("resetButton").addEventListener("click", resetMaze);


//add keydown event to move the selected sprite by keyboard
addEventListener("keydown", (event) => {
    if (gameGoing == true) {
        //check for the up, left, down, and right keys being pressed
        const eventKey = event.key;
        if (eventKey == "ArrowLeft" || eventKey == "ArrowRight" || eventKey == "ArrowUp" || eventKey == "ArrowDown") {
            //move the top in the correct direction
            top.moveTop(eventKey);
            top.moveTop(eventKey);
        }
    }
})
addEventListener("keyup", (event) => {})

//Start the render loop
render();

//Create a render loop
function render() {
    requestAnimationFrame(render);

    //if the top has stopped spinning, end the game
    if (top.speed <= 0) {
        gameGoing = false;
        gameOver = true;
        gameWon = false;
    }

    //check if the game is being played
    if (gameGoing == true) {
        //update the top speed
        top.changeSpeed();
    
        //update bounding boxes and spheres
        top.cylinderBB.copy(top.cylinder.geometry.boundingBox).applyMatrix4(top.cylinder.matrixWorld);
        startPad.spinPadBB.copy(startPad.spinPad.geometry.boundingBox).applyMatrix4(startPad.spinPad.matrixWorld);
        goal.goalPost1BB.copy(goal.goalPost1.geometry.boundingBox).applyMatrix4(goal.goalPost1.matrixWorld);
        goal.goalPost2BB.copy(goal.goalPost2.geometry.boundingBox).applyMatrix4(goal.goalPost2.matrixWorld);
        goal.goalTopBB.copy(goal.goalTop.geometry.boundingBox).applyMatrix4(goal.goalTop.matrixWorld);
        for (let i = 0; i < walls.length; i++) {
            walls[i].wallBB.copy(walls[i].wall.geometry.boundingBox).applyMatrix4(walls[i].wall.matrixWorld);
        }
        for (let i = 0; i < balls.length; i++) {
            balls[i].sphereBB.position = balls[i].sphere.position;
        }
    
        //check if any collisions have occurred in the maze
        checkCollision();
    }
    else {
        //if there is no current game, display instructions and start button
        document.getElementById("instructions").style.visibility = "visible";
    }

    //update the score and speed displayed
    if (gameGoing == false && gameWon == true && gameOver == false) {
        //if the game has finished and was won update the score
        var newScore = (new Date()) - startTime;
        //if there is a new high score update the top score and display a message that there is a new top score
        if (newScore < maxScore) {
            document.getElementById("topScore").innerHTML = "Top Score: " + newScore;
            maxScore = newScore;
            document.getElementById("scoreMessage").innerHTML = "New Top Score!";
            setTimeout(() => {
                document.getElementById("scoreMessage").innerHTML = "";
            }, 3000);
        }
        document.getElementById("score").innerHTML = "Score: " + newScore;
        gameOver = true;
    }
    else if (maxScore == 1000000000000000) {
        //if a new game has started, reset the top score and score
        document.getElementById("topScore").innerHTML = "Top Score: ";
        document.getElementById("score").innerHTML = "Score: ";
    }
    document.getElementById("speed").innerHTML = "Speed: " + Math.round(top.speed * 100);
    
    //Render the scene with the camera
    renderer.render(scene, camera);
}

//create a function to start a new game
function startGame() {
    //hide the instructions and start buttons
    document.getElementById("instructions").style.visibility = "hidden";

    //check if the maze only needs to be reset
    if ((mazeId == 1 && document.getElementById("mazes").value == "Easy") || (mazeId == 2 && document.getElementById("mazes").value == "Hard")) {
        resetMaze();
    }
    else if (document.getElementById("mazes").value == "Easy") {
        //remove the previous maze to create the Easy maze
        mazeId = 1;
        scene.remove(top.cylinder);
        scene.remove(startPad.spinPad);
        scene.remove(goal.goalPost1);
        scene.remove(goal.goalPost2);
        scene.remove(goal.goalTop);
        for (let i = 0; i < walls.length; i++) {
            scene.remove(walls[i].wall);
        }
        for (let i = 0; i < balls.length; i++) {
            scene.remove(balls[i].sphere);
        }

        //create the Easy maze
        //create the top, start spin pad, and goal
        top = new PlayerSpinningTop(new THREE.Vector3(0, -0.5, 4));
        scene.add(top.cylinder);
        startPad = new SpinPad(new THREE.Vector3(0, -1, 4));
        scene.add(startPad.spinPad);
        goal = new Goal(new THREE.Vector3(0, 0, -4));
        scene.add(goal.goalPost1);
        scene.add(goal.goalPost2);
        scene.add(goal.goalTop);
        //create the walls of the Easy maze
        walls = [];
        walls[0] = new Wall(new THREE.Vector3(0, -0.5, 5), false, 1, material1, "");
        walls[1] = new Wall(new THREE.Vector3(-1, -0.5, 4.5), true, 2, material2, "");
        walls[2] = new Wall(new THREE.Vector3(-2, -0.5, 4), true, 3, material3, "Up");
        walls[3] = new Wall(new THREE.Vector3(-3, -0.5, 4), false, 1, material1, "");
        walls[4] = new Wall(new THREE.Vector3(-4, -0.5, 3.5), true, 2, material2, "");
        walls[5] = new Wall(new THREE.Vector3(-4, -0.5, 2), true, 3, material3, "Right");
        walls[6] = new Wall(new THREE.Vector3(-4, -0.5, 1), false, 1, material1, "");
        walls[7] = new Wall(new THREE.Vector3(-4, -0.5, -0.5), true, 2, material2, "");
        walls[8] = new Wall(new THREE.Vector3(-4, -0.5, -2), true, 3, material3, "Right");
        walls[9] = new Wall(new THREE.Vector3(-4, -0.5, -3), false, 1, material1, "");
        walls[10] = new Wall(new THREE.Vector3(-3, -0.5, -4), false, 2, material2, "");
        walls[11] = new Wall(new THREE.Vector3(2.5, -0.5, -4), false, 3, material3, "");
        walls[12] = new Wall(new THREE.Vector3(3.5, -0.5, -4), false, 1, material1, "");
        walls[13] = new Wall(new THREE.Vector3(4, -0.5, -2.5), true, 2, material2, "");
        walls[14] = new Wall(new THREE.Vector3(4, -0.5, -1), true, 3, material3, "Left");
        walls[15] = new Wall(new THREE.Vector3(4, -0.5, 0), false, 1, material1, "");
        walls[16] = new Wall(new THREE.Vector3(4, -0.5, 1.5), true, 2, material2, "");
        walls[17] = new Wall(new THREE.Vector3(4, -0.5, 3), true, 3, material3, "Left");
        walls[18] = new Wall(new THREE.Vector3(4, -0.5, 4), false, 1, material1, "");
        walls[19] = new Wall(new THREE.Vector3(2.5, -0.5, 4), false, 2, material2, "");
        walls[20] = new Wall(new THREE.Vector3(1, -0.5, 4), true, 3, material3, "Up");
        walls[21] = new Wall(new THREE.Vector3(1, -0.5, 5), false, 1, material1, "");
        walls[22] = new Wall(new THREE.Vector3(-1, -0.5, 2.5), true, 2, material2, "");
        walls[23] = new Wall(new THREE.Vector3(0.5, -0.5, 1), false, 2, material2, "");
        walls[24] = new Wall(new THREE.Vector3(1, -0.5, -2), true, 2, material2, "");
        for (let i = 0; i < walls.length; i++) {
            scene.add(walls[i].wall);
        }

        //create the ball of the Easy maze
        balls = [];
        balls[0] = new Ball(new THREE.Vector3(2.5, -0.5, 0));
        for (let i = 0; i < balls.length; i++) {
            scene.add(balls[i].sphere);
        }

        //set all tracking values for game status to default for a new maze
        gameGoing = true;
        gameOver = false;
        gameWon = false;
        maxScore = 1000000000000000;
        startTime = new Date();
    }
    else if (document.getElementById("mazes").value == "Hard") {
        //clear the maze before creating the Hard maze
        mazeId = 2;
        scene.remove(top.cylinder);
        scene.remove(startPad.spinPad);
        scene.remove(goal.goalPost1);
        scene.remove(goal.goalPost2);
        scene.remove(goal.goalTop);
        for (let i = 0; i < walls.length; i++) {
            scene.remove(walls[i].wall);
        }
        for (let i = 0; i < balls.length; i++) {
            scene.remove(balls[i].sphere);
        }

        //create the Hard maze
        //create the top, start spin pad, and goal
        top = new PlayerSpinningTop(new THREE.Vector3(0, -0.5, 8));
        scene.add(top.cylinder);
        startPad = new SpinPad(new THREE.Vector3(0, -1, 8));
        scene.add(startPad.spinPad);
        goal = new Goal(new THREE.Vector3(0, 0, -8));
        scene.add(goal.goalPost1);
        scene.add(goal.goalPost2);
        scene.add(goal.goalTop);

        //create the walls of the Hard maze
        walls = [];
        walls[0] = new Wall(new THREE.Vector3(0, -0.5, 9), false, 1, material1, "");
        walls[1] = new Wall(new THREE.Vector3(-1.5, -0.5, 8), false, 2, material2, "");
        walls[2] = new Wall(new THREE.Vector3(1.5, -0.5, 8), false, 2, material2, "");
        walls[3] = new Wall(new THREE.Vector3(-3.5, -0.5, 8), false, 2, material2, "");
        walls[4] = new Wall(new THREE.Vector3(3.5, -0.5, 8), false, 2, material2, "");
        walls[5] = new Wall(new THREE.Vector3(-5.5, -0.5, 8), false, 2, material2, "");
        walls[6] = new Wall(new THREE.Vector3(5.5, -0.5, 8), false, 2, material2, "");
        walls[7] = new Wall(new THREE.Vector3(-7.5, -0.5, 8), false, 2, material2, "");
        walls[8] = new Wall(new THREE.Vector3(7.5, -0.5, 8), false, 2, material2, "");
        walls[9] = new Wall(new THREE.Vector3(-9.5, -0.5, 8), false, 2, material2, "");
        walls[10] = new Wall(new THREE.Vector3(9.5, -0.5, 8), false, 2, material2, "");
        walls[11] = new Wall(new THREE.Vector3(-10, -0.5, 6.5), true, 2, material2, "");
        walls[12] = new Wall(new THREE.Vector3(10, -0.5, 6.5), true, 2, material2, "");
        walls[13] = new Wall(new THREE.Vector3(-10, -0.5, 4.5), true, 2, material2, "");
        walls[14] = new Wall(new THREE.Vector3(10, -0.5, 4.5), true, 2, material2, "");
        walls[15] = new Wall(new THREE.Vector3(-10, -0.5, 2.5), true, 2, material2, "");
        walls[16] = new Wall(new THREE.Vector3(10, -0.5, 2.5), true, 2, material2, "");
        walls[17] = new Wall(new THREE.Vector3(-10, -0.5, 0.5), true, 2, material2, "");
        walls[18] = new Wall(new THREE.Vector3(10, -0.5, 0.5), true, 2, material2, "");
        walls[19] = new Wall(new THREE.Vector3(-10, -0.5, -1.5), true, 2, material2, "");
        walls[20] = new Wall(new THREE.Vector3(10, -0.5, -1.5), true, 2, material2, "");
        walls[21] = new Wall(new THREE.Vector3(-10, -0.5, -3.5), true, 2, material2, "");
        walls[22] = new Wall(new THREE.Vector3(10, -0.5, -3.5), true, 2, material2, "");
        walls[23] = new Wall(new THREE.Vector3(-10, -0.5, -5.5), true, 2, material2, "");
        walls[24] = new Wall(new THREE.Vector3(10, -0.5, -5.5), true, 2, material2, "");
        walls[25] = new Wall(new THREE.Vector3(-10, -0.5, -7), true, 1, material1, "");
        walls[26] = new Wall(new THREE.Vector3(10, -0.5, -7), true, 1, material1, "");
        walls[27] = new Wall(new THREE.Vector3(-3, -0.5, -8), false, 2, material2, "");
        walls[28] = new Wall(new THREE.Vector3(3, -0.5, -8), false, 2, material2, "");
        walls[29] = new Wall(new THREE.Vector3(-5, -0.5, -8), false, 2, material2, "");
        walls[30] = new Wall(new THREE.Vector3(5, -0.5, -8), false, 2, material2, "");
        walls[31] = new Wall(new THREE.Vector3(-7, -0.5, -8), false, 2, material2, "");
        walls[32] = new Wall(new THREE.Vector3(7, -0.5, -8), false, 2, material2, "");
        walls[33] = new Wall(new THREE.Vector3(-9, -0.5, -8), false, 2, material2, "");
        walls[34] = new Wall(new THREE.Vector3(9, -0.5, -8), false, 2, material2, "");
        walls[35] = new Wall(new THREE.Vector3(1.5, -0.5, 6.5), true, 2, material1, "");
        walls[36] = new Wall(new THREE.Vector3(0, -0.5, 5.5), false, 2, material2, "");
        walls[37] = new Wall(new THREE.Vector3(-2, -0.5, 5.5), false, 2, material3, "");
        walls[38] = new Wall(new THREE.Vector3(-4, -0.5, 5.5), false, 2, material1, "");
        walls[39] = new Wall(new THREE.Vector3(-7.5, -0.5, 5.5), false, 2, material2, "");
        walls[40] = new Wall(new THREE.Vector3(-7, -0.5, 4), true, 2, material3, "");
        walls[41] = new Wall(new THREE.Vector3(-7, -0.5, 2), true, 2, material1, "");
        walls[42] = new Wall(new THREE.Vector3(-7, -0.5, 0), true, 2, material2, "");
        walls[43] = new Wall(new THREE.Vector3(-7, -0.5, -2), true, 2, material3, "");
        walls[44] = new Wall(new THREE.Vector3(-7, -0.5, -4), true, 2, material1, "");
        walls[45] = new Wall(new THREE.Vector3(-4.5, -0.5, -6), true, 2, material2, "");
        walls[46] = new Wall(new THREE.Vector3(-3, -0.5, -5), false, 2, material3, "");
        walls[47] = new Wall(new THREE.Vector3(-1, -0.5, -5), false, 2, material1, "");
        walls[48] = new Wall(new THREE.Vector3(0.5, -0.5, -3.5), true, 2, material2, "");
        walls[49] = new Wall(new THREE.Vector3(0.5, -0.5, -1.5), true, 2, material3, "");
        walls[50] = new Wall(new THREE.Vector3(0.5, -0.5, 0.5), true, 2, material1, "");
        walls[51] = new Wall(new THREE.Vector3(0.5, -0.5, 2.5), true, 2, material2, "");
        walls[52] = new Wall(new THREE.Vector3(-2, -0.5, 4), true, 2, material3, "");
        walls[53] = new Wall(new THREE.Vector3(-4.5, -0.5, 4), true, 2, material1, "");
        walls[54] = new Wall(new THREE.Vector3(-2.5, -0.5, 2.5), false, 2, material2, "");
        walls[55] = new Wall(new THREE.Vector3(-2, -0.5, -0.5), true, 2, material3, "");
        walls[56] = new Wall(new THREE.Vector3(-5, -0.5, 0), false, 2, material1, "");
        walls[57] = new Wall(new THREE.Vector3(2, -0.5, 3), false, 2, material2, "");
        walls[58] = new Wall(new THREE.Vector3(5.5, -0.5, 3), false, 2, material3, "");
        walls[59] = new Wall(new THREE.Vector3(7.5, -0.5, 3), false, 2, material1, "");
        walls[60] = new Wall(new THREE.Vector3(2, -0.5, 0.5), false, 2, material2, "");
        walls[61] = new Wall(new THREE.Vector3(4, -0.5, 0.5), false, 2, material3, "");
        walls[62] = new Wall(new THREE.Vector3(6, -0.5, 0.5), false, 2, material1, "");
        walls[63] = new Wall(new THREE.Vector3(8.5, -0.5, -2), false, 2, material2, "");
        walls[64] = new Wall(new THREE.Vector3(6.5, -0.5, -2), false, 2, material3, "");
        walls[65] = new Wall(new THREE.Vector3(4.5, -0.5, -2), false, 2, material1, "");
        walls[66] = new Wall(new THREE.Vector3(3, -0.5, -4.5), false, 2, material2, "");
        walls[67] = new Wall(new THREE.Vector3(5, -0.5, -4.5), false, 2, material3, "");
        walls[68] = new Wall(new THREE.Vector3(-8, -0.5, -7), true, 3, material1, "Up");
        walls[69] = new Wall(new THREE.Vector3(6.5, -0.5, 5.5), true, 3, material2, "Down");
        walls[70] = new Wall(new THREE.Vector3(9, -0.5, -6), true, 3, material3, "Right");
        for (let i = 0; i < walls.length; i++) {
            scene.add(walls[i].wall);
        }

        //create the balls of the Hard maze
        balls = [];
        balls[0] = new Ball(new THREE.Vector3(-5, -0.5, 6.7));
        balls[1] = new Ball(new THREE.Vector3(-3, -0.5, 1.2));
        balls[2] = new Ball(new THREE.Vector3(6, -0.5, 1.7));
        for (let i = 0; i < balls.length; i++) {
            scene.add(balls[i].sphere);
        }

        //set all tracking values for game status to default for a new maze
        gameGoing = true;
        gameOver = false;
        gameWon = false;
        maxScore = 1000000000000000;
        startTime = new Date();
    }
}

//create a function to reset the maze by reseting the locations of the top and the balls in the maze, as well as game status
function resetMaze() {
    //hide the instructions and start buttons
    document.getElementById("instructions").style.visibility = "hidden";

    top.resetTop();
    for(let i = 0; i < balls.length; i++) {
        balls[i].resetBall();
    }
    gameGoing = true;
    gameOver = false;
    gameWon = false;
    startTime = new Date();
}

//create a function to check if the top has collided with anything
function checkCollision() {
    //assume nothing has been collided with
    top.canGoDown = true;
    top.canGoUp = true;
    top.canGoLeft = true;
    top.canGoRight = true;
    //if a goal post has been collided with, do not allow further movement in that direction
    if (top.cylinderBB.intersectsBox(goal.goalPost1BB)) {
        top.canGoUp = false;
    }
    if (top.cylinderBB.intersectsBox(goal.goalPost2BB)) {
        top.canGoUp = false;
    }
    //if the top is within the goal, end the game and save it as won
    if (Math.abs(top.cylinder.position.x - goal.goalTop.position.x) < 1 && Math.abs(top.cylinder.position.z - goal.goalTop.position.z) < 0.5) {
        gameGoing = false;
        gameWon = true;
    }
    //check if any walls have been collided
    for (let i = 0; i < walls.length; i++) {
        // if a wall has been collided with and the top is off the start pad, do not allow further movement toward the wall
        if (top.cylinderBB.intersectsBox(walls[i].wallBB) && !top.cylinderBB.intersectsBox(startPad.spinPadBB)) {
            let xDif = Math.abs(top.cylinder.position.x - walls[i].wall.position.x);
            let yDif = Math.abs(top.cylinder.position.y - walls[i].wall.position.y);
            let zDif = Math.abs(top.cylinder.position.z - walls[i].wall.position.z);
            if (xDif > yDif && xDif > zDif) {
                if (top.cylinder.position.x > walls[i].wall.position.x) {
                    top.canGoLeft = false;
                }
                else {
                    top.canGoRight = false;
                }
            }
            else {
                if (top.cylinder.position.z > walls[i].wall.position.z) {
                    top.canGoUp = false;
                }
                else {
                    top.canGoDown = false;
                }
            }
        }
    }
    //check if any balls have been collided with
    for (let i = 0; i < balls.length; i++) {
        //if a ball has been collided with, check if anyballs have collided with walls
        if (top.cylinderBB.intersectsSphere(balls[i].sphereBB)) {
            for (let j = 0; j < walls.length; j++) {
                // if a wall has been collided with and the top is off the start pad, do not allow further movement toward the wall
                if (balls[i].sphereBB.intersectsBox(walls[j].wallBB)) {
                    let xDif = Math.abs(balls[i].sphere.position.x - walls[j].wall.position.x);
                    let yDif = Math.abs(balls[i].sphere.position.y - walls[j].wall.position.y);
                    let zDif = Math.abs(balls[i].sphere.position.z - walls[j].wall.position.z);
                    if (xDif > yDif && xDif > zDif) {
                        if (balls[i].sphere.position.x > walls[j].wall.position.x) {
                            balls[i].canGoLeft = false;
                            top.canGoLeft = false;
                        }
                        else {
                            balls[i].canGoRight = false;
                            top.canGoRight = false;
                        }
                    }
                    else {
                        if (balls[i].sphere.position.z > walls[j].wall.position.z) {
                            balls[i].canGoUp = false;
                            top.canGoUp = false;
                        }
                        else {
                            balls[i].canGoDown = false;
                            top.canGoDown = false;
                        }
                    }
                }
            }
            //check which direction the ball should be rolled in
            let xDif = Math.abs(top.cylinder.position.x - balls[i].sphere.position.x);
            let yDif = Math.abs(top.cylinder.position.y - balls[i].sphere.position.y);
            let zDif = Math.abs(top.cylinder.position.z - balls[i].sphere.position.z);
            //if allowed, move the ball in the correct direction and slow the top
            if (xDif > yDif && xDif > zDif) {
                if (top.cylinder.position.x > balls[i].sphere.position.x) {
                    balls[i].rollBall("ArrowLeft");
                    top.changeSpeed(false);
                }
                else {
                    balls[i].rollBall("ArrowRight");
                    top.changeSpeed(false);
                }
            }
            else {
                if (top.cylinder.position.z > balls[i].sphere.position.z) {
                    balls[i].rollBall("ArrowUp");
                    top.changeSpeed(false);
                }
                else {
                    balls[i].rollBall("ArrowDown");
                    top.changeSpeed(false);
                }
            }
        }
    }
}
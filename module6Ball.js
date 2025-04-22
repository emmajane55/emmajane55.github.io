//Created by Emma Lancaster
//import Three.js
import * as THREE from 'three';

//create the Ball class
class Ball {
    constructor(position) {
        //initialize the ball variables using the passed value and defaults
        this.position = position;
        this.startPosition = new THREE.Vector3(position.x, position.y, position.z);
        this.canGoLeft = true;
        this.canGoRight = true;
        this.canGoUp = true;
        this.canGoDown = true;
        //create a ball using sphere geometry and the color purple
        const material = new THREE.MeshStandardMaterial({ color: 0xff22ff });
        const geometry = new THREE.SphereGeometry(0.7);
        this.sphere = new THREE.Mesh(geometry, material);
        //create a bounding sphere for the ball
        this.sphere.position.set(this.position.x, this.position.y, this.position.z);
        this.sphereBB = new THREE.Sphere(this.sphere.position, 0.7);
    }

    //create a function to reset the location of the ball using the saved initial position
    resetBall() {
        this.position.x = this.startPosition.x;
        this.position.y = this.startPosition.y;
        this.position.z = this.startPosition.z;
        this.sphere.position.set(this.position.x, this.position.y, this.position.z);
    }

    //create a function to roll the ball in the passed in direction if allowed
    rollBall(direction) {
        if (direction == "ArrowLeft" && this.canGoLeft) {
            this.position.x = this.position.x - 0.1;
            this.sphere.position.setX(this.position.x);
        }
        else if (direction == "ArrowRight" && this.canGoRight) {
            this.position.x = this.position.x + 0.1;
            this.sphere.position.setX(this.position.x);
        }
        else if (direction == "ArrowUp" && this.canGoUp) {
            this.position.z = this.position.z - 0.1;
            this.sphere.position.setZ(this.position.z);
        }
        else if (direction == "ArrowDown" && this.canGoDown) {
            this.position.z = this.position.z + 0.1;
            this.sphere.position.setZ(this.position.z);
        }
    }
}

//export the Ball class
export default Ball;
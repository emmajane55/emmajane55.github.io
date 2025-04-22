//Created by Emma Lancaster
//import Three.js
import * as THREE from 'three';

//create the PlayerSpinningTop class
class PlayerSpinningTop {
    constructor(position) {
        //initialize the needed variables to store the passed position and set the speed and directions for the top
        this.position = position;
        this.firstPosition = new THREE.Vector3(position.x, position.y, position.z);
        this.speed = 1;
        this.canGoLeft = false;
        this.canGoRight = false;
        this.canGoUp = true;
        this.canGoDown = false;
        //create the top using cylinder geometry and a blue color and set the position
        const material = new THREE.MeshStandardMaterial({ color: 0x2222ff });
        const geometry = new THREE.CylinderGeometry(0.5, 0, 1);
        this.cylinder = new THREE.Mesh(geometry, material);
        this.cylinder.position.set(this.position.x, this.position.y, this.position.z);
        //create a bounding box for the top
        this.cylinderBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.cylinderBB.setFromObject(this.cylinder);
    }

    //create a function to move the top in the passed direction if allowed
    moveTop(direction) {
        if (direction == "ArrowLeft" && this.canGoLeft) {
            this.position.x = this.position.x - 0.1;
            this.cylinder.position.setX(this.position.x);
        }
        else if (direction == "ArrowRight" && this.canGoRight) {
            this.position.x = this.position.x + 0.1;
            this.cylinder.position.setX(this.position.x);
        }
        else if (direction == "ArrowUp" && this.canGoUp) {
            this.position.z = this.position.z - 0.1;
            this.cylinder.position.setZ(this.position.z);
        }
        else if (direction == "ArrowDown" && this.canGoDown) {
            this.position.z = this.position.z + 0.1;
            this.cylinder.position.setZ(this.position.z);
        }
    }

    //create a function to change the speed of the top and spin it, checking if the speed is decreasing or reseting
    changeSpeed(reset) {
        const worldAxis = new THREE.Vector3(0, 1, 0);
        //if reseting, reset the speed and rotate the top
        if (reset == true) {
            this.speed = 1;
            this.cylinder.rotateY(Math.PI/this.speed);
        }
        else {
            //otherwise decrease speed and rotate the top if it is not below zero
            if (this.speed > 0) {
                this.speed -= 0.0001;
                this.cylinder.rotateOnWorldAxis(worldAxis, Math.PI/(2/this.speed));
                this.cylinder.rotateX(Math.PI/20000);
            }
        }
    }

    resetTop() {
        //reset top
        this.changeSpeed(true);
        this.position.x = this.firstPosition.x;
        this.position.y = this.firstPosition.y;
        this.position.z = this.firstPosition.z;
        this.cylinder.position.set(this.firstPosition.x, this.firstPosition.y, this.firstPosition.z);
    }
}

//export the class
export default PlayerSpinningTop;
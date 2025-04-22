//Created by Emma Lancaster
//import Three.js
import * as THREE from 'three';

//create the SpinPad class
class SpinPad {
    constructor(position) {
        //initialize the spin pad with the matching image as the material, a box geometry, and the passed position
        this.position = position;
        const spinImg = new THREE.TextureLoader().load("module6Images\\SpinPad.png");
        const material = new THREE.MeshStandardMaterial({ map: spinImg });
        const geometry = new THREE.BoxGeometry(1, 0.1, 1);
        this.spinPad = new THREE.Mesh(geometry, material);
        this.spinPad.position.set(this.position.x, this.position.y, this.position.z);
        //create a bounding box for the spin pad
        this.spinPadBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.spinPadBB.setFromObject(this.spinPad);
    }
}

//export the class
export default SpinPad;
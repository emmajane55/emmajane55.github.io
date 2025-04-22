//Created by Emma Lancaster
//import Three.js
import * as THREE from 'three';

//create the Goal class
class Goal {
    constructor(position) {
        //initialize the values for the position, the material for the goals, and the geometries needed to make the goal arch
        this.position = position;
        const material = new THREE.MeshStandardMaterial({ color: 0xff2222});
        const geometry = new THREE.BoxGeometry(1, 2, 1);
        const archGeometry = new THREE.TorusGeometry(1.5, 0.5, 12, 48, Math.PI);
        //create the goal posts and arch that make up the goal and set their positions
        this.goalPost1 = new THREE.Mesh(geometry, material);
        this.goalPost1.position.set(this.position.x-1.5, this.position.y, this.position.z);
        this.goalPost2 = new THREE.Mesh(geometry, material);
        this.goalPost2.position.set(this.position.x+1.5, this.position.y, this.position.z);
        this.goalTop = new THREE.Mesh(archGeometry, material);
        this.goalTop.position.set(this.position.x, this.position.y+1, this.position.z);
        //create bounding boxes for the parts of the goal
        this.goalPost1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.goalPost1BB.setFromObject(this.goalPost1);
        this.goalPost2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.goalPost2BB.setFromObject(this.goalPost2);
        this.goalTopBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.goalTopBB.setFromObject(this.goalTop);
    }
}

//export the Goal class
export default Goal;
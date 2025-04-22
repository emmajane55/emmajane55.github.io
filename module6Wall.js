//Created by Emma Lancaster
//import Three.js
import * as THREE from 'three';

//create the Wall class
class Wall {
    constructor(position, rotate, wallType, color, rotateDirection) {
        //initialize the position, wallType, and color of the wall based on passed values
        this.position = position;
        this.wallType = wallType;
        this.color = color;

        //check what the wall type is
        if (wallType == 1) {
            //create a wall using box geometry and the passed values
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            this.wall = new THREE.Mesh(geometry, color);
            this.wall.position.set(this.position.x, this.position.y, this.position.z);
            //create a bounding box for the wall
            this.wallBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
            this.wallBB.setFromObject(this.wall);
        }
        else if (wallType == 2) {
            //create a rectangle wall using box geometry and the passed values
            const geometry = new THREE.BoxGeometry(2, 1, 1);
            this.wall = new THREE.Mesh(geometry, color);
            this.wall.position.set(this.position.x, this.position.y, this.position.z);
            if (rotate == true) {
                this.wall.rotateY(Math.PI/2);
            }
            //create a bounding box for the wall
            this.wallBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
            this.wallBB.setFromObject(this.wall);
        }
        else if (wallType == 3) {
            //create a triangle wall using polyhedron geometry and the passed values
            const vertices = [
                -1,-1,  -1,
                 1,-1,  -1,
                 1,-0.9,-1,
                -1,-0.9,-1,
                -1,-1,   1,
                 1,-1,   1,
                 1, 1,   1,
                -1, 1,   1,
            ];
            const indices = [
                2,1,0,
                0,3,2,
                0,4,7,
                7,3,0,
                0,1,5,
                5,4,0,
                1,2,6,
                6,5,1,
                2,3,7,
                7,6,2,
                4,5,6,
                6,7,4
            ];
            const geometry = new THREE.PolyhedronGeometry(vertices, indices, 0.87, 0);
            this.wall = new THREE.Mesh(geometry, color);
            this.wall.position.set(this.position.x, this.position.y, this.position.z);
            if (rotate == true) {
                if (rotateDirection == "Left") {
                    this.wall.rotateY(Math.PI*3/2);
                }
                else if (rotateDirection == "Right") {
                    this.wall.rotateY(Math.PI/2);
                }
                else if (rotateDirection == "Up") {
                    this.wall.rotateY(Math.PI);
                }
            }
            //create a bounding box for the wall
            this.wallBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
            this.wallBB.setFromObject(this.wall);
        }
    }
}

//export the Wall class
export default Wall;
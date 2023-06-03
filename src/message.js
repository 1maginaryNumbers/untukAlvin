
import * as THREE from 'three'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js'

let keyboard = []
let yVelocity = 0;
let gravity = 0.001;

document.body.onkeydown = (evt) => {
    keyboard[evt.key] = true;
}

document.body.onkeyup = async (evt) => {
    keyboard[evt.key] = false;
}

function processInput(){
    const currentY = cam.position.y;
    if(keyboard['a']){
        controls.moveRight(-0.04);
    }
    else if(keyboard['d']){
        controls.moveRight(0.04);
    }

    if(keyboard['w']){
        controls.moveForward(0.04);
    }
    else if(keyboard['s']){
        controls.moveForward(-0.04);
    }
    cam.position.y = currentY;

    if(keyboard[' '] && cam.position.y == 0){
        yVelocity = 0.04;
    }
}

function processPhysics(){
    if(cam.position.y > 0){
        yVelocity -= gravity;
    }

    cam.position.y += yVelocity;

    if(cam.position.y <= 0){
        cam.position.y = 0;
        yVelocity = 0;
    }
}

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight);
const renderer = new THREE.WebGLRenderer();
renderer.domElement.addEventListener("click", async () => {
    await renderer.domElement.requestPointerLock();
});

renderer.setSize(window.innerWidth, window.innerHeight);
cam.position.z = 5;
document.body.appendChild(renderer.domElement);


const controls = new PointerLockControls(cam, renderer.domElement);
document.addEventListener('click', () => {
    controls.lock();
});

const light1 = new THREE.PointLight(0xffff00);
light1.position.y = 3;
light1.position.x = 3;
light1.position.z = 1;

const light1Helper = new THREE.PointLightHelper(light1,0.2);

const geo1 = new THREE.BoxGeometry(1,1,1);
const mesh1 = new THREE.Mesh(
    geo1,
    new THREE.MeshPhongMaterial({color: 0x1166ff,}),
);

const plane1 = new THREE.Mesh(
    new THREE.PlaneGeometry(100,100),
    new THREE.MeshPhongMaterial({color: 0xff6611}),
);

plane1.rotation.x -= Math.PI/2;
plane1.position.y -= 0.5;

scene.add(mesh1);
scene.add(plane1);
scene.add(light1);
scene.add(light1Helper);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    cam.aspect = window.innerWidth/window.innerHeight;
    cam.updateProjectionMatrix();
})

const update = () => {
    processInput();
    processPhysics();
    // controls.update(clock.getDelta());
    renderer.render(scene, cam);
    requestAnimationFrame(update);
}
update();

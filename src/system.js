

import * as THREE from "three";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "../node_modules/three/examples/jsm/controls/TrackballControls";
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader";
import * as cloth from "./assets/Cloth.png";
import * as grassBaseTextureRaw from "./assets/Texture/lambert1_baseColor.png";
import * as grassNormalTextureRaw from "./assets/Texture/lambert1_normal.png";
import * as tekel from "./assets/Texture/marble_floor_tiles_texture__tileable___2048x2048__by_fabooguy_d77on2v-pre.jpg";
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js'

// System Inizialization
let keyboard = []
let yVelocity = 0;
let gravity = 0.001;
let currentObject = null;
let starto = false;
document.body.onkeydown = (evt) => {
    keyboard[evt.key] = true;
}

document.body.onkeyup = async (evt) => {
    keyboard[evt.key] = false;
}

function processInput(){
  
  const currentY = cam.position.y;
  if(keyboard['a'] ){
    if (nabrak == false) {
      controls.moveRight(-0.3);
    } else {
      controls.moveRight(0.0);
    }
      
      currentObject.position.z = cam.position.z;
      currentObject.position.x = cam.position.x;
  
      if (currentObject.rotation.z < 1.5 && currentObject.rotation.z > -1.5) {
        currentObject.rotation.z += 0.1;
      } else if (
        currentObject.rotation.z < -1.5 &&
        currentObject.rotation.z >= -3
      ) {
        if (currentObject.rotation.z - 0.1 <= -3) {
          currentObject.rotation.z = 3;
        } else {
          currentObject.rotation.z -= 0.1;
        }
  } else if (
    currentObject.rotation.z > 1.6 &&
    currentObject.rotation.z <= 3
  ) {
    currentObject.rotation.z -= 0.1;
  }
  lastUsedKey = "a";
  }
  else if(keyboard['d'] ){
    if (nabrak == false) {
      controls.moveRight(0.3);
    } else {
      controls.moveRight(-0.0);
    }
      currentObject.position.z = cam.position.z;
      currentObject.position.x = cam.position.x; 
  
      if (currentObject.rotation.z > -1.4) {
        currentObject.rotation.z -= 0.1;
      }
      if (currentObject.rotation.z < -1.5) {
        currentObject.rotation.z += 0.1;
      }
      lastUsedKey = "d";
  }

  if(keyboard['w'] ){
    console.log(cam.position.z);
    if (nabrak == false) {
      controls.moveForward(0.3);
    } else {
      controls.moveForward(-0.0);
    }
      currentObject.position.z = cam.position.z;
      currentObject.position.x = cam.position.x;
      
      if (Math.floor(currentObject.rotation) !== 0) {
        if (currentObject.rotation.z >= -3 && currentObject.rotation.z <= 0) {
          if (currentObject.rotation.z + 0.1 >= 0) {
            currentObject.rotation.z = 0;
          } else {
            currentObject.rotation.z += 0.1;
          }
        } else if (
          currentObject.rotation.z <= 3 &&
          currentObject.rotation.z >= 0
        ) {
          if (currentObject.rotation.z - 0.1 <= 0) {
            currentObject.rotation.z = 0;
          } else {
            currentObject.rotation.z -= 0.1;
          }
        }
      }
      lastUsedKey = "w";
  }
  else if(keyboard['s']){
    if (nabrak == false) {
      controls.moveForward(-0.3);
    } else {
      controls.moveForward(0.0);
    }
      currentObject.position.z = cam.position.z;
      currentObject.position.x = cam.position.x;
  if (currentObject.rotation.z > -3 && currentObject.rotation.z < 3) {
    if (currentObject.rotation.z <= 0) {
      if (currentObject.rotation.z - 0.1 <= -3) {
        currentObject.rotation.z = 3;
      } else {
        currentObject.rotation.z -= 0.1;
      }
    } else if (currentObject.rotation.z >= 0) {
      if (currentObject.rotation.z + 0.1 >= 3) {
        currentObject.rotation.z = -3;
      } else {
        currentObject.rotation.z += 0.1;
      }
    }
  }
  lastUsedKey = "s";
  }
  if(keyboard["r"] && close_doa && open_doa ){
    const doaslide = -4;
    const doaMovement = new THREE.Vector3();
    doaMovement.x = -doaslide;
      toiredoa.position.add(doaMovement);
      close_doa = false
      nabrak = false
  }

  if(keyboard["t"] && !close_tutup){
    tutup_ajaib.rotation.y = -190
    close_tutup = true
  }
  else if(keyboard["t"] && close_tutup){
    tutup_ajaib.rotation.y = -70
    close_tutup = false
  }
  if(keyboard["f"] && open_doa && !close_doa){
    const doaslide = 4;
    const doaMovement = new THREE.Vector3();
    doaMovement.x = -doaslide;
      toiredoa.position.add(doaMovement);
      close_doa = true
      console.log("nbukak");
  }
  if(keyboard["f"] && !water_out && sunk){
    scene.add(wata);
      console.log("orep");
      water_out = true
  }
  if(keyboard["r"] && water_out && sunk){
    scene.remove(wata);
      console.log("orep");
      water_out = false
  }
  if(keyboard["f"] && !light_on && aswitch){
    scene.add(hikari1);
    hikari1.position.set(-10, 4.3, -38);
    scene.add(hikari2);
    hikari2.position.set(-10, 4.3, -32);
    scene.add(hikari3);
    hikari3.position.set(-10, 4.3, -25);
      console.log("orep");
      light_on = true
  }
  if(keyboard["r"] && light_on && aswitch){
    scene.remove(hikari1);
    hikari1.position.set(-10, -4.3, -32);
    scene.remove(hikari2);
    hikari2.position.set(-10, -4.3, -32);
    scene.remove(hikari3);
    hikari3.position.set(-10, -4.3, -32);
    console.log("matek");
    light_on = false
}
  cam.position.y = currentY;

  if(keyboard[' '] && cam.position.y == 3){
      yVelocity = 0.04;
  }
}

function processPhysics(){
    if(cam.position.y > 0){
        yVelocity -= gravity;
    }

    cam.position.y += yVelocity;

    if(cam.position.y <= 3){
        cam.position.y = 3;
        yVelocity = 0;
    }
}

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight);
const renderer = new THREE.WebGLRenderer();
renderer.domElement.addEventListener("click", async () => {
  console.log("dameda ne");
    await renderer.domElement.requestPointerLock();
    
});

renderer.setSize(window.innerWidth, window.innerHeight);
cam.position.z = 5;
document.body.appendChild(renderer.domElement);


const controls = new PointerLockControls(cam, renderer.domElement);
document.addEventListener('click', () => {
  // raycaster.setFromCamera(mouse, camera);

  // // Check for intersections with character, ball, and dog
  // const intersects = raycaster.intersectObjects([
  //   testingCharacter,
  //   ball,
  //   dog,
  //   car,
    
  // ]);
  // if (intersects.length > 0) {
  //   const clickedObject = intersects[0].object;
  //   if (clickedObject.name == "Character") {
  //     currentObject = testingCharacter;
  //   } else if (clickedObject.name.includes("FootballBall")) {
  //     currentObject = ball;
  //   } else if (clickedObject.name.includes("Dog")) {
  //     currentObject = dog;
  //   }
  // }
  currentObject = testingCharacter;
  console.log(currentObject);
  starto = true
    controls.lock();
});

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();
// window.addEventListener("mousedown", onMouseDown);
// function onMouseDown(event) {
//   raycaster.setFromCamera(mouse, cam);

//   // Check for intersections with character, ball, and dog
//   const intersects = raycaster.intersectObjects([
//     testingCharacter,
//     ball,
//     dog,
//     car,
    
//   ]);
//   if (intersects.length > 0) {
//     const clickedObject = intersects[0].object;
//     if (clickedObject.name == "Character") {
//       currentObject = testingCharacter;
//     } else if (clickedObject.name.includes("FootballBall")) {
//       currentObject = ball;
//     } else if (clickedObject.name.includes("Dog")) {
//       currentObject = dog;
//     }
//   }
// }








//Import Assets
const testingCharacterURL = new URL(
  "./assets/characterTesting.gltf",
  import.meta.url
);

const tutupURL = new URL(
  "./assets/tutup_kursi_ajaib.gltf",
  import.meta.url
);

const buildingUrl = [
  {
    url: new URL("./assets/kursi_ajaib.gltf", import.meta.url),
    position: {
      x: -8,
      y: -0.7,
      z: -32,
    },
  },
  
  {
    url: new URL("./assets/kursi_ajaib.gltf", import.meta.url),
    position: {
      x: -8,
      y: -0.7,
      z: -38,
    },
    
  },
  // {
  //   url: new URL("./assets/unicorn.gltf", import.meta.url),
    
  //   position: {
  //     x: -20,
  //     y: -1,
  //     z: 5,
  //   },
  // }
];




const ballUrl = new URL("./assets/kursi_ajaib.gltf", import.meta.url);
const toireedoa = new URL("./assets/toiree_wall4.gltf", import.meta.url);
const switchiurl = new URL("./assets/switchi.gltf", import.meta.url);
const sinkingurl = new URL("./assets/sinking.gltf", import.meta.url);
const wataurl = new URL("./assets/wata.gltf", import.meta.url);
const roomUrl = [
  //Rumah 1
  //x: -20,
  //y: -1,
  //z: 5,
  {
    url: new URL("./assets/toiree_wall.gltf", import.meta.url),
    position: {
      x: -8,
      y: 1.2,
      z: -23,
    },
  },{
    url: new URL("./assets/toiree_wall.gltf", import.meta.url),
    position: {
      x: -8,
      y: 1.2,
      z: -28,
    }
  }
  ,{
    url: new URL("./assets/toiree_wall.gltf", import.meta.url),
    position: {
      x: -8,
      y: 1.2,
      z: -33,
    }
  }
  ,{
    url: new URL("./assets/toiree_wall.gltf", import.meta.url),
    position: {
      x: -8,
      y: 1.2,
      z: -38,
    }
  }
  //side
  ,{
    url: new URL("./assets/toiree_wall2.gltf", import.meta.url),
    position: {
      x: -13,
      y: 1.2,
      z: -40.8,
    }
  },
  //fornt
   //side
   {
    url: new URL("./assets/toiree_wall3.gltf", import.meta.url),
    position: {
      x: -15,
      y: 1.2,
      z: -20,
    }
  },
  {
    url: new URL("./assets/toiree_wall3.gltf", import.meta.url),
    position: {
      x: -11,
      y: 1.2,
      z: -35,
    }
  },
  {
    url: new URL("./assets/toiree_wall3.gltf", import.meta.url),
    position: {
      x: -11,
      y: 1.2,
      z: -29,
    }
  },
  //back
  {
    url: new URL("./assets/toiree_wall.gltf", import.meta.url),
    position: {
      x: -18,
      y: 1.2,
      z: -23,
    },
  },{
    url: new URL("./assets/toiree_wall.gltf", import.meta.url),
    position: {
      x: -18,
      y: 1.2,
      z: -28,
    }
  }
  ,{
    url: new URL("./assets/toiree_wall.gltf", import.meta.url),
    position: {
      x: -18,
      y: 1.2,
      z: -33,
    }
  }
  ,{
    url: new URL("./assets/toiree_wall.gltf", import.meta.url),
    position: {
      x: -18,
      y: 1.2,
      z: -38,
    }
  }
  ,{
    url: new URL("./assets/roof2.gltf", import.meta.url),
    position: {
      x: -16.9,
      y: 4.4,
      z: -31,
    }
  }
  ,{
    url: new URL("./assets/roof.gltf", import.meta.url),
    position: {
      x: -10,
      y: 4.4,
      z: -31,
    }
  }
  
];
const treesUrl = [
 
  {
    url: new URL("./assets/hikari.gltf", import.meta.url),
    position: {
      x: -12,
      y: 4.3,
      z: -25,
    }
  },
  {
    url: new URL("./assets/hikari.gltf", import.meta.url),
    position: {
      x: -12,
      y: 4.3,
      z: -25,
    }
  },
  {
    url: new URL("./assets/hikari.gltf", import.meta.url),
    position: {
      x: -10,
      y: 4.3,
      z: -32,
    }
  },
  {
    url: new URL("./assets/hikari.gltf", import.meta.url),
    position: {
      x: -10,
      y: 4.3,
      z: -38,
    }
  },
];
const roadUrl =
  {
    url: new URL('./assets/Road_2.gltf', import.meta.url),
    position: [
      {
        x: 4,
        y: -1.2,
        z: -30,
        rotationZ: 1.62
      }, {
        x: 5.5,
        y: -1.2,
        z: 2,
        rotationZ: 1.62
      }, {
        x: -15,
        y: -1.2,
        z: -8,
        rotationZ: 0.05
      }, {
        x: 15,
        y: -1.2,
        z: -9.5,
        rotationZ: 0.05
      },{
        x: 38,
        y: -1.2,
        z: -30,
        rotationZ: 1.62
      }, {
        x: 39.5,
        y: -1.2,
        z: 2,
        rotationZ: 1.62
      },{
        x: -30,
        y: -1.2,
        z: -30,
        rotationZ: 1.62
      }, {
        x: -28.5,
        y: -1.2,
        z: 2,
        rotationZ: 1.62
      }, {
        x: -24,
        y: -1.2,
        z: -42,
        rotationZ: 0.05
      }, {
        x: 7,
        y: -1.2,
        z: -43.5,
        rotationZ: 0.05
      }, {
        x: 20,
        y: -1.2,
        z: -44,
        rotationZ: 0.05
      }, {
        x: -21,
        y: -1.2,
        z: 26,
        rotationZ: 0.05
      }, {
        x: 10,
        y: -1.2,
        z: 24.5,
        rotationZ: 0.05
      }, {
        x: 23,
        y: -1.2,
        z: 24,
        rotationZ: 0.05
      }
    ]
  }
// 68
const grassUrl = new URL("./assets/Grass.gltf", import.meta.url);
const dogUrl = new URL("./assets/Dog.gltf", import.meta.url);
const carUrl = new URL("./assets/Car.gltf", import.meta.url);

// const texture = new THREE.TextureLoader().load(cloth);

//Loading Assets
const grassBaseTexture = new THREE.TextureLoader().load(tekel);
grassBaseTexture.magFilter = THREE.LinearFilter;
grassBaseTexture.wrapS = THREE.RepeatWrapping;
grassBaseTexture.wrapT = THREE.RepeatWrapping;
grassBaseTexture.repeat.set(120, 120);



//Plane
const plane = new THREE.PlaneGeometry(1000, 1000, 100, 100);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  map: grassBaseTexture,
  
});
const planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2;
planeMesh.position.set(0, -1, 0);
planeMesh.receiveShadow = true;
scene.add(planeMesh);

// Character
let testingCharacter = undefined;
new GLTFLoader().load(testingCharacterURL.href, (result) => {
  testingCharacter = result.scene.children[0];
  testingCharacter.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  testingCharacter.position.set(0, 0.7, 0);
  
  scene.add(testingCharacter);
});


let tutup_ajaib = undefined;
new GLTFLoader().load(tutupURL.href, (result) => {
  tutup_ajaib = result.scene.children[0];
  tutup_ajaib.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  
  tutup_ajaib.position.set(-8.9, 0.82, -32);
  
  scene.add(tutup_ajaib);
});


// Road
let roads = [];
for(const road of roadUrl.position){
  new GLTFLoader().load(roadUrl.url.href, (result) => {
    const object = result.scene.children[0];
    object.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    object.position.set(road.x, road.y, road.z);
    object.rotation.z = road.rotationZ;
    scene.add(object);
    roads.push(object);
  });
}
// Buildings

let buildings = [];

for (const building of buildingUrl) {
  new GLTFLoader().load(building.url.href, (result) => {
    const object = result.scene.children[0];
    object.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    const position = building.position;
    object.position.set(position.x, position.y, position.z);
    
    scene.add(object);
    buildings.push(object);
  });
}
for(const road of roadUrl.position){
  new GLTFLoader().load(roadUrl.url.href, (result) => {
    const object = result.scene.children[0];
    object.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    object.position.set(road.x, road.y, road.z);
    object.rotation.z = road.rotationZ;
    scene.add(object);
    roads.push(object);
  });
}
// Buildings

let rooms = [];

for (const room of roomUrl) {
  new GLTFLoader().load(room.url.href, (result) => {
    const object = result.scene.children[0];
    object.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    const position = room.position;
    object.position.set(position.x, position.y, position.z);
    scene.add(object);
    rooms.push(object);
  });
}


// Ball

let ball = undefined;
new GLTFLoader().load(ballUrl.href, (result) => {
  ball = result.scene.children[0];
  ball.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  ball.position.set(0, -0.7, 5);
  scene.add(ball);
});

let toiredoa = undefined;
new GLTFLoader().load(toireedoa.href, (result) => {
  toiredoa = result.scene.children[0];
  toiredoa.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  toiredoa.position.set(-14, 0.7, -20.6);
  scene.add(toiredoa);
});

let sinking = undefined;
new GLTFLoader().load(sinkingurl.href, (result) => {
  sinking = result.scene.children[0];
  sinking.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  sinking.position.set(-16, 1, -24);
  scene.add(sinking);
});

let wata = undefined;
new GLTFLoader().load(wataurl.href, (result) => {
  wata = result.scene.children[0];
  wata.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  wata.position.set(-16.2,1.5, -24.05);
  
});

let switchi = undefined;
new GLTFLoader().load(switchiurl.href, (result) => {
  switchi = result.scene.children[0];
  switchi.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  switchi.position.set(-8.13, 2.5, -24);
  scene.add(switchi);
});


// Dog
let dog = undefined;
new GLTFLoader().load(dogUrl.href, (result) => {
  dog = result.scene.children[0];
  dog.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  dog.position.set(5, -1, 5);
  scene.add(dog);
});

// Car
let car = undefined;
new GLTFLoader().load(carUrl.href, (result) => {
  car = result.scene.children[0];
  car.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  car.position.set(15, -0.7, 15);
  car.rotation.z = 1.5
  scene.add(car);
});

// Tree
let trees = [];
for (const tree of treesUrl) {
  new GLTFLoader().load(tree.url.href, (result) => {
    const object = result.scene.children[0];
    object.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    const position = tree.position;
    object.position.set(position.x, position.y, position.z);
    scene.add(object);
    trees.push(object);
  });
}

//Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(300, 300, 0);
light.target.position.set(-20, 0, 5);
light.castShadow = true;
light.shadow.mapSize.set(2048, 2048);
light.shadow.bias = 0.9;
light.shadow.camera.near = 0.0; // default
light.shadow.camera.far = 5000; // default
light.shadow.camera.left = -100;
light.shadow.camera.right = 100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;
scene.add(light);
scene.add(light.target);

const hikari1 = new THREE.PointLight(0xffffff, 0.5,50);
hikari1.position.set(-10, 4. -38);

hikari1.castShadow = true;

//scene.add(hikari1);

const hikari2 = new THREE.PointLight(0xffffff, 0.5,50);
hikari2.position.set(-10, 4, -32);

hikari2.castShadow = true;

//scene.add(hikari2);

const hikari3 = new THREE.PointLight(0xffffff, 0.5,50);
hikari3.position.set(-12, 4, -25);

hikari3.castShadow = true;

//scene.add(hikari3);

scene.add(new THREE.CameraHelper(light.shadow.camera));
let lastUsedKey = null;


let open_doa = false
let close_doa = false
function proccessKeyboard() {
  if (keyboard["d"]) {
    testingCharacter.position.x -= 0.25;
    
    if (testingCharacter.rotation.z > -1.4) {
      testingCharacter.rotation.z -= 0.1;
    }
    if (testingCharacter.rotation.z < -1.5) {
      testingCharacter.rotation.z += 0.1;
    }
    lastUsedKey = "d";
  }
  if (keyboard["a"]) {
    currentObject.position.x += 0.25;
    
    if (currentObject.rotation.z < 1.5 && currentObject.rotation.z > -1.5) {
      currentObject.rotation.z += 0.1;
    } else if (
      currentObject.rotation.z < -1.5 &&
      currentObject.rotation.z >= -3
    ) {
      if (currentObject.rotation.z - 0.1 <= -3) {
        currentObject.rotation.z = 3;
      } else {
        currentObject.rotation.z -= 0.1;
      }
    } else if (
      currentObject.rotation.z > 1.6 &&
      currentObject.rotation.z <= 3
    ) {
      currentObject.rotation.z -= 0.1;
    }
    lastUsedKey = "a";
  }
  if (keyboard["w"]) {
    currentObject.position.z += 0.25;
    
    if (Math.floor(currentObject.rotation) !== 0) {
      if (currentObject.rotation.z >= -3 && currentObject.rotation.z <= 0) {
        if (currentObject.rotation.z + 0.1 >= 0) {
          currentObject.rotation.z = 0;
        } else {
          currentObject.rotation.z += 0.1;
        }
      } else if (
        currentObject.rotation.z <= 3 &&
        currentObject.rotation.z >= 0
      ) {
        if (currentObject.rotation.z - 0.1 <= 0) {
          currentObject.rotation.z = 0;
        } else {
          currentObject.rotation.z -= 0.1;
        }
      }
    }
    lastUsedKey = "w";
  }
  if (keyboard["s"]) {
    currentObject.position.z -= 0.25;
    
    if (currentObject.rotation.z > -3 && currentObject.rotation.z < 3) {
      if (currentObject.rotation.z <= 0) {
        if (currentObject.rotation.z - 0.1 <= -3) {
          currentObject.rotation.z = 3;
        } else {
          currentObject.rotation.z -= 0.1;
        }
      } else if (currentObject.rotation.z >= 0) {
        if (currentObject.rotation.z + 0.1 >= 3) {
          currentObject.rotation.z = -3;
        } else {
          currentObject.rotation.z += 0.1;
        }
      }
    }
    lastUsedKey = "s";
  }

  if(keyboard["r"] && close_doa && open_doa ){
    const doaslide = -4;
    const doaMovement = new THREE.Vector3();
    doaMovement.x = -doaslide;
      toiredoa.position.add(doaMovement);
      close_doa = false
  }
  else if(keyboard["f"] && open_doa && !close_doa){
    const doaslide = 4;
    const doaMovement = new THREE.Vector3();
    doaMovement.x = -doaslide;
      toiredoa.position.add(doaMovement);
      close_doa = true
  }
  const objectPosition = new THREE.Vector3();
  currentObject.getWorldPosition(objectPosition);
  
  //controls.target.copy(objectPosition);
  //controls.update();
  //   controls.target.copy(currentObject.position);
  //   controls.update();
}

let characterPreviousPosition = new THREE.Vector3();
function updateCharacterPosition() {
  //characterPreviousPosition.copy(currentObject.position);
  //proccessKeyboard();
  //const doaBox = new THREE.Box3().setFromObject(toiredoa);
  //const doaBox = new THREE.Box3().setFromObject(toiredoa);
  //const currentObjectBox = new THREE.Box3().setFromObject(testingCharacter);
  
  


 
  if ((cam.position.z <= -17.6 && cam.position.z >= -22.6) && (cam.position.x >= -14 && cam.position.x <= -8) && open_doa == false) {
    // There is a collision between the character and the ball
    //testingCharacter.position.copy(characterPreviousPosition);
    console.log("baka");
    open_doa = true
    if (!close_doa) {
      
      if ((cam.position.z <= -14.6 && cam.position.z >= -22.6) && (cam.position.x >= -14 && cam.position.x <= -10) && open_doa == false) {
        nabrak = true
      }
      console.log("nabrak" + open_doa);
      console.log("nkabrs" + close_doa);
    } else {
      nabrak = false
      console.log("nabrak false");
    }
  }
  else
  {
    nabrak = false
    open_doa = false
    
  }
  if (starto) {
    checkCollision();
  }
  
}
let canRide = false;
let inCar = false
let open_tutup = false
let close_tutup = false
let nabrak = false
let light_on = true
let aswitch = false
let water_out = false
let sunk = false
function checkCollision() {
  const currentObjectBox = new THREE.Box3().setFromObject(currentObject);
  const characterBox = new THREE.Box3()
    .setFromObject(currentObject)
    .expandByScalar(1.5);
  //const ballBox = new THREE.Box3().setFromObject(ball);
  const carBox = new THREE.Box3().setFromObject(car);
  const doaBox = new THREE.Box3().setFromObject(toiredoa);
  const switchbox = new THREE.Box3().setFromObject(switchi);
  const sinkbox = new THREE.Box3().setFromObject(sinking);
  if (currentObjectBox.intersectsBox(carBox) && canRide) {
    currentObject.position.copy(characterPreviousPosition);
    nabrak = true
  }


  if (currentObjectBox.intersectsBox(switchbox)) {
    aswitch = true;
    
  } else {
    aswitch = false;
  }

  
  if (currentObjectBox.intersectsBox(sinkbox)) {
    sunk = true;
    testingCharacter.position.copy(characterPreviousPosition);
    nabrak = true
  } else {
    sunk = false;
    nabrak = false
  }
  // if (currentObjectBox.intersectsBox(ballBox)) {
  //   // There is a collision between the character and the ball
  //   const ballSpeed = 1;
  //   const ballMovement = new THREE.Vector3();

  //   if (currentObject !== ball) {
  //     switch (lastUsedKey) {
  //       case "w":
  //         ballMovement.z = ballSpeed;
  //         break;
  //       case "a":
  //         ballMovement.x = ballSpeed;
  //         break;
  //       case "s":
  //         ballMovement.z = -ballSpeed;
  //         break;
  //       case "d":
  //         ballMovement.x = -ballSpeed;
  //         break;
  //     }
  //     ballPreviousPosition.copy(ball.position);
  //     ball.position.add(ballMovement);
  //   }
  // }
let toki = 0
  if (currentObjectBox.intersectsBox(doaBox)) {
    // There is a collision between the character and the ball
    testingCharacter.position.copy(characterPreviousPosition);
    open_doa = true
    if (!close_doa) {
      nabrak = true
      console.log("baka");
    } else {
      nabrak = false
    }
    
  }
  else
  {
    nabrak == false
    open_doa = false
    
  }
  
  
  
  
  


  for (const building of buildings) {
    const buildingBox = new THREE.Box3().setFromObject(building);
    if (currentObjectBox.intersectsBox(buildingBox)) {
      // There is a collision, revert the character's position to the previous position
      testingCharacter.position.copy(characterPreviousPosition);
      if (currentObjectBox.intersectsBox(buildingBox)) {
        // There is a collision between the character and the ball
        testingCharacter.position.copy(characterPreviousPosition);
        open_tutup = true
        
        
      }
      else
      {
        open_tutup = false
        
      }
      nabrak = true
    }
    else
    {
      nabrak == false
    }
    // if (ballBox.intersectsBox(buildingBox)) {
    //   // There is a collision, revert the character's position to the previous position
    //   testingCharacter.position.copy(characterPreviousPosition);
    //   ball.position.copy(ballPreviousPosition);
    // }
  }
  for (const tree of trees) {
    const treeBox = new THREE.Box3().setFromObject(tree).expandByScalar(0.3);
    if (currentObjectBox.intersectsBox(treeBox)) {
      // There is a collision, revert the character's position to the previous position
      testingCharacter.position.copy(characterPreviousPosition);
      nabrak = true
    }
    else
    {
      nabrak == false
    }
    // if (ballBox.intersectsBox(treeBox)) {
    //   // There is a collision, revert the character's position to the previous position
    //   currentObject.position.copy(characterPreviousPosition);
    //   ball.position.copy(ballPreviousPosition);
    // }
  }
  for (const room of rooms) {
    const roomBox = new THREE.Box3().setFromObject(room).expandByScalar(0.0);
    if (currentObjectBox.intersectsBox(roomBox)) {
      // There is a collision, revert the character's position to the previous position
      testingCharacter.position.copy(characterPreviousPosition);
      nabrak = true
    }
    else
    {
      nabrak == false
    }
  }

}




window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    cam.aspect = window.innerWidth/window.innerHeight;
    cam.updateProjectionMatrix();
})

const update = () => {
    processInput();
    processPhysics();
    updateCharacterPosition();
    // controls.update(clock.getDelta());
    renderer.render(scene, cam);
    requestAnimationFrame(update);
}
update();

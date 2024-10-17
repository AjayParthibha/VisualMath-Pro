import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import * as THREE from 'three/build/three.module.min.js';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//const THREE = require('https://cdn.skypack.dev/three@0.133.1');
//const OrbitControls = require('https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js');


innerWidth = 500;
innerHeight = 500;
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1);
camera.position.set(1, 1, 1).setLength(40);
camera.lookAt(scene.position);
let renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x161616);
document.getElementById('screen').appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
//let controls = new THREE.OrbitControls(camera);
//controls.domElement = renderer.domElement;

let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

let gridz1 = new THREE.GridHelper(16, 16, 0xff0f00, 0xff0f00);
gridz1.position.y = -8;

let gridz2 = new THREE.GridHelper(16, 16, 0x9c9c9c, 0x9c9c9c);
gridz2.position.y = 8;

let gridy1 = new THREE.GridHelper(16, 16, 0x9c9c9c, 0x9c9c9c);
gridy1.rotation.x = Math.PI / 2;
gridy1.position.z = 8;

let gridy2 = new THREE.GridHelper(16, 16, 0x9c9c9c, 0x9c9c9c);
gridy2.rotation.x = Math.PI / 2;
gridy2.position.z = -8;

let gridx1 = new THREE.GridHelper(16, 16, 0x9c9c9c, 0x9c9c9c);
gridx1.rotation.z = Math.PI / 2;
gridx1.position.x = 8;

let gridx2 = new THREE.GridHelper(16, 16, 0x9c9c9c, 0x9c9c9c);
gridx2.rotation.z = Math.PI / 2;
gridx2.position.x = -8;

scene.add(gridz1);
scene.add(gridz2);
scene.add(gridy1);
scene.add(gridy2);
scene.add(gridx1);
scene.add(gridx2);

let graphGeom = new THREE.PlaneGeometry(16, 16, 16, 16);
let graphMat = new THREE.MeshNormalMaterial({
  side: THREE.DoubleSide,
  wireframe: false,
});
let graph = new THREE.Mesh(graphGeom, graphMat);
graph.rotation.x = -Math.PI / 2;
// f(x,z)
let pos = graphGeom.attributes.position;
for (let i = 0; i < pos.count; i++) {
  let x = pos.getX(i);
  let y = pos.getY(i);
  let exp = localStorage.getItem('expression');
  let xmin = parseInt(localStorage.getItem('xmin'));
  let xmax = parseInt(localStorage.getItem('xmax'));
  let ymin = parseInt(localStorage.getItem('ymin'));
  let ymax = parseInt(localStorage.getItem('ymax'));
  let zmin = parseInt(localStorage.getItem('zmin'));
  let zmax = parseInt(localStorage.getItem('zmax'));
  //pos.setZ(i, -10+20*(math.evaluate(exp,{x:pos.getX(i),y:pos.getY(i)})-zmin)/(zmax-zmin));
  pos.setZ(i, -8+16*(math.evaluate(exp,{x:xmin+(xmax-xmin)*(pos.getX(i)+8)/16,y:ymin+(ymax-ymin)*(pos.getY(i)+8)/16})-zmin)/(zmax-zmin));
}
graphGeom.computeVertexNormals();
graphGeom.attributes.position.needsUpdate = true;

scene.add(graph);

window.addEventListener('resize', onResize);

renderer.setAnimationLoop((_) => {
  renderer.render(scene, camera);
});

function onResize(event) {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}

function updateScreen(){
  let pos = graphGeom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let exp = document.getElementById('infunc').value;
    localStorage.setItem('expression',document.getElementById('infunc').value)
    let xmin = parseInt(localStorage.getItem('xmin'));
    let xmax = parseInt(localStorage.getItem('xmax'));
    let ymin = parseInt(localStorage.getItem('ymin'));
    let ymax = parseInt(localStorage.getItem('ymax'));
    let zmin = parseInt(localStorage.getItem('zmin'));
    let zmax = parseInt(localStorage.getItem('zmax'));
    //pos.setZ(i, -10+20*(math.evaluate(exp,{x:pos.getX(i),y:pos.getY(i)})-zmin)/(zmax-zmin));
    pos.setZ(i, -8+16*(math.evaluate(exp,{x:xmin+(xmax-xmin)*(pos.getX(i)+8)/16,y:ymin+(ymax-ymin)*(pos.getY(i)+8)/16})-zmin)/(zmax-zmin));
  }
  graphGeom.computeVertexNormals();
  graphGeom.attributes.position.needsUpdate = true;
}

document.getElementById('saveFunc').addEventListener('click', function (event) {
  updateScreen();
});
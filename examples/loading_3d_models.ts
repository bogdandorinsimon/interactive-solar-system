import * as THREE from "three";
//@ts-ignore
import WebGL from "three/addons/capabilities/WebGL.js";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.lookAt(0, 0, 5);
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

loader.load(
  "assets/earth/scene.gltf",
  (gltf: GLTF) => {
    scene.add(gltf.scene);
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container")?.appendChild(warning);
}

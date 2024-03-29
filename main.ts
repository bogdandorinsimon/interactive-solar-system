import * as THREE from "three";
import WebGL from "three/examples/jsm/capabilities/WebGL";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50;
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

loader.load(
  "./models/sun/scene.gltf",
  (gltf) => {
    console.log("success");
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

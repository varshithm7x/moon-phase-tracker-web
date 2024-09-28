import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import moonTexture from './assets/moonTexture.jpg';
import moonDisplacementMap from './assets/moon-displacement.jpg';

document.addEventListener("DOMContentLoaded", () => {
  // Ensure the DOM is fully loaded before accessing the elements
  
  // Check if canvas element exists
  const canvas = document.querySelector("#webg1");
  if (!canvas) {
    console.error("Canvas element with id 'webg1' not found.");
    return;
  }

  //create new scene
  const scene = new THREE.Scene();

  //create Sphere
  const geomentry = new THREE.SphereGeometry(3, 64, 64);

  //load textures
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(moonTexture);
  const displacementMap = textureLoader.load(moonDisplacementMap);

  //add material
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: texture,
    displacementMap: displacementMap,
    displacementScale: 0.05,
    bumpMap: displacementMap,
    bumpScale: 0.04,
  });

  const mesh = new THREE.Mesh(geomentry, material);
  scene.add(mesh);

  //sizes
  let w;
  if (window.innerWidth < 800) {
    w = window.innerWidth;
  } else {
    w = window.innerWidth / 2;
  }
  let h = window.innerHeight;

  //Light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(100, 10, 5);
  scene.add(light);

  //Camera
  const camera = new THREE.PerspectiveCamera(25, w / h);
  camera.position.z = 20;
  scene.add(camera);

  //Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });
  renderer.setSize(w, h);
  renderer.render(scene, camera);

  //Orbit Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;

  //Window Resize
  window.addEventListener("resize", () => {
    //Update Size
    if (window.innerWidth < 800) {
      w = window.innerWidth;
    } else {
      w = window.innerWidth / 2;
    }
    h = window.innerHeight;

    //Update Camera
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  //Animate rotation and update scene
  const loop = () => {
    mesh.rotation.y += 0.001;
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
  };

  loop();

  // Update the DOM elements after they are loaded
  document.querySelector('#app').innerHTML = `
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
      </a>
      <h1>Hello Vite!</h1>
      <div class="card">
        <button id="counter" type="button"></button>
      </div>
      <p class="read-the-docs">
        Click on the Vite logo to learn more
      </p>
    </div>
  `;

  setupCounter(document.querySelector('#counter'));
});

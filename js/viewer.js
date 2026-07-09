import * as THREE from "three";
import { OrbitControls } from "https://unpkg.com/three@0.180.0/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "https://unpkg.com/three@0.180.0/examples/jsm/loaders/STLLoader.js";


const container = document.getElementById("assemblyViewer");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1b2128);

// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

camera.position.set(220, 150, 220);

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);

container.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 1.5));

const directional = new THREE.DirectionalLight(0xffffff, 2);
directional.position.set(40, 50, 30);
scene.add(directional);

// Grid
scene.add(new THREE.GridHelper(100, 20));

// STL
const loader = new STLLoader();

loader.load("models/Solar_Prang_Assembly.stl", geometry => {

    geometry.center();

    const material = new THREE.MeshStandardMaterial({
        color: 0xb5b5b5,
        metalness: 0.2,
        roughness: 0.5
    });

    const mesh = new THREE.Mesh(geometry, material);

    // Rotate as needed
    mesh.rotation.x = -Math.PI / 2;
    // mesh.rotation.y = Math.PI;
    // mesh.rotation.z = Math.PI / 2;

    scene.add(mesh);

});

// Resize
window.addEventListener("resize", () => {

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

});

// Render loop
function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);

}

animate();
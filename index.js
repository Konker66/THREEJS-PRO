import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

let w, h;
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.createElement('canvas') });
document.body.appendChild(renderer.domElement);

const fov = 75;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, w / h, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();

const cont = new OrbitControls(camera, renderer.domElement);
cont.enableDamping = true;
cont.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({ color: 0xfffffff, flatShading: true });
const mech = new THREE.Mesh(geo, mat);
scene.add(mech);

const wireMat = new THREE.MeshStandardMaterial({
    color: 0xffff,
    wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wireMat);
// wireMesh.scale.setScaler(1.001);
mech.add(wireMesh);

const hemi = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemi);

let t = 0;
function animate() {
    requestAnimationFrame(animate);
    mech.rotation.y = t;
    t += 0.003; // rotate slowly around its own axis
    renderer.render(scene, camera);
    cont.update();
}

function onResize() {
    w = window.innerWidth;
    h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100vh';
}

window.addEventListener('resize', onResize);

document.body.style.overflow = 'hidden'; // add this line
document.body.style.margin = '0'; // add this line

onResize(); // initial resize
animate();
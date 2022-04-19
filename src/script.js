import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
//const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry(1, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial()
//material.transparent = true
material.opacity = 0.1
material.roughness = 0.046
material.metalness = 0.58
material.normalMap = normalTexture
//material.emissive = new THREE.Color(0x000000)
material.color = new THREE.Color(0xffc87a)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xf6bd3ff, 0.5)
// pointLight.position.x = -20
// pointLight.position.y = 3
// pointLight.position.z = 4
pointLight.position.set(-20, 3, 4)
pointLight.intensity = 2
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffc87a, 2)
// pointLight2.position.x = 200
// pointLight2.position.y = 80
// pointLight2.position.z = -50
pointLight2.position.set(100, -10, 40)
pointLight2.intensity = 1.88
scene.add(pointLight2)



gui.add(pointLight2.position,'x').min(-100).max(100).step(0.01)
gui.add(pointLight2.position,'y').min(-100).max(100).step(0.01)
gui.add(pointLight2.position,'x').min(-100).max(100).step(0.01)
gui.add(pointLight2, 'intensity').min(-10).max(10).step(0.01)

//AmbientLight
const ambientLight = new THREE.AmbientLight(0xc11f1f, 1)
ambientLight.intensity = 0.4
scene.add(ambientLight)

gui.add(ambientLight, 'intensity').min(-10).max(10).step(0.01).name('ambient intensity')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
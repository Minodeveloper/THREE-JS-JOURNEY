import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
*/
const ambientLight = new THREE.AmbientLight(0xffffff,0.5)
// ambientLight.color = new THREE.Color(0xffffff)
// ambientLight.intensity = 0.2
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.x = 1
directionalLight.position.y = 0.25
directionalLight.position.z = 0

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff,0.3)
/*
* Lights  HELPPER  
*/
const helperHemisphereLight = new THREE.HemisphereLightHelper(hemisphereLight,0.2)

const pointLight = new THREE.PointLight(0x00ff00, 0.4,8)
pointLight.position.set(1,-0.5,1)

const rectAreaLight = new THREE.RectAreaLight(0x4cf010, 1)

const spotLight = new THREE.SpotLight(0xffff00, 0.8, 12, Math.PI * 0.2)

scene.add(spotLight)
// scene.add(rectAreaLight)
scene.add(pointLight)
scene.add(hemisphereLight)
// scene.add(helperHemisphereLight) //light helper
scene.add(directionalLight)
scene.add(ambientLight)

gui.add(directionalLight.position, 'x').max(1).min(0).step(0.01)
gui.add(directionalLight.position, 'y').max(1).min(0).step(0.01)
gui.add(directionalLight.position, 'z').max(1).min(0).step(0.01)
gui.add(ambientLight, 'intensity').max(1).min(0).step(0.01)
gui.add(directionalLight, 'intensity').max(1).min(0).step(0.01)

// const pointLight = new THREE.PointLight(0xffffff, 0.5)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
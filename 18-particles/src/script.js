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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')
/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color:0x5ff078})
// )
// scene.add(cube)

/* 
    particles
*/
//geomettry
const particleGeometry = new THREE.BufferGeometry(1,32,32)

const count = 50000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for (let i = 0; i < count * 3 ; i++){
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()

}
particleGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
)

particleGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

//material
const particlesMaterial = new THREE.PointsMaterial({map:particleTexture})
// particlesMaterial.color = new THREE.Color(0xff009f)
particlesMaterial.size = 0.1
particlesMaterial.sizeAttenuation = true
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending
// particlesMaterial.depthTest = false
// particlesMaterial.alphaTest = 0.001
particlesMaterial.vertexColors = true

// const particlesMaterial = new THREE.PointsMaterial({
//     size:0.02,
//     sizeAttenuation: true
// })
//points
const particles = new THREE.Points(particleGeometry, particlesMaterial)
scene.add(particles)



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
camera.position.z = 3
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

    //update particles all at ones 
    // particles.rotation.y = elapsedTime * 0.2
    for(let i = 0; i < count; i++)
    {
        const i3 = i * 3
        const x = particleGeometry.attributes.position.array[i3]
        particleGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)

    }
    particleGeometry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
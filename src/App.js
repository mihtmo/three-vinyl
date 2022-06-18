import './App.css';
import React, { useContext } from "react";
import { Canvas } from '@react-three/fiber'
import {RecordJacket } from './components/RecordJacket';
import Vinyl from './components/Vinyl'
import { Controls } from 'react-three-gui'
import { PointerLockControls, FirstPersonControls, FlyControls, OrbitControls } from '@react-three/drei';
import Room from './components/Room';
import { Mote, RandomMote } from './components/Mote';
import Weatherblanket from './components/Weatherblanket';
import * as THREE from 'three';
import { Player } from './components/Player';



const App = () => {

    return (
        <Controls.Provider>
            <div className="record-canvas">
                <Controls.Canvas className="webgl-canvas" 
                    camera={{ fov: 75, position: [0, 0, 600], near: 1, far: 8000 }}
                    shadows={{ type: "BasicShadowMap" }}>
                    <color attach="background" args={["#565665"]} />
                    <fog attach="fog" args={["#565665", 1000, 2000]} />
                    <OrbitControls lookSpeed={0.1} movementSpeed={1000}/>
                    <ambientLight color={"lightyellow"} intensity={.3}/>
                    <directionalLight castShadow={true} position={[-500, 2000, -2000]} color={"lightyellow"} intensity={.8}/>
                    <pointLight castShadow={true} position={[300, 100, 500]} color={"lightyellow"} intensity={.8}/>
                    <pointLight castShadow={true} position={[-200, 100, 500]} color={"lightyellow"} intensity={.8}/>
                    <pointLight castShadow={true} position={[-300, 100, -500]} color={"lightyellow"} intensity={.2}/>
                    <Room />
                    <Vinyl />
                    <RecordJacket />
                    {/* <RandomMote /> */}
                    <Weatherblanket />
                </Controls.Canvas>
                <Controls title="Record Controls" defaultClosedGroups={["Vinyl", "Jacket", "Weatherblanket"]}/>
            </div>
        </Controls.Provider>
    );
  // Canvas
    // const canvas = document.querySelector('canvas.webgl')

    // Scene
    // const scene = new THREE.Scene()


    // // Sizes
    // const sizes = {
    //     width: window.innerWidth * .8,
    //     height: window.innerHeight * .8
    // }

    // // Camera
    // const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 3000)
    // camera.position.z = 450
    // scene.add(camera)

    // // Controls
    // const controls = new THREE.OrbitControls(camera, canvas)


    // /**
    //  * Renderer
    //  */
    // const renderer = new THREE.WebGLRenderer({
    //     canvas: canvas,
    //     alpha: true
    // })
    // renderer.setSize(sizes.width, sizes.height)
    // renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

    // Fit-Screen
//     function resize() {
//         // Update Sizes
//         console.log('hi')
//         sizes.width = window.innerWidth * .8,
//         sizes.height = window.innerHeight * .8,
//         // Update Camera
//         camera.aspect = sizes.width/sizes.height
//         camera.updateProjectionMatrix()
//         // Update Renderer
//         renderer.setSize(sizes.width, sizes.height)
//         // Update pixel ratio
//         renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
//     }

//     window.onresize = resize

//     // Fullscreen support, including safari
//     function fullscreen() {
    
//         const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

//         if(!fullscreenElement) {
//             if(canvas.requestFullscreen) {
//                 canvas.requestFullscreen()
//             }
//             else if(canvas.webkitRequestFullscreen) {
//                 canvas.webkitRequestFullscreen()
//             }
//         }
//         else {
//             if(document.exitFullscreen) {
//                 document.exitFullscreen()
//             }
//             else if(document.webkitExitFullscreen) {
//                 document.webkitExitFullscreen()
//             }

//         }
//     }

//     window.addEventListener('dblclick', fullscreen)

//     /**
//      * Animate
//      */
//     const clock = new THREE.Clock()

//     const tick = () =>
//     {
//         const elapsedTime = clock.getElapsedTime()

//         // Update controls
//         controls.update()

//         // Render
//         renderer.render(scene, camera)

//         // Call tick again on the next frame
//         window.requestAnimationFrame(tick)
//     }

//     tick()


// // "12 Inch Vinyl Record EP" (https://skfb.ly/6Z8zV) by finnddot is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
// }
};
export default App;

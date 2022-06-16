import './App.css';
import React, { useContext } from "react";
import { Canvas } from '@react-three/fiber'
import RecordJacket from './components/RecordJacket';
import Vinyl from './components/Vinyl'
import { Controls } from 'react-three-gui'
import { OrbitControls } from '@react-three/drei';
import Room from './components/Room';

  
const App = () => {
    return (
        <Controls.Provider>
            <div className="record-canvas">
                <Controls.Canvas className="webgl-canvas" 
                    camera={{ fov: 75, position: [0, 0, 450], near: 1, far: 8000 }}>
                    <color attach="background" args={["#464655"]} />
                    <fog attach="fog" args={["#464655", 300, 2000]} />
                    <OrbitControls />
                    <ambientLight color={"lightyellow"} intensity={.2}/>
                    <directionalLight position={[-500, 2000, -2000]} color={"lightyellow"} intensity={1}/>
                    <pointLight position={[300, 300, 500]} color={"lightyellow"} intensity={1}/>
                    <pointLight position={[-300, 300, -500]} color={"lightyellow"} intensity={.8}/>
                    <Room />
                    <Vinyl />
                    <RecordJacket />
                </Controls.Canvas>
                <Controls title="Record Controls" />
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

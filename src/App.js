import './App.css';
import React, { useContext, useEffect, useState } from "react";
import {RecordJacket } from './components/RecordJacket';
import Vinyl from './components/Vinyl'
import { Controls } from 'react-three-gui'
import { PointerLockControls, FirstPersonControls, FlyControls, OrbitControls } from '@react-three/drei';
import Room from './components/Room';
import { Mote, RandomMote } from './components/Mote';
import Weatherblanket from './components/Weatherblanket';
import axios from 'axios';



const App = () => {

    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
            axios({
                method: "GET",
                url: "/"
            })
            .then((response) => {
                const res = response.getData
                setWeatherData(({
                    res
                }))
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })}, [])

    return (
        <Controls.Provider>
            <div className="record-canvas">
                <Controls.Canvas className="webgl-canvas" 
                    camera={{ fov: 75, position: [0, 200, 1000], near: 1, far: 8000 }}
                    shadows={{ type: "BasicShadowMap" }}>
                    <color attach="background" args={["#565665"]} />
                    <fog attach="fog" args={["#565665", 1500, 2000]} />
                    <OrbitControls lookSpeed={0.1} movementSpeed={1000} target={[0, 200, 0]} s/>
                    <ambientLight color={"lightyellow"} intensity={.3}/>
                    <directionalLight castShadow={true} position={[-500, 2000, -2000]} color={"lightyellow"} intensity={.8}/>
                    <pointLight castShadow={true} position={[300, 100, 500]} color={"lightyellow"} intensity={.8}/>
                    <pointLight castShadow={true} position={[-200, 100, 500]} color={"lightyellow"} intensity={.8}/>
                    <pointLight castShadow={true} position={[-300, 100, -500]} color={"lightyellow"} intensity={.2}/>
                    <Room />
                    <Vinyl />
                    <RecordJacket />
                    {/* <RandomMote /> */}
                    <Weatherblanket weatherData={weatherData}/>
                </Controls.Canvas>
                <Controls title="Controls" defaultClosedGroups={["Vinyl", "Jacket", "Weatherblanket"]}/>
            </div>
        </Controls.Provider>
    );
};
export default App;

// // "12 Inch Vinyl Record EP" (https://skfb.ly/6Z8zV) by finnddot is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/)"



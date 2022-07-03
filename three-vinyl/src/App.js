import './App.css';
import React, { useEffect, useState } from "react";
import {RecordJacket } from './components/RecordJacket';
import Vinyl from './components/Vinyl'
import { Controls } from 'react-three-gui'
import { PointerLockControls, FirstPersonControls, FlyControls, OrbitControls } from '@react-three/drei';
import Room from './components/Room';
import { Mote, RandomMote } from './components/Mote';
import Weatherblanket from './components/Weatherblanket';
import axios from 'axios';



const App = () => {

    const [xSpaceValue, setXSpaceValue] = useState(1)
    const [isLoading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState()

    const xSpaceHandler = e => {
        setXSpaceValue(e.target.value)
    }

    useEffect(() => {
            axios({
                method: "GET",
                url: "/api"
            })
            .then((response) => {
                const res = response.data
                setWeatherData(res)
                setLoading(false);
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })}, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <Controls.Provider>
            <div className="record-canvas">
                <Controls.Canvas className="webgl-canvas" 
                    camera={{ fov: 75, position: [0, 200, 1000], near: 1, far: 8000 }}
                    shadows={{ type: "BasicShadowMap" }}>
                    <color attach="background" args={["#565665"]} />
                    <fog attach="fog" args={["#565665", 1800, 3000]} />
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
                    <Weatherblanket weatherData={weatherData} xSpace={xSpaceValue}/>
                </Controls.Canvas>
                <div className="myGUI">
                    <div id="x-space-slider" >
                        <label className="flex-item" htmlFor="x-space">Horizontal Spacing</label>
                        <input className="flex-item" type="range" min="1" max="5" step=".05" id="x-space" value={xSpaceValue} onChange={xSpaceHandler} />
                        <label className="flex-item" htmlFor="x-space"> {xSpaceValue} </label>
                    </div>
                </div>
                <Controls title="Controls" defaultClosedGroups={["Vinyl", "Jacket", "Weatherblanket"]}/>
            </div>
        </Controls.Provider>
    );
};
export default App;

// // "12 Inch Vinyl Record EP" (https://skfb.ly/6Z8zV) by finnddot is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/)"



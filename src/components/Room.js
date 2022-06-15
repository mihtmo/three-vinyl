import { useRef } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';


const WoodFloor = (props) => {
    console.log("or is it here?")
    const mesh = useRef();
    const [mapColor, mapAO, mapReflect, mapBump] = useLoader(THREE.TextureLoader, 
        ['./assets/woodfloor/woodfloor-color.jpg', './assets/woodfloor/woodfloor-ambient.jpg','./assets/woodfloor/woodfloor-gloss.jpg', './assets/woodfloor/woodfloor-bump.jpg'])
    
    const textureArray = [mapColor, mapAO, mapReflect, mapBump]

    for (let i=0; i<4; i++) {
        textureArray[i].wrapS = textureArray[i].wrapT = THREE.RepeatWrapping
        textureArray[i].repeat.set(7, 7)
    }

    return (
        <mesh 
        {...props}
        ref={mesh}>
        <planeGeometry
            args={[20000, 20000]} />
        <meshStandardMaterial
            map={mapColor}
            aoMap={mapAO} 
            metalnessMap={mapReflect}
            bumpMap={mapBump}
            roughness={.1} />
        </mesh>
    )
}

// const Wall = (props) => {
//     console.log('is it here?')
//     const wallmesh = useRef();
//     return (
//         <mesh 
//         {...props}
//         ref={wallmesh}>
//         <planeGeometry
//             args={[12000, 12000]} />
//         <meshStandardMaterial
//             color={"#e6e2d3"}
//             roughness={.8} />
//         </mesh>
//     )
// }

const Room = () => {
    console.log('where is this loop')
    return (
        <group>
            <WoodFloor className="floor" position={[0 , -500, 0]} rotation-x={-Math.PI / 2}/>
            {/* <Wall className="left-wall" position={[-6000, 4000, 0]} rotation-y={Math.PI / 2} />
            <Wall className="right-wall" position={[6000, 4000, 0]} rotation-y={-Math.PI / 2} />
            <Wall className="back-wall" position={[0, 4000, -6000]} />
            <Wall className="front-wall" position={[0, 4000, 6000]} rotation-y={Math.PI} /> */}
        </group>
    );
};

export default Room;
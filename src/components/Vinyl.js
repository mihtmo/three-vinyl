import { useContext, useEffect, useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useControl } from 'react-three-gui';

const vinylGroup = 'Vinyl'

const Vinyl = (props) => {
    const opacity = useControl('Opacity', { group: vinylGroup, type: 'number', value: 1, max: 1});
    const [hovered, hover] = useState(false);
    const mesh = useRef();
    const [mapFront, mapBack, bumpVinyl] = useLoader(THREE.TextureLoader, 
        ['./assets/id-lp-front.png', './assets/id-lp-back.png', './assets/vinyl-bump.png']);
    mapFront.wrapS = mapFront.wrapT = THREE.RepeatWrapping
    mapFront.repeat.set(.97, .97)
    mapFront.center.set(.5, .5)
    return (
        <mesh
            onPointerOver={(event) => {
                hover(true);
                event.stopPropagation();
            }}
            onPointerOut={() => {
                hover(false)
            }}
            {...props}
            ref={mesh}
            position={[100, 0, -1.5]}
            rotation-x={ Math.PI / 2 }
            renderOrder={1}
        >
            <cylinderGeometry 
                args={[150, 150, 1, 64, 3]} 
                attach="geometry" 
            />
            <meshStandardMaterial
                map={mapFront}
                roughness={0}
                color={hovered ? 'pink' : '#ffffff' }
                opacity={opacity}
                bumpMap={bumpVinyl}
                bumpScale={.05}
                transparent 

            />
        </mesh>
    );
};

export default Vinyl;
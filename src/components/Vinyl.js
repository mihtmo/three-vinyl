import { useContext, useEffect, useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useControl } from 'react-three-gui';

const vinylGroup = 'Vinyl'

const VinylMain = (props) => {
    const mesh = useRef();
    const [mapFront, bumpVinyl] = useLoader(THREE.TextureLoader, 
        ['./assets/id-lp-front.png', './assets/vinyl-bump.png']);
    mapFront.wrapS = mapFront.wrapT = THREE.RepeatWrapping
    mapFront.repeat.set(.97, .97)
    mapFront.center.set(.5, .5)
    mapFront.rotation = Math.PI / 2
    
    return (
        <mesh
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
                color={props.hovered ? 'pink' : '#ffffff' }
                opacity={props.opacity}
                bumpMap={bumpVinyl}
                bumpScale={.05}
                transparent 

            />
        </mesh>
    );
};

const VinylBack = (props) => {
    const mesh = useRef();
    const [mapBack, bumpVinyl] = useLoader(THREE.TextureLoader, 
        ['./assets/id-lp-back.png', './assets/vinyl-bump.png']);
    mapBack.wrapS = mapBack.wrapT = THREE.RepeatWrapping
    mapBack.repeat.set(.97, .97)
    mapBack.center.set(.5, .5)
    mapBack.rotation = -Math.PI
    
    return (
        <mesh
            {...props}
            ref={mesh}
            position={[100, 0, -2.1]}
            rotation-x={ Math.PI }
            renderOrder={1}
        >
            <circleGeometry 
                args={[150, 150, 64, 7]} 
                attach="geometry" 
            />
            <meshStandardMaterial
                map={mapBack}
                roughness={0}
                color={props.hovered ? 'pink' : '#ffffff' }
                opacity={props.opacity}
                bumpMap={bumpVinyl}
                bumpScale={.05}
                transparent 

            />
        </mesh>
    );
}

const Vinyl = () => {
    const [hovered, hover] = useState(false)
    const opacity = useControl('Opacity', { group: vinylGroup, type: 'number', max: 1, value: 1 });
    return (
        <group
        onPointerOver={(event) => {
            hover(true);
            event.stopPropagation();
        }}
        onPointerOut={() => hover(false)}>
            <VinylMain opacity={opacity} hovered={hovered}/>
            <VinylBack opacity={opacity} hovered={hovered}/>
        </group>
    )
}

export default Vinyl;
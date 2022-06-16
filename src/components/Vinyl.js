import { useContext, useEffect, useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useControl } from 'react-three-gui';

const vinylGroup = 'Vinyl'

const VinylMain = (props) => {
    const mesh = useRef();
    const [labelFront, bumpVinyl] = useLoader(THREE.TextureLoader, 
        ['./assets/id-label-front.png', './assets/vinyl-bump.png']);
    labelFront.center.set(.5, .5)
    labelFront.rotation = Math.PI / 2
    
    return (
        <mesh
            {...props}
            ref={mesh}
            position={[100, 0, -1.5]}
            rotation-x={ Math.PI / 2 }
            renderOrder={1}
            opacity={props.opacity}
            scale={[props.scaleX * props.scale, 1, props.scaleY * props.scale]}
        >
            <cylinderGeometry 
                args={[150, 150, 1, 64, 3]} 
                attach="geometry" 
            />
            <meshStandardMaterial
                map={labelFront}
                roughness={.1}
                color={props.hovered ? 'pink' : '#ffffff' }
                opacity={props.opacity}
                bumpMap={bumpVinyl}
                bumpScale={.03}
                transparent

            />
        </mesh>
    );
};

const VinylBack = (props) => {
    const mesh = useRef();
    const [labelBack, bumpVinyl] = useLoader(THREE.TextureLoader, 
        ['./assets/id-label-back.png', './assets/vinyl-bump.png']);
    labelBack.center.set(.5, .5)
    labelBack.rotation = -Math.PI
    
    return (
        <mesh
            {...props}
            ref={mesh}
            position={[100, 0, -2.1]}
            rotation-x={ Math.PI }
            renderOrder={1}
            scale={[props.scaleX * props.scale, props.scaleY * props.scale, 1, 1]}
        >
            <circleGeometry 
                args={[150, 150, 64, 7]} 
                attach="geometry" 
            />
            <meshStandardMaterial
                map={labelBack}
                roughness={.1}
                color={props.hovered ? 'pink' : '#ffffff' }
                opacity={props.opacity}
                bumpMap={bumpVinyl}
                bumpScale={.03}
                transparent 

            />
        </mesh>
    );
}

const Vinyl = () => {
    const [hovered, hover] = useState(false)
    const opacity = useControl('Opacity', { group: vinylGroup, type: 'number', max: 1, value: 1 });
    const scale = useControl('Scale-All', { group: vinylGroup, type: 'number', min: 1, max: 5, value: 1});
    const scaleX = useControl('Scale-X', { group: vinylGroup, type: 'number', min: 1, max: 5, value: 1});
    const scaleY = useControl('Scale-Y', { group: vinylGroup, type: 'number', min: 1, max: 5, value: 1});
    const scaleZ = useControl('Scale-Z', { group: vinylGroup, type: 'number', min: 1, max: 5, value: 1});
    return (
        <group
        scale={[scaleX * scale, scaleY * scale, scaleZ * scale]}
        onPointerOver={(event) => {
            hover(true);
            event.stopPropagation();
        }}
        onPointerOut={() => hover(false)}>
            <VinylMain opacity={opacity} hovered={hovered} scale={scale} scaleX={scaleX} scaleY={scaleY} />
            <VinylBack opacity={opacity} hovered={hovered} scale={scale} scaleX={scaleX} scaleY={scaleY} />
        </group>
    )
}

export default Vinyl;
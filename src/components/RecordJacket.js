import { useLoader } from "@react-three/fiber";
import { useRef, useState } from "react"
import * as THREE from 'three'
import { useControl } from "react-three-gui";

const jacketGroup = 'Jacket'

// Create reused geometry constants
const sideGeo = [314.3, 1, 2];
const faceGeo = [314.3, 314.3, 1];

// Create Individual Components
const JacketFront = props => {
    const mesh = useRef()
    const map = useLoader(THREE.TextureLoader, 
        './assets/id-jacket-front.png'
    );
    return (
        <mesh
            {...props} 
            ref={mesh}
            renderOrder={2}>
            <boxGeometry 
                args={faceGeo} 
                attach="geometry"/>
            <meshStandardMaterial
                map={map}
                roughness={0.4}
                color={props.hovered ? 'pink' : '#ffffff' }
                opacity={props.opacity}
                transparent
            />
        </mesh>
    );
};

const JacketBack = props => {
    const mesh = useRef()
    const map = useLoader(THREE.TextureLoader, 
        './assets/id-jacket-back.png'
    )
    return (
        <mesh 
            {...props} 
            ref={mesh}
            position={[0, 0, -3]}
            renderOrder={2}>
            <boxGeometry 
                args={faceGeo} 
                attach="geometry" />
            <meshStandardMaterial
                map={map}
                roughness={0.5}
                color={props.hovered ? 'pink' : '#ffffff' }
                opacity={props.opacity}
                transparent
            />
        </mesh>
    );
};

const JacketSide = props => {
    const mesh = useRef()
    return (
        <mesh
            {...props}
            ref={mesh}>
            <boxGeometry 
                args={sideGeo} 
                attach="geometry" />
            <meshStandardMaterial
                color={props.hovered ? 'pink' : "#b28d8e" }
                roughness={0.5}
                opacity={props.opacity}
                transparent
            />
        </mesh>
    );
};

// Group Components
const RecordJacket = () => {
    const [hovered, hover] = useState(false)
    const opacity = useControl('Opacity', { group: jacketGroup, type: 'number', max: 1, value: 1 });
    return (
        <group 
        onPointerOver={(event) => {
            hover(true);
            event.stopPropagation();
        }}
        onPointerOut={() => hover(false)}
        opacity={.2}>
            <JacketFront className="jacket-front" opacity={opacity} hovered={hovered} />
            <JacketBack className="jacket-back" opacity={opacity} hovered={hovered} />
            <JacketSide className="jacket-side" opacity={opacity} hovered={hovered} position={[-156.65, 0, -1.5]} rotation-z={Math.PI / 2}/>
            <JacketSide className="jacket-bottom" opacity={opacity} hovered={hovered} position={[0, -156.65, -1.5]} />
            <JacketSide className="jacket_top" opacity={opacity} hovered={hovered} position={[0, 156.65, -1.5]} />
        </group>
    );
};

export default RecordJacket;
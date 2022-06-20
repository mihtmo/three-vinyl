import { useRef } from "react"
import { useControl } from "react-three-gui"

const moteGroup = 'Motes'

const Mote = (props) => {
    const mesh = useRef()

    return (
        <mesh
            position={props.position}>
            <sphereGeometry
                args={[1, 1, 1]}
            />
            <meshStandardMaterial
                color={"white"}
                emissive={"red"}
            />
        </mesh>
    )
}

const RandomMote = () => {

    const count = useControl('Duplicates', { group: moteGroup, type: 'number', min: 0, max: 1000, value: 0, distance: 100});
    const arr = [];
    for (let i = 0; i < count; i++) {
        const positionX = 1000 * (Math.random() - .5)
        const positionY = 1000 * (Math.random() - .5)
        const positionZ = 1000 * (Math.random() - .5)
        arr.push(
            <Mote position={[positionX, positionY, positionZ]} />
        );
    
    }
    return arr; 
}

export { Mote, RandomMote };